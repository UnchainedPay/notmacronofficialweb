import React from "react"; 
import "./index.css";
import useTokenStats from "./hooks/useTokenStats";
import useTokenHistory from "./hooks/useTokenHistory";

// ✅ Correct links
const PUMPFUN_LINK =
  "https://pump.fun/coin/AK5DJxfLQjJugMNQvhTaW3RSa9TFWwe669Bqs3dxpump";
const DEXSCREENER_LINK =
  "https://dexscreener.com/solana/AK5DJxfLQjJugMNQvhTaW3RSa9TFWwe669Bqs3dxpump";

const TWITTER_URL = import.meta.env.VITE_TWITTER_URL;
const TELEGRAM_URL = import.meta.env.VITE_TELEGRAM_URL;

function App() {
  const { stats, loading, error, contract } = useTokenStats();

  return (
    <div className="app">
      <div className="bg-glow" />
      <div className="app-inner">
        <Header />
        <Hero />
        <StatsSection
          stats={stats}
          loading={loading}
          error={error}
          contract={contract}
        />
        <EvolutionSection />
        <Tokenomics />
        <HowToBuy />
        <SocialLinks />
        <Disclaimer />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        {/* SMALL ROUND LOGO – uses your JPG */}
        <div className="logo-circle">
          <img
            src="/notmacronlogo.jpg"
            alt="Not Macron"
            className="logo-img"
          />
          {/*
            👉 If later you want a video instead:
            <video
              src="/notmacron.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="logo-img"
            />
          */}
        </div>

        <div className="header-text">
          <span className="header-tag">Not Macron</span>
          <span className="header-sub">Meme Coin • Solana</span>
        </div>
      </div>

      <nav className="nav">
        <a href="#stats" className="nav-link">
          Live Stats
        </a>
        <a href="#tokenomics" className="nav-link">
          Tokenomics
        </a>
        <a href="#how-to-buy" className="nav-link">
          How to Buy
        </a>
        <a
          href={PUMPFUN_LINK}
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
        >
          Buy on Pump.fun
        </a>

        {TWITTER_URL && (
          <a
            href={TWITTER_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            X
          </a>
        )}

        {TELEGRAM_URL && (
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="nav-link"
          >
            TG
          </a>
        )}
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      {/* BIG ROUND LOGO – uses your MP4 */}
      <div className="hero-logo-wrapper">
        <div className="hero-logo-glow" />
        <div className="hero-logo-circle">
          <video
            src="/notmacron.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="hero-logo-img"
          />
          {/*
            👉 If you ever want to switch to an image:
            <img
              src="/notmacronlogo.jpg"
              alt="Not Macron"
              className="hero-logo-img"
            />
          */}
        </div>
      </div>

      <div className="hero-content">
        <p className="hero-tagline">
          MEME COIN • PUMPFUN LAUNCH • 1B SUPPLY
        </p>
        <h1 className="hero-title">
          <span className="hero-title-line hero-title-light">NOT</span>
          <span className="hero-title-line hero-title-green">MACRON</span>
        </h1>
        <p className="hero-description">
          A fictional multiverse clone, turned into a Solana meme coin.{" "}
          100% humor, 0% politics. Just pure neon-green chaos on-chain.
        </p>

        <div className="hero-buttons">
          <a
            href={PUMPFUN_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Buy on Pump.fun
          </a>
          <a
            href={DEXSCREENER_LINK}
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
          >
            View Chart
          </a>
        </div>

        <div className="hero-chips">
          <span className="chip chip-green">🚀 Fair launch on Pump.fun</span>
          <span className="chip">🧬 1,000,000,000 total supply</span>
          <span className="chip">🧪 No presale, no team tokens</span>
        </div>
      </div>
    </section>
  );
}

function StatsSection({ stats, loading, error, contract }) {
  return (
    <section id="stats" className="section">
      <div className="section-header">
        <h2>Live Stats</h2>
        <span className="section-subtitle">
          Real-time market data powered by Dexscreener.
        </span>
      </div>

      {contract ? (
        <p
          style={{
            fontSize: "11px",
            color: "#9ca3af",
            marginBottom: "8px",
            wordBreak: "break-all",
          }}
        >
          Contract: <span style={{ color: "#bbf7d0" }}>{contract}</span>
        </p>
      ) : (
        <p
          style={{
            fontSize: "11px",
            color: "#9ca3af",
            marginBottom: "8px",
          }}
        >
          Contract address coming soon after launch.
        </p>
      )}

      {loading && (
        <p
          style={{
            fontSize: "12px",
            color: "#9ca3af",
            marginBottom: "8px",
          }}
        >
          Loading live stats…
        </p>
      )}

      {error && (
        <p
          style={{
            fontSize: "12px",
            color: "#f97373",
            marginBottom: "8px",
          }}
        >
          Live data is temporarily unavailable. Please try again in a moment.
        </p>
      )}

      <div className="stats-grid">
        <StatCard
          label="Price"
          value={stats.price ? `$${stats.price.toFixed(6)}` : "Soon™"}
        />
        <StatCard
          label="Market Cap"
          value={stats.mc ? `$${stats.mc.toLocaleString()}` : "Soon™"}
        />
        <StatCard
          label="Volume 24h"
          value={
            stats.volume24h
              ? `$${stats.volume24h.toLocaleString()}`
              : "Soon™"
          }
        />
        <StatCard
          label="Holders"
          value={stats.holders ? stats.holders.toLocaleString() : "Soon™"}
        />
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

function EvolutionSection() {
  const { points, loading, error, enabled } = useTokenHistory();

  const hasData = points && points.length > 1;

  // On prépare les points normalisés dans le SVG avec un padding
  let linePath = "";
  let areaPath = "";

  if (hasData) {
    const minTime = points[0].time;
    const maxTime = points[points.length - 1].time;
    const minPrice = Math.min(...points.map((p) => p.price));
    const maxPrice = Math.max(...points.map((p) => p.price));

    const timeSpan = maxTime - minTime || 1;
    const priceSpan = maxPrice - minPrice || 1;

    const X_PAD = 6; // padding horizontal
    const Y_PAD = 10; // padding vertical

    const mapped = points.map((p) => {
      const x =
        X_PAD + ((p.time - minTime) / timeSpan) * (100 - 2 * X_PAD);
      const y =
        Y_PAD +
        (1 - (p.price - minPrice) / priceSpan) * (100 - 2 * Y_PAD);
      return { x, y };
    });

    // Ligne principale
    linePath = mapped
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(" ");

    // Zone remplie (chart style)
    const first = mapped[0];
    const last = mapped[mapped.length - 1];
    areaPath =
      `M ${first.x.toFixed(2)} ${100 - Y_PAD}` +
      ` L ${first.x.toFixed(2)} ${first.y.toFixed(2)}` +
      mapped.map((p) => ` L ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join("") +
      ` L ${last.x.toFixed(2)} ${100 - Y_PAD}` +
      " Z";
  }

  return (
    <section className="section">
      <h2 className="section-title">24h Evolution — Price</h2>
      <div className="evo-wrapper">
        <div className="evo-text">
          <p>
            Track NOT MACRON&apos;s price action over the last 24 hours.
            This chart shows how the market reacts in real time — from calm
            consolidation to full degen volatility.
          </p>
          <ul>
            <li>USD price curve over the past 24 hours</li>
            <li>See short-term trend and volatility at a glance</li>
            <li>Data refreshed automatically while the market moves</li>
          </ul>

          {loading && enabled && (
            <p
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                marginTop: "8px",
              }}
            >
              Loading fresh price data…
            </p>
          )}

          {error && (
            <p
              style={{
                fontSize: "11px",
                color: "#f97373",
                marginTop: "8px",
              }}
            >
              Chart data is temporarily unavailable. Please try again in a
              moment.
            </p>
          )}

          {!enabled && !loading && !error && (
            <p
              style={{
                fontSize: "11px",
                color: "#9ca3af",
                marginTop: "8px",
              }}
            >
              The 24h chart will go live once trading is active.
            </p>
          )}
        </div>

        <div className="evo-graph">
          {hasData ? (
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              style={{ width: "100%", height: "100%" }}
            >
              <defs>
                <linearGradient id="evo-bg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(15,23,42,0.9)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,1)" />
                </linearGradient>
                <linearGradient id="evo-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(74,222,128,0.25)" />
                  <stop offset="100%" stopColor="rgba(74,222,128,0)" />
                </linearGradient>
              </defs>

              {/* fond */}
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                rx="6"
                fill="url(#evo-bg)"
              />

              {/* petites lignes de grid */}
              {[20, 40, 60, 80].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="100"
                  y2={y}
                  stroke="rgba(148,163,184,0.12)"
                  strokeWidth="0.4"
                />
              ))}

              {/* zone remplie */}
              <path d={areaPath} fill="url(#evo-area)" stroke="none" />

              {/* courbe prix */}
              <path
                d={linePath}
                fill="none"
                stroke="#4ade80"
                strokeWidth="1"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <span>
              {enabled
                ? loading
                  ? "Loading chart..."
                  : "No 24h history available yet. Check back soon."
                : "The 24h price chart will appear here after launch."}
            </span>
          )}
        </div>
      </div>
    </section>
  );
}

function Tokenomics() {
  return (
    <section id="tokenomics" className="section">
      <h2 className="section-title">Tokenomics</h2>
      <div className="tokenomics-grid">
        <div className="tokenomics-main">
          <div className="tokenomics-tag">Supply</div>
          <div className="tokenomics-supply">
            1,000,000,000 <span className="tokenomics-symbol">$NTM</span>
          </div>
          <p>
            100% minted and launched on Pump.fun. No presale, no team
            allocation, no VC — pure degen culture.
          </p>
        </div>
        <div className="tokenomics-side">
          <TokenomicsRow label="Presale" value="0% — No presale" />
          <TokenomicsRow label="Team / Dev" value="0% — All in the wild" />
          <TokenomicsRow
            label="Liquidity"
            value="100% from Pump.fun launch"
          />
          <TokenomicsRow
            label="Chain"
            value="Solana (the only chain fast enough for this broken clone)"
          />
        </div>
      </div>
    </section>
  );
}

function TokenomicsRow({ label, value }) {
  return (
    <div className="tokenomics-row">
      <div className="tokenomics-row-label">{label}</div>
      <div className="tokenomics-row-value">{value}</div>
    </div>
  );
}

function HowToBuy() {
  return (
    <section id="how-to-buy" className="section">
      <h2 className="section-title">How to Buy</h2>
      <div className="steps-grid">
        <StepCard
          step="1"
          title="Get SOL"
          text="Buy some SOL on a CEX (Binance, OKX, etc.) and send it to your Solana wallet (Phantom, Backpack, Ledger...)."
        />
        <StepCard
          step="2"
          title="Open Pump.fun"
          text="Open the official NOT MACRON page on Pump.fun and double-check the contract address."
        />
        <StepCard
          step="3"
          title="Embrace the chaos"
          text="Swap SOL for $NTM, join the Telegram, and watch the green chaos unfold."
        />
      </div>
    </section>
  );
}

function StepCard({ step, title, text }) {
  return (
    <div className="step-card">
      <div className="step-badge">{step}</div>
      <div className="step-title">{title}</div>
      <p className="step-text">{text}</p>
    </div>
  );
}

function SocialLinks() {
  const noLinks = !TWITTER_URL && !TELEGRAM_URL;

  return (
    <section className="section">
      <h2 className="section-title">Join the Community</h2>

      {noLinks ? (
        <p style={{ fontSize: "12px", color: "#9ca3af" }}>
          Social links will be shared after launch. Stay tuned.
        </p>
      ) : (
        <div className="social-grid">
          {TWITTER_URL && (
            <a
              href={TWITTER_URL}
              target="_blank"
              rel="noreferrer"
              className="social-card"
            >
              <span className="social-emoji">🐦</span>
              <span className="social-label">Follow us on X</span>
            </a>
          )}

          {TELEGRAM_URL && (
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="social-card"
            >
              <span className="social-emoji">📢</span>
              <span className="social-label">Join our Telegram</span>
            </a>
          )}
        </div>
      )}
    </section>
  );
}

function Disclaimer() {
  return (
    <footer className="footer">
      <p>
        not macron is a fictional, parodic character with no connection to any
        real person. This project is a meme coin for entertainment only — it is
        not political, not financial advice, and not an investment.
      </p>
      <p>© {new Date().getFullYear()} NOT MACRON. All rights reserved.</p>
    </footer>
  );
}

export default App;
