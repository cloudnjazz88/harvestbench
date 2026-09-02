import { describe, expect, test } from "vitest";
import { amazonAssociatesEnabled } from "@/data/affiliates";
import { getCalculator } from "@/data/calculators";
import { getGuide } from "@/data/guides";
import { pottingMixRecipes } from "@/data/pottingMixes";
import {
  sourceOsuCompost,
  sourcePsuPottingMedia,
  sourceUgaHomeGardenSoil,
  sourceUmnContainers,
  sourceUmnRaisedBeds,
} from "@/data/raisedBedSources";
import {
  recipeFractionsTotal,
  soilMixRecipes,
  splitSoilMix,
} from "@/data/soilMixes";
import { calculateRaisedBedSoil } from "@/lib/calculations";
import { readFileSync } from "node:fs";
import path from "node:path";

const FORBIDDEN =
  /Backyard blend|Budget blend|\bClassic:|\bBudget:|classic-soilless|30%\s*finished compost,\s*30%|40%\s*screened topsoil or high-quality|50%\s*screened topsoil or garden soil|35%\s*finished compost|10%\s*coarse horticultural perlite|Mel.?s Mix|30\/30\/30\/10|40\/30\/10\/10\/10|50\/35\/5\/5\/5|50\/20\/20\/10/i;

function calculatorPublicText(id: Parameters<typeof getCalculator>[0]): string {
  const calc = getCalculator(id);
  return [
    calc.intro,
    calc.formula,
    calc.example.title,
    calc.example.body,
    ...calc.faqs.flatMap((item) => [item.question, item.answer]),
  ].join("\n");
}

function guidePublicText(slug: string): string {
  const guide = getGuide(slug);
  if (!guide) return "";
  return [
    guide.title,
    guide.description,
    guide.intro,
    ...guide.body.flatMap((block) => {
      if ("text" in block && block.text) return [block.text];
      if ("items" in block && block.items) return block.items;
      if ("rows" in block && block.rows) return block.rows.flat();
      if ("title" in block && block.title) return [block.title];
      return [];
    }),
    ...guide.faqs.flatMap((item) => [item.question, item.answer]),
  ].join("\n");
}

