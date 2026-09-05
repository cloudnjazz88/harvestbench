import {
  canonicalizeProductionUrl,
} from "../src/lib/canonical-host.ts";

export async function onRequest(context) {
  const canonical = canonicalizeProductionUrl(new URL(context.request.url));
  if (canonical) {
    return Response.redirect(canonical.href, 301);
  }

  return context.next();
}
