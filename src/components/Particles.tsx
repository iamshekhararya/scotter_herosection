import type { CSSProperties } from "react";

/** Deterministic "pollen / light dust" drifting upwards. Pure CSS, no re-renders. */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 53 + 11) % 100,
  size: 2 + ((i * 7) % 4),
  delay: -((i * 37) % 20),
  duration: 14 + ((i * 11) % 12),
  drift: ((i * 29) % 60) - 30,
}));

export default function Particles() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden motion-reduce:hidden"
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute -bottom-3 animate-drift rounded-full bg-white/70 blur-[1px]"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
