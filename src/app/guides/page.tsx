import { CardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { getHowToGuides, getProductGuides } from "@/data/guides";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gardening Guides",
  description:
    "Practical raised bed and vegetable gardening guides with measurements, tables, and links to calculators.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const howTo = getHowToGuides();
  const products = getProductGuides();

  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/guides", label: "Guides" }]} />
      <SectionHeading
        title="Guides"
        description="Each guide answers one question with measurements and internal links to the tools that do the math."
      />
      <h2 className="font-serif text-2xl font-semibold">How-to guides</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {howTo.map((guide) => (
          <CardLink
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            title={guide.title}
            description={guide.description}
          />
        ))}
      </div>
      <h2 className="mt-12 font-serif text-2xl font-semibold">Product & buying guides</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {products.map((guide) => (
          <CardLink
            key={guide.slug}
            href={`/guides/${guide.slug}`}
            kicker="Buying guide"
            title={guide.title}
            description={guide.description}
          />
        ))}
      </div>
    </Container>
  );
}
