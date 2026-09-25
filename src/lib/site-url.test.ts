import { afterEach, describe, expect, test, vi } from "vitest";

describe("getSiteUrl", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  test("defaults to production apex when NEXT_PUBLIC_SITE_URL is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    const { getSiteUrl } = await import("@/data/site");
    expect(getSiteUrl()).toBe("https://harvestbench.com");
  });

  test("uses NEXT_PUBLIC_SITE_URL when set and strips trailing slash", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://example.com/");
    const { getSiteUrl } = await import("@/data/site");
    expect(getSiteUrl()).toBe("https://example.com");
  });
});
