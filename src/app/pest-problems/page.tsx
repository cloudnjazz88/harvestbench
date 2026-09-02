import Image from "next/image";
import Link from "next/link";
import { CardLink, cardSurfaceClass } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { getPests, type Pest } from "@/data/pests";
import { pageMetadata } from "@/lib/seo";

function hasValidPestImage(image: Pest["image"] | undefined): boolean {
  return Boolean(image?.src?.startsWith("/images/") && image.alt?.trim());
}

export const metadata = pageMetadata({
  title: "Pest & Plant Problems",
  description:
    "Identify common vegetable garden pests with photos, then use cultural controls and labeled product types — without panic sprays.",
  path: "/pest-problems",
});

export default function PestProblemsPage() {
  const pests = getPests();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/pest-problems", label: "Pest & Plant Problems" }]} />
      <h1 className="mb-5 font-serif text-2xl font-semibold sm:text-3xl">Pest & plant problems</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Identify the issue, start with the least disruptive fix, and protect beneficial insects. Not
        every spot on a leaf needs a product.
      </p>
      <p className="mb-8 max-w-3xl leading-7 text-muted">
        Many “pest” problems are watering or fertility issues in disguise. Blossom-end rot is the classic
        example. For insects, hand-picking and a strong water spray beat a yard-wide insecticide that also
        kills predators. Product tips below name <strong>types</strong> and label criteria — not ranked
        brands or fake test claims.
      </p>

      <h2 className="font-serif text-2xl font-semibold">Common garden pests</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
        Compare the photo and common name, then open a card for identification notes and practical
        controls. Product tips name <strong>types</strong> and label criteria — not ranked brands.
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {pests.map((pest) => {
          const photo = hasValidPestImage(pest.image) ? pest.image : null;
          return (
            <li key={pest.slug} className="min-w-0">
              <Link
                href={`/pest-problems/${pest.slug}`}
                className={`flex h-full min-w-0 flex-col overflow-hidden ${cardSurfaceClass}`}
              >
                {photo ? (
                  <div className="relative aspect-[4/3] w-full bg-background">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-contain"
                    />
                  </div>
                ) : null}
                <span className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                  <span className="break-words font-serif text-base font-semibold sm:text-xl">
                    {pest.name}
                  </span>
                  <span className="mt-2 hidden text-sm leading-6 text-muted sm:block">
                    {pest.summary}
                  </span>
                  <span className="mt-2 text-xs font-medium text-accent sm:mt-3">
                    {pest.crops.slice(0, 3).join(" · ")}
                    {pest.crops.length > 3 ? " · …" : ""}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-14 font-serif text-2xl font-semibold">Plant disorders (not insects)</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/blossom-end-rot"
          title="Blossom-end rot"
          description="Dark leathery patch on tomato or pepper fruit — fix moisture before chasing calcium sprays."
        />
      </div>

      <h2 className="mt-14 font-serif text-2xl font-semibold">Related crop notes</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/vegetable-gardening/tomatoes"
          title="Tomatoes"
          description="Cracking, blossom-end rot, and watering notes for the crop that gets hit hardest."
        />
        <CardLink
          href="/vegetable-gardening/peppers"
          title="Peppers"
          description="Aphids and blossom-end rot show up here too."
        />
        <CardLink
          href="/guides/how-often-to-water-raised-beds"
          title="How often to water"
          description="Even moisture prevents more fruit problems than most bottles on the shelf."
        />
        <CardLink
          href="/guides/how-to-fertilize-a-raised-bed-garden"
          title="Fertilizing a raised bed"
          description="Soft, overfed growth invites aphids."
        />
      </div>
    </Container>
  );
}
