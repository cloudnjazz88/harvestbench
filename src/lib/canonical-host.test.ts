import { describe, expect, test } from "vitest";
import {
  PRODUCTION_APEX_HOST,
  PRODUCTION_WWW_HOST,
  canonicalizeProductionUrl,
} from "@/lib/canonical-host";

function href(value: string): string | null {
  const result = canonicalizeProductionUrl(new URL(value));
  return result ? result.href : null;
}

describe("production host canonicalization", () => {
  test("redirects only www.harvestbench.com to the HTTPS apex", () => {
    expect(PRODUCTION_WWW_HOST).toBe("www.harvestbench.com");
    expect(PRODUCTION_APEX_HOST).toBe("harvestbench.com");
    expect(href("https://www.harvestbench.com/")).toBe("https://harvestbench.com/");
    expect(href("https://www.harvestbench.com/watering?source=test")).toBe(
      "https://harvestbench.com/watering?source=test",
    );
    expect(href("http://www.harvestbench.com/calculators/fertilizer")).toBe(
      "https://harvestbench.com/calculators/fertilizer",
    );
  });

  test("does not redirect apex, local, or preview hosts", () => {
    expect(href("https://harvestbench.com/")).toBeNull();
    expect(href("https://harvestbench.com/watering?source=test")).toBeNull();
    expect(href("http://harvestbench.com/")).toBeNull();
    expect(href("http://localhost:3000/")).toBeNull();
    expect(href("http://127.0.0.1:4177/guides")).toBeNull();
    expect(href("https://harvestbench.pages.dev/")).toBeNull();
    expect(href("https://8a808ec6.harvestbench.pages.dev/privacy")).toBeNull();
    expect(href("https://example.workers.dev/")).toBeNull();
  });

  test("never uses x-forwarded-proto", () => {
    expect(canonicalizeProductionUrl.toString()).not.toMatch(/x-forwarded-proto/i);
  });
});
