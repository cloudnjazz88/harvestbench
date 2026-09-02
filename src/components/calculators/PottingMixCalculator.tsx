"use client";

import Link from "next/link";
import { useState } from "react";
import {
  CalculatorLayout,
  NumberField,
  ResultPanel,
  ResultRow,
  UnitField,
  fieldError,
} from "@/components/calculators/fields";
import {
  MixRecipePicker,
  PottingMixBreakdown,
  PottingMixNotes,
} from "@/components/calculators/SoilMixBreakdown";
import { pottingMixBagSizes } from "@/data/calculators";
import {
  cropHintForGallons,
  getPotMaterial,
  potGallonChoices,
  potMaterials,
  type PotMaterialId,
} from "@/data/containers";
import {
  getPottingMixRecipe,
  pottingMixRecipes,
  splitSoilMix,
} from "@/data/pottingMixes";
import {
  calculatePottingMix,
  parseNumber,
  validatePottingMix,
  type PotShape,
  type PotSizeMode,
} from "@/lib/calculations";
import { formatInteger, formatNumber, plural } from "@/lib/format";
import type { LengthUnit } from "@/lib/units";

const defaults = {
  sizeMode: "gallon" as PotSizeMode,
  gallons: "5",
  shape: "round" as PotShape,
  diameter: "12",
  diameterUnit: "in" as LengthUnit,
  bottomDiameter: "9",
  bottomDiameterUnit: "in" as LengthUnit,
  length: "24",
  lengthUnit: "in" as LengthUnit,
  width: "8",
  widthUnit: "in" as LengthUnit,
  height: "11",
  heightUnit: "in" as LengthUnit,
  pots: "1",
  bagSizeId: "1cf",
  leaveRim: true,
  material: "plastic" as PotMaterialId,
};

