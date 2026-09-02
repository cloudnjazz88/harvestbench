import { getGuide, isGuidePublished } from "@/data/guides";

export type GardenSeason = "spring" | "summer" | "fall" | "winter";

/** Manually set featured season. Do not derive this from the browser or visitor location. */
export const currentFeaturedSeason: GardenSeason = "fall";

export type SeasonalGuidePromotion = {
  slug: string;
  seasons: GardenSeason[];
  priority: number;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export type FeaturedSeasonalGuideCard = SeasonalGuidePromotion & {
  href: string;
};

export const seasonalGuidePromotions: SeasonalGuidePromotion[] = [
  {
    slug: "best-pruning-shears",
    seasons: ["fall"],
    priority: 10,
    eyebrow: "BUYING GUIDE",
    title: "Prune and clear finished plants",
    description:
      "Compare bypass pruning shears by cutting capacity, hand fit, and repairability.",
    cta: "Compare pruning shears",
  },
  {
    slug: "best-garden-cart",
    seasons: ["fall"],
    priority: 20,
    eyebrow: "BUYING GUIDE",
    title: "Move leaves, compost, and soil",
    description:
      "Compare folding wagons, poly dump carts, and steel utility carts by load type and storage space.",
    cta: "Compare garden carts",
  },
];

export function getSeasonalGuidePromotions(
  season: GardenSeason = currentFeaturedSeason,
): SeasonalGuidePromotion[] {
  return seasonalGuidePromotions
    .filter((item) => item.seasons.includes(season))
    .sort((a, b) => a.priority - b.priority);
}

export function getFeaturedSeasonalGuideCards(
  season: GardenSeason = currentFeaturedSeason,
): FeaturedSeasonalGuideCard[] {
  return getSeasonalGuidePromotions(season).flatMap((item) => {
    const guide = getGuide(item.slug);
    if (!guide || !isGuidePublished(guide)) return [];
    return [{ ...item, href: `/guides/${guide.slug}` }];
  });
}
