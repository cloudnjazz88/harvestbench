import { calculators } from "@/data/calculators";
import { crops } from "@/data/crops";
import { getPublishedGuides, guides } from "@/data/guides";
import { pests } from "@/data/pests";

function unique(paths: string[]): string[] {
  return [...new Set(paths)];
}

function corePagePaths(guideSlugs: string[]): string[] {
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
    ...pests.map((pest) => `/pest-problems/${pest.slug}`),
    "/guides",
    ...guideSlugs.map((slug) => `/guides/${slug}`),
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
  ];
}

/** Every reserved static route, including unpublished guide pages. */
export function getAllPagePaths(): string[] {
  return unique(corePagePaths(guides.map((guide) => guide.slug)));
}

/** Public, indexable routes for sitemap and discovery surfaces. */
export function getIndexablePagePaths(): string[] {
  return unique(corePagePaths(getPublishedGuides().map((guide) => guide.slug)));
}

export function isPublicPath(path: string): boolean {
  const clean = path.split("#")[0].split("?")[0];
  return getIndexablePagePaths().includes(clean);
}

export function filterPublicLinks<T extends { href: string }>(items: T[]): T[] {
  return items.filter((item) => isPublicPath(item.href));
}
