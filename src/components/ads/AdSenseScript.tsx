import { analytics } from "@/data/site";

const ADSENSE_SCRIPT_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=";

export function AdSenseScript() {
  const client = analytics.adsenseClientId.trim();
  if (!client) return null;

  return (
    <>
      <meta name="google-adsense-account" content={client} />
      <script
        async
        src={`${ADSENSE_SCRIPT_SRC}${client}`}
        crossOrigin="anonymous"
      />
    </>
  );
}
