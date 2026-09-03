import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import GuidesIndexPage from "@/app/guides/page";
import { generateMetadata as guideMetadata } from "@/app/guides/[slug]/page";
import PrivacyPage from "@/app/privacy/page";
import { calculators } from "@/data/calculators";
import { getGuide, guides, isGuidePublished } from "@/data/guides";
import { getReadyProducts } from "@/data/products";
import { getIndexablePagePaths } from "@/data/routes";
import { buildGuideArticleJsonLd } from "@/lib/seo";

const RENAMED_GUIDES = [
  {
    slug: "best-raised-garden-beds",
    oldTitle: "Best Raised Garden Beds: How to Choose a Frame",
    newTitle: "How to Choose a Raised Garden Bed",
    linkLabel: "How to choose a raised garden bed",
  },
  {
    slug: "best-garden-hose",
    oldTitle: "Best Garden Hose: Buying Criteria",
    newTitle: "How to Choose a Garden Hose",
    linkLabel: "How to choose a garden hose",
  },
  {
    slug: "best-soaker-hose",
    oldTitle: "Best Soaker Hose: Buying Criteria",
    newTitle: "How to Choose a Soaker Hose",
    linkLabel: "How to choose a soaker hose",
  },
  {
    slug: "best-garden-trellis",
    oldTitle: "Best Garden Trellis: Buying Criteria",
    newTitle: "How to Choose a Garden Trellis",
    linkLabel: "How to choose a garden trellis",
  },
  {
    slug: "best-raised-bed-soil",
    oldTitle: "Best Raised Bed Soil: What to Look For",
    newTitle: "How to Choose Raised Bed Soil",
    linkLabel: "How to choose raised bed soil",
  },
] as const;

const OBSOLETE_LABELS = [
  "Best raised garden beds",
  "Best garden hose",
  "Best soaker hose",
  "Best garden trellis",
  "Best raised bed soil",
  "Best raised bed soil buying guide",
  "Buying raised bed soil",
] as const;

const root = process.cwd();

function readSrc(relativePath: string): string {
  return readFileSync(path.join(root, relativePath), "utf8");
}

/** Every structured internal link stored in guide and calculator records. */
function internalLinks(): { href: string; label: string }[] {
  return [
    ...guides.flatMap((guide) => [...guide.relatedTools, ...guide.relatedGuides]),
    ...calculators.flatMap((calculator) => [
      ...calculator.relatedCalculators,
      ...calculator.relatedGuides,
    ]),
  ];
}

describe("privacy policy disclosures", () => {
  const html = renderToStaticMarkup(<PrivacyPage />);

  test("affiliate wording is accurate and links to the disclosure page", () => {
    expect(html).not.toMatch(/does not currently use affiliate links/i);
    expect(html).not.toMatch(/no affiliate links/i);
    expect(html).toContain("Selected buying guides on this site contain affiliate links");
    expect(html).toContain("may earn a commission");
    expect(html).toContain("at no extra cost to you");
    expect(html).toContain("Not every guide or product on the site uses an affiliate link");
    expect(html).toContain('href="/affiliate-disclosure"');
  });

  test("Google advertising and cookie disclosures are present", () => {
    expect(html).toContain("may use Google AdSense to display advertising when advertising is enabled");
    expect(html).toContain(
      "third-party vendors, including Google, may use cookies to serve ads based on",
    );
    expect(html).toContain("your previous visits to this site or to other websites");
    expect(html).toContain(
      "use of advertising cookies enables Google and its partners to serve personalized ads",
    );
    expect(html).toContain(
      "web beacons, IP addresses, and similar identifiers to serve, personalize, and measure advertising",
    );
    expect(html).toContain("https://adssettings.google.com/");
    expect(html).toContain("https://policies.google.com/technologies/partner-sites");
  });

  test("external Google links open in a new tab with safe rel attributes", () => {
    for (const url of [
      "https://adssettings.google.com/",
      "https://policies.google.com/technologies/partner-sites",
    ]) {
      const anchor = html.match(new RegExp(`<a[^>]*href="${url}"[^>]*>`))?.[0];
      expect(anchor, url).toBeTruthy();
      expect(anchor).toContain('target="_blank"');
      expect(anchor).toContain('rel="noopener noreferrer"');
    }
  });

  test("does not claim active ads, a publisher ID, or a consent tool", () => {
    expect(html).not.toMatch(/ca-pub-/);
    expect(html).not.toMatch(/ads are currently (shown|displayed)|we currently display ads/i);
    expect(html).not.toMatch(/consent management|cookie banner|cookie consent|legal advice/i);
  });

  test("keeps the existing accurate explanations", () => {
    expect(html).toContain("Calculators run in your browser");
    expect(html).toContain("We do not require an account");
    expect(html).toContain("contact@harvestbench.com");
    expect(html).toContain("may use Google Analytics");
  });
});

