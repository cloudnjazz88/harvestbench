"use client";

import { useState } from "react";
import {
  CalculatorLayout,
  ResultPanel,
  ResultRow,
  UnitField,
  fieldError,
} from "@/components/calculators/fields";
import { bagSizes } from "@/data/calculators";
import { calculateMulch, parseNumber, validateMulch } from "@/lib/calculations";
import { formatInteger, formatNumber, plural } from "@/lib/format";
import type { LengthUnit } from "@/lib/units";

export function VolumeBagsCalculator({
  defaultDepth = "2",
  depthLabel = "Depth",
}: {
  defaultDepth?: string;
  depthLabel?: string;
}) {
  const [length, setLength] = useState("8");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [width, setWidth] = useState("4");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [depth, setDepth] = useState(defaultDepth);
  const [depthUnit, setDepthUnit] = useState<LengthUnit>("in");
  const [bagSize, setBagSize] = useState("2");

  const parsed = {
    length: parseNumber(length) ?? 0,
    lengthUnit,
    width: parseNumber(width) ?? 0,
    widthUnit,
    depth: parseNumber(depth) ?? 0,
    depthUnit,
    bagSize: parseNumber(bagSize) ?? 0,
  };
  const errors = validateMulch(parsed);
  const result = errors.length ? null : calculateMulch(parsed);

  const summary = result
    ? `Volume: ${formatNumber(result.cubicFeet)} cu ft (${formatNumber(result.cubicYards, 3)} cu yd). About ${formatInteger(result.bags)} bags at ${result.bagSize} cu ft.`
    : "";

  return (
    <CalculatorLayout
      onReset={() => {
        setLength("8");
        setLengthUnit("ft");
        setWidth("4");
        setWidthUnit("ft");
        setDepth(defaultDepth);
        setDepthUnit("in");
        setBagSize("2");
      }}
      results={
        result ? (
          <ResultPanel
            summary={summary}
            hero={{
              label: "Estimated bags",
              value: formatInteger(result.bags),
              unit: plural(result.bags, "bag"),
              detail: `${result.bagSize} cu ft each`,
            }}
          >
            <ResultRow label="Cubic feet" value={`${formatNumber(result.cubicFeet)} cu ft`} />
            <ResultRow label="Cubic yards" value={`${formatNumber(result.cubicYards, 3)} cu yd`} />
            <ResultRow
              label="Estimated bags"
              value={formatInteger(result.bags)}
              hint={`${result.bagSize} cu ft bags, rounded up`}
            />
          </ResultPanel>
        ) : (
          <ResultPanel summary="">
            <p className="text-sm text-muted">Enter area and depth to estimate volume and bags.</p>
          </ResultPanel>
        )
      }
    >
      <UnitField label="Area length" value={length} unit={lengthUnit} onValueChange={setLength} onUnitChange={setLengthUnit} error={fieldError(errors, "length")} />
      <UnitField label="Area width" value={width} unit={widthUnit} onValueChange={setWidth} onUnitChange={setWidthUnit} error={fieldError(errors, "width")} />
      <UnitField label={depthLabel} value={depth} unit={depthUnit} onValueChange={setDepth} onUnitChange={setDepthUnit} error={fieldError(errors, "depth")} />
      <div>
        <p className="mb-2 text-sm font-medium">Bag size</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {bagSizes.map((size) => (
            <label
              key={size.value}
              className={`flex min-h-11 cursor-pointer items-center justify-center rounded-md border px-2 text-sm ${
                bagSize === String(size.value)
                  ? "border-accent bg-accent/10 font-semibold"
                  : "border-border"
              }`}
            >
              <input
                type="radio"
                className="sr-only"
                name="volume-bag-size"
                value={size.value}
                checked={bagSize === String(size.value)}
                onChange={(event) => setBagSize(event.target.value)}
              />
              {size.label}
            </label>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
