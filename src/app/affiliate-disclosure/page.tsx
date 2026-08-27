import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description: `How ${siteConfig.name} will handle affiliate links if and when they exist.`,
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/affiliate-disclosure", label: "Affiliate disclosure" }]} />
      <h1 className="font-serif text-3xl font-semibold">Affiliate disclosure</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          {siteConfig.name} does not currently have active affiliate relationships with Amazon, Home
          Depot, Lowe’s, or other retailers. Product cards on this site are placeholders until real
          URLs and independently researched products are added.
        </p>
        <p>
          If affiliate links are added later, this page will remain the disclosure: some links may be
          affiliate links, and a purchase through those links may earn a commission at no additional
          cost to you. We will not label ordinary links as affiliate links before that is true.
        </p>
        <p>
          Product pages will not invent prices, star ratings, awards, or “we tested this” claims.
          When a live retailer URL is added to a product record, the product component can mark it as
          an affiliate link using a single data field.
        </p>
      </div>
    </Container>
  );
}
