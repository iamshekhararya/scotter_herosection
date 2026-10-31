import { reviews } from "../data/site";
import Reveal from "./Reveal";
import { Section, SectionHead, Stars, glass } from "./Ui";

export default function Reviews() {
  return (
    <Section id="reviews" alt>
      <SectionHead
        id="reviews"
        badge="Reviews"
        title={["Runners love", "the feeling."]}
        intro="What it's like to lace up a pair of Volterras."
      />
      <ul className="mt-12 grid gap-4 md:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={r.name}>
            <Reveal delay={i * 90} className="h-full">
              <figure className={`flex h-full flex-col rounded-3xl p-6 shadow-xl ${glass}`}>
                <Stars />
                <blockquote className="mt-5 flex-1 text-[17px] font-medium leading-relaxed">“{r.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--accent)] text-sm font-bold transition-colors duration-700">
                    {r.name.slice(-1)}
                  </span>
                  <span className="text-sm leading-tight">
                    <span className="block font-semibold">{r.name}</span>
                    <span className="block text-white/70">{r.role}</span>
                  </span>
                  {r.sample && (
                    <span className="ml-auto rounded-full border border-white/30 px-2.5 py-0.5 text-[11px] text-white/70">
                      Sample
                    </span>
                  )}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
