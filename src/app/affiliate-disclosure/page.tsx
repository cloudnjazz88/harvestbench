import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { getAmazonAssociateDisclosure } from "@/data/affiliates";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description: `How ${siteConfig.name} handles affiliate links and commissions.`,
  path: "/affiliate-disclosure",
});

export default function AffiliateDisclosurePage() {
  const amazonDisclosure = getAmazonAssociateDisclosure();

  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/affiliate-disclosure", label: "Affiliate disclosure" }]} />
      <h1 className="font-serif text-3xl font-semibold">Affiliate disclosure</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          Some links on {siteConfig.name} may be affiliate links. If you purchase through those
          links, {siteConfig.name} may earn a commission at no additional cost to you.
        </p>
        <p>
          Affiliate relationships do not determine this site’s editorial conclusions. Buying guides
          explain how to choose a product category. They are not ranked brand lists.
        </p>
        <p>
          {siteConfig.name} does not currently display Amazon Special Links or other paid retailer
          checkout links. Product availability and retailer details can change; confirm them with
          the retailer before you buy.
        </p>
        {amazonDisclosure ? <p>{amazonDisclosure}</p> : null}
      </div>
    </Container>
  );
}
