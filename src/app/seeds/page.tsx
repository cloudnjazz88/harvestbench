import Link from "next/link";
import { CardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Seeds & Seed Starting",
  description:
    "Seed starting, germination, and transplanting for backyard vegetable gardens and raised beds.",
  path: "/seeds",
});

export default function SeedsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/seeds", label: "Seeds & Seed Starting" }]} />
      <SectionHeading
        title="Seeds & seed starting"
        description="Start indoors when the season is short, harden off before planting out, and match timing to frost dates — not the picture on the seed packet alone."
      />
      <p className="mb-8 max-w-3xl leading-7 text-muted">
        Fruiting crops like tomatoes and peppers usually need an indoor head start. Beans and peas often do better
        sown outdoors. Use a light seed mix, not garden soil, and real light so seedlings stay stocky. After that, the{" "}
        <Link href="/calculators/plant-spacing" className="font-medium text-accent hover:underline">
          plant spacing calculator
        </Link>{" "}
        keeps the bed from overcrowding on transplant day.
      </p>

      <h2 className="font-serif text-2xl font-semibold">Guides</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/how-to-start-vegetable-seeds-indoors"
          title="How to start vegetable seeds indoors"
          description="Timing, mix, light, warmth, and potting up for tomatoes, peppers, and more."
        />
        <CardLink
          href="/guides/when-to-transplant-seedlings"
          title="When to transplant seedlings"
          description="Hardening off, frost dates, and soil temperature before plants go outside."
        />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Related</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/calculators/plant-spacing"
          title="Plant spacing calculator"
          description="How many transplants fit in a bed once they leave the tray."
        />
        <CardLink
          href="/guides/how-to-prepare-a-raised-bed"
          title="Prepare a raised bed"
          description="Have the bed ready before seedlings harden off."
        />
        <CardLink
          href="/vegetable-gardening/tomatoes"
          title="Growing tomatoes"
          description="The crop that drives most indoor seed-starting calendars."
        />
        <CardLink
          href="/container-gardening"
          title="Container gardening"
          description="If transplants are going into pots, match gallon size to the crop."
        />
      </div>
    </Container>
  );
}
