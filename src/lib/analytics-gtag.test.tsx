import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { analytics } from "@/data/site";

const root = process.cwd();

function readSrc(relativePath: string): string {
  return readFileSync(path.join(root, relativePath), "utf8");
}

describe("GA4 analytics snippet", () => {
  const source = readSrc("src/components/seo/Analytics.tsx");
  const layout = readSrc("src/app/layout.tsx");
  const adsense = readSrc("src/components/ads/AdSenseScript.tsx");

  test("keeps the classic gtag config in initial HTML without hardcoding the ID", () => {
    expect(source).toContain("analytics.gaMeasurementId");
    expect(source).toContain("googletagmanager.com/gtag/js?id=");
    expect(source).toContain('id="ga4"');
    expect(source).toContain("gtag('config', '${id}')");
    expect(source).toContain("<script");
    expect(source).not.toContain('from "next/script"');
    expect(source).not.toMatch(/G-[A-Z0-9]{6,}/);
    expect(source).not.toContain("typeof window");
    expect(source).not.toContain("suppressHydrationWarning");
    expect(analytics.gaMeasurementId === "" || analytics.gaMeasurementId.startsWith("G-")).toBe(
      true,
    );
  });

  test("stays in the document head and does not alter AdSense", () => {
    expect(layout).toMatch(/<body[\s\S]*<Analytics \/>/);
    expect(layout).not.toMatch(/<head>[\s\S]*<Analytics \/>[\s\S]*<\/head>/);
    expect(layout).toMatch(/<head>[\s\S]*<AdSenseScript \/>[\s\S]*<\/head>/);
    expect(adsense).toContain("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=");
    expect(adsense).toContain('name="google-adsense-account"');
    expect(adsense).toContain("crossOrigin=\"anonymous\"");
  });
});
