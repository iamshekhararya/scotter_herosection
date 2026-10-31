import { marquee } from "../data/site";

/** Slow-scrolling strip of brand promises right under the hero. */
export default function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-14 pr-14">
      {marquee.map(({ icon: Icon, text }) => (
        <li key={text} className="flex items-center gap-3 whitespace-nowrap">
          <Icon size={17} className="text-[color:var(--from)]" />
          {text}
        </li>
      ))}
    </ul>
  );

  return (
    <div className="overflow-hidden border-y border-white/10 bg-slate-950 py-4 text-sm font-medium text-white/85">
      <div className="flex w-max animate-marquee motion-reduce:animate-none hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
