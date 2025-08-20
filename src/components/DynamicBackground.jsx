// src/components/DynamicBackground.jsx
import { useEffect, useState } from "react";

const IMG_PATHS = [
  "/images/nfl/stadium1.jpg",
  "/images/nfl/stadium2.jpg",
  "/images/nfl/helmet1.jpg",
  "/images/nfl/football1.jpg",
];

export default function DynamicBackground() {
  const [idx, setIdx] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const int = setInterval(() => setIdx(i => (i + 1) % IMG_PATHS.length), 20000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,#0a0a0a,transparent_40%),radial-gradient(circle_at_80%_30%,#1a1a1a,transparent_35%),radial-gradient(circle_at_50%_90%,#111,transparent_45%)] animate-pulse" />
      {IMG_PATHS.map((src, i) => (
        <img
          key={src}
          src={src}
          onLoad={() => setLoaded(true)}
          alt=""
          aria-hidden="true"
          className={[
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ease-out",
            i === idx && loaded ? "opacity-40" : "opacity-0",
          ].join(" ")}
          style={{ transform: "translateZ(0) scale(1.04)" }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.06) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
