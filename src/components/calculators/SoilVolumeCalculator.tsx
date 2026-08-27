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
  calculateBoxVolume,
  parseNumber,
  validateBoxVolume,
} from "@/lib/calculations";
import { formatNumber } from "@/lib/format";
import type { LengthUnit } from "@/lib/units";

const defaults = {
  length: "10",
  lengthUnit: "ft" as LengthUnit,
  width: "3",
  widthUnit: "ft" as LengthUnit,
  depth: "8",
  depthUnit: "in" as LengthUnit,
};

export function SoilVolumeCalculator() {
  const [length, setLength] = useState(defaults.length);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>(defaults.lengthUnit);
  const [width, setWidth] = useState(defaults.width);
  const [widthUnit, setWidthUnit] = useState<LengthUnit>(defaults.widthUnit);
  const [depth, setDepth] = useState(defaults.depth);
  const [depthUnit, setDepthUnit] = useState<LengthUnit>(defaults.depthUnit);

  const parsed = {
    length: parseNumber(length) ?? 0,
    lengthUnit,
    width: parseNumber(width) ?? 0,
    widthUnit,
    depth: parseNumber(depth) ?? 0,
    depthUnit,
  };
  const errors = validateBoxVolume(parsed);
  const result = errors.length ? null : calculateBoxVolume(parsed);

  const summary = result
    ? `Soil volume: ${formatNumber(result.cubicFeet)} cu ft, ${formatNumber(result.cubicYards, 3)} cu yd, ${formatNumber(result.liters, 0)} liters.`
    : "";

  return (
    <CalculatorLayout
      onReset={() => {
        setLength(defaults.length);
        setLengthUnit(defaults.lengthUnit);
        setWidth(defaults.width);
        setWidthUnit(defaults.widthUnit);
        setDepth(defaults.depth);
        setDepthUnit(defaults.depthUnit);
      }}
      results={
        result ? (
          <ResultPanel
            summary={summary}
            hero={{
              label: "Soil volume",
              value: formatNumber(result.cubicFeet),
              unit: "cu ft",
            }}
          >
            <ResultRow label="Cubic feet" value={`${formatNumber(result.cubicFeet)} cu ft`} />
            <ResultRow label="Cubic yards" value={`${formatNumber(result.cubicYards, 3)} cu yd`} />
            <ResultRow label="Liters" value={`${formatNumber(result.liters, 0)} L`} />
          </ResultPanel>
        ) : (
          <ResultPanel summary="">
            <p className="text-sm text-muted">Enter length, width, and depth to calculate volume.</p>
          </ResultPanel>
        )
      }
    >
      <UnitField label="Length" value={length} unit={lengthUnit} onValueChange={setLength} onUnitChange={setLengthUnit} error={fieldError(errors, "length")} />
      <UnitField label="Width" value={width} unit={widthUnit} onValueChange={setWidth} onUnitChange={setWidthUnit} error={fieldError(errors, "width")} />
      <UnitField label="Depth" value={depth} unit={depthUnit} onValueChange={setDepth} onUnitChange={setDepthUnit} error={fieldError(errors, "depth")} />
    </CalculatorLayout>
  );
}