describe("source-backed soil mix recipes", () => {
  test("old unsupported ratios and preset names are absent from public calculator and guide content", () => {
    const blob = [
      calculatorPublicText("raised-bed-soil"),
      calculatorPublicText("potting-mix"),
      calculatorPublicText("compost"),
      guidePublicText("potting-mix-vs-garden-soil"),
      guidePublicText("best-soil-mix-for-raised-beds"),
      guidePublicText("how-much-soil-does-a-raised-bed-need"),
      guidePublicText("how-to-prepare-a-raised-bed"),
      ...soilMixRecipes.map((recipe) => `${recipe.id} ${recipe.name}`),
      ...pottingMixRecipes.map((recipe) => `${recipe.id} ${recipe.name}`),
    ].join("\n");

    expect(blob).not.toMatch(FORBIDDEN);
  });

  test("potting presets total 100%", () => {
    expect(pottingMixRecipes).toHaveLength(2);
    const equalParts = pottingMixRecipes.find((recipe) => recipe.id === "equal-parts-soilless");
    const commercial = pottingMixRecipes.find((recipe) => recipe.id === "commercial-mix-blend");
    expect(equalParts?.name).toBe("Equal-parts soilless mix");
    expect(commercial?.name).toBe("Commercial-mix blend");
    expect(recipeFractionsTotal(equalParts!)).toBeCloseTo(1, 10);
    expect(equalParts!.ingredients.map((item) => item.fraction)).toEqual([1 / 3, 1 / 3, 1 / 3]);
    expect(recipeFractionsTotal(commercial!)).toBeCloseTo(1, 10);
    expect(commercial!.ingredients.map((item) => item.fraction)).toEqual([0.5, 0.5]);
  });

  test("raised-bed presets total 100%", () => {
    expect(soilMixRecipes).toHaveLength(2);
    const balanced = soilMixRecipes.find((recipe) => recipe.id === "balanced");
    const moreTopsoil = soilMixRecipes.find((recipe) => recipe.id === "more-topsoil");
    expect(balanced?.name).toBe("Balanced raised-bed mix");
    expect(moreTopsoil?.name).toBe("More-topsoil mix");
    expect(recipeFractionsTotal(balanced!)).toBeCloseTo(1, 10);
    expect(balanced!.ingredients.map((item) => item.fraction)).toEqual([0.6, 0.4]);
    expect(recipeFractionsTotal(moreTopsoil!)).toBeCloseTo(1, 10);
    expect(moreTopsoil!.ingredients.map((item) => item.fraction)).toEqual([2 / 3, 1 / 3]);
  });

  test("ingredient volumes sum back to the requested total", () => {
    const total = 32;
    for (const recipe of [...soilMixRecipes, ...pottingMixRecipes]) {
      const lines = splitSoilMix(total, recipe);
      const sum = lines.reduce((acc, line) => acc + line.cubicFeet, 0);
      expect(sum, recipe.id).toBeCloseTo(total, 10);
    }
  });

  test("ordinary potting presets contain no native garden soil or topsoil", () => {
    for (const recipe of pottingMixRecipes) {
      for (const ingredient of recipe.ingredients) {
        expect(ingredient.name, recipe.id).not.toMatch(/garden soil|topsoil/i);
      }
      expect(recipe.summary, recipe.id).toMatch(/soilless|potting/i);
    }
  });

  test("raised-bed presets are not pure compost", () => {
    for (const recipe of soilMixRecipes) {
      expect(recipe.ingredients.length).toBeGreaterThan(1);
      const compostShare = recipe.ingredients
        .filter((item) => /compost/i.test(item.name))
        .reduce((sum, item) => sum + item.fraction, 0);
      expect(compostShare).toBeLessThan(1);
      expect(recipe.summary).toMatch(/not|starting|range/i);
    }
  });

  test("relevant Extension sources render on the two guides and calculator pages", () => {
    const pottingCalc = getCalculator("potting-mix");
    const raisedCalc = getCalculator("raised-bed-soil");
    const pottingGuide = getGuide("potting-mix-vs-garden-soil");
    const raisedGuide = getGuide("best-soil-mix-for-raised-beds");

    expect(pottingCalc.sources?.map((item) => item.url)).toEqual([
      sourcePsuPottingMedia.url,
      sourceUmnContainers.url,
      sourceUgaHomeGardenSoil.url,
    ]);
    expect(raisedCalc.sources?.map((item) => item.url)).toContain(sourceUmnRaisedBeds.url);
    expect(raisedCalc.sources?.map((item) => item.url)).toContain(sourceOsuCompost.url);
    expect(pottingGuide?.sources?.map((item) => item.url)).toEqual([
      sourcePsuPottingMedia.url,
      sourceUmnContainers.url,
      sourceUgaHomeGardenSoil.url,
    ]);
    expect(raisedGuide?.sources?.map((item) => item.url)).toEqual([
      sourceUmnRaisedBeds.url,
      sourceOsuCompost.url,
    ]);
  });

  test("compost calculator no longer references the removed Backyard preset", () => {
    const text = calculatorPublicText("compost");
    expect(text).not.toMatch(/Backyard/i);
    expect(text).toMatch(/Balanced raised-bed mix \(40% compost\)/);
  });

  test("Amazon and AdSense remain inactive in source", () => {
    expect(amazonAssociatesEnabled).toBe(false);
    const affiliates = readFileSync(path.join(process.cwd(), "src/data/affiliates.ts"), "utf8");
    const adsense = readFileSync(
      path.join(process.cwd(), "src/components/ads/AdSenseScript.tsx"),
      "utf8",
    );
    expect(affiliates).not.toMatch(/amazon\.com|amzn\.to/i);
    expect(adsense).not.toMatch(/ca-pub-/);
  });

  test("existing raised-bed volume and bag-count behavior remains correct", () => {
    const one = calculateRaisedBedSoil({
      length: 8,
      lengthUnit: "ft",
      width: 4,
      widthUnit: "ft",
      depth: 12,
      depthUnit: "in",
      beds: 1,
      bagSize: 1.5,
    });
    expect(one.cubicFeet).toBe(32);
    expect(one.bags).toBe(22);
    const balanced = splitSoilMix(one.cubicFeet, soilMixRecipes[0]);
    expect(balanced[0].cubicFeet).toBeCloseTo(19.2, 10);
    expect(balanced[1].cubicFeet).toBeCloseTo(12.8, 10);
  });
});
