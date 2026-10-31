import { useState } from "react";
import { addons, plans } from "../data/site";
import { PrimaryButton } from "./Buttons";
import { Icon } from "./FeatureIcons";
import Reveal from "./Reveal";
import { Section, SectionHead } from "./Section";

const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function Options() {
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const total = addons.filter((a) => picked.includes(a.id)).reduce((sum, a) => sum + a.price, 0);

  return (
    <Section id="options">
      <SectionHead
        id="options"
        eyebrow="Options"
        title="Buy it, lease it or subscribe."
        intro="Choose how you want to ride. Every plan includes the full Skot line-up and a free test ride."
      />

      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {plans.map((p, i) => (
          <li key={p.id}>
            <Reveal delay={i * 90} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-[28px] p-6 ${
                  p.featured ? "bg-ink text-surface" : "bg-panel text-ink"
                }`}
              >
                {p.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-brand px-3 py-1 text-[12px] font-medium text-white">
                    Most popular
                  </span>
                )}
                <h3 className="text-[20px] font-medium tracking-[-0.02em]">{p.name}</h3>
                <p className={`mt-1 text-[14px] ${p.featured ? "text-surface/65" : "text-muted"}`}>{p.blurb}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-[46px] font-light leading-none tracking-[-0.03em]">{money.format(p.price)}</span>
                  <span className={`text-[13px] ${p.featured ? "text-surface/65" : "text-muted"}`}>{p.unit}</span>
                </div>

                <ul className="mt-6 flex-1 space-y-3 text-[14px]">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          p.featured ? "bg-surface/15" : "bg-chip"
                        }`}
                      >
                        <Icon name="check" size={13} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <PrimaryButton href="#contact" invert={p.featured}>
                    Choose {p.name}
                  </PrimaryButton>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* add-ons */}
      <Reveal className="mt-3">
        <div className="grid gap-6 rounded-[28px] bg-panel p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h3 className="text-[22px] font-medium tracking-[-0.02em]">Make it yours</h3>
            <p className="mt-1 text-[14px] text-muted">Tap to add accessories and see the extra cost.</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {addons.map((a) => {
                const on = picked.includes(a.id);
                return (
                  <button
                    key={a.id}
                    aria-pressed={on}
                    onClick={() => toggle(a.id)}
                    className={`inline-flex h-11 items-center gap-2 rounded-full pl-3 pr-4 text-[14px] font-medium transition-colors ${
                      on ? "bg-ink text-surface" : "bg-chip/80 text-ink shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:bg-chip"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors ${
                        on ? "bg-brand text-white" : "bg-ink/10"
                      }`}
                    >
                      <Icon name={on ? "check" : "plus"} size={13} />
                    </span>
                    {a.label}
                    <span className={on ? "text-surface/65" : "text-muted"}>{money.format(a.price)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-[22px] bg-surface px-7 py-5 lg:min-w-[220px]" role="status" aria-live="polite">
            <div className="text-[13px] text-muted">
              Add-ons{picked.length ? ` (${picked.length})` : ""}
            </div>
            <div className="mt-1 text-[36px] font-light leading-none tracking-[-0.03em]">{money.format(total)}</div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
