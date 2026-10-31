import { CONTACT_EMAIL, footerColumns } from "../data/site";
import { LogoMark } from "./Icons";

export default function Footer() {
  return (
    <footer className="px-6 pb-10 pt-6 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr]">
          <div>
            <a href="#home" aria-label="Skot – back to top" className="inline-flex items-center gap-2.5">
              <LogoMark />
              <span className="mt-[2px] text-[21px] font-semibold leading-none tracking-[-0.02em]">Skot.</span>
            </a>
            <p className="mt-4 max-w-[34ch] text-[14px] leading-[21px] text-muted">
              Super fast electric mopeds – agile, silent and ready to strike.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 inline-block text-[14px] font-medium underline-offset-4 hover:underline">
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((c) => (
              <div key={c.title}>
                <h2 className="text-[13px] font-medium text-muted">{c.title}</h2>
                <ul className="mt-4 space-y-3 text-[14.5px]">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="underline-offset-4 transition-colors hover:underline">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-6 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Skot. All rights reserved.</p>
          <a href="#home" className="underline-offset-4 hover:underline">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
