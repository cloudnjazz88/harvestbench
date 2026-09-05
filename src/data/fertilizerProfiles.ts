import { cropGroupLabels, cropGroupOrder, crops, type CropGroup } from "@/data/crops";

export type FertilizerBias = "balanced" | "high-n" | "high-p" | "high-k";

export type FertilizerBiasMeta = {
  id: FertilizerBias;
  shopLabel: string;
  bagRule: string;
  exampleNumbers: string;
  avoid: string;
  productId: string;
};

export const fertilizerBiases: Record<FertilizerBias, FertilizerBiasMeta> = {
  balanced: {
    id: "balanced",
    shopLabel: "Balanced (N, P, and K similar)",
    bagRule:
      "The three numbers on the bag should be close to each other. Nitrogen is not the star.",
    exampleNumbers: "5-5-5, 4-4-4, 10-10-10",
    avoid: "Lawn fertilizer with a huge first number, such as 20-5-5 or 29-0-4.",
    productId: "fertilizer-balanced-placeholder",
  },
  "high-n": {
    id: "high-n",
    shopLabel: "Higher nitrogen (N)",
    bagRule:
      "The first number should be the biggest. That is nitrogen, which pushes leaves and stems.",
    exampleNumbers: "10-5-5, 12-4-8, 8-3-4",
    avoid: "High-nitrogen bags on fruiting plants that are already lush but not setting fruit.",
    productId: "fertilizer-high-n-placeholder",
  },
  "high-p": {
    id: "high-p",
    shopLabel: "Higher phosphorus (P)",
    bagRule:
      "The middle number should be the biggest. Garden-center “starter” or “bloom” bags look like this.",
    exampleNumbers: "5-10-5, 3-15-3, 10-20-10",
    avoid:
      "A high-phosphorus bloom booster as a habit. Compost-rich raised beds often already have enough P. A soil test is the honest check.",
    productId: "fertilizer-high-p-placeholder",
  },
  "high-k": {
    id: "high-k",
    shopLabel: "Higher potassium (K)",
    bagRule:
      "The third number should be the biggest, or at least as high as nitrogen. Vegetable and tomato foods often look like this.",
    exampleNumbers: "4-6-8, 5-5-10, 3-4-6",
    avoid: "Dumping extra nitrogen hoping for more fruit. That usually makes vines, not tomatoes.",
    productId: "fertilizer-high-k-placeholder",
  },
};

export type FertilizerChoice = {
  id: string;
  name: string;
  group: string;
  bias: FertilizerBias;
  why: string;
};

const extraChoices: FertilizerChoice[] = [
  {
    id: "mixed",
    name: "Mixed vegetables (whole bed)",
    group: "Start here",
    bias: "balanced",
    why: "A mixed bed cannot follow four different bags. An all-purpose vegetable fertilizer, plus compost, is the practical default.",
  },
  {
    id: "transplants",
    name: "New transplants",
    group: "Start here",
    bias: "high-p",
    why: "A starter-style bag (middle number higher) is the usual garden-center match when you are setting plants, not feeding a leafy crop all summer.",
  },
];

