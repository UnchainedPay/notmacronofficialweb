import { useEffect, useState } from "react";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;

// Simple helper : safely read a number or return null
function toNumber(value) {
  if (value === undefined || value === null) return null;
  const n = Number(value);
  return Number.isNaN(n) ? null : n;
}

/**
 * useTokenStats
 * - Fetches data from Dexscreener for the given contract
 * - Returns { stats, loading, error }
 *
 * You only need to set VITE_CONTRACT_ADDRESS in .env
 */
export default function useTokenStats() {
  const [stats, setStats] = useState({
    price: null,
    mc: null,
    volume24h: null,
    holders: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // no contract address set yet → do nothing
    if (!CONTRACT_ADDRESS) return;

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
        );

        if (!res.ok) {
          throw new Error(`Dexscreener error: ${res.status}`);
        }

        const json = await res.json();

        const pair = Array.isArray(json.pairs) ? json.pairs[0] : null;

        if (!pair) {
          throw new Error("Token not found on Dexscreener yet.");
        }

        setStats({
          price: toNumber(pair.priceUsd),
          mc: toNumber(pair.marketCap),
          volume24h: toNumber(pair.volume?.h24),
          // Dexscreener n’a pas toujours la donnée holders :
          holders: toNumber(pair.holders),
        });
      } catch (err) {
        console.error("Error fetching token stats:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading, error, contract: CONTRACT_ADDRESS };
}