export type PotMaterialId = "plastic" | "ceramic" | "fabric";

export const potGallonChoices = [1, 3, 5, 7, 10, 15, 20] as const;

export const potGallonCrops: Record<number, string> = {
  1: "Basil, parsley, thyme, chives, lettuce, green onions",
  3: "Peppers, chard, kale, bush beans, a patio / determinate tomato",
  5: "Determinate tomato, eggplant, trellised cucumber, a comfortable pepper",
  7: "A larger tomato, two peppers, or a compact zucchini",
  10: "Indeterminate tomato with a cage, potatoes in a grow bag",
  15: "Indeterminate tomato that you intend to keep all season",
  20: "A small patio mix, or potatoes you will hill as they grow",
};

export const potMaterials: {
  id: PotMaterialId;
  name: string;
  short: string;
  pros: string[];
  cons: string[];
  bestFor: string;
  watering: string;
}[] = [
  {
    id: "plastic",
    name: "Plastic",
    short: "Light, cheap, holds moisture",
    pros: [
      "Light enough to move on a balcony",
      "Inexpensive, and nursery pots are easy to find",
      "Holds water longer than fabric or unglazed clay",
    ],
    cons: [
      "Can overheat in full sun on a dark pot",
      "Cheap pots get brittle after a few winters",
      "No air pruning — roots may circle if the pot is too small",
    ],
    bestFor: "Herbs, lettuce, and anything that hates drying out on a hot patio",
    watering: "Check two inches down. Plastic stays wet longer than fabric after the same rain.",
  },
  {
    id: "ceramic",
    name: "Ceramic",
    short: "Heavy, decorative; terracotta dries faster than glazed",
    pros: [
      "Stable in wind — less tipping than a light grow bag",
      "Looks finished on a porch",
      "Unglazed terracotta breathes, which herbs like rosemary and thyme often prefer",
    ],
    cons: [
      "Heavy once filled — hard to move",
      "Can crack in a hard freeze if left wet outdoors",
      "Unglazed clay dries fast in heat; glazed clay holds water more like plastic",
    ],
    bestFor: "Herbs and peppers you will not drag around; glazed pots for plants that want even moisture",
    watering: "Terracotta needs more frequent water than plastic. Glazed ceramic is closer to plastic.",
  },
  {
    id: "fabric",
    name: "Fabric (grow bag)",
    short: "Nonwoven bag; air-prunes roots, dries fast",
    pros: [
      "Air pruning reduces circling roots",
      "Light, folds for winter storage",
      "Sold in honest-ish gallon sizes (1, 3, 5, 7, 10, 15, 20)",
    ],
    cons: [
      "Dries out fast in sun and wind — the usual summer failure",
      "Can sag if the mix is too wet and heavy",
      "Needs a tray or saucer on a deck so it does not stain",
    ],
    bestFor: "Tomatoes, peppers, and potatoes when you can water often, or in a humid climate",
    watering: "Expect to water more often than plastic. Mulch the surface. Do not use garden soil — it packs in fabric.",
  },
];

export const plantInPots = [
  {
    plant: "Herbs (basil, parsley, cilantro)",
    gallons: "1–2 gal",
    material: "Plastic or glazed ceramic",
    note: "One plant per small pot, or a 3-gal mix of three herbs. Cilantro bolts in heat — afternoon shade helps.",
  },
  {
    plant: "Thyme, rosemary, oregano",
    gallons: "1–3 gal",
    material: "Terracotta or fabric",
    note: "They like the mix to dry a little. A constantly soggy plastic pot is the usual kill.",
  },
  {
    plant: "Lettuce, spinach, green onions",
    gallons: "1–3 gal",
    material: "Plastic",
    note: "Shallow roots. A wide bowl works. Keep even moisture so leaves do not turn bitter.",
  },
  {
    plant: "Peppers",
    gallons: "3–5 gal",
    material: "Plastic or fabric",
    note: "One plant. 5 gal is more comfortable in heat. Do not crowd two peppers in a 3-gal bag.",
  },
  {
    plant: "Determinate / patio tomato",
    gallons: "5 gal minimum",
    material: "Fabric or plastic",
    note: "Cage or stake. A 3-gal pot will fruit, then stall in July.",
  },
  {
    plant: "Indeterminate tomato",
    gallons: "10–15 gal",
    material: "Fabric grow bag",
    note: "Needs a real cage. 5 gal is too small for a full-season vine on a patio.",
  },
  {
    plant: "Eggplant",
    gallons: "5 gal",
    material: "Black plastic (warm roots)",
    note: "One plant. Heat lovers like a pot that warms; do not let it cook dry.",
  },
  {
    plant: "Cucumber",
    gallons: "5 gal",
    material: "Fabric or plastic",
    note: "One plant, trellis behind the pot. Bush types are easier than long vines.",
  },
  {
    plant: "Bush beans",
    gallons: "3–5 gal",
    material: "Plastic",
    note: "Several plants in a wide pot. Pole beans need a trellis and more mix.",
  },
  {
    plant: "Kale, chard",
    gallons: "3–5 gal",
    material: "Plastic or fabric",
    note: "One or two plants. Deep enough that summer heat does not cook the roots.",
  },
  {
    plant: "Zucchini / summer squash",
    gallons: "7–10 gal",
    material: "Fabric",
    note: "One plant only. These are thirsty and sprawl. A 5-gal pot is usually too small.",
  },
  {
    plant: "Potatoes",
    gallons: "10 gal grow bag",
    material: "Fabric",
    note: "Start with a few inches of mix, hill as vines grow. Do not use a sealed ceramic crock with no drainage.",
  },
  {
    plant: "Carrots",
    gallons: "Deep 3–5 gal",
    material: "Plastic (deep)",
    note: "Depth matters more than gallons. Need a loose column; skip fat terracotta bowls.",
  },
  {
    plant: "Strawberries",
    gallons: "3 gal or a wide planter",
    material: "Plastic or fabric",
    note: "Wide and shallow beats a tall skinny pot. Refresh mix after a couple of seasons.",
  },
];

export function getPotMaterial(id: PotMaterialId) {
  return potMaterials.find((item) => item.id === id) ?? potMaterials[0];
}

export function cropHintForGallons(gallons: number): string {
  const exact = potGallonCrops[gallons];
  if (exact) return exact;
  if (gallons < 1) return "Seedlings and very small herbs only";
  if (gallons < 3) return potGallonCrops[1];
  if (gallons < 5) return potGallonCrops[3];
  if (gallons < 7) return potGallonCrops[5];
  if (gallons < 10) return potGallonCrops[7];
  if (gallons < 15) return potGallonCrops[10];
  return potGallonCrops[15];
}
