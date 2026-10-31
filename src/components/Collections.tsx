import { useMemo, useState } from "react";
import { scooters } from "../data/scooters";
import { ArrowUpRight } from "./Icons";
import { Section, SectionHead } from "./Section";

interface SortOpt {
  key: string;
  label: string;
  idx: 0 | 1 | 2;
  /** lower is better (charge time) */
  asc?: boolean;
}

const sorts: SortOpt[] = [
  { key: "speed", label: "Top speed", idx: 0 },
  { key: "range", label: "Range", idx: 1 },
  { key: "charge", label: "Fastest charge", idx: 2, asc: true },
];

interface Props {
  /** called when someone taps "Test ride" on a card (pre-selects it in the booking form) */
  onTestRide: (id: string) => void;
}

export default function Collections({ onTestRide }: Props) {
  const [sortKey, setSortKey] = useState(sorts[0].key);
  const sort = sorts.find((s) => s.key === sortKey) ?? sorts[0];

  const list = useMemo(
    () =>
      [...scooters].sort(
        (a, b) => (Number(a.stats[sort.idx].value) - Number(b.stats[sort.idx].value)) * (sort.asc ? 1 : -1)
      ),
    [sort]
  );

  const values = scooters.map((s) => Number(s.stats[sort.idx].value));
  const best = sort.asc ? Math.min(...values) : Math.max(...values);
  const ratio = (v: number) => (sort.asc ? best / v : v / best);

  return (
    <Section id="collections" tone="panel">
      <SectionHead
        id="collections"
        eyebrow="Collections"
        title="Six colours. One for you."
        intro="Every Skot is electric, agile and ready to strike. Rank the line-up by what matters most to you."
        action={
          <div
            role="radiogroup"
            aria-label="Sort models by"
            className="inline-flex self-start rounded-full bg-chip/70 p-1 shadow-[0_1px_4px_rgba(0,0,0,0.05)] md:self-auto"
          >
            {sorts.map((s) => (
              <button
                key={s.key}
                role="radio"
                aria-checked={s.key === sort.key}
                onClick={() => setSortKey(s.key)}
                className={`h-9 rounded-full px-4 text-[13.5px] font-medium transition-colors ${
                  s.key === sort.key ? "bg-ink text-surface" : "text-ink hover:bg-ink/5"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        }
      />

      <ul key={sort.key} className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <li
            key={s.id}
            style={{ animationDelay: `${i * 60}ms` }}
            className="animate-fadeUp"
          >
            <article
              aria-label={`${s.code} ${s.model}`}
              className="group flex h-full flex-col rounded-[28px] bg-surface p-3 shadow-[0_8px_24px_rgba(0,0,0,0.05)] transition-transform duration-300 hover:-translate-y-1"
            >
              {/* picture */}
              <div className="relative aspect-[5/4] overflow-hidden rounded-[22px] bg-panel/60">
                <div
                  aria-hidden
                  className="absolute inset-x-[14%] bottom-[6%] top-[24%] rounded-full opacity-45 blur-[46px]"
                  style={{ backgroundColor: s.glow }}
                />
                <img
                  src={s.image}
                  alt={`${s.colorName} ${s.thumbName}`}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  className="absolute inset-0 h-full w-full object-contain object-bottom p-3 drop-shadow-[0_14px_16px_rgba(0,0,0,0.16)] transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <span className="absolute left-4 top-3 text-[34px] font-light leading-none tracking-[-0.02em]">{s.code}</span>
                <span className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-chip/80 py-1 pl-1.5 pr-3 text-[12.5px] font-medium shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
                  <span className="h-4 w-4 rounded-full ring-1 ring-ink/20" style={{ backgroundColor: s.swatch }} />
                  {s.colorName}
                </span>
              </div>

              {/* details */}
              <div className="flex flex-1 flex-col px-2 pb-1 pt-4">
                <div className="text-[12.5px] text-muted">{s.model}</div>
                <h3 className="text-[19px] font-medium leading-[24px] tracking-[-0.02em]">{s.thumbName}</h3>

                <dl className="mt-4 grid grid-cols-3 gap-2">
                  {s.stats.map((st, k) => {
                    const active = k === sort.idx;
                    return (
                      <div key={st.label} className="flex flex-col-reverse">
                        <dt className={`mt-1 text-[11.5px] ${active ? "font-medium text-ink" : "text-muted"}`}>{st.label}</dt>
                        <dd className={`text-[19px] leading-none tracking-[-0.02em] ${active ? "font-semibold" : "font-medium text-ink/70"}`}>
                          {st.value}
                          <span className="ml-0.5 text-[11.5px] font-normal text-muted">{st.unit}</span>
                        </dd>
                      </div>
                    );
                  })}
                </dl>

                <div aria-hidden className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
                  <div
                    className="h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                    style={{ width: `${Math.round(ratio(Number(s.stats[sort.idx].value)) * 100)}%` }}
                  />
                </div>

                <div className="mt-auto flex items-center gap-2 pt-5">
                  <a
                    href="#options"
                    className="group/btn inline-flex h-10 items-center gap-2.5 rounded-full bg-ink pl-4 pr-1 text-[14px] font-medium text-surface transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    Order now
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover/btn:rotate-45">
                      <ArrowUpRight size={14} />
                    </span>
                  </a>
                  <a
                    href="#contact"
                    onClick={() => onTestRide(s.id)}
                    className="inline-flex h-10 items-center rounded-full bg-chip/80 px-4 text-[14px] font-medium transition-colors hover:bg-chip"
                  >
                    Test ride
                  </a>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  );
}
