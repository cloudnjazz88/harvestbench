import {
  plantInPots,
  potGallonChoices,
  potGallonCrops,
  potMaterials,
} from "@/data/containers";
import { topicGuides } from "@/data/guidesTopics";
import type { ContentBlock, FaqItem, RelatedLink } from "@/data/types";

export type GuideType = "guide" | "product";

export type Guide = {
  slug: string;
  title: string;
  description: string;
  type: GuideType;
  category:
    | "raised-beds"
    | "soil"
    | "watering"
    | "planting"
    | "crops"
    | "products"
    | "containers"
    | "seeds"
    | "pests";
  updated: string;
  intro: string;
  body: ContentBlock[];
  faqs: FaqItem[];
  relatedTools: RelatedLink[];
  relatedGuides: RelatedLink[];
  products?: string[];
  featured?: boolean;
  /** When false, the route may still exist but is excluded from sitemap and public links. Default true. */
  published?: boolean;
};

export const guides: Guide[] = [
  {
    slug: "how-deep-should-a-raised-bed-be",
    title: "How Deep Should a Raised Bed Be?",
    description:
      "Practical soil-depth ranges for raised vegetable beds, including tomatoes, carrots, lettuce, and mixed plantings.",
    type: "guide",
    category: "raised-beds",
    updated: "2026-08-26",
    featured: true,
    intro:
      "Most backyard vegetable beds work well at 10–12 inches of soil. Go deeper for carrots and large fruiting crops, and know that depth is only useful if you actually fill the frame.",
    body: [
      {
        type: "p",
        text: "Raised bed depth is the soil depth plants can root into, not the height of the boards on the outside. A 24-inch decorative frame that holds 6 inches of mix will still behave like a shallow bed.",
      },
      {
        type: "h2",
        id: "quick-answer",
        text: "Quick answer",
      },
      {
        type: "table",
        caption: "Useful starting depths for common backyard crops",
        headers: ["Situation", "Soil depth", "Why"],
        rows: [
          [
            "Mixed vegetables (lettuce, peppers, bush beans)",
            "10–12 in",
            "Fits most roots and holds moisture better than a 6-inch box",
          ],
          [
            "Tomatoes, squash, cucumbers",
            "12–18 in",
            "Larger root systems and more water reserve in heat",
          ],
          [
            "Carrots, parsnips, potatoes",
            "12–18 in",
            "Roots need a loose column without hitting a hard floor too soon",
          ],
          [
            "Lettuce, radishes, spinach",
            "6–8 in can work",
            "Shallow roots, but the bed will dry out faster",
          ],
          [
            "Accessibility (less bending)",
            "18–24 in frame",
            "The extra height is for you; still fill it with soil, not empty air",
          ],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "If you can only pick one depth",
        text: "Build to 12 inches of actual soil for a mixed raised bed. It is the usual compromise between cost, weight, and crop flexibility.",
      },
      {
        type: "h2",
        text: "Depth is also a watering decision",
      },
      {
        type: "p",
        text: "Shallow beds heat and dry faster. In a hot, windy US summer, a 6-inch bed can need water daily even with mulch. A 12-inch bed of the same mix usually gives you more room for error. That matters more than a perfect board height.",
      },
      {
        type: "p",
        text: "In cool, cloudy spring weather, a shallower bed warms sooner. If you garden in a short-season climate and only grow greens, 8 inches can be enough. If you grow tomatoes through July heat in the South or inland West, extra depth is a moisture buffer.",
      },
      {
        type: "h2",
        text: "Open-bottom vs closed-bottom beds",
      },
      {
        type: "p",
        text: "If the frame sits on decent native soil and is open at the bottom, plant roots can continue downward. In that case, even an 8-inch frame can support tomatoes because the plants are not trapped in a box. Closed bottoms (fabric beds on a patio, beds over a driveway, or heavy landscape fabric that roots cannot pierce) need the full depth in the container itself.",
      },
      {
        type: "h2",
        text: "What not to do",
      },
      {
        type: "ul",
        items: [
          "Do not fill the bottom with rocks or broken pots “for drainage.” That creates a perched water table and wastes depth.",
          "Do not count empty space under a false floor as soil depth.",
          "Do not assume a 6-inch cedar kit advertised for flowers is sized for carrots.",
        ],
      },
      {
        type: "p",
        text: "Once you choose a depth, [calculate the soil volume](/calculators/raised-bed-soil) before you buy bags or schedule a bulk delivery.",
      },
    ],
    faqs: [
      {
        question: "Is a 6-inch raised bed deep enough for vegetables?",
        answer:
          "It can grow lettuce, radishes, and some herbs if you water carefully. It is a poor default for tomatoes, peppers, and carrots, especially in heat.",
      },
      {
        question: "Do I need 24 inches of soil?",
        answer:
          "Usually no. Very deep frames cost more to fill if you buy mix all the way down. Use extra height for accessibility, then hugelkultur: wood in the bottom and 10–12 inches of mix on top. A 12-inch bed can still take 2–3 inches of twigs and leaves.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/soil-volume", label: "Soil volume calculator" },
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
        href: "/guides/how-to-prepare-a-raised-bed",
        label: "How to prepare a raised bed",
      },
    ],
  },
  {
    slug: "how-much-soil-does-a-raised-bed-need",
    title: "How Much Soil Does a Raised Bed Need?",
    description:
      "Worked examples for common US raised bed sizes, plus bag vs bulk buying notes.",
    type: "guide",
    category: "soil",
    updated: "2026-08-26",
    featured: true,
    intro:
      "Multiply inside length × width × fill height (all in feet) to get cubic feet. Divide by 27 for cubic yards. A 4×8 bed filled 12 inches deep needs 32 cubic feet, about 1.2 yards.",
    body: [
      {
        type: "p",
        text: "Soil is usually the most expensive part of a new raised bed. Getting the volume right matters more than picking a fashionable mix name on a bag.",
      },
      {
        type: "h2",
        text: "The formula",
      },
      {
        type: "p",
        text: "Convert every measurement to feet. Twelve inches is 1 foot. Six inches is 0.5 feet. Then:",
      },
      {
        type: "example",
        title: "Cubic feet",
        text: "cubic feet = length (ft) × width (ft) × height (ft) × number of beds",
      },
      {
        type: "p",
        text: "Cubic yards = cubic feet ÷ 27. Use the [raised bed soil calculator](/calculators/raised-bed-soil) if you do not want to convert units by hand.",
      },
      {
        type: "h2",
        text: "Common US bed sizes",
      },
      {
        type: "table",
        headers: ["Inside size", "Fill height", "Cubic feet", "Cubic yards", "1.5 cu ft bags"],
        rows: [
          ["4 × 4 ft", "10 in", "13.3", "0.49", "9"],
          ["4 × 8 ft", "10 in", "26.7", "0.99", "18"],
          ["4 × 8 ft", "12 in", "32", "1.19", "22"],
          ["4 × 8 ft", "16 in", "42.7", "1.58", "29"],
          ["3 × 6 ft", "12 in", "18", "0.67", "12"],
          ["2 × 8 ft (narrow)", "12 in", "16", "0.59", "11"],
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Bags vs bulk",
        text: "Once you need about 1 cubic yard or more, bulk garden soil or a custom blend is often cheaper than bags. Bags still win for a single small bed, a balcony, or topping off after settling.",
      },
      {
        type: "h2",
        text: "Settling",
      },
      {
        type: "p",
        text: "Fresh mix drops after the first deep watering. Compost-heavy fills can settle 10% or more. Either order a little extra or plan to top off two weeks after filling. Do not compact soil by stomping it; water it in, then add more.",
      },
      {
        type: "h2",
        text: "What to fill with",
      },
      {
        type: "p",
        text: "Volume is only half the decision. A 4×8×12-inch bed filled with cheap screened fill dirt will hold plants but drain and feed poorly. See [best soil mix for raised beds](/guides/best-soil-mix-for-raised-beds) for mixing ratios, and the [buying guide for raised bed soil](/guides/best-raised-bed-soil) for what to look for on a bag label.",
      },
    ],
    faqs: [
      {
        question: "How many bags of soil for a 4x8 raised bed?",
        answer:
          "At 12 inches deep you need 32 cubic feet. With 1.5 cu ft bags that is 22 bags; with 2.0 cu ft bags that is 16 bags. Confirm the bag’s actual cubic feet — some “40 lb” bags are not 1 cubic foot.",
      },
      {
        question: "Can I fill the bottom with logs (hügelkultur)?",
        answer:
          "Yes. In a 12-inch bed use 2–3 inches of thin branches packed with leaves, then about 9 inches of mix. Logs belong in a taller frame. A 4×8×24-inch bed can skip about half the bags. See the hugelkultur guide and turn it on in the soil calculator.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/hugelkultur-in-raised-beds",
        label: "Hugelkultur in raised beds",
      },
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
      { href: "/guides/best-raised-bed-soil", label: "Best raised bed soil" },
    ],
  },
  {
    slug: "hugelkultur-in-raised-beds",
    title: "Hugelkultur in Raised Beds",
    description:
      "How twigs, leaves, and logs under soil cut the mix you buy — including a 2–3 inch brush layer in a 12-inch raised bed.",
    type: "guide",
    category: "raised-beds",
    updated: "2026-08-27",
    featured: true,
    intro:
      "Hugelkultur puts free woody waste under the mix so you purchase less soil. It does not have to be logs. In a 12-inch 4×8 bed, 3 inches of packed twigs and leaves skips about 6 bags. A 24-inch bed can skip about half the fill — often more than $150 if bags cost around $8 each.",
    body: [
      {
        type: "p",
        text: "Soil is usually the most expensive part of a new raised bed. Lumber is a one-time cost. Bags of mix are not. Hugelkultur (from German Hügelkultur, “hill culture”) is a way to spend yard waste instead of money. Classic versions use logs. In a backyard raised bed, thin branches packed tight and stuffed with leaves do the same job in less depth.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "This is a soil-bill tactic, not a style",
        text: "The point is not a decorative mound. Lay woody waste in the bottom, pack the gaps with leaves so the layer does not collapse, then put real mix on top. Use the [raised bed soil calculator](/calculators/raised-bed-soil) and turn on the hugelkultur checkbox — it starts a 12-inch bed with about 3 inches of brush.",
      },
      {
        type: "h2",
        id: "how-much-you-save",
        text: "How much soil — and money — you actually save",
      },
      {
        type: "p",
        text: "Wood only replaces the volume below the soil layer. You do not need to fill a 12-inch box with 12 inches of mix. Leave 2–3 inches for packed twigs and leaves, and keep about 9 inches of mix for roots. A 24-inch frame can take a much thicker woody pile and still keep 12 inches of mix on top.",
      },
      {
        type: "table",
        caption: "One 4×8 bed, 1.5 cu ft bags, $8 a bag as a planning number",
        headers: ["Frame and woody layer", "All soil", "Mix + wood", "Soil saved", "Bags you do not buy", "Rough $ saved"],
        rows: [
          ["12 in · 3 in twigs and leaves", "32 cu ft · 22 bags · $176", "24 cu ft · 16 bags · $128", "8 cu ft (25%)", "6", "$48"],
          ["18 in · 6 in wood", "48 cu ft · 32 bags · $256", "32 cu ft · 22 bags · $176", "16 cu ft (33%)", "10", "$80"],
          ["24 in · 12 in wood", "64 cu ft · 43 bags · $344", "32 cu ft · 22 bags · $176", "32 cu ft (50%)", "21", "$168"],
        ],
      },
      {
        type: "p",
        text: "Two 24-inch beds roughly double that: on the order of 42 bags and about $336 you never take to the register, if bags really cost $8. Bulk soil is cheaper per cubic foot than bags, so the dollar gap shrinks if you already planned a truck delivery — but you still avoid paying for a yard of mix that wood can occupy.",
      },
      {
        type: "callout",
        tone: "info",
        title: "$8 is not a quote",
        text: "Hardware-store raised-bed mix often lands somewhere around $6–$12 per 1.5–2 cu ft bag, depending on brand and city. Enter what you pay in the calculator. A 12-inch bed with a 3-inch brush layer is about 25% less mix. A 24-inch bed with 12 inches of wood is about half.",
      },
      {
        type: "h2",
        text: "A 12-inch bed still works — use twigs, not logs",
      },
      {
        type: "p",
        text: "A fat log in a 12-inch box steals the root zone. A 2–3 inch mat of thin branches does not. Criss-cross prunings, then pack fallen leaves into every gap so you are not buying mix to fill air pockets. Water that layer until it is soaked, then add about 9 inches of real raised-bed mix. Lettuce, peppers, and bush beans are fine in that column. Carrots and big tomatoes are happier if the frame is deeper, or if you keep a full 12 inches of mix and skip the brush.",
      },
      {
        type: "p",
        text: "Taller frames still win on dollars. The same 4×8 with 24 inches of height and 12 inches of wood skips about 21 bags at the planning price above. Use the extra height when you have it. Do not wait for a 24-inch box to start saving soil.",
      },
      {
        type: "h2",
        text: "How to layer a raised-bed hugelkultur",
      },
      {
        type: "ol",
        items: [
          "Use an open-bottom frame on soil or cardboard over lawn. Do not put a gravel “drainage layer” under the wood — rocks waste depth and do not drain the way people hope.",
          "In a 12-inch bed: a loose lattice of thin branches, then leaves packed in until the layer is 2–3 inches and there are no big voids. Skip logs thicker than a thumb.",
          "In a deeper bed: largest untreated logs first, then branches, then twigs, then leaves. The leaves are what let you stretch a small brush pile into more cubic feet.",
          "Water the woody layer until it is soaked. Dry wood will pull moisture out of the mix above.",
          "Add real raised-bed mix on top — about 9 inches in a 12-inch box, 10–12 inches (more for carrots) in a taller frame. See [best soil mix for raised beds](/guides/best-soil-mix-for-raised-beds).",
          "Water to settle, top off the mix, mulch. Expect the surface to drop as wood and leaves shrink — that is normal, not a failed bed.",
        ],
      },
      {
        type: "h2",
        text: "What to bury, and what to skip",
      },
      {
        type: "ul",
        items: [
          "Good: thin prunings, brush, leaves, small amounts of untreated cardboard. Logs only if the frame is deep enough that 10–12 inches of mix still sit on top.",
          "Skip: pressure-treated lumber, painted or stained scraps, glossy cardboard, black walnut, and wood you know is diseased.",
          "Fresh wood can tie up nitrogen while it starts to rot. A compost-rich mix on top covers most backyard beds. If leaves yellow in year one, that is a feeding issue — not a reason to skip a thin brush layer.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "This is not the same as a rock-filled bed",
        text: "Rocks do not turn into soil. Wood does, slowly. Rocks also steal the depth plants could have used. If someone told you to fill the bottom with stone “for drainage,” read [how to prepare a raised bed](/guides/how-to-prepare-a-raised-bed) instead.",
      },
      {
        type: "h2",
        text: "Tradeoffs",
      },
      {
        type: "ul",
        items: [
          "You must have or haul wood. If you would buy decorative logs, the money math collapses — hugelkultur only pays when the wood is already free.",
          "The bed settles. Plan to top off mix in year two. Run the [soil calculator](/calculators/raised-bed-soil) again for a thin top-up, not a full refill.",
          "Carrots and other long roots want a loose soil column. In a 12-inch bed, keep the brush layer thin (2–3 inches) or skip it for a root crop row.",
          "Termites live in soil whether or not you add logs. Do not use hugelkultur as an excuse to stack wood against a house wall; keep beds a normal setback from siding.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much money does hugelkultur save in a raised bed?",
        answer:
          "Only the soil you do not buy. In a 4×8×12-inch bed with 3 inches of packed twigs and leaves, that is about 8 cubic feet — 6 bags at 1.5 cu ft, about $48 if bags cost $8. An 18-inch bed with 6 inches of wood saves about 10 bags (~$80). A 24-inch bed with 12 inches of wood saves about 21 bags (~$168). Enter your bag price in the raised bed soil calculator.",
      },
      {
        question: "Can I use hugelkultur in a 12-inch raised bed?",
        answer:
          "Yes. Use thin branches, not logs, and pack leaves into the gaps so the layer is 2–3 inches. Keep about 9 inches of real mix on top. Fat logs belong in a taller frame.",
      },
      {
        question: "Will the wood steal nitrogen from my vegetables?",
        answer:
          "It can, especially the first season, as microbes break down fresh wood. A mix with plenty of finished compost on top is the usual fix. You can also side-dress if plants look pale. Do not bury wood chips throughout the root zone as a substitute for this layered method.",
      },
      {
        question: "Is hugelkultur the same as filling a bed with wood chips?",
        answer:
          "No. Chips mixed through the planting layer tie up nitrogen where roots live. Hugelkultur keeps mix on top and puts twigs, leaves, or logs in a layer underneath.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-much-soil-does-a-raised-bed-need",
        label: "How much soil does a raised bed need?",
      },
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
      {
        href: "/guides/how-to-prepare-a-raised-bed",
        label: "How to prepare a raised bed",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
    ],
  },
  {
    slug: "growing-vegetables-in-containers",
    title: "Growing Vegetables in Containers",
    description:
      "Plastic, ceramic, and fabric pots by gallon size — what each material does well, and which vegetables fit 1, 3, 5, 7, and 10 gallon containers.",
    type: "guide",
    category: "containers",
    updated: "2026-08-27",
    featured: true,
    intro:
      "Pots split two ways: what they are made of, and how many gallons they hold. Material changes watering and heat. Gallons change which plant will actually finish a crop. Fill them with potting mix, not garden soil.",
    body: [
      {
        type: "p",
        text: "A patio tomato in a 1-gallon nursery pot is a common disappointment. The plant lives, then stalls in July because the root ball is too small to hold water or fertilizer. Match the crop to the gallon size first, then pick plastic, ceramic, or a fabric grow bag for how you water and where the pot sits.",
      },
      {
        type: "h2",
        id: "gallon-sizes",
        text: "Gallon sizes",
      },
      {
        type: "p",
        text: "US garden centers and grow-bag sellers usually list 1, 3, 5, 7, and 10 gallons, plus 15 and 20 for large tomatoes and potatoes. Smaller than 1 gallon is fine for seedlings and a single herb. Larger than 20 gallons starts to behave like a small raised bed — at that point the [raised bed soil calculator](/calculators/raised-bed-soil) may be simpler.",
      },
      {
        type: "callout",
        tone: "info",
        title: "A labeled gallon is not always a true gallon",
        text: "Hardware-store buckets and most fabric grow bags are close to US liquid gallons. Nursery “#5” or “trade gallon” plastic pots are often smaller than a 5-gallon bucket. If the plant dries out every afternoon, measure the pot or step up a size. The [potting mix calculator](/calculators/potting-mix) uses true US gallons; switch to “I’ll measure” when the label looks optimistic.",
      },
      {
        type: "table",
        caption: "Typical crops for common pot sizes",
        headers: ["Pot size", "A reasonable crop"],
        rows: potGallonChoices.map((size) => [`${size} gal`, potGallonCrops[size]]),
      },
      {
        type: "p",
        text: "One plant per pot for tomatoes, peppers, eggplant, cucumber, and zucchini. Herbs and lettuce can share a wide bowl. Crowding two tomatoes in a 5-gallon bag is how you get two weak plants instead of one decent one.",
      },
      {
        type: "h2",
        id: "materials",
        text: "Plastic, ceramic, and fabric",
      },
      {
        type: "p",
        text: "Material does not change how many bags of mix you buy. It changes how fast the mix dries, how hot the roots get, and whether you can move the pot. Fabric grow bags are the nonwoven felt-style bags sold in gallon sizes.",
      },
      ...potMaterials.flatMap((material) => [
        { type: "h3" as const, text: material.name },
        {
          type: "p" as const,
          text: `${material.short}. ${material.bestFor}.`,
        },
        {
          type: "ul" as const,
          items: [
            ...material.pros.map((item) => `Advantage: ${item}`),
            ...material.cons.map((item) => `Tradeoff: ${item}`),
            `Watering: ${material.watering}`,
          ],
        },
      ]),
      {
        type: "callout",
        tone: "tip",
        title: "Terracotta is not the same as glazed ceramic",
        text: "Unglazed clay breathes and dries fast — useful for rosemary and thyme, harsh for a patio tomato in July. A glazed ceramic pot behaves more like plastic once it is filled. If you buy “ceramic,” check whether the inside is sealed.",
      },
      {
        type: "h2",
        id: "which-plant",
        text: "Which plant in which pot",
      },
      {
        type: "p",
        text: "These are comfortable sizes for a full season on a patio, not the smallest pot a seedling will survive in. When in doubt, go up a size rather than down. Run the [potting mix calculator](/calculators/potting-mix) after you pick gallons so you buy mix once.",
      },
      {
        type: "table",
        caption: "Vegetable and herb container sizes",
        headers: ["Plant", "Pot size", "Material that usually works", "Notes"],
        rows: plantInPots.map((row) => [row.plant, row.gallons, row.material, row.note]),
      },
      {
        type: "h2",
        text: "What pots still need",
      },
      {
        type: "ul",
        items: [
          "A drainage hole. A pretty cachepot with no hole is a vase. Set a nursery pot inside it, or drill.",
          "[Potting mix](/guides/potting-mix-vs-garden-soil), not garden soil and not the mineral mix you would use in an open raised bed.",
          "Sun that matches the crop. Tomatoes and peppers still want 6–8 hours. Lettuce and cilantro appreciate afternoon shade in heat.",
          "More frequent watering than a raised bed, especially fabric and terracotta. Check two inches down. Mulch the surface.",
          "A real cage or trellis for tomatoes and cucumbers. A pot does not make a vining plant compact.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I grow an indeterminate tomato in a 5-gallon pot?",
        answer:
          "It will live and may ripen a few fruit, then stall when heat and water demand peak. Use 10–15 gallons and a cage if you want a full-season vine. Patio and determinate types are the 5-gallon crop.",
      },
      {
        question: "Are fabric grow bags better than plastic?",
        answer:
          "They air-prune roots and fold for storage, which is why they are popular for tomatoes and potatoes. They also dry out faster than plastic. If you cannot water on hot afternoons, plastic or glazed ceramic is more forgiving.",
      },
      {
        question: "Do I need a different pot size in a hot climate?",
        answer:
          "Often yes — go up a size so the mix holds more water, and avoid thin black plastic in full afternoon sun. Fabric still works if you water more often or set the bag in a little shade at the roots.",
      },
    ],
    relatedTools: [
      { href: "/calculators/potting-mix", label: "Potting mix calculator" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
      { href: "/container-gardening", label: "Container gardening hub" },
    ],
    relatedGuides: [
      {
        href: "/guides/potting-mix-vs-garden-soil",
        label: "Potting mix vs garden soil",
      },
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
      {
        href: "/vegetable-gardening/tomatoes",
        label: "How to grow tomatoes",
      },
    ],
  },
  {
    slug: "potting-mix-vs-garden-soil",
    title: "Potting Mix vs Garden Soil",
    description:
      "Why pots need potting mix, why raised beds usually should not be filled with it, and how to read a bag label.",
    type: "guide",
    category: "containers",
    updated: "2026-08-27",
    intro:
      "Potting mix is for containers. Garden soil and mineral-heavy raised-bed blends belong in open beds. Using the wrong one is a common reason a patio plant stays wet, then collapses.",
    body: [
      {
        type: "p",
        text: "A pot is a closed box. Roots cannot escape into native ground, and extra water has nowhere to go except out the drainage hole — if the mix stays open enough to let it. Garden soil is built for the opposite situation: mineral particles that settle, hold water, and sit in a landscape that drains sideways and down.",
      },
      {
        type: "h2",
        text: "What to use where",
      },
      {
        type: "table",
        headers: ["Place", "Use", "Skip"],
        rows: [
          [
            "Plastic, ceramic, or fabric pots",
            "Potting mix (peat or coir, bark, perlite or similar)",
            "Garden soil, topsoil, and straight compost",
          ],
          [
            "Open-bottom raised bed on soil",
            "Mineral soil plus compost — see [raised bed mix](/guides/best-soil-mix-for-raised-beds)",
            "Filling the whole frame with bagged potting mix (costly and often too light)",
          ],
          [
            "Raised bed on a patio or driveway (closed bottom)",
            "A lighter bed mix with more compost and bark so it drains",
            "Native clay dumped into a sealed box",
          ],
        ],
      },
      {
        type: "h2",
        text: "What potting mix is",
      },
      {
        type: "p",
        text: "Bagged potting mix is mostly organic particles and air. Typical ingredients are peat moss or coconut coir, composted bark, and perlite or pumice. Some bags include a starter fertilizer charge; that runs out in weeks, not all season. The point is drainage and air around roots in a container, not cheap bulk.",
      },
      {
        type: "ul",
        items: [
          "“Potting mix” or “container mix” is the right aisle for grow bags and patio pots.",
          "“Garden soil” and “topsoil” are for in-ground or raised beds. In a pot they pack, stay wet, and cut off oxygen.",
          "“Raised bed mix” is a middle ground: more mineral than potting mix, still not a good closed-pot fill.",
          "“Moisture control” mixes hold water longer. That can help plastic on a windy balcony; it can drown plants in a pot with a slow drain.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Do not mine the yard for pots",
        text: "Native clay or loam that works in an open bed becomes a brick or a swamp in a 5-gallon pot. If you already filled containers with garden soil, it is kinder to dump them and start over than to keep adding perlite on top.",
      },
      {
        type: "h2",
        text: "How much mix to buy",
      },
      {
        type: "p",
        text: "Potting mix is sold in quarts and cubic feet, not gallons of pot. A 5-gallon grow bag is about two-thirds of a cubic foot before you leave a watering rim. Eight-quart bags are for a couple of herb pots; 1.0 and 2.0 cubic-foot bags are the usual vegetable sizes. Use the [potting mix calculator](/calculators/potting-mix) instead of guessing from the pot’s gallon label.",
      },
      {
        type: "h2",
        text: "After the first season",
      },
      {
        type: "p",
        text: "Potting mix shrinks and breaks down. You do not have to throw it all out every year. Pull roots, dump the mix into a tub, blend in a third or so fresh mix plus compost, and refill. If last year’s plants stayed soggy or gnats took over, replace more of it. Do not reuse mix that had a serious soil-borne disease on tomatoes or peppers.",
      },
    ],
    faqs: [
      {
        question: "Can I mix garden soil into potting mix to save money?",
        answer:
          "A little compost is fine. A lot of native soil is how pots stop draining. If cost is the issue, use fabric bags (they are cheap) and buy fewer, larger pots rather than stretching mix with dirt.",
      },
      {
        question: "Is compost the same as potting mix?",
        answer:
          "No. Finished compost is an ingredient. Straight compost in a pot can stay too wet, shrink, and be too rich for seedlings. Blend it into potting mix; do not fill the pot with compost alone.",
      },
      {
        question: "Can I fill a raised bed with potting mix?",
        answer:
          "You can, and some patio beds do, but it is expensive at 4×8 scale and the bed can be too fluffy for tall tomatoes unless you add mineral bulk. Use a raised-bed recipe for frames, and potting mix for pots.",
      },
    ],
    relatedTools: [
      { href: "/calculators/potting-mix", label: "Potting mix calculator" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/growing-vegetables-in-containers",
        label: "Growing vegetables in containers",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
      { href: "/guides/best-raised-bed-soil", label: "Buying raised bed soil" },
    ],
  },
  {
    slug: "best-soil-mix-for-raised-beds",
    title: "Best Soil Mix for Raised Beds",
    description:
      "Practical raised bed soil recipes using compost, topsoil, and drainage materials — without a single magic blend.",
    type: "guide",
    category: "soil",
    updated: "2026-08-26",
    featured: true,
    intro:
      "A reliable raised-bed mix is mostly mineral soil plus plenty of finished compost, with enough drainage that water does not sit around roots. There is no universal bag that fits every climate and crop.",
    body: [
      {
        type: "p",
        text: "Raised beds fail more often from the wrong mix than from the wrong lumber. Mixes that are 100% potting soil can be too light and expensive at bed scale. Mixes that are 100% native clay can bake into a brick. You want something in between.",
      },
      {
        type: "h2",
        text: "A practical default mix",
      },
      {
        type: "p",
        text: "For a general vegetable bed in much of the US, this is a sane starting point by volume:",
      },
      {
        type: "ul",
        items: [
          "About 50% screened topsoil or high-quality garden soil (mineral bulk, not bagged “fill dirt” full of rocks)",
          "About 30–40% finished compost from more than one feedstock if you can (yard waste plus manure compost is better than one tired source)",
          "About 10–20% aeration material if the blend is heavy: coarse horticultural perlite, vermiculite, or pine bark fines — not playground sand dumped into clay",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Mel’s Mix is one recipe, not a requirement",
        text: "Equal parts compost, peat moss or coconut coir, and vermiculite (often called Mel’s Mix) drains well and is easy to sow into. It is also costly at 4×8 scale and peat is a debated ingredient. Treat it as a proven option, not the only correct soil.",
      },
      {
        type: "h2",
        text: "Match the mix to the situation",
      },
      {
        type: "table",
        headers: ["Situation", "Lean toward", "Watch out for"],
        rows: [
          [
            "New bed on a patio (closed bottom)",
            "Lighter mix with more compost and bark fines so it drains",
            "Straight native soil in a sealed box stays waterlogged",
          ],
          [
            "Open-bottom bed on decent ground",
            "More mineral soil; roots can go down",
            "Still add compost so the top 12 inches are fertile",
          ],
          [
            "Hot, dry climate",
            "Slightly more compost and mulch on top to hold water",
            "Very sandy mixes dry out by afternoon",
          ],
          [
            "Wet, clay native soil below",
            "Open bottom plus a mix that drains; do not add a rock layer",
            "A water-tight liner turns the bed into a tub",
          ],
        ],
      },
      {
        type: "h2",
        text: "What to avoid",
      },
      {
        type: "ul",
        items: [
          "Uncomposted manure that can burn roots and carry weed seeds",
          "Bagged products that are mostly shredded wood dyed brown",
          "Mixing in fresh wood chips throughout the root zone (they can tie up nitrogen as they decompose)",
          "Assuming “organic” on the bag describes nutrient content. It does not replace compost quality.",
        ],
      },
      {
        type: "h2",
        text: "After the first season",
      },
      {
        type: "p",
        text: "You rarely need to dump the bed and start over. Top-dress ½–1 inch of compost each year, and use the [compost calculator](/calculators/compost) for the volume. If plants stall, a soil test is more useful than adding random fertilizer. See [how to fertilize a raised bed garden](/guides/how-to-fertilize-a-raised-bed-garden).",
      },
    ],
    faqs: [
      {
        question: "Can I use only compost?",
        answer:
          "A bed of 100% compost can be too rich, too fluffy, and prone to shrinking. Blend it with mineral soil for structure.",
      },
      {
        question: "Can I use native soil from my yard?",
        answer:
          "Yes, if you screen it and mix in compost. Heavy clay benefits from compost and a drainage component. Do not use soil from an area treated with persistent herbicides.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-much-soil-does-a-raised-bed-need",
        label: "How much soil does a raised bed need?",
      },
      { href: "/guides/best-raised-bed-soil", label: "Best raised bed soil" },
      {
        href: "/guides/how-to-prepare-a-raised-bed",
        label: "How to prepare a raised bed",
      },
      {
        href: "/guides/potting-mix-vs-garden-soil",
        label: "Potting mix vs garden soil",
      },
    ],
  },
  {
    slug: "how-to-prepare-a-raised-bed",
    title: "How to Prepare a Raised Bed",
    description:
      "A practical sequence for siting, filling, and settling a new raised vegetable bed before planting.",
    type: "guide",
    category: "raised-beds",
    updated: "2026-08-26",
    intro:
      "Pick a sunny, reasonably level spot, set the frame, fill it with a real soil mix, water to settle, and mulch. Skip the rock layer at the bottom.",
    body: [
      {
        type: "h2",
        text: "1. Choose the site",
      },
      {
        type: "p",
        text: "Most fruiting vegetables want 6–8 hours of direct sun. Note afternoon shade in hot climates — a little can reduce sunscald on tomatoes and peppers. Keep beds within a hose length of a spigot. A beautiful bed you cannot water will fail in July.",
      },
      {
        type: "p",
        text: "Level the ground under the frame. A bed that sits 3 inches high on one corner will erode mix out of the low side. You do not need a surveyor; a 4-foot level on the boards is enough.",
      },
      {
        type: "h2",
        text: "2. Decide what goes under the bed",
      },
      {
        type: "ul",
        items: [
          "On lawn: you can sheet-mulch with cardboard (tape and glossy labels removed) and set the frame on top. Grass under a filled bed usually dies.",
          "On soil: open bottom is best so roots and water can move.",
          "On a patio: use a bed with a drainage-safe floor and a mix that drains. Protect the paving from stains if that matters to you.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Skip the gravel “drainage layer”",
        text: "Water does not leave soil and enter a rock layer until the soil is saturated. Rocks steal planting depth and can keep the soil above them wetter, not drier. Woody fill (hugelkultur) is different: twigs, leaves, or logs occupy space you would have paid to fill, and they slowly become organic matter. See [hugelkultur in raised beds](/guides/hugelkultur-in-raised-beds).",
      },
      {
        type: "h2",
        text: "3. Fill in lifts",
      },
      {
        type: "p",
        text: "Add mix in 4–6 inch layers and water each layer. This removes air pockets without compacting the bed into concrete. Use the [soil calculator](/calculators/raised-bed-soil) so you are not short on the last wheelbarrow.",
      },
      {
        type: "h2",
        text: "4. Settle, then top off",
      },
      {
        type: "p",
        text: "After a thorough watering, the surface will drop. Top off to within an inch of the rim, leaving space for [mulch](/calculators/mulch). You can plant the same day in a compost-based mix. If you used a lot of fresh manure compost, wait and check for heat or a strong ammonia smell first.",
      },
      {
        type: "h2",
        text: "5. Watering setup",
      },
      {
        type: "p",
        text: "Lay a soaker hose or drip line before mulch if you can. See [drip irrigation for raised beds](/guides/best-drip-irrigation) or the [soaker hose buying guide](/guides/best-soaker-hose) for hardware, and [how often to water raised beds](/guides/how-often-to-water-raised-beds) for scheduling.",
      },
    ],
    faqs: [
      {
        question: "Do I need landscape fabric under the bed?",
        answer:
          "Usually no, on soil. Fabric can block roots and become a weed-root nightmare at the edges. Use cardboard if you need a short-term grass barrier.",
      },
      {
        question: "Should I add fertilizer when I fill the bed?",
        answer:
          "If the mix already includes substantial compost, you may not need granular fertilizer at fill time. A soil test is the honest way to decide. See the fertilizer guide before broadcasting a high-nitrogen product.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/mulch", label: "Mulch calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      {
        href: "/guides/hugelkultur-in-raised-beds",
        label: "Hugelkultur in raised beds",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
      { href: "/guides/best-raised-garden-beds", label: "Best raised garden beds" },
    ],
  },
  {
    slug: "raised-bed-vs-in-ground-garden",
    title: "Raised Bed vs In-Ground Garden",
    description:
      "A practical comparison of raised beds and in-ground vegetable gardens for US backyards — cost, soil, watering, and when each wins.",
    type: "guide",
    category: "raised-beds",
    updated: "2026-08-26",
    intro:
      "Raised beds buy you soil control, drainage, and easier access. In-ground beds are cheaper per square foot and often handle drought better once established. Neither is automatically “better.”",
    body: [
      {
        type: "h2",
        text: "Side-by-side",
      },
      {
        type: "table",
        headers: ["Factor", "Raised bed", "In-ground"],
        rows: [
          [
            "Upfront cost",
            "Frame plus a large soil purchase",
            "Mostly amendments and time",
          ],
          [
            "Soil control",
            "High — you choose the mix",
            "Depends on what you already have",
          ],
          [
            "Drainage",
            "Usually excellent; can dry out fast",
            "Depends on native soil; clay can pond",
          ],
          [
            "Water in summer",
            "Often more frequent",
            "Deeper native soil can buffer heat",
          ],
          [
            "Weeds",
            "Fewer at first if you fill with clean mix",
            "More work unless you smother or till carefully",
          ],
          [
            "Scale",
            "Best for intensive beds you can reach across",
            "Better when you want long rows",
          ],
        ],
      },
      {
        type: "h2",
        text: "Choose a raised bed when",
      },
      {
        type: "ul",
        items: [
          "Native soil is compacted clay, construction fill, or contaminated and you cannot or should not grow in it",
          "You need a defined, reachable width (about 3–4 feet) for accessibility",
          "You are gardening on a slope, patio, or over poor drainage you can build above",
        ],
      },
      {
        type: "h2",
        text: "Choose in-ground when",
      },
      {
        type: "ul",
        items: [
          "You already have decent loam",
          "You want a large plot without buying several yards of mix",
          "Water is limited and you can improve native soil with compost over time",
        ],
      },
      {
        type: "p",
        text: "Many yards use both: a couple of [raised beds](/raised-beds) for salad crops and tomatoes, and in-ground space for squash or corn that sprawls. If you do raise the bed, [calculate soil](/calculators/raised-bed-soil) before you buy lumber so the budget is honest.",
      },
    ],
    faqs: [
      {
        question: "Do raised beds produce more food?",
        answer:
          "They can, per square foot, because you plant intensively in improved soil. They do not magically outyield a well-managed in-ground garden of the same area.",
      },
      {
        question: "Are raised beds warmer?",
        answer:
          "The soil in a raised frame often warms earlier in spring, which helps tomatoes and peppers. It also means faster drying.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-to-prepare-a-raised-bed",
        label: "How to prepare a raised bed",
      },
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
      { href: "/guides/best-raised-garden-beds", label: "Best raised garden beds" },
    ],
  },
  {
    slug: "how-often-to-water-raised-beds",
    title: "How Often to Water Raised Beds",
    description:
      "How to schedule watering for raised vegetable beds using soil moisture, weather, mulch, and crop type — not a fixed daily calendar.",
    type: "guide",
    category: "watering",
    updated: "2026-08-26",
    featured: true,
    intro:
      "Water when the top 1–2 inches of soil are dry for most established vegetables, not on a rigid everyday schedule. Raised beds usually need water more often than in-ground gardens.",
    body: [
      {
        type: "p",
        text: "A raised bed is a contained volume of soil sitting up in the air. Wind and sun hit more surface area than an in-ground row, so moisture leaves faster. That is the main reason “water every day” advice shows up online — and why it is still the wrong default.",
      },
      {
        type: "h2",
        text: "The finger test beats a calendar",
      },
      {
        type: "p",
        text: "Push a finger into the mix up to the second knuckle. If it feels dry, water deeply. If it feels cool and slightly moist, wait. Newly seeded rows are the exception: the top ½ inch has to stay damp until germination.",
      },
      {
        type: "h2",
        text: "Starting frequencies (then adjust)",
      },
      {
        type: "table",
        headers: ["Conditions", "Established plants", "Notes"],
        rows: [
          [
            "Cool spring, cloudy, mulched",
            "Every 3–4 days, sometimes less",
            "Do not drown seedlings because the calendar said so",
          ],
          [
            "Mild summer, 12-inch bed, mulched",
            "Every 2–3 days",
            "Fruiting crops want even moisture, not swings",
          ],
          [
            "Hot, dry, windy, shallow bed",
            "Daily or every other day",
            "Mulch and extra soil depth help more than a bigger spray nozzle",
          ],
        ],
      },
      {
        type: "p",
        text: "Do not chase a weekly gallon number. Crop type, humidity, wind, mulch, and how deep the bed is all change how fast soil dries. [Drip irrigation](/guides/best-drip-irrigation) and [soaker hoses](/guides/best-soaker-hose) make deep watering easier than a harsh spray.",
      },
      {
        type: "h2",
        text: "Crop differences",
      },
      {
        type: "ul",
        items: [
          "Tomatoes: inconsistent water is a common factor in cracking and blossom-end rot (with calcium uptake). See [tomato spacing](/guides/how-far-apart-to-plant-tomatoes) and the [tomato crop page](/vegetable-gardening/tomatoes).",
          "Peppers: they dislike soggy soil; let the surface dry slightly more than tomatoes.",
          "Cucumbers: shallow roots and high water use; mulch and a trellis help. See [cucumbers in raised beds](/guides/how-to-grow-cucumbers-in-raised-beds).",
          "Lettuce: needs steady moisture or it turns bitter and bolts sooner in heat.",
        ],
      },
      {
        type: "h2",
        text: "When to water during the day",
      },
      {
        type: "p",
        text: "Morning is the practical default in most US climates: leaves dry faster, and plants have water for the heat of the day. Evening watering is acceptable if you water the soil, not the foliage, and the night will not stay wet and still.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Mulch is a watering tool",
        text: "Two inches of straw, shredded leaves, or chips on the surface cuts evaporation. Calculate coverage with the [mulch calculator](/calculators/mulch).",
      },
    ],
    faqs: [
      {
        question: "How much water is 1 inch?",
        answer:
          "Physically, 1 inch of water over 1 square foot is about 0.62 gallons. That conversion is not a watering schedule. A tomato in dry wind and lettuce in a humid week will not want the same gallons.",
      },
      {
        question: "Can I overwater a raised bed?",
        answer:
          "Yes. Constantly wet mix leads to root rot and nutrient issues. Drainage does not make a bed impossible to drown, especially in closed-bottom planters.",
      },
    ],
    relatedTools: [
      { href: "/calculators/mulch", label: "Mulch calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
    ],
    relatedGuides: [
      { href: "/guides/best-drip-irrigation", label: "Drip irrigation for raised beds" },
      { href: "/guides/best-soaker-hose", label: "Best soaker hose" },
      { href: "/guides/best-garden-hose", label: "Best garden hose" },
    ],
  },
  {
    slug: "how-far-apart-to-plant-tomatoes",
    title: "How Far Apart to Plant Tomatoes",
    description:
      "Tomato spacing for determinate and indeterminate plants in raised beds, including cages, pruning, and square-foot layouts.",
    type: "guide",
    category: "planting",
    updated: "2026-08-26",
    featured: true,
    intro:
      "Give determinate tomatoes about 18–24 inches. Give indeterminate plants 24–36 inches unless you prune and trellis aggressively. Crowding is a disease and airflow problem, not a yield trick.",
    body: [
      {
        type: "p",
        text: "Seed packets often list a single spacing. Real spacing depends on whether the plant stops at a bushy height (determinate / “patio” / many sauce types) or keeps growing all season (indeterminate).",
      },
      {
        type: "h2",
        text: "Spacing ranges that actually get used",
      },
      {
        type: "table",
        headers: ["Type", "Spacing in a 4-ft-wide bed", "Support"],
        rows: [
          [
            "Determinate / bush",
            "18–24 in",
            "Cage or short stake",
          ],
          [
            "Indeterminate, caged, little pruning",
            "30–36 in",
            "Tall cage; do not pinch into a single stem unless you know the system",
          ],
          [
            "Indeterminate, pruned to 1–2 stems on twine or a stake",
            "18–24 in",
            "Requires weekly sucker removal",
          ],
          [
            "Cherry, vigorous indeterminate",
            "24–36 in",
            "They outgrow tight spacing by July",
          ],
        ],
      },
      {
        type: "p",
        text: "In a 4×8 bed, 18-inch grid spacing can theoretically fit 10 plants. That is a lot of tomatoes in 32 square feet. It only works if you trellis, prune, and water evenly. Two to six well-grown plants often feed a household with less blight pressure. Check the count with the [plant spacing calculator](/calculators/plant-spacing).",
      },
      {
        type: "h2",
        text: "Square-foot gardening",
      },
      {
        type: "p",
        text: "The common square-foot rule is one tomato per square. For indeterminate varieties, one plant per two squares (about 18×24 inches or more) is less of a jungle. Determinate plants fit the 1-per-square pattern more honestly.",
      },
      {
        type: "h2",
        text: "Why gardeners plant too close",
      },
      {
        type: "p",
        text: "Seedlings look tiny in May. By August, poorly spaced indeterminates shade their own lower leaves, stay wet after rain, and make harvest a wrestling match. If you only have one 4×8 bed, plant fewer tomatoes and interplant basil or lettuce at the edges early in the season.",
      },
      {
        type: "p",
        text: "For soil and feeding that match close planting, see [how to fertilize a raised bed](/guides/how-to-fertilize-a-raised-bed-garden) and the full [tomato growing page](/vegetable-gardening/tomatoes).",
      },
    ],
    faqs: [
      {
        question: "Can I plant tomatoes 12 inches apart?",
        answer:
          "Only in a managed single-stem system, and even then disease pressure can be high. It is not a beginner spacing.",
      },
      {
        question: "How far from peppers?",
        answer:
          "Keep tomatoes from heavily shading peppers. A foot or more between canopies is more important than a magic number. See [pepper spacing](/guides/how-far-apart-to-plant-peppers).",
      },
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      { href: "/vegetable-gardening/tomatoes", label: "How to grow tomatoes" },
      {
        href: "/guides/how-far-apart-to-plant-peppers",
        label: "How far apart to plant peppers",
      },
      { href: "/guides/best-garden-trellis", label: "Best garden trellis" },
    ],
  },
  {
    slug: "how-far-apart-to-plant-peppers",
    title: "How Far Apart to Plant Peppers",
    description:
      "Bell and hot pepper spacing for raised beds, including square-foot layouts and airflow.",
    type: "guide",
    category: "planting",
    updated: "2026-08-26",
    intro:
      "Most bell and hot peppers grow well at 12–18 inches in a raised bed. Large bell plants and big-leaf varieties need the wider end of that range.",
    body: [
      {
        type: "p",
        text: "Peppers stay smaller than indeterminate tomatoes, so they tolerate closer spacing. They still need sun on the fruit and dry leaves after rain.",
      },
      {
        type: "h2",
        text: "Spacing that matches plant size",
      },
      {
        type: "table",
        headers: ["Pepper type", "Spacing", "Notes"],
        rows: [
          ["Compact hot peppers (many cayennes, some jalapeños)", "12–14 in", "Still stake if they load with fruit"],
          ["Standard bells and jalapeños", "14–18 in", "Default for a 4-foot-wide bed"],
          ["Large bells, Italian frying types, big plants", "18–24 in", "Leaves are broad; crowding causes rot in humid regions"],
          ["Square-foot gardening", "1 per square", "Works for most peppers; use 1 per two squares for huge bells"],
        ],
      },
      {
        type: "p",
        text: "A 4×8 bed at 18-inch grid spacing fits about 10 plants — a full pepper bed. Mix hot and sweet types if you want variety without filling every square. Confirm the layout in the [plant spacing calculator](/calculators/plant-spacing).",
      },
      {
        type: "h2",
        text: "Raised-bed specifics",
      },
      {
        type: "p",
        text: "Peppers like warmth. Raised beds help in spring. Do not transplant into cold, wet mix; wait until soil is roughly 60°F and nights are reliably mild. Overcrowding in a rich, wet bed encourages foliar disease in the Southeast and Mid-Atlantic more than in dry-summer climates.",
      },
      {
        type: "p",
        text: "Water less often than tomatoes once plants are established, but do not let pots-on-legs (shallow beds) go bone dry during fruit set. Details are on the [pepper crop page](/vegetable-gardening/peppers).",
      },
    ],
    faqs: [
      {
        question: "Can peppers go in the same bed as tomatoes?",
        answer:
          "Yes. Give tomatoes the extra room and keep peppers on the sunnier edge so they are not shaded by tomato cages.",
      },
      {
        question: "Do hot peppers need more space than bells?",
        answer:
          "Not usually. Plant size matters more than heat level. A compact habanero may need less room than a giant bell.",
      },
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
    ],
    relatedGuides: [
      { href: "/vegetable-gardening/peppers", label: "How to grow peppers" },
      {
        href: "/guides/how-far-apart-to-plant-tomatoes",
        label: "How far apart to plant tomatoes",
      },
      {
        href: "/guides/how-to-fertilize-a-raised-bed-garden",
        label: "How to fertilize a raised bed garden",
      },
    ],
  },
  {
    slug: "how-to-grow-cucumbers-in-raised-beds",
    title: "How to Grow Cucumbers in Raised Beds",
    description:
      "Trellis vs sprawl, spacing, watering, and common cucumber problems in backyard raised beds.",
    type: "guide",
    category: "crops",
    updated: "2026-08-26",
    intro:
      "Trellis cucumbers in a raised bed at about 12 inches apart. Let bush types have 18–24 inches. Consistent moisture and airflow matter more than a special fertilizer.",
    body: [
      {
        type: "p",
        text: "Cucumbers are easy until they are not: powdery mildew, bitter fruit from water stress, and vines that eat an entire 4×8 bed if you let them sprawl. A trellis is the difference between a cucumber crop and a cucumber thicket.",
      },
      {
        type: "h2",
        text: "Trellis or not",
      },
      {
        type: "table",
        headers: ["Method", "Spacing", "Best for"],
        rows: [
          ["Vertical trellis (netting, cattle panel, A-frame)", "10–12 in along the base", "Slicing and most vining varieties"],
          ["Bush / patio types on the soil", "18–24 in", "Small beds without a tall structure"],
          ["Unguided vining on the ground", "36 in or more", "Only if you have room to waste"],
        ],
      },
      {
        type: "p",
        text: "Put the trellis on the north side of a bed that also holds shorter crops so you do not shade lettuce all day. See the [trellis buying guide](/guides/best-garden-trellis) for structural questions, and count plants with the [spacing calculator](/calculators/plant-spacing).",
      },
      {
        type: "h2",
        text: "Soil and planting",
      },
      {
        type: "p",
        text: "Cucumbers want well-drained, compost-rich soil and warmth. Direct-sow after the last frost when soil is at least the mid-60s °F, or transplant carefully (they dislike root disturbance). Plant seeds about 1 inch deep.",
      },
      {
        type: "h2",
        text: "Water",
      },
      {
        type: "p",
        text: "Uneven water makes bitter, curved fruit. Mulch and a soaker line under the vines work better than overhead spray, which also wets leaves. Check soil 2 inches down instead of following a gallon chart. Harvest often; oversized fruit signals the plant to slow down.",
      },
      {
        type: "h2",
        text: "Problems to expect",
      },
      {
        type: "ul",
        items: [
          "Powdery mildew: morning sun and a trellis help; avoid crowding.",
          "Cucumber beetles: row cover until flowering if beetles are bad in your area, then uncover for pollinators.",
          "Poor pollination: odd, shriveled fruit often means not enough bee visits. Do not spray insecticides on open flowers.",
        ],
      },
      {
        type: "p",
        text: "Variety notes and season length are on the [cucumber crop page](/vegetable-gardening/cucumbers).",
      },
    ],
    faqs: [
      {
        question: "How many cucumber plants in a 4x8 bed?",
        answer:
          "Four to six trellised plants along one long side is plenty for most families. Bush types take more floor space, so plant fewer.",
      },
      {
        question: "Should I plant in mounds?",
        answer:
          "Mounds help drainage in heavy in-ground soil. In a well-built raised bed they are optional. A flat, mulched surface with drip is simpler.",
      },
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
    ],
    relatedGuides: [
      { href: "/vegetable-gardening/cucumbers", label: "Cucumber growing overview" },
      { href: "/guides/best-garden-trellis", label: "Best garden trellis" },
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
    ],
  },
  {
    slug: "how-to-fertilize-a-raised-bed-garden",
    title: "How to Fertilize a Raised Bed Garden",
    description:
      "A conservative approach to fertilizing raised vegetable beds using compost, soil tests, labels, and nitrogen math.",
    type: "guide",
    category: "soil",
    updated: "2026-08-26",
    featured: true,
    intro:
      "Start with compost and a soil test when you can. Use fertilizer to correct a known need, not as a weekly habit. Product labels and test results override generic internet rates.",
    body: [
      {
        type: "p",
        text: "Raised beds filled with a compost-rich mix often have enough nutrients for a first crop of lettuce or beans. Fruiting crops (tomatoes, peppers, squash) may still run short of nitrogen or potassium midseason. The mistake is dumping a high-nitrogen product every Saturday.",
      },
      {
        type: "h2",
        text: "A working order of operations",
      },
      {
        type: "ol",
        items: [
          "Build or refresh the bed with compost mixed into the soil, not only a dusting on top. See [soil mix](/guides/best-soil-mix-for-raised-beds).",
          "If plants were disappointing last year, get a soil test through your cooperative extension. It is the least guessy option in the US.",
          "If you fertilize, match the bag to the crop. The [fertilizer calculator](/calculators/fertilizer) does that without asking you to know N-P-K first: leafy crops lean nitrogen, fruiting crops lean potassium, mixed beds stay balanced.",
          "If you already have a bag, the same calculator turns the three numbers into kitchen spoons (tsp or Tbsp). Pick Light, Typical, or Stronger — you do not need a nitrogen rate. When that estimate disagrees with the label, follow the label.",
          "Water fertilizer into moist soil. Keep granules out of the crown of the plant.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "This is not a prescription",
        text: "Recommended rates vary by crop, region, soil test, and product. Never exceed the label. If the calculator and the label disagree, follow the label.",
      },
      {
        type: "h2",
        text: "Compost vs fertilizer",
      },
      {
        type: "p",
        text: "Compost feeds soil life and adds a slow trickle of nutrients. It is not a precise N-P-K source. A 1-inch top-dress (see the [compost calculator](/calculators/compost)) is a reasonable annual habit for many beds. Fertilizer is for a measured extra push or a documented deficiency.",
      },
      {
        type: "h2",
        text: "Midseason side-dressing",
      },
      {
        type: "p",
        text: "Tomatoes and peppers often get a side-dress when the first fruit sets, not the day you transplant. Keep nitrogen moderate. If leaves are deep green and plants are lush but flower poorly, more nitrogen is the wrong move.",
      },
      {
        type: "p",
        text: "Regional note: alkaline soils in parts of the West can lock up some nutrients; acidic soils in parts of the East have different issues. A test beats copying a rate from another state.",
      },
    ],
    faqs: [
      {
        question: "Do I fertilize every time I water?",
        answer:
          "No, unless you are using a specifically labeled water-soluble program and following that label. Most granular products are applied much less often.",
      },
      {
        question: "Is organic fertilizer gentler?",
        answer:
          "Not automatically. Over-applying any nitrogen source can still burn plants or drive leafy growth. “Organic” describes the source, not a free pass on rate.",
      },
    ],
    relatedTools: [
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
    ],
    relatedGuides: [
      { href: "/vegetable-gardening/tomatoes", label: "Growing tomatoes" },
      { href: "/vegetable-gardening/peppers", label: "Growing peppers" },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
    ],
  },
  {
    slug: "best-raised-bed-soil",
    title: "Best Raised Bed Soil: What to Look For",
    description:
      "Buying criteria for bagged and bulk raised bed soil, without fake reviews, prices, or test claims.",
    type: "product",
    category: "products",
    updated: "2026-08-26",
    intro:
      "This page is a buying framework, not a ranked list of brands. We have not independently lab-tested bagged soils. Use it to read labels and compare bulk deliveries.",
    body: [
      {
        type: "h2",
        text: "Bagged mix vs bulk delivery",
      },
      {
        type: "p",
        text: "Bags make sense under about 1 cubic yard, or when you cannot get a truck into the yard. Bulk almost always wins on price for a 4×8×12-inch fill (32 cubic feet). Run the [soil calculator](/calculators/raised-bed-soil) before you shop.",
      },
      {
        type: "h2",
        text: "What to look for on a label",
      },
      {
        type: "ul",
        items: [
          "Listed ingredients: compost, aged forest products, topsoil, or bark fines — not mystery “organics”",
          "Texture in the bag: moist but not slimy; recognizable compost, not shredded sticks",
          "A cubic-foot volume printed on the bag so you can compare cost per cubic foot",
          "Avoid mixes that are hydrophobic (water beads and runs off) unless you can wet them thoroughly before planting",
        ],
      },
      {
        type: "h2",
        text: "Questions for a bulk supplier",
      },
      {
        type: "ol",
        items: [
          "Is this screened topsoil, compost, or a blend? Ask for the recipe.",
          "Has it been sitting anaerobic (sour smell)? Walk away from that load.",
          "Can you see a sample pile, not only a website photo?",
        ],
      },
      {
        type: "p",
        text: "How to combine what you buy is covered in [best soil mix for raised beds](/guides/best-soil-mix-for-raised-beds).",
      },
    ],
    faqs: [
      {
        question: "Is “raised bed soil” different from “garden soil”?",
        answer:
          "Sometimes. Raised-bed bags are often lighter and more compost-rich. Garden soil may contain more mineral topsoil. Read the ingredients rather than the category name.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/compost", label: "Compost calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
      {
        href: "/guides/how-much-soil-does-a-raised-bed-need",
        label: "How much soil does a raised bed need?",
      },
      {
        href: "/guides/potting-mix-vs-garden-soil",
        label: "Potting mix vs garden soil",
      },
    ],
    products: ["raised-bed-soil-mix-placeholder"],
  },
  {
    slug: "best-raised-garden-beds",
    title: "Best Raised Garden Beds: How to Choose a Frame",
    description:
      "How to choose a raised bed kit or build: height, width, materials, and structural strength — without fake product tests.",
    type: "product",
    category: "products",
    updated: "2026-08-26",
    intro:
      "The best bed is one you can reach across, fill with enough soil, and that will not bow out when wet. This page covers those criteria. It does not rank brands.",
    body: [
      {
        type: "h2",
        text: "Dimensions that work",
      },
      {
        type: "ul",
        items: [
          "Width: 3–4 feet so you can reach the center without stepping in the soil",
          "Length: 8 feet is common because lumber is sold that way",
          "Soil depth: see [how deep a raised bed should be](/guides/how-deep-should-a-raised-bed-be)",
        ],
      },
      {
        type: "h2",
        text: "Materials",
      },
      {
        type: "table",
        headers: ["Material", "Look for", "Tradeoff"],
        rows: [
          ["Cedar or other rot-resistant wood", "Board thickness; thin “kits” flex", "Higher cost, finite lifespan"],
          ["Untreated pine", "Cheap and available", "Shorter life in wet climates"],
          ["Metal kits", "Gauge (thickness) and interior coatings", "Heats more in full sun; check bowing"],
          ["Composite / plastic", "UV rating and structural ribs", "Quality varies widely"],
        ],
      },
      {
        type: "p",
        text: "Avoid treating interior faces with random deck stains unless the product is labeled for food-garden use. After you pick a size, [calculate soil](/calculators/raised-bed-soil) — the dirt usually costs more than the box.",
      },
    ],
    faqs: [
      {
        question: "Is pressure-treated lumber safe?",
        answer:
          "Modern residential treated lumber is not the old CCA formula. Whether you want it against vegetable soil is a personal and regional judgment; many gardeners still prefer untreated cedar or a liner. This site does not issue a safety certification.",
      },
    ],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-to-prepare-a-raised-bed",
        label: "How to prepare a raised bed",
      },
      {
        href: "/guides/raised-bed-vs-in-ground-garden",
        label: "Raised bed vs in-ground garden",
      },
    ],
    products: ["cedar-raised-bed-placeholder"],
  },
  {
    slug: "best-garden-hose",
    title: "Best Garden Hose: Buying Criteria",
    description:
      "What to look for in a backyard garden hose: diameter, fittings, kink resistance, and drinking-water labeling — not fake reviews.",
    type: "product",
    category: "products",
    updated: "2026-08-26",
    intro:
      "A useful hose reaches the bed without kinking at the spigot and uses fittings that do not leak. Length and diameter matter more than color. This page is a spec sheet, not a ranked brand list.",
    body: [
      {
        type: "h2",
        text: "Criteria",
      },
      {
        type: "ul",
        items: [
          "Length: measure from spigot to the farthest bed, then add slack. Extra coil left in the sun is better than a hose that yanks fittings.",
          "Diameter: 5/8 inch is the usual backyard standard. 1/2 inch is lighter and restricts flow; 3/4 inch is heavier.",
          "Fittings: solid metal collars generally outlast thin plastic. Check that the gasket is included.",
          "Use: if you drink from a hose or fill pet bowls, look for a drinking-water-safe label. Many hoses are not made for that.",
        ],
      },
      {
        type: "p",
        text: "Pair a hose with a shutoff at the bed so you are not running back to the house. For the beds themselves, [drip irrigation](/guides/best-drip-irrigation) or a [soaker hose](/guides/best-soaker-hose) waters more evenly than a jet nozzle. How long to run it depends on heat, humidity, and the crop — see [how often to water raised beds](/guides/how-often-to-water-raised-beds).",
      },
    ],
    faqs: [
      {
        question: "Do expandible hoses work for raised beds?",
        answer:
          "They can for light watering. They often fail at fittings and dislike being dragged over lumber corners. A conventional 5/8-inch hose is the more durable default.",
      },
    ],
    relatedTools: [
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      { href: "/guides/best-drip-irrigation", label: "Drip irrigation for raised beds" },
      { href: "/guides/best-soaker-hose", label: "Best soaker hose" },
    ],
    products: ["garden-hose-placeholder"],
  },
  {
    slug: "best-soaker-hose",
    title: "Best Soaker Hose: Buying Criteria",
    description:
      "How to choose a soaker hose for raised vegetable beds, including length, pressure, and layout — without fabricated reviews.",
    type: "product",
    category: "products",
    updated: "2026-08-26",
    intro:
      "Soaker hoses wet soil along their length. They work well under mulch in rectangular beds if you match length to available pressure and do not expect perfectly even output on a 100-foot run. This page covers layout and pressure, not brand rankings.",
    body: [
      {
        type: "h2",
        text: "What to look for",
      },
      {
        type: "ul",
        items: [
          "Length vs bed: two 8-foot runs in a 4×8 bed (one down each side of a center path of plants) is a common pattern",
          "Pressure: many soakers want low pressure; a cheap regulator can prevent bursting and dry spots",
          "Material: recycled rubber soakers work; they clog more in hard water and need occasional replacement",
          "Fittings: the adapter to your garden hose is a common leak point",
        ],
      },
      {
        type: "p",
        text: "Lay the soaker before mulch so you can see wetness while you test. Run it long enough that water reaches 4–6 inches down, not just the surface. A tuna-can test or a soil probe tells you if the soaker is actually wetting the root zone — not a weekly gallon chart.",
      },
    ],
    faqs: [
      {
        question: "Soaker hose or drip irrigation?",
        answer:
          "Drip emitters or drip tape are more even on long runs and easier to repair piece by piece. Soaker hose is simpler for a single rectangular bed. Either beats watering leaves. The drip irrigation buying guide on this site covers kits, emitters, and layout.",
      },
    ],
    relatedTools: [
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
    ],
    relatedGuides: [
      { href: "/guides/best-drip-irrigation", label: "Drip irrigation for raised beds" },
      { href: "/guides/best-garden-hose", label: "Best garden hose" },
    ],
    products: ["soaker-hose-placeholder"],
  },
  {
    slug: "best-drip-irrigation",
    title: "Best Drip Irrigation for Raised Beds: Buying Criteria",
    description:
      "How to choose drip tubing, emitters, and a kit for backyard raised beds — layout, pressure, and timers, without fake product reviews.",
    type: "product",
    category: "products",
    updated: "2026-08-26",
    intro:
      "Drip irrigation puts water at the soil, under mulch, on a schedule you can run from a hose bib. For raised vegetable beds it is usually a better default than overhead spray. It is not a gallon prescription: you still check moisture with a finger. This page covers parts, layout, and maintenance — not ranked kits.",
    body: [
      {
        type: "h2",
        id: "when-drip-helps",
        text: "When drip is worth it",
      },
      {
        type: "p",
        text: "Raised beds dry from the sides and the top. A hose-end sprayer wets leaves, wastes water on paths, and is easy to skip on a hot weekday. Drip (or a [soaker hose](/guides/best-soaker-hose)) keeps the wet zone in the root area. Pair it with [mulch](/calculators/mulch) and you will water less often — still using the [finger test](/guides/how-often-to-water-raised-beds), not a weekly gallon chart.",
      },
      {
        type: "table",
        caption: "Drip vs other ways to water a raised bed",
        headers: ["Method", "Best for", "Watch-outs"],
        rows: [
          [
            "Drip emitters or dripline",
            "Tomatoes, peppers, mixed beds where plants sit on a grid",
            "Needs a filter and low pressure; emitters clog if you never flush",
          ],
          [
            "Drip tape",
            "Rows of carrots, lettuce, onions",
            "Thin walls; replace more often; fittings are easy to crush",
          ],
          [
            "Soaker hose",
            "One 4×8 bed with a simple layout",
            "Output varies along the length; harder to repair than a punched emitter",
          ],
          [
            "Watering can or wand",
            "Transplants, pots, and checking a new bed",
            "Easy to water the surface only; hard to keep even in heat",
          ],
        ],
      },
      {
        type: "h2",
        text: "Parts that actually matter",
      },
      {
        type: "p",
        text: "A backyard drip system is a short stack of parts on a [garden hose](/guides/best-garden-hose), not a farm manifold. If a kit skips the filter or pressure regulator, buy those separately or pick a different kit.",
      },
      {
        type: "ul",
        items: [
          "Faucet adapter: 3/4-inch hose thread to whatever tubing the kit uses.",
          "Filter: screen or disc filter. Municipal water still carries grit that plugs 0.5–1 GPH emitters.",
          "Pressure regulator: most drip tubing wants roughly 15–30 PSI. House hose pressure is often higher and will blow fittings or make emitters dump.",
          "Mainline: 1/2-inch polyethylene is the usual raised-bed backbone. 1/4-inch is for short runs to a plant, not the whole 4×8.",
          "Emitters, dripline, or tape: button emitters at each plant, inline dripline with emitters already in the tube, or thin drip tape for rows.",
          "End caps, goof plugs, and a few tees: you will punch a wrong hole.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Kits vs piecemeal",
        text: "A kit is the practical start for one or two beds. Read the tubing length on the box against your actual bed count. A kit meant for patio pots will run out before a pair of 4×8 frames. Piecemeal parts make sense once you know you like drip and need spare emitters.",
      },
      {
        type: "h2",
        text: "Layout for a 4×8 bed",
      },
      {
        type: "p",
        text: "You do not need a line to every square inch. You need wet soil in the root zone, 4–6 inches down, without soaking the aisle.",
      },
      {
        type: "ul",
        items: [
          "Two 8-foot laterals (one on each long half of the bed) cover most mixed plantings. One center line is often not enough for plants at both edges.",
          "Put emitters at the plant, not in the path. For tomatoes and peppers, one or two 1 GPH emitters per plant is a common starting point — then you still check soil, because 1 GPH in humid weather is not the same as 1 GPH in dry wind.",
          "Row crops (carrots, lettuce, onions) are easier with drip tape or dripline along the row than with a button at every seedling.",
          "Lay tubing before mulch so you can see wet spots on the first run. Then cover it. Sun-cooked tubing gets brittle.",
        ],
      },
      {
        type: "example",
        title: "Example: 4×8 with four tomato plants and a lettuce row",
        text: "Run 1/2-inch mainline in from the hose, tee into two 8-foot 1/2-inch laterals. Punch emitters at each tomato. Add a length of dripline or tape along the lettuce. Cap the ends. Run the system until a finger 2 inches down is moist under the tomatoes, then note the minutes on your timer. That time is a starting point for this bed this week, not a rule for next month.",
      },
      {
        type: "h2",
        text: "What to check before you buy a kit",
      },
      {
        type: "ul",
        items: [
          "Does it include a filter and a pressure regulator, or only tubing and a faucet adapter?",
          "How many feet of 1/2-inch line vs 1/4-inch spaghetti tubing? Raised beds want more 1/2-inch than a hanging-basket kit.",
          "Emitter rate labeled in GPH (gallons per hour), not a vague “for vegetables.”",
          "UV-resistant tubing. Thin vinyl that kinks at the board corner will be the first leak.",
          "Spare emitters and goof plugs in the bag. You will need them the first afternoon.",
          "A timer is optional on day one and useful by July. Buy one that you can override after rain; a timer that cannot be skipped will water a wet bed.",
        ],
      },
      {
        type: "h2",
        text: "Timers, still not autopilot",
      },
      {
        type: "p",
        text: "A hose-end timer is the usual backyard choice: battery, threads onto the spigot, drip kit on the outlet. It does not know humidity, wind, or that you just had a storm. Use it so the bed gets a deep soak when you are not home, then change the days or minutes when the finger test says the mix is staying wet or going dusty. See [how often to water raised beds](/guides/how-often-to-water-raised-beds).",
      },
      {
        type: "h2",
        text: "Maintenance",
      },
      {
        type: "ul",
        items: [
          "Flush the lines at the start of the season and after you add new fittings. Open the end caps and run water until it runs clear.",
          "If one plant is dry and its neighbor is swampy, the emitter is clogged or pulled out. Swap it; do not crank the timer for the whole bed.",
          "Where winter freezes, disconnect the timer, drain tubing, and store the timer indoors. Ice splits cheap plastic at the hose thread.",
          "Hard water and well water clog faster. A filter you actually clean matters more than a fancier emitter brand we have not evaluated.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is drip better than a soaker hose for one raised bed?",
        answer:
          "For a single 4×8, a soaker hose is simpler. Drip wins when you have several beds, mixed plant spacing, or you want to repair one emitter instead of replacing a whole hose. Both beat spraying leaves.",
      },
      {
        question: "Can I run drip from a rain barrel?",
        answer:
          "Only if the barrel sits high enough to make useful pressure, or you add a pump. Gravity-only barrels often trickle too weakly for a long emitter run. Test one line before you build the whole layout around it.",
      },
      {
        question: "How long should I run drip each day?",
        answer:
          "There is no honest universal number. Crop, heat, humidity, mulch, and soil mix change how fast a bed dries. Run until moisture reaches a few inches down, then use that runtime as a starting point and adjust with a finger test.",
      },
      {
        question: "Do I need separate zones for tomatoes and lettuce?",
        answer:
          "Nice if you already like tinkering. Not required for a first backyard system. Plant thirsty and less-thirsty crops in different beds if you can; otherwise put extra emitters on fruiting plants and fewer on herbs, then still check soil.",
      },
    ],
    relatedTools: [
      { href: "/calculators/mulch", label: "Mulch calculator" },
      { href: "/calculators/garden-area", label: "Garden area calculator" },
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
      { href: "/guides/best-soaker-hose", label: "Best soaker hose" },
      { href: "/guides/best-garden-hose", label: "Best garden hose" },
    ],
    products: ["drip-irrigation-kit-placeholder", "drip-timer-placeholder"],
  },
  {
    slug: "best-garden-trellis",
    title: "Best Garden Trellis: Buying Criteria",
    description:
      "How to choose a trellis for cucumbers, peas, and tomatoes in raised beds, focused on wind, height, and anchoring.",
    type: "product",
    category: "products",
    updated: "2026-08-26",
    intro:
      "A trellis has to survive wind when it is covered in wet vines. Height and anchoring matter more than decorative woodwork. This page matches structure to the crop; it does not rank models.",
    body: [
      {
        type: "h2",
        text: "Match the crop",
      },
      {
        type: "table",
        headers: ["Crop", "Useful height", "Notes"],
        rows: [
          ["Peas", "4–6 ft", "Netting is enough if posts are solid"],
          ["Cucumbers", "5–7 ft", "Cattle panel or heavy net; see the [cucumber guide](/guides/how-to-grow-cucumbers-in-raised-beds)"],
          ["Indeterminate tomatoes", "6 ft+ of stake, twine, or panel", "Flimsy tomato cages fail by July"],
        ],
      },
      {
        type: "h2",
        text: "Structural checks",
      },
      {
        type: "ul",
        items: [
          "Can you stake it into the ground outside the bed or brace it to the frame?",
          "Will the panel sit on the north side so it does not shade the whole bed?",
          "Can you reach fruit without stepping on soil?",
        ],
      },
    ],
    faqs: [
      {
        question: "Can I lean a trellis on the raised bed boards?",
        answer:
          "Only if the frame is stout. Thin kit walls can rack. Independent posts next to the bed are safer in wind.",
      },
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-to-grow-cucumbers-in-raised-beds",
        label: "Cucumbers in raised beds",
      },
      {
        href: "/guides/how-far-apart-to-plant-tomatoes",
        label: "Tomato spacing",
      },
    ],
    products: ["garden-trellis-placeholder"],
  },
  {
    slug: "best-pruning-shears",
    title: "Best Pruning Shears: Buying Criteria",
    description:
      "What to look for in bypass pruners for vegetable gardens, without fake ratings or “we tested” claims.",
    type: "product",
    category: "products",
    updated: "2026-08-26",
    intro:
      "Bypass pruning shears make clean cuts on live tomato suckers, pepper stems, and herbs. Anvil pruners crush green tissue and are the wrong default for vegetables. This page covers blade type and durability, not brand awards.",
    body: [
      {
        type: "h2",
        text: "What matters",
      },
      {
        type: "ul",
        items: [
          "Bypass blades (scissor action), not anvil",
          "A size that fits your hand; a lock that actually stays locked in a pocket",
          "Replaceable blades or a brand that sells springs — cheap shears that cannot be sharpened get thrown away",
          "Sanitation: you should be able to wipe sap and soil off between blighty tomato plants",
        ],
      },
      {
        type: "p",
        text: "You will use shears more than a full-size pruner in a raised-bed garden. Keep them dry. For tomato pruning context, see [tomato spacing](/guides/how-far-apart-to-plant-tomatoes) and the [tomato page](/vegetable-gardening/tomatoes).",
      },
    ],
    faqs: [
      {
        question: "Do I need Felco-style shears?",
        answer:
          "Not to grow food. Comfort, a sharp bypass blade, and the habit of cutting rather than tearing matter more than a brand name we have not evaluated here.",
      },
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
    ],
    relatedGuides: [
      { href: "/garden-tools", label: "Garden tools hub" },
      { href: "/vegetable-gardening/tomatoes", label: "Growing tomatoes" },
    ],
    products: ["pruning-shears-placeholder"],
  },
  ...topicGuides,
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}

export function isGuidePublished(guide: Pick<Guide, "published">): boolean {
  return guide.published !== false;
}

export function getPublishedGuides(): Guide[] {
  return guides.filter(isGuidePublished);
}

export function getGuidesByCategory(category: Guide["category"]): Guide[] {
  return getPublishedGuides().filter((guide) => guide.category === category);
}

export function getFeaturedGuides(): Guide[] {
  return getPublishedGuides().filter((guide) => guide.featured);
}

export function getHowToGuides(): Guide[] {
  return getPublishedGuides().filter((guide) => guide.type === "guide");
}

export function getProductGuides(): Guide[] {
  return getPublishedGuides().filter((guide) => guide.type === "product");
}
