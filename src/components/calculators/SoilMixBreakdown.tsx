import Link from "next/link";
import { splitSoilMix, type MixRecipe } from "@/data/soilMixes";
import { formatInteger, formatNumber } from "@/lib/format";

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
              <td className="px-3 py-2 tabular-nums">{Math.round(line.fraction * 100)}%</td>
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

export function MixRecipePicker({
  recipes,
  selectedId,
  onChange,
}: {
  recipes: MixRecipe[];
  selectedId: string;
  onChange: (id: string) => void;
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
              name="soil-mix-recipe"
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
        <strong className="font-medium text-foreground">Perlite</strong> is the white volcanic
        glass that keeps a mix from packing. It improves drainage and air around roots.{" "}
        <strong className="font-medium text-foreground">Vermiculite</strong> holds more water.
        Use horticultural coarse perlite, not fine craft-store grades.
      </li>
      <li>
        <strong className="font-medium text-foreground">Coco peat</strong> is coconut coir pith. It
        plays the same role as peat moss: hold water and keep the mix light. Use one of them in that
        slot, not a double layer of both unless you are deliberately making a wetter mix.
      </li>
      <li>
        Compressed coir bricks and peat bales expand when wet. Buy by the{" "}
        <strong className="font-medium text-foreground">hydrated / loose volume on the label</strong>
        , not the dry brick size. The 2 cu ft bag column is only a planning estimate.
      </li>
      <li>
        These ratios are starting points. Climate, drainage, and compost quality matter more than
        hitting 30.0% exactly. See{" "}
        <Link href="/guides/best-soil-mix-for-raised-beds" className="font-medium text-accent hover:underline">
          best soil mix for raised beds
        </Link>
        .
      </li>
    </ul>
  );
}
