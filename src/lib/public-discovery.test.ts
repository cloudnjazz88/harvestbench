import { describe, expect, test } from "vitest";
import { calculators } from "@/data/calculators";
import { crops } from "@/data/crops";
import {
  getHowToGuides,
  getProductGuides,
  getPublishedGuides,
  guides,
  isGuidePublished,
  type Guide,
} from "@/data/guides";
import { getReadyAmazonProducts, getReadyProducts, productPublicText, products } from "@/data/products";
import {
  filterPublicLinks,
  getAllPagePaths,
  getIndexablePagePaths,
  isPublicPath,
} from "@/data/routes";
import { footerNav, headerNav, primaryNav } from "@/data/site";
import type { ContentBlock } from "@/data/types";
import {
  AMAZON_ASSOCIATE_DISCLOSURE,
  amazonAssociatesEnabled,
  getAmazonAssociateDisclosure,
} from "@/data/affiliates";

const UNFINISHED_LANGUAGE =
  /placeholder|research pending|to be researched|not yet researched|coming soon|coming later|retailer not set|retailer link disabled|guide in progress|will be added later|planned later|not published yet|not available yet/i;

function blockText(block: ContentBlock): string[] {
  const parts: string[] = [];
  if ("text" in block && block.text) parts.push(block.text);
  if ("title" in block && block.title) parts.push(block.title);
  if ("items" in block && block.items) parts.push(...block.items);
  if ("headers" in block && block.headers) parts.push(...block.headers);
  if ("rows" in block && block.rows) parts.push(...block.rows.flat());
  return parts;
}

function guidePublicText(guide: Guide): string {
  return [
    guide.title,
    guide.description,
    guide.intro,
    ...guide.body.flatMap(blockText),
    ...guide.faqs.flatMap((item) => [item.question, item.answer]),
  ].join("\n");
}

function markdownHrefs(text: string): string[] {
  return [...text.matchAll(/\]\((\/[^)]+)\)/g)].map((match) => match[1].split("#")[0]);
}

describe("publish and indexability helpers", () => {
  test("guides are published unless published is false", () => {
    expect(isGuidePublished({})).toBe(true);
    expect(isGuidePublished({ published: true })).toBe(true);
    expect(isGuidePublished({ published: false })).toBe(false);
  });

  test("unpublished guides are excluded from public discovery", () => {
    const published = getPublishedGuides();
    expect(published.every(isGuidePublished)).toBe(true);
    expect(getHowToGuides().every((guide) => guide.type === "guide")).toBe(true);
    expect(getProductGuides().every((guide) => guide.type === "product")).toBe(true);

    for (const guide of published) {
      expect(getIndexablePagePaths()).toContain(`/guides/${guide.slug}`);
      expect(isPublicPath(`/guides/${guide.slug}`)).toBe(true);
    }

    expect(isPublicPath("/guides/not-a-real-guide")).toBe(false);
    expect(
      filterPublicLinks([
        { href: "/guides/how-deep-should-a-raised-bed-be", label: "Depth" },
        { href: "/guides/not-a-real-guide", label: "Hidden" },
      ]).map((item) => item.href),
    ).toEqual(["/guides/how-deep-should-a-raised-bed-be"]);
  });

  test("sitemap paths exclude unpublished routes", () => {
    const indexable = getIndexablePagePaths();
    const all = getAllPagePaths();

    expect(indexable).toContain("/");
    expect(indexable).toContain("/calculators");
    expect(indexable).toContain("/guides");
    expect(indexable).toContain("/privacy");

    for (const path of indexable) {
      expect(all).toContain(path);
    }

    const unpublished = guides.filter((guide) => !isGuidePublished(guide));
    for (const guide of unpublished) {
      expect(indexable).not.toContain(`/guides/${guide.slug}`);
      expect(all).toContain(`/guides/${guide.slug}`);
    }
  });
});

describe("homepage and product guides", () => {
  test("homepage helpers only return published guides", () => {
    expect(getProductGuides().every(isGuidePublished)).toBe(true);
    expect(getHowToGuides().every(isGuidePublished)).toBe(true);
  });

  test("placeholder products are not treated as ready recommendations", () => {
    const placeholders = products.filter((product) => product.status === "placeholder");
    expect(placeholders.length).toBeGreaterThan(0);
    expect(getReadyProducts(placeholders.map((product) => product.id))).toEqual([]);
  });

  test("buying guides with finished selection guidance stay in public discovery", () => {
    const productGuides = getProductGuides();
    expect(productGuides.length).toBeGreaterThan(0);
    for (const guide of productGuides) {
      expect(isGuidePublished(guide)).toBe(true);
      expect(getIndexablePagePaths()).toContain(`/guides/${guide.slug}`);
      expect(guidePublicText(guide)).not.toMatch(UNFINISHED_LANGUAGE);
    }
  });
});

describe("public copy and internal links", () => {
  test("published guide and calculator copy does not use unfinished-state language", () => {
    for (const guide of getPublishedGuides()) {
      expect(guidePublicText(guide), guide.slug).not.toMatch(UNFINISHED_LANGUAGE);
    }

    for (const product of getReadyAmazonProducts()) {
      expect(productPublicText(product), product.id).not.toMatch(UNFINISHED_LANGUAGE);
    }

    for (const calculator of calculators) {
      const text = [
        calculator.title,
        calculator.description,
        calculator.intro,
        calculator.formula,
        calculator.example.title,
        calculator.example.body,
        ...calculator.faqs.flatMap((item) => [item.question, item.answer]),
      ].join("\n");
      expect(text, calculator.id).not.toMatch(UNFINISHED_LANGUAGE);
    }
  });

  test("published pages do not link to hidden or missing routes", () => {
    const indexable = new Set(getIndexablePagePaths());
    const hrefs = new Set<string>();

    for (const item of primaryNav) hrefs.add(item.href);
    for (const item of headerNav) hrefs.add(item.href);
    for (const item of footerNav.tools) hrefs.add(item.href);
    for (const item of footerNav.topics) hrefs.add(item.href);
    for (const item of footerNav.legal) hrefs.add(item.href);

    for (const guide of getPublishedGuides()) {
      for (const item of [...guide.relatedGuides, ...guide.relatedTools]) {
        hrefs.add(item.href);
      }
      for (const href of markdownHrefs(guidePublicText(guide))) {
        hrefs.add(href);
      }
    }

    for (const crop of crops) {
      for (const item of [...crop.relatedGuides, ...crop.relatedTools]) {
        hrefs.add(item.href);
      }
    }

    for (const calculator of calculators) {
      for (const item of [...calculator.relatedGuides, ...calculator.relatedCalculators]) {
        hrefs.add(item.href);
      }
    }

    for (const href of hrefs) {
      expect(indexable.has(href), href).toBe(true);
    }
  });
});

describe("Amazon Associates disclosure", () => {
  test("exact Amazon sentence renders after Amazon monetization is enabled", () => {
    expect(amazonAssociatesEnabled).toBe(true);
    expect(getAmazonAssociateDisclosure()).toBe(AMAZON_ASSOCIATE_DISCLOSURE);
    expect(getAmazonAssociateDisclosure()).toBe(
      "As an Amazon Associate I earn from qualifying purchases.",
    );
  });
});
