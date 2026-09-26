import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/layout/Container";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Calculations & Editorial Methodology", description: "Understand HarvestBench calculator assumptions, worked examples, source use, product comparisons, and how to report a correction.", path: "/methodology" });

export default function MethodologyPage() {
  return <Container width="narrow" className="py-10">
    <Breadcrumbs items={[{ href: "/methodology", label: "Methodology" }]} />
    <h1 className="font-serif text-3xl font-semibold">How to use our numbers and guides</h1>
    <div className="mt-6 space-y-6 leading-7 text-muted">
      <p>HarvestBench combines measurement tools with gardening reference material. A calculated quantity can be mathematically correct without being the right prescription for every garden. Read the assumptions before buying or applying a material.</p>
      <section><h2 className="font-serif text-2xl font-semibold text-foreground">Soil volume: measure the space you will fill</h2>
        <p className="mt-3">For a rectangular bed, multiply inside length by inside width by fill depth, using feet throughout. Divide cubic feet by 27 for cubic yards. Divide by the volume printed on a bag and round up to whole bags.</p>
        <p className="mt-3">Worked example: a bed measuring 4 × 8 feet inside, filled 12 inches deep, needs 32 cubic feet, or about 1.19 cubic yards. That is 16 bags at 2 cubic feet each before any allowance for settling. At 10 inches of fill it needs 26.67 cubic feet, rounded up to 14 of those bags. Measure the soil depth, not just the frame height.</p>
        <p className="mt-3">Settling allowances are planning assumptions. Wood, existing soil, irregular corners, and a tapered planter all change the volume you actually need to buy.</p>
      </section>
      <section><h2 className="font-serif text-2xl font-semibold text-foreground">Plant counts: a layout estimate</h2>
        <p className="mt-3">The spacing tool uses a crop-specific grid. At 24-inch spacing, a 4 × 8-foot bed has two positions across and four along: eight plants. Trellises, access paths, cultivar size, and pruning can make a smaller planting more practical. A layout count is not a yield forecast.</p>
      </section>
      <section><h2 className="font-serif text-2xl font-semibold text-foreground">Fertilizer: distinguish arithmetic from a feeding recommendation</h2>
        <p className="mt-3">The fertilizer tool uses preset nitrogen scenarios. They do not diagnose a deficiency or establish that your crop needs feeding. If a soil test or product label gives a different direction, use that direction. Container growing media and slow-release products especially need product-specific instructions.</p>
        <p className="mt-3">For the Light scenario, 32 square feet × 0.225 pounds of nitrogen per 1,000 square feet = 0.0072 pounds of nitrogen. A 10% nitrogen product would weigh 0.072 pounds, about 1.15 ounces. The spoon display assumes a bulk density; it is not a measured density for your product. Use a scale or the manufacturer’s own volume rate.</p>
      </section>
      <section><h2 className="font-serif text-2xl font-semibold text-foreground">Sources and product comparisons</h2>
        <p className="mt-3">Where a page lists sources, use them to inspect the underlying guidance and its regional context. Our editorial standard is to favor university extension guidance for crop care, integrated pest management references for pests, and manufacturer instructions for specific products. A source link does not imply that its author reviewed HarvestBench.</p>
        <p className="mt-3">Product specifications describe advertised capabilities. They are not our measurements. Hands-on testing should only be claimed when the page documents the test. Affiliate links are identified where they appear; readers can use the selection criteria without buying a featured product.</p>
      </section>
      <section><h2 className="font-serif text-2xl font-semibold text-foreground">Corrections and dates</h2>
        <p className="mt-3">To report a problem, send the page URL, the statement or result, and a source or example through our <Link href="/contact" className="text-accent underline">contact page</Link>. For a calculator, include the inputs, units, and expected result. Avoid including personal information in the example.</p>
        <p className="mt-3">An update date refers to a stored content revision, not the date you opened the page. Undated pages do not imply a recent horticultural review.</p>
      </section>
    </div>
  </Container>;
}