export function PottingMixCalculator() {
  const [sizeMode, setSizeMode] = useState<PotSizeMode>(defaults.sizeMode);
  const [gallons, setGallons] = useState(defaults.gallons);
  const [shape, setShape] = useState<PotShape>(defaults.shape);
  const [diameter, setDiameter] = useState(defaults.diameter);
  const [diameterUnit, setDiameterUnit] = useState<LengthUnit>(defaults.diameterUnit);
  const [bottomDiameter, setBottomDiameter] = useState(defaults.bottomDiameter);
  const [bottomDiameterUnit, setBottomDiameterUnit] = useState<LengthUnit>(
    defaults.bottomDiameterUnit,
  );
  const [length, setLength] = useState(defaults.length);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>(defaults.lengthUnit);
  const [width, setWidth] = useState(defaults.width);
  const [widthUnit, setWidthUnit] = useState<LengthUnit>(defaults.widthUnit);
  const [height, setHeight] = useState(defaults.height);
  const [heightUnit, setHeightUnit] = useState<LengthUnit>(defaults.heightUnit);
  const [pots, setPots] = useState(defaults.pots);
  const [bagSizeId, setBagSizeId] = useState(defaults.bagSizeId);
  const [leaveRim, setLeaveRim] = useState(defaults.leaveRim);
  const [material, setMaterial] = useState<PotMaterialId>(defaults.material);
  const [mixId, setMixId] = useState(pottingMixRecipes[0].id);

  const bag = pottingMixBagSizes.find((item) => item.id === bagSizeId) ?? pottingMixBagSizes[2];
  const materialInfo = getPotMaterial(material);
  const gallonValue = parseNumber(gallons) ?? 0;
  const mix = getPottingMixRecipe(mixId);

  const parsed = {
    sizeMode,
    gallons: gallonValue,
    shape,
    diameter: parseNumber(diameter) ?? 0,
    diameterUnit,
    bottomDiameter: parseNumber(bottomDiameter) ?? 0,
    bottomDiameterUnit,
    length: parseNumber(length) ?? 0,
    lengthUnit,
    width: parseNumber(width) ?? 0,
    widthUnit,
    height: parseNumber(height) ?? 0,
    heightUnit,
    headspaceInches: leaveRim ? 1 : 0,
    pots: parseNumber(pots) ?? 0,
    bagSizeCuFt: bag.cuFt,
  };

  const errors = validatePottingMix({
    ...parsed,
    pots: Number.isInteger(parsed.pots) ? parsed.pots : -1,
  });
  const result = errors.length ? null : calculatePottingMix(parsed);
  const mixLines = result ? splitSoilMix(result.cubicFeet, mix) : [];
  const mixSummary = mixLines
    .map((line) => `${line.name} ${formatNumber(line.cubicFeet)} cu ft`)
    .join("; ");

  function reset() {
    setSizeMode(defaults.sizeMode);
    setGallons(defaults.gallons);
    setShape(defaults.shape);
    setDiameter(defaults.diameter);
    setDiameterUnit(defaults.diameterUnit);
    setBottomDiameter(defaults.bottomDiameter);
    setBottomDiameterUnit(defaults.bottomDiameterUnit);
    setLength(defaults.length);
    setLengthUnit(defaults.lengthUnit);
    setWidth(defaults.width);
    setWidthUnit(defaults.widthUnit);
    setHeight(defaults.height);
    setHeightUnit(defaults.heightUnit);
    setPots(defaults.pots);
    setBagSizeId(defaults.bagSizeId);
    setLeaveRim(defaults.leaveRim);
    setMaterial(defaults.material);
    setMixId(pottingMixRecipes[0].id);
  }

  const summary = result
    ? `Potting mix: ${formatNumber(result.cubicFeet)} cu ft (${formatNumber(result.dryQuarts, 1)} dry qt) for ${result.pots} ${plural(result.pots, "pot")}${sizeMode === "gallon" ? ` at ${formatNumber(gallonValue, 1)} gal` : ""}. About ${formatInteger(result.bags)} ${plural(result.bags, "bag")} at ${bag.label}. ${materialInfo.name}. DIY ${mix.name}: ${mixSummary}. Use potting mix, not garden soil.`
    : "";

  return (
    <div className="space-y-5">
      <a
        href="#diy-potting-mix"
        className="flex flex-col gap-2 rounded-xl border border-[color:var(--warning-border)] bg-[color:var(--warning-bg)] px-4 py-3 text-sm no-underline hover:border-cta sm:flex-row sm:items-center sm:justify-between sm:gap-3"
      >
        <span>
          <span className="font-semibold text-foreground">Blend your own potting mix.</span>{" "}
          <span className="text-muted">
            Equal-parts soilless mix or Commercial-mix blend — never garden soil or topsoil in
            ordinary pots.
          </span>
        </span>
        <span className="shrink-0 font-semibold text-cta">Jump to DIY recipe ↓</span>
      </a>

      <CalculatorLayout compact onReset={reset} results={
        result ? (
          <ResultPanel
            summary={summary}
            hero={{
              label: "Potting mix to buy",
              value: formatInteger(result.bags),
              unit: plural(result.bags, "bag"),
              detail: bag.label,
            }}
            footer={
              <div className="mt-4 space-y-3 rounded-lg bg-white/10 p-3 text-sm leading-6 text-white/85">
                {sizeMode === "gallon" ? (
                  <p>
                    <span className="font-semibold text-white">Fits: </span>
                    {cropHintForGallons(gallonValue)}.
                  </p>
                ) : null}
                <p>
                  <span className="font-semibold text-white">{materialInfo.name}: </span>
                  {materialInfo.watering}
                </p>
                <div className="border-t border-white/15 pt-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    {mix.name} · DIY (no garden soil)
                  </p>
                  <ul className="mt-2 space-y-1">
                    {mixLines.map((line) => (
                      <li key={line.name} className="flex justify-between gap-3">
                        <span className="text-white/70">{line.name}</span>
                        <span className="shrink-0 tabular-nums font-medium">
                          {formatNumber(line.cubicFeet)} cu ft
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#diy-potting-mix"
                    className="mt-3 inline-block text-sm font-semibold text-white underline-offset-2 hover:underline"
                  >
                    Change recipe and amounts
                  </a>
                </div>
              </div>
            }
          >
            <ResultRow
              label="Volume"
              value={`${formatNumber(result.cubicFeet)} cu ft`}
              hint={`${formatNumber(result.dryQuarts, 1)} dry quarts`}
            />
            <ResultRow label="Liters" value={`${formatNumber(result.liters, 0)} L`} />
            {result.pots > 1 ? (
              <ResultRow
                label="Per pot"
                value={`${formatNumber(result.perPotCubicFeet)} cu ft`}
              />
            ) : null}
            <ResultRow
              label="Bags needed"
              value={formatInteger(result.bags)}
              hint={`${bag.label}, rounded up`}
            />
          </ResultPanel>
        ) : (
          <ResultPanel summary="">
            <p className="text-sm text-muted">Pick a gallon size to see how much potting mix to buy.</p>
          </ResultPanel>
        )
      }>
        <div>
          <p className="mb-2 text-sm font-medium">How do you know the pot size?</p>
          <div className="grid grid-cols-2 gap-2">
            {(
              [
                ["gallon", "Labeled gallons"],
                ["custom", "I’ll measure"],
              ] as const
            ).map(([id, label]) => (
              <label
                key={id}
                className={`flex min-h-10 cursor-pointer items-center justify-center rounded-md border px-2 text-sm ${
                  sizeMode === id ? "border-accent bg-accent/10 font-semibold" : "border-border"
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="pot-size-mode"
                  checked={sizeMode === id}
                  onChange={() => setSizeMode(id)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {sizeMode === "gallon" ? (
          <div>
            <p className="mb-2 text-sm font-medium">Pot size (US gallons)</p>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {potGallonChoices.map((size) => (
                <label
                  key={size}
                  className={`flex min-h-10 cursor-pointer items-center justify-center rounded-md border px-1 text-sm ${
                    gallons === String(size)
                      ? "border-accent bg-accent/10 font-semibold"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="pot-gallons"
                    checked={gallons === String(size)}
                    onChange={() => setGallons(String(size))}
                  />
                  {size}
                </label>
              ))}
            </div>
            <p className="mt-2 text-xs leading-5 text-muted">
              Grow bags and buckets are usually true US gallons. Nursery “#5” pots can hold less —
              measure if the plant looks cramped. Smaller than 1 gal and larger than 20 gal: use
              custom gallons below or measure.
            </p>
            <div className="mt-3">
              <NumberField
                label="Or type any gallon size"
                value={gallons}
                onChange={setGallons}
                min="0.25"
                step="0.5"
                suffix="gal"
                error={fieldError(errors, "gallons")}
              />
            </div>
          </div>
        ) : (
          <>
            <div>
              <p className="mb-2 text-sm font-medium">Pot shape</p>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    ["round", "Round"],
                    ["tapered", "Tapered"],
                    ["rectangle", "Rectangle"],
                  ] as const
                ).map(([id, label]) => (
                  <label
                    key={id}
                    className={`flex min-h-10 cursor-pointer items-center justify-center rounded-md border px-2 text-sm ${
                      shape === id ? "border-accent bg-accent/10 font-semibold" : "border-border"
                    }`}
                  >
                    <input
                      type="radio"
                      className="sr-only"
                      name="pot-shape"
                      checked={shape === id}
                      onChange={() => setShape(id)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>
            {shape === "rectangle" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <UnitField
                  label="Inside length"
                  value={length}
                  unit={lengthUnit}
                  onValueChange={setLength}
                  onUnitChange={setLengthUnit}
                  error={fieldError(errors, "length")}
                />
                <UnitField
                  label="Inside width"
                  value={width}
                  unit={widthUnit}
                  onValueChange={setWidth}
                  onUnitChange={setWidthUnit}
                  error={fieldError(errors, "width")}
                />
              </div>
            ) : (
              <>
                <UnitField
                  label={shape === "tapered" ? "Top inside diameter" : "Inside diameter"}
                  value={diameter}
                  unit={diameterUnit}
                  onValueChange={setDiameter}
                  onUnitChange={setDiameterUnit}
                  error={fieldError(errors, "diameter")}
                />
                {shape === "tapered" ? (
                  <UnitField
                    label="Bottom inside diameter"
                    value={bottomDiameter}
                    unit={bottomDiameterUnit}
                    onValueChange={setBottomDiameter}
                    onUnitChange={setBottomDiameterUnit}
                    error={fieldError(errors, "bottomDiameter")}
                  />
                ) : null}
              </>
            )}
            <UnitField
              label="Inside height"
              value={height}
              unit={heightUnit}
              onValueChange={setHeight}
              onUnitChange={setHeightUnit}
              error={fieldError(errors, "height")}
            />
          </>
        )}

        <div>
          <p className="mb-2 text-sm font-medium">Pot material</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {potMaterials.map((item) => (
              <label
                key={item.id}
                className={`flex min-h-16 cursor-pointer flex-col justify-center rounded-md border px-3 py-2 text-sm ${
                  material === item.id
                    ? "border-accent bg-accent/10 font-semibold"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="pot-material"
                  checked={material === item.id}
                  onChange={() => setMaterial(item.id)}
                />
                <span>{item.name}</span>
                <span className="mt-0.5 text-xs font-normal text-muted">{item.short}</span>
              </label>
            ))}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">{materialInfo.bestFor}.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Number of pots"
            value={pots}
            onChange={setPots}
            step="1"
            min="1"
            error={fieldError(errors, "pots")}
          />
          <div>
            <p className="mb-2 text-sm font-medium">Bag size</p>
            <div className="grid grid-cols-2 gap-2">
              {pottingMixBagSizes.map((size) => (
                <label
                  key={size.id}
                  className={`flex min-h-10 cursor-pointer items-center justify-center rounded-md border px-2 text-sm ${
                    bagSizeId === size.id
                      ? "border-accent bg-accent/10 font-semibold"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="potting-bag-size"
                    checked={bagSizeId === size.id}
                    onChange={() => setBagSizeId(size.id)}
                  />
                  {size.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 accent-accent"
            checked={leaveRim}
            onChange={(event) => setLeaveRim(event.target.checked)}
          />
          <span className="text-sm leading-5 text-muted">
            Leave a little empty at the rim for watering
            {sizeMode === "gallon" ? " (about 8% of the labeled volume)." : " (1 inch)."}
          </span>
        </label>

        <p className="text-sm leading-6 text-muted">
          Fill with <strong>potting mix</strong>, not garden soil. See{" "}
          <Link href="/guides/potting-mix-vs-garden-soil" className="font-medium text-accent hover:underline">
            potting mix vs garden soil
          </Link>{" "}
          and{" "}
          <Link href="/guides/growing-vegetables-in-containers" className="font-medium text-accent hover:underline">
            pots, materials, and crop sizes
          </Link>
          .
        </p>
      </CalculatorLayout>

      <section
        id="diy-potting-mix"
        className="scroll-mt-24 rounded-xl border-2 border-[color:var(--warning-border)] bg-[color:var(--warning-bg)] p-4 sm:p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-cta">
          DIY recipe · soilless only
        </p>
        <h2 className="mt-1 font-serif text-2xl font-semibold">Optional potting mix recipe</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
          Bagged soilless potting mix is fine. If you blend your own, stay soilless. Choose an
          Extension-based starting recipe below — not a universal formula. Raised beds can include
          screened topsoil; ordinary pots should not.
        </p>
        <p className="mt-3 rounded-lg border border-[color:var(--warning-border)] bg-card px-3 py-2 text-sm leading-6 text-foreground">
          <strong className="font-semibold">No garden soil or topsoil in pots.</strong> Those materials
          pack hard in a container and stay wet around roots. Use them in open raised beds instead.
        </p>
        <div className="mt-4">
          <MixRecipePicker
            recipes={pottingMixRecipes}
            selectedId={mixId}
            onChange={setMixId}
            name="potting-mix-recipe"
          />
        </div>
        <p className="mt-3 text-sm text-muted">{mix.summary}</p>
        <p className="mt-1 text-sm text-muted">Best for: {mix.bestFor}</p>
        {result ? (
          <div className="mt-4">
            <PottingMixBreakdown cubicFeet={result.cubicFeet} recipe={mix} />
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">Enter pot size above to see ingredient amounts.</p>
        )}
        <PottingMixNotes />
      </section>
    </div>
  );
}
