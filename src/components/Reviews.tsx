import { reviews } from "../data/site";
import { Avatar, Star } from "./Icons";
import Reveal from "./Reveal";
import { Section, SectionHead } from "./Section";

const Stars = () => (
  <span className="flex gap-0.5 text-[#e2ac52]" role="img" aria-label="Rated 5 out of 5">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} />
    ))}
  </span>
);

export default function Reviews() {
  return (
    <Section id="reviews" tone="panel">
      <SectionHead
        id="reviews"
        eyebrow="Reviews"
        title="Riders love the silence."
        action={
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {([0, 1, 2] as const).map((v) => (
                <span key={v} className="-ml-2.5 overflow-hidden rounded-full ring-2 ring-panel first:ml-0">
                  <Avatar variant={v} size={34} />
                </span>
              ))}
            </div>
            <p className="text-[13px] leading-[19px]">
              <strong className="font-semibold">10k+</strong> positive reviews
              <span className="mt-0.5 block">
                <Stars />
              </span>
            </p>
          </div>
        }
      />

      <ul className="mt-10 grid gap-3 md:grid-cols-3">
        {reviews.map((r, i) => (
          <li key={r.name}>
            <Reveal delay={i * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-[28px] bg-surface p-6">
                <Stars />
                <blockquote className="mt-5 flex-1 text-[17px] leading-[26px] tracking-[-0.01em]">“{r.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Avatar variant={r.avatar} size={40} />
                  <span className="text-[14px] leading-[19px]">
                    <span className="block font-medium">{r.name}</span>
                    <span className="block text-muted">{r.place}</span>
                  </span>
                  {r.sample && (
                    <span className="ml-auto rounded-full border border-ink/20 px-2.5 py-0.5 text-[11px] text-muted">Sample</span>
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
