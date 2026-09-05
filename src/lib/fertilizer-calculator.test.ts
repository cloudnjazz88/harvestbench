import { readFileSync } from "node:fs";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import { FertilizerCalculator } from "@/components/calculators/FertilizerCalculator";
import { getCalculator } from "@/data/calculators";
import { getFertilizerChoice, getFeedingLevel } from "@/data/fertilizerProfiles";
import {
  calculateFertilizer,
  fertilizerSurfaceAreaSqFt,
  parseNumber,
  validateFertilizer,
  type FertilizerInput,
} from "@/lib/calculations";
import { formatContainerSize, formatKitchenSpoons, formatNumber } from "@/lib/format";

const root = process.cwd();
const calculatorSource = readFileSync(
  path.join(root, "src/components/calculators/FertilizerCalculator.tsx"),
  "utf8",
);

const LIGHT_N = getFeedingLevel("light").lbNPer1000;
const TYPICAL_N = getFeedingLevel("typical").lbNPer1000;

function bedInput(overrides: Partial<FertilizerInput> = {}): FertilizerInput {
  return {
    spaceType: "bed",
    length: 8,
    lengthUnit: "ft",
    width: 4,
    widthUnit: "ft",
    potDiameter: 12,
    potDiameterUnit: "in",
    pots: 1,
    nitrogenPercent: 10,
    phosphorusPercent: 10,
    potassiumPercent: 10,
    targetNitrogenLbsPer1000: LIGHT_N,
    ...overrides,
  };
}

function potInput(overrides: Partial<FertilizerInput> = {}): FertilizerInput {
  return bedInput({ spaceType: "pot", ...overrides });
}

describe("fertilizer surface-area formula (preserved)", () => {
  test("default 8 × 4 ft Light 10-10-10 uses 32 sq ft and 0.15 lb N / 1,000 sq ft", () => {
    const result = calculateFertilizer(bedInput());
    expect(result.areaSqFt).toBe(32);
    expect(LIGHT_N).toBe(0.15);
    expect(result.nitrogenLbsNeeded).toBeCloseTo((32 / 1000) * 0.15, 12);
    expect(result.productLbs).toBeCloseTo(0.048, 12);
    expect(result.productOz).toBeCloseTo(0.768, 12);

    const spoons = formatKitchenSpoons(result.productOz);
    expect(spoons.heroValue).toBe("1");
    expect(spoons.heroUnit).toBe("Tbsp");
    expect(spoons.detail).toContain("1.5 tsp");
    expect(spoons.detail).toContain("0.8 oz");
  });

  test("omitting spaceType keeps the original raised-bed length × width path", () => {
    const result = calculateFertilizer({
      length: 8,
      lengthUnit: "ft",
      width: 4,
      widthUnit: "ft",
      nitrogenPercent: 10,
      phosphorusPercent: 10,
      potassiumPercent: 10,
      targetNitrogenLbsPer1000: LIGHT_N,
    });
    expect(result.areaSqFt).toBe(32);
    expect(result.productOz).toBeCloseTo(0.768, 12);
  });

  test("feet/inches conversion matches the same 8 × 4 ft bed", () => {
    const inches = calculateFertilizer(
      bedInput({ length: 96, lengthUnit: "in", width: 48, widthUnit: "in" }),
    );
    const feet = calculateFertilizer(bedInput());
    expect(inches.areaSqFt).toBe(32);
    expect(inches.productOz).toBeCloseTo(feet.productOz, 12);
  });
});

