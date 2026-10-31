import { ReactNode } from "react";
import { ArrowUpRight } from "./Icons";

interface BtnProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  /** for use on dark / ink backgrounds */
  invert?: boolean;
  className?: string;
}

/** Black pill with the red arrow bubble – same as the hero's "Order now". */
export function PrimaryButton({ children, href, onClick, type = "button", invert, className = "" }: BtnProps) {
  const cls = `group inline-flex h-12 items-center gap-3 rounded-full pl-6 pr-1.5 text-[15px] font-medium transition-transform hover:scale-[1.03] active:scale-95 ${
    invert ? "bg-surface text-ink" : "bg-ink text-surface"
  } ${className}`;
  const arrow = (
    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white transition-transform group-hover:rotate-45">
      <ArrowUpRight size={16} />
    </span>
  );
  return href ? (
    <a href={href} onClick={onClick} className={cls}>
      {children}
      {arrow}
    </a>
  ) : (
    <button type={type} onClick={onClick} className={cls}>
      {children}
      {arrow}
    </button>
  );
}

/** Soft white pill – same as the hero's "Book a test ride". */
export function GhostButton({ children, href, onClick, invert, className = "" }: BtnProps) {
  const cls = `inline-flex h-12 items-center rounded-full px-6 text-[15px] font-medium transition-colors ${
    invert
      ? "bg-surface/10 text-surface hover:bg-surface/20"
      : "bg-chip/80 text-ink shadow-[0_1px_4px_rgba(0,0,0,0.05)] hover:bg-chip"
  } ${className}`;
  return (
    <a href={href ?? "#"} onClick={onClick} className={cls}>
      {children}
    </a>
  );
}
