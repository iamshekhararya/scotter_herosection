import { ReactNode } from "react";
import { useInView } from "../hooks/useInView";

interface Props {
  children: ReactNode;
  /** stagger in ms */
  delay?: number;
  className?: string;
}

/** Fades its content up the first time it scrolls into view. */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={`${inView ? "animate-fadeUp" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
