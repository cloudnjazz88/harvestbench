import {
  sourceOsuCompost,
  sourcePsuPottingMedia,
  sourceUgaBudgetBed,
  sourceUgaHomeGardenSoil,
  sourceUmnContainers,
  sourceUmnRaisedBeds,
} from "@/data/raisedBedSources";
import type { CalculatorId, FaqItem, RelatedLink, SourceCitation } from "@/data/types";
import { DRY_QUARTS_PER_CU_FT } from "@/lib/units";

export type CalculatorMeta = {
  id: CalculatorId;
  href: string;
  title: string;
  shortTitle: string;
  description: string;
  intro: string;
  formula: string;
  example: { title: string; body: string };
  faqs: FaqItem[];
  relatedCalculators: RelatedLink[];
  relatedGuides: RelatedLink[];
  sources?: SourceCitation[];
  popular?: boolean;
};

export const bagSizes = [
  { value: 0.75, label: "0.75 cu ft" },
  { value: 1, label: "1.0 cu ft" },
  { value: 1.5, label: "1.5 cu ft" },
  { value: 2, label: "2.0 cu ft" },
] as const;

export const pottingMixBagSizes = [
  { id: "8qt", cuFt: 8 / DRY_QUARTS_PER_CU_FT, label: "8 qt" },
  { id: "16qt", cuFt: 16 / DRY_QUARTS_PER_CU_FT, label: "16 qt" },
  { id: "1cf", cuFt: 1, label: "1.0 cu ft" },
  { id: "2cf", cuFt: 2, label: "2.0 cu ft" },
] as const;

