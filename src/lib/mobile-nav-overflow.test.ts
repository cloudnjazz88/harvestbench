import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { amazonAssociatesEnabled } from "@/data/affiliates";
import { primaryNav } from "@/data/site";

const header = readFileSync(
  path.join(process.cwd(), "src/components/layout/Header.tsx"),
  "utf8",
);
const mobileNav = header.slice(header.indexOf("function MobileNav"));
const buttonWrapper = mobileNav.slice(
  mobileNav.indexOf("absolute right-4"),
  mobileNav.indexOf("{open ?"),
);
const openPanel = mobileNav.slice(mobileNav.indexOf("{open ?"));

describe("mobile navigation overflow", () => {
  test("desktop nav still has all 11 destinations", () => {
    expect(primaryNav).toHaveLength(11);
    expect(header).toContain('aria-label="Primary"');
    expect(header).toContain("xl:flex");
    expect(header).toContain("xl:hidden");
  });

  test("open drawer is not trapped by the hamburger transform containing block", () => {
    expect(buttonWrapper).toContain("-translate-y-1/2");
    expect(buttonWrapper).toContain("aria-expanded");
    expect(buttonWrapper).toContain("aria-controls");
    expect(buttonWrapper).toContain("onMouseEnter={openMenu}");
    expect(buttonWrapper).toContain("onMouseLeave={scheduleClose}");
    expect(buttonWrapper).not.toContain("id={menuId}");
    expect(buttonWrapper).not.toContain('aria-label="Mobile"');
    expect(openPanel).toContain("id={menuId}");
    expect(openPanel).toContain("fixed");
    expect(openPanel).toContain("right-0");
    expect(openPanel).toContain("translate-x-0");
    expect(openPanel).toContain("max-w-[100vw]");
    expect(openPanel).toContain("box-border");
    expect(openPanel).toContain("onMouseEnter={openMenu}");
    expect(openPanel).toContain("onMouseLeave");
    expect(openPanel).not.toContain("inset-x-0");
    expect(openPanel).not.toContain("left-full");
    expect(openPanel).not.toContain("left-0");
    expect(openPanel).not.toContain("translate-x-full");
    expect(openPanel).not.toContain("-translate-y-1/2");
  });

  test("Amazon remains inactive", () => {
    expect(amazonAssociatesEnabled).toBe(false);
  });
});
