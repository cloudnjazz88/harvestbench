/** Required Amazon Associates sentence. Render only when Amazon links are live. */
export const AMAZON_ASSOCIATE_DISCLOSURE =
  "As an Amazon Associate I earn from qualifying purchases.";

/**
 * Flip to true only after HarvestBench displays live Amazon Special Links.
 * Do not enable while this site has no Amazon affiliate URLs.
 */
export const amazonAssociatesEnabled = false;

export function getAmazonAssociateDisclosure(
  enabled = amazonAssociatesEnabled,
): string | null {
  return enabled ? AMAZON_ASSOCIATE_DISCLOSURE : null;
}
