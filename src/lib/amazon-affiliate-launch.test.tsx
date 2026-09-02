import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import AffiliateDisclosurePage from "@/app/affiliate-disclosure/page";
import HomePage from "@/app/page";
import {
  AffiliateNotice,
  ProductRecommendation,
} from "@/components/products/ProductRecommendation";
import {
  AFFILIATE_LINKS_NOTE,
  AMAZON_AFFILIATE_REL,
  AMAZON_ASSOCIATE_DISCLOSURE,
  AMAZON_ASSOCIATE_TAG,
  AMAZON_PRICE_BUTTON_LABEL,
  AMAZON_PRODUCT_URL_PREFIX,
  amazonAssociatesEnabled,
  amazonProductUrl,
  getAmazonAssociateDisclosure,
} from "@/data/affiliates";
import { getGuide, getProductGuides, isGuidePublished } from "@/data/guides";
import {
  getReadyAmazonProducts,
  getReadyProducts,
  pageHasAffiliateLinks,
  productPublicText,
  products,
} from "@/data/products";
import { getIndexablePagePaths } from "@/data/routes";
import {
  currentFeaturedSeason,
  getFeaturedSeasonalGuideCards,
  getSeasonalGuidePromotions,
} from "@/data/seasonalGuides";
import { buildGuideArticleJsonLd } from "@/lib/seo";

const APPROVED_ASINS = [
  "B00002N66H",
  "B00004R9YQ",
  "B00023RYS6",
  "B00BUUUIGK",
  "B01BECQAWO",
  "B01BECQEA2",
] as const;

const UNFINISHED_LANGUAGE =
  /placeholder|research pending|to be researched|not yet researched|coming soon|coming later|retailer not set|retailer link disabled|guide in progress|will be added later|planned later|not published yet|not available yet/i;

const root = process.cwd();

