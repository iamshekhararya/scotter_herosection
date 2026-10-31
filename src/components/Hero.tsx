import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Feather,
  Leaf,
  Menu,
  Mouse,
  Pause,
  Play,
  Search,
  ShieldCheck,
  ShoppingBag,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { SHOE_ASPECT, VARIANTS } from "../data/variants";
import { navLinks as NAV_LINKS } from "../data/site";
import Particles from "./Particles";

const FEATURES = [
  { icon: Feather, title: "Ultra Light", sub: "Feel the freedom" },
  { icon: Wind, title: "Breathable Mesh", sub: "Stay cool" },
  { icon: ShieldCheck, title: "Durable Grip", sub: "All terrain" },
  { icon: Leaf, title: "Eco Friendly", sub: "A better tomorrow" },
];

const AUTOPLAY_MS = 7000;
const COUNT = VARIANTS.length;
const pad = (n: number) => String(n).padStart(2, "0");

interface HeroProps {
  /** number on the cart badge (the page keeps the count) */
  cartCount?: number;
  /** told whenever the colourway changes, so the rest of the page can follow the hero's accent */
  onIndexChange?: (index: number) => void;
}

export default function Hero({ cartCount = 2, onIndexChange }: HeroProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const swipeStartX = useRef<number | null>(null);

  const active = VARIANTS[index];
  /* auto-play also rests while the hero is scrolled out of view */
  const paused = userPaused || hovered || !visible;

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % COUNT), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + COUNT) % COUNT), []);

  /* start the slow background zoom after first paint */
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  /* keyboard: arrows switch shoes, Escape closes the mobile menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // arrow keys must keep working inside the form fields further down the page
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) {
        if (e.key === "Escape") setMenuOpen(false);
        return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  /* pointer depth effect: writes CSS variables only, so no re-renders */
  const onPointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--px", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const onSectionLeave = (e: ReactPointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    sectionRef.current?.style.setProperty("--px", "0");
    sectionRef.current?.style.setProperty("--py", "0");
  };

  /* auto-play pauses only while the mouse is over the shoe or the controls */
  const hoverPause = {
    onPointerEnter: (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") setHovered(true);
    },
    onPointerLeave: (e: ReactPointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") setHovered(false);
    },
  };

  /* touch swipe on the shoe */
  const onStageDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") swipeStartX.current = e.clientX;
  };
  const onStageUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  };

  const themeVars = {
    "--accent": active.accent,
    "--from": active.gradient[0],
    "--to": active.gradient[1],
  } as CSSProperties;

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Featured shoe colours"
      onPointerMove={onPointerMove}
      onPointerLeave={onSectionLeave}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-slate-900 text-white"
      style={themeVars}
    >
      {/* ------------------ BACKGROUNDS (cross-fade + slow zoom + depth) ------------------ */}
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: "translate3d(calc(var(--px, 0) * -10px), calc(var(--py, 0) * -6px), 0)" }}
        >
          {VARIANTS.map((v, i) => (
            <img
              key={v.id}
              src={v.background}
              alt=""
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover ease-out [transition-duration:1000ms,16000ms] [transition-property:opacity,transform] motion-reduce:transition-none ${
                i === index ? "opacity-100" : "opacity-0"
              } ${i === index && ready ? "scale-[1.12]" : "scale-[1.04]"}`}
            />
          ))}
        </div>
        {/* readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/5" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black/65 to-transparent" />
      </div>

      <Particles />

      {/* ------------------------- NAVBAR ------------------------- */}
      <header className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <a href="#home" className="flex items-center gap-2" aria-label="Volterra home">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M2 6l9 4 5-6 5 6 9-4-4 12-10 10L6 18 2 6z" fill="currentColor" />
          </svg>
          <span className="text-lg font-semibold tracking-[0.2em]">VOLTERRA</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-white/90 transition hover:text-white"
            >
              {link.label}
              {i === 0 && (
                <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded bg-[color:var(--accent)] transition-colors duration-700" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Search" className="transition hover:text-white/70">
            <Search size={19} />
          </button>
          <button aria-label={`Cart, ${cartCount} items`} className="relative transition hover:text-white/70">
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--accent)] px-1 text-[10px] font-bold text-white transition-colors duration-700">
                {cartCount}
              </span>
            )}
          </button>
          <a
            href="#shop"
            className="hidden items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white/85 sm:flex"
          >
            Shop Now <ArrowRight size={15} />
          </a>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-4 top-full z-40 mt-1 animate-fade-up rounded-2xl border border-white/25 bg-black/60 p-3 backdrop-blur-xl lg:hidden"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#shop"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block w-full rounded-full bg-white py-3 text-center text-sm font-semibold text-slate-900 sm:hidden"
            >
              Shop Now
            </a>
          </nav>
        )}
      </header>

      {/* --------------------------- MAIN --------------------------- */}
      <div className="relative z-10 flex flex-1 flex-col justify-center">
        <div className="mx-auto w-full max-w-7xl px-6 pb-0 pt-4 lg:px-10 lg:pb-36">
          <div className="relative z-20 max-w-2xl">
            {/* text that changes with the shoe */}
            <div key={active.id} aria-live="polite">
              <span
                className="inline-flex animate-fade-up items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur"
                style={{ animationDelay: "0ms" }}
              >
                <Zap size={13} className="text-[color:var(--from)]" />
                {active.badge}
              </span>

              <h1
                className="mt-6 animate-fade-up text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-shadow sm:text-6xl lg:text-7xl"
                style={{ animationDelay: "90ms" }}
              >
                {active.headline[0]}
                <span
                  className="block bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)] [text-shadow:none]"
                  style={{ backgroundImage: "linear-gradient(90deg, var(--from), var(--to))" }}
                >
                  {active.headline[1]}
                </span>
              </h1>

              <p
                className="mt-6 max-w-md animate-fade-up text-balance text-[15px] leading-relaxed text-white/90 text-shadow"
                style={{ animationDelay: "180ms" }}
              >
                {active.description}
              </p>
            </div>

            {/* buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-4 sm:gap-x-6">
              <a
                href="#shop"
                className="flex items-center gap-2 whitespace-nowrap rounded-full bg-[color:var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition duration-700 hover:-translate-y-0.5 hover:brightness-110 sm:px-7"
              >
                Shop Collection <ArrowRight size={16} />
              </a>
              <button className="group flex items-center gap-3 whitespace-nowrap text-sm font-medium">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/15 backdrop-blur transition group-hover:scale-105">
                  <Play size={15} className="ml-0.5 fill-white" />
                </span>
                Watch Video
              </button>
            </div>

            {/* feature icons */}
            <ul className="mt-10 hidden max-w-md grid-cols-4 gap-4 sm:grid">
              {FEATURES.map(({ icon: Icon, title, sub }) => (
                <li key={title} className="flex flex-col items-center text-center">
                  <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur">
                    <Icon size={17} />
                  </span>
                  <span className="text-xs font-semibold text-shadow">{title}</span>
                  <span className="text-[10px] text-white/90 text-shadow">{sub}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ------------------- SHOE STAGE (images stacked) ------------------- */}
        <div
          {...hoverPause}
          onPointerDown={onStageDown}
          onPointerUp={onStageUp}
          onPointerCancel={() => (swipeStartX.current = null)}
          className="relative mx-auto mb-44 mt-6 w-[88%] max-w-md touch-pan-y lg:absolute lg:right-[3%] lg:top-1/2 lg:mb-0 lg:mt-0 lg:w-[min(46vw,78vh)] lg:max-w-none lg:-translate-y-1/2"
          style={{ aspectRatio: SHOE_ASPECT }}
        >
          {/* shadow on the "ground", breathes opposite to the float */}
          <div className="absolute -bottom-[3%] left-1/2 w-[58%] -translate-x-1/2" aria-hidden>
            <div className="h-6 animate-shadow rounded-[50%] bg-black/50 blur-xl motion-reduce:animate-none" />
          </div>

          {/* pointer depth (tilt + shift) */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform:
                "perspective(1100px) rotateY(calc(var(--px, 0) * 6deg)) rotateX(calc(var(--py, 0) * -4deg)) translate3d(calc(var(--px, 0) * 16px), calc(var(--py, 0) * 10px), 0)",
            }}
          >
            {/* colour glow behind the shoe */}
            <div
              className="absolute left-1/2 top-1/2 h-[75%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl transition-colors duration-1000"
              style={{ backgroundColor: "var(--accent)" }}
            />

            <div className="absolute inset-0 animate-float motion-reduce:animate-none">
              {VARIANTS.map((v, i) => (
                <img
                  key={v.id}
                  src={v.shoe}
                  alt={i === index ? `Volterra running shoe, ${v.colorName}` : ""}
                  aria-hidden={i !== index}
                  draggable={false}
                  decoding="async"
                  className={`pointer-events-none absolute inset-0 h-full w-full select-none object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.5)] transition-all duration-1000 ease-out motion-reduce:transition-none ${
                    i === index
                      ? "translate-x-0 rotate-0 scale-100 opacity-100"
                      : i < index
                      ? "-translate-x-24 -rotate-6 scale-90 opacity-0"
                      : "translate-x-24 rotate-6 scale-90 opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- glass info card (changes with the shoe) ---------- */}
      <div
        key={active.id}
        className="absolute right-10 top-28 z-20 hidden w-72 animate-fade-up items-center gap-4 rounded-2xl border border-white/30 bg-white/15 p-4 shadow-xl backdrop-blur-md xl:flex"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--accent)]">
          <active.card.icon size={18} />
        </span>
        <div className="flex-1">
          <p className="text-sm font-semibold">{active.card.title}</p>
          <p className="text-xs text-white/85">{active.card.text}</p>
        </div>
        <ArrowRight size={16} />
      </div>

      {/* -------- colour switcher + controls (bottom-left) -------- */}
      <div
        {...hoverPause}
        className="absolute bottom-6 left-6 right-6 z-20 flex flex-col gap-2.5 rounded-2xl border border-white/30 bg-black/25 p-2.5 backdrop-blur-md sm:right-auto lg:bottom-8 lg:left-10">
        <div className="flex items-center gap-3">
          {VARIANTS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => setIndex(i)}
              aria-label={`Show ${v.colorName}`}
              aria-pressed={i === index}
              style={{ "--tw-ring-color": v.accent } as CSSProperties}
              className={`h-14 w-14 shrink-0 overflow-hidden sm:w-16 rounded-xl bg-white/85 p-1 transition ${
                i === index ? "ring-2" : "opacity-70 hover:opacity-100"
              }`}
            >
              <img src={v.shoe} alt="" className="h-full w-full object-contain" />
            </button>
          ))}

          <div className="ml-1 pr-2 max-[359px]:hidden">
            <p className="text-xs font-semibold">{COUNT} Colors</p>
            <p key={active.id} className="animate-fade-up whitespace-nowrap text-[10px] text-white/80">
              {active.colorName}
            </p>
            <div className="mt-1.5 flex gap-1.5">
              {VARIANTS.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Show ${v.colorName}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? "scale-125 ring-2 ring-white" : "opacity-80"
                  }`}
                  style={{ backgroundColor: v.dot }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* prev / progress / next / pause */}
        <div className="flex items-center gap-2 px-1 pb-0.5">
          <button
            onClick={prev}
            aria-label="Previous colour"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"
          >
            <ChevronLeft size={15} />
          </button>

          <span className="w-5 text-[11px] font-semibold tabular-nums">{pad(index + 1)}</span>

          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/25">
            <div
              key={index}
              onAnimationEnd={next}
              className="h-full origin-left scale-x-0 rounded-full bg-[color:var(--accent)] motion-safe:animate-progress"
              style={{
                animationDuration: `${AUTOPLAY_MS}ms`,
                animationPlayState: paused ? "paused" : "running",
              }}
            />
          </div>

          <span className="w-5 text-right text-[11px] tabular-nums text-white/70">{pad(COUNT)}</span>

          <button
            onClick={next}
            aria-label="Next colour"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"
          >
            <ChevronRight size={15} />
          </button>
          <button
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? "Resume auto-play" : "Pause auto-play"}
            aria-pressed={userPaused}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"
          >
            {userPaused ? <Play size={12} className="fill-white" /> : <Pause size={12} className="fill-white" />}
          </button>
        </div>
      </div>

      {/* ---------------- scroll indicator (bottom-right) ---------------- */}
      <a
        href="#shop"
        className="absolute bottom-8 right-6 z-20 hidden animate-bob flex-col items-center gap-2 motion-reduce:animate-none sm:flex lg:right-10"
      >
        <Mouse size={22} strokeWidth={1.5} />
        <span className="text-[11px] font-medium text-shadow">Scroll Down</span>
      </a>
    </section>
  );
}
