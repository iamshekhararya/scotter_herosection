import { useEffect, useState } from "react";
import { BagIcon, CloseIcon, LogoMark, MenuIcon, MoonIcon, PhoneIcon, SearchIcon, SunIcon } from "./Icons";

const links = [
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Services", href: "#services" },
  { label: "Options", href: "#options" },
];

const chip =
  "bg-chip/90 shadow-[0_1px_4px_rgba(0,0,0,0.05)] transition-colors hover:bg-chip";

interface Props {
  dark: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({ dark, onToggleTheme }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const themeSwitch = (
    <button
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      onClick={onToggleTheme}
      className={`relative h-[28px] w-[52px] shrink-0 rounded-full ${chip}`}
    >
      <span className="absolute left-[8px] top-1/2 -translate-y-1/2 text-muted"><SunIcon /></span>
      <span className="absolute right-[8px] top-1/2 -translate-y-1/2 text-muted"><MoonIcon /></span>
      <span
        className={`absolute left-0 top-[3px] flex h-[22px] w-[22px] items-center justify-center rounded-full bg-ink text-surface transition-transform duration-300 ${
          dark ? "translate-x-[27px]" : "translate-x-[3px]"
        }`}
      >
        {dark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );

  return (
    <header className="relative z-40 flex h-[72px] items-center justify-between px-3.5 text-[13.5px] font-medium text-ink lg:absolute lg:inset-x-0 lg:top-0 lg:h-[80px] lg:px-[18px]">
      {/* left: search + links (desktop) */}
      <div className="flex items-center gap-1">
        <button
          aria-label="Search"
          className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-ink text-surface transition-transform hover:scale-105 active:scale-95"
        >
          <SearchIcon />
        </button>
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="rounded-full px-3 py-2 transition-colors hover:bg-chip/70">
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      {/* centre: logo */}
      <a
        href="#home"
        aria-label="Skot – home"
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5"
      >
        <LogoMark />
        <span className="mt-[2px] text-[21px] font-semibold leading-none tracking-[-0.02em]">Skot.</span>
      </a>

      {/* right */}
      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 md:flex">
          {themeSwitch}
          <a href="#contact" className={`hidden h-9 items-center rounded-full px-4 lg:inline-flex ${chip}`}>Contact us</a>
          <button aria-label="Call us" className={`hidden h-9 w-9 items-center justify-center rounded-full lg:flex ${chip}`}>
            <PhoneIcon />
          </button>
        </div>

        <button
          aria-label="Cart"
          className={`relative ml-1 flex h-11 items-center rounded-full pl-[5px] pr-[5px] sm:pl-4 ${chip}`}
        >
          <span className="mr-3 hidden sm:inline">Cart</span>
          <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-ink text-surface">
            <BagIcon />
          </span>
        </button>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${chip}`}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* mobile / tablet menu */}
      {open && (
        <div className="absolute inset-x-3 top-[68px] z-50 animate-fadeUp rounded-3xl bg-chip p-3 shadow-[0_20px_50px_rgba(0,0,0,0.18)] lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-[16px] transition-colors hover:bg-ink/5">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-2 flex items-center justify-between gap-3 border-t border-ink/10 px-2 pt-3">
            <a href="#contact" onClick={() => setOpen(false)} className="flex h-10 flex-1 items-center justify-center rounded-full bg-ink text-surface">Contact us</a>
            <button aria-label="Call us" className="flex h-10 w-10 items-center justify-center rounded-full bg-ink/5">
              <PhoneIcon />
            </button>
            <span className="md:hidden">{themeSwitch}</span>
          </div>
        </div>
      )}
    </header>
  );
}
