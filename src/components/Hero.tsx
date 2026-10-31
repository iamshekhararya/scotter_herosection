import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { scooters } from "../data/scooters";
import { useElementSize } from "../hooks/useElementSize";
import { useReducedMotion } from "../hooks/useReducedMotion";
import Navbar from "./Navbar";
import PanelShape, { PanelGeo } from "./PanelShape";
import {
  ArrowUpRight,
  Avatar,
  BoltBadgeArt,
  PauseIcon,
  PlanetBadgeArt,
  PlayIcon,
  Star,
} from "./Icons";

const AUTOPLAY_MS = 5200;
const total = scooters.length;

type Dir = 1 | -1;
interface Slide {
  index: number;
  prev: number;
  dir: Dir;
  /** bumps on every change – used as React key to restart animations */
  tick: number;
}

interface HeroProps {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Hero({ dark, onToggleTheme: toggleTheme }: HeroProps) {
  const reduced = useReducedMotion();
  const { ref: cardRef, width, height } = useElementSize<HTMLElement>();

  const [slide, setSlide] = useState<Slide>({ index: 0, prev: -1, dir: 1, tick: 0 });
  const { index, prev, dir, tick } = slide;
  const current = scooters[index];
  const next = scooters[(index + 1) % total];

  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const autoplay = !reduced && !userPaused;
  const running = autoplay && !hover && !focus;

  /* ───────── navigation ───────── */
  const goNext = useCallback(
    () => setSlide((s) => ({ index: (s.index + 1) % total, prev: s.index, dir: 1, tick: s.tick + 1 })),
    []
  );
  const goPrev = useCallback(
    () => setSlide((s) => ({ index: (s.index - 1 + total) % total, prev: s.index, dir: -1, tick: s.tick + 1 })),
    []
  );
  const goTo = useCallback(
    (to: number) =>
      setSlide((s) =>
        to === s.index ? s : { index: to, prev: s.index, dir: to > s.index ? 1 : -1, tick: s.tick + 1 }
      ),
    []
  );

  /* arrow keys (ignored while typing in a field) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  /* swipe – horizontal only, so vertical page scroll still works on touch */
  const start = useRef<{ x: number; y: number } | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    start.current = (e.target as HTMLElement).closest("button, a") ? null : { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current;
    start.current = null;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? goNext : goPrev)();
  };