describe("pot / container surface area", () => {
  test("one 12-inch pot is π × (0.5 ft)² and uses the same N rate", () => {
    const area = Math.PI * 0.5 * 0.5;
    expect(fertilizerSurfaceAreaSqFt(potInput())).toBeCloseTo(area, 12);

    const result = calculateFertilizer(potInput());
    expect(result.areaSqFt).toBeCloseTo(area, 12);
    expect(result.nitrogenLbsNeeded).toBeCloseTo((area / 1000) * 0.15, 12);
    expect(result.productLbs).toBeCloseTo(result.nitrogenLbsNeeded / 0.1, 12);
    expect(result.productOz).toBeCloseTo(result.productLbs * 16, 12);
    expect(result.productOz).toBeGreaterThan(0);

    const spoons = formatKitchenSpoons(result.productOz);
    expect(spoons.heroValue).not.toBe("0");
    expect(spoons.heroValue).not.toBe("—");
    expect(spoons.heroUnit).toBe("tsp");
    expect(spoons.detail).not.toMatch(/\b0 oz\b/);
    expect(spoons.detail).toMatch(/0\.0[1-9] oz|under 0\.01 oz/);
  });

  test("three 12-inch pots scale the area and product linearly", () => {
    const one = calculateFertilizer(potInput({ pots: 1 }));
    const three = calculateFertilizer(potInput({ pots: 3 }));
    expect(three.areaSqFt).toBeCloseTo(one.areaSqFt * 3, 12);
    expect(three.productOz).toBeCloseTo(one.productOz * 3, 12);
  });

  test("30.48 cm equals a 12-inch pot", () => {
    const inches = calculateFertilizer(potInput({ potDiameter: 12, potDiameterUnit: "in" }));
    const cm = calculateFertilizer(potInput({ potDiameter: 30.48, potDiameterUnit: "cm" }));
    expect(cm.areaSqFt).toBeCloseTo(inches.areaSqFt, 10);
    expect(cm.productOz).toBeCloseTo(inches.productOz, 10);
  });

  test("pot math does not use depth or soil volume", () => {
    const source = readFileSync(path.join(root, "src/lib/calculations.ts"), "utf8");
    const potBlock = source.slice(
      source.indexOf("export function fertilizerSurfaceAreaSqFt"),
      source.indexOf("function validateFertilizerAnalysis"),
    );
    expect(potBlock).toContain("Math.PI");
    expect(potBlock).not.toMatch(/depth|volume|cubic/i);
  });
});

describe("container size copy", () => {
  test("uses singular pot and plural pots", () => {
    expect(formatContainerSize(1, 12, "in")).toBe("1 × 12-inch pot");
    expect(formatContainerSize(3, 12, "in")).toBe("3 × 12-inch pots");
    expect(formatContainerSize(1, 30, "cm")).toBe("1 × 30-cm pot");
  });

  test("avoids a trailing .0 on whole diameters and rejects empty sizes", () => {
    expect(formatContainerSize(1, 12.0, "in")).toBe("1 × 12-inch pot");
    expect(formatContainerSize(2, 12.5, "in")).toBe("2 × 12.5-inch pots");
    expect(formatContainerSize(0, 12, "in")).toBe("—");
    expect(formatContainerSize(1, -4, "in")).toBe("—");
  });
});