describe("renamed how-to-choose guides", () => {
  const hubHtml = renderToStaticMarkup(<GuidesIndexPage />);
  const guidesSource = readSrc("src/data/guides.ts");

  test("slugs stay unchanged and stay published and indexable", () => {
    for (const { slug } of RENAMED_GUIDES) {
      const guide = getGuide(slug);
      expect(guide, slug).toBeDefined();
      expect(guide!.slug).toBe(slug);
      expect(isGuidePublished(guide!)).toBe(true);
      expect(getIndexablePagePaths()).toContain(`/guides/${slug}`);
      expect(hubHtml).toContain(`href="/guides/${slug}"`);
    }
  });

  test("new titles propagate to hub cards, metadata, and Article schema", async () => {
    for (const { slug, newTitle } of RENAMED_GUIDES) {
      const guide = getGuide(slug)!;
      expect(guide.title).toBe(newTitle);
      expect(hubHtml).toContain(newTitle);

      const metadata = await guideMetadata({ params: Promise.resolve({ slug }) });
      expect(metadata.title).toEqual({ absolute: `${newTitle} | HarvestBench` });

      const article = buildGuideArticleJsonLd(guide, `/guides/${slug}`, true);
      expect(article?.headline).toBe(newTitle);
    }
  });

  test("old Best titles are gone from guide data and public copy", () => {
    for (const { oldTitle } of RENAMED_GUIDES) {
      expect(guides.some((guide) => guide.title === oldTitle)).toBe(false);
      expect(guidesSource).not.toContain(oldTitle);
      expect(hubHtml).not.toContain(oldTitle);
    }
  });

  test("internal link labels use the new How to choose wording on unchanged hrefs", () => {
    const links = internalLinks();

    for (const { slug, linkLabel } of RENAMED_GUIDES) {
      const href = `/guides/${slug}`;
      const matching = links.filter((link) => link.href === href);
      expect(matching.length, href).toBeGreaterThan(0);
      expect(matching.some((link) => link.label === linkLabel), href).toBe(true);

      // Neutral labels such as "Garden hose buying guide" stay; "Best…" claims must not.
      for (const link of matching) {
        expect(link.href).toBe(href);
        expect(link.label, href).not.toMatch(/^Best\b/i);
      }
    }
  });

  test("obsolete Best internal labels are gone", () => {
    const labels = internalLinks().map((link) => link.label);
    for (const obsolete of OBSOLETE_LABELS) {
      expect(labels, obsolete).not.toContain(obsolete);
      expect(readSrc("src/data/guides.ts")).not.toContain(`label: "${obsolete}"`);
      expect(readSrc("src/data/calculators.ts")).not.toContain(`label: "${obsolete}"`);
    }
  });

  test("descriptions drop the fake-review wording without adding products", () => {
    for (const { slug } of RENAMED_GUIDES) {
      const guide = getGuide(slug)!;
      expect(guide.description, slug).not.toMatch(/fake|fabricated|test claims/i);
      expect(getReadyProducts(guide.products ?? [])).toEqual([]);
    }
  });
});

describe("guides outside this task", () => {
  test("the two active Amazon guides keep their titles and product links", () => {
    const shears = getGuide("best-pruning-shears")!;
    const cart = getGuide("best-garden-cart")!;
    expect(shears.title).toBe("Best Pruning Shears: Buying Criteria");
    expect(cart.title).toBe("Best Garden Cart: Buying Criteria");
    expect(isGuidePublished(shears)).toBe(true);
    expect(isGuidePublished(cart)).toBe(true);
    expect(shears.products).toEqual([
      "fiskars-bypass-pruning-shears",
      "corona-bp-3180d",
      "felco-f2",
    ]);
    expect(cart.products).toEqual([
      "macsports-collapsible-wagon",
      "gorilla-carts-gor4ps",
      "gorilla-carts-1000-steel",
    ]);

    const links = [...getReadyProducts(shears.products ?? []), ...getReadyProducts(cart.products ?? [])];
    expect(links).toHaveLength(6);
    for (const product of links) {
      expect(product.externalUrl).toMatch(
        /^https:\/\/www\.amazon\.com\/dp\/[A-Z0-9]{10}\?tag=harvestbench-20$/,
      );
    }
  });

  test("best-drip-irrigation is unchanged", () => {
    const drip = getGuide("best-drip-irrigation")!;
    expect(drip.title).toBe("Best Drip Irrigation for Raised Beds: Buying Criteria");
    expect(drip.description).toBe(
      "How to choose drip tubing, emitters, and a kit for backyard raised beds — layout, pressure, and timers, without fake product reviews.",
    );
    expect(drip.updated).toBe("2026-08-26");
    expect(drip.products).toEqual(["drip-irrigation-kit-placeholder", "drip-timer-placeholder"]);
    expect(isGuidePublished(drip)).toBe(true);
    expect(getIndexablePagePaths()).toContain("/guides/best-drip-irrigation");
    expect(drip.relatedGuides.map((link) => link.href)).toEqual([
      "/guides/how-often-to-water-raised-beds",
      "/guides/best-soaker-hose",
      "/guides/best-garden-hose",
    ]);

    const dripLinks = internalLinks().filter(
      (link) => link.href === "/guides/best-drip-irrigation",
    );
    expect(dripLinks.length).toBeGreaterThan(0);
    for (const link of dripLinks) {
      expect(link.label).toBe("Drip irrigation for raised beds");
    }
  });
});
