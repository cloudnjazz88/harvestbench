import Link from "next/link";
import { CardLink, SectionHeading, cardSurfaceClass } from "@/components/content/CardLink";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Soil & Compost",
  description:
    "Raised bed soil, compost, amendments, drainage, and calculators for filling and topping off garden beds.",
  path: "/soil-compost",
});

export default function SoilCompostPage() {
  return (
    <Container className="py-10">
      <Breadcrumbs items={[{ href: "/soil-compost", label: "Soil & Compost" }]} />
      <SectionHeading
        title="Soil & compost"
        description="The mix in the bed matters more than the brand on the bag. Use volume calculators first, then match compost and mineral soil to drainage and crops."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Topic
          title="Raised bed soil"
          body="Fill volume, depth, and a default mix of mineral soil plus compost."
          href="/guides/best-soil-mix-for-raised-beds"
        />
        <Topic
          title="Compost"
          body="Annual top-dress volumes and why 100% compost is usually the wrong fill."
          href="/calculators/compost"
        />
        <Topic
          title="Soil amendments"
          body="Fertilizer is for a measured need. Compost is the routine amendment."
          href="/guides/how-to-fertilize-a-raised-bed-garden"
        />
        <Topic
          title="Potting mix vs garden soil"
          body="Potting mix is for containers. At bed scale it is expensive and often too light alone."
          href="/guides/potting-mix-vs-garden-soil"
        />
        <Topic
          title="Garden soil / topsoil"
          body="Ask bulk suppliers for a recipe. Screen rocks if you grow carrots."
          href="/guides/how-much-soil-does-a-raised-bed-need"
        />
        <Topic
          title="Drainage"
          body="Skip the gravel layer. Open bottoms and a mix that is not pure clay do the work."
          href="/guides/how-to-prepare-a-raised-bed"
        />
        <Topic
          title="Hugelkultur"
          body="Twigs and leaves in a 12-inch bed, or a thicker woody layer in a tall frame, so you buy less mix."
          href="/guides/hugelkultur-in-raised-beds"
        />
        <Topic
          title="Soil depth"
          body="10–12 inches for mixed vegetables; deeper for carrots and large fruiting crops."
          href="/guides/how-deep-should-a-raised-bed-be"
        />
      </div>

      <h2 className="mt-12 font-serif text-2xl font-semibold">Calculators</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <CardLink href="/calculators/raised-bed-soil" title="Raised bed soil" description="Bags and yards for a framed bed." />
        <CardLink href="/calculators/potting-mix" title="Potting mix" description="Bags of mix for gallon pots, grow bags, and planters." />
        <CardLink href="/calculators/soil-volume" title="Soil volume" description="Cubic feet, yards, and liters for any rectangle." />
        <CardLink href="/calculators/compost" title="Compost" description="Top-dress or blend depth converted to bags." />
        <CardLink href="/calculators/mulch" title="Mulch" description="Surface coverage at a chosen depth." />
        <CardLink href="/calculators/fertilizer" title="Fertilizer" description="Crop first: which bag number should be highest." />
      </div>
    </Container>
  );
}

function Topic({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className={`block p-5 ${cardSurfaceClass}`}>
      <span className="font-serif text-xl font-semibold">{title}</span>
      <span className="mt-2 block text-sm leading-6 text-muted">{body}</span>
    </Link>
  );
}
