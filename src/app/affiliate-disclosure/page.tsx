import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description: `${siteConfig.name} does not currently display affiliate links.`,
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/affiliate-disclosure", label: "Affiliate disclosure" }]} />
      <h1 className="font-serif text-3xl font-semibold">Affiliate disclosure</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          {siteConfig.name} does not currently display affiliate links or paid relationships with
          Amazon, Home Depot, Lowe’s, or other retailers.
        </p>
        <p>
          Buying guides on this site explain how to choose a product category. They are not ranked
          brand lists, and they do not include retailer checkout links.
        </p>
      </div>
    </Container>
  );
}
