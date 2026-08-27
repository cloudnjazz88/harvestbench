import { CardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { calculators } from "@/data/calculators";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Garden Calculators",
  description:
    "Free calculators for raised bed soil, potting mix, mulch, compost, fertilizer, plant spacing, and garden area.",
  path: "/calculators",
});

export default function CalculatorsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/calculators", label: "Calculators" }]} />
      <SectionHeading
        title="Garden calculators"
        description="Interactive tools for soil volume and planting. No account required. Results update as you type."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {calculators.map((item) => (
          <CardLink
            key={item.id}
            href={item.href}
            kicker="Calculator"
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </Container>
  );
}
