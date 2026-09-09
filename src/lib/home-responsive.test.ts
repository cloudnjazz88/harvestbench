import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");
const home = readFileSync("src/app/page.tsx", "utf8");

describe("fluid homepage layout", () => {
  test("keeps the desktop cap without forcing horizontal scrolling", () => {
    expect(css).toContain("--hb-canvas: 1440px");
    expect(css).toContain("max-width: var(--hb-canvas)");
    expect(css).not.toContain("min-width: var(--hb-canvas)");
    expect(css).toMatch(/body:has\(\.hb-home\)\s*\{[^}]*width: 100%;[^}]*min-width: 0;/);
  });

  test("lets hero content grow and buttons wrap on smaller desktops", () => {
    expect(home).toContain("lg:min-h-[410px]");
    expect(home).not.toContain("lg:h-[410px]");
    expect(home).toContain("sm:flex-row sm:flex-wrap");
    expect(home).toContain("xl:grid-cols-3 xl:gap-3");
  });
});
