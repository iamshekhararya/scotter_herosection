# Skot – electric moped home page

React 18 + TypeScript + Vite + Tailwind. The original hero section is unchanged in look and behaviour; the rest of the
home page is built in the same design language (rounded cards, black pill buttons with the red arrow, light/dark theme).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
```

## Page structure

| Section | Nav link | File |
| --- | --- | --- |
| Hero (colour carousel) | Home | `src/components/Hero.tsx` |
| About + animated stats | About | `src/components/About.tsx` |
| Models, sortable by speed / range / charge | Collections | `src/components/Collections.tsx` |
| Services + 3 steps | Services | `src/components/Services.tsx` |
| Buy / Lease / Subscribe + add-ons calculator | Options | `src/components/Options.tsx` |
| Reviews | – | `src/components/Reviews.tsx` |
| FAQ accordion | – | `src/components/Faq.tsx` |
| Test-ride form | Contact us | `src/components/Contact.tsx` |
| Footer, floating menu | – | `Footer.tsx`, `StickyNav.tsx` |

`src/App.tsx` puts everything together and owns the shared light/dark switch.

## Replace the placeholder content

Everything below the hero is placeholder copy. Edit **`src/data/site.ts`**:

- `CONTACT_EMAIL` – the test-ride form opens the visitor's email app addressed to this (no backend needed yet).
  Swap `onSubmit` in `Contact.tsx` for a `fetch()` to your API when you have one.
- `plans` and `addons` – sample prices.
- `reviews` – sample reviews tagged "Sample". Use real customer reviews, then delete `sample: true`.
- `features`, `services`, `steps`, `faqs` – wording only; check the claims are true for your product.

Model names, specs and photos still come from `src/data/scooters.ts` (as before), and the About stats and FAQ range
figures are derived from them.

## Notes

- Section headings, cards and buttons share helpers in `Section.tsx` and `Buttons.tsx`.
- Scroll animations (`Reveal`, `CountUp`) and smooth scrolling are switched off for visitors who prefer reduced motion.
- `node_modules` was committed to the repo. A `.gitignore` is now included; run `git rm -r --cached node_modules` once
  to stop tracking it.
