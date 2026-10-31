import type { ReactNode } from "react";
import { Star, Zap } from "lucide-react";
import { VARIANTS } from "../data/variants";
import Reveal from "./Reveal";

/* ───────── section shell ───────── */

interface SectionProps {
  id: string;
  children: ReactNode;
  /** slightly darker background, to alternate sections */
  alt?: boolean;
  /** show the hero's backgrounds (crossfading to this colourway) behind the section */
  backdrop?: { index: number; top: string; bottom: string };
}

export function Section({ id, children, alt = false, backdrop }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative scroll-mt-16 overflow-hidden px-6 py-20 text-white lg:px-10 lg:py-28 ${
        alt ? "bg-slate-950" : "bg-slate-900"
      }`}
    >
      {backdrop && (
        <div aria-hidden className="absolute inset-0">
          {VARIANTS.map((v, i) => (
            <img
              key={v.id}
              src={v.background}
              alt=""
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:transition-none ${
                i === backdrop.index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-slate-950/70" />
          <div
            className="absolute inset-x-0 top-0 h-44"
            style={{ backgroundImage: `linear-gradient(to bottom, ${backdrop.top}, transparent)` }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-44"
            style={{ backgroundImage: `linear-gradient(to top, ${backdrop.bottom}, transparent)` }}
          />
        </div>
      )}
      {/* soft glow in the current accent colour */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[color:var(--accent)] opacity-[0.14] blur-3xl transition-colors duration-1000"
      />
      <div className="relative mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

/* ───────── headings ───────── */

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur">
      <Zap size={13} className="text-[color:var(--from)]" />
      {children}
    </span>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span
      className="-mb-[0.12em] block bg-clip-text pb-[0.12em] text-transparent [text-shadow:none]"
      style={{ backgroundImage: "linear-gradient(90deg, var(--from), var(--to))" }}
    >
      {children}
    </span>
  );
}

export function SectionHead({
  id,
  badge,
  title,
  intro,
  action,
}: {
  id: string;
  badge: string;
  title: [string, string];
  intro?: string;
  action?: ReactNode;
}) {
  return (
    <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <Badge>{badge}</Badge>
        <h2
          id={`${id}-title`}
          className="mt-6 max-w-2xl text-balance text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title[0]}
          <GradientText>{title[1]}</GradientText>
        </h2>
        {intro && <p className="mt-5 max-w-lg text-balance text-[15px] leading-relaxed text-white/80">{intro}</p>}
      </div>
      {action}
    </Reveal>
  );
}

/* ───────── buttons ───────── */

interface BtnProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const accentCls =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--accent)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-[transform,filter,background-color] duration-500 hover:-translate-y-0.5 hover:brightness-110";

const glassCls =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-white/30 bg-white/15 px-6 py-3.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25";

export function AccentButton({ children, href, onClick, type = "button", className = "" }: BtnProps) {
  return href ? (
    <a href={href} onClick={onClick} className={`${accentCls} ${className}`}>
      {children}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={`${accentCls} ${className}`}>
      {children}
    </button>
  );
}

export function GlassButton({ children, href, onClick, className = "" }: BtnProps) {
  return (
    <a href={href ?? "#"} onClick={onClick} className={`${glassCls} ${className}`}>
      {children}
    </a>
  );
}

/* ───────── small bits ───────── */

export function Stars() {
  return (
    <span className="flex gap-0.5" role="img" aria-label="Rated 5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
      ))}
    </span>
  );
}

/** the frosted-glass look used across the hero (info card, switcher, badges) */
export const glass = "border border-white/25 bg-white/10 backdrop-blur-md";
