import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { headerNav, primaryNav } from "@/data/site";

const header = readFileSync(
  path.join(process.cwd(), "src/components/layout/Header.tsx"),
  "utf8",
);
const mobileNav = header.slice(header.indexOf("function MobileNav"));
const buttonWrapper = mobileNav.slice(
  mobileNav.indexOf("absolute right-4"),
  mobileNav.indexOf("createPortal"),
);
const openPanel = mobileNav.slice(mobileNav.indexOf("createPortal"));

describe("mobile navigation overflow", () => {
  test("desktop nav shows five primary destinations and mobile keeps all 11", () => {
    expect(primaryNav).toHaveLength(11);
    expect(headerNav).toHaveLength(5);
    expect(headerNav.map((item) => item.href)).toEqual([
      "/calculators",
      "/guides",
      "/vegetable-gardening",
      "/pest-problems",
      "/about",
    ]);
    expect(header).toContain('aria-label="Primary"');
    expect(header).toContain("lg:flex");
    expect(header).toContain("lg:hidden");
    expect(header).toContain("{headerNav.map");
    expect(header).toContain("{primaryNav.map");
  });

  test("open drawer is not trapped by the hamburger transform containing block", () => {
    expect(buttonWrapper).toContain("-translate-y-1/2");
    expect(buttonWrapper).toContain("aria-expanded");
    expect(buttonWrapper).toContain("aria-controls");
    expect(buttonWrapper).not.toContain("id={menuId}");
    expect(buttonWrapper).not.toContain('aria-label="Mobile"');
    expect(openPanel).toContain("id={menuId}");
    expect(openPanel).toContain("createPortal");
    expect(openPanel).toContain("document.body");
    expect(openPanel).toContain("fixed");
    expect(openPanel).toContain("right-0");
    expect(openPanel).toContain("translate-x-0");
    expect(openPanel).toContain("max-w-[100vw]");
    expect(openPanel).toContain("box-border");
    expect(openPanel).not.toContain("inset-x-0");
    expect(openPanel).not.toContain("left-full");
    expect(openPanel).not.toContain("left-0");
    expect(openPanel).not.toContain("translate-x-full");
    expect(openPanel).not.toContain("-translate-y-1/2");
  });
});

describe("mobile navigation close behavior", () => {
  test("opens and closes from the trigger button and updates aria-expanded", () => {
    expect(buttonWrapper).toContain("aria-expanded={open}");
    expect(buttonWrapper).toContain("onClick={() => (open ? closeMenu() : setOpen(true))}");
    expect(mobileNav).toContain("Close menu");
    expect(mobileNav).toContain("Open menu");
  });

  test("Escape and backdrop click close the menu; drawer clicks do not", () => {
    expect(mobileNav).toContain('if (event.key === "Escape") closeMenu()');
    expect(openPanel).toContain('aria-label="Close menu"');
    expect(openPanel).toContain("fixed inset-0");
    expect(openPanel).toContain("onClick={closeMenu}");
    expect(openPanel).toContain("onClick={(event) => event.stopPropagation()}");
    expect(openPanel).toContain("requestAnimationFrame(() => setOpen(false))");
  });

  test("mouse leave no longer closes the menu", () => {
    expect(mobileNav).not.toContain("onMouseEnter");
    expect(mobileNav).not.toContain("onMouseLeave");
    expect(mobileNav).not.toContain("scheduleClose");
    expect(mobileNav).not.toContain("openMenu");
    expect(mobileNav).not.toContain("closeTimer");
  });

  test("closing restores focus to the trigger button", () => {
    expect(mobileNav).toContain("triggerRef");
    expect(mobileNav).toContain("triggerRef.current?.focus()");
    expect(mobileNav).toContain("queueMicrotask");
    expect(buttonWrapper).toContain("ref={triggerRef}");
  });
});
