"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalculatorLayout,
  ResultPanel,
  ResultRow,
  SelectField,
  UnitField,
  fieldError,
} from "@/components/calculators/fields";
import { PlantingGridDiagram } from "@/components/calculators/PlantingGridDiagram";
import {
  cropPageHref,
  getSpacingChoice,
  getSpacingSelectGroups,
} from "@/data/plantSpacing";
import {
  calculatePlantSpacing,
  parseNumber,
  validatePlantSpacing,
} from "@/lib/calculations";
import { formatInteger, formatNumber } from "@/lib/format";
import { toInches, type LengthUnit } from "@/lib/units";

export function PlantSpacingCalculator() {
  const [length, setLength] = useState("8");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [width, setWidth] = useState("4");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [cropId, setCropId] = useState("tomatoes-determinate");

  const crop = getSpacingChoice(cropId);
  const parsed = {
    length: parseNumber(length) ?? 0,
    lengthUnit,
    width: parseNumber(width) ?? 0,
    widthUnit,
    spacing: crop.spacingInches,
    spacingUnit: "in" as LengthUnit,
    mode: "grid" as const,
    plantsPerSquareFoot: 1,
  };
  const errors = validatePlantSpacing(parsed);
  const result = errors.length ? null : calculatePlantSpacing(parsed);

  const summary = result
    ? `${crop.name} in a ${formatNumber(result.areaSqFt)} sq ft bed at ${crop.spacingInches} in: about ${formatInteger(result.plants)} plants (${formatInteger(result.alongWidth)} across × ${formatInteger(result.alongLength)} along).${
        !result.lengthFitsSpacing || !result.widthFitsSpacing
          ? " Narrow bed: plant a single row; plants hang over the sides."
          : ""
      } ${crop.note}`
    : "";

  return (
    <CalculatorLayout
      onReset={() => {
        setLength("8");
        setLengthUnit("ft");
        setWidth("4");
        setWidthUnit("ft");
        setCropId("tomatoes-determinate");
      }}
      results={
        result ? (
          <ResultPanel
            summary={summary}
            hero={{
              label: crop.name,
              value: formatInteger(result.plants),
              unit: result.plants === 1 ? "plant" : "plants",
            }}
            visual={
              <PlantingGridDiagram
                lengthInches={toInches(parsed.length, parsed.lengthUnit)}
                widthInches={toInches(parsed.width, parsed.widthUnit)}
                alongLength={result.alongLength}
                alongWidth={result.alongWidth}
                spacingInches={crop.spacingInches}
                cropName={crop.name}
                lengthFitsSpacing={result.lengthFitsSpacing}
                widthFitsSpacing={result.widthFitsSpacing}
              />
            }
            footer={
              <p className="mt-4 text-sm leading-6 text-white/80">{crop.note}</p>
            }
          >
            <ResultRow
              label="Spacing used"
              value={`${crop.spacingInches} in`}
              hint="Center to center"
            />
            <ResultRow
              label="Bed area"
              value={`${formatNumber(result.areaSqFt)} sq ft`}
            />
          </ResultPanel>
        ) : (
          <ResultPanel summary="">
            <p className="text-sm text-muted">Enter a bed length and width to see how many plants fit.</p>
          </ResultPanel>
        )
      }
    >
      <SelectField
        label="What are you planting?"
        value={cropId}
        onChange={setCropId}
        groups={getSpacingSelectGroups()}
      />
      <UnitField
        label="Bed length"
        value={length}
        unit={lengthUnit}
        onValueChange={setLength}
        onUnitChange={setLengthUnit}
        error={fieldError(errors, "length")}
      />
      <UnitField
        label="Bed width"
        value={width}
        unit={widthUnit}
        onValueChange={setWidth}
        onUnitChange={setWidthUnit}
        error={fieldError(errors, "width")}
      />
      <p className="text-sm leading-6 text-muted">
        Spacing is filled in from the crop. The count uses plants that fit on a
        full grid — it does not squeeze extras into leftover inches. A bed
        narrower than the spacing still gets a single row down the center; those
        plants will hang over the sides. See the{" "}
        <Link href={cropPageHref(crop.cropSlug)} className="font-medium text-accent hover:underline">
          {crop.name.replace(/ \(.+\)$/, "")} growing page
        </Link>{" "}
        for variety notes.
      </p>
    </CalculatorLayout>
  );
}