describe("validation and rounding", () => {
  test("rejects 0, negative, empty, and NaN space inputs", () => {
    expect(validateFertilizer(bedInput({ length: 0 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "length" })]),
    );
    expect(validateFertilizer(bedInput({ width: -2 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "width" })]),
    );
    expect(validateFertilizer(bedInput({ length: Number.NaN }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "length" })]),
    );
    expect(validateFertilizer(potInput({ potDiameter: 0 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "potDiameter" })]),
    );
    expect(validateFertilizer(potInput({ pots: 0 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "pots" })]),
    );
    expect(validateFertilizer(potInput({ pots: 1.5 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "pots" })]),
    );
    expect(parseNumber("")).toBeNull();
    expect(parseNumber("not-a-number")).toBeNull();
  });

  test("rejects oversized beds and pots", () => {
    expect(validateFertilizer(bedInput({ length: 600 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "length" })]),
    );
    expect(validateFertilizer(potInput({ potDiameter: 80 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "potDiameter" })]),
    );
    expect(validateFertilizer(potInput({ pots: 51 }))).toEqual(
      expect.arrayContaining([expect.objectContaining({ field: "pots" })]),
    );
  });

  test("tiny pots do not format as 0 or NaN", () => {
    const tiny = calculateFertilizer(potInput({ potDiameter: 2 }));
    expect(Number.isFinite(tiny.productOz)).toBe(true);
    expect(tiny.productOz).toBeGreaterThan(0);
    const spoons = formatKitchenSpoons(tiny.productOz);
    expect(spoons.heroValue).not.toBe("0");
    expect(spoons.heroValue).not.toMatch(/NaN/i);
    expect(spoons.heroUnit).toBe("tsp");
  });

  test("invalid ounces stay blank instead of showing 0", () => {
    expect(formatKitchenSpoons(0).heroValue).toBe("—");
    expect(formatKitchenSpoons(-1).heroValue).toBe("—");
    expect(formatKitchenSpoons(Number.NaN).heroValue).toBe("—");
  });

  test("bed size display stays a short sq ft figure", () => {
    expect(formatNumber(32)).toBe("32");
    expect(formatNumber(Math.PI * 0.25, 1)).toBe("0.8");
  });
});

describe("space type does not change crop recommendation or N-P-K math inputs", () => {
  test("crop bag type depends only on crop id", () => {
    const mixed = getFertilizerChoice("mixed");
    const tomatoes = getFertilizerChoice("tomatoes");
    expect(mixed.bias).toBe("balanced");
    expect(tomatoes.bias).toBe("high-k");
    expect(calculatorSource).toContain("getFertilizerChoice(cropId)");
    expect(calculatorSource).not.toMatch(/getFertilizerChoice\([^)]*spaceType/);
  });

  test("switching space type in the UI only updates spaceType", () => {
    expect(calculatorSource).toContain('onChange={() => setSpaceType(option.id)}');
    expect(calculatorSource).not.toMatch(/setSpaceType\([^)]+\)[\s\S]{0,80}setN\(/);
    expect(calculatorSource).not.toMatch(/setSpaceType\([^)]+\)[\s\S]{0,80}setFeedingId\(/);
    expect(calculatorSource).not.toMatch(/setSpaceType\([^)]+\)[\s\S]{0,80}setP\(/);
    expect(calculatorSource).not.toMatch(/setSpaceType\([^)]+\)[\s\S]{0,80}setK\(/);
  });

  test("the same N-P-K and strength produce more product on a larger surface", () => {
    const npk = {
      nitrogenPercent: 5,
      phosphorusPercent: 10,
      potassiumPercent: 10,
      targetNitrogenLbsPer1000: TYPICAL_N,
    };
    const bed = calculateFertilizer(bedInput(npk));
    const pot = calculateFertilizer(potInput(npk));
    expect(bed.areaSqFt).toBeGreaterThan(pot.areaSqFt);
    expect(bed.productLbs / bed.areaSqFt).toBeCloseTo(pot.productLbs / pot.areaSqFt, 12);
  });
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Testing-library-style query without adding a dependency. type=number is the spinbutton role. */
function getByRoleSpinbutton(html: string, name: RegExp) {
  const labels = [...html.matchAll(/<label\s+([^>]*)>([\s\S]*?)<\/label>/gi)];
  const match = labels.find((item) => name.test(item[2].replace(/<[^>]+>/g, "").trim()));
  if (!match) {
    throw new Error(`Unable to find a label matching ${name}`);
  }
  const forId = match[1].match(/\bfor="([^"]+)"/)?.[1];
  if (!forId) {
    throw new Error(`Label matching ${name} is not connected with htmlFor`);
  }
  const input = html.match(new RegExp(`<input\\b[^>]*\\bid="${escapeRegExp(forId)}"[^>]*>`, "i"))?.[0];
  if (!input) {
    throw new Error(`Unable to find spinbutton for ${name}`);
  }
  expect(input).toMatch(/type="number"/);
  return {
    id: forId,
    value: input.match(/\bvalue="([^"]*)"/)?.[1] ?? "",
  };
}