  /* preload every colour so slides never pop in */
  useEffect(() => {
    scooters.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  /* ───────── panel geometry (desktop) ───────── */
  const geo = useMemo<PanelGeo>(() => {
    const leftTop = Math.max(340, Math.round(height * 0.47));
    return {
      w: width,
      h: height,
      m: 14,
      r: 28,
      cutW: Math.round(Math.min(290, Math.max(240, width * 0.22))),
      cutH: 214,
      leftTop,
      rightTop: leftTop - 46,
      notchX: Math.round(width * 0.74),
    };
  }, [width, height]);

  /* grey strip above the info cut-out – the spec row lives there if it fits */
  const stripH = geo.h - geo.m - geo.cutH - geo.leftTop;
  const STATS_H = 68;
  const statsFit = stripH >= STATS_H + 36;
  const cssVars = {
    "--cut-w": `${geo.cutW}px`,
    "--cut-h": `${geo.cutH}px`,
    "--stats-top": `${Math.round(geo.leftTop + (stripH - STATS_H) / 2)}px`,
  } as CSSProperties;

  /* underline one phrase of the description */
  const description = (() => {
    const at = current.description.indexOf(current.highlight);
    if (at === -1) return current.description;
    return (
      <>
        {current.description.slice(0, at)}
        <span className="border-b border-ink pb-px">{current.highlight}</span>
        {current.description.slice(at + current.highlight.length)}
      </>
    );
  })();

  const dirVar = { "--dir": dir } as CSSProperties;

  return (
    <div id="home" className="flex min-h-screen items-center justify-center bg-page p-3 sm:p-5 lg:p-6">
      <section
        ref={cardRef}
        aria-roledescription="carousel"
        aria-label="Featured electric mopeds"
        style={cssVars}
        className="relative w-full max-w-[1280px] touch-pan-y select-none overflow-hidden rounded-[28px] bg-surface font-sans shadow-[0_18px_50px_rgba(70,90,100,0.18)] transition-colors duration-500 sm:rounded-[36px] lg:h-[clamp(620px,calc(100svh-3rem),780px)]"
        onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onFocus={(e) => setFocus((e.target as HTMLElement).matches(":focus-visible"))}
        onBlur={() => setFocus(false)}
      >
        <Navbar dark={dark} onToggleTheme={toggleTheme} />

        {/* grey panel with the stepped top edge + info cut-out (desktop) */}
        <PanelShape geo={geo} className="pointer-events-none absolute inset-0 z-0 hidden text-panel transition-colors duration-500 lg:block" />

        {/* ───────── headline + calls to action ───────── */}
        <div className="relative z-20 px-6 pb-2 pt-3 sm:px-10 lg:absolute lg:left-[3%] lg:top-[104px] lg:p-0">
          <h1 className="whitespace-nowrap text-[clamp(2.6rem,11vw,3.75rem)] font-medium leading-[1.06] tracking-[-0.035em] text-ink sm:text-[4.25rem] lg:text-[clamp(3rem,4.7vw,4.5rem)]">
            Super fast
            <span className="ml-3 inline-flex translate-y-[-2px] items-center gap-2 align-middle">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] sm:h-11 sm:w-11">
                <PlanetBadgeArt />
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#111] ring-1 ring-white/20 sm:h-11 sm:w-11">
                <BoltBadgeArt />
              </span>
            </span>
            <br />
            electric Moped
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#options"
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-ink pl-6 pr-1.5 text-[15px] font-medium text-surface transition-transform hover:scale-[1.03] active:scale-95"
            >
              Order now
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex h-12 items-center rounded-full bg-chip/80 px-6 text-[15px] font-medium text-ink shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-colors hover:bg-chip"
            >
              <span className="sm:hidden">Test ride</span>
              <span className="hidden sm:inline">Book a test ride</span>
            </a>
          </div>
        </div>

        {/* ───────── stage: scooter, colours, info, next model ───────── */}
        <div className="relative z-10 mx-3 mt-6 rounded-[28px] bg-panel pt-6 transition-colors duration-500 sm:mx-5 lg:contents">
          {/* scooter */}
          <div className="relative mx-auto mb-[76px] aspect-[520/486] w-[86%] max-w-[560px] lg:absolute lg:bottom-[88px] lg:left-[28%] lg:z-10 lg:m-0 lg:aspect-auto lg:h-[74%] lg:w-[48%] lg:max-w-none">
            {/* soft colour glow + ground shadow */}
            <div
              aria-hidden
              className="absolute inset-x-[12%] bottom-[4%] top-[28%] rounded-full opacity-45 blur-[60px] transition-colors duration-700"
              style={{ backgroundColor: current.glow }}
            />
            <div
              aria-hidden
              className="absolute inset-x-[10%] bottom-[-1%] h-[7%] rounded-[50%] bg-black/30 blur-[14px]"
            />

            <div className="pointer-events-none absolute inset-0">
              {prev >= 0 && prev !== index && (
                <img
                  key={`out-${tick}`}
                  src={scooters[prev].image}
                  alt=""
                  aria-hidden
                  draggable={false}
                  style={dirVar}
                  className="absolute inset-0 h-full w-full animate-slideOut object-contain object-bottom"
                />
              )}
              <img
                key={`in-${tick}`}
                src={current.image}
                alt={`${current.colorName} electric moped`}
                draggable={false}
                decoding="async"
                {...({ fetchpriority: tick === 0 ? "high" : "auto" } as object)}
                style={dirVar}
                className="absolute inset-0 h-full w-full animate-slideIn object-contain object-bottom drop-shadow-[0_18px_22px_rgba(0,0,0,0.18)]"
              />
            </div>

            {/* colour picker + pause */}
            <div className="absolute left-1/2 top-full z-30 mt-4 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full bg-chip/70 py-2 pl-4 pr-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] backdrop-blur">
              <div role="radiogroup" aria-label="Colour" className="flex items-center gap-2.5">
                {scooters.map((s, i) => (
                  <button
                    key={s.id}
                    role="radio"
                    aria-checked={i === index}
                    aria-label={s.colorName}
                    onClick={() => goTo(i)}
                    style={{ backgroundColor: s.swatch }}
                    className={`h-6 w-6 rounded-full transition-transform duration-200 ${
                      i === index
                        ? "scale-110 ring-2 ring-ink ring-offset-2 ring-offset-chip"
                        : "ring-1 ring-ink/20 hover:scale-110"
                    }`}
                  />
                ))}
              </div>
              <span className="w-[46px] text-[13px] font-medium text-ink">{current.colorName}</span>
              {!reduced && (
                <button
                  aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                  onClick={() => setUserPaused((p) => !p)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-ink/10 text-ink transition-colors hover:bg-ink/20"
                >
                  {userPaused ? <PlayIcon /> : <PauseIcon />}
                </button>
              )}
            </div>
          </div>

          {/* next-colour button with autoplay progress ring */}
          <div className="absolute right-4 top-4 z-30 h-[64px] w-[64px] lg:bottom-[34px] lg:left-[calc(var(--cut-w)-6px)] lg:right-auto lg:top-auto">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 64 64" aria-hidden>
              <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/10" />
              {autoplay && (
                <circle
                  key={tick}
                  cx="32"
                  cy="32"
                  r="30"
                  fill="none"
                  stroke="#f0413c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  className="animate-ring"
                  style={{
                    animationDuration: `${AUTOPLAY_MS}ms`,
                    animationPlayState: running ? "running" : "paused",
                  }}
                  onAnimationEnd={goNext}
                />
              )}
            </svg>
            <button
              onClick={goNext}
              aria-label={`Next colour: ${next.colorName}`}
              className="absolute inset-[6px] flex items-center justify-center rounded-full bg-brand text-white shadow-[0_0_22px_rgba(240,65,60,0.6)] transition-transform hover:scale-105 active:scale-95"
            >
              <ArrowUpRight />
            </button>
          </div>

          {/* model info (sits in the cut-out on desktop) */}
          <div
            key={current.id}
            className="relative z-20 animate-fadeUp px-6 pb-2 pt-1 sm:px-8 lg:absolute lg:bottom-[34px] lg:left-[34px] lg:w-[calc(var(--cut-w)-52px)] lg:p-0"
          >
            <div className="text-[40px] font-light leading-none tracking-[-0.02em] text-ink lg:text-[36px]">{current.code}</div>
            <div className="mt-2 text-[13px] leading-[18px] text-muted">{current.model}</div>
            <p className="mt-3 max-w-[34ch] text-[14px] font-medium leading-[21px] text-ink lg:text-[13.5px] lg:leading-[20px]">
              {description}
            </p>
          </div>

          {/* quick specs */}
          <dl
            key={`stats-${current.id}`}
            className={`relative z-20 mx-6 mb-2 mt-4 grid animate-fadeUp grid-cols-3 gap-3 border-t border-ink/10 pt-4 sm:mx-8 lg:absolute lg:left-[3%] lg:top-[var(--stats-top)] lg:m-0 lg:w-[clamp(250px,26%,330px)] lg:border-ink/15 ${
              statsFit ? "" : "lg:hidden"
            }`}
          >
            {current.stats.map((s) => (
              <div key={s.label}>
                <dd className="text-[22px] font-medium leading-none tracking-[-0.02em] text-ink">
                  {s.value}
                  <span className="ml-0.5 text-[12px] font-normal text-muted">{s.unit}</span>
                </dd>
                <dt className="mt-1.5 text-[12px] text-muted">{s.label}</dt>
              </div>
            ))}
          </dl>

          {/* next-model card */}
          <div className="relative z-20 mx-6 mb-6 mt-5 sm:mx-8 sm:max-w-[340px] lg:absolute lg:bottom-[34px] lg:right-[34px] lg:m-0 lg:w-[196px] xl:w-[228px]">
            {/* ghost cards give a "stack of models" feel */}
            <div aria-hidden className="absolute inset-x-4 -top-2 h-full rounded-[20px] bg-chip/35" />
            <div aria-hidden className="absolute inset-x-8 -top-4 h-full rounded-[20px] bg-chip/20" />
            <button
              onClick={goNext}
              aria-label={`Next model: ${next.thumbName}, ${next.colorName}`}
              className="relative flex w-full items-center gap-3.5 rounded-[20px] bg-chip/90 p-2.5 text-left shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
            >
              <span className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[14px] bg-gradient-to-br from-panel to-panel/50">
                <img
                  key={next.id}
                  src={next.image}
                  alt=""
                  draggable={false}
                  className="absolute inset-0 h-full w-full origin-[78%_74%] scale-[1.7] animate-fadeUp object-contain"
                />
              </span>
              <span key={`t-${next.id}`} className="animate-fadeUp">
                <span className="block text-[11px] font-medium uppercase tracking-[0.08em] text-muted">Next</span>
                <span className="mt-0.5 block text-[15px] font-medium leading-[18px] text-ink">{next.thumbCode}</span>
                <span className="block text-[12.5px] leading-[17px] text-muted">{next.thumbName}</span>
              </span>
            </button>
          </div>
        </div>

        {/* ───────── reviews ───────── */}
        <div className="relative z-20 flex items-center gap-4 px-6 pb-7 pt-5 sm:px-10 lg:absolute lg:right-[3%] lg:top-[112px] lg:block lg:p-0">
          <div className="flex items-center">
            {([0, 1, 2] as const).map((v) => (
              <span key={v} className="-ml-2.5 overflow-hidden rounded-full ring-2 ring-surface first:ml-0">
                <Avatar variant={v} size={34} />
              </span>
            ))}
            <span className="-ml-2.5 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-chip text-[16px] text-ink ring-2 ring-surface">
              +
            </span>
          </div>
          <p className="text-[13px] leading-[19px] text-ink lg:mt-3">
            <strong className="font-semibold">10k+</strong> positive reviews
            <span className="mt-0.5 flex gap-0.5 text-[#e2ac52]" role="img" aria-label="Rated 5 out of 5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} />
              ))}
            </span>
          </p>
        </div>

        {/* screen-reader announcement (quiet while autoplaying) */}
        <p className="sr-only" aria-live={running ? "off" : "polite"} aria-atomic>
          {`${current.colorName} ${current.code}, ${current.model}. Slide ${index + 1} of ${total}.`}
        </p>
      </section>
    </div>
  );
}
