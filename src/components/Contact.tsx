import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, Send } from "lucide-react";
import { CONTACT_EMAIL } from "../data/site";
import Reveal from "./Reveal";
import { AccentButton, Badge, GradientText, Section, glass } from "./Ui";

const field =
  "mt-2 w-full rounded-2xl border border-white/25 bg-white/10 px-4 py-3.5 text-sm text-white outline-none backdrop-blur transition placeholder:text-white/50 focus:border-white/70 focus:bg-white/15";

export default function Contact({ index }: { index: number }) {
  const [sent, setSent] = useState(false);

  /* No backend yet: the message opens the visitor's email app, pre-filled.
     Swap this for a fetch() to your own API when you have one. */
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Message from ${fd.get("name")}`);
    const body = encodeURIComponent(`${fd.get("message")}\n\n– ${fd.get("name")} (${fd.get("email")})`);
    setSent(true);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact" backdrop={{ index, top: "#0f172a", bottom: "#020617" }}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Badge>Contact</Badge>
          <h2
            id="contact-title"
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] tracking-tight text-shadow sm:text-5xl lg:text-6xl"
          >
            Let's get you
            <GradientText>running.</GradientText>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-white/90 text-shadow">
            Questions about sizing, orders or colours? Send us a message and we'll get back to you.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/15 py-2 pl-2 pr-5 text-sm font-semibold backdrop-blur transition hover:bg-white/25"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[color:var(--accent)] transition-colors duration-700">
              <Mail size={16} />
            </span>
            {CONTACT_EMAIL}
          </a>
        </Reveal>

        <Reveal delay={100}>
          <form onSubmit={onSubmit} className={`rounded-3xl p-6 shadow-2xl sm:p-8 ${glass}`}>
            <div className="grid gap-5">
              <label className="block text-xs font-semibold">
                Your name
                <input name="name" required autoComplete="name" placeholder="Alex Runner" className={field} />
              </label>
              <label className="block text-xs font-semibold">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={field}
                />
              </label>
              <label className="block text-xs font-semibold">
                Message
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="How can we help?"
                  className={`${field} resize-none`}
                />
              </label>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <AccentButton type="submit">
                Send message <Send size={15} />
              </AccentButton>
              <p role="status" aria-live="polite" className="text-xs text-white/70">
                {sent ? "Opening your email app…" : "We'll never share your details."}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