function readSrc(relativePath: string): string {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function renderReadyCards(ids: string[]): string {
  return getReadyProducts(ids)
    .map((product) => renderToStaticMarkup(<ProductRecommendation product={product} />))
    .join("\n");
}

describe("Amazon affiliate configuration", () => {
  test("Associates is enabled with one tracking ID and no PA-API credentials", () => {
    expect(amazonAssociatesEnabled).toBe(true);
    expect(AMAZON_ASSOCIATE_TAG).toBe("harvestbench-20");
    expect(getAmazonAssociateDisclosure()).toBe(AMAZON_ASSOCIATE_DISCLOSURE);
    expect(getAmazonAssociateDisclosure()).toBe(
      "As an Amazon Associate I earn from qualifying purchases.",
    );

    const affiliates = readSrc("src/data/affiliates.ts");
    expect(affiliates).toContain('harvestbench-20');
    expect(affiliates).not.toMatch(/amzn\.to|PA-API|accessKey|secretKey|associate-tag/i);
    expect(readSrc("src/components/ads/AdSenseScript.tsx")).not.toMatch(/ca-pub-/);
  });
});

describe("approved Amazon products", () => {
  test("exactly six ready Amazon products use the approved ASINs", () => {
    const ready = getReadyAmazonProducts();
    expect(ready).toHaveLength(6);
    expect(ready.map((product) => product.asin).sort()).toEqual([...APPROVED_ASINS].sort());
    expect(products.filter((product) => product.status === "ready")).toHaveLength(6);

    for (const product of ready) {
      expect(product.asin).toBeTruthy();
      expect(product.externalUrl).toBe(amazonProductUrl(product.asin!));
      expect(product.externalUrl.startsWith(AMAZON_PRODUCT_URL_PREFIX)).toBe(true);
      expect(product.externalUrl).toContain(`tag=${AMAZON_ASSOCIATE_TAG}`);
      expect(product.affiliate).toBe(true);
      expect(product.retailer).toBe("amazon");
    }
  });

  test("no unapproved, row-cover, or compost affiliate products exist", () => {
    const ready = getReadyAmazonProducts();
    expect(ready.every((product) => APPROVED_ASINS.includes(product.asin as (typeof APPROVED_ASINS)[number]))).toBe(
      true,
    );
    expect(
      products.some((product) => /row[- ]cover|compost/i.test(`${product.id} ${product.name} ${product.category}`)),
    ).toBe(false);
    expect(products.filter((product) => product.affiliate)).toHaveLength(6);
  });
});

describe("activated buying guides", () => {
  test("each activated guide shows three ready products and no placeholder cards", () => {
    const shears = getGuide("best-pruning-shears");
    const cart = getGuide("best-garden-cart");
    expect(shears?.updated).toBe("2026-09-02");
    expect(cart?.updated).toBe("2026-09-02");
    expect(isGuidePublished(shears!)).toBe(true);
    expect(isGuidePublished(cart!)).toBe(true);

    const shearProducts = getReadyProducts(shears?.products ?? []);
    const cartProducts = getReadyProducts(cart?.products ?? []);
    expect(shearProducts).toHaveLength(3);
    expect(cartProducts).toHaveLength(3);
    expect(shearProducts.map((product) => product.asin)).toEqual([
      "B00002N66H",
      "B00004R9YQ",
      "B00023RYS6",
    ]);
    expect(cartProducts.map((product) => product.asin)).toEqual([
      "B00BUUUIGK",
      "B01BECQAWO",
      "B01BECQEA2",
    ]);
    expect(pageHasAffiliateLinks(shearProducts)).toBe(true);
    expect(pageHasAffiliateLinks(cartProducts)).toBe(true);
  });

  test("product cards stay editorial and use the required Amazon button", () => {
    const shears = getGuide("best-pruning-shears");
    const cart = getGuide("best-garden-cart");
    const html = [
      renderReadyCards(shears?.products ?? []),
      renderReadyCards(cart?.products ?? []),
    ].join("\n");

    expect(html).toContain("Best for");
    expect(html).toContain("Keep in mind");
    expect(html).toContain(AMAZON_PRICE_BUTTON_LABEL);
    expect(html.match(/Check price and availability on Amazon/g)?.length).toBe(6);

    for (const asin of APPROVED_ASINS) {
      expect(html).toContain(`https://www.amazon.com/dp/${asin}?tag=harvestbench-20`);
    }

    expect(html).toContain(`rel="${AMAZON_AFFILIATE_REL}"`);
    expect(html).toContain('target="_blank"');
    expect(html).not.toMatch(/<img\b|src="[^"]*amazon|placeholder|Price range/i);
    expect(html).not.toMatch(/star rating|\d\s*out of\s*5|review count|\d+\s*reviews/i);
    expect(html).not.toMatch(/\$\d|Amazon’s Choice|best seller|best overall|we tested|our top-tested/i);
  });

  test("guide pages show one nearby disclosure block with the required sentence", () => {
    const notice = renderToStaticMarkup(<AffiliateNotice enabled />);
    expect(notice).toContain(AFFILIATE_LINKS_NOTE);
    expect(notice).toContain(AMAZON_ASSOCIATE_DISCLOSURE);
    expect(notice.match(/As an Amazon Associate I earn from qualifying purchases\./g)?.length).toBe(1);
    expect(notice.match(/Affiliate links:/g)?.length).toBe(1);

    const guidePage = readSrc("src/app/guides/[slug]/page.tsx");
    expect(guidePage).toContain("<AffiliateNotice enabled={showAffiliate} />");
    expect(guidePage.match(/AffiliateNotice/g)?.length).toBe(2);
  });
});

