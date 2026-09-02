export const siteConfig = {
  name: "HarvestBench",
  shortName: "HarvestBench",
  tagline:
    "A practical resource for growing vegetables you can harvest in raised beds, containers, and backyard gardens.",
  description:
    "Free garden calculators, planting tools, and practical guides for harvestable vegetables in raised beds, pots, and backyard gardens. Plan soil, potting mix, spacing, and compost with clear numbers.",
  headline: "Grow More in Your Backyard Garden",
  subheadline:
    "Practical calculators, planting tools, and guides for raised beds, containers, and vegetable gardens.",
  locale: "en_US",
  language: "en",
} as const;

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export const analytics = {
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
  adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@harvestbench.com",
};

export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
};

export const primaryNav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/calculators", label: "Calculators" },
  { href: "/raised-beds", label: "Raised Beds" },
  {
    href: "/vegetable-gardening",
    label: "Vegetable Gardening",
    shortLabel: "Vegetables",
  },
  {
    href: "/container-gardening",
    label: "Container Gardening",
    shortLabel: "Containers",
  },
  { href: "/soil-compost", label: "Soil & Compost", shortLabel: "Soil" },
  { href: "/seeds", label: "Seeds & Seed Starting", shortLabel: "Seeds" },
  { href: "/watering", label: "Watering" },
  { href: "/garden-tools", label: "Garden Tools", shortLabel: "Tools" },
  { href: "/pest-problems", label: "Pest & Plant Problems", shortLabel: "Pests" },
  { href: "/guides", label: "Guides" },
];

export const footerNav = {
  tools: [
    { href: "/calculators", label: "All calculators" },
    { href: "/calculators/raised-bed-soil", label: "Raised bed soil" },
    { href: "/calculators/potting-mix", label: "Potting mix" },
    { href: "/calculators/plant-spacing", label: "Plant spacing" },
    { href: "/calculators/compost", label: "Compost" },
    { href: "/calculators/fertilizer", label: "Fertilizer" },
  ],
  topics: [
    { href: "/raised-beds", label: "Raised beds" },
    { href: "/vegetable-gardening", label: "Vegetable gardening" },
    { href: "/container-gardening", label: "Container gardening" },
    { href: "/soil-compost", label: "Soil & compost" },
    { href: "/seeds", label: "Seeds & seed starting" },
    { href: "/watering", label: "Watering" },
    { href: "/garden-tools", label: "Garden tools" },
    { href: "/pest-problems", label: "Pest & plant problems" },
    { href: "/guides", label: "Guides" },
  ],
  legal: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/affiliate-disclosure", label: "Affiliate disclosure" },
  ],
};

