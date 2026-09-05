export const PRODUCTION_APEX_HOST = "harvestbench.com";
export const PRODUCTION_WWW_HOST = "www.harvestbench.com";

/**
 * Redirect only the production www host to the HTTPS apex.
 * Does not inspect x-forwarded-proto. Local, preview, and apex hosts are unchanged.
 */
export function canonicalizeProductionUrl(url: URL): URL | null {
  if (url.hostname !== PRODUCTION_WWW_HOST) {
    return null;
  }

  const next = new URL(url.href);
  next.hostname = PRODUCTION_APEX_HOST;
  next.protocol = "https:";
  return next;
}
