import { useEffect, useState } from "react";
import { useInView } from "../hooks/useInView";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Props {
  to: number;
  suffix?: string;
}

/** Counts up to `to` when scrolled into view (jumps straight there if motion is reduced). */
export default function CountUp({ to, suffix = "" }: Props) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [val, setVal] = useState(reduced ? to : 0);

  useEffect(() => {
    if (reduced) {
      setVal(to);
      return;
    }
    if (!inView) return;
    let raf = 0;
    const t0 = performance.now();
    const DURATION = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, to]);

  return (
    <span ref={ref}>
      {Math.round(val)}
      {suffix}
    </span>
  );
}
