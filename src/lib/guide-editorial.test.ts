import { describe, expect, test } from "vitest";
import { isGuidePublished } from "@/data/guides";
import {
  EDITORIAL_TEAM,
  buildGuideArticleJsonLd,
  formatStoredGuideDate,
  guideEditorialByline,
  storedGuideDate,
} from "@/lib/seo";

describe("guide editorial byline", () => {
  test("a finished guide with a stored date shows the editorial team and formatted date", () => {
    expect(guideEditorialByline("2026-08-26")).toBe(
      "HarvestBench Editorial Team · Updated August 26, 2026",
    );
    expect(formatStoredGuideDate("2026-08-26")).toBe("August 26, 2026");
  });

  test("a guide without a date does not receive a fabricated date", () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(storedGuideDate(undefined)).toBeNull();
    expect(storedGuideDate("")).toBeNull();
    expect(formatStoredGuideDate("")).toBeNull();
    expect(guideEditorialByline(undefined)).toBe(EDITORIAL_TEAM);
    expect(guideEditorialByline("")).toBe(EDITORIAL_TEAM);
    expect(guideEditorialByline(undefined)).not.toContain(today);
    expect(guideEditorialByline("")).not.toMatch(/\d{4}/);
  });
});

describe("guide Article schema", () => {
  test("indexable Article schema contains author, publisher, and stored dateModified", () => {
    const data = buildGuideArticleJsonLd(
      {
        title: "How Deep Should a Raised Bed Be?",
        description: "Soil depth ranges for vegetable beds.",
        updated: "2026-08-26",
      },
      "/guides/how-deep-should-a-raised-bed-be",
      true,
    );

    expect(data).not.toBeNull();
    expect(data?.["@type"]).toBe("Article");
    expect(data?.headline).toBe("How Deep Should a Raised Bed Be?");
    expect(data?.description).toBe("Soil depth ranges for vegetable beds.");
    expect(data?.url).toMatch(/\/guides\/how-deep-should-a-raised-bed-be$/);
    expect(data?.author).toEqual({
      "@type": "Organization",
      name: "HarvestBench Editorial Team",
    });
    expect(data?.publisher).toEqual({
      "@type": "Organization",
      name: "HarvestBench",
    });
    expect(data?.dateModified).toBe("2026-08-26");
  });

  test("unpublished or noindex guides do not emit Article schema", () => {
    expect(isGuidePublished({ published: false })).toBe(false);
    expect(
      buildGuideArticleJsonLd(
        {
          title: "Unpublished",
          description: "Hidden from discovery.",
          updated: "2026-08-26",
        },
        "/guides/unpublished",
        false,
      ),
    ).toBeNull();
  });

  test("Article schema omits dateModified when no legitimate stored date exists", () => {
    const data = buildGuideArticleJsonLd(
      {
        title: "Undated guide",
        description: "No stored update date.",
      },
      "/guides/undated",
      true,
    );

    expect(data).not.toBeNull();
    expect(data).not.toHaveProperty("dateModified");
  });
});
