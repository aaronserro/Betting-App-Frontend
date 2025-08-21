// src/pages/Fantasy/FantasyFootballPage.jsx
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
// (Keep your feature imports if you'll use them later)
// import DraftAssistant from "./Features/DraftAssistant.jsx"
// import TradeEvaluator from "./Features/TradeEvaluator.jsx";
// import RosOptimizer from "./Features/RosOptimizer.jsx";
// import WaiversStartSit from "./Features/WaiversStartSit.jsx";

export default function FantasyPage() {
  // --- Search UI state (UI only; wire to Django later) ---
  const [mode, setMode] = useState("players"); // 'players' | 'teams'
  const [q, setQ] = useState("");
  const [pos, setPos] = useState(""); // QB/RB/WR/TE
  const [team, setTeam] = useState(""); // NFL team code
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState([]); // <-- fill with Django response later

  // Debounce the input so typing feels snappy even before wiring
  const [debouncedQ, setDebouncedQ] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q]);

  // Fake search effect (UI demo): show skeletons, then empty state
  useEffect(() => {
    if (!debouncedQ && !team && !pos) {
      setResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const t = setTimeout(() => {
      // When wired: replace this with a call to your Spring endpoint that proxies to Django → Sleeper
      // setResults(apiResponse);
      setResults([]); // stays empty for now
      setIsSearching(false);
    }, 600);
    return () => clearTimeout(t);
  }, [debouncedQ, mode, pos, team]);

  // --- Static data for filters (UI only) ---
  const POSITIONS = ["QB", "RB", "WR", "TE"];
  const TEAMS = useMemo(
    () => [
      "ARI","ATL","BAL","BUF","CAR","CHI","CIN","CLE","DAL","DEN","DET","GB",
      "HOU","IND","JAX","KC","LAC","LAR","LV","MIA","MIN","NE","NO","NYG","NYJ",
      "PHI","PIT","SEA","SF","TB","TEN","WAS"
    ],
    []
  );

  return (
    <div className="flex flex-col gap-8">
      {/* HERO */}
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow">
          Welcome to the <span className="text-[#FFD700]">Fantasy Suite</span>
        </h1>
        <p className="text-gray-200 mt-3 max-w-2xl mx-auto drop-shadow">
          Draft smarter. Evaluate trades. Optimize lineups. Search players & teams with rich stats.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full flex items-center justify-center">
        <div className="h-px w-24 bg-[#FFD700]/60" />
        <div className="mx-3 text-[#FFD700]">◆</div>
        <div className="h-px w-24 bg-[#FFD700]/60" />
      </div>

      {/* SEARCH SECTION */}
      <section className="rounded-3xl p-5 bg-black/45 backdrop-blur-md border border-[#FFD700]/40">
        {/* Mode toggle */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex rounded-2xl border-2 border-[#FFD700] bg-black/60 overflow-hidden">
            <TabButton active={mode === "players"} onClick={() => setMode("players")}>
              Players
            </TabButton>
            <TabButton active={mode === "teams"} onClick={() => setMode("teams")}>
              Teams
            </TabButton>
          </div>

          {/* Quick tip */}
          <span className="text-xs text-gray-300">
            Powered by your Django service (Sleeper API under the hood)
          </span>
        </div>

        {/* Controls */}
        <div className="mt-4 grid gap-3 sm:grid-cols-6">
          {/* Search box */}
          <div className="sm:col-span-3 relative">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={mode === "players" ? "Search players (e.g., Justin Jefferson)" : "Search teams (e.g., PHI / Eagles)"}
              className="w-full rounded-xl border border-gray-700 bg-black/70 p-3 pr-10 text-sm placeholder-gray-500 focus:outline-none focus:border-[#FFD700]"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                aria-label="Clear"
              >
                ✕
              </button>
            )}
          </div>

          {/* Position filter (players only) */}
          {mode === "players" && (
            <>
              <div className="sm:col-span-1">
                <Select
                  label="Position"
                  value={pos}
                  onChange={(e) => setPos(e.target.value)}
                  options={["", ...POSITIONS]}
                />
              </div>
              {/* Team filter (players only) */}
              <div className="sm:col-span-1">
                <Select
                  label="Team"
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  options={["", ...TEAMS]}
                />
              </div>
            </>
          )}

          {/* Search action (non-functional for now) */}
          <div className="sm:col-span-1 flex items-end">
            <button
              onClick={() => {/* when wired: trigger fetch */}}
              className="rounded-full px-4 py-2 text-sm font-bold border-2 border-black text-white bg-transparent hover:bg-gray-900"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-6">
          {isSearching && <SkeletonGrid />}
          {!isSearching && results.length === 0 && <EmptyState q={q} mode={mode} />}

          {!isSearching && results.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item, idx) => (
                <ResultCard key={idx} item={item} mode={mode} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feature highlight cards (kept, but compact) */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Draft Assistant", desc: "Upload projections & ADP, build tiers, compute VORP." },
          { title: "Trade Evaluator", desc: "ΔROS points, ΔWins, ΔPlayoff%, fairness score." },
          { title: "ROS Optimizer", desc: "Best starters weekly, bye-aware + matchup-adjusted." },
          { title: "Waivers / Start–Sit", desc: "Rank waivers and compare players for this week." },
        ].map((f) => (
          <div
            key={f.title}
            className="rounded-2xl p-5 bg-black/45 backdrop-blur-md border border-[#FFD700]/40 hover:border-[#FFD700] transition"
          >
            <h3 className="text-lg font-bold text-[#FFD700] mb-1">{f.title}</h3>
            <p className="text-sm text-gray-200">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Callout */}
      <div
        className="w-full rounded-2xl border border-[#FFD700]/30 bg-gradient-to-r from-[#000000]/30 via-[#111111]/30 to-[#000000]/30 backdrop-blur-md p-4"
        style={{ boxShadow: "0 0 40px rgba(255, 215, 0, 0.06) inset" }}
      >
        <p className="text-sm text-gray-200">
          Tip: once wired, this search will query your Django API (which fetches from the Sleeper public API) and
          render player/team cards with stats, trends, and links to roster actions.
        </p>
      </div>
    </div>
  );
}

/* ----------------- UI subcomponents ----------------- */

function TabButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 text-sm font-semibold transition",
        active ? "bg-gold text-black" : "text-white hover:bg-[#111]"
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="block text-left">
      <span className="block text-xs text-gray-400 mb-1">{label}</span>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-700 bg-black/70 p-3 text-sm focus:outline-none focus:border-[#FFD700]"
      >
        {options.map((op) => (
          <option key={op} value={op}>
            {op === "" ? "Any" : op}
          </option>
        ))}
      </select>
    </label>
  );
}