const cropWhy: Record<string, string> = {
  tomatoes:
    "Once fruit is setting, tomatoes want steady potassium more than a nitrogen blast. Too much N makes leaves and few ripe fruit.",
  peppers:
    "Peppers fruit poorly if they are overfed nitrogen. Look for a vegetable food where K holds its own against N.",
  cucumbers:
    "Vines and fruit both run on potassium. High nitrogen without K is how you get leaves and misshapen fruit.",
  zucchini:
    "Squash is hungry, but a lawn-style high-N bag still pushes foliage over fruit. A tomato/vegetable food is the closer match.",
  eggplant:
    "Fruiting nightshades do better when potassium is not the smallest number on the bag.",
  okra: "Okra is a fruiting crop. Keep nitrogen moderate once it starts flowering.",
  "winter-squash":
    "Big vines still need potassium for fruit. Do not treat the bed like a lawn.",
  strawberries:
    "Berry quality tracks potassium more than a nitrogen spike, which mostly makes leaves.",
  potatoes:
    "Tubers use potassium. Extra nitrogen grows tops and can delay a usable crop.",
  "sweet-potatoes":
    "Storage roots want potassium, not a leafy-green fertilizer.",
  lettuce: "You are growing leaves. Nitrogen is the number that should stand out.",
  kale: "Leafy brassicas use nitrogen. Pale older leaves in a compost-only bed often mean they want more N.",
  spinach: "Harvest is the leaf. A higher first number fits better than a bloom booster.",
  "swiss-chard": "Chard is grown for leaves. Higher nitrogen, not a tomato bloom bag.",
  arugula: "Quick leafy greens respond to nitrogen. They do not need a high-P starter all season.",
  "collard-greens": "Large leaf crops are nitrogen users. Keep it off the fruiting tomatoes nearby if you can.",
  broccoli: "Heading brassicas are hungry for nitrogen. A high-K tomato food is the wrong aisle.",
  cabbage: "Cabbage is a leaf-and-head crop. Higher N, not bloom formula.",
  cauliflower: "Like broccoli, it wants nitrogen for the frame that holds the head.",
  corn: "Corn is a nitrogen hog compared with most vegetables. The first number should lead.",
  basil: "You are cutting leaves. Modest nitrogen beats a fruit-and-bloom bag.",
  cilantro: "Leaf harvest, short season. Higher N, applied lightly.",
  parsley: "Parsley is a leafy herb. Nitrogen first, not phosphorus.",
  asparagus:
    "After the short harvest, ferns rebuild the crown. Nitrogen supports that top growth.",
  carrots:
    "High nitrogen makes ferny tops and hairy or forked roots. A balanced bag, or compost only, is the safer shop.",
  radishes: "They finish fast. Extra nitrogen is mostly tops. Keep the bag balanced or skip it.",
  beets: "Too much nitrogen grows greens instead of roots. Balanced numbers, not lawn food.",
  onions: "Bulbs do poorly with a nitrogen-heavy lawn product. Balanced vegetable food is the usual match.",
  garlic: "Same as onions: skip high-N lawn bags. Balanced is enough in a compost-rich bed.",
  turnips: "Roots plus greens. A balanced bag is safer than chasing one nutrient.",
  beans:
    "Beans make their own nitrogen. A high-N bag is wasted and makes vines. Balanced, or even a bag that is not N-heavy, fits better.",
  peas: "Peas fix nitrogen. Do not buy a leafy-green fertilizer for them.",
};

const cropBiasOverride: Partial<Record<string, FertilizerBias>> = {
  beans: "balanced",
  peas: "balanced",
  corn: "high-n",
  potatoes: "high-k",
  "sweet-potatoes": "high-k",
  strawberries: "high-k",
  asparagus: "high-n",
};

function biasFromGroup(group: CropGroup): FertilizerBias {
  switch (group) {
    case "leafy":
    case "herbs":
      return "high-n";
    case "fruiting":
      return "high-k";
    case "roots":
    case "perennials":
      return "balanced";
  }
}

const cropChoices: FertilizerChoice[] = crops.map((crop) => ({
  id: crop.slug,
  name: crop.name,
  group: cropGroupLabels[crop.group].title,
  bias: cropBiasOverride[crop.slug] ?? biasFromGroup(crop.group),
  why: cropWhy[crop.slug] ?? "Match the bag to what you harvest: leaves want nitrogen, fruit and tubers want potassium, and mixed beds stay balanced.",
}));

export const fertilizerChoices: FertilizerChoice[] = [...extraChoices, ...cropChoices];

const choiceById = new Map(fertilizerChoices.map((item) => [item.id, item]));

export function getFertilizerChoice(id: string): FertilizerChoice {
  return choiceById.get(id) ?? extraChoices[0];
}

export function getFertilizerSelectGroups(): {
  label: string;
  options: { value: string; label: string }[];
}[] {
  const start = {
    label: "Start here",
    options: extraChoices.map((item) => ({ value: item.id, label: item.name })),
  };
  const byGroup = cropGroupOrder.map((group) => ({
    label: cropGroupLabels[group].title,
    options: cropChoices
      .filter((item) => item.group === cropGroupLabels[group].title)
      .map((item) => ({ value: item.id, label: item.name })),
  }));
  return [start, ...byGroup];
}

export type FeedingLevelId = "light" | "typical" | "stronger";

export type FeedingLevel = {
  id: FeedingLevelId;
  label: string;
  hint: string;
  lbNPer1000: number;
};

export const feedingLevels: FeedingLevel[] = [
  {
    id: "light",
    label: "Light",
    hint: "Default. Compost-rich bed, first feeding, or you would rather not overdo it",
    lbNPer1000: 0.225,
  },
  {
    id: "typical",
    label: "Typical",
    hint: "Usual midseason top-dress when plants are growing well but still need a feeding",
    lbNPer1000: 0.5625,
  },
  {
    id: "stronger",
    label: "Stronger",
    hint: "Use only for hungry, heavy-feeding crops or clear signs of nutrient need. Not the usual starting choice",
    lbNPer1000: 0.9,
  },
];

export function getFeedingLevel(id: string): FeedingLevel {
  return feedingLevels.find((item) => item.id === id) ?? feedingLevels[0];
}
