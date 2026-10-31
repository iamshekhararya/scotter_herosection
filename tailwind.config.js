/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // theme tokens – values live in src/index.css (light + dark)
        page: token("page"),
        surface: token("surface"),
        panel: token("panel"),
        ink: token("ink"),
        muted: token("muted"),
        chip: token("chip"),
        brand: "#f0413c",
      },
      fontFamily: { sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"] },
      keyframes: {
        // --dir is +1 (next) or -1 (previous) and is set per image
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(calc(var(--dir, 1) * 90px)) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateX(0) scale(1)" },
        },
        slideOut: {
          "0%": { opacity: "1", transform: "translateX(0) scale(1)" },
          "100%": { opacity: "0", transform: "translateX(calc(var(--dir, 1) * -70px)) scale(0.97)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        ring: {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      animation: {
        slideIn: "slideIn 0.75s cubic-bezier(0.22, 1, 0.36, 1) both",
        slideOut: "slideOut 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        fadeUp: "fadeUp 0.5s ease-out both",
        // duration is overridden inline so it always matches AUTOPLAY_MS
        ring: "ring 4.8s linear both",
      },
    },
  },
  plugins: [],
};