function EmptyState({ q, mode }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-300">
      <div className="text-3xl">🔍</div>
      <p className="mt-2 text-sm">
        {q
          ? `No ${mode === "players" ? "players" : "teams"} found. Try another search.`
          : `Search ${mode === "players" ? "players" : "teams"} to see stats and info.`}
      </p>
    </div>
  );
}

function SkeletonGrid() {
  const items = Array.from({ length: 6 });
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((_, i) => (
        <div
          key={i}
          className="rounded-2xl p-5 bg-black/45 backdrop-blur-md border border-[#FFD700]/20 animate-pulse"
        >
          <div className="h-4 w-1/2 bg-gray-700/50 rounded mb-3" />
          <div className="h-3 w-1/3 bg-gray-700/40 rounded mb-4" />
          <div className="h-24 w-full bg-gray-700/30 rounded" />
        </div>
      ))}
    </div>
  );
}

function ResultCard({ item, mode }) {
  // Placeholder card — replace fields when you wire data
  // Example item for players: { name, team, pos, bye, stats: { yds, tds, rec } }
  // Example item for teams: { name, code, record, ppg, papg }
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-[#FFD700]/40 hover:border-[#FFD700] transition"
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-bold text-white">
            {(item && item.name) || (mode === "players" ? "Player Name" : "Team Name")}
          </h4>
          <p className="text-xs text-gray-400">
            {mode === "players" ? (item?.pos || "POS") + " • " + (item?.team || "TEAM") : (item?.code || "CODE")}
          </p>
        </div>
        <div className="text-right">
          <span className="text-[#FFD700] text-sm font-semibold">
            {mode === "players" ? "ROS μ: —" : "PPG: —"}
          </span>
          <div className="text-xs text-gray-400">{mode === "players" ? "σ: —" : "PA/G: —"}</div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <StatPill label={mode === "players" ? "Last 3" : "Record"} value="—" />
        <StatPill label={mode === "players" ? "Targets" : "Yds/G"} value="—" />
        <StatPill label={mode === "players" ? "TDs" : "Takeaways"} value="—" />
      </div>
    </motion.div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="rounded-xl border border-[#FFD700]/30 bg-black/40 py-2">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
