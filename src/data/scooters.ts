export interface Stat {
  value: string;
  unit: string;
  label: string;
}

export interface Scooter {
  id: string;
  /** big model code, e.g. "C45" */
  code: string;
  model: string;
  /** next-model card title / subtitle */
  thumbCode: string;
  thumbName: string;
  colorName: string;
  /** paragraph shown under the model code (wraps naturally) */
  description: string;
  /** phrase inside `description` that gets the underline */
  highlight: string;
  /** colour of the round swatch button */
  swatch: string;
  /** soft glow behind the scooter */
  glow: string;
  /** SAMPLE figures – replace with your real specs */
  stats: [Stat, Stat, Stat];
  /** transparent WebP, all drawn on the same canvas & ground line */
  image: string;
}

export const scooters: Scooter[] = [
  {
    id: "white",
    code: "C45",
    model: "Classic Model",
    thumbCode: "WH50QT",
    thumbName: "Panther Moped",
    colorName: "White",
    description:
      "Officially the UK's No.1 selling moped. This 50cc Panther moped is agile and ready to strike.",
    highlight: "This 50cc",
    swatch: "#f4f4f4",
    glow: "#ffffff",
    stats: [
      { value: "45", unit: "mph", label: "Top speed" },
      { value: "70", unit: "mi", label: "Range" },
      { value: "3", unit: "h", label: "Full charge" },
    ],
    image: "/scooters/white.webp",
  },
  {
    id: "orange",
    code: "D50",
    model: "Sport Model",
    thumbCode: "OR50QT",
    thumbName: "Sunset Moped",
    colorName: "Orange",
    description:
      "Bold, bright and built for the city. This 50cc Sunset moped has instant torque and zero fuss.",
    highlight: "This 50cc",
    swatch: "#f08a1c",
    glow: "#ff9a3c",
    stats: [
      { value: "50", unit: "mph", label: "Top speed" },
      { value: "62", unit: "mi", label: "Range" },
      { value: "3", unit: "h", label: "Full charge" },
    ],
    image: "/scooters/orange.webp",
  },
  {
    id: "red",
    code: "R70",
    model: "Racer Model",
    thumbCode: "RD70QT",
    thumbName: "Crimson Moped",
    colorName: "Red",
    description:
      "Turn heads on every street. The Racer 70cc delivers speed, style and silent electric power.",
    highlight: "Racer 70cc",
    swatch: "#e8342e",
    glow: "#ff5a52",
    stats: [
      { value: "60", unit: "mph", label: "Top speed" },
      { value: "55", unit: "mi", label: "Range" },
      { value: "2.5", unit: "h", label: "Full charge" },
    ],
    image: "/scooters/red.webp",
  },
  {
    id: "yellow",
    code: "Y30",
    model: "Urban Model",
    thumbCode: "YL30QT",
    thumbName: "Sunny Moped",
    colorName: "Yellow",
    description:
      "Lightweight and cheerful. This 30cc Sunny moped is perfect for quick commutes and weekend rides.",
    highlight: "This 30cc",
    swatch: "#f6c928",
    glow: "#ffd23f",
    stats: [
      { value: "28", unit: "mph", label: "Top speed" },
      { value: "48", unit: "mi", label: "Range" },
      { value: "2", unit: "h", label: "Full charge" },
    ],
    image: "/scooters/yellow.webp",
  },
  {
    id: "blue",
    code: "B25",
    model: "Cruiser Model",
    thumbCode: "BL25QT",
    thumbName: "Ocean Moped",
    colorName: "Blue",
    description:
      "Smooth, calm and comfy. This 25cc Ocean cruiser has a long-range battery for lazy city days.",
    highlight: "This 25cc",
    swatch: "#2f6be0",
    glow: "#4c8dff",
    stats: [
      { value: "35", unit: "mph", label: "Top speed" },
      { value: "95", unit: "mi", label: "Range" },
      { value: "4", unit: "h", label: "Full charge" },
    ],
    image: "/scooters/blue.webp",
  },
  {
    id: "black",
    code: "K99",
    model: "Night Model",
    thumbCode: "BK99QT",
    thumbName: "Shadow Moped",
    colorName: "Black",
    description:
      "Stealth looks, serious performance. This 99cc Shadow moped is the fastest in the Skot line-up.",
    highlight: "This 99cc",
    swatch: "#161616",
    glow: "#8a8f98",
    stats: [
      { value: "65", unit: "mph", label: "Top speed" },
      { value: "80", unit: "mi", label: "Range" },
      { value: "3", unit: "h", label: "Full charge" },
    ],
    image: "/scooters/black.webp",
  },
];
