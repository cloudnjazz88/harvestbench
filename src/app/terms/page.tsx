import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms of use for ${siteConfig.name}.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container width="narrow" className="py-10">
      <Breadcrumbs items={[{ href: "/terms", label: "Terms" }]} />
      <h1 className="font-serif text-3xl font-semibold">Terms of use</h1>
      <p className="mt-2 text-sm text-muted">Last updated August 26, 2026</p>
      <div className="mt-6 space-y-4 leading-7 text-muted">
        <p>
          By using {siteConfig.name}, you agree to these terms. The site provides general gardening
          information and calculators for educational purposes.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">No professional advice</h2>
        <p>
          Content is not agronomic consulting, legal advice, or a substitute for product labels, soil
          tests, or local extension recommendations. Fertilizer and volume tools produce estimates.
          Fertilizer amounts are conservative starting points; too much product can burn plants.
          You are responsible for how you apply them.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Accuracy</h2>
        <p>
          We work to keep formulas and explanations correct, but plant growth depends on weather, soil,
          and variety. The site is provided “as is” without warranties.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Acceptable use</h2>
        <p>
          Do not scrape the site in a way that disrupts service, attempt to break into the hosting
          account, or misrepresent content as your own professional certification.
        </p>
        <h2 className="pt-2 font-serif text-2xl font-semibold text-foreground">Liability</h2>
        <p>
          To the extent permitted by law, the site operator is not liable for crop loss, property
          damage, or other damages arising from use of the calculators or articles.
        </p>
      </div>
    </Container>
  );
}
