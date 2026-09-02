import { notFound } from "next/navigation";
import { AdSlot } from "@/components/ads/AdSlot";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { FaqList, RelatedLinks, SourcesList } from "@/components/content/PageSections";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import {
  AffiliateNotice,
  ProductRecommendation,
} from "@/components/products/ProductRecommendation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGuide, guides, isGuidePublished } from "@/data/guides";
import { getReadyProducts, pageHasAffiliateLinks } from "@/data/products";
import {
  buildGuideArticleJsonLd,
  guideEditorialByline,
  pageMetadata,
  storedGuideDate,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const indexable = isGuidePublished(guide);
  const modifiedTime = storedGuideDate(guide.updated) ?? undefined;
  return pageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    type: "article",
    modifiedTime,
    indexable,
  });
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const path = `/guides/${guide.slug}`;
  const indexable = isGuidePublished(guide);
  const article = buildGuideArticleJsonLd(guide, path, indexable);
  const productRecords = getReadyProducts(guide.products ?? []);
  const showAffiliate = pageHasAffiliateLinks(productRecords);
  const jsonLd = [
    ...(article ? [article] : []),
    ...(guide.faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: guide.faqs.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <Container className="py-10">
      <Breadcrumbs
        items={[
          { href: "/guides", label: "Guides" },
          { href: path, label: guide.title },
        ]}
      />
      {jsonLd.length ? <JsonLd data={jsonLd} /> : null}
      <AdSlot position="top" className="mb-8" />
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">
        {guide.type === "product" ? "Buying guide" : "Guide"}
      </p>
      <h1 className="mt-1 max-w-3xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {guide.title}
      </h1>
      <p className="mt-2 text-xs leading-5 text-muted">{guideEditorialByline(guide.updated)}</p>
      <p className="mt-3 max-w-3xl text-lg leading-7 text-muted">{guide.intro}</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <article>
          <ContentBlocks blocks={guide.body} />
          <AdSlot position="in-content" className="my-8" />
          {productRecords.length ? (
            <section className="mt-10 space-y-4">
              <h2 className="font-serif text-2xl font-semibold">Product examples</h2>
              <AffiliateNotice enabled={showAffiliate} />
              {productRecords.map((product) => (
                <ProductRecommendation key={product.id} product={product} />
              ))}
            </section>
          ) : null}
          <FaqList items={guide.faqs} />
          <SourcesList sources={guide.sources} />
        </article>
        <aside className="space-y-6">
          <AdSlot position="sidebar" />
          <RelatedLinks title="Related tools" items={guide.relatedTools} />
          <RelatedLinks title="Related guides" items={guide.relatedGuides} />
        </aside>
      </div>
      <AdSlot position="bottom" className="mt-10" />
    </Container>
  );
}
