// src/components/GameCard.jsx
import { Link } from "react-router-dom";

export default function GameCard({ title, to, comingSoon = false, children }) {
  const Wrapper = comingSoon ? "div" : Link;

  return (
    <div className="relative rounded-xl border p-4 bg-white/80 shadow hover:shadow-md transition">
      {/* Coming soon ribbon */}
      {comingSoon && (
        <div className="absolute right-2 top-2 rounded bg-gray-900/90 px-2 py-1 text-xs font-semibold text-white">
          Coming soon
        </div>
      )}

      {/* Clickable area (disabled when comingSoon) */}
      <Wrapper
        {...(!comingSoon ? { to } : {})}
        className={`block rounded-lg p-4 ${
          comingSoon ? "pointer-events-none opacity-60" : ""
        }`}
        aria-disabled={comingSoon ? "true" : undefined}
      >
        <div className="mb-2 text-lg font-bold">{title}</div>
        <div className="text-sm text-gray-600">{children}</div>
      </Wrapper>
    </div>
  );
}
