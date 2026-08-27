import { calculators } from "@/data/calculators";
import { crops } from "@/data/crops";
import { guides } from "@/data/guides";

export function getAllPagePaths(): string[] {
  return [
    "/",
    "/calculators",
    ...calculators.map((item) => item.href),
    "/raised-beds",
    "/vegetable-gardening",
    "/container-gardening",
    ...crops.map((crop) => `/vegetable-gardening/${crop.slug}`),
    "/soil-compost",
    "/seeds",
    "/watering",
    "/garden-tools",
    "/pest-problems",
    "/guides",
    ...guides.map((guide) => `/guides/${guide.slug}`),
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
  ];
}
