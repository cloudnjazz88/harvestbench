export type Retailer = "amazon" | "home-depot" | "lowes" | "other" | "unspecified";

export type ProductRecommendationRecord = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  pros: string[];
  cons: string[];
  idealUse: string;
  priceRange: string;
  retailer: Retailer;
  /** Empty string means no live product URL yet. */
  externalUrl: string;
  affiliate: boolean;
  status: "placeholder" | "ready";
};

export const products: ProductRecommendationRecord[] = [
  {
    id: "raised-bed-soil-mix-placeholder",
    name: "Raised bed soil mix (research pending)",
    category: "Soil",
    shortDescription:
      "Placeholder for a bagged raised-bed mix. Add a specific product after independent research.",
    pros: [
      "Convenient for topping off or filling a small bed",
      "Useful when bulk soil delivery is not available",
    ],
    cons: [
      "Cost per cubic foot is usually higher than bulk soil",
      "Bag labels vary widely in compost content and texture",
    ],
    idealUse: "Small beds, filling gaps, or blending with compost you already have.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "cedar-raised-bed-placeholder",
    name: "Modular raised garden bed (research pending)",
    category: "Raised beds",
    shortDescription:
      "Placeholder for a kit-style raised bed. Compare lumber thickness, height, and hardware before listing a product.",
    pros: [
      "Faster than building from scratch",
      "Defined height makes soil-volume math easier",
    ],
    cons: [
      "Thin metal or thin wood can flex when filled",
      "Kits may be smaller on the inside than the marketing size",
    ],
    idealUse: "First bed in a yard where you want a known size for soil calculations.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "garden-hose-placeholder",
    name: "Garden hose (research pending)",
    category: "Watering",
    shortDescription:
      "Placeholder for a drinking-water-safe hose sized for backyard beds.",
    pros: ["Needed for filling beds and hand-watering transplants"],
    cons: ["Poor-quality fittings leak and waste water"],
    idealUse: "Connecting a spigot to a watering wand or soaker hose.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "soaker-hose-placeholder",
    name: "Soaker hose (research pending)",
    category: "Watering",
    shortDescription:
      "Placeholder for a soaker hose used under mulch in raised beds.",
    pros: ["Waters soil, not leaves", "Easy to lay along a 4-foot-wide bed"],
    cons: ["Can clog in hard water", "Output varies with pressure and age"],
    idealUse: "Even watering of rectangular vegetable beds.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "drip-irrigation-kit-placeholder",
    name: "Raised bed drip kit (research pending)",
    category: "Watering",
    shortDescription:
      "Placeholder for a backyard drip kit with 1/2-inch tubing, emitters or dripline, and a faucet adapter. Add a specific kit after independent research.",
    pros: [
      "Waters the soil, not the leaves",
      "Easy to hide under mulch in a 4-foot-wide bed",
      "A timer can run it while you are at work",
    ],
    cons: [
      "Cheap kits omit a filter or pressure regulator",
      "Emitters clog in hard water if you skip flushing",
      "A kit sized for containers may be short for several 4×8 beds",
    ],
    idealUse: "One or two raised vegetable beds fed from a hose bib.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "drip-timer-placeholder",
    name: "Hose-end watering timer (research pending)",
    category: "Watering",
    shortDescription:
      "Placeholder for a battery hose-end timer used with drip or soaker lines. Add a model after checking leak history and winter durability.",
    pros: [
      "Keeps a drip line from depending on you being home",
      "Useful when raised beds dry out on hot weekdays",
    ],
    cons: [
      "A timer is not a moisture sensor; it will water a wet bed if you let it",
      "Cheap units leak at the hose thread and fail after a freeze",
    ],
    idealUse: "Running drip or soaker on a schedule you still check with a finger test.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "garden-trellis-placeholder",
    name: "Garden trellis (research pending)",
    category: "Supports",
    shortDescription:
      "Placeholder for a trellis suited to cucumbers or indeterminate tomatoes.",
    pros: ["Saves bed space", "Improves airflow compared with sprawling vines"],
    cons: ["Must be anchored; wind can topple tall panels"],
    idealUse: "Vertical cucumbers, peas, and some tomato systems.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "fertilizer-balanced-placeholder",
    name: "All-purpose vegetable fertilizer (research pending)",
    category: "Fertilizer",
    shortDescription:
      "Placeholder for a balanced N-P-K vegetable fertilizer. Add a specific product after independent research.",
    pros: ["Fits mixed beds where one bag has to cover several crops", "Easy to match: three numbers close together"],
    cons: ["Not the best match if you only grow leafy greens or only fruiting crops"],
    idealUse: "A mixed raised bed, or when you do not want a crop-specific bag.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "fertilizer-high-n-placeholder",
    name: "Higher-nitrogen vegetable fertilizer (research pending)",
    category: "Fertilizer",
    shortDescription:
      "Placeholder for a fertilizer whose first number (N) is the largest. Add a product after research — not a lawn formula by default.",
    pros: ["Matches leafy greens, brassicas, corn, and herbs grown for leaves"],
    cons: ["The wrong bag for tomatoes that are already leafy and not fruiting"],
    idealUse: "Lettuce, kale, cabbage, and other crops you harvest as leaves.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "fertilizer-high-p-placeholder",
    name: "Higher-phosphorus starter fertilizer (research pending)",
    category: "Fertilizer",
    shortDescription:
      "Placeholder for a starter or bloom-style bag with phosphorus (the middle number) highest. Use only when that profile is actually the need.",
    pros: ["The usual garden-center match for setting out transplants"],
    cons: ["Compost-rich raised beds often already have enough phosphorus"],
    idealUse: "New transplants, or a soil test that is actually low in P.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "fertilizer-high-k-placeholder",
    name: "Higher-potassium vegetable fertilizer (research pending)",
    category: "Fertilizer",
    shortDescription:
      "Placeholder for a tomato or vegetable food where potassium (the third number) is highest or equal to nitrogen.",
    pros: ["Matches fruiting crops better than a high-nitrogen lawn bag"],
    cons: ["Will not fix blossom-end rot by itself; that is water and calcium uptake"],
    idealUse: "Tomatoes, peppers, cucumbers, squash, and potatoes in season.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
  {
    id: "pruning-shears-placeholder",
    name: "Bypass pruning shears (research pending)",
    category: "Hand tools",
    shortDescription:
      "Placeholder for bypass pruners used on tomatoes, peppers, and herbs.",
    pros: ["Clean cuts on live stems", "Essential for tomato suckers and harvest"],
    cons: ["Anvil pruners crush live stems and are a poor substitute"],
    idealUse: "Weekly pruning and harvest in a vegetable garden.",
    priceRange: "To be researched",
    retailer: "unspecified",
    externalUrl: "",
    affiliate: false,
    status: "placeholder",
  },
];

export function getProduct(id: string): ProductRecommendationRecord | undefined {
  return products.find((item) => item.id === id);
}

export function getProductsByCategory(category: string): ProductRecommendationRecord[] {
  return products.filter((item) => item.category === category);
}

export function pageHasAffiliateLinks(
  items: Pick<ProductRecommendationRecord, "affiliate" | "externalUrl">[],
): boolean {
  return items.some((item) => item.affiliate && Boolean(item.externalUrl));
}