describe("other buying guides and public copy", () => {
  test("other buying guides render no placeholder product sections", () => {
    const otherGuides = getProductGuides().filter(
      (guide) => guide.slug !== "best-pruning-shears" && guide.slug !== "best-garden-cart",
    );
    expect(otherGuides.length).toBeGreaterThan(0);
    for (const guide of otherGuides) {
      expect(isGuidePublished(guide)).toBe(true);
      expect(getIndexablePagePaths()).toContain(`/guides/${guide.slug}`);
      expect(getReadyProducts(guide.products ?? [])).toEqual([]);
      expect(pageHasAffiliateLinks(getReadyProducts(guide.products ?? []))).toBe(false);
    }
  });

  test("ready public product copy does not expose unfinished-state language", () => {
    for (const product of getReadyAmazonProducts()) {
      expect(productPublicText(product), product.id).not.toMatch(UNFINISHED_LANGUAGE);
    }

    const placeholderHtml = products
      .filter((product) => product.status === "placeholder")
      .map((product) => renderToStaticMarkup(<ProductRecommendation product={product} />))
      .join("");
    expect(placeholderHtml).toBe("");
  });
});

describe("seasonal homepage promotion", () => {
  test("featured season is fall and promotion does not hide guides", () => {
    expect(currentFeaturedSeason).toBe("fall");
    const featured = getFeaturedSeasonalGuideCards();
    expect(featured).toHaveLength(2);
    expect(featured.map((card) => card.slug)).toEqual([
      "best-pruning-shears",
      "best-garden-cart",
    ]);
    expect(featured.map((card) => card.href)).toEqual([
      "/guides/best-pruning-shears",
      "/guides/best-garden-cart",
    ]);

    expect(getSeasonalGuidePromotions("winter")).toEqual([]);
    expect(getFeaturedSeasonalGuideCards("winter")).toEqual([]);
    expect(getIndexablePagePaths()).toContain("/guides/best-pruning-shears");
    expect(getIndexablePagePaths()).toContain("/guides/best-garden-cart");
    expect(isGuidePublished(getGuide("best-pruning-shears")!)).toBe(true);
    expect(isGuidePublished(getGuide("best-garden-cart")!)).toBe(true);
  });

  test("homepage has two fall guide cards and no Amazon link", () => {
    const html = renderToStaticMarkup(<HomePage />);
    expect(html).toContain("Fall garden projects");
    expect(html).toContain(
      "Clear finished beds, handle seasonal pruning, and move leaves, compost, and soil before the next planting.",
    );
    expect(html).toContain("Prune and clear finished plants");
    expect(html).toContain(
      "Compare bypass pruning shears by cutting capacity, hand fit, and repairability.",
    );
    expect(html).toContain("Compare pruning shears");
    expect(html).toContain("Move leaves, compost, and soil");
    expect(html).toContain(
      "Compare folding wagons, poly dump carts, and steel utility carts by load type and storage space.",
    );
    expect(html).toContain("Compare garden carts");
    expect(html).toContain('href="/guides/best-pruning-shears"');
    expect(html).toContain('href="/guides/best-garden-cart"');
    expect(html).not.toMatch(/amazon\.com|amzn\.to|tag=harvestbench-20/i);
    expect(html.match(/BUYING GUIDE/g)?.length).toBe(2);
  });
});

describe("disclosure, sitemap, and Article schema", () => {
  test("Affiliate Disclosure shows the Associates sentence and live Amazon links", () => {
    const html = renderToStaticMarkup(<AffiliateDisclosurePage />);
    expect(html).toContain(AMAZON_ASSOCIATE_DISCLOSURE);
    expect(html).toContain("Selected buying guides include Amazon Special Links");
    expect(html).not.toMatch(/does not currently display Amazon|no live Amazon/i);
    expect(html).toContain("editorial conclusions");
  });

  test("activated guides remain indexable with Article schema", () => {
    for (const slug of ["best-pruning-shears", "best-garden-cart"] as const) {
      const guide = getGuide(slug)!;
      expect(getIndexablePagePaths()).toContain(`/guides/${slug}`);
      const article = buildGuideArticleJsonLd(guide, `/guides/${slug}`, true);
      expect(article).not.toBeNull();
      expect(article?.["@type"]).toBe("Article");
      expect(article?.dateModified).toBe("2026-09-02");
    }
  });
});
