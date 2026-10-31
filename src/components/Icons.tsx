type P = { className?: string };

export const SearchIcon = ({ className }: P) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.2-4.2" />
  </svg>
);

export const BagIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5.5 8.5h13l-1 11.5h-11l-1-11.5z" />
    <path d="M9 8.5V8a3 3 0 016 0v.5" />
  </svg>
);

export const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 4h3.5l1.8 4.6-2.2 1.4a11 11 0 005.9 5.9l1.4-2.2L20 15.5V19a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
    <path d="M15 4a5 5 0 015 5M15 8a1.5 1.5 0 011.5 1.5" />
  </svg>
);

export const SunIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20.5 13.5A8.5 8.5 0 1110.5 3.5a6.5 6.5 0 0010 10z" />
  </svg>
);

export const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <path d="M4 8h16M4 16h16" />
  </svg>
);

export const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const ArrowUpRight = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export const PauseIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

export const PlayIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M7 4.5v15a1 1 0 001.5.9l12-7.5a1 1 0 000-1.8l-12-7.5A1 1 0 007 4.5z" />
  </svg>
);

export const LogoMark = () => (
  <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden>
    <rect width="28" height="28" rx="8" fill="#e5493f" />
    <path d="M7 23V13.5A6.5 6.5 0 0113.5 7H22" stroke="#fff" strokeOpacity=".9" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M12.5 23v-6a4 4 0 014-4H22" stroke="#fff" strokeOpacity=".65" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M18 23v-3" stroke="#fff" strokeOpacity=".45" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);

/** gold ringed planet (white badge next to the headline) */
export const PlanetBadgeArt = () => (
  <svg width="30" height="30" viewBox="0 0 26 26" aria-hidden>
    <defs>
      <radialGradient id="pl" cx="35%" cy="30%" r="80%">
        <stop offset="0" stopColor="#f3de8a" />
        <stop offset="1" stopColor="#a8842a" />
      </radialGradient>
    </defs>
    <ellipse cx="13" cy="13" rx="12" ry="4" transform="rotate(-28 13 13)" fill="none" stroke="#8a6c1f" strokeWidth="1.6" opacity=".55" />
    <circle cx="13" cy="13" r="6.2" fill="url(#pl)" />
    <path d="M1.5 17.5C8 20 19 12 24.5 8.5" stroke="#caa43a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);

export const BoltBadgeArt = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
    <path d="M13.5 2L5 13.5h6L10 22l9-12.5h-6.2z" fill="#f6c81b" stroke="#ffe27a" strokeWidth=".8" strokeLinejoin="round" />
  </svg>
);

export const Star = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
  </svg>
);

/** tiny illustrated avatars for the reviews cluster */
export const Avatar = ({ variant, size = 32 }: { variant: 0 | 1 | 2; size?: number }) => {
  const sets = [
    { bg: "#f4c04e", skin: "#5a3a28", hair: "#111", shirt: "#1b1b1b" },
    { bg: "#cfd6e4", skin: "#e8b99a", hair: "#c4733a", shirt: "#4a5d7a" },
    { bg: "#b9a6e8", skin: "#f1c9ad", hair: "#2a2020", shirt: "#c24a4a" },
  ][variant];
  return (
    <svg width={size} height={size} viewBox="0 0 26 26" aria-hidden>
      <circle cx="13" cy="13" r="13" fill={sets.bg} />
      <path d="M3 26c1-6 5-8 10-8s9 2 10 8z" fill={sets.shirt} />
      <circle cx="13" cy="11" r="5.2" fill={sets.skin} />
      <path d="M7.6 10.5C7.6 6.5 10 5.4 13 5.4s5.4 1.1 5.4 5.1c-1-1.6-3-2.4-5.4-2.4s-4.4.8-5.4 2.4z" fill={sets.hair} />
    </svg>
  );
};
