/** Required Amazon Associates sentence. Render only when Amazon links are live. */
export const AMAZON_ASSOCIATE_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";

/** Concise nearby disclosure for pages that show Amazon Special Links. */
export const AFFILIATE_LINKS_NOTE =
  "Affiliate links: HarvestBench may earn a commission at no extra cost to you.";

export const AMAZON_ASSOCIATE_TAG = "harvestbench-20";

export const AMAZON_PRODUCT_URL_PREFIX = "https://www.amazon.com/dp/";

export const AMAZON_PRICE_BUTTON_LABEL = "Check price and availability on Amazon";

export const AMAZON_AFFILIATE_REL = "sponsored nofollow noopener noreferrer";

/**
 * Flip to true only after HarvestBench displays live Amazon Special Links.
 * Do not enable while this site has no Amazon affiliate URLs.
 */
export const amazonAssociatesEnabled = true;

export function getAmazonAssociateDisclosure(
  enabled = amazonAssociatesEnabled,
): string | null {
  return enabled ? AMAZON_ASSOCIATE_DISCLOSURE : null;
}

export function amazonProductUrl(asin: string): string {
  return `${AMAZON_PRODUCT_URL_PREFIX}${asin}?tag=${AMAZON_ASSOCIATE_TAG}`;
}

export function amazonAffiliateRel(affiliate: boolean): string {
  return affiliate ? AMAZON_AFFILIATE_REL : "noopener noreferrer";
}
