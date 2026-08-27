import { notFound } from "next/navigation";
import { FertilizerCalculator } from "@/components/calculators/FertilizerCalculator";
import { GardenAreaCalculator } from "@/components/calculators/GardenAreaCalculator";
import { PlantSpacingCalculator } from "@/components/calculators/PlantSpacingCalculator";
import { PottingMixCalculator } from "@/components/calculators/PottingMixCalculator";
import { RaisedBedSoilCalculator } from "@/components/calculators/RaisedBedSoilCalculator";
import { SoilVolumeCalculator } from "@/components/calculators/SoilVolumeCalculator";
import { VolumeBagsCalculator } from "@/components/calculators/VolumeBagsCalculator";
import { ToolPage } from "@/components/content/ToolPage";
import { calculators, getCalculator } from "@/data/calculators";
import type { CalculatorId } from "@/data/types";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function isCalculatorId(slug: string): slug is CalculatorId {
  return calculators.some((item) => item.id === slug);
}

export function generateStaticParams() {
  return calculators.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  if (!isCalculatorId(slug)) return {};
  const calculator = getCalculator(slug);
  return pageMetadata({
    title: calculator.title,
    description: calculator.description,
    path: calculator.href,
  });
}

export default async function CalculatorPage({ params }: Props) {
  const { slug } = await params;
  if (!isCalculatorId(slug)) notFound();
  const calculator = getCalculator(slug);

  return (
    <ToolPage calculator={calculator}>
      <CalculatorWidget id={slug} />
    </ToolPage>
  );
}

function CalculatorWidget({ id }: { id: CalculatorId }) {
  switch (id) {
    case "raised-bed-soil":
      return <RaisedBedSoilCalculator />;
    case "soil-volume":
      return <SoilVolumeCalculator />;
    case "mulch":
      return <VolumeBagsCalculator defaultDepth="2" depthLabel="Desired mulch depth" />;
    case "compost":
      return <VolumeBagsCalculator defaultDepth="1" depthLabel="Compost layer depth" />;
    case "fertilizer":
      return <FertilizerCalculator />;
    case "plant-spacing":
      return <PlantSpacingCalculator />;
    case "garden-area":
      return <GardenAreaCalculator />;
    case "potting-mix":
      return <PottingMixCalculator />;
    default:
      return null;
  }
}
