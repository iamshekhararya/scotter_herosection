import { aboutStats } from "../data/site";
import { VARIANTS } from "../data/variants";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import { AccentButton, Badge, GradientText, Section, glass } from "./Ui";
import { ArrowRight } from "lucide-react";

export default function About({ index }: { index: number }) {
  const stats = [
    ...aboutStats,
    { to: VARIANTS.length, suffix: "", label: "Colourways" },
    { to: 4, suffix: "", label: "Core technologies" },
  ];

  return (
    <Section id="about" backdrop={{ index, top: "#020617", bottom: "#020617" }}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Badge>Our story</Badge>
          <h2
            id="about-title"
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-shadow sm:text-5xl lg:text-6xl"
          >
            Engineered for
            <GradientText>the dreamers.</GradientText>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/90 text-shadow">
            Volterra started with one idea: a running shoe so light and comfortable that you stop thinking about your feet
            and start thinking about the road ahead.
          </p>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80 text-shadow">
            Every pair is built from breathable mesh, responsive cushioning and recycled materials, then finished in
            colours that match your mood.
          </p>
          <div className="mt-8">
            <AccentButton href="#shop">
              Shop the collection <ArrowRight size={16} />
            </AccentButton>
          </div>
        </Reveal>

        <dl className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <div className={`flex flex-col-reverse rounded-3xl p-6 shadow-xl ${glass}`}>
                <dt className="mt-2 text-sm text-white/80">{s.label}</dt>
                <dd className="text-5xl font-extrabold leading-none tracking-tight">
                  <CountUp to={s.to} suffix={s.suffix} />
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </Section>
  );
}
