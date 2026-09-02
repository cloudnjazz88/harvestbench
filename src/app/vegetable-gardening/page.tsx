import Image from "next/image";
import Link from "next/link";
import { CardLink, SectionHeading, cardSurfaceClass } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { getCropImage } from "@/data/cropImages";
import {
  cropGroupLabels,
  cropGroupOrder,
  crops,
  getCropsByGroup,
} from "@/data/crops";
import { IMAGE_CREDITS_LABEL, IMAGE_CREDITS_PATH } from "@/data/imageCredits";
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
        description={`${crops.length} crop pages for US backyard gardens, with spacing, soil, sun, water, and common problems.`}
      />

      {cropGroupOrder.map((group) => {
        const items = getCropsByGroup(group);
        const meta = cropGroupLabels[group];
        return (
          <section key={group} className="mt-10 first:mt-0">
            <h2 className="font-serif text-2xl font-semibold">{meta.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">{meta.description}</p>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((crop) => {
                const image = getCropImage(crop.slug);
                return (
                  <li key={crop.slug} className="min-w-0">
                    <Link
                      href={`/vegetable-gardening/${crop.slug}`}
                      className={`flex h-full min-w-0 flex-col overflow-hidden ${cardSurfaceClass}`}
                    >
                      {image ? (
                        <div className="relative aspect-[4/3] bg-border/40">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <span className="flex min-w-0 flex-1 flex-col p-4">
                        <span className="break-words font-serif text-xl font-semibold">{crop.name}</span>
                        <span className="mt-2 text-sm leading-6 text-muted">{crop.description}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}

      <p className="mt-8 text-xs leading-5 text-muted">
        <Link href={IMAGE_CREDITS_PATH} className="font-medium text-accent underline-offset-2 hover:underline">
          {IMAGE_CREDITS_LABEL}
        </Link>
      </p>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Related tools</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/calculators/plant-spacing"
          title="Plant spacing calculator"
          description="Pick a crop and a bed size. No spacing chart required."
        />
        <CardLink
          href="/calculators/fertilizer"
          title="Fertilizer calculator"
          description="Pick a crop. See whether the bag should be high N, high P, high K, or balanced."
        />
        <CardLink
          href="/guides/how-often-to-water-raised-beds"
          title="How often to water"
          description="Finger test, crop differences, and why gallon charts fail."
        />
        <CardLink
          href="/container-gardening"
          title="Container gardening"
          description="Plastic, ceramic, and fabric pots — which vegetables fit 1, 5, and 10 gallons."
        />
        <CardLink
          href="/raised-beds"
          title="Raised beds hub"
          description="Soil depth, volume, and bed prep."
        />
      </div>
    </Container>
  );
}
