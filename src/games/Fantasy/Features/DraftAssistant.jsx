// src/pages/fantasy/features/DraftAssistant.jsx
import { useState } from "react";

export default function DraftAssistant() {
  const [projectionsFile, setProjectionsFile] = useState(null);
  const [adpFile, setAdpFile] = useState(null);

  return (
    <section className="rounded-3xl border-2 border-[#FFD700] p-5 bg-black">
      <h2 className="text-2xl font-bold mb-4">Draft Assistant</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Projections CSV</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setProjectionsFile(e.target.files?.[0] ?? null)}
            className="block w-full rounded-lg border border-gray-700 bg-black p-2"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">ADP CSV (optional)</label>
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setAdpFile(e.target.files?.[0] ?? null)}
            className="block w-full rounded-lg border border-gray-700 bg-black p-2"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="rounded-xl border-2 border-[#FFD700] px-4 py-2 font-semibold hover:bg-[#111]">
          Compute VORP + Tiers
        </button>
        <button className="rounded-xl bg-[#FFD700] text-black px-4 py-2 font-bold hover:opacity-90">
          Open Live Draft Board
        </button>
      </div>

      {/* TODO: render tables for tiers, best available, positional scarcity */}
      <div className="mt-6 text-gray-300 text-sm">
        Upload projections (QB/RB/WR/TE/K/DST) with columns like: player, team, pos, proj_pts, bye.
      </div>
    </section>
  );
}
