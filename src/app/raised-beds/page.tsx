import Link from "next/link";
import { CardLink, PublicCardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Raised Bed Gardening",
  description:
    "Practical raised bed guides and calculators: soil depth, fill volume, mixes, watering, and planting.",
  path: "/raised-beds",
});

export default function RaisedBedsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/raised-beds", label: "Raised Beds" }]} />
      <SectionHeading
        title="Raised bed gardening"
        description="A raised bed is a framed volume of soil you can improve, drain, and reach. Use the tools below to size soil and plants before you buy lumber or mix."
      />
      <p className="mb-8 max-w-3xl leading-7 text-muted">
        Most backyard vegetable frames work at 10–12 inches of actual soil, 3–4 feet wide so you never step in the bed.
        Soil usually costs more than the box. Start with the{" "}
        <Link href="/calculators/raised-bed-soil" className="font-medium text-accent hover:underline">
          raised bed soil calculator
        </Link>
        , then read depth and mix notes if you are still choosing a design.
      </p>

      <h2 className="font-serif text-2xl font-semibold">Recommended calculators</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink href="/calculators/raised-bed-soil" title="Raised bed soil" description="Cubic feet, yards, and bags for one or more beds." />
        <CardLink href="/calculators/plant-spacing" title="Plant spacing" description="How many plants fit in a 4×8 or other rectangle." />
        <CardLink href="/calculators/mulch" title="Mulch" description="Coverage depth for straw, chips, or leaves on the bed surface." />
        <CardLink href="/calculators/compost" title="Compost" description="Top-dress volume after the first season." />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Beginner guides</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink href="/guides/how-to-prepare-a-raised-bed" title="How to prepare a raised bed" description="Site, fill, settle, skip the rock layer." />
        <CardLink href="/guides/raised-bed-vs-in-ground-garden" title="Raised bed vs in-ground" description="Cost, watering, and when each layout wins." />
        <PublicCardLink href="/guides/best-raised-garden-beds" title="Choosing a frame" description="Width, height, and materials — not a ranked kit list." />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Soil guides</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink href="/guides/hugelkultur-in-raised-beds" title="Hugelkultur in raised beds" description="Twigs and leaves in a 12-inch bed, or a thicker woody layer in a tall frame." />
        <CardLink href="/guides/how-deep-should-a-raised-bed-be" title="How deep should a raised bed be?" description="Crop-by-crop soil depth, not board marketing height." />
        <CardLink href="/guides/how-much-soil-does-a-raised-bed-need" title="How much soil does a raised bed need?" description="Worked volumes for common US sizes." />
        <CardLink href="/guides/best-soil-mix-for-raised-beds" title="Best soil mix" description="Compost plus mineral soil, matched to climate." />
        <PublicCardLink href="/guides/best-raised-bed-soil" title="Buying raised bed soil" description="Label and bulk-delivery criteria." />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Watering & planting</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink href="/guides/how-often-to-water-raised-beds" title="How often to water" description="Finger test, crop type, and humidity — not a gallon chart." />
        <PublicCardLink href="/guides/best-drip-irrigation" title="Drip irrigation" description="Emitters, kits, and timers for rectangular beds." />
        <CardLink href="/guides/how-far-apart-to-plant-tomatoes" title="Tomato spacing" description="Determinate vs indeterminate in a 4-foot bed." />
        <CardLink href="/guides/how-far-apart-to-plant-peppers" title="Pepper spacing" description="12–18 inches for most types." />
        <CardLink href="/guides/how-to-grow-cucumbers-in-raised-beds" title="Cucumbers in raised beds" description="Trellis, water, and mildew." />
        <CardLink href="/guides/how-to-fertilize-a-raised-bed-garden" title="Fertilizing a raised bed" description="Compost, labels, and nitrogen math." />
        <CardLink href="/container-gardening" title="Growing in pots instead" description="Plastic, ceramic, and fabric — gallon sizes for tomatoes, peppers, and herbs." />
      </div>
    </Container>
  );
}
