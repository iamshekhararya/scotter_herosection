import { useCallback, useState } from "react";
import type { CSSProperties } from "react";
import { VARIANTS } from "./data/variants";
import About from "./components/About";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Reviews from "./components/Reviews";
import Shop from "./components/Shop";
import StickyNav from "./components/StickyNav";
import Technology from "./components/Technology";

export default function App() {
  // the hero's active colourway: the whole page follows its accent colours and backgrounds
  const [heroIndex, setHeroIndex] = useState(0);
  const [cart, setCart] = useState(2);
  const addToCart = useCallback(() => setCart((c) => c + 1), []);

  const v = VARIANTS[heroIndex];
  const themeVars = {
    "--accent": v.accent,
    "--from": v.gradient[0],
    "--to": v.gradient[1],
  } as CSSProperties;

  return (
    <div style={themeVars} className="bg-slate-900 text-white">
      <a
        href="#shop"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-slate-900"
      >
        Skip to content
      </a>
      <StickyNav cartCount={cart} />
      <main>
        <Hero cartCount={cart} onIndexChange={setHeroIndex} />
        <Marquee />
        <Shop onAdd={addToCart} />
        <Technology />
        <About index={heroIndex} />
        <Reviews />
        <Faq />
        <Contact index={heroIndex} />
      </main>
      <Footer />
    </div>
  );
}
