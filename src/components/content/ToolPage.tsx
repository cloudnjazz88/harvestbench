import { AdSlot } from "@/components/ads/AdSlot";
import { FaqList, PageHeader, RelatedLinks, SourcesList } from "@/components/content/PageSections";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CalculatorMeta } from "@/data/calculators";
import { absoluteUrl } from "@/lib/seo";

export function ToolPage({
  calculator,
  children,
}: {
  calculator: CalculatorMeta;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { href: "/calculators", label: "Calculators" },
          { href: calculator.href, label: calculator.shortTitle },
        ]}
      />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: calculator.title,
            description: calculator.description,
            url: absoluteUrl(calculator.href),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: calculator.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />
      <AdSlot position="top" className="mb-8" />
      <PageHeader
        eyebrow="Calculator"
        title={calculator.title}
        description={calculator.intro}
      />
      {children}
      <AdSlot position="in-content" className="mt-8" />
      <section className="mt-10">
        <h2 className="font-serif text-2xl font-semibold">How this calculation works</h2>
        <p className="mt-3 leading-7 text-muted">{calculator.formula}</p>
      </section>
      <section className="mt-8 rounded-xl border border-border bg-card p-5">
        <h2 className="font-serif text-2xl font-semibold">{calculator.example.title}</h2>
        <p className="mt-3 leading-7 text-muted">{calculator.example.body}</p>
      </section>
      <FaqList items={calculator.faqs} />
      <SourcesList sources={calculator.sources} title="Sources and methodology" />
      <RelatedLinks title="Related tools" items={calculator.relatedCalculators} />
      <RelatedLinks title="Related guides" items={calculator.relatedGuides} />
      <AdSlot position="bottom" className="mt-10" />
    </Container>
  );
}
