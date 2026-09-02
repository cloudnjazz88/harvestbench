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

/**
 * Raised-bed presets inside the University of Minnesota Extension range
 * (about 1/2–2/3 topsoil and 1/3–1/2 plant-based compost).
 * These are practical points in that range, not universal prescriptions.
 */
export const soilMixRecipes: MixRecipe[] = [
  {
    id: "balanced",
    name: "Balanced raised-bed mix",
    summary:
      "A practical point inside University of Minnesota Extension’s raised-bed range: mostly topsoil with a large share of finished plant-based compost. Starting recipe only — local topsoil texture and drainage differ, and bagged garden soil is not the same as native yard soil.",
    bestFor: "General vegetable raised beds when you want a compost-rich but still mineral-heavy fill",
    ingredients: [
      {
        name: "Screened topsoil",
        fraction: 0.6,
        note: "Bulk topsoil is often practical for large volumes; bagged garden soil varies and is not identical to native soil",
      },
      {
        name: "Finished plant-based compost",
        fraction: 0.4,
        note: "Do not fill the whole bed with compost alone",
      },
    ],
  },
  {
    id: "more-topsoil",
    name: "More-topsoil mix",
    summary:
      "Another practical point in the same University of Minnesota Extension range: two-thirds topsoil and one-third finished plant-based compost. Useful when bulk topsoil is the main material available. Still a starting recipe, not a mandatory formula.",
    bestFor: "Larger fills leaning on bulk topsoil while keeping a meaningful compost share",
    ingredients: [
      {
        name: "Screened topsoil",
        fraction: 2 / 3,
        note: "Local texture and drainage vary; screen rocks and debris when you can",
      },
      {
        name: "Finished plant-based compost",
        fraction: 1 / 3,
        note: "Keep compost as a share of the mix — not the entire fill",
      },
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

export function recipeFractionsTotal(recipe: MixRecipe): number {
  return recipe.ingredients.reduce((sum, item) => sum + item.fraction, 0);
}
