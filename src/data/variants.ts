import { Feather, ShieldCheck, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import orangeShoe from "../assets/shoes/shoe-orange.webp";
import blueShoe from "../assets/shoes/shoe-blue.webp";
import purpleShoe from "../assets/shoes/shoe-purple.webp";

import orangeBg from "../assets/backgrounds/bg-orange.jpg";
import blueBg from "../assets/backgrounds/bg-blue.jpg";
import purpleBg from "../assets/backgrounds/bg-purple.jpg";

/** width / height of the cropped shoe images (all variants share the same size) */
export const SHOE_ASPECT = 1400 / 1443;

export interface Variant {
  id: string;
  colorName: string;
  /** small color dot in the switcher */
  dot: string;
  /** solid accent: buttons, badges, active ring */
  accent: string;
  /** gradient used on the 2nd headline line */
  gradient: [string, string];
  shoe: string;
  background: string;
  badge: string;
  headline: [string, string];
  description: string;
  card: { icon: LucideIcon; title: string; text: string };
}

/**
 * Add / remove / edit entries here.
 * Each entry controls the shoe image, the background, the colours AND the text.
 */
export const VARIANTS: Variant[] = [
  {
    id: "orange",
    colorName: "Sunset Orange",
    dot: "#f97316",
    accent: "#ea580c",
    gradient: ["#fbbf24", "#f97316"],
    shoe: orangeShoe,
    background: orangeBg,
    badge: "Next Gen Performance",
    headline: ["Move Faster", "Go Further"],
    description:
      "Engineered for the dreamers, built for the journey. Lightweight, breathable, and made to keep up with your every move.",
    card: {
      icon: Feather,
      title: "Lightweight Design",
      text: "Feather-light build for all-day comfort.",
    },
  },
  {
    id: "blue",
    colorName: "Ocean Blue",
    dot: "#2563eb",
    accent: "#2563eb",
    gradient: ["#67e8f9", "#3b82f6"],
    shoe: blueShoe,
    background: blueBg,
    badge: "Cool Comfort Series",
    headline: ["Flow Freely", "Run Limitless"],
    description:
      "Cool tones, cooler comfort. Breathable mesh and responsive cushioning that keep you fresh through every single mile.",
    card: {
      icon: Wind,
      title: "Breathable Mesh",
      text: "Airflow channels keep every run fresh.",
    },
  },
  {
    id: "purple",
    colorName: "Violet Dusk",
    dot: "#7c3aed",
    accent: "#7c3aed",
    gradient: ["#e879f9", "#8b5cf6"],
    shoe: purpleShoe,
    background: purpleBg,
    badge: "Limited Edition",
    headline: ["Dream Bigger", "Run Beyond"],
    description:
      "Made for those who chase the last light. Grippy, cushioned and ready for any trail you dare to take on.",
    card: {
      icon: ShieldCheck,
      title: "Durable Grip",
      text: "Trail-ready outsole for every terrain.",
    },
  },
];
