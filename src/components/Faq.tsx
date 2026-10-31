import { useState } from "react";
import { faqs } from "../data/site";
import { GhostButton } from "./Buttons";
import { Icon } from "./FeatureIcons";
import Reveal from "./Reveal";
import { Eyebrow, Section } from "./Section";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2
            id="faq-title"
            className="mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
          >
            Questions? Answered.
          </h2>
          <p className="mt-4 max-w-[40ch] text-[15px] leading-[24px] text-muted">
            Can't find what you're looking for? Our team is happy to help.
          </p>
          <div className="mt-8">
            <GhostButton href="#contact">Talk to us</GhostButton>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="divide-y divide-ink/10 rounded-[28px] bg-panel px-6 sm:px-8">
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
                      className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-medium tracking-[-0.01em]"
                    >
                      {f.q}
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? "rotate-45 bg-brand text-white" : "bg-chip text-ink"
                        }`}
                      >
                        <Icon name="plus" size={15} />
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
                      <p className="max-w-[60ch] pb-5 text-[14.5px] leading-[23px] text-ink/75">{f.a}</p>
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