const calculatorList: CalculatorMeta[] = [
  {
    id: "raised-bed-soil",
    href: "/calculators/raised-bed-soil",
    title: "Raised Bed Soil Calculator",
    shortTitle: "Raised bed soil",
    description:
      "Calculate how much soil a raised bed needs in cubic feet, cubic yards, and bags.",
    intro:
      "Enter the inside length, width, and filled soil depth — not outside frame dimensions, and not board height if the box is only partly filled. The calculator converts mixed units, multiplies by the number of identical beds, and estimates bag counts (rounded up). Optionally, it splits that volume into screened topsoil and finished plant-based compost using two practical points inside University of Minnesota Extension’s raised-bed range. Turn on hugelkultur to replace the bottom with twigs, leaves, or logs — a 12-inch bed can take about 3 inches of packed brush. Open-bottom beds can use loosened native soil as extra rooting depth; closed-bottom planters cannot.",
    formula:
      "Convert every measurement to feet, then volume (cu ft) = inside length × inside width × soil depth × number of beds. Cubic yards = cubic feet ÷ 27. Bags = cubic feet ÷ bag size, rounded up, because a partial bag is not a store unit. Purchased volume can differ from this number because bag fill, settling, compaction, and headspace vary. Frame height is not automatically the fill depth. Optional mix recipes multiply that total volume by each ingredient’s share (Balanced raised-bed mix: 60% screened topsoil and 40% finished plant-based compost; More-topsoil mix: about 67% topsoil and 33% compost). Both sit inside a documented Extension range and are starting recipes, not universal prescriptions. Hugelkultur soil volume = full volume × (soil on top ÷ bed depth). Bags saved = bags for a full soil fill minus bags for the soil layer. Dollar savings use the bag price you enter.",
    example: {
      title: "Example: one 4×8 bed, 12 inches deep",
      body: "Inside 4 ft × 8 ft × 1 ft of fill = 32 cubic feet, which is about 1.19 cubic yards (32 ÷ 27) before you round up any bag count. At 1.5 cu ft per bag, that is 22 bags (32 ÷ 1.5, rounded up). Two identical beds would need 64 cubic feet. Using the Balanced raised-bed mix, that 32 cu ft is about 19.2 cu ft screened topsoil and 12.8 cu ft finished plant-based compost. With hugelkultur, 3 inches of packed twigs and fallen leaves means 24 cu ft of mix — 16 bags, about $48 less at $8 a bag. The same 4×8 frame 24 inches deep filled only with mix needs 43 bags; 12 inches of wood underneath stays at 22 bags and skips about $168.",
    },
    popular: true,
    faqs: [
      {
        question: "Do I measure the outside or inside of the bed?",
        answer:
          "Measure the inside planting area. Frame thickness does not hold soil. For a 4×8 bed built from 1.5-inch boards, the inside is slightly smaller than the advertised size.",
      },
      {
        question: "Should I buy extra soil?",
        answer:
          "Fresh mix often settles after watering, especially when it is compost-heavy, and bags are not always filled to the printed volume. There is no one percentage that fits every mix. Top off after the first deep watering instead of treating a single overage as a rule.",
      },
      {
        question: "Is bagged soil the same as bulk soil?",
        answer:
          "Not always. Bagged “raised bed mix,” garden soil, and topsoil have different textures and compost content. For larger fills, bulk topsoil or a delivered blend is generally more economical than buying the same volume as individual bags. Compare ingredients, not just the bag name. This calculator does not set prices.",
      },
      {
        question: "What soil mix should I use?",
        answer:
          "There is no single correct blend. University of Minnesota Extension describes a practical raised-bed range of about one-half to two-thirds topsoil and one-third to one-half plant-based compost. This calculator offers two points in that range: Balanced raised-bed mix (60% screened topsoil, 40% compost) and More-topsoil mix (two-thirds topsoil, one-third compost). Do not fill the bed with compost alone. Ordinary pots should stay soilless — use the potting mix calculator for containers.",
      },
      {
        question: "Why only topsoil and compost in the mix presets?",
        answer:
          "Those two ingredients match the University of Minnesota Extension range this tool uses. Other Extension examples mention sand, vermiculite, or lava rock in some blends, but those are not extra presets here. Local topsoil texture and drainage still matter, and bagged garden soil is not identical to native yard soil.",
      },
      {
        question: "How deep should I fill the bed?",
        answer:
          "Extension guidance notes that about 8–10 inches of usable rooting depth can be enough for many vegetables, and that a tall accessibility frame is not the same as required soil depth. HarvestBench still uses 10–12 inches of fill as a practical default for mixed beds, not as a universal requirement. Root crops and large fruiting plants usually want more loosened volume and water buffering. Open-bottom beds can add depth if you loosen the native soil underneath. Closed-bottom planters need the full usable depth in the box. See the raised bed depth guide. Hugelkultur can replace 2–3 inches in a 12-inch box, or a thicker layer in a taller frame.",
      },
      {
        question: "Is frame height the same as the soil I should buy?",
        answer:
          "No. Buy for the filled soil depth. A 24-inch accessibility frame does not have to be packed with mix to the top. Open-bottom beds can connect to loosened native soil; closed-bottom and elevated planters depend entirely on what you put in the container.",
      },
      {
        question: "What is hugelkultur, and how much money does it save?",
        answer:
          "Hugelkultur is a woody layer under the mix — twigs and leaves in a 12-inch bed, logs only if the frame is deeper. A 4×8×12-inch bed with 3 inches of packed brush skips about 6 bags (around $48 if bags cost $8). A 24-inch bed can skip about 21 bags (around $168). Turn on the hugelkultur checkbox and enter your bag price.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/soil-volume", label: "Soil volume calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/hugelkultur-in-raised-beds",
        label: "Hugelkultur in raised beds",
      },
      {
        href: "/guides/how-much-soil-does-a-raised-bed-need",
        label: "How much soil does a raised bed need?",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
      {
        href: "/guides/best-raised-bed-soil",
        label: "How to choose raised bed soil",
      },
    ],
    sources: [sourceUmnRaisedBeds, sourceOsuCompost, sourceUgaBudgetBed],
  },
  {
    id: "soil-volume",
    href: "/calculators/soil-volume",
    title: "Soil Volume Calculator",
    shortTitle: "Soil volume",
    description:
      "Convert a rectangular planting area into cubic feet, cubic yards, and liters.",
    intro:
      "Use this for in-ground beds, planters, or any rectangular volume of soil. For dedicated raised-bed bag estimates, use the raised bed soil calculator.",
    formula:
      "Cubic feet = length (ft) × width (ft) × depth (ft). Cubic yards = cubic feet ÷ 27. Liters = cubic feet × 28.3168.",
    example: {
      title: "Example: 10×3 ft bed, 8 inches deep",
      body: "Depth is 8 ÷ 12 = 0.667 ft. Volume = 10 × 3 × 0.667 = 20 cubic feet, or 0.74 cubic yards, or about 566 liters.",
    },
    popular: true,
    faqs: [
      {
        question: "Can I use this for a round planter?",
        answer:
          "This tool is for rectangles. Use the potting mix calculator for round pots, grow bags, and gallon sizes.",
      },
      {
        question: "Why show liters?",
        answer:
          "Some bagged mixes and imported products list liters. One cubic foot is about 28.3 liters.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/potting-mix", label: "Potting mix calculator" },
      { href: "/calculators/mulch", label: "Mulch calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-much-soil-does-a-raised-bed-need",
        label: "How much soil does a raised bed need?",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
    ],
  },
  {
    id: "potting-mix",
    href: "/calculators/potting-mix",
    title: "Potting Mix Calculator",
    shortTitle: "Potting mix",
    description:
      "How many bags of potting mix to fill 1, 3, 5, 7, or 10 gallon pots — plastic, ceramic, or fabric.",
    intro:
      "Pick the gallon size on the pot or grow bag, how many pots you have, and the bag size at the store. The tool uses US liquid gallons (what most grow bags and buckets mean). Nursery trade gallons can be smaller; measure if the plant looks cramped. Fill with soilless potting mix, not garden soil or topsoil. Optionally split that volume into an Extension-based Equal-parts soilless mix or a Commercial-mix blend.",
    formula:
      "For a labeled gallon pot: cubic feet ≈ gallons × 0.1337, then about 8% off if you leave a watering rim. Bags = cubic feet ÷ bag size, rounded up. Custom round pots use π × radius² × fill height. Tapered pots use a frustum. Optional DIY Equal-parts soilless mix splits the volume into equal thirds of finished compost, coarse vermiculite, and peat moss. Commercial-mix blend uses half commercial soilless potting mix and half finished compost. Both are starting recipes, not universal formulas.",
    example: {
      title: "Example: two 5-gallon grow bags, 1 cu ft bags",
      body: "One 5-gallon bag is about 0.67 cubic feet. Leaving a rim, call it 0.61 cu ft each. Two bags: 1.23 cu ft, so 2 bags of 1.0 cu ft potting mix (rounded up). A 16-quart bag is about 0.62 cu ft, so you would still need 2 of those. Equal-parts soilless mix for 1.23 cu ft is about 0.41 cu ft each of compost, vermiculite, and peat moss.",
    },
    popular: true,
    faqs: [
      {
        question: "Is a 5-gallon nursery pot really 5 gallons?",
        answer:
          "Not always. Hardware-store buckets and many fabric grow bags are close to true US gallons. Nursery “#5” plastic pots are often smaller. If the plant dries out every afternoon in a “5 gal” nursery pot, measure it or step up a size.",
      },
      {
        question: "Can I use garden soil or raised-bed mix in a pot?",
        answer:
          "No. Garden soil and topsoil are too heavy for ordinary pots and elevated garden boxes. They pack, stay wet, and cut off air. Use a soilless potting mix and check the product label. The potting mix vs garden soil guide on this site explains the difference.",
      },
      {
        question: "What DIY mix should I use?",
        answer:
          "There is no single correct blend. Equal-parts soilless mix follows a Penn State Extension documented starting recipe of equal parts finished compost, vermiculite, and peat moss. Commercial-mix blend follows a University of Georgia Extension suggested mixture of half commercial soilless mix and half finished compost. Compost and bags vary in fertility — follow labels and watch plants.",
      },
      {
        question: "Does the pot material change how much mix I buy?",
        answer:
          "No. Material changes how fast the pot dries, not the interior volume. Fabric needs more frequent watering. Plastic holds moisture. Unglazed terracotta dries faster than glazed ceramic.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
    ],
    relatedGuides: [
      {
        href: "/container-gardening",
        label: "Container gardening hub",
      },
      {
        href: "/guides/growing-vegetables-in-containers",
        label: "Growing vegetables in containers",
      },
      {
        href: "/guides/potting-mix-vs-garden-soil",
        label: "Potting mix vs garden soil",
      },
    ],
    sources: [sourcePsuPottingMedia, sourceUmnContainers, sourceUgaHomeGardenSoil],
  },
  {
    id: "mulch",
    href: "/calculators/mulch",
    title: "Mulch Calculator",
    shortTitle: "Mulch",
    description:
      "Estimate cubic feet, cubic yards, and bags of mulch for a rectangular area.",
    intro:
      "Mulch depth is usually given in inches. Two to three inches is a common target for vegetable beds. Keep mulch off plant stems.",
    formula:
      "Volume (cu ft) = length (ft) × width (ft) × (depth in inches ÷ 12). Bags = cubic feet ÷ bag size, rounded up.",
    example: {
      title: "Example: 4×8 bed, 2 inches of mulch",
      body: "4 × 8 × (2 ÷ 12) = 5.33 cubic feet, or 0.20 cubic yards. With 2 cu ft bags, that is 3 bags.",
    },
    popular: true,
    faqs: [
      {
        question: "How deep should mulch be in a vegetable bed?",
        answer:
          "About 2 inches of shredded leaves, straw, or arborist chips is a practical starting point. Thicker layers can keep soil cooler and wetter, which helps in summer and can slow spring warming.",
      },
      {
        question: "Can I mulch with compost?",
        answer:
          "Yes. A 1-inch compost mulch feeds the soil as it breaks down. Use the compost calculator if that is your plan.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/compost", label: "Compost calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
      {
        href: "/guides/how-to-prepare-a-raised-bed",
        label: "How to prepare a raised bed",
      },
    ],
  },
  {
    id: "compost",
    href: "/calculators/compost",
    title: "Compost Calculator",
    shortTitle: "Compost",
    description:
      "Estimate how much compost you need to top-dress or blend into a garden bed.",
    intro:
      "Use a thin layer (about 1 inch) for an annual top-dress. Use a thicker share of the mix when you are filling a new raised bed. Compost quality matters more than hitting an exact cubic footage.",
    formula:
      "Volume (cu ft) = length (ft) × width (ft) × (depth in inches ÷ 12). Bags = cubic feet ÷ bag size, rounded up.",
    example: {
      title: "Example: 4×8 bed, 1-inch top-dress",
      body: "4 × 8 × (1 ÷ 12) = 2.67 cubic feet. With 1 cu ft bags, that is 3 bags. Example only: if you filled that same 4×8×12-inch bed with the Balanced raised-bed mix (40% compost), you would need about 12.8 cubic feet of compost for the mix — separate from a later top-dress. That 40% share is one practical point inside Extension guidance, not a universal compost requirement.",
    },
    faqs: [
      {
        question: "How much compost should I add each year?",
        answer:
          "A ½- to 1-inch top-dress in spring is a common home-garden practice. If plants were weak last season or soil looks tired, a full inch is reasonable. Excess compost can throw off nutrient balance, especially with high-nitrogen feeds.",
      },
      {
        question: "Is all bagged compost the same?",
        answer:
          "No. Some bags are mostly bark fines. Look for a dark, earthy mix that lists feedstocks such as yard waste, food scraps, or manure, and avoid bags that smell sour or look like wood chips.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/mulch", label: "Mulch calculator" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
      {
        href: "/guides/how-to-fertilize-a-raised-bed-garden",
        label: "How to fertilize a raised bed garden",
      },
    ],
  },
  {
    id: "fertilizer",
    href: "/calculators/fertilizer",
    title: "Fertilizer Calculator",
    shortTitle: "Fertilizer",
    description:
      "Pick a crop and see whether to shop for higher nitrogen, phosphorus, potassium, or a balanced bag.",
    intro:
      "Most people do not need to know N-P-K by heart. Choose what you are growing. The calculator says which of the three bag numbers should be highest — or if they should be about equal. Amounts are a conservative top-dress for an established bed or container, not fertilizer to mix into new soil or potting mix. Too much fertilizer can burn plants. Compost-rich raised beds often need less than a bag chart implies.",
    formula:
      "Bags print three numbers in order: nitrogen (N, leaves), phosphorus (P, early roots and flowers), potassium (K, fruit and overall toughness). Amount math is a conservative surface top-dress for one feeding on plants that are already growing. Light = 0.225, Typical = 0.5625, Stronger = 0.9 lb actual N per 1,000 sq ft. Compost-rich beds should start with Light. Beds use length × width. Pots use the circular top surface (πr² × number of pots). Bed and pot depth are not used, and the tool does not estimate a mix-in for new soil. Product (lb) = nitrogen needed ÷ (N% ÷ 100). Kitchen spoons assume 1 oz of typical granular fertilizer ≈ 2 Tbsp. Pellet size varies. The product label still wins, especially if it lists a lower rate.",
    example: {
      title: "Example: tomatoes in a mixed raised bed",
      body: "Pick tomatoes. The tool points you to a higher-potassium bag — third number biggest, or at least matching nitrogen — such as a 4-6-8 or 5-5-10 style vegetable food. A 20-5-5 lawn fertilizer is the wrong aisle. Enter the bed or pot surface size, the three numbers from the bag, and Light / Typical / Stronger. The amount is a starting top-dress in Tbsp or tsp, not a mix-in for new soil. Follow the bag if it lists its own garden rate.",
    },
    popular: true,
    faqs: [
      {
        question: "What do the three numbers on the bag mean?",
        answer:
          "They are always in the same order: nitrogen, phosphorus, potassium. You do not enter them to get a recommendation. Pick your crop, then look for which number the result says should stand out.",
      },
      {
        question: "Why teaspoons instead of ounces?",
        answer:
          "Most people measure a side-dress with a kitchen spoon, not a scale. One ounce of typical granular fertilizer is about 2 tablespoons. That is a scooping estimate — pellets and prills do not all weigh the same. If the bag prints cups or ounces, use the bag.",
      },
      {
        question: "Do I need to know target nitrogen?",
        answer:
          "No. Enter the three numbers off the label and pick Light, Typical, or Stronger. Light is the default starting choice. If the bag prints its own rate for vegetable gardens, or a lower rate, use the bag instead.",
      },
      {
        question: "Can I use this when filling a new pot or raised bed?",
        answer:
          "No. This estimate is for lightly top-dressing plants that are already growing. It does not calculate fertilizer to mix into new soil or potting mix, and it does not use bed or pot depth. For a mix-in rate, follow the product label.",
      },
      {
        question: "Is a 10-10-10 always the safe choice?",
        answer:
          "It is a reasonable mixed-bed default. Leafy crops often want a higher first number. Fruiting crops often want the third number to keep up. Compost already in the bed can cover a light feeding. Repeated use of a balanced fertilizer also adds phosphorus and potassium.",
      },
      {
        question: "Why is high phosphorus not the default for tomatoes?",
        answer:
          "Bloom-booster bags are easy to overuse. Many compost-filled raised beds already have enough phosphorus. This tool only points to a high-P bag for new transplants, or when you have a reason such as a soil test.",
      },
      {
        question: "Will you recommend a specific brand?",
        answer:
          "No. This calculator points you to a bag type — higher nitrogen, phosphorus, potassium, or balanced. It does not recommend a brand.",
      },
      {
        question: "Can this tell me if I will burn plants?",
        answer:
          "No calculator can promise that. These amounts are a conservative starting point for one feeding, and the default is Light. Do not repeat more often than the fertilizer label allows. Burn still depends on the product, wet vs dry granules, and whether fertilizer sits on stems. Keep it off the plant, water it in, and stop if leaf edges scorch. The label and a soil test override this tool.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/garden-area", label: "Garden area calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-to-fertilize-a-raised-bed-garden",
        label: "How to fertilize a raised bed garden",
      },
      {
        href: "/guides/how-far-apart-to-plant-tomatoes",
        label: "How far apart to plant tomatoes",
      },
    ],
  },
  {
    id: "plant-spacing",
    href: "/calculators/plant-spacing",
    title: "Plant Spacing Calculator",
    shortTitle: "Plant spacing",
    description:
      "Pick a crop and a bed size. See how many plants fit at a practical spacing — you do not enter inches.",
    intro:
      "Choose what you are planting and the length and width of the bed. The calculator uses a practical in-bed spacing for that crop, counts how many plants fit on a full grid, and draws a top-view sketch of the bed with a dot for each plant. It does not pack leftovers. A bed narrower than the spacing still gets a single row; those plants hang over the sides. Real beds also need room for aisles, trellises, and airflow.",
    formula:
      "Each crop has a default center-to-center spacing in inches. Plants along a side = floor(side length ÷ spacing), with a minimum of 1 if that side is narrower than the spacing. Total = plants along length × plants along width. Tomato, lettuce, and cucumber types have separate defaults because bush, vining, leaf, and head plants do not use the same number.",
    example: {
      title: "Example: 4×8 bed, determinate tomatoes",
      body: "Determinate tomatoes use 24-inch spacing. 4 ft is 48 inches (2 plants across). 8 ft is 96 inches (4 plants along). Estimated total: 8 plants, shown as two rows of four dots. A 4×1 bed is too narrow for two rows, so the same crop becomes a single row of 2 — the plants hang over the 1-ft sides. Indeterminate vines would use 30 inches and fit fewer.",
    },
    popular: true,
    faqs: [
      {
        question: "Why don’t I enter the spacing myself?",
        answer:
          "Most people do not walk around with a spacing chart. Pick the crop; the tool uses a practical raised-bed default. If your variety is extra compact or extra large, use fewer plants than the count, not more.",
      },
      {
        question: "Why is the grid count sometimes lower than I expect?",
        answer:
          "The calculator uses full spacing intervals that fit inside the bed. It does not squeeze a partial extra plant into leftover inches. If you plant on the edges, you may fit one more in a row, at the cost of airflow.",
      },
      {
        question: "Why does a narrow 4×1 bed still show plants?",
        answer:
          "Spacing is the gap between plants, not a minimum bed width. If one side is narrower than the spacing, the calculator plants a single row down the center. A 4×1 bed of determinate tomatoes (24 in) is two plants in a line. They will hang over the sides; that is expected in a skinny bed.",
      },
      {
        question: "Can I plant closer than the result?",
        answer:
          "You can, and people do in square-foot gardens. Closer spacing means more disease pressure and smaller plants. The defaults here lean toward airflow in a raised bed, not maximum packing.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/garden-area", label: "Garden area calculator" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-far-apart-to-plant-tomatoes",
        label: "How far apart to plant tomatoes",
      },
      {
        href: "/guides/how-far-apart-to-plant-peppers",
        label: "How far apart to plant peppers",
      },
      {
        href: "/guides/how-to-grow-cucumbers-in-raised-beds",
        label: "How to grow cucumbers in raised beds",
      },
    ],
  },
  {
    id: "garden-area",
    href: "/calculators/garden-area",
    title: "Garden Area Calculator",
    shortTitle: "Garden area",
    description:
      "Calculate square footage, square meters, and perimeter for a rectangular garden bed or plot.",
    intro:
      "Area drives soil, mulch, and fertilizer estimates. Perimeter is useful for edging, boards, and drip tubing that runs around the bed.",
    formula:
      "Area (sq ft) = length (ft) × width (ft). Square meters = square feet × 0.0929. Perimeter (ft) = 2 × (length + width).",
    example: {
      title: "Example: 4×8 raised bed",
      body: "Area = 32 sq ft (about 2.97 m²). Perimeter = 24 ft. That 24 ft is the board length around the outside only if you measured outside dimensions.",
    },
    faqs: [
      {
        question: "How do I measure an L-shaped bed?",
        answer:
          "Split it into two rectangles, calculate each, then add the areas. Do not add perimeters unless you need the true outside edge.",
      },
    ],
    relatedCalculators: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/mulch", label: "Mulch calculator" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-much-soil-does-a-raised-bed-need",
        label: "How much soil does a raised bed need?",
      },
      {
        href: "/guides/raised-bed-vs-in-ground-garden",
        label: "Raised bed vs in-ground garden",
      },
    ],
  },
];

export const calculators: CalculatorMeta[] = calculatorList;

export function getCalculator(id: CalculatorId): CalculatorMeta {
  const found = calculators.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown calculator: ${id}`);
  return found;
}

export function getPopularCalculators(): CalculatorMeta[] {
  return calculators.filter((item) => item.popular);
}
