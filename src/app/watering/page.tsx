import { CardLink, PublicCardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Garden Watering",
  description:
    "How to water raised beds and vegetable gardens using soil moisture, crop type, and weather — not a weekly gallon chart.",
  path: "/watering",
});

export default function WateringPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/watering", label: "Watering" }]} />
      <SectionHeading
        title="Watering"
        description="Raised beds lose water faster than in-ground gardens. How often you water still depends on the plant, humidity, wind, mulch, and soil mix — so this site does not pretend a calculator can prescribe gallons."
      />
      <p className="mb-8 max-w-3xl leading-7 text-muted">
        Check two inches down with a finger. If it is dry there, water deeply. If it is still cool and
        damp, wait. That method tracks reality better than a weekly inch target or a gallon-per-bed
        formula.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/how-often-to-water-raised-beds"
          kicker="Guide"
          title="How often to water raised beds"
          description="Finger test, crop differences, and why daily watering is the wrong default."
        />
        <CardLink
          href="/container-gardening"
          title="Pots and grow bags"
          description="Fabric and terracotta dry faster than plastic. Check two inches down, not a gallon chart."
        />
        <CardLink
          href="/calculators/mulch"
          title="Mulch calculator"
          description="Two inches of mulch is a watering tool, not decoration."
        />
        <PublicCardLink
          href="/guides/best-drip-irrigation"
          kicker="Buying guide"
          title="Drip irrigation for raised beds"
          description="Tubing, emitters, kits, and timers — still check soil, do not chase gallons."
        />
        <PublicCardLink
          href="/guides/best-soaker-hose"
          title="Soaker hose buying guide"
          description="Length, pressure, and layout for rectangular beds."
        />
        <PublicCardLink
          href="/guides/best-garden-hose"
          title="Garden hose buying guide"
          description="Diameter, fittings, and drinking-water labels."
        />
        <CardLink
          href="/vegetable-gardening"
          title="Crop watering notes"
          description="Each crop page has water notes for that plant, not a shared gallon number."
        />
        <CardLink
          href="/calculators/raised-bed-soil"
          title="Raised bed soil calculator"
          description="Deeper soil holds moisture longer than a shallow frame."
        />
      </div>
    </Container>
  );
}
