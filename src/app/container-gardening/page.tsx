import Link from "next/link";
import { CardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { plantInPots, potGallonChoices, potGallonCrops, potMaterials } from "@/data/containers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Container Gardening",
  description:
    "Grow vegetables in plastic, ceramic, or fabric pots. Match gallon size to the crop, then fill with potting mix.",
  path: "/container-gardening",
});

export default function ContainerGardeningPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/container-gardening", label: "Container Gardening" }]} />
      <SectionHeading
        title="Container gardening"
        description="Pots split two ways: material (plastic, ceramic, fabric) and volume in gallons (1, 3, 5, 7, 10, and up). Material changes watering. Gallons change which plant will finish a crop."
      />
      <p className="mb-8 max-w-3xl leading-7 text-muted">
        Fill containers with{" "}
        <Link href="/guides/potting-mix-vs-garden-soil" className="font-medium text-accent hover:underline">
          potting mix
        </Link>
        , not garden soil. Start with the{" "}
        <Link href="/calculators/potting-mix" className="font-medium text-accent hover:underline">
          potting mix calculator
        </Link>{" "}
        so you buy bags once. Nursery “#5” plastic pots can hold less than a 5-gallon bucket or grow bag — measure if
        the plant looks cramped.
      </p>

      <h2 className="font-serif text-2xl font-semibold">Recommended calculator</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/calculators/potting-mix"
          title="Potting mix"
          description="Bags of mix for 1–20 gallon pots, or measure a round, tapered, or rectangular planter."
        />
        <CardLink
          href="/calculators/fertilizer"
          title="Fertilizer"
          description="Pots still need a crop-matched bag. Compost-rich mix often needs less than a bag chart."
        />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Pot materials</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
        Fabric grow bags are the nonwoven bags sold in gallon sizes. Ceramic includes unglazed terracotta (dries fast)
        and glazed pots (hold water more like plastic).
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {potMaterials.map((material) => (
          <article key={material.id} className="rounded-xl border border-border bg-card p-5">
            <h3 className="font-serif text-xl font-semibold">{material.name}</h3>
            <p className="mt-1 text-sm text-muted">{material.short}</p>
            <p className="mt-3 text-sm leading-6">
              <span className="font-semibold">Best for: </span>
              {material.bestFor}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-accent">Advantages</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
              {material.pros.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-accent">Tradeoffs</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
              {material.cons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm leading-6 text-muted">{material.watering}</p>
          </article>
        ))}
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Gallon sizes</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
        Smaller than 1 gallon is fine for seedlings and a single herb. Larger than 20 gallons starts to act like a
        small raised bed.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">Typical crops for common pot sizes</caption>
          <thead className="bg-background">
            <tr>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Pot size</th>
              <th className="px-3 py-2 font-semibold">A reasonable crop</th>
            </tr>
          </thead>
          <tbody>
            {potGallonChoices.map((size) => (
              <tr key={size} className="border-t border-border align-top">
                <td className="whitespace-nowrap px-3 py-2 font-medium">{size} gal</td>
                <td className="px-3 py-2 leading-6 text-muted">{potGallonCrops[size]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Which plant in which pot</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
        Comfortable sizes for a full season — not the smallest pot a seedling will survive in. One plant per pot for
        tomatoes, peppers, eggplant, cucumber, and zucchini.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">Vegetable and herb container sizes</caption>
          <thead className="bg-background">
            <tr>
              <th className="px-3 py-2 font-semibold">Plant</th>
              <th className="whitespace-nowrap px-3 py-2 font-semibold">Pot size</th>
              <th className="px-3 py-2 font-semibold">Material</th>
              <th className="px-3 py-2 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody>
            {plantInPots.map((row) => (
              <tr key={row.plant} className="border-t border-border align-top">
                <td className="px-3 py-2 font-medium">{row.plant}</td>
                <td className="whitespace-nowrap px-3 py-2">{row.gallons}</td>
                <td className="px-3 py-2">{row.material}</td>
                <td className="px-3 py-2 leading-6 text-muted">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Guides</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/growing-vegetables-in-containers"
          title="Growing vegetables in containers"
          description="Materials, gallon sizes, and crop-by-crop pot advice in one guide."
        />
        <CardLink
          href="/guides/potting-mix-vs-garden-soil"
          title="Potting mix vs garden soil"
          description="Why pots need potting mix, and why raised beds usually should not be filled with it."
        />
        <CardLink
          href="/guides/how-often-to-water-raised-beds"
          title="How often to water"
          description="Finger test still applies. Pots, especially fabric, dry faster than beds."
        />
        <CardLink
          href="/vegetable-gardening"
          title="Crop pages"
          description="Spacing, sun, and harvest notes. Tomato and pepper pages link back to container sizes."
        />
      </div>
    </Container>
  );
}
