import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import {
  getRuntimeCropImageCredits,
  getRuntimePestImageCredits,
  type PublicImageCredit,
} from "@/data/imageCredits";
import { pageMetadata } from "@/lib/seo";

const description =
  "Attribution and licenses for crop and pest photographs used on HarvestBench.";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Image Credits and Licenses",
    description,
    path: "/image-credits",
    indexable: false,
  }),
  robots: { index: false, follow: true },
};

function ExternalCreditLink({ href, children }: { href: string; children: string }) {
  if (!href.startsWith("https://")) {
    return <span>{children}</span>;
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-accent underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

function CreditList({ items }: { items: PublicImageCredit[] }) {
  return (
    <ul className="mt-4 divide-y divide-border">
      {items.map((item) => (
        <li key={item.slug} className="min-w-0 py-4 text-sm leading-6">
          <p className="font-medium text-foreground">{item.name}</p>
          {item.creator ? <p className="text-muted">Creator: {item.creator}</p> : null}
          {item.sourceUrl ? (
            <p className="break-all text-muted">
              Source: <ExternalCreditLink href={item.sourceUrl}>{item.sourceUrl}</ExternalCreditLink>
            </p>
          ) : item.sourceLabel ? (
            <p className="text-muted">Source: {item.sourceLabel}</p>
          ) : null}
          <p className="text-muted">
            License:{" "}
            {item.licenseUrl ? (
              <ExternalCreditLink href={item.licenseUrl}>{item.license}</ExternalCreditLink>
            ) : (
              item.license
            )}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function ImageCreditsPage() {
  const cropCredits = getRuntimeCropImageCredits();
  const pestCredits = getRuntimePestImageCredits();

  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/image-credits", label: "Image credits" }]} />
      <h1 className="font-serif text-3xl font-semibold">Image Credits and Licenses</h1>
      <p className="mt-4 leading-7 text-muted">
        Photographs on crop and pest pages come from more than one source and license. This page lists
        the images used on those public pages, with the creator, source, and license recorded for each
        file. It is provided for attribution, not as a catalog of every image on the web.
      </p>

      <h2 className="mt-10 font-serif text-2xl font-semibold text-foreground">Crop images</h2>
      <CreditList items={cropCredits} />

      <h2 className="mt-10 font-serif text-2xl font-semibold text-foreground">
        Pest and plant-problem images
      </h2>
      <CreditList items={pestCredits} />
    </Container>
  );
}
