# Skot – Electric Moped Home Page

A responsive, single-page website for **Skot**, a fictional electric moped brand. It opens with an interactive colour-carousel hero and continues into a full landing page: about, model collection, services, buying options, reviews, FAQ and a test-ride booking form. It has light and dark themes.

**Live demo:** [https://heroscooter.netlify.app/](https://heroscooter.netlify.app/)

---

## Features

### Hero
- Colour carousel with six mopeds: White, Orange, Red, Yellow, Blue and Black
- Autoplay with a progress ring, pause/play button, and a "next model" card
- Keyboard arrows (← →), touch swipe, and clickable colour swatches
- Spec stats (top speed, range, charge time) that change with the selected colour
- Light / dark theme switch, saved in `localStorage` and applied before first paint, so there is no flash

### Home page sections
| Section | Nav link | What it does |
| --- | --- | --- |
| Hero | Home | Colour carousel with specs |
| About | About | Story, feature icons and animated stat counters |
| Collections | Collections | Model cards you can sort by top speed, range or fastest charge |
| Services | Services | Service cards plus a 3-step "how it works" |
| Options | Options | Buy / Lease / Subscribe plans and an add-ons price calculator |
| Reviews | – | Customer review cards |
| FAQ | – | Accordion |
| Contact | Contact us | Test-ride booking form (pre-filled from the model you picked) |
| Footer + floating menu | – | Links and a sticky quick-nav |

### Quality details
- Fully responsive, from phones to wide desktops
- Scroll-reveal animations and count-up numbers
- Respects `prefers-reduced-motion`
- Keyboard-friendly: skip link, visible focus states, ARIA labels and carousel semantics

---

## Tech stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)

---

## Getting started

Requires **Node.js 18+**.

```bash
# install dependencies
npm install

# start the dev server  ->  http://localhost:5173
npm run dev

# type-check + production build into dist/
npm run build

# preview the production build locally
npm run preview
```

---

## Project structure

```
├── public/
│   └── scooters/            # moped images (transparent WebP, one per colour)
├── src/
│   ├── components/          # Hero, About, Collections, Services, Options,
│   │                        # Reviews, Faq, Contact, Footer, StickyNav, ...
│   ├── data/
│   │   ├── scooters.ts      # models, colours, specs, images
│   │   └── site.ts          # copy, plans, add-ons, reviews, FAQs, footer links
│   ├── hooks/               # useTheme, useInView, useReducedMotion, useElementSize
│   ├── App.tsx              # puts the sections together, owns the theme switch
│   ├── index.css            # theme tokens (light + dark) and global styles
│   └── main.tsx
├── index.html
├── tailwind.config.js
└── vite.config.ts
```

---

## Customising the content

Everything below the hero is placeholder content. Edit these two files:

**`src/data/scooters.ts`**: models, colours, specs and images.
To add a moped, add an entry to the `scooters` array and drop its transparent WebP into `public/scooters/`. All images should share the same canvas size and ground line so they line up in the carousel.

**`src/data/site.ts`**: everything else.
- `CONTACT_EMAIL`: where the test-ride form sends requests. Change this first.
- `plans` and `addons`: sample prices
- `reviews`: sample reviews tagged "Sample". Replace them with real ones and remove `sample: true`.
- `features`, `services`, `steps`, `faqs`: wording only. Check the claims are true for your product.

**Autoplay speed:** change `AUTOPLAY_MS` at the top of `src/components/Hero.tsx`.

### Test-ride form
There is no backend. Submitting the form opens the visitor's email app with a pre-filled message addressed to `CONTACT_EMAIL`. To send requests to your own API instead, replace the `onSubmit` handler in `src/components/Contact.tsx` with a `fetch()` call.

---

## Deployment

The site is deployed on **Netlify**.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |

Any static host (Vercel, GitHub Pages, Cloudflare Pages) works with the same settings.

---

## Notes

- Specs, prices, reviews and contact details are sample data for demonstration.
- `node_modules` and `dist` are listed in `.gitignore`. If `node_modules` was committed earlier, run `git rm -r --cached node_modules` once.

---

## Author

**Shekhar**: Full Stack Developer
[GitHub](https://github.com/iamshekhararya) · [Portfolio](https://shekhararya.netlify.app) · [LinkedIn](https://linkedin.com/in/shekhararya90)
