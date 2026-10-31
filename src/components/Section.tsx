import { ReactNode } from "react";
import Reveal from "./Reveal";

export type Tone = "surface" | "panel" | "ink" | "brand";

const tones: Record<Tone, string> = {
  surface: "bg-surface text-ink",
  panel: "bg-panel text-ink",
  ink: "bg-ink text-surface",
  brand: "bg-brand text-white",
};

/** A rounded card on the page background – same shape language as the hero. */
export function Section({
  id,
  tone = "surface",
  children,
}: {
  id: string;
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24 px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
      <div
        className={`mx-auto max-w-[1280px] rounded-[28px] p-6 transition-colors duration-500 sm:rounded-[36px] sm:p-10 lg:p-14 ${tones[tone]}`}
      >
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children, tone = "surface" }: { children: ReactNode; tone?: Tone }) {
  const style =
    tone === "ink"
      ? "bg-surface/10 text-surface"
      : tone === "brand"
        ? "bg-white/15 text-white"
        : "bg-chip/80 text-ink shadow-[0_1px_4px_rgba(0,0,0,0.05)]";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium ${style}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone === "brand" ? "bg-white" : "bg-brand"}`} />
      {children}
    </span>
  );
}

/** Eyebrow + big headline + intro, with an optional control on the right. */
export function SectionHead({
  id,
  eyebrow,
  title,
  intro,
  action,
  tone = "surface",
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  action?: ReactNode;
  tone?: Tone;
}) {
  const subdued = tone === "ink" ? "text-surface/65" : tone === "brand" ? "text-white/80" : "text-muted";
  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <h2
          id={`${id}-title`}
          className="mt-5 max-w-[18ch] text-[clamp(2.1rem,4.4vw,3.6rem)] font-medium leading-[1.06] tracking-[-0.035em]"
        >
          {title}
        </h2>
        {intro && <p className={`mt-4 max-w-[52ch] text-[15px] leading-[24px] ${subdued}`}>{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}
