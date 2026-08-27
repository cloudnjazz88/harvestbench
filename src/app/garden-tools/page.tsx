import { CardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Garden Tools",
  description:
    "What to look for in pruners, trellises, garden carts, hoses, drip kits, and raised bed frames — without fake product reviews.",
  path: "/garden-tools",
});

export default function GardenToolsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/garden-tools", label: "Garden Tools" }]} />
      <SectionHeading
        title="Garden tools"
        description="Buying criteria for pruners, trellises, carts, hoses, and frames that show up in a raised-bed vegetable garden. Retailer links are not live yet."
      />

      <h2 className="mt-2 font-serif text-2xl font-semibold">Cutting & support</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/best-pruning-shears"
          title="Pruning shears"
          description="Bypass blades for tomato suckers, peppers, and herbs."
        />
        <CardLink
          href="/guides/best-garden-trellis"
          title="Garden trellis"
          description="Height and anchoring for cucumbers and indeterminate tomatoes."
        />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Hauling & watering</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/best-garden-cart"
          title="Garden cart"
          description="Capacity, wheels, and dump angle for soil, compost, and mulch."
        />
        <CardLink
          href="/guides/best-garden-hose"
          title="Garden hose"
          description="Length, 5/8-inch diameter, and fittings that do not leak."
        />
        <CardLink
          href="/guides/best-drip-irrigation"
          title="Drip irrigation"
          description="Kits, emitters, pressure, and timers for raised beds."
        />
        <CardLink
          href="/guides/best-soaker-hose"
          title="Soaker hose"
          description="Low pressure and layout under mulch."
        />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Beds & soil gear</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/best-raised-garden-beds"
          title="Raised garden beds"
          description="Width, depth, and materials that survive a soil fill."
        />
        <CardLink
          href="/guides/best-raised-bed-soil"
          title="Raised bed soil"
          description="How to read a bag and question a bulk pile."
        />
      </div>

      <p className="mt-8 text-sm text-muted">
        Named products, prices, and ratings will only appear after independent research. This site does not invent
        reviews.
      </p>
    </Container>
  );
}
