import { FormEvent, useState } from "react";
import { scooters } from "../data/scooters";
import { CONTACT_EMAIL } from "../data/site";
import { PrimaryButton } from "./Buttons";
import { Icon } from "./FeatureIcons";
import Reveal from "./Reveal";
import { Eyebrow, Section } from "./Section";

interface Props {
  /** id of the selected model (shared with the collection cards) */
  model: string;
  onModelChange: (id: string) => void;
}

const field =
  "h-12 w-full rounded-2xl bg-chip/80 px-4 text-[15px] text-ink outline-none ring-1 ring-ink/10 transition placeholder:text-muted focus:ring-2 focus:ring-ink";

export default function Contact({ model, onModelChange }: Props) {
  const [sent, setSent] = useState(false);
  const today = new Date().toISOString().slice(0, 10);

  /* No backend yet: the request opens the visitor's email app, pre-filled.
     Swap this for a fetch() to your own API when you have one. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const picked = scooters.find((s) => s.id === model) ?? scooters[0];
    const subject = encodeURIComponent(`Test ride request – ${picked.code} ${picked.thumbName} (${picked.colorName})`);
    const body = encodeURIComponent(
      [
        `Name: ${fd.get("name")}`,
        `Email: ${fd.get("email")}`,
        `Model: ${picked.code} ${picked.thumbName} (${picked.colorName})`,
        `Preferred date: ${fd.get("date") || "Flexible"}`,
      ].join("\n")
    );
    setSent(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" tone="brand">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <Reveal>
          <Eyebrow tone="brand">Book a test ride</Eyebrow>
          <h2
            id="contact-title"
            className="mt-5 text-[clamp(2.4rem,5.2vw,4.4rem)] font-medium leading-[1.04] tracking-[-0.04em]"
          >
            Ready to strike?
            <br />
            Feel it for yourself.
          </h2>
          <p className="mt-5 max-w-[44ch] text-[15px] leading-[24px] text-white">
            Tell us which Skot you'd like to try and when. We'll get back to you to confirm a time that works.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/15 py-2 pl-2 pr-5 text-[15px] font-medium transition-colors hover:bg-white/25"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand">
              <Icon name="mail" size={17} />
            </span>
            {CONTACT_EMAIL}
          </a>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} className="rounded-[28px] bg-surface p-6 text-ink sm:p-8">
            <div className="grid gap-5">
              <label className="block text-[13px] font-medium">
                Your name
                <input name="name" required autoComplete="name" placeholder="Alex Rider" className={`${field} mt-2`} />
              </label>
              <label className="block text-[13px] font-medium">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`${field} mt-2`}
                />
              </label>
              <label className="block text-[13px] font-medium">
                Model
                <select value={model} onChange={(e) => onModelChange(e.target.value)} className={`${field} mt-2`}>
                  {scooters.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} · {s.thumbName} ({s.colorName})
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[13px] font-medium">
                Preferred date
                <input name="date" type="date" min={today} className={`${field} mt-2`} />
              </label>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <PrimaryButton type="submit">Request test ride</PrimaryButton>
              <p role="status" aria-live="polite" className="text-[13px] text-muted">
                {sent ? "Opening your email app…" : "We'll never share your details."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
