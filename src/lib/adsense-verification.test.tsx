import { readFileSync } from "node:fs";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { AdSenseScript } from "@/components/ads/AdSenseScript";
import { AMAZON_ASSOCIATE_TAG, amazonAssociatesEnabled } from "@/data/affiliates";
import { getReadyAmazonProducts } from "@/data/products";
import { analytics } from "@/data/site";

const PUBLISHER_ID = "ca-pub-9237217026636557";
const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${PUBLISHER_ID}`;
const ADS_TXT_LINE = "google.com, pub-9237217026636557, DIRECT, f08c47fec0942fa0\n";
const FAKE_PUBLISHER = /ca-pub-123/;

const root = process.cwd();

function readSrc(relativePath: string): string {
  return readFileSync(path.join(root, relativePath), "utf8");
}

describe("AdSense site verification", () => {
  const html = renderToStaticMarkup(<AdSenseScript />);
  const layout = readSrc("src/app/layout.tsx");

  test("uses the exact Google publisher ID once each for script and meta", () => {
    expect(analytics.adsenseClientId).toBe(PUBLISHER_ID);
    expect(html.match(/name="google-adsense-account"/g)).toHaveLength(1);
    expect(html).toContain(`content="${PUBLISHER_ID}"`);
    expect(html.match(/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js/g)).toHaveLength(
      1,
    );
    expect(html).toContain(`src="${ADSENSE_SRC}"`);
  });

  test("script is async with crossorigin anonymous and lives in the document head", () => {
    expect(html).toMatch(/<script\b[^>]*\basync\b/);
    expect(html).toContain('crossorigin="anonymous"');
    expect(layout).toMatch(/<head>[\s\S]*<AdSenseScript \/>[\s\S]*<\/head>/);
    expect(layout).not.toMatch(/<body[\s\S]*<AdSenseScript \/>/);
  });

  test("ads.txt is exactly the supplied Google line plus a final newline", () => {
    expect(readSrc("public/ads.txt")).toBe(ADS_TXT_LINE);
  });

  test("does not activate visible ad units", () => {
    expect(html).not.toMatch(/<ins\b[^>]*class="[^"]*adsbygoogle/);
    expect(readSrc("src/components/ads/AdSlot.tsx")).toContain(
      "if (!client || !slot) return null;",
    );
    expect(readSrc("src/components/ads/AdSenseScript.tsx")).not.toMatch(
      /adsbygoogle\s*=|push\(\{\}\)/,
    );
  });

  test("Amazon product links and tracking ID stay unchanged", () => {
    expect(amazonAssociatesEnabled).toBe(true);
    expect(AMAZON_ASSOCIATE_TAG).toBe("harvestbench-20");
    const ready = getReadyAmazonProducts();
    expect(ready).toHaveLength(6);
    for (const product of ready) {
      expect(product.externalUrl).toContain(`tag=${AMAZON_ASSOCIATE_TAG}`);
    }
  });

  test("runtime code does not use a fake example publisher ID", () => {
    for (const file of [
      "src/data/site.ts",
      "src/components/ads/AdSenseScript.tsx",
      "src/components/ads/AdSlot.tsx",
      "src/app/layout.tsx",
    ]) {
      expect(readSrc(file), file).not.toMatch(FAKE_PUBLISHER);
    }
  });
});
