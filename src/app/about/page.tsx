import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description: `About ${siteConfig.name}, a practical resource for raised bed and vegetable gardening.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/about", label: "About" }]} />
      <h1 className="font-serif text-3xl font-semibold">About {siteConfig.name}</h1>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          {siteConfig.name} is {siteConfig.tagline.toLowerCase()} It is a set of calculators and
          reference pages, not a personal gardening blog and not a magazine. The name is the point:
          tools for crops you pick and eat, not lawns or ornamentals first.
        </p>
        <p>
          The site focuses on raised beds, containers, and backyard vegetables: how much soil or
          potting mix to buy, how far apart to plant, and how to think about water without pretending
          one schedule fits every climate.
        </p>
        <p>
          We do not claim laboratory testing, professional certifications, or a physical garden center.
          Gardening advice here is general information for US homeowners. It is not a substitute for a
          soil test, a product label, or your county cooperative extension.
        </p>
      </div>
    </Container>
  );
}
