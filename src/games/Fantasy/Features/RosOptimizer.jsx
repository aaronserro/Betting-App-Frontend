// src/pages/fantasy/features/RosOptimizer.jsx
import { useState } from "react";

export default function RosOptimizer() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <section className="rounded-3xl border-2 border-[#FFD700] p-5 bg-black">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">ROS Optimizer</h2>
        <button
          onClick={() => setSettingsOpen((s) => !s)}
          className="rounded-xl border-2 border-[#FFD700] px-4 py-2 font-semibold hover:bg-[#111]"
        >
          {settingsOpen ? "Hide Settings" : "League Settings"}
        </button>
      </div>

      {settingsOpen && (
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <Field label="Scoring" placeholder="PPR / Half-PPR / Standard" />
          <Field label="Starters (QB/RB/WR/TE/FLEX)" placeholder="1/2/2/1/1" />
          <Field label="Bench Size" placeholder="6" />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="rounded-xl bg-[#FFD700] text-black px-4 py-2 font-bold hover:opacity-90">
          Optimize Weekly Lineups
        </button>
        <button className="rounded-xl border-2 border-[#FFD700] px-4 py-2 font-semibold hover:bg-[#111]">
          Export Schedule Plan
        </button>
      </div>

      {/* TODO: render week-by-week starters table and expected points */}
      <div className="mt-6 text-gray-300 text-sm">
        After importing your roster + ROS projections, this will suggest optimal starters for each remaining week (bye-aware).
      </div>
    </section>
  );
}

function Field({ label, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-300">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="block w-full rounded-lg border border-gray-700 bg-black p-2 placeholder-gray-500"
      />
    </div>
  );
}
