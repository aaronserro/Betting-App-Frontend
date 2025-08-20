// src/pages/fantasy/FantasyFootballPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import DraftAssistant from "./Features/DraftAssistant.jsx"
import TradeEvaluator from "./Features/TradeEvaluator.jsx";
import RosOptimizer from "./Features/RosOptimizer.jsx";
import WaiversStartSit from "./Features/WaiversStartSit.jsx";

const TABS = [
  { key: "draft", label: "Draft Assistant" },
  { key: "trades", label: "Trade Evaluator" },
  { key: "ros", label: "ROS Optimizer" },
  { key: "waivers", label: "Waivers / Start–Sit" },
];

export default function FantasyPage() {
  const [active, setActive] = useState("draft");
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
