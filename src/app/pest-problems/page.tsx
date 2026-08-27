import { CardLink, SectionHeading } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pest & Plant Problems",
  description:
    "Aphids, tomato hornworms, blossom-end rot, and other common vegetable garden problems — practical fixes without panic sprays.",
  path: "/pest-problems",
});

export default function PestProblemsPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/pest-problems", label: "Pest & Plant Problems" }]} />
      <SectionHeading
        title="Pest & plant problems"
        description="Identify the issue, start with the least disruptive fix, and protect beneficial insects. Not every spot on a leaf needs a product."
      />
      <p className="mb-8 max-w-3xl leading-7 text-muted">
        Many “pest” problems are watering or fertility issues in disguise. Blossom-end rot is the classic example.
        For insects, hand-picking and a strong water spray beat a yard-wide insecticide that also kills predators.
      </p>

      <h2 className="font-serif text-2xl font-semibold">Common problems</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink
          href="/guides/aphids-on-vegetable-plants"
          title="Aphids"
          description="Soft clusters on tips and leaf undersides — water spray first, soap second."
        />
        <CardLink
          href="/guides/tomato-hornworms"
          title="Tomato hornworms"
          description="Large green caterpillars that strip leaves overnight. Hand-pick; spare the parasitized ones."
        />
        <CardLink
          href="/guides/blossom-end-rot"
          title="Blossom-end rot"
          description="Dark leathery patch on tomato or pepper fruit — fix moisture before chasing calcium sprays."
        />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Related crop notes</h2>
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
