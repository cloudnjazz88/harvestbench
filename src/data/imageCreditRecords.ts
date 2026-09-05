import cropCreditJson from "../../public/images/crops/_credits.json";
import pestCreditJson from "../../public/images/pests/_credits.json";

export type ImageCreditRecord = {
  slug: string;
  file: string;
  artist: string;
  license: string;
  /** External source URL for reusable third-party images. Empty for generated site assets. */
  commonsUrl: string;
  /** Non-URL credit/source note used for generated site assets. */
  sourceNote?: string;
};

/** License/status label for HarvestBench-generated site assets. */
export const GENERATED_SITE_ASSET_LICENSE = "AI-generated site asset";

/**
 * Local credit records for AI-generated site assets.
 * Kept out of `_credits.json` so they are not mistaken for Wikimedia/external sources.
 */
export const generatedCropCreditRecords: ImageCreditRecord[] = [
  {
    slug: "cucumbers",
    file: "cucumbers-generated.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "Generated specifically for HarvestBench",
  },
];

/** Homepage and other non-crop/pest generated visuals. Not listed on /image-credits. */
export const generatedSiteVisualRecords: ImageCreditRecord[] = [
  {
    slug: "homepage-hero",
    file: "harvestbench-editorial-workbench.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for the HarvestBench homepage hero",
  },
  {
    slug: "home-planning-raised-bed",
    file: "home/planning-raised-bed.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-planning-seedling",
    file: "home/planning-seedling.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-planning-leaf",
    file: "home/planning-leaf.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-calculator-soil",
    file: "home/calculator-soil.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-calculator-fertilizer",
    file: "home/calculator-fertilizer.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-calculator-spacing",
    file: "home/calculator-spacing.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-guide-raised-bed-soil",
    file: "home/guide-raised-bed-soil.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-guide-tomatoes",
    file: "home/guide-tomatoes.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
  {
    slug: "home-guide-seedlings",
    file: "home/guide-seedlings.webp",
    artist: "OpenAI image generation for HarvestBench",
    license: GENERATED_SITE_ASSET_LICENSE,
    commonsUrl: "",
    sourceNote: "AI-generated original visual for HarvestBench homepage cards",
  },
];

function emailPattern(): RegExp {
  return /\S+@\S+\.\S+|\S+\s*\[\s*at\s*\]\s*\S+(?:\.\S+)?|\S+\s*\(\s*at\s*\)\s*\S+(?:\.\S+)?/gi;
}

const LICENSE_URLS: Record<string, string> = {
  "gfdl 1.2": "https://www.gnu.org/licenses/old-licenses/fdl-1.2.html",
  "cc by 2.0": "https://creativecommons.org/licenses/by/2.0/",
  "cc by 2.5": "https://creativecommons.org/licenses/by/2.5/",
  "cc by 3.0": "https://creativecommons.org/licenses/by/3.0/",
  "cc by 3.0 us": "https://creativecommons.org/licenses/by/3.0/us/",
  "cc by 4.0": "https://creativecommons.org/licenses/by/4.0/",
  "cc by-sa 2.0": "https://creativecommons.org/licenses/by-sa/2.0/",
  "cc by-sa 2.5": "https://creativecommons.org/licenses/by-sa/2.5/",
  "cc by-sa 3.0": "https://creativecommons.org/licenses/by-sa/3.0/",
  "cc by-sa 4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  cc0: "https://creativecommons.org/publicdomain/zero/1.0/",
};

function asRecords(value: unknown): ImageCreditRecord[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is ImageCreditRecord => {
    if (!item || typeof item !== "object") return false;
    const record = item as ImageCreditRecord;
    return (
      typeof record.slug === "string" &&
      typeof record.file === "string" &&
      typeof record.artist === "string" &&
      typeof record.license === "string" &&
      typeof record.commonsUrl === "string"
    );
  });
}

export const cropCreditRecords = asRecords(cropCreditJson);
export const pestCreditRecords = asRecords(pestCreditJson);

export function getCropCreditRecord(slug: string): ImageCreditRecord | undefined {
  return (
    cropCreditRecords.find((record) => record.slug === slug) ??
    generatedCropCreditRecords.find((record) => record.slug === slug)
  );
}

export function isGeneratedSiteAssetCredit(record: ImageCreditRecord): boolean {
  return record.license.trim() === GENERATED_SITE_ASSET_LICENSE;
}

export function getPestCreditRecord(slug: string): ImageCreditRecord | undefined {
  return pestCreditRecords.find((record) => record.slug === slug);
}

export function isReusableLicense(license: string): boolean {
  const value = license.trim().toLowerCase();
  if (!value || value.includes("all rights reserved")) return false;
  if (value === "public domain" || value === "cc0") return true;
  if (value.startsWith("cc by") || value.startsWith("gfdl")) return true;
  return false;
}

export function hasHttpsSource(url: string): boolean {
  return url.startsWith("https://");
}

export function isReusableImageCredit(record: ImageCreditRecord): boolean {
  if (isGeneratedSiteAssetCredit(record)) {
    return (
      Boolean(record.file.trim()) &&
      Boolean(record.artist.trim()) &&
      Boolean(record.sourceNote?.trim()) &&
      !hasHttpsSource(record.commonsUrl)
    );
  }
  return (
    Boolean(record.file.trim()) &&
    isReusableLicense(record.license) &&
    hasHttpsSource(record.commonsUrl)
  );
}

/** Presentation-only: strip contact-email text from a recorded creator string. */
export function displayCreatorName(artist: string): string | undefined {
  const pattern = emailPattern();
  const emailMatch = pattern.exec(artist);
  const beforeEmail = emailMatch?.index != null ? artist.slice(0, emailMatch.index) : artist;
  const cleaned = beforeEmail
    .replace(emailPattern(), "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/[,;|/]+$/g, "")
    .trim();
  return cleaned || undefined;
}

export function containsContactEmailText(value: string): boolean {
  return emailPattern().test(value);
}

export function licenseUrlFor(license: string): string | undefined {
  return LICENSE_URLS[license.trim().toLowerCase()];
}
