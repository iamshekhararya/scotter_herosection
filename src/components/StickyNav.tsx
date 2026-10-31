import { useEffect, useState } from "react";
import { quickLinks } from "../data/site";
import { ArrowUpRight, LogoMark, MoonIcon, SunIcon } from "./Icons";

interface Props {
  dark: boolean;
  onToggleTheme: () => void;
}

/** Compact floating menu that slides in once the hero has scrolled away. */
export default function StickyNav({ dark, onToggleTheme }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 top-3 z-50 flex justify-center px-3 transition-all duration-300 ${
        show ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
      }`}
    >
      <nav
        aria-label="Quick navigation"
        className="flex items-center gap-1 rounded-full bg-chip/80 p-1.5 pl-2.5 text-[13.5px] font-medium text-ink shadow-[0_10px_30px_rgba(0,0,0,0.14)] ring-1 ring-ink/5 backdrop-blur-xl"
      >
        <a href="#home" aria-label="Skot – back to top" className="mr-1 flex items-center gap-2">
          <span className="scale-[0.8]">
            <LogoMark />
          </span>
          <span className="hidden text-[17px] font-semibold tracking-[-0.02em] sm:inline">Skot.</span>
        </a>

        <div className="hidden items-center md:flex">
          {quickLinks.map((l) => (
            <a key={l.label} href={l.href} className="rounded-full px-3 py-2 transition-colors hover:bg-ink/5">
              {l.label}
            </a>
          ))}
        </div>

        <button
          role="switch"
          aria-checked={dark}
          aria-label="Dark mode"
          onClick={onToggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/5"
        >
          {dark ? <MoonIcon /> : <SunIcon />}
        </button>

        <a
          href="#options"
          className="group ml-0.5 inline-flex h-10 items-center gap-2 rounded-full bg-ink pl-4 pr-1.5 text-surface transition-transform hover:scale-[1.03] active:scale-95"
        >
          Order now
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:rotate-45">
            <ArrowUpRight size={14} />
          </span>
        </a>
      </nav>
    </div>
  );
}
