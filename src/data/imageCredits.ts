import { cropImages, getCropImage } from "@/data/cropImages";
import { crops } from "@/data/crops";
import {
  displayCreatorName,
  getCropCreditRecord,
  getPestCreditRecord,
  licenseUrlFor,
  type ImageCreditRecord,
} from "@/data/imageCreditRecords";
import { getPests } from "@/data/pests";

export const IMAGE_CREDITS_PATH = "/image-credits";
export const IMAGE_CREDITS_LABEL = "Image credits and licenses";

export type PublicImageCredit = {
  slug: string;
  name: string;
  creator?: string;
  sourceUrl?: string;
  /** Non-link credit/source text for generated site assets. */
  sourceLabel?: string;
  license: string;
  licenseUrl?: string;
};

function toPublicCredit(
  name: string,
  record: ImageCreditRecord | undefined,
): PublicImageCredit | undefined {
  if (!record) return undefined;
  const sourceUrl = record.commonsUrl.startsWith("https://") ? record.commonsUrl : undefined;
  return {
    slug: record.slug,
    name,
    creator: displayCreatorName(record.artist),
    sourceUrl,
    sourceLabel: !sourceUrl && record.sourceNote?.trim() ? record.sourceNote.trim() : undefined,
    license: record.license,
    licenseUrl: licenseUrlFor(record.license),
  };
}

export function getRuntimeCropImageCredits(): PublicImageCredit[] {
  return crops.flatMap((crop) => {
    const image = getCropImage(crop.slug);
    if (!image) return [];
    const credit = toPublicCredit(crop.name, getCropCreditRecord(crop.slug));
    return credit ? [credit] : [];
  });
}

export function getRuntimePestImageCredits(): PublicImageCredit[] {
  return getPests().flatMap((pest) => {
    const fileName = pest.image.src.replace("/images/pests/", "");
    const record = getPestCreditRecord(pest.slug);
    if (!record || record.file !== fileName) return [];
    const credit = toPublicCredit(pest.name, record);
    return credit ? [credit] : [];
  });
}

export function runtimeCropImageSrcs(): string[] {
  return Object.keys(cropImages).flatMap((slug) => {
    const image = getCropImage(slug);
    return image ? [image.src] : [];
  });
}
