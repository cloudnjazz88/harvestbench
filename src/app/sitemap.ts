import type { MetadataRoute } from "next";
import { getIndexablePagePaths } from "@/data/routes";
import { getPests } from "@/data/pests";
import { getPublishedGuides } from "@/data/guides";
import { storedGuideDate } from "@/lib/seo";
import { getSiteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const dates = new Map(getPublishedGuides().map((guide) => [`/guides/${guide.slug}`, storedGuideDate(guide.updated)]));
  for (const pest of getPests()) {
    if (pest.updated) dates.set(`/pest-problems/${pest.slug}`, storedGuideDate(pest.updated));
  }
  return getIndexablePagePaths().map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    ...(dates.get(path) ? { lastModified: dates.get(path)! } : {}),
    changeFrequency: path === "/" || path === "/calculators" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/calculators") ? 0.8 : 0.6,
  }));
}
