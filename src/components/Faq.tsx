import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "../data/site";
import Reveal from "./Reveal";
import { Badge, GlassButton, GradientText, Section, glass } from "./Ui";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <Badge>FAQ</Badge>
          <h2
            id="faq-title"
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Got questions?
            <GradientText>We've got answers.</GradientText>
          </h2>
          <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/80">
            Can't find what you're looking for? Our team is happy to help.
          </p>
          <div className="mt-8">
            <GlassButton href="#contact">Talk to us</GlassButton>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className={`divide-y divide-white/15 rounded-3xl px-6 shadow-xl sm:px-8 ${glass}`}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <h3>
                    <button
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold sm:text-lg"
                    >
                      {f.q}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? "rotate-45 bg-[color:var(--accent)]" : "border border-white/30 bg-white/10"
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-a-${i}`}
                    role="region"
                    aria-labelledby={`faq-q-${i}`}
                    className={`grid transition-[grid-template-rows,visibility] duration-300 ${
                      isOpen ? "visible grid-rows-[1fr]" : "invisible grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[60ch] pb-5 text-[15px] leading-relaxed text-white/80">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
