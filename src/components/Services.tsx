import { services, steps } from "../data/site";
import { Icon } from "./FeatureIcons";
import Reveal from "./Reveal";
import { Section, SectionHead } from "./Section";

export default function Services() {
  return (
    <Section id="services" tone="ink">
      <SectionHead
        id="services"
        tone="ink"
        eyebrow="Services"
        title="Everything after the test ride, handled."
        intro="From the first spin to the first service, we look after you and your Skot."
      />

      <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <li key={s.title}>
            <Reveal delay={i * 80} className="h-full">
              <div className="flex h-full flex-col rounded-[24px] bg-surface/10 p-5 transition-colors duration-300 hover:bg-surface/[0.16]">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface/15 text-surface">
                  <Icon name={s.icon} />
                </span>
                <h3 className="mt-6 text-[18px] font-medium tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 flex-1 text-[14px] leading-[21px] text-surface/65">{s.body}</p>
                <span className="mt-5 inline-flex self-start rounded-full bg-surface/10 px-3 py-1 text-[12px] font-medium text-surface/80">
                  {s.tag}
                </span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <ol className="mt-12 grid gap-8 border-t border-surface/15 pt-10 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.n}>
            <Reveal delay={i * 100}>
              <div className="text-[44px] font-light leading-none tracking-[-0.03em] text-brand">{s.n}</div>
              <h3 className="mt-4 text-[20px] font-medium tracking-[-0.02em]">{s.title}</h3>
              <p className="mt-2 max-w-[34ch] text-[14px] leading-[21px] text-surface/65">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
