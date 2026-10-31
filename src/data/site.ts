import { Feather, Leaf, RotateCcw, ShieldCheck, Truck, Wind } from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * Everything on the page below the hero is PLACEHOLDER content, so the page reads as finished.
 * Replace the wording, prices, numbers and contact details with your real ones.
 */

/** the contact form opens the visitor's email app addressed here – change it! */
export const CONTACT_EMAIL = "hello@volterra.example";

/** prices are formatted with this currency */
export const CURRENCY = { locale: "en-US", code: "USD" };

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Shop", href: "#shop" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/** ids of the sections the floating menu highlights, in page order */
export const spyIds = ["home", "shop", "products", "about", "contact"];

export const marquee: { icon: LucideIcon; text: string }[] = [
  { icon: Truck, text: "Fast, tracked delivery" },
  { icon: RotateCcw, text: "Easy returns" },
  { icon: Feather, text: "Ultra-light build" },
  { icon: Leaf, text: "Recycled materials" },
  { icon: ShieldCheck, text: "Warranty included" },
];

/* ───────────────────────── shop ───────────────────────── */

export interface Product {
  name: string;
  price: number;
  tagline: string;
}

/** keyed by the id of a variant in data/variants.ts – SAMPLE names and prices */
export const products: Record<string, Product> = {
  orange: {
    name: "Volterra Aero",
    price: 149,
    tagline: "Our everyday all-rounder – light, springy and ready for any road.",
  },
  blue: {
    name: "Volterra Flow",
    price: 149,
    tagline: "Cooling mesh and soft cushioning for long, warm-weather miles.",
  },
  purple: {
    name: "Volterra Dusk",
    price: 169,
    tagline: "A limited colourway with a trail-ready outsole for rougher ground.",
  },
};

export const sizes = [7, 8, 9, 10, 11];

/* ─────────────────────── technology ─────────────────────── */

export interface Tech {
  icon: LucideIcon;
  title: string;
  body: string;
  /** SAMPLE spec – replace with your real figure */
  stat: { value: string; label: string };
  /** where the pin sits on the shoe image, in % */
  pin: { x: number; y: number };
}

export const tech: Tech[] = [
  {
    icon: Feather,
    title: "Ultra Light",
    body: "A featherlight knit upper keeps the weight down, so every stride feels effortless.",
    stat: { value: "240 g", label: "Weight per shoe" },
    pin: { x: 31, y: 6 },
  },
  {
    icon: Wind,
    title: "Breathable Mesh",
    body: "Open-weave mesh channels air through the shoe to keep your feet cool, mile after mile.",
    stat: { value: "360°", label: "Airflow" },
    pin: { x: 62, y: 50 },
  },
  {
    icon: ShieldCheck,
    title: "Durable Grip",
    body: "Deep, multi-directional lugs bite into wet roads and loose trails alike.",
    stat: { value: "5 mm", label: "Lug depth" },
    pin: { x: 72, y: 81 },
  },
  {
    icon: Leaf,
    title: "Eco Friendly",
    body: "Made with recycled materials and shipped in plastic-free packaging.",
    stat: { value: "30%", label: "Recycled content" },
    pin: { x: 50, y: 64 },
  },
];

/* ───────────────────────── about ───────────────────────── */

/** SAMPLE figures – replace with your real ones. The two last stats come from your data automatically. */
export const aboutStats = [
  { to: 50, suffix: "k+", label: "Runners worldwide" },
  { to: 30, suffix: "+", label: "Countries shipped to" },
];

/* ──────────────────────── reviews ──────────────────────── */

export interface Review {
  quote: string;
  name: string;
  role: string;
  /** shows a "Sample" tag – delete this line once you use a real review */
  sample?: boolean;
}

/** SAMPLE reviews – swap in real customer reviews, then remove `sample: true` */
export const reviews: Review[] = [
  {
    quote: "So light I forgot I was wearing them. The cushioning holds up on long runs too.",
    name: "Sample runner A",
    role: "Road runner",
    sample: true,
  },
  {
    quote: "The mesh keeps my feet cool even in summer, and the grip on wet paths is excellent.",
    name: "Sample runner B",
    role: "Weekend jogger",
    sample: true,
  },
  {
    quote: "Colour looks even better in person. Comfortable straight out of the box.",
    name: "Sample runner C",
    role: "Trail runner",
    sample: true,
  },
];

/* ───────────────────────── faq ───────────────────────── */

export const faqs = [
  {
    q: "How do I find my size?",
    a: "Choose the size you normally wear in running shoes. Volterra fits true to size with a little room in the toe box for long runs. If it doesn't feel right, get in touch and we'll help you swap.",
  },
  {
    q: "What's the difference between the colourways?",
    a: "They share the same lightweight build. Ocean Blue leans on cooling mesh for warm weather, Violet Dusk adds a trail-ready outsole, and Sunset Orange is the everyday all-rounder.",
  },
  {
    q: "How long does delivery take?",
    a: "Orders usually leave our warehouse within a couple of working days, and you'll get a tracking link as soon as yours ships.",
  },
  {
    q: "Can I return my shoes?",
    a: "Yes. If they're unworn, send them back within the return window shown at checkout for a refund or an exchange.",
  },
  {
    q: "How should I clean them?",
    a: "Brush off dry dirt, then hand-wash with mild soap and cold water. Air-dry away from direct heat and never use a tumble dryer.",
  },
];

/* ───────────────────────── footer ───────────────────────── */

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "New collection", href: "#shop" },
      { label: "Technology", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
];
