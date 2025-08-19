// src/pages/fantasy/features/WaiversStartSit.jsx
import { useState } from "react";

export default function WaiversStartSit() {
  const [playerA, setPlayerA] = useState("");
  const [playerB, setPlayerB] = useState("");

  return (
    <section className="rounded-3xl border-2 border-[#FFD700] p-5 bg-black">
      <h2 className="text-2xl font-bold mb-4">Waivers / Start–Sit</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Player A</label>
          <input
            value={playerA}
            onChange={(e) => setPlayerA(e.target.value)}
            className="block w-full rounded-lg border border-gray-700 bg-black p-2"
            placeholder="e.g., Jayden Daniels"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Player B</label>
          <input
            value={playerB}
            onChange={(e) => setPlayerB(e.target.value)}
            className="block w-full rounded-lg border border-gray-700 bg-black p-2"
            placeholder="e.g., Malik Nabers"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button className="rounded-xl bg-[#FFD700] text-black px-4 py-2 font-bold hover:opacity-90">
          Compare Start–Sit
        </button>
        <button className="rounded-xl border-2 border-[#FFD700] px-4 py-2 font-semibold hover:bg-[#111]">
          Show Top Waivers
        </button>
      </div>

      {/* TODO: results tables for start-sit reasoning and waiver rankings */}
      <div className="mt-6 text-gray-300 text-sm">
        Start–Sit uses ROS projections, opponent SoS, and your roster needs (bye weeks) to recommend a starter.
      </div>
    </section>
  );
}
