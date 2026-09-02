import { describe, expect, test } from "vitest";
import { getCalculator } from "@/data/calculators";
import { getGuide } from "@/data/guides";
import {
  sourceOsuCompost,
  sourceOsuRaisedBeds,
  sourceUgaBudgetBed,
  sourceUmnRaisedBeds,
} from "@/data/raisedBedSources";
import { AMAZON_ASSOCIATE_DISCLOSURE } from "@/data/affiliates";
import { getReadyProducts } from "@/data/products";
import { calculateRaisedBedSoil } from "@/lib/calculations";
import { cubicFeetToYards } from "@/lib/units";

const EXTENSION_HOSTS = [
  "extension.umn.edu",
  "extension.oregonstate.edu",
  "site.extension.uga.edu",
];

describe("4 × 8 × 12-inch raised-bed volume", () => {
  test("equals 32 cubic feet and about 1.19 cubic yards", () => {
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
    expect(one.cubicYards).toBeCloseTo(32 / 27, 10);
    expect(one.cubicYards.toFixed(2)).toBe("1.19");
    expect(cubicFeetToYards(32).toFixed(2)).toBe("1.19");
    expect(one.bags).toBe(22);

    const two = calculateRaisedBedSoil({
      length: 8,
      lengthUnit: "ft",
      width: 4,
      widthUnit: "ft",
      depth: 12,
      depthUnit: "in",
      beds: 2,
      bagSize: 1.5,
    });
    expect(two.cubicFeet).toBe(64);
    expect(two.bags).toBe(43);
  });
});

describe("raised-bed cluster sources", () => {
  test("source sections have data only when sources exist", () => {
    expect(getCalculator("raised-bed-soil").sources?.length).toBeGreaterThan(0);
    expect(getGuide("how-much-soil-does-a-raised-bed-need")?.sources?.length).toBeGreaterThan(0);
    expect(getGuide("how-deep-should-a-raised-bed-be")?.sources?.length).toBeGreaterThan(0);
    expect(getCalculator("fertilizer").sources).toBeUndefined();
    expect(getGuide("hugelkultur-in-raised-beds")?.sources).toBeUndefined();
  });

  test("source URLs and organizations are preserved", () => {
    expect(sourceUmnRaisedBeds).toEqual({
      title: "Raised bed gardens",
      organization: "University of Minnesota Extension",
      url: "https://extension.umn.edu/garden-and-home/yard-and-garden/gardening-in-minnesota/raised-bed-gardens",
    });
    expect(sourceOsuRaisedBeds.organization).toBe("Oregon State University Extension");
    expect(sourceOsuCompost.url).toBe(
      "https://extension.oregonstate.edu/catalog/em-9308-how-use-compost-gardens-landscapes",
    );
    expect(sourceUgaBudgetBed.organization).toBe("University of Georgia Extension");

    const depth = getGuide("how-deep-should-a-raised-bed-be")?.sources ?? [];
    expect(depth.map((item) => item.url)).toEqual([
      sourceOsuRaisedBeds.url,
      sourceOsuCompost.url,
      sourceUgaBudgetBed.url,
    ]);
  });

  test("these pages do not add Amazon disclosure, product cards, or extra ad configuration", () => {
    const soil = getCalculator("raised-bed-soil");
    const volumeGuide = getGuide("how-much-soil-does-a-raised-bed-need");
    const depthGuide = getGuide("how-deep-should-a-raised-bed-be");
    const blob = [
      soil.intro,
      soil.formula,
      soil.example.body,
      ...soil.faqs.flatMap((item) => [item.question, item.answer]),
      volumeGuide?.intro,
      depthGuide?.intro,
      ...(volumeGuide?.sources ?? []).map((item) => item.title),
      ...(depthGuide?.sources ?? []).map((item) => item.title),
    ].join("\n");

    expect(blob).not.toContain(AMAZON_ASSOCIATE_DISCLOSURE);
    expect(getReadyProducts(volumeGuide?.products ?? [])).toEqual([]);
    expect(getReadyProducts(depthGuide?.products ?? [])).toEqual([]);

    for (const source of [
      ...(soil.sources ?? []),
      ...(volumeGuide?.sources ?? []),
      ...(depthGuide?.sources ?? []),
    ]) {
      expect(EXTENSION_HOSTS.some((host) => source.url.includes(host))).toBe(true);
      expect(source.url).not.toMatch(/amazon|adsense|doubleclick/i);
    }
  });
});
