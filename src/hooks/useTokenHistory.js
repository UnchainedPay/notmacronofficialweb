import { useEffect, useState } from "react";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const BIRDEYE_API_KEY = import.meta.env.VITE_BIRDEYE_API_KEY;

// 24h in seconds
const DAY_SECONDS = 24 * 60 * 60;
const REFRESH_MS = 5 * 60 * 1000; // 5 minutes

// small helper
function toNumber(value) {
  if (value === undefined || value === null) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

/**
 * useTokenHistory
 * - Fetches 24h price history from BirdEye
 * - Auto-refresh every 5 minutes
 * - Returns { points, loading, error, enabled }
 */
export default function useTokenHistory() {
  const [points, setPoints] = useState([]); // { time, price }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const enabled = Boolean(CONTRACT_ADDRESS && BIRDEYE_API_KEY);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let intervalId = null;

    async function fetchHistory() {
      try {
        if (cancelled) return;
        setLoading(true);
        setError(null);

        const now = Math.floor(Date.now() / 1000);
        const timeFrom = now - DAY_SECONDS;

        const url = new URL(
          "https://public-api.birdeye.so/defi/history_price"
        );
        url.searchParams.set("address", CONTRACT_ADDRESS);
        url.searchParams.set("address_type", "token");
        url.searchParams.set("type", "5m"); // 5-minute candles
        url.searchParams.set("time_from", timeFrom.toString());
        url.searchParams.set("time_to", now.toString());

        const res = await fetch(url.toString(), {
          headers: {
            accept: "application/json",
            "X-API-KEY": BIRDEYE_API_KEY,
          },
        });

        if (!res.ok) {
          throw new Error(`BirdEye error: ${res.status}`);
        }

        const json = await res.json();

        // Adapter selon la structure retournée par BirdEye
        const raw =
          json?.data && Array.isArray(json.data)
            ? json.data
            : Array.isArray(json)
            ? json
            : [];

        const mapped = raw
          .map((item) => {
            const t = toNumber(item.unixTime ?? item.timestamp ?? item.time);
            const p = toNumber(item.value ?? item.price ?? item.priceUsd);
            if (!t || !p) return null;
            return { time: t, price: p };
          })
          .filter(Boolean)
          .sort((a, b) => a.time - b.time);

        if (!cancelled) {
          setPoints(mapped);
        }
      } catch (err) {
        console.error("Error fetching token history:", err);
        if (!cancelled) {
          setError(err.message || "Unknown error");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    // First fetch on mount
    fetchHistory();

    // Auto-refresh every 5 minutes
    intervalId = setInterval(fetchHistory, REFRESH_MS);

    // Cleanup on unmount / deps change
    return () => {
      cancelled = true;
      if (intervalId) clearInterval(intervalId);
    };
  }, [enabled]);

  return { points, loading, error, enabled };
}