"use client";

import { useState } from "react";
import {
  CalculatorLayout,
  NumberField,
  ResultPanel,
  ResultRow,
  SelectField,
  UnitField,
  fieldError,
} from "@/components/calculators/fields";
import {
  feedingLevels,
  fertilizerBiases,
  getFeedingLevel,
  getFertilizerChoice,
  getFertilizerSelectGroups,
} from "@/data/fertilizerProfiles";
import {
  calculateFertilizer,
  parseNumber,
  validateFertilizer,
  type FertilizerDiameterUnit,
  type FertilizerSpaceType,
} from "@/lib/calculations";
import { formatContainerSize, formatKitchenSpoons, formatNumber } from "@/lib/format";
import type { LengthUnit } from "@/lib/units";

const SPACE_OPTIONS: { id: FertilizerSpaceType; label: string }[] = [
  { id: "bed", label: "Raised bed or garden plot" },
  { id: "pot", label: "Pot or container" },
];

export function FertilizerCalculator() {
  const [cropId, setCropId] = useState("mixed");
  const [spaceType, setSpaceType] = useState<FertilizerSpaceType>("bed");
  const [length, setLength] = useState("8");
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>("ft");
  const [width, setWidth] = useState("4");
  const [widthUnit, setWidthUnit] = useState<LengthUnit>("ft");
  const [potDiameter, setPotDiameter] = useState("12");
  const [potDiameterUnit, setPotDiameterUnit] = useState<FertilizerDiameterUnit>("in");
  const [pots, setPots] = useState("1");
  const [n, setN] = useState("10");
  const [p, setP] = useState("10");
  const [k, setK] = useState("10");
  const [feedingId, setFeedingId] = useState("light");

  const choice = getFertilizerChoice(cropId);
  const bias = fertilizerBiases[choice.bias];

  const feeding = getFeedingLevel(feedingId);
  const parsedPots = parseNumber(pots);
  const parsed = {
    spaceType,
    length: parseNumber(length) ?? 0,
    lengthUnit,
    width: parseNumber(width) ?? 0,
    widthUnit,
    potDiameter: parseNumber(potDiameter) ?? 0,
    potDiameterUnit,
    pots: parsedPots == null ? 0 : parsedPots,
    nitrogenPercent: parseNumber(n) ?? 0,
    phosphorusPercent: parseNumber(p) ?? 0,
    potassiumPercent: parseNumber(k) ?? 0,
    targetNitrogenLbsPer1000: feeding.lbNPer1000,
  };
  const bagErrors = validateFertilizer(parsed);
  const bagResult = bagErrors.length ? null : calculateFertilizer(parsed);

  const cropSummary = `${choice.name}: look for ${bias.shopLabel.toLowerCase()}. On the bag, ${bias.bagRule} Example numbers: ${bias.exampleNumbers}. ${choice.why}`;
  const spoons = bagResult ? formatKitchenSpoons(bagResult.productOz) : null;
  const spacePhrase =
    spaceType === "pot"
      ? formatContainerSize(parsed.pots, parsed.potDiameter, potDiameterUnit)
      : `${formatNumber(bagResult?.areaSqFt ?? 0)} sq ft`;
  const bagSummary =
    bagResult && spoons
      ? `Start with about ${spoons.heroValue} ${spoons.heroUnit} (${formatNumber(bagResult.productOz, 1)} oz / ${formatNumber(bagResult.productLbs, 3)} lb) of this product for ${spacePhrase}. Conservative rate — you can feed again later. ${spoons.detail} Follow the label if it disagrees or lists a lower amount.`
      : "";

  const cropPanel = (
    <ResultPanel
      title="Bag to look for"
      summary={cropSummary}
      hero={{
        label: choice.name,
        value: punchLabel(choice.bias),
        unit: bias.exampleNumbers,
      }}
    >
      <ResultRow label="You are growing" value={choice.name} />
      <ResultRow
        label="Look for"
        value={bias.shopLabel}
        hint={bias.exampleNumbers}
      />
      <ResultRow label="How to read the bag" value={shortBagRule(choice.bias)} />
    </ResultPanel>
  );

  const bagPanel = bagResult && spoons ? (
    <ResultPanel
      title="How much to apply"
      summary={bagSummary}
      hero={{
        label: "Start with about",
        value: spoons.heroValue,
        unit: spoons.heroUnit,
      }}
      footer={
        <p className="mt-4 rounded-lg bg-white/10 px-3 py-2 text-sm leading-6 text-white/85">
          Conservative starting amount. You can feed again in a couple of weeks if
          plants still look hungry. Too much fertilizer can burn leaves and roots,
          and that is hard to undo. If the bag lists a lower rate, use the bag.
        </p>
      }
    >
      <ResultRow
        label="In spoons"
        value={`${spoons.heroValue} ${spoons.heroUnit}`}
        hint={spoons.detail}
      />
      {spaceType === "pot" ? (
        <ResultRow
          label="Container size"
          value={formatContainerSize(parsed.pots, parsed.potDiameter, potDiameterUnit)}
          hint={`Surface top-dress estimate · ${formatNumber(bagResult.areaSqFt, 1)} sq ft`}
        />
      ) : (
        <ResultRow
          label="Bed size"
          value={`${formatNumber(bagResult.areaSqFt)} sq ft`}
          hint={`${feeding.label} feeding`}
        />
      )}
      <ResultRow
        label="This feeding"
        value={feeding.label}
        hint={feeding.hint}
      />
      <ResultRow
        label="Also supplies"
        value={`${formatNumber(bagResult.phosphorusLbs, 3)} lb P`}
        hint={`${formatNumber(bagResult.potassiumLbs, 3)} lb K`}
      />
    </ResultPanel>
  ) : (
    <ResultPanel summary="">
      <p className="text-sm">
        {spaceType === "pot"
          ? "Enter a valid bag analysis and pot size to see a spoonful estimate."
          : "Enter a valid bag analysis and bed size to see a spoonful estimate."}
      </p>
    </ResultPanel>
  );

  return (
    <CalculatorLayout
      onReset={() => {
        setCropId("mixed");
        setSpaceType("bed");
        setLength("8");
        setLengthUnit("ft");
        setWidth("4");
        setWidthUnit("ft");
        setPotDiameter("12");
        setPotDiameterUnit("in");
        setPots("1");
        setN("10");
        setP("10");
        setK("10");
        setFeedingId("light");
      }}
      results={
        <div className="space-y-4">
          {cropPanel}
          {bagPanel}
        </div>
      }
    >
      <SelectField
        label="What are you growing?"
        value={cropId}
        onChange={setCropId}
        groups={getFertilizerSelectGroups()}
      />
      <p className="text-sm leading-6 text-muted">
        Fertilizer bags print three numbers, in order: nitrogen (N), phosphorus (P),
        potassium (K). You do not need to memorize that. Pick the crop; the result
        tells you which number should stand out — or if they should be about equal.
      </p>
      <p className="text-sm leading-6 text-muted">{choice.why}</p>
      <p className="text-sm leading-6 text-muted">
        <span className="font-medium text-foreground">Skip: </span>
        {bias.avoid}
      </p>

      <section className="space-y-3">
        <h2 className="font-serif text-xl font-semibold">How much fertilizer should you use?</h2>
        <p className="text-sm leading-6 text-muted">
          This estimate is for lightly top-dressing an established raised bed,
          garden plot, or container. It is not for mixing fertilizer into new soil
          or potting mix.
        </p>
        <p className="text-sm leading-6 text-muted">
          If the fertilizer label lists a lower rate, follow the label. Keep
          granules off stems and water them in.
        </p>
        <fieldset>
          <legend className="text-sm font-medium">Where are you growing?</legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {SPACE_OPTIONS.map((option) => (
              <label
                key={option.id}
                className={`flex min-w-0 cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 ${
                  spaceType === option.id
                    ? "border-accent bg-accent/10"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  className="mt-1"
                  name="growing-space"
                  value={option.id}
                  checked={spaceType === option.id}
                  onChange={() => setSpaceType(option.id)}
                />
                <span className="text-sm font-semibold leading-5">{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {spaceType === "bed" ? (
          <>
            <UnitField
              label="Bed or plot length"
              value={length}
              unit={lengthUnit}
              onValueChange={setLength}
              onUnitChange={setLengthUnit}
              error={fieldError(bagErrors, "length")}
            />
            <UnitField
              label="Bed or plot width"
              value={width}
              unit={widthUnit}
              onValueChange={setWidth}
              onUnitChange={setWidthUnit}
              error={fieldError(bagErrors, "width")}
            />
            <p className="text-xs leading-5 text-muted">
              Bed depth is not used because this estimate is based on surface area.
            </p>
          </>
        ) : (
          <div className="space-y-2">
            <div className="grid gap-3 sm:grid-cols-2">
              <UnitField
                label="Pot diameter"
                value={potDiameter}
                unit={potDiameterUnit}
                onValueChange={setPotDiameter}
                onUnitChange={setPotDiameterUnit}
                error={fieldError(bagErrors, "potDiameter")}
                unitOptions={[
                  { value: "in", label: "inches" },
                  { value: "cm", label: "cm" },
                ]}
              />
              <NumberField
                label="Number of pots"
                value={pots}
                onChange={setPots}
                min="1"
                step="1"
                error={fieldError(bagErrors, "pots")}
              />
            </div>
            <p className="text-xs leading-5 text-muted">
              Based on the container’s top surface area, not the potting-mix volume.
            </p>
          </div>
        )}
        <div className="grid min-w-0 grid-cols-3 gap-2">
          <NumberField
            label="N (1st number)"
            value={n}
            onChange={setN}
            error={fieldError(bagErrors, "nitrogenPercent")}
          />
          <NumberField
            label="P (2nd number)"
            value={p}
            onChange={setP}
            error={fieldError(bagErrors, "phosphorusPercent")}
          />
          <NumberField
            label="K (3rd number)"
            value={k}
            onChange={setK}
            error={fieldError(bagErrors, "potassiumPercent")}
          />
        </div>
        <fieldset>
          <legend className="text-sm font-medium">How hard should this feeding be?</legend>
          <div className="mt-2 grid gap-2">
            {feedingLevels.map((level) => (
              <label
                key={level.id}
                className={`flex cursor-pointer items-start gap-3 rounded-md border px-3 py-2.5 ${
                  feedingId === level.id
                    ? "border-accent bg-accent/10"
                    : "border-border"
                }`}
              >
                <input
                  type="radio"
                  className="mt-1"
                  name="feeding-level"
                  value={level.id}
                  checked={feedingId === level.id}
                  onChange={() => setFeedingId(level.id)}
                />
                <span>
                  <span className="block text-sm font-semibold">{level.label}</span>
                  <span className="block text-sm text-muted">{level.hint}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      </section>
    </CalculatorLayout>
  );
}

function punchLabel(bias: keyof typeof fertilizerBiases): string {
  switch (bias) {
    case "balanced":
      return "Balanced";
    case "high-n":
      return "High N";
    case "high-p":
      return "High P";
    case "high-k":
      return "High K";
  }
}

function shortBagRule(bias: keyof typeof fertilizerBiases): string {
  switch (bias) {
    case "balanced":
      return "Three numbers close together";
    case "high-n":
      return "First number biggest";
    case "high-p":
      return "Middle number biggest";
    case "high-k":
      return "Third number biggest, or ≥ N";
  }
}
