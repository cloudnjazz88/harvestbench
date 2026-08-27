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
import { MixNotes, MixRecipePicker, SoilMixBreakdown } from "@/components/calculators/SoilMixBreakdown";
import { bagSizes } from "@/data/calculators";
import { getSoilMixRecipe, soilMixRecipes, splitSoilMix } from "@/data/soilMixes";
import {
  calculateHugelkultur,
  calculateRaisedBedSoil,
  parseNumber,
  suggestedHugelSoilOnTopInches,
  validateRaisedBedSoil,
} from "@/lib/calculations";
import { formatInteger, formatMoney, formatNumber, plural } from "@/lib/format";
import { cubicFeetToYards, toFeet, toInches, type LengthUnit } from "@/lib/units";

const defaults = {
  length: "8",
  lengthUnit: "ft" as LengthUnit,
  width: "4",
  widthUnit: "ft" as LengthUnit,
  depth: "12",
  depthUnit: "in" as LengthUnit,
  beds: "1",
  bagSize: "1.5",
  soilOnTop: "9",
  bagPrice: "8",
};

export function RaisedBedSoilCalculator() {
  const [length, setLength] = useState(defaults.length);
  const [lengthUnit, setLengthUnit] = useState<LengthUnit>(defaults.lengthUnit);
  const [width, setWidth] = useState(defaults.width);
  const [widthUnit, setWidthUnit] = useState<LengthUnit>(defaults.widthUnit);
  const [depth, setDepth] = useState(defaults.depth);
  const [depthUnit, setDepthUnit] = useState<LengthUnit>(defaults.depthUnit);
  const [beds, setBeds] = useState(defaults.beds);
  const [bagSize, setBagSize] = useState(defaults.bagSize);
  const [mixId, setMixId] = useState(soilMixRecipes[0].id);
  const [hugelEnabled, setHugelEnabled] = useState(false);
  const [soilOnTop, setSoilOnTop] = useState(defaults.soilOnTop);
  const [bagPrice, setBagPrice] = useState(defaults.bagPrice);

  const parsed = {
    length: parseNumber(length) ?? 0,
    lengthUnit,
    width: parseNumber(width) ?? 0,
    widthUnit,
    depth: parseNumber(depth) ?? 0,
    depthUnit,
    beds: parseNumber(beds) ?? 0,
    bagSize: parseNumber(bagSize) ?? 0,
  };

  const errors = validateRaisedBedSoil({
    ...parsed,
    beds: Number.isInteger(parsed.beds) ? parsed.beds : -1,
  });
  const hugelErrors: typeof errors = [];
  if (hugelEnabled) {
    const top = parseNumber(soilOnTop);
    if (top === null || top <= 0) {
      hugelErrors.push({
        field: "soilOnTop",
        message: "Keep at least a few inches of real soil on top of the wood.",
      });
    } else if (top > 36) {
      hugelErrors.push({
        field: "soilOnTop",
        message: "Soil on top looks too deep. Use a value of 36 inches or less.",
      });
    }
  }
  const priceParsed = parseNumber(bagPrice);
  const priceError =
    bagPrice.trim() && (priceParsed === null || priceParsed < 0)
      ? { field: "bagPrice", message: "Enter a bag price of 0 or more." }
      : undefined;
  const fieldErrors = [...errors, ...hugelErrors, ...(priceError ? [priceError] : [])];

  const result = errors.length ? null : calculateRaisedBedSoil(parsed);
  const hugel =
    result && hugelEnabled && hugelErrors.length === 0
      ? calculateHugelkultur({
          fullCubicFeet: result.cubicFeet,
          depthFt: result.depthFt,
          soilOnTopFt: toFeet(parseNumber(soilOnTop) ?? 0, "in"),
          bagSize: result.bagSize,
          pricePerBag: !priceError && priceParsed && priceParsed > 0 ? priceParsed : 0,
        })
      : null;
  const usingHugel = Boolean(hugel && !hugel.tooShallow);
  const soilCubicFeet = usingHugel && hugel ? hugel.soilCubicFeet : result?.cubicFeet;
  const bagsToBuy = usingHugel && hugel ? hugel.soilBags : result?.bags;
  const woodLayerInches = Math.max(
    0,
    toInches(parsed.depth, parsed.depthUnit) - (parseNumber(soilOnTop) ?? 0),
  );

  function reset() {
    setLength(defaults.length);
    setLengthUnit(defaults.lengthUnit);
    setWidth(defaults.width);
    setWidthUnit(defaults.widthUnit);
    setDepth(defaults.depth);
    setDepthUnit(defaults.depthUnit);
    setBeds(defaults.beds);
    setBagSize(defaults.bagSize);
    setMixId(soilMixRecipes[0].id);
    setHugelEnabled(false);
    setSoilOnTop(defaults.soilOnTop);
    setBagPrice(defaults.bagPrice);
  }

  const mix = getSoilMixRecipe(mixId);
  const mixLines = soilCubicFeet != null ? splitSoilMix(soilCubicFeet, mix) : [];
  const mixSummary = mixLines
    .map((line) => `${line.name}: ${formatNumber(line.cubicFeet)} cu ft`)
    .join("; ");

  const summary = result
    ? `Raised bed soil: ${formatNumber(usingHugel && hugel ? hugel.soilCubicFeet : result.cubicFeet)} cu ft (${formatNumber(usingHugel && hugel ? cubicFeetToYards(hugel.soilCubicFeet) : result.cubicYards, 3)} cu yd) for ${result.beds} bed(s). About ${formatInteger(bagsToBuy ?? 0)} bags at ${result.bagSize} cu ft each.${
        hugel && !hugel.tooShallow
          ? ` Hugelkultur saves ${formatNumber(hugel.savedCubicFeet)} cu ft (${formatInteger(hugel.bagsSaved)} bags${hugel.moneySaved != null ? `, about ${formatMoney(hugel.moneySaved)}` : ""}).`
          : ""
      } Optional ${mix.name}: ${mixSummary}.`
    : "";

  return (
    <div className="space-y-5">
      <a
        href="#hugelkultur"
        className="flex flex-col gap-2 rounded-xl border border-cta/35 bg-cta/10 px-4 py-3 text-sm no-underline hover:border-cta sm:flex-row sm:items-center sm:justify-between sm:gap-3"
      >
        <span>
          <span className="font-semibold text-cta">Hugelkultur can cut the soil bill.</span>{" "}
          <span className="text-muted">
            Twigs, leaves, and brush in the bottom replace bagged mix. A 12-inch 4×8 can skip about
            6 bags (~$48 at $8). A 24-inch bed can skip about half the soil — often $150+.
          </span>
        </span>
        <span className="shrink-0 font-semibold text-cta">How it works ↓</span>
      </a>

      <a
        href="#soil-mix"
        className="flex flex-col gap-2 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm no-underline hover:border-accent sm:flex-row sm:items-center sm:justify-between sm:gap-3"
      >
        <span>
          <span className="font-semibold text-accent">Plan a mix, not just a volume.</span>
          {" "}
          <span className="text-muted">
            Split this fill into compost, coco peat or peat moss, and perlite — then buy the ingredients.
          </span>
        </span>
        <span className="shrink-0 font-semibold text-accent">Jump to mix ↓</span>
      </a>

      <CalculatorLayout
        compact
        onReset={reset}
        results={
          result && bagsToBuy != null && soilCubicFeet != null ? (
            <ResultPanel
              summary={summary}
              hero={{
                label: usingHugel ? "Soil bags still to buy" : "Bags to buy",
                value: formatInteger(bagsToBuy),
                unit: plural(bagsToBuy, "bag"),
                detail: `${result.bagSize} cu ft each`,
              }}
              footer={
                <>
                  {hugel ? (
                    <HugelSavingsCard hugel={hugel} bagPrice={priceParsed} />
                  ) : null}
                  <div className="mt-4 rounded-lg bg-white/10 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                      {mix.name}
                      {usingHugel ? " · soil layer only" : ""}
                    </p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {mixLines.map((line) => (
                        <li key={line.name} className="flex justify-between gap-3">
                          <span className="text-white/70">{line.name}</span>
                          <span className="shrink-0 tabular-nums font-medium">
                            {formatNumber(line.cubicFeet)} cu ft
                          </span>
                        </li>
                      ))}
                    </ul>
                    <a href="#soil-mix" className="mt-3 inline-block text-sm font-semibold text-white underline-offset-2 hover:underline">
                      Change recipe and bag counts
                    </a>
                  </div>
                </>
              }
            >
              <ResultRow
                label={usingHugel ? "Soil you still buy" : "Soil volume"}
                value={`${formatNumber(soilCubicFeet)} cu ft`}
              />
              <ResultRow
                label="Cubic yards"
                value={`${formatNumber(cubicFeetToYards(soilCubicFeet), 3)} cu yd`}
              />
              <ResultRow
                label="Bags needed"
                value={formatInteger(bagsToBuy)}
                hint={`${result.bagSize} cu ft bags, rounded up`}
              />
              {usingHugel && hugel ? (
                <ResultRow
                  label="If you filled with soil only"
                  value={`${formatInteger(hugel.fullBags)} bags`}
                  hint={`${formatNumber(result.cubicFeet)} cu ft`}
                />
              ) : null}
              {result.beds > 1 ? (
                <ResultRow
                  label="Per bed"
                  value={`${formatNumber(usingHugel && hugel ? hugel.soilCubicFeet / result.beds : result.perBedCubicFeet)} cu ft`}
                />
              ) : null}
            </ResultPanel>
          ) : (
            <ResultPanel summary="">
              <p className="text-sm text-muted">Enter valid dimensions to see soil volume.</p>
            </ResultPanel>
          )
        }
      >
        <div className="grid gap-3 md:grid-cols-3">
          <UnitField
            label="Bed length"
            value={length}
            unit={lengthUnit}
            onValueChange={setLength}
            onUnitChange={setLengthUnit}
            error={fieldError(fieldErrors, "length")}
          />
          <UnitField
            label="Bed width"
            value={width}
            unit={widthUnit}
            onValueChange={setWidth}
            onUnitChange={setWidthUnit}
            error={fieldError(fieldErrors, "width")}
          />
          <UnitField
            label="Fill depth"
            value={depth}
            unit={depthUnit}
            onValueChange={setDepth}
            onUnitChange={setDepthUnit}
            error={fieldError(fieldErrors, "depth")}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Number of beds"
            value={beds}
            onChange={setBeds}
            step="1"
            error={fieldError(fieldErrors, "beds")}
          />
          <div>
            <p className="mb-2 text-sm font-medium">Bag size</p>
            <div className="grid grid-cols-2 gap-2">
              {bagSizes.map((size) => (
                <label
                  key={size.value}
                  className={`flex min-h-10 cursor-pointer items-center justify-center rounded-md border px-2 text-sm ${
                    bagSize === String(size.value)
                      ? "border-accent bg-accent/10 font-semibold"
                      : "border-border"
                  }`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name="bag-size"
                    value={size.value}
                    checked={bagSize === String(size.value)}
                    onChange={(event) => setBagSize(event.target.value)}
                  />
                  {size.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        <fieldset
          id="hugel-toggle"
          className="rounded-lg border border-border bg-background px-3 py-3"
        >
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 accent-accent"
              checked={hugelEnabled}
              onChange={(event) => {
                const on = event.target.checked;
                setHugelEnabled(on);
                if (on) {
                  const depthIn = toInches(parseNumber(depth) ?? 0, depthUnit);
                  setSoilOnTop(String(suggestedHugelSoilOnTopInches(depthIn)));
                }
              }}
            />
            <span>
              <span className="text-sm font-semibold">Hugelkultur — twigs, leaves, or logs in the bottom</span>
              <span className="mt-0.5 block text-sm leading-5 text-muted">
                Free yard waste replaces purchased soil. In a 12-inch bed, 2–3 inches of thin
                branches packed with leaves is enough. Taller frames can take a thicker woody layer.
              </span>
            </span>
          </label>
          {hugelEnabled ? (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <NumberField
                  label="Real soil on top"
                  value={soilOnTop}
                  onChange={setSoilOnTop}
                  min="1"
                  suffix="in"
                  error={fieldError(fieldErrors, "soilOnTop")}
                />
                <p className="mt-1 text-xs leading-5 text-muted">
                  That leaves about {formatNumber(woodLayerInches, 1)} in underneath for twigs and
                  fallen leaves.
                </p>
              </div>
              <NumberField
                label="Price per bag ($)"
                value={bagPrice}
                onChange={setBagPrice}
                min="0"
                step="0.5"
                error={fieldError(fieldErrors, "bagPrice")}
              />
            </div>
          ) : null}
        </fieldset>
      </CalculatorLayout>

      <section
        id="hugelkultur"
        className="scroll-mt-24 rounded-xl border-2 border-cta/35 bg-cta/[0.06] p-4 sm:p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-cta">Save soil, save money</p>
        <h2 className="mt-1 font-serif text-2xl font-semibold">Hugelkultur in a raised bed</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
          Hugelkultur (from the German <em>Hügelkultur</em>, “hill culture”) means burying woody
          scraps under soil so you buy less mix. It does not have to be fat logs. In a typical
          12-inch bed, pack <strong>2–3 inches of thin branches</strong>, then stuff the gaps with
          leaves. That layer still counts — it is soil you do not purchase. Taller frames can take
          a thicker woody pile and save more.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
          Keep enough real mix on top for roots — about 9 inches in a 12-inch box, 10–12 inches
          when the frame is deeper. Turn on the checkbox above; the calculator starts you at a 3-inch
          brush-and-leaf layer.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Soil and money saved with hugelkultur in a 4 by 8 bed, 1.5 cubic foot bags at 8 dollars
            </caption>
            <thead className="bg-background">
              <tr>
                <th className="px-3 py-2 font-semibold">4×8 bed</th>
                <th className="px-3 py-2 font-semibold">All soil</th>
                <th className="px-3 py-2 font-semibold">Mix + woody layer</th>
                <th className="px-3 py-2 font-semibold">You save</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="px-3 py-2">12 in · 3 in twigs and leaves</td>
                <td className="px-3 py-2">22 bags · $176</td>
                <td className="px-3 py-2">16 bags · $128</td>
                <td className="px-3 py-2 font-medium text-accent">6 bags · $48</td>
              </tr>
              <tr className="border-t border-border">
                <td className="px-3 py-2">18 in · 6 in wood</td>
                <td className="px-3 py-2">32 bags · $256</td>
                <td className="px-3 py-2">22 bags · $176</td>
                <td className="px-3 py-2 font-medium text-accent">10 bags · $80</td>
              </tr>
              <tr className="border-t border-border bg-accent/[0.07]">
                <td className="px-3 py-2 font-medium">24 in · 12 in wood</td>
                <td className="px-3 py-2">43 bags · $344</td>
                <td className="px-3 py-2">22 bags · $176</td>
                <td className="px-3 py-2 font-semibold text-accent">21 bags · $168</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">
          Money column uses $8 per 1.5 cu ft bag as a planning number — edit the bag price to match
          your store. It is not a quote. Pack twigs tight and fill gaps with leaves so the woody
          layer does not collapse into empty air the first week.
        </p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted">
          <li>Shallow bed: thin branches criss-crossed, then leaves packed in. Skip logs that eat the root zone.</li>
          <li>Deep bed: largest untreated wood first, then brush, then leaves. Water it before adding soil.</li>
          <li>Fresh wood can tie up nitrogen for a season. Use a compost-rich mix on top, or expect a lighter first year.</li>
          <li>Skip treated lumber, black walnut, and painted scraps. The bed will settle as wood shrinks — top off later.</li>
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/guides/hugelkultur-in-raised-beds" className="font-semibold text-accent hover:underline">
            Full hugelkultur guide
          </Link>
          <span className="text-muted"> — layering twigs and leaves in a 12-inch bed, and how much a taller frame saves.</span>
        </p>
      </section>

      <section
        id="soil-mix"
        className="scroll-mt-24 rounded-xl border-2 border-accent/40 bg-accent/[0.06] p-4 sm:p-5"
      >
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          Ingredient plan
        </p>
        <h2 className="mt-1 font-serif text-2xl font-semibold">Optional soil mix</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-muted">
          Bagged raised-bed mix works. If you blend your own, split the volume above into compost,
          coco peat or peat moss, and perlite. These ratios are starting points — not a single correct recipe.
          {usingHugel
            ? " With hugelkultur on, the mix is only for the soil layer on top of the wood."
            : ""}
        </p>
        <div className="mt-4">
          <MixRecipePicker
            recipes={soilMixRecipes}
            selectedId={mixId}
            onChange={setMixId}
          />
        </div>
        <p className="mt-3 text-sm text-muted">{mix.summary}</p>
        {result && soilCubicFeet != null ? (
          <div className="mt-4">
            <SoilMixBreakdown cubicFeet={soilCubicFeet} recipe={mix} />
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">Enter bed size above to see ingredient amounts.</p>
        )}
        <MixNotes />
      </section>
    </div>
  );
}

function HugelSavingsCard({
  hugel,
  bagPrice,
}: {
  hugel: NonNullable<ReturnType<typeof calculateHugelkultur>>;
  bagPrice: number | null;
}) {
  if (hugel.tooShallow) {
    return (
      <div className="mt-4 rounded-lg bg-white/10 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
          Hugelkultur
        </p>
        <p className="mt-1 text-sm leading-6 text-white/85">
          The woody layer is under an inch. Lower “soil on top” by 2–3 inches so twigs and leaves
          have room — that is the whole point in a 12-inch bed.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 rounded-lg bg-white/15 p-3 ring-1 ring-white/25">
      <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
        Hugelkultur savings
      </p>
      {hugel.moneySaved != null ? (
        <p className="mt-1 font-serif text-3xl font-semibold tracking-tight">
          {formatMoney(hugel.moneySaved)}{" "}
          <span className="text-lg font-medium text-white/80">not spent on soil</span>
        </p>
      ) : (
        <p className="mt-1 font-serif text-3xl font-semibold tracking-tight">
          {formatInteger(hugel.bagsSaved)}{" "}
          <span className="text-lg font-medium text-white/80">
            {plural(hugel.bagsSaved, "bag")} you do not buy
          </span>
        </p>
      )}
      <p className="mt-2 text-sm leading-6 text-white/80">
        Wood replaces {formatNumber(hugel.savedCubicFeet)} cu ft ({formatNumber(hugel.savedPercent, 0)}% of
        the box). That is {formatInteger(hugel.bagsSaved)} fewer {plural(hugel.bagsSaved, "bag")} than a
        full soil fill
        {hugel.fullCost != null && hugel.soilCost != null
          ? ` (${formatMoney(hugel.fullCost)} → ${formatMoney(hugel.soilCost)})`
          : ""}
        . {bagPrice && bagPrice > 0 ? "" : "Enter your bag price to see dollars."}
      </p>
    </div>
  );
}
