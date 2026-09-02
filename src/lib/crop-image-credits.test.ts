import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { amazonAssociatesEnabled } from "@/data/affiliates";
import { cropImages, getCropImage } from "@/data/cropImages";
import { crops } from "@/data/crops";
import {
  containsContactEmailText,
  cropCreditRecords,
  displayCreatorName,
  getCropCreditRecord,
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
  test("every rendered crop image maps to an existing local JPG", () => {
    const rendered = crops
      .map((crop) => getCropImage(crop.slug))
      .filter((image): image is NonNullable<typeof image> => Boolean(image));

    expect(rendered.length).toBeGreaterThan(0);
    for (const image of rendered) {
      expect(image.src.startsWith("/images/crops/")).toBe(true);
      expect(image.src.endsWith(".jpg")).toBe(true);
      expect(existsSync(publicFileFromSrc(image.src)), image.src).toBe(true);
    }
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

  test("runtime mapping does not use cucumbers-ko.jpg", () => {
    expect(Object.values(cropImages).some((image) => image.src.includes("cucumbers-ko.jpg"))).toBe(
      false,
    );
    expect(getCropImage("cucumbers")).toBeUndefined();
    expect(cropCreditRecords.some((record) => record.file === "cucumbers-ko.jpg")).toBe(false);
  });

  test("cucumber remains a named, linked text card without an image", () => {
    const cucumber = crops.find((crop) => crop.slug === "cucumbers");
    expect(cucumber?.name).toBe("Cucumbers");
    expect(getCropImage("cucumbers")).toBeUndefined();
  });
});

describe("image credits page", () => {
  test("displayed credits do not include contact-email text", () => {
    const displayed = [...getRuntimeCropImageCredits(), ...getRuntimePestImageCredits()];
    expect(displayed.length).toBeGreaterThan(0);
    for (const item of displayed) {
      const blob = [item.name, item.creator ?? "", item.sourceUrl ?? "", item.license, item.licenseUrl ?? ""].join(
        " ",
      );
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

  test("Amazon and AdSense remain inactive in source", () => {
    expect(amazonAssociatesEnabled).toBe(false);
    const affiliates = readSrc("src/data/affiliates.ts");
    const adsense = readSrc("src/components/ads/AdSenseScript.tsx");
    expect(affiliates).not.toMatch(/amazon\.com|amzn\.to/i);
    expect(adsense).not.toMatch(/ca-pub-/);
    expect(readSrc("src/data/site.ts")).toContain(
      'adsenseClientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ""',
    );
  });
});
