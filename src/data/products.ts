import { amazonProductUrl } from "@/data/affiliates";

export type Retailer = "amazon" | "home-depot" | "lowes" | "other" | "unspecified";

export type ProductRecommendationRecord = {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  pros: string[];
  cons: string[];
  idealUse: string;
  keySpecification?: string;
  keepInMind?: string[];
  priceRange?: string;
  retailer: Retailer;
  asin?: string;
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
    id: "fiskars-bypass-pruning-shears",
    name: "Fiskars Bypass Pruning Shears",
    category: "Pruning shears",
    shortDescription:
      "A compact bypass pruner for routine vegetable-garden cuts when most stems stay within a 5/8-inch capacity.",
    pros: [
      "Bypass blades for live stems",
      "Capacity suited to lighter vegetable-garden pruning",
    ],
    cons: ["The lower cutting capacity is not intended for thick woody branches"],
    idealUse: "Routine vegetable-garden pruning and lighter live stems",
    keySpecification: "Bypass design; up to 5/8-inch cutting capacity",
    keepInMind: ["The lower cutting capacity is not intended for thick woody branches"],
    retailer: "amazon",
    asin: "B00002N66H",
    externalUrl: amazonProductUrl("B00002N66H"),
    affiliate: true,
    status: "ready",
  },
  {
    id: "corona-bp-3180d",
    name: "Corona BP 3180D Forged Classic Bypass Pruner",
    category: "Pruning shears",
    shortDescription:
      "A forged bypass pruner when you want more cutting capacity for thicker live stems and small branches.",
    pros: ["Forged bypass design", "Listed 1-inch cutting capacity"],
    cons: [
      "Hand fit and the larger capacity should be considered; it may not suit every hand",
    ],
    idealUse:
      "Gardeners wanting more cutting capacity for thicker live stems and small branches",
    keySpecification: "Forged bypass pruner; up to 1-inch cutting capacity",
    keepInMind: [
      "Hand fit and the larger capacity should be considered; it may not suit every hand",
    ],
    retailer: "amazon",
    asin: "B00004R9YQ",
    externalUrl: amazonProductUrl("B00004R9YQ"),
    affiliate: true,
    status: "ready",
  },
  {
    id: "felco-f2",
    name: "FELCO F2 Pruning Shears",
    category: "Pruning shears",
    shortDescription:
      "A full-size bypass pruner chosen for replaceable parts and long-term parts availability.",
    pros: ["Replaceable parts", "Full-size bypass design"],
    cons: ["It is a full-size model and may not suit smaller hands"],
    idealUse: "Gardeners who value repairability and long-term parts availability",
    keySpecification: "Full-size bypass pruner with replaceable parts",
    keepInMind: ["It is a full-size model and may not suit smaller hands"],
    retailer: "amazon",
    asin: "B00023RYS6",
    externalUrl: amazonProductUrl("B00023RYS6"),
    affiliate: true,
    status: "ready",
  },
  {
    id: "macsports-collapsible-wagon",
    name: "MacSports Collapsible Utility Wagon",
    category: "Garden carts",
    shortDescription:
      "A folding fabric wagon for leaves, tools, and harvested produce when storage space is limited.",
    pros: [
      "Collapses for storage",
      "Useful for leaves, tools, and harvested produce",
    ],
    cons: [
      "It is not a dump cart and is not the best design for unloading loose soil",
    ],
    idealUse: "Leaves, tools, harvested produce, and gardeners with limited storage",
    keySpecification: "Collapsible fabric utility wagon; listed 150-pound capacity",
    keepInMind: [
      "It is not a dump cart and is not the best design for unloading loose soil",
    ],
    retailer: "amazon",
    asin: "B00BUUUIGK",
    externalUrl: amazonProductUrl("B00BUUUIGK"),
    affiliate: true,
    status: "ready",
  },
  {
    id: "gorilla-carts-gor4ps",
    name: "Gorilla Carts GOR4PS 4 cu ft Poly Dump Cart",
    category: "Garden carts",
    shortDescription:
      "A poly dump cart for soil, compost, mulch, and ordinary backyard loads that you want to tip out.",
    pros: ["Dump bed for unloading", "Poly tray sized for ordinary backyard loads"],
    cons: [
      "Pneumatic tires require pressure and maintenance",
      "Listed capacity is the manufacturer specification, not a working-load target for every trip",
    ],
    idealUse: "Moving soil, compost, mulch, and ordinary backyard loads",
    keySpecification:
      "4-cubic-foot poly dump cart; listed 600-pound capacity; pneumatic tires",
    keepInMind: [
      "Pneumatic tires require pressure and maintenance",
      "Listed capacity is the manufacturer specification, not a working-load target for every trip",
    ],
    retailer: "amazon",
    asin: "B01BECQAWO",
    externalUrl: amazonProductUrl("B01BECQAWO"),
    affiliate: true,
    status: "ready",
  },
  {
    id: "gorilla-carts-1000-steel",
    name: "Gorilla Carts 1000 lb Steel Utility Cart",
    category: "Garden carts",
    shortDescription:
      "A larger steel cart when bulky or heavier yard materials make a folding wagon or small dump cart the wrong tool.",
    pros: ["Steel bed for bulky materials", "High listed capacity for heavier yard loads"],
    cons: [
      "It is larger and less convenient to store",
      "Fine loose material may require a liner depending on the bed construction",
    ],
    idealUse: "Bulky or heavier yard materials where a larger steel cart is appropriate",
    keySpecification: "Steel utility garden cart; listed 1,000-pound capacity",
    keepInMind: [
      "It is larger and less convenient to store",
      "Fine loose material may require a liner depending on the bed construction",
    ],
    retailer: "amazon",
    asin: "B01BECQEA2",
    externalUrl: amazonProductUrl("B01BECQEA2"),
    affiliate: true,
    status: "ready",
  },
];

export function getProduct(id: string): ProductRecommendationRecord | undefined {
  return products.find((item) => item.id === id);
}

export function isProductReady(product: ProductRecommendationRecord): boolean {
  return product.status === "ready" && Boolean(product.externalUrl.trim());
}

export function getReadyProducts(ids: string[]): ProductRecommendationRecord[] {
  return ids
    .map((id) => getProduct(id))
    .filter((item): item is ProductRecommendationRecord => Boolean(item && isProductReady(item)));
}

export function getProductsByCategory(category: string): ProductRecommendationRecord[] {
  return products.filter((item) => item.category === category);
}

export function pageHasAffiliateLinks(
  items: Pick<ProductRecommendationRecord, "affiliate" | "externalUrl">[],
): boolean {
  return items.some((item) => item.affiliate && Boolean(item.externalUrl.trim()));
}

export function getReadyAmazonProducts(): ProductRecommendationRecord[] {
  return products.filter(
    (item) =>
      isProductReady(item) &&
      item.affiliate &&
      item.retailer === "amazon" &&
      Boolean(item.asin),
  );
}

export function productPublicText(product: ProductRecommendationRecord): string {
  return [
    product.name,
    product.category,
    product.shortDescription,
    product.idealUse,
    product.keySpecification,
    ...(product.keepInMind ?? []),
    ...product.pros,
    ...product.cons,
  ]
    .filter(Boolean)
    .join("\n");
}
