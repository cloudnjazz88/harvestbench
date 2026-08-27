import { cropGroupLabels, cropGroupOrder, crops, type CropGroup } from "@/data/crops";

export type SpacingChoice = {
  id: string;
  name: string;
  group: CropGroup;
  /** Practical in-bed spacing used for the grid count. */
  spacingInches: number;
  note: string;
  cropSlug: string;
};

const spacingById: SpacingChoice[] = [
  {
    id: "tomatoes-determinate",
    name: "Tomatoes (determinate / bush)",
    group: "fruiting",
    spacingInches: 24,
    note: "Cage or stake each plant. 18 inches is possible if you prune and keep airflow.",
    cropSlug: "tomatoes",
  },
  {
    id: "tomatoes-indeterminate",
    name: "Tomatoes (indeterminate)",
    group: "fruiting",
    spacingInches: 30,
    note: "Vigorous vines want 30–36 inches unless you prune to one or two stems.",
    cropSlug: "tomatoes",
  },
  {
    id: "peppers",
    name: "Peppers",
    group: "fruiting",
    spacingInches: 18,
    note: "Compact hot peppers can sit at 12–14 inches. Large bells want closer to 24.",
    cropSlug: "peppers",
  },
  {
    id: "cucumbers-trellis",
    name: "Cucumbers (trellised)",
    group: "fruiting",
    spacingInches: 12,
    note: "Plant along the trellis, not in a full grid across the bed.",
    cropSlug: "cucumbers",
  },
  {
    id: "cucumbers-bush",
    name: "Cucumbers (bush)",
    group: "fruiting",
    spacingInches: 24,
    note: "Bush types sprawl. Do not use 12-inch trellis spacing.",
    cropSlug: "cucumbers",
  },
  {
    id: "zucchini",
    name: "Zucchini / summer squash",
    group: "fruiting",
    spacingInches: 30,
    note: "Two or three plants in a 4×8 is plenty for most kitchens.",
    cropSlug: "zucchini",
  },
  {
    id: "eggplant",
    name: "Eggplant",
    group: "fruiting",
    spacingInches: 18,
    note: "Give leaves room so flea beetles and humidity are easier to manage.",
    cropSlug: "eggplant",
  },
  {
    id: "beans",
    name: "Beans",
    group: "fruiting",
    spacingInches: 6,
    note: "Bush beans in a grid, or pole beans closer in a single row on a trellis.",
    cropSlug: "beans",
  },
  {
    id: "peas",
    name: "Peas",
    group: "fruiting",
    spacingInches: 4,
    note: "A double row along a trellis fits more than a full-bed grid.",
    cropSlug: "peas",
  },
  {
    id: "okra",
    name: "Okra",
    group: "fruiting",
    spacingInches: 15,
    note: "One plant per square is plenty once it bushes out.",
    cropSlug: "okra",
  },
  {
    id: "winter-squash",
    name: "Winter squash",
    group: "fruiting",
    spacingInches: 36,
    note: "Vines roam. A 4×8 often holds two plants, not a full grid.",
    cropSlug: "winter-squash",
  },
  {
    id: "corn",
    name: "Corn",
    group: "fruiting",
    spacingInches: 12,
    note: "Plant in a block, not a single row, so wind can pollinate.",
    cropSlug: "corn",
  },
  {
    id: "lettuce-leaf",
    name: "Lettuce (leaf)",
    group: "leafy",
    spacingInches: 6,
    note: "Cut-and-come-again mixes can be even tighter, then thinned.",
    cropSlug: "lettuce",
  },
  {
    id: "lettuce-head",
    name: "Lettuce (head)",
    group: "leafy",
    spacingInches: 12,
    note: "Heading types need the extra room or they stay small.",
    cropSlug: "lettuce",
  },
  {
    id: "kale",
    name: "Kale",
    group: "leafy",
    spacingInches: 15,
    note: "Crowding invites aphids and mildew in raised beds.",
    cropSlug: "kale",
  },
  {
    id: "spinach",
    name: "Spinach",
    group: "leafy",
    spacingInches: 5,
    note: "9–16 per square foot if you harvest baby leaves.",
    cropSlug: "spinach",
  },
  {
    id: "swiss-chard",
    name: "Swiss chard",
    group: "leafy",
    spacingInches: 10,
    note: "Wider if you want huge plants; tighter for baby leaves.",
    cropSlug: "swiss-chard",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    group: "leafy",
    spacingInches: 18,
    note: "Closer spacing makes smaller heads.",
    cropSlug: "broccoli",
  },
  {
    id: "cabbage",
    name: "Cabbage",
    group: "leafy",
    spacingInches: 18,
    note: "Small heads can sit at 12 inches; storage types want 18.",
    cropSlug: "cabbage",
  },
  {
    id: "cauliflower",
    name: "Cauliflower",
    group: "leafy",
    spacingInches: 18,
    note: "Same idea as broccoli: room for the frame that holds the head.",
    cropSlug: "cauliflower",
  },
  {
    id: "arugula",
    name: "Arugula",
    group: "leafy",
    spacingInches: 3,
    note: "Treat it like a salad mix. Thin as you harvest.",
    cropSlug: "arugula",
  },
  {
    id: "collard-greens",
    name: "Collard greens",
    group: "leafy",
    spacingInches: 18,
    note: "One per square foot is the usual pattern.",
    cropSlug: "collard-greens",
  },
  {
    id: "carrots",
    name: "Carrots",
    group: "roots",
    spacingInches: 3,
    note: "Sow thicker, then thin. This count is after thinning.",
    cropSlug: "carrots",
  },
  {
    id: "radishes",
    name: "Radishes",
    group: "roots",
    spacingInches: 2,
    note: "After thinning. Crowded radishes stay all tops.",
    cropSlug: "radishes",
  },
  {
    id: "beets",
    name: "Beets",
    group: "roots",
    spacingInches: 4,
    note: "Each “seed” is a cluster. Thin or you get greens and marbles.",
    cropSlug: "beets",
  },
  {
    id: "onions",
    name: "Onions",
    group: "roots",
    spacingInches: 5,
    note: "Bulb onions. 4 inches is tight; 6 inches is roomy.",
    cropSlug: "onions",
  },
  {
    id: "garlic",
    name: "Garlic",
    group: "roots",
    spacingInches: 5,
    note: "4–6 inches in the row is the usual backyard pattern.",
    cropSlug: "garlic",
  },
  {
    id: "potatoes",
    name: "Potatoes",
    group: "roots",
    spacingInches: 12,
    note: "A 4×8 can hold many seed pieces, or fewer if you mix other crops.",
    cropSlug: "potatoes",
  },
  {
    id: "sweet-potatoes",
    name: "Sweet potatoes",
    group: "roots",
    spacingInches: 15,
    note: "Vines roam. Pinch if they smother peppers.",
    cropSlug: "sweet-potatoes",
  },
  {
    id: "turnips",
    name: "Turnips",
    group: "roots",
    spacingInches: 4,
    note: "After thinning. 9–16 per square foot for small roots.",
    cropSlug: "turnips",
  },
  {
    id: "basil",
    name: "Basil",
    group: "herbs",
    spacingInches: 10,
    note: "One per square is plenty next to tomatoes.",
    cropSlug: "basil",
  },
  {
    id: "cilantro",
    name: "Cilantro",
    group: "herbs",
    spacingInches: 5,
    note: "Or sow a dense band and cut as a mix.",
    cropSlug: "cilantro",
  },
  {
    id: "parsley",
    name: "Parsley",
    group: "herbs",
    spacingInches: 8,
    note: "A few plants supply a household.",
    cropSlug: "parsley",
  },
  {
    id: "strawberries",
    name: "Strawberries",
    group: "perennials",
    spacingInches: 15,
    note: "Leave a path so you are not stepping on crowns.",
    cropSlug: "strawberries",
  },
  {
    id: "asparagus",
    name: "Asparagus",
    group: "perennials",
    spacingInches: 15,
    note: "A dedicated bed. The first spring will look empty. That is normal.",
    cropSlug: "asparagus",
  },
];

const byId = new Map(spacingById.map((item) => [item.id, item]));

export function getSpacingChoice(id: string): SpacingChoice {
  return byId.get(id) ?? spacingById[0];
}

export function getSpacingSelectGroups(): {
  label: string;
  options: { value: string; label: string }[];
}[] {
  return cropGroupOrder.map((group) => ({
    label: cropGroupLabels[group].title,
    options: spacingById
      .filter((item) => item.group === group)
      .map((item) => ({ value: item.id, label: item.name })),
  }));
}

export function cropPageHref(slug: string): string {
  return crops.some((crop) => crop.slug === slug)
    ? `/vegetable-gardening/${slug}`
    : "/vegetable-gardening";
}
