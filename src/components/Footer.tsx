import { CONTACT_EMAIL, footerColumns } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 pb-10 pt-14 text-white lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.4fr_2fr]">
          <div>
            <a href="#home" className="flex w-fit items-center gap-2" aria-label="Volterra – back to top">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden>
                <path d="M2 6l9 4 5-6 5 6 9-4-4 12-10 10L6 18 2 6z" fill="currentColor" />
              </svg>
              <span className="text-lg font-semibold tracking-[0.2em]">VOLTERRA</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Lightweight, breathable running shoes for the dreamers. Move faster, go further.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-4 inline-block text-sm font-medium underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((c) => (
              <div key={c.title}>
                <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">{c.title}</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-white/85 underline-offset-4 transition hover:text-white hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Volterra. All rights reserved.</p>
          <a href="#home" className="underline-offset-4 hover:text-white hover:underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
