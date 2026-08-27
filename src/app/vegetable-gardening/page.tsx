import { CardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import {
  cropGroupLabels,
  cropGroupOrder,
  crops,
  getCropsByGroup,
} from "@/data/crops";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vegetable Gardening",
  description:
    "Crop guides for backyard raised beds: tomatoes, peppers, beans, kale, onions, herbs, and more — with spacing, soil, sun, and water.",
  path: "/vegetable-gardening",
});

export default function VegetableGardeningPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/vegetable-gardening", label: "Vegetable Gardening" }]} />
      <SectionHeading
        title="Vegetable gardening"
        description={`${crops.length} crop pages for US backyard gardens. Tomato and pepper guides are the most complete. The rest are practical overviews with spacing, soil, and water — not empty stubs.`}
      />

      {cropGroupOrder.map((group) => {
        const items = getCropsByGroup(group);
        const meta = cropGroupLabels[group];
        return (
          <section key={group} className="mt-10 first:mt-0">
            <h2 className="font-serif text-2xl font-semibold">{meta.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{meta.description}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {items.map((crop) => (
                <CardLink
                  key={crop.slug}
                  href={`/vegetable-gardening/${crop.slug}`}
                  kicker={crop.complete ? "Full guide" : "Overview"}
                  title={crop.name}
                  description={crop.description}
                />
              ))}
            </div>
          </section>
        );
      })}

      <h2 className="mt-12 font-serif text-2xl font-semibold">Related tools</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink href="/calculators/plant-spacing" title="Plant spacing calculator" description="Pick a crop and a bed size. No spacing chart required." />
        <CardLink href="/calculators/fertilizer" title="Fertilizer calculator" description="Pick a crop. See whether the bag should be high N, high P, high K, or balanced." />
        <CardLink href="/guides/how-often-to-water-raised-beds" title="How often to water" description="Finger test, crop differences, and why gallon charts fail." />
        <CardLink href="/container-gardening" title="Container gardening" description="Plastic, ceramic, and fabric pots — which vegetables fit 1, 5, and 10 gallons." />
        <CardLink href="/raised-beds" title="Raised beds hub" description="Soil depth, volume, and bed prep." />
      </div>
    </Container>
  );
}
