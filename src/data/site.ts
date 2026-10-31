import type { IconName } from "../components/FeatureIcons";

/**
 * Everything below the hero is PLACEHOLDER copy so the page reads as finished.
 * Replace the wording, prices and contact details with your real content.
 */

/** the test-ride form opens the visitor's email app addressed here – change it! */
export const CONTACT_EMAIL = "hello@skot.example";

export const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Collections", href: "#collections" },
  { label: "Services", href: "#services" },
  { label: "Options", href: "#options" },
];

export interface Feature {
  icon: IconName;
  title: string;
  body: string;
}

export const features: Feature[] = [
  { icon: "bolt", title: "Instant torque", body: "Electric power from a standstill – quick off the lights, whisper-quiet the whole way." },
  { icon: "battery", title: "Charge anywhere", body: "A removable battery charges from a normal socket, at home or at your desk." },
  { icon: "phone", title: "Smart & connected", body: "Lock, locate and check your charge from your phone." },
  { icon: "leaf", title: "Zero tailpipe emissions", body: "Cleaner streets and cheaper running costs than petrol, every single ride." },
];

export interface Service {
  icon: IconName;
  title: string;
  body: string;
  tag: string;
}

export const services: Service[] = [
  { icon: "calendar", title: "Test rides", body: "Try any colour and model before you decide. Pick a slot that suits you.", tag: "Free" },
  { icon: "truck", title: "Home delivery", body: "Your Skot arrives ready to ride, with a full walk-through of the controls.", tag: "Nationwide" },
  { icon: "wrench", title: "Servicing & repairs", body: "Fewer moving parts means less to fix – and our team handles the rest.", tag: "Certified" },
  { icon: "card", title: "Flexible finance", body: "Buy outright, lease or subscribe. Spread the cost the way you prefer.", tag: "From monthly" },
];

export const steps = [
  { n: "01", title: "Pick your Skot", body: "Choose a model and a colour that fits the way you ride." },
  { n: "02", title: "Book a test ride", body: "Feel the acceleration for yourself – no pressure, no obligation." },
  { n: "03", title: "We deliver", body: "Order online and we bring it to your door, charged and registered-ready." },
];

export interface Plan {
  id: string;
  name: string;
  blurb: string;
  price: number;
  unit: string;
  perks: string[];
  featured?: boolean;
}

/** SAMPLE prices – replace with your real ones */
export const plans: Plan[] = [
  {
    id: "buy",
    name: "Buy",
    blurb: "Own it outright from day one.",
    price: 2490,
    unit: "one-off",
    perks: ["Choose any colour", "Home delivery", "Manufacturer warranty"],
  },
  {
    id: "lease",
    name: "Lease",
    blurb: "Low monthly payments, flexible end.",
    price: 59,
    unit: "per month",
    perks: ["Everything in Buy", "Servicing included", "Upgrade after the term"],
    featured: true,
  },
  {
    id: "subscribe",
    name: "Subscribe",
    blurb: "Ride now, cancel when you like.",
    price: 89,
    unit: "per month",
    perks: ["Everything in Lease", "Insurance help", "Swap models anytime"],
  },
];

export interface Addon {
  id: string;
  label: string;
  price: number;
}

/** SAMPLE prices – replace with your real ones */
export const addons: Addon[] = [
  { id: "topbox", label: "Top box", price: 120 },
  { id: "helmet", label: "Helmet", price: 89 },
  { id: "mount", label: "Phone mount", price: 25 },
  { id: "battery", label: "Spare battery", price: 450 },
  { id: "cover", label: "Weather cover", price: 35 },
];

export interface Review {
  quote: string;
  name: string;
  place: string;
  avatar: 0 | 1 | 2;
  /** shows a "Sample" tag – delete this line once you use a real review */
  sample?: boolean;
}

/** SAMPLE reviews – swap in real customer reviews, then remove `sample: true` */
export const reviews: Review[] = [
  { quote: "Silent, quick and so easy to park. I haven't missed the petrol station once.", name: "Sample rider A", place: "City commuter", avatar: 0, sample: true },
  { quote: "The test ride sold me in five minutes. Charging overnight is simply effortless.", name: "Sample rider B", place: "Weekend rider", avatar: 1, sample: true },
  { quote: "Delivered, explained and ready to go. Everything about the process felt thought through.", name: "Sample rider C", place: "First-time owner", avatar: 2, sample: true },
];

export const faqs = [
  {
    q: "How far can I ride on one charge?",
    a: "It depends on the model. Our line-up ranges from around 48 miles on the Urban Y30 up to 95 miles on the Cruiser B25. Real-world range varies with speed, weight and weather.",
  },
  {
    q: "How long does a full charge take?",
    a: "Between 2 and 4 hours depending on the model. Plug into a standard socket at home or at work – there's no special wallbox needed.",
  },
  {
    q: "Do I need a licence or insurance?",
    a: "Rules depend on your country and on the power of the model you choose. We'll confirm exactly what you need before you order.",
  },
  {
    q: "Can I try one before I buy?",
    a: "Yes – book a test ride and pick any colour or model you like. It's free and there's no obligation.",
  },
  {
    q: "What does the warranty cover?",
    a: "Every Skot comes with a manufacturer warranty. The exact cover for the frame, motor and battery is listed on your order confirmation.",
  },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Collections", href: "#collections" },
      { label: "Plans & options", href: "#options" },
      { label: "Book a test ride", href: "#contact" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Contact us", href: "#contact" },
    ],
  },
];
