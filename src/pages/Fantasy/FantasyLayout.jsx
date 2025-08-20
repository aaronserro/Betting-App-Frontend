// src/pages/Fantasy/FantasyLayout.jsx
import DynamicBackground from "../../components/DynamicBackground";
import { Link, NavLink, Outlet, useLocation, useNavigate, useMatch } from "react-router-dom";
import { useEffect } from "react";

export default function FantasyLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  const linkBase = "px-3 py-2 rounded-xl font-semibold transition border-2";
  const active = "bg-[#FFD700] text-black border-[#FFD700]";
  const inactive = "text-white border-transparent hover:bg-[#111] hover:border-[#333]";

  // Robust overview match
  const isOverview = !!useMatch({ path: "/fantasy-football", end: true });

  return (
    <div className="min-h-screen text-white relative">
      <DynamicBackground />

      <nav className="sticky top-0 z-40 bg-black/70 backdrop-blur-sm border-b border-[#1d1d1d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:inline-flex items-center gap-2 rounded-xl border-2 border-[#FFD700] px-3 py-2 font-semibold text-white hover:bg-[#0f0f0f] hover:shadow"
              aria-label="Back to Dashboard"
              title="Back to Dashboard"
            >
              <span className="text-[#FFD700] text-lg">←</span>
              Back
            </button>

            <Link to="/" className="text-xl font-extrabold text-white tracking-wide">
              Fantasy<span className="text-[#FFD700]">Suite</span>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <NavLink to="." end className={({ isActive }) => [linkBase, isActive ? active : inactive].join(" ")}>
              Overview
            </NavLink>
            <NavLink to="draft" className={({ isActive }) => [linkBase, isActive ? active : inactive].join(" ")}>
              Draft
            </NavLink>
            <NavLink to="trades" className={({ isActive }) => [linkBase, isActive ? active : inactive].join(" ")}>
              Trades
            </NavLink>
            <NavLink to="ros" className={({ isActive }) => [linkBase, isActive ? active : inactive].join(" ")}>
              ROS
            </NavLink>
            <NavLink to="waivers" className={({ isActive }) => [linkBase, isActive ? active : inactive].join(" ")}>
              Waivers
            </NavLink>
          </div>

          <button
            onClick={() => navigate("/")}
            className="sm:hidden inline-flex items-center rounded-xl border-2 border-[#FFD700] px-3 py-2 font-semibold text-white hover:bg-[#0f0f0f]"
            aria-label="Back to Dashboard"
            title="Back to Dashboard"
          >
            ←
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {isOverview ? <OverviewContent /> : <Outlet />}
      </main>

      <footer className="mt-10 mb-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} FantasySuite
      </footer>
    </div>
  );
}

function OverviewContent() {
  const features = [
    { title: "Draft Assistant", desc: "Upload projections & ADP to build tiers, compute VORP, and guide picks." },
    { title: "Trade Evaluator", desc: "See ΔROS points, ΔWins, ΔPlayoff% and fairness from lineup impact." },
    { title: "ROS Optimizer", desc: "Best starters each week, bye-aware and matchup-adjusted." },
    { title: "Waivers / Start–Sit", desc: "Rank waivers by upgrade value; compare players for this week." },
  ];

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow">
          Welcome to the <span className="text-[#FFD700]">Fantasy Suite</span>
        </h1>
        <p className="text-gray-200 mt-3 max-w-2xl mx-auto drop-shadow">
          Draft smarter. Evaluate trades. Optimize lineups. Win your league.
        </p>
      </div>

      <div className="w-full flex items-center justify-center mb-8">
        <div className="h-px w-24 bg-[#FFD700]/60" />
        <div className="mx-3 text-[#FFD700]">◆</div>
        <div className="h-px w-24 bg-[#FFD700]/60" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-2xl p-5 bg-black/45 backdrop-blur-md border border-[#FFD700]/40 hover:border-[#FFD700] transition will-change-transform hover:scale-[1.02]"
          >
            <h2 className="text-xl font-bold text-[#FFD700] mb-2">{f.title}</h2>
            <p className="text-sm text-gray-200">{f.desc}</p>
          </div>
        ))}
      </div>

      <div
        className="mt-10 w-full rounded-2xl border border-[#FFD700]/30 bg-gradient-to-r from-[#000000]/30 via-[#111111]/30 to-[#000000]/30 backdrop-blur-md p-4"
        style={{ boxShadow: "0 0 40px rgba(255, 215, 0, 0.06) inset" }}
      >
        <p className="text-sm text-gray-200">
          Tip: load league settings in <span className="text-[#FFD700] font-semibold">ROS Optimizer</span> first to boost accuracy across the suite.
        </p>
      </div>
    </div>
  );
}
