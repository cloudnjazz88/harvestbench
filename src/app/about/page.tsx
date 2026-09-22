import Link from "next/link";
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
          HarvestBench is an independently operated gardening website for people growing food in
          raised beds, containers, and backyard plots in the United States. HarvestBench is the
          publishing name used for the site’s calculators and guides.
        </p>
        <h2 className="font-serif text-2xl font-semibold text-foreground">What you can do here</h2>
        <p>
          Work out how much soil to order, compare planting layouts, and find the next step when a
          vegetable stops growing well. The calculators turn your measurements into quantities;
          the guides explain the assumptions and the situations where those quantities need adjusting.
        </p>
        <h2 className="font-serif text-2xl font-semibold text-foreground">Who is responsible for the content?</h2>
        <p>
          Content is published under HarvestBench. An editorial byline identifies the site as the
          publisher; it does not mean that a university, horticulturist, or independent testing
          laboratory has reviewed the page. Questions and corrections can be sent through our
          <Link href="/contact" className="text-accent underline"> contact page</Link>.
        </p>
        <h2 className="font-serif text-2xl font-semibold text-foreground">How to use the advice</h2>
        <p>
          A bed in a hot, dry climate behaves differently from one in a cool, wet spring. Use the
          crop, weather, soil conditions, and product instructions alongside our estimates.
          A soil test and local cooperative extension can help with decisions a general guide
          cannot settle. Product comparisons based on specifications are not hands-on trials.
        </p>
        <p>
          Read our <Link href="/methodology" className="text-accent underline">calculation and editorial methodology</Link>
          {" "}for worked examples, evidence standards, and corrections. Some buying guides contain
          affiliate links, identified on the page and explained in our
          <Link href="/affiliate-disclosure" className="text-accent underline"> affiliate disclosure</Link>.
        </p>
      </div>
    </Container>
  );
}
