import type { MixRecipe } from "@/data/soilMixes";
import { splitSoilMix } from "@/data/soilMixes";

/**
 * Container recipes only — no garden soil / topsoil.
 * Raised-bed blends that include mineral soil live in soilMixes.ts.
 */
export const pottingMixRecipes: MixRecipe[] = [
  {
    id: "equal-parts-soilless",
    name: "Equal-parts soilless mix",
    summary:
      "An Extension-based starting recipe adapted from Penn State Extension’s equal-parts soilless mix: finished compost, vermiculite, and peat moss. One documented starting point — not the only valid potting mix. Compost and base mixes vary in fertility; follow product labels and watch plant response.",
    bestFor: "Most patio pots, grow bags, and herbs when you want a light soilless DIY blend",
    ingredients: [
      { name: "Finished compost", fraction: 1 / 3 },
      {
        name: "Coarse vermiculite",
        fraction: 1 / 3,
        note: "Horticultural grade, not craft-store fine dust",
      },
      {
        name: "Peat moss",
        fraction: 1 / 3,
        note: "Penn State’s cited formula names peat moss; coconut coir is sometimes used as a peat substitute, but that is not what that Extension recipe specified",
      },
    ],
  },
  {
    id: "commercial-mix-blend",
    name: "Commercial-mix blend",
    summary:
      "A University of Georgia Extension suggested starting mixture: half commercial soilless potting mix and half finished compost. Commercial bags vary — read the ingredient list and label. Local prices determine whether this costs less than a full DIY blend.",
    bestFor: "Pots when you already buy bagged soilless mix and want to stretch it with compost",
    ingredients: [
      {
        name: "Commercial soilless potting mix",
        fraction: 0.5,
        note: "Check the label: peat, perlite, vermiculite, bark, and fertilizer charges differ by brand",
      },
      {
        name: "Finished compost",
        fraction: 0.5,
        note: "Homemade blends can run rich or lean; soil/media testing and plant response matter",
      },
    ],
  },
];

export function getPottingMixRecipe(id: string): MixRecipe {
  return pottingMixRecipes.find((recipe) => recipe.id === id) ?? pottingMixRecipes[0];
}

export { splitSoilMix };
