import type { Metadata } from "next";
import { getSiteUrl, siteConfig } from "@/data/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
}: PageSeo): Metadata {
  const url = `${getSiteUrl()}${path}`;
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: path },
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
