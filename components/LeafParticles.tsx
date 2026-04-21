"use client";

/**
 * Subtle falling leaf particles for atmosphere.
 * Pure CSS animation — no libraries.
 */
export default function LeafParticles() {
  const leaves = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 7,
    size: 8 + Math.random() * 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[2]" aria-hidden>
      {leaves.map((l) => (
        <div
          key={l.id}
          className="absolute opacity-0"
          style={{
            left: `${l.left}%`,
            top: "-30px",
            width: l.size,
            height: l.size,
            animation: `leafFall ${l.duration}s ease-in-out ${l.delay}s infinite`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75"
              stroke="rgba(107,155,74,0.55)"
              strokeWidth="1.2"
              fill="rgba(107,155,74,0.15)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
