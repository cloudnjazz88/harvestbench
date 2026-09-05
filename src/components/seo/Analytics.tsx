import { analytics } from "@/data/site";

/**
 * Emits the classic gtag snippet in initial HTML.
 * next/script queues via __next_s, which Google's "Test installation"
 * often fails to detect on static export.
 *
 * Keep these as raw <script> tags. Render them from the root layout body,
 * not <head>: raw head siblings were hydrated onto AdSense's injected
 * pagead2.../managed/js/adsense/... node (client id="ga4" vs that tag).
 */
export function Analytics() {
  const id = analytics.gaMeasurementId.trim();
  if (!id) return null;

  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
      <script
        id="ga4"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`,
        }}
      />
    </>
  );
}
