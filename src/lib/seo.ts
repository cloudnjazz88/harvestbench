import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/data/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  indexable?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  indexable = true,
}: PageSeo): Metadata {
  const url = `${getSiteUrl()}${path}`;
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized}`;
}

export const EDITORIAL_TEAM = "HarvestBench Editorial Team";

/** Accepts stored YYYY-MM-DD only. Does not use the current date. */
export function storedGuideDate(updated?: string): string | null {
  const value = updated?.trim() ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() + 1 !== month ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }
  return value;
}

export function formatStoredGuideDate(updated?: string): string | null {
  const iso = storedGuideDate(updated);
  if (!iso) return null;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${iso}T00:00:00Z`));
}

export function guideEditorialByline(updated?: string): string {
  const formatted = formatStoredGuideDate(updated);
  return formatted ? `${EDITORIAL_TEAM} · Updated ${formatted}` : EDITORIAL_TEAM;
}

export function buildGuideArticleJsonLd(
  guide: { title: string; description: string; updated?: string },
  path: string,
  indexable: boolean,
): Record<string, unknown> | null {
  if (!indexable) return null;

  const dateModified = storedGuideDate(guide.updated);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description,
    url: absoluteUrl(path),
    author: {
      "@type": "Organization",
      name: EDITORIAL_TEAM,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    ...(dateModified ? { dateModified } : {}),
  };
}
