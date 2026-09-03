import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { cropImages, getCropImage } from "@/data/cropImages";
import { crops } from "@/data/crops";
import {
  GENERATED_SITE_ASSET_LICENSE,
  containsContactEmailText,
  cropCreditRecords,
  displayCreatorName,
  generatedCropCreditRecords,
  getCropCreditRecord,
  isGeneratedSiteAssetCredit,
  isReusableImageCredit,
} from "@/data/imageCreditRecords";
import {
  getRuntimeCropImageCredits,
  getRuntimePestImageCredits,
  IMAGE_CREDITS_LABEL,
  IMAGE_CREDITS_PATH,
} from "@/data/imageCredits";
import { getPests } from "@/data/pests";
import { getIndexablePagePaths } from "@/data/routes";

const root = process.cwd();

function readSrc(relativePath: string): string {
  return readFileSync(path.join(root, relativePath), "utf8");
}

function publicFileFromSrc(src: string): string {
  return path.join(root, "public", src.replace(/^\//, "").replaceAll("/", path.sep));
}

describe("crop photo discovery", () => {
  test("all 32 crop cards have valid image metadata and existing files", () => {
    expect(crops).toHaveLength(32);
    for (const crop of crops) {
      const image = getCropImage(crop.slug);
      expect(image, crop.slug).toBeDefined();
      if (!image) continue;
      expect(image.src.startsWith("/images/crops/")).toBe(true);
      expect(image.alt.trim().length).toBeGreaterThan(0);
      expect(existsSync(publicFileFromSrc(image.src)), image.src).toBe(true);
    }
  });

  test("Cucumbers uses the generated site asset with accurate alt text", () => {
    const image = getCropImage("cucumbers");
    expect(image).toBeDefined();
    expect(image?.src).toBe("/images/crops/cucumbers-generated.webp");
    expect(image?.alt).toBe("Green cucumber growing on the vine beside a yellow blossom");
    expect(existsSync(publicFileFromSrc("/images/crops/cucumbers-generated.webp"))).toBe(true);
    expect(image?.license).toBe(GENERATED_SITE_ASSET_LICENSE);
    expect(image?.commonsUrl).toBe("");
  });

  test("every rendered crop image has a corresponding reusable credit record", () => {
    for (const crop of crops) {
      const image = getCropImage(crop.slug);
      if (!image) continue;
      const credit = getCropCreditRecord(crop.slug);
      expect(credit, crop.slug).toBeDefined();
      if (!credit) continue;
      expect(credit.file).toBe(image.src.replace("/images/crops/", ""));
      expect(isReusableImageCredit(credit), crop.slug).toBe(true);
    }
  });

  test("all 32 crop names and detail links remain present", () => {
    expect(crops).toHaveLength(32);
    const hub = readSrc("src/app/vegetable-gardening/page.tsx");
    for (const crop of crops) {
      expect(crop.name.trim().length).toBeGreaterThan(0);
      expect(hub).toContain("`/vegetable-gardening/${crop.slug}`");
    }
    expect(hub).toContain("{crop.name}");
    expect(hub).toContain("{crop.description}");
  });

  test("runtime mapping does not use rejected cucumber candidates", () => {
    expect(Object.values(cropImages).some((image) => image.src.includes("cucumbers-ko.jpg"))).toBe(
      false,
    );
    expect(Object.values(cropImages).some((image) => image.src.endsWith("/cucumbers.jpg"))).toBe(
      false,
    );
    expect(cropCreditRecords.some((record) => record.file === "cucumbers-ko.jpg")).toBe(false);
    expect(cropCreditRecords.some((record) => record.file === "cucumbers.jpg")).toBe(false);
    expect(existsSync(publicFileFromSrc("/images/crops/cucumbers.jpg"))).toBe(false);
    expect(existsSync(publicFileFromSrc("/images/crops/cucumbers-ko.jpg"))).toBe(false);
  });
});

describe("image credits page", () => {
  test("generated cucumber credit is truthful and not a fake external license", () => {
    const cucumber = getRuntimeCropImageCredits().find((item) => item.slug === "cucumbers");
    expect(cucumber).toBeDefined();
    expect(cucumber?.creator).toBe("OpenAI image generation for HarvestBench");
    expect(cucumber?.sourceLabel).toBe("Generated specifically for HarvestBench");
    expect(cucumber?.sourceUrl).toBeUndefined();
    expect(cucumber?.license).toBe(GENERATED_SITE_ASSET_LICENSE);
    expect(cucumber?.licenseUrl).toBeUndefined();

    const record = getCropCreditRecord("cucumbers");
    expect(record).toBeDefined();
    if (!record) return;
    expect(isGeneratedSiteAssetCredit(record)).toBe(true);
    expect(record.commonsUrl).toBe("");
    expect(generatedCropCreditRecords.some((entry) => entry.slug === "cucumbers")).toBe(true);
    expect(cropCreditRecords.some((entry) => entry.slug === "cucumbers")).toBe(false);

    const creditsPage = readSrc("src/app/image-credits/page.tsx");
    expect(creditsPage).toContain("sourceLabel");
    expect(creditsPage).toContain("Source: {item.sourceLabel}");
  });

  test("displayed credits do not include contact-email text", () => {
    const displayed = [...getRuntimeCropImageCredits(), ...getRuntimePestImageCredits()];
    expect(displayed.length).toBeGreaterThan(0);
    for (const item of displayed) {
      const blob = [
        item.name,
        item.creator ?? "",
        item.sourceUrl ?? "",
        item.sourceLabel ?? "",
        item.license,
        item.licenseUrl ?? "",
      ].join(" ");
      expect(containsContactEmailText(blob), item.slug).toBe(false);
    }

    const tomatoesArtist = getCropCreditRecord("tomatoes")?.artist ?? "";
    expect(containsContactEmailText(tomatoesArtist)).toBe(true);
    expect(containsContactEmailText(displayCreatorName(tomatoesArtist) ?? "")).toBe(false);
  });

  test("/image-credits is noindex follow and excluded from the sitemap", () => {
    const page = readSrc("src/app/image-credits/page.tsx");
    expect(page).toContain("title: \"Image Credits and Licenses\"");
    expect(page).toContain("index: false");
    expect(page).toContain("follow: true");
    expect(page).not.toContain("Article");
    expect(page).not.toContain("FAQPage");
    expect(getIndexablePagePaths()).not.toContain(IMAGE_CREDITS_PATH);
  });

  test("crop and pest hubs link to image credits", () => {
    const cropHub = readSrc("src/app/vegetable-gardening/page.tsx");
    const pestHub = readSrc("src/app/pest-problems/page.tsx");
    expect(cropHub).toContain("IMAGE_CREDITS_PATH");
    expect(cropHub).toContain("IMAGE_CREDITS_LABEL");
    expect(cropHub).not.toContain("Wikimedia Commons");
    expect(pestHub).toContain("IMAGE_CREDITS_PATH");
    expect(pestHub).toContain("IMAGE_CREDITS_LABEL");
    expect(IMAGE_CREDITS_PATH).toBe("/image-credits");
    expect(IMAGE_CREDITS_LABEL).toBe("Image credits and licenses");
  });

  test("pest image mappings remain unchanged", () => {
    const pests = getPests();
    expect(pests).toHaveLength(41);
    for (const pest of pests) {
      expect(pest.image.src).toBe(`/images/pests/${pest.slug}.jpg`);
      expect(existsSync(publicFileFromSrc(pest.image.src)), pest.slug).toBe(true);
    }
    expect(getRuntimePestImageCredits()).toHaveLength(41);
  });

  test("AdSense remains inactive in source", () => {
    const adsense = readSrc("src/components/ads/AdSenseScript.tsx");
    expect(adsense).not.toMatch(/ca-pub-/);
    expect(readSrc("src/data/affiliates.ts")).not.toMatch(/amzn\.to/i);
    expect(readSrc("src/data/site.ts")).toContain(
      'process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-9237217026636557"',
    );
  });
});