describe("fertilizer calculator first render", () => {
  const html = renderToStaticMarkup(createElement(FertilizerCalculator));

  test("amount inputs are always visible and are not an accordion", () => {
    expect(html).not.toContain("<details");
    expect(html).not.toContain("<summary");
    expect(calculatorSource).not.toContain("bagOpen");
    expect(calculatorSource).not.toContain("setBagOpen");
    expect(calculatorSource).not.toContain("onToggle");
    expect(calculatorSource).not.toContain("Optional. Open this section");
    expect(html).toContain("How much fertilizer should you use?");
    expect(html).toContain("Where are you growing?");
    expect(html).toContain("Raised bed or garden plot");
    expect(html).toContain("Pot or container");
    expect(html).toContain("How hard should this feeding be?");
    expect(html).toContain("Light");
    expect(html).toContain("Typical");
    expect(html).toContain("Stronger");
  });

  test("first render shows raised-bed defaults and both result cards", () => {
    expect(getByRoleSpinbutton(html, /bed or plot length/i).value).toBe("8");
    expect(getByRoleSpinbutton(html, /bed or plot width/i).value).toBe("4");
    expect(html).toContain("feet");
    expect(html).toContain("Bag to look for");
    expect(html).toContain("How much to apply");
    expect(html).toContain("Start with about");
    expect(html).toContain("1");
    expect(html).toContain("Tbsp");
    expect(html).toContain("32 sq ft");
  });

  test("first-render N-P-K and feeding controls use connected labels", () => {
    expect(getByRoleSpinbutton(html, /n \(1st number\)/i).value).toBe("10");
    expect(getByRoleSpinbutton(html, /p \(2nd number\)/i).value).toBe("10");
    expect(getByRoleSpinbutton(html, /k \(3rd number\)/i).value).toBe("10");
    expect(html).toMatch(/name="feeding-level"[^>]*checked/);
  });

  test("pot labels are wired the same way as other spinbuttons", () => {
    const fields = readFileSync(path.join(root, "src/components/calculators/fields.tsx"), "utf8");
    expect(fields).toContain("htmlFor={id}");
    expect(fields).toContain("id={id}");
    expect(calculatorSource).toContain('label="Pot diameter"');
    expect(calculatorSource).toContain('label="Number of pots"');
    expect(calculatorSource).toContain('{ value: "in", label: "inches" }');
    expect(calculatorSource).toContain('{ value: "cm", label: "cm" }');
    expect(calculatorSource).toContain('onChange={() => setSpaceType(option.id)}');
  });
});

