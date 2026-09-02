import Link from "next/link";
import { splitSoilMix, type MixRecipe } from "@/data/soilMixes";
import { formatInteger, formatNumber } from "@/lib/format";
import { cubicFeetToDryQuarts } from "@/lib/units";

function formatSharePercent(fraction: number): string {
  const pct = fraction * 100;
  if (Number.isInteger(pct)) return `${pct}%`;
  return `${pct.toFixed(1)}%`;
}

export function SoilMixBreakdown({
  cubicFeet,
  recipe,
}: {
  cubicFeet: number;
  recipe: MixRecipe;
}) {
  const lines = splitSoilMix(cubicFeet, recipe);

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">
          Ingredient volumes for {recipe.name} totaling {formatNumber(cubicFeet)} cubic feet
        </caption>
        <thead className="bg-background">
          <tr>
            <th className="px-3 py-2 font-semibold">Ingredient</th>
            <th className="px-3 py-2 font-semibold">Share</th>
            <th className="px-3 py-2 font-semibold">Cubic feet</th>
            <th className="px-3 py-2 font-semibold">Cubic yards</th>
            <th className="px-3 py-2 font-semibold">2 cu ft bags</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.name} className="border-t border-border align-top">
              <td className="px-3 py-2">
                {line.name}
                {line.note ? (
                  <span className="mt-0.5 block text-xs text-muted">{line.note}</span>
                ) : null}
              </td>
              <td className="px-3 py-2 tabular-nums">{formatSharePercent(line.fraction)}</td>
              <td className="px-3 py-2 tabular-nums">{formatNumber(line.cubicFeet)}</td>
              <td className="px-3 py-2 tabular-nums">{formatNumber(line.cubicYards, 3)}</td>
              <td className="px-3 py-2 tabular-nums">{formatInteger(line.bagsAt2CuFt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Smaller pot volumes — dry quarts beat cubic yards. */
export function PottingMixBreakdown({
  cubicFeet,
  recipe,
}: {
  cubicFeet: number;
  recipe: MixRecipe;
}) {
  const lines = splitSoilMix(cubicFeet, recipe);

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-left text-sm">
        <caption className="sr-only">
          Potting mix ingredients for {recipe.name} totaling {formatNumber(cubicFeet)} cubic feet
        </caption>
        <thead className="bg-background">
          <tr>
            <th className="px-3 py-2 font-semibold">Ingredient</th>
            <th className="px-3 py-2 font-semibold">Share</th>
            <th className="px-3 py-2 font-semibold">Cubic feet</th>
            <th className="px-3 py-2 font-semibold">Dry quarts</th>
            <th className="px-3 py-2 font-semibold">2 cu ft bags</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.name} className="border-t border-border align-top">
              <td className="px-3 py-2">
                {line.name}
                {line.note ? (
                  <span className="mt-0.5 block text-xs text-muted">{line.note}</span>
                ) : null}
              </td>
              <td className="px-3 py-2 tabular-nums">{formatSharePercent(line.fraction)}</td>
              <td className="px-3 py-2 tabular-nums">{formatNumber(line.cubicFeet)}</td>
              <td className="px-3 py-2 tabular-nums">
                {formatNumber(cubicFeetToDryQuarts(line.cubicFeet), 1)}
              </td>
              <td className="px-3 py-2 tabular-nums">{formatInteger(line.bagsAt2CuFt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function MixRecipePicker({
  recipes,
  selectedId,
  onChange,
  name = "soil-mix-recipe",
}: {
  recipes: MixRecipe[];
  selectedId: string;
  onChange: (id: string) => void;
  name?: string;
}) {
  return (
    <fieldset>
      <legend className="text-sm font-medium">Choose a starting recipe</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {recipes.map((recipe) => (
          <label
            key={recipe.id}
            className={`flex min-h-10 cursor-pointer items-center rounded-full border px-3 py-1.5 text-sm ${
              selectedId === recipe.id
                ? "border-accent bg-accent text-white"
                : "border-border bg-card"
            }`}
          >
            <input
              type="radio"
              className="sr-only"
              name={name}
              value={recipe.id}
              checked={selectedId === recipe.id}
              onChange={() => onChange(recipe.id)}
            />
            {recipe.name}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function MixNotes() {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
      <li>
        <strong className="font-medium text-foreground">Topsoil belongs in raised beds</strong>, not
        ordinary pots. Open-bottom frames can also connect to loosened native soil underneath;
        closed-bottom planters depend entirely on what you put in the box.
      </li>
      <li>
        <strong className="font-medium text-foreground">Do not fill the bed with compost alone.</strong>{" "}
        Finished plant-based compost is a share of the mix. Newly filled beds may sink as organic
        matter decomposes — water the fill, then top off.
      </li>
      <li>
        Bagged garden soil and native yard soil are{" "}
        <strong className="font-medium text-foreground">not identical</strong>. Local topsoil texture
        and drainage differ; screen rocks when you can and prefer plant-based finished compost.
      </li>
      <li>
        These two presets are practical points inside University of Minnesota Extension’s raised-bed
        range, not universal prescriptions. See{" "}
        <Link href="/guides/best-soil-mix-for-raised-beds" className="font-medium text-accent hover:underline">
          best soil mix for raised beds
        </Link>
        .
      </li>
    </ul>
  );
}

export function PottingMixNotes() {
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
      <li>
        <strong className="font-medium text-foreground">Do not use garden soil or topsoil in pots.</strong>{" "}
        They are too heavy for ordinary containers and elevated garden boxes. Save screened topsoil for
        raised beds.
      </li>
      <li>
        <strong className="font-medium text-foreground">Equal-parts soilless mix</strong> follows a
        Penn State Extension documented starting recipe of equal parts finished compost, vermiculite,
        and peat moss. Coconut coir is sometimes used as a peat substitute; that Extension formula
        names peat moss.
      </li>
      <li>
        <strong className="font-medium text-foreground">Commercial-mix blend</strong> follows a
        University of Georgia Extension suggested starting mixture of half commercial soilless potting
        mix and half finished compost. Read the bag label — brands and fertilizer charges differ.
        Local prices determine cost.
      </li>
      <li>
        Compost and base mixes vary in fertility. Follow product labels and watch plant response
        rather than inventing fertilizer amounts. Compressed peat expands when wet — plan from the
        hydrated volume on the label.
      </li>
      <li>
        See{" "}
        <Link href="/guides/potting-mix-vs-garden-soil" className="font-medium text-accent hover:underline">
          potting mix vs garden soil
        </Link>{" "}
        and{" "}
        <Link href="/guides/growing-vegetables-in-containers" className="font-medium text-accent hover:underline">
          growing vegetables in containers
        </Link>
        .
      </li>
    </ul>
  );
}
