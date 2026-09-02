import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { RelatedLinks } from "@/components/content/PageSections";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPest, getPests } from "@/data/pests";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPests().map((pest) => ({ slug: pest.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const pest = getPest(slug);
  if (!pest) return {};
  return pageMetadata({
    title: `${pest.name}: Identify & Control`,
    description: `${pest.summary} Crops: ${pest.crops.join(", ")}. Practical controls and product types for home vegetable gardens.`,
    path: `/pest-problems/${pest.slug}`,
    type: "article",
  });
}

export default async function PestDetailPage({ params }: Props) {
  const { slug } = await params;
  const pest = getPest(slug);
  if (!pest) notFound();

  const path = `/pest-problems/${pest.slug}`;
  const relatedPests = getPests()
    .filter((item) => item.slug !== pest.slug)
    .filter((item) => item.crops.some((crop) => pest.crops.includes(crop)))
    .slice(0, 6);

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { href: "/pest-problems", label: "Pest & Plant Problems" },
          { href: path, label: pest.name },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${pest.name}: identify and control`,
          description: pest.summary,
          url: absoluteUrl(path),
          image: absoluteUrl(pest.image.src),
        }}
      />
      <AdSlot position="top" className="mb-8" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start">
        <figure className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="relative aspect-square">
            <Image
              src={pest.image.src}
              alt={pest.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 18rem"
              className="object-cover"
            />
          </div>
          <figcaption className="space-y-1 p-3 text-xs leading-5 text-muted">
            <p>
              Photo: {pest.image.credit} · {pest.image.license}
            </p>
            <p>
              <a
                href={pest.image.commonsUrl}
                className="text-accent underline-offset-2 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Wikimedia Commons source
              </a>
            </p>
          </figcaption>
        </figure>

        <header>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">Garden pest</p>
          <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            {pest.name}
          </h1>
          {pest.alsoCalled ? (
            <p className="mt-1 text-sm text-muted">Also called: {pest.alsoCalled}</p>
          ) : null}
          <p className="mt-3 max-w-3xl text-lg leading-7 text-muted">{pest.summary}</p>
          <p className="mt-4 text-sm leading-6">
            <span className="font-semibold">Crops often hit: </span>
            <span className="text-muted">{pest.crops.join(", ")}</span>
          </p>
        </header>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="space-y-8">
          <section>
            <h2 className="font-serif text-2xl font-semibold">How to identify</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
              {pest.identify.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-3 leading-7 text-muted">
              <span className="font-semibold text-foreground">Damage: </span>
              {pest.damage}
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold">Control methods</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7">
              {pest.controls.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold">What products to use</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
              We list product <strong>types</strong> and what to check on the label — not brand rankings,
              prices, or “we tested” claims. Always follow the label for your crop, and prefer the least
              disruptive option that works.
            </p>
            <ul className="mt-4 space-y-3">
              {pest.products.map((product) => (
                <li
                  key={product.name}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    <span className="font-medium text-foreground">When: </span>
                    {product.when}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    <span className="font-medium text-foreground">Look for: </span>
                    {product.lookFor}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <AdSlot position="in-content" />

          {pest.relatedGuideHref ? (
            <p className="rounded-xl border border-accent/30 bg-accent/[0.07] p-4 text-sm leading-6">
              Longer walkthrough:{" "}
              <Link href={pest.relatedGuideHref} className="font-medium text-accent hover:underline">
                open the related guide
              </Link>
              .
            </p>
          ) : null}
        </article>

        <aside className="space-y-6">
          <AdSlot position="sidebar" />
          <RelatedLinks
            title="Related pests"
            items={relatedPests.map((item) => ({
              href: `/pest-problems/${item.slug}`,
              label: item.name,
              description: item.summary,
            }))}
          />
          <RelatedLinks
            title="More help"
            items={[
              { href: "/pest-problems", label: "All pest & plant problems" },
              { href: "/guides", label: "Guides" },
              {
                href: "/guides/how-often-to-water-raised-beds",
                label: "Watering raised beds",
              },
            ]}
          />
        </aside>
      </div>
      <AdSlot position="bottom" className="mt-10" />
    </Container>
  );
}
