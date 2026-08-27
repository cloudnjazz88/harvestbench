import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { FaqList, RelatedLinks } from "@/components/content/PageSections";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { crops, cropGroupLabels, getCrop, getRelatedCrops } from "@/data/crops";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return crops.map((crop) => ({ slug: crop.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const crop = getCrop(slug);
  if (!crop) return {};
  return pageMetadata({
    title: `How to Grow ${crop.name} in Raised Beds`,
    description: crop.description,
    path: `/vegetable-gardening/${crop.slug}`,
    type: "article",
  });
}

export default async function CropPage({ params }: Props) {
  const { slug } = await params;
  const crop = getCrop(slug);
  if (!crop) notFound();

  const url = `/vegetable-gardening/${crop.slug}`;

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { href: "/vegetable-gardening", label: "Vegetable Gardening" },
          { href: url, label: crop.name },
        ]}
      />
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `How to grow ${crop.name.toLowerCase()}`,
            description: crop.description,
            url: absoluteUrl(url),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: crop.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]}
      />
      <AdSlot position="top" className="mb-8" />
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        {cropGroupLabels[crop.group].title}
        {crop.complete ? " · Full guide" : " · Overview"}
      </p>
      <h1 className="mt-1 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        How to Grow {crop.name}
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-muted">{crop.intro}</p>

      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="min-w-full text-left text-sm">
          <caption className="sr-only">Key growing facts for {crop.name}</caption>
          <tbody>
            {crop.facts.map((fact) => (
              <tr key={fact.label} className="border-b border-border last:border-b-0">
                <th className="whitespace-nowrap px-4 py-3 font-semibold">{fact.label}</th>
                <td className="px-4 py-3 text-muted">{fact.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article className="space-y-8">
          <Section title="Soil requirements" items={crop.soil} />
          <Section title="Watering" items={crop.watering} />
          <section>
            <h2 className="font-serif text-2xl font-semibold">Sunlight</h2>
            <p className="mt-3 leading-7">{crop.sunlight}</p>
          </section>
          <Section title="Planting" items={crop.planting} />
          <Section title="Spacing" items={crop.spacing} />
          <section>
            <h2 className="font-serif text-2xl font-semibold">Common problems</h2>
            <ul className="mt-3 space-y-3">
              {crop.problems.map((problem) => (
                <li key={problem.name} className="rounded-xl border border-border bg-card p-4">
                  <p className="font-semibold">{problem.name}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{problem.detail}</p>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-serif text-2xl font-semibold">Helpful tools</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
              {crop.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">
              Product links will be added when independently researched. See the{" "}
              garden tools hub for buying criteria.
            </p>
          </section>
          {crop.extraSections?.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-2xl font-semibold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-3 leading-7">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <AdSlot position="in-content" />
          <FaqList items={crop.faqs} />
        </article>
        <aside className="space-y-6">
          <AdSlot position="sidebar" />
          <RelatedLinks title="Related tools" items={crop.relatedTools} />
          <RelatedLinks title="Related crops" items={getRelatedCrops(crop.slug)} />
          <RelatedLinks title="Related guides" items={crop.relatedGuides} />
        </aside>
      </div>
      <AdSlot position="bottom" className="mt-10" />
    </Container>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
