"use client";

import { useEffect } from "react";
import { analytics } from "@/data/site";

export type AdPosition = "top" | "in-content" | "sidebar" | "bottom";

const slotEnv: Record<AdPosition, string | undefined> = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  "in-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({
  position,
  className = "",
}: {
  position: AdPosition;
  className?: string;
}) {
  const client = analytics.adsenseClientId.trim();
  const slot = (slotEnv[position] || "").trim();

  useEffect(() => {
    if (!client || !slot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense may throw if the script is blocked.
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <aside
      aria-label="Advertisement"
      className={`overflow-hidden ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
