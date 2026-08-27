export type MixIngredient = {
  name: string;
  fraction: number;
  note?: string;
};

export type MixRecipe = {
  id: string;
  name: string;
  summary: string;
  bestFor: string;
  ingredients: MixIngredient[];
};

export const soilMixRecipes: MixRecipe[] = [
  {
    id: "backyard",
    name: "Backyard blend",
    summary:
      "A practical mix for most vegetable raised beds: mineral soil for bulk, compost for fertility, coco peat or peat moss for moisture, and perlite for air and drainage.",
    bestFor: "Open-bottom beds, mixed vegetables, filling a 4×8 without buying all bagged potting mix",
    ingredients: [
      { name: "Screened topsoil or garden soil", fraction: 0.5 },
      { name: "Finished compost", fraction: 0.3 },
      {
        name: "Coco peat (coir) or peat moss",
        fraction: 0.1,
        note: "Use one or the other, not both at 10% each",
      },
      {
        name: "Horticultural perlite",
        fraction: 0.1,
        note: "Coarse perlite, not craft-store fine dust",
      },
    ],
  },
  {
    id: "soilless-perlite",
    name: "Soilless mix (perlite)",
    summary:
      "Equal parts compost, coco peat, and perlite. A common hardware-store blend: lighter than topsoil, drains well, and cheaper than filling a bed with vermiculite.",
    bestFor: "Closed-bottom beds, patio planters, hot climates that need extra drainage",
    ingredients: [
      { name: "Finished compost", fraction: 1 / 3 },
      { name: "Coco peat (coconut coir)", fraction: 1 / 3 },
      { name: "Horticultural perlite", fraction: 1 / 3 },
    ],
  },
  {
    id: "mels-peat",
    name: "Soilless mix (Mel’s Mix)",
    summary:
      "Equal parts compost, peat moss, and vermiculite — the classic square-foot mix. Vermiculite holds more water than perlite. Peat is a harvested bog product; swap coir if you prefer.",
    bestFor: "Intensive planting if you want a wetter, sponge-like mix",
    ingredients: [
      { name: "Finished compost", fraction: 1 / 3 },
      { name: "Peat moss", fraction: 1 / 3 },
      { name: "Coarse vermiculite", fraction: 1 / 3 },
    ],
  },
  {
    id: "simple",
    name: "Two-part mix",
    summary:
      "Topsoil plus compost only. Heavier, cheaper, and no perlite. Fine for open-bottom beds on decent ground; it packs more than a mix with perlite.",
    bestFor: "Budget fills and bulk delivery when drainage is already good",
    ingredients: [
      { name: "Screened topsoil or garden soil", fraction: 0.6 },
      { name: "Finished compost", fraction: 0.4 },
    ],
  },
];

export type MixLine = MixIngredient & {
  cubicFeet: number;
  cubicYards: number;
  bagsAt2CuFt: number;
};

export function splitSoilMix(cubicFeet: number, recipe: MixRecipe): MixLine[] {
  return recipe.ingredients.map((ingredient) => {
    const volume = cubicFeet * ingredient.fraction;
    return {
      ...ingredient,
      cubicFeet: volume,
      cubicYards: volume / 27,
      bagsAt2CuFt: Math.ceil(volume / 2),
    };
  });
}

export function getSoilMixRecipe(id: string): MixRecipe {
  return soilMixRecipes.find((recipe) => recipe.id === id) ?? soilMixRecipes[0];
}
