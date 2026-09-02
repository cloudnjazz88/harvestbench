import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { amazonAssociatesEnabled } from "@/data/affiliates";
import { topicGuides } from "@/data/guidesTopics";
import { getPest } from "@/data/pests";
import { getIndexablePagePaths } from "@/data/routes";
import { primaryNav } from "@/data/site";

const root = process.cwd();

describe("navigation and pest discovery links", () => {
  test("Containers shortLabel preserves full label and destination", () => {
    const item = primaryNav.find((entry) => entry.href === "/container-gardening");
    expect(item).toBeDefined();
    expect(item?.label).toBe("Container Gardening");
    expect(item?.shortLabel).toBe("Containers");
    expect(primaryNav).toHaveLength(11);
    expect(new Set(primaryNav.map((entry) => entry.href)).size).toBe(11);
  });

  test("homepage pest panel points to the hub and key pest cards", () => {
    const page = readFileSync(path.join(root, "src/app/page.tsx"), "utf8");
    expect(page).toContain('title="Pest & plant problems"');
    expect(page).toContain('href="/pest-problems"');
    expect(page).toContain(
      'body="Photos, controls, and product types for common garden pests — plus blossom-end rot."',
    );
    expect(page).toContain('{ href: "/pest-problems/aphids", label: "Aphids" }');
    expect(page).toContain(
      '{ href: "/pest-problems/tomato-hornworm", label: "Tomato hornworms" }',
    );
    expect(page).toContain('{ href: "/guides/blossom-end-rot", label: "Blossom-end rot" }');
    expect(getIndexablePagePaths()).toContain("/pest-problems");
    expect(getIndexablePagePaths()).toContain("/pest-problems/aphids");
    expect(getIndexablePagePaths()).toContain("/pest-problems/tomato-hornworm");
  });

  test("aphid and hornworm guides link to existing pest cards", () => {
    expect(getPest("aphids")?.name).toBe("Aphids");
    expect(getPest("tomato-hornworm")?.name).toMatch(/Tomato Hornworm/i);

    const aphidsGuide = topicGuides.find((guide) => guide.slug === "aphids-on-vegetable-plants");
    const hornwormGuide = topicGuides.find((guide) => guide.slug === "tomato-hornworms");

    expect(aphidsGuide?.relatedTools).toEqual([
      { href: "/pest-problems/aphids", label: "Aphids pest card (photo + products)" },
      { href: "/pest-problems", label: "Pest & plant problems hub" },
    ]);
    expect(hornwormGuide?.relatedTools).toEqual([
      { href: "/pest-problems/tomato-hornworm", label: "Tomato hornworm pest card" },
      { href: "/pest-problems", label: "Pest & plant problems hub" },
    ]);
  });

  test("Amazon remains inactive", () => {
    expect(amazonAssociatesEnabled).toBe(false);
  });
});
