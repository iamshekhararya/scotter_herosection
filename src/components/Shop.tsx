import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Heart, ShoppingBag, Zap } from "lucide-react";
import { CURRENCY, products, sizes } from "../data/site";
import { VARIANTS } from "../data/variants";
import type { Variant } from "../data/variants";
import Reveal from "./Reveal";
import { GlassButton, Section, SectionHead } from "./Ui";

const money = new Intl.NumberFormat(CURRENCY.locale, {
  style: "currency",
  currency: CURRENCY.code,
  maximumFractionDigits: 0,
});

function ProductCard({ v, onAdd }: { v: Variant; onAdd: () => void }) {
  const p = products[v.id];
  const [size, setSize] = useState(9);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);
  const timer = useRef(0);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const add = () => {
    onAdd();
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article
      aria-label={p.name}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-slate-950 shadow-xl"
    >
      {/* picture */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={v.background}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110 motion-reduce:transition-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70" />
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[60%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: v.accent }}
        />
        <img
          src={v.shoe}
          alt={`${p.name}, ${v.colorName}`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-x-[6%] top-[14%] h-[72%] w-[88%] object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.55)] transition-transform duration-700 ease-out group-hover:-rotate-3 group-hover:scale-105 motion-reduce:transition-none"
        />

        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-xs font-medium backdrop-blur">
          <Zap size={12} className="text-[color:var(--from)]" />
          {v.badge}
        </span>
        <button
          aria-pressed={liked}
          aria-label={liked ? `Remove ${p.name} from wishlist` : `Add ${p.name} to wishlist`}
          onClick={() => setLiked((l) => !l)}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur transition hover:bg-white/30"
        >
          <Heart size={17} className={liked ? "fill-rose-500 text-rose-500" : ""} />
        </button>
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold tracking-tight">{p.name}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-white/70">
              <span className="h-3 w-3 rounded-full ring-1 ring-white/40" style={{ backgroundColor: v.dot }} />
              {v.colorName}
            </p>
          </div>
          <p className="text-xl font-bold">{money.format(p.price)}</p>
        </div>

        <p className="text-sm leading-relaxed text-white/70">{p.tagline}</p>

        <div>
          <p className="mb-2 text-xs font-semibold text-white/80">Size (US)</p>
          <div role="radiogroup" aria-label={`Size for ${p.name}`} className="flex gap-2">
            {sizes.map((s) => (
              <button
                key={s}
                role="radio"
                aria-checked={s === size}
                onClick={() => setSize(s)}
                className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                  s === size
                    ? "border-transparent text-white"
                    : "border-white/25 bg-white/5 text-white/80 hover:bg-white/15"
                }`}
                style={s === size ? { backgroundColor: v.accent } : undefined}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={add}
          className="mt-auto flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110"
          style={{ backgroundColor: v.accent }}
        >
          {added ? (
            <>
              <Check size={16} /> Added to bag
            </>
          ) : (
            <>
              <ShoppingBag size={16} /> Add to bag
            </>
          )}
        </button>
        <span role="status" aria-live="polite" className="sr-only">
          {added ? `${p.name}, size ${size}, added to your bag` : ""}
        </span>
      </div>
    </article>
  );
}

export default function Shop({ onAdd }: { onAdd: () => void }) {
  return (
    <Section id="shop">
      <SectionHead
        id="shop"
        badge="New collection"
        title={["Pick your pair.", "Own the run."]}
        intro="Three colourways, one featherlight build. Choose your size and add your favourite to the bag."
        action={
          <GlassButton href="#products">
            See the technology <ArrowRight size={16} />
          </GlassButton>
        }
      />
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {VARIANTS.map((v, i) => (
          <li key={v.id}>
            <Reveal delay={i * 100} className="h-full">
              <ProductCard v={v} onAdd={onAdd} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
