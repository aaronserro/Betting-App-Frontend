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

  return (
    <div className="min-h-screen bg-black text-white px-4 sm:px-6 lg:px-10 py-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold">
          Fantasy Football Suite
        </h1>
        <p className="text-gray-300 mt-2">
          Draft smarter. Evaluate trades. Optimize weekly lineups. Win your league.
        </p>
      </header>

      {/* Tabs */}
      <div className="overflow-x-auto">
        <div className="inline-flex rounded-2xl border-2 border-[#FFD700] bg-black">
          {TABS.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className={[
                  "px-4 sm:px-6 py-3 text-sm sm:text-base font-semibold transition",
                  isActive
                    ? "text-black bg-[#FFD700]"
                    : "text-white hover:bg-[#1a1a1a]"
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        {active === "draft" && <DraftAssistant />}
        {active === "trades" && <TradeEvaluator />}
        {active === "ros" && <RosOptimizer />}
        {active === "waivers" && <WaiversStartSit />}
      </motion.div>
    </div>
  );
}
