import { useState } from "react";
import { scooters } from "./data/scooters";
import { useTheme } from "./hooks/useTheme";
import About from "./components/About";
import Collections from "./components/Collections";
import Contact from "./components/Contact";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Options from "./components/Options";
import Reviews from "./components/Reviews";
import Services from "./components/Services";
import StickyNav from "./components/StickyNav";

export default function App() {
  // one theme switch for the whole page (hero navbar + floating menu)
  const { dark, toggle } = useTheme();
  // model chosen on a collection card pre-fills the test-ride form
  const [model, setModel] = useState(scooters[0].id);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-surface"
      >
        Skip to content
      </a>
      <StickyNav dark={dark} onToggleTheme={toggle} />
      <main className="bg-page">
        <Hero dark={dark} onToggleTheme={toggle} />
        <About />
        <Collections onTestRide={setModel} />
        <Services />
        <Options />
        <Reviews />
        <Faq />
        <Contact model={model} onModelChange={setModel} />
      </main>
      <Footer />
    </>
  );
}
