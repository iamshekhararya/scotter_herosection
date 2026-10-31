import { scooters } from "../data/scooters";
import { features } from "../data/site";
import { GhostButton, PrimaryButton } from "./Buttons";
import CountUp from "./CountUp";
import { Icon } from "./FeatureIcons";
import Reveal from "./Reveal";
import { Eyebrow, Section } from "./Section";

/* headline numbers come straight from the model data, so they never drift */
const nums = (i: 0 | 1 | 2) => scooters.map((s) => Number(s.stats[i].value));
const stats = [
  { to: 10, suffix: "k+", label: "Positive reviews" },
  { to: Math.max(...nums(0)), suffix: " mph", label: "Top speed" },
  { to: Math.max(...nums(1)), suffix: " mi", label: "Max range" },
  { to: Math.min(...nums(2)), suffix: " h", label: "Fastest full charge", decimals: 0 },
];

export default function About() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <Eyebrow>About Skot</Eyebrow>
          <h2
            id="about-title"
            className="mt-5 text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
          >
            Silent, quick and made for the city.
          </h2>
          <p className="mt-5 max-w-[46ch] text-[15px] leading-[24px] text-muted">
            Skot builds agile electric mopeds for people who want to get across town fast – without the noise, the fumes
            or the fuss. Pick your colour, feel the torque and ride away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <PrimaryButton href="#collections">Meet the line-up</PrimaryButton>
            <GhostButton href="#services">How it works</GhostButton>
          </div>
        </Reveal>

        <ul className="grid gap-3 sm:grid-cols-2">
          {features.map((f, i) => (
            <li key={f.title}>
              <Reveal delay={i * 80} className="h-full">
                <div className="h-full rounded-[24px] bg-panel p-5 transition-transform duration-300 hover:-translate-y-1">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-chip text-ink">
                    <Icon name={f.icon} />
                  </span>
                  <h3 className="mt-6 text-[18px] font-medium tracking-[-0.02em]">{f.title}</h3>
                  <p className="mt-2 text-[14px] leading-[21px] text-muted">{f.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-ink/10 pt-8 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse">
            <dt className="mt-2 text-[13px] text-muted">{s.label}</dt>
            <dd className="text-[clamp(2.2rem,4vw,3.25rem)] font-light leading-none tracking-[-0.03em]">
              <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
