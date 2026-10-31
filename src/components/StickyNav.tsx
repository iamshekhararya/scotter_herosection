import { useEffect, useState } from "react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { navLinks, spyIds } from "../data/site";
import { useScrollSpy } from "../hooks/useScrollSpy";

/** Compact frosted-glass menu that slides in once the hero has scrolled away. */
export default function StickyNav({ cartCount }: { cartCount: number }) {
  const [show, setShow] = useState(false);
  const active = useScrollSpy(spyIds);

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
        className="flex items-center gap-1 rounded-full border border-white/25 bg-black/45 p-1.5 pl-4 text-sm font-medium text-white shadow-2xl backdrop-blur-xl"
      >
        <a href="#home" aria-label="Volterra – back to top" className="mr-2 flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden>
            <path d="M2 6l9 4 5-6 5 6 9-4-4 12-10 10L6 18 2 6z" fill="currentColor" />
          </svg>
          <span className="hidden text-sm font-semibold tracking-[0.2em] sm:inline">VOLTERRA</span>
        </a>

        <div className="hidden items-center md:flex">
          {navLinks.map((l) => {
            const on = l.href === `#${active}`;
            return (
              <a
                key={l.label}
                href={l.href}
                aria-current={on ? "true" : undefined}
                className={`relative px-3.5 py-2 transition ${on ? "text-white" : "text-white/75 hover:text-white"}`}
              >
                {l.label}
                {on && (
                  <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded bg-[color:var(--accent)] transition-colors duration-700" />
                )}
              </a>
            );
          })}
        </div>

        <span
          role="img"
          aria-label={`Cart, ${cartCount} items`}
          className="relative mx-2 flex h-9 w-9 items-center justify-center"
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[color:var(--accent)] px-1 text-[10px] font-bold transition-colors duration-700">
              {cartCount}
            </span>
          )}
        </span>

        <a
          href="#shop"
          className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-semibold text-slate-900 transition hover:bg-white/85"
        >
          Shop Now <ArrowRight size={15} />
        </a>
      </nav>
    </div>
  );
}
