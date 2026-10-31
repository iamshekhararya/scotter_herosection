<div align="center">

# 🛵 Skot Hero Section

### A responsive, animated hero section for an electric moped brand, with 6 colourways and light / dark mode

Built with **React 18 · TypeScript · Tailwind CSS · Vite**

![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)

### 🔗 [**Live Demo → heroscooter.netlify.app**](https://heroscooter.netlify.app/)

[![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://heroscooter.netlify.app/)

</div>

<!-- Add a screenshot or GIF here once you have one:
![Skot Hero preview](./screenshots/preview.png)
-->

---

## ✨ Overview

Skot Hero is a landing-page hero for a fictional electric moped brand. Visitors can browse six colourways, and each one updates the moped image, model code, description, spec figures, glow colour and "next model" card together.

## 🎯 Features

**Colourway carousel**
- 6 models: White, Orange, Red, Yellow, Blue and Black
- Switch with the colour swatches, the next-colour button, or the Left / Right arrow keys
- Swipe left / right on touch screens (horizontal only, so vertical page scroll still works)
- Auto-play every 5.2 seconds with a progress ring on the next-colour button
- Pause / play button; auto-play also pauses on mouse hover and keyboard focus
- Directional slide-in / slide-out animation depending on whether you go forward or back
- All images are preloaded so slides never pop in

**Design**
- Custom-shaped panel layout on desktop, simplified layout on mobile
- Spec row per model (top speed, range, full charge time)
- "Next model" preview card
- Light / dark theme toggle that is saved in the browser and applied before first paint (no flash)
- Responsive navbar with mobile menu

**Accessibility**
- Respects `prefers-reduced-motion` (auto-play is turned off)
- ARIA carousel semantics, radio group for colours, labelled controls
- Screen-reader live announcements when the slide changes (quiet while auto-playing)

## 🛠 Tech Stack

| Area | Tools |
|---|---|
| UI | React 18, TypeScript |
| Styling | Tailwind CSS 3 with CSS-variable theme tokens, custom keyframes |
| Font | Inter (Google Fonts) |
| Build tool | Vite 5 |
| Images | Transparent WebP |

## 🚀 Getting Started

**Prerequisites:** Node.js 18 or newer and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build
npm run preview
```

## 📁 Project Structure

```
skot-hero/
├── index.html
├── package.json
├── tailwind.config.js        # theme tokens, animations
├── vite.config.ts
├── public/
│   └── scooters/             # transparent WebP images (white, orange, red, yellow, blue, black)
└── src/
    ├── main.tsx
    ├── index.css             # light + dark theme values
    ├── components/
    │   ├── Hero.tsx          # main section, carousel logic, autoplay, swipe, keys
    │   ├── Navbar.tsx        # nav links, search, theme switch, mobile menu
    │   ├── PanelShape.tsx    # custom panel outline (desktop)
    │   └── Icons.tsx         # SVG icons and badges
    ├── data/
    │   └── scooters.ts       # all model data (text, colours, stats, image)
    └── hooks/
        ├── useTheme.ts       # light / dark, saved in localStorage
        ├── useReducedMotion.ts
        └── useElementSize.ts
```

## ➕ Add or Change a Model

1. Add a transparent WebP image to `public/scooters/`. All images should use the same canvas size and ground line.
2. Add one entry to the `scooters` array in `src/data/scooters.ts`:

```ts
{
  id: "green",
  code: "G40",
  model: "Eco Model",
  thumbCode: "GR40QT",
  thumbName: "Forest Moped",
  colorName: "Green",
  description: "Quiet, clean and made for the city. This 40cc Forest moped is ready to go.",
  highlight: "This 40cc",              // phrase in the description that gets underlined
  swatch: "#2e9e5b",                   // colour of the round swatch button
  glow: "#4cd98a",                     // soft glow behind the moped
  stats: [
    { value: "40", unit: "mph", label: "Top speed" },
    { value: "75", unit: "mi",  label: "Range" },
    { value: "3",  unit: "h",   label: "Full charge" },
  ],
  image: "/scooters/green.webp",
}
```

> The figures in `scooters.ts` are **sample values**. Replace them with real specs before using this for a real product.

## ⚙️ Customisation

| What | Where |
|---|---|
| Auto-play speed | `AUTOPLAY_MS` at the top of `src/components/Hero.tsx` (the progress ring follows it automatically) |
| Brand colour | `brand` in `tailwind.config.js` |
| Light / dark colours | CSS variables in `src/index.css` |
| Nav links | `links` array in `src/components/Navbar.tsx` |

## 🌐 Deployment

The live demo is deployed on **Netlify**: [heroscooter.netlify.app](https://heroscooter.netlify.app/). The project is a static Vite app, so it also deploys easily to **Vercel** or **GitHub Pages**:

- Build command: `npm run build`
- Output directory: `dist`

## 👤 Author

**Shekhar**
- GitHub: [@iamshekhararya](https://github.com/iamshekhararya)
- Portfolio: [shekhararya.netlify.app](https://shekhararya.netlify.app)
- LinkedIn: [shekhararya90](https://linkedin.com/in/shekhararya90)