describe("fertilizer calculator UX source", () => {
  test("keeps crop recommendation visible and independent of space type", () => {
    expect(calculatorSource).toContain('useState("mixed")');
    expect(calculatorSource).toContain("Bag to look for");
    expect(calculatorSource).not.toContain("I already have a bag — kitchen spoons");
    expect(calculatorSource).not.toContain("I already have a fertilizer bag");
    expect(calculatorSource).toContain("{bagPanel}");
  });

  test("amount section is a permanent heading, not a clickable summary", () => {
    expect(calculatorSource).toContain("<h2");
    expect(calculatorSource).toContain("How much fertilizer should you use?");
    expect(calculatorSource).toContain(
      "This estimate is for lightly top-dressing an established raised bed",
    );
    expect(calculatorSource).not.toMatch(/<h2[^>]*cursor-pointer/);
    expect(calculatorSource).not.toContain("<details");
    expect(calculatorSource).not.toContain("<summary");
  });

  test("reset restores crop, raised bed, pot defaults, and N-P-K without accordion state", () => {
    const reset = calculatorSource.slice(
      calculatorSource.indexOf("onReset={() => {"),
      calculatorSource.indexOf("results="),
    );
    expect(reset).toContain('setCropId("mixed")');
    expect(reset).not.toContain("setBagOpen");
    expect(reset).toContain('setSpaceType("bed")');
    expect(reset).toContain('setLength("8")');
    expect(reset).toContain('setLengthUnit("ft")');
    expect(reset).toContain('setWidth("4")');
    expect(reset).toContain('setWidthUnit("ft")');
    expect(reset).toContain('setPotDiameter("12")');
    expect(reset).toContain('setPotDiameterUnit("in")');
    expect(reset).toContain('setPots("1")');
    expect(reset).toContain('setN("10")');
    expect(reset).toContain('setP("10")');
    expect(reset).toContain('setK("10")');
    expect(reset).toContain('setFeedingId("light")');
  });

  test("keeps copy buttons, safety wording, and result labels", () => {
    const fields = readFileSync(path.join(root, "src/components/calculators/fields.tsx"), "utf8");
    expect(fields).toContain("Copy results");
    expect(fields).toContain("Copy page link");
    expect(calculatorSource).toContain("Conservative starting amount");
    expect(calculatorSource).toContain("If the bag lists a lower rate, use the bag.");
    expect(calculatorSource).toContain("If the fertilizer label lists a lower rate, follow the label.");
    expect(calculatorSource).toContain('label="Bed size"');
    expect(calculatorSource).toContain('label="Container size"');
    expect(calculatorSource).toContain("How much to apply");
    expect(calculatorSource).toContain("Surface top-dress estimate");
  });
});

describe("fertilizer calculator is a surface top-dress tool", () => {
  const html = renderToStaticMarkup(createElement(FertilizerCalculator));

  test("does not collect bed depth, pot depth, soil volume, or gallons", () => {
    expect(calculatorSource).not.toMatch(/label="[^"]*[Dd]epth"/);
    expect(calculatorSource).not.toMatch(/label="[^"]*[Vv]olume"/);
    expect(calculatorSource).not.toMatch(/label="[^"]*[Gg]allon/);
    expect(html).not.toMatch(/>Bed depth<|>Pot depth<|>Soil volume<|>Gallons</);
    expect(getByRoleSpinbutton(html, /bed or plot length/i).value).toBe("8");
    expect(getByRoleSpinbutton(html, /bed or plot width/i).value).toBe("4");
  });

  test("states it is a top-dress for established plantings, not a new-mix calculator", () => {
    const fertilizer = getCalculator("fertilizer");
    const pageText = [
      fertilizer.intro,
      fertilizer.formula,
      fertilizer.example.body,
      ...fertilizer.faqs.map((item) => `${item.question} ${item.answer}`),
    ].join("\n");
    expect(html).toContain("lightly top-dressing an established raised bed");
    expect(html).toContain("not for mixing fertilizer into new soil");
    expect(html).toContain("follow the label");
    expect(html).toContain("Bed depth is not used because this estimate is based on surface area.");
    expect(calculatorSource).toContain("Based on the container’s top surface area, not the potting-mix volume.");
    expect(calculatorSource).toContain("Surface top-dress estimate");
    expect(pageText).toContain("not fertilizer to mix into new soil or potting mix");
    expect(pageText).toContain("Bed and pot depth are not used");
    expect(pageText).toContain("follow the product label");
  });

  test("raised-bed and pot amounts stay on the existing surface-area formula", () => {
    const bed = calculateFertilizer(bedInput());
    const pot = calculateFertilizer(potInput());
    expect(bed.areaSqFt).toBe(32);
    expect(bed.productOz).toBeCloseTo(0.768, 12);
    expect(pot.areaSqFt).toBeCloseTo(Math.PI * 0.25, 12);
    expect(formatKitchenSpoons(bed.productOz).heroValue).toBe("1");
    expect(formatKitchenSpoons(pot.productOz).heroValue).toBe("0.1");
  });
});
