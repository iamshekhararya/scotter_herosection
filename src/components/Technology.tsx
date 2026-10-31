import { useState } from "react";
import { tech } from "../data/site";
import { SHOE_ASPECT, VARIANTS } from "../data/variants";
import Reveal from "./Reveal";
import { GradientText, Section, SectionHead } from "./Ui";

const shoe = VARIANTS[0].shoe;

export default function Technology() {
  const [active, setActive] = useState(0);

  return (
    <Section id="products" alt>
      <SectionHead
        id="products"
        badge="Technology"
        title={["Built to feel", "like nothing."]}
        intro="Four details that make the difference. Tap a pin on the shoe, or pick a feature from the list."
      />

      <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* shoe with hotspots */}
        <Reveal>
          <div className="relative mx-auto w-full max-w-xl" style={{ aspectRatio: SHOE_ASPECT }}>
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[color:var(--accent)] opacity-30 blur-3xl transition-colors duration-1000"
            />
            <div aria-hidden className="absolute inset-[4%] rounded-full border border-white/10" />
            <div aria-hidden className="absolute inset-[14%] rounded-full border border-dashed border-white/10" />

            <div className="absolute inset-0 animate-float motion-reduce:animate-none">
              <img
                src={shoe}
                alt="Volterra running shoe with four highlighted features"
                loading="lazy"
                decoding="async"
                draggable={false}
                className="absolute inset-0 h-full w-full select-none object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)]"
              />
              {tech.map((t, i) => {
                const on = i === active;
                return (
                  <button
                    key={t.title}
                    aria-label={t.title}
                    aria-pressed={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    style={{ left: `${t.pin.x}%`, top: `${t.pin.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                  >
                    {on && (
                      <span
                        aria-hidden
                        className="absolute inset-0 animate-ping rounded-full bg-[color:var(--accent)] opacity-60 motion-reduce:hidden"
                      />
                    )}
                    <span
                      className={`relative flex h-9 w-9 items-center justify-center rounded-full border text-sm font-bold backdrop-blur transition-all duration-500 ${
                        on
                          ? "scale-110 border-white bg-[color:var(--accent)] text-white shadow-lg"
                          : "border-white/50 bg-black/40 text-white hover:bg-black/60"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* feature list */}
        <ul className="space-y-3">
          {tech.map((t, i) => {
            const on = i === active;
            const Icon = t.icon;
            return (
              <li key={t.title}>
                <Reveal delay={i * 80}>
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    aria-expanded={on}
                    className={`w-full rounded-3xl border p-5 text-left backdrop-blur-md transition-all duration-500 ${
                      on ? "border-white/40 bg-white/15 shadow-xl" : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <span className="flex items-center gap-4">
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-700 ${
                          on ? "bg-[color:var(--accent)]" : "border border-white/25 bg-white/10"
                        }`}
                      >
                        <Icon size={18} />
                      </span>
                      <span className="flex-1 text-lg font-bold tracking-tight">{t.title}</span>
                      <span className="text-sm font-semibold tabular-nums text-white/50">0{i + 1}</span>
                    </span>

                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ${
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className="mt-4 flex items-end justify-between gap-6">
                          <span className="max-w-[30ch] text-sm leading-relaxed text-white/80">{t.body}</span>
                          <span className="shrink-0 text-right">
                            <span className="block text-3xl font-extrabold leading-none tracking-tight">
                              <GradientText>{t.stat.value}</GradientText>
                            </span>
                            <span className="mt-1 block text-[11px] text-white/70">{t.stat.label}</span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
