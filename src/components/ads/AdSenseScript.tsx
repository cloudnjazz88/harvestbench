import Script from "next/script";
import { analytics } from "@/data/site";

export function AdSenseScript() {
  const client = analytics.adsenseClientId.trim();
  if (!client) return null;

  return (
    <Script
      id="adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
