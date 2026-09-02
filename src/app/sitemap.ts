import type { MetadataRoute } from "next";
import { getIndexablePagePaths } from "@/data/routes";
import { getSiteUrl } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return getIndexablePagePaths().map((path) => ({
    url: `${base}${path === "/" ? "" : path}`,
    lastModified: new Date("2026-08-27"),
    changeFrequency: path === "/" || path === "/calculators" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/calculators") ? 0.8 : 0.6,
  }));
}
