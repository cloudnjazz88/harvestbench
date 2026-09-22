import { describe, expect, test } from "vitest";
import sitemap from "@/app/sitemap";
import { getPublishedGuides } from "@/data/guides";
import { getSiteUrl } from "@/data/site";
import { storedGuideDate } from "@/lib/seo";

describe("sitemap revision dates", () => {
  test("guide dates match their content, while undated routes omit lastModified", () => {
    const entries = new Map(sitemap().map((entry) => [entry.url, entry]));
    for (const guide of getPublishedGuides()) {
      expect(entries.get(`${getSiteUrl()}/guides/${guide.slug}`)?.lastModified)
        .toBe(storedGuideDate(guide.updated) ?? undefined);
    }
    expect(entries.get(`${getSiteUrl()}/calculators`)).not.toHaveProperty("lastModified");
    expect(entries.get(`${getSiteUrl()}/methodology`)).toBeDefined();
    expect(entries.get(`${getSiteUrl()}/pest-problems/aphids`)?.lastModified).toBe("2026-09-22");
  });
});
