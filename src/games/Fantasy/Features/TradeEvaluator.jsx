// src/pages/fantasy/features/TradeEvaluator.jsx
import { useState } from "react";

export default function TradeEvaluator() {
  const [yourRosterFile, setYourRosterFile] = useState(null);
  const [theirRosterFile, setTheirRosterFile] = useState(null);
  const [rosFile, setRosFile] = useState(null);

  return (
    <section className="rounded-3xl border-2 border-[#FFD700] p-5 bg-black">
      <h2 className="text-2xl font-bold mb-4">Trade Evaluator</h2>

      <div className="grid sm:grid-cols-3 gap-4">
        <Uploader label="Your Roster CSV" setFile={setYourRosterFile} />
        <Uploader label="Their Roster CSV (optional)" setFile={setTheirRosterFile} />
        <Uploader label="ROS Projections CSV" setFile={setRosFile} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="rounded-xl bg-[#FFD700] text-black px-4 py-2 font-bold hover:opacity-90">
          Evaluate Proposed Trade
        </button>
        <button className="rounded-xl border-2 border-[#FFD700] px-4 py-2 font-semibold hover:bg-[#111]">
          Run Monte Carlo (5k)
        </button>
      </div>

      {/* TODO: show ΔROS pts, ΔWins, ΔPlayoff%, ΔTitle%, fairness score, depth chart changes */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <Panel title="Your Team Impact">
          <PlaceholderMetrics />
        </Panel>
        <Panel title="Their Team Impact">
          <PlaceholderMetrics />
        </Panel>
      </div>
    </section>
  );
}

function Uploader({ label, setFile }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type="file"
        accept=".csv"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="block w-full rounded-lg border border-gray-700 bg-black p-2"
      />
    </div>
  );
}

function Panel({ title, children }) {
  return (
    <div className="rounded-2xl border border-gray-800 p-4 bg-[#0a0a0a]">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {children}
    </div>
  );
}

function PlaceholderMetrics() {
  return (
    <ul className="text-sm text-gray-300 space-y-1">
      <li>Δ ROS Points: —</li>
      <li>Δ Weekly Median: —</li>
      <li>Δ Wins: —</li>
      <li>Δ Playoff %: —</li>
      <li>Δ Title %: —</li>
      <li>Fairness Score: —</li>
    </ul>
  );
}
