import { ReactNode } from "react";

export type IconName =
  | "bolt"
  | "battery"
  | "shield"
  | "phone"
  | "calendar"
  | "truck"
  | "wrench"
  | "card"
  | "check"
  | "plus"
  | "mail"
  | "leaf"
  | "speed";

const paths: Record<IconName, ReactNode> = {
  bolt: <path d="M13.5 2L5 13.5h6L10 22l9-12.5h-6.2z" />,
  battery: (
    <>
      <rect x="2.5" y="7" width="17" height="10" rx="2.5" />
      <path d="M22 11v2M6.5 10.5v3M10 10.5v3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.4-3 7.6-7 9.5-4-1.9-7-5.1-7-9.5V6l7-3z" />
      <path d="M9 12l2.2 2.2L15.5 10" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="15" rx="3" />
      <path d="M4 10h16M8 3v4M16 3v4" />
    </>
  ),
  truck: (
    <>
      <path d="M2 7h11v9H2zM13 10h4l3 3v3h-7" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </>
  ),
  wrench: <path d="M14.5 5.5a4 4 0 00-5.2 5L3.5 16.3a1.6 1.6 0 002.2 2.2l5.8-5.8a4 4 0 005-5.2l-2.4 2.4-2-.5-.5-2z" />,
  card: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="3" />
      <path d="M3 10.5h18M7 15h3" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7.5l8 6 8-6" />
    </>
  ),
  leaf: (
    <>
      <path d="M19 5C10 5 5 9.5 5 15.5c0 1.2.3 2.3.8 3.3C7 19.6 8.1 20 9.5 20 15.5 20 19 14 19 5z" />
      <path d="M5 20c2-4 5-7 9-9" />
    </>
  ),
  speed: (
    <>
      <path d="M4.5 16a8 8 0 1115 0" />
      <path d="M12 14l4-4" />
    </>
  ),
};

/** Stroke icons that match the hero's icon style. */
export function Icon({ name, size = 20, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name]}
    </svg>
  );
}
