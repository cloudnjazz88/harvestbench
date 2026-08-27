"use client";

import { useState } from "react";
import {
  CalculatorLayout,
  ResultPanel,
  ResultRow,
  UnitField,
  fieldError,
} from "@/components/calculators/fields";
import {
  calculateGardenArea,
  parseNumber,
  validateGardenArea,
} from "@/lib/calculations";
import { formatNumber } from "@/lib/format";
import type { LengthUnit } from "@/lib/units";

export function GardenAreaCalculator() {
  const [length, setLength] = useState("8");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [width, setWidth] = useState("4");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");

  const parsed = {
    length: parseNumber(length) ?? 0,
    lengthUnit,
    width: parseNumber(width) ?? 0,
    widthUnit,
  };
  const errors = validateGardenArea(parsed);
  const result = errors.length ? null : calculateGardenArea(parsed);

  const summary = result
    ? `Area: ${formatNumber(result.squareFeet)} sq ft (${formatNumber(result.squareMeters, 2)} m²). Perimeter: ${formatNumber(result.perimeterFt)} ft.`
    : "";

  return (
    <CalculatorLayout
      onReset={() => {
        setLength("8");
        setLengthUnit("ft");
        setWidth("4");
        setWidthUnit("ft");
      }}
      results={
        result ? (
          <ResultPanel
            summary={summary}
            hero={{
              label: "Garden area",
              value: formatNumber(result.squareFeet),
              unit: "sq ft",
            }}
          >
            <ResultRow label="Square feet" value={`${formatNumber(result.squareFeet)} sq ft`} />
            <ResultRow label="Square meters" value={`${formatNumber(result.squareMeters, 2)} m²`} />
            <ResultRow label="Perimeter" value={`${formatNumber(result.perimeterFt)} ft`} />
          </ResultPanel>
        ) : (
          <ResultPanel summary="">
            <p className="text-sm text-muted">Enter length and width to calculate area.</p>
          </ResultPanel>
        )
      }
    >
      <UnitField label="Length" value={length} unit={lengthUnit} onValueChange={setLength} onUnitChange={setLengthUnit} error={fieldError(errors, "length")} />
      <UnitField label="Width" value={width} unit={widthUnit} onValueChange={setWidth} onUnitChange={setWidthUnit} error={fieldError(errors, "width")} />
    </CalculatorLayout>
  );
}
