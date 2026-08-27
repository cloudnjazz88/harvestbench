import type { FaqItem, RelatedLink } from "@/data/types";
import { additionalCrops } from "@/data/crops-more";

export type CropFact = {
  label: string;
  value: string;
};

export type CropGroup = "fruiting" | "leafy" | "roots" | "herbs" | "perennials";

export const cropGroupLabels: Record<CropGroup, { title: string; description: string }> = {
  fruiting: {
    title: "Fruiting crops",
    description: "Tomatoes, peppers, squash, beans, and other crops grown for fruit or pods.",
  },
  leafy: {
    title: "Leafy greens & brassicas",
    description: "Lettuce, kale, spinach, broccoli, and other cool-season leaves and heads.",
  },
  roots: {
    title: "Roots & alliums",
    description: "Carrots, potatoes, onions, garlic, and other underground or bulb crops.",
  },
  herbs: {
    title: "Herbs",
    description: "Culinary herbs that earn a square or two at the edge of a vegetable bed.",
  },
  perennials: {
    title: "Perennials",
    description: "Crops that stay in the bed more than one season.",
  },
};

export const cropGroupOrder: CropGroup[] = [
  "fruiting",
  "leafy",
  "roots",
  "herbs",
  "perennials",
];

export type Crop = {
  slug: string;
  name: string;
  group: CropGroup;
  description: string;
  intro: string;
  facts: CropFact[];
  complete: boolean;
  soil: string[];
  watering: string[];
  sunlight: string;
  planting: string[];
  spacing: string[];
  problems: { name: string; detail: string }[];
  tools: string[];
  relatedTools: RelatedLink[];
  relatedGuides: RelatedLink[];
  faqs: FaqItem[];
  extraSections?: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

const coreCrops: Crop[] = [
  {
    slug: "tomatoes",
    name: "Tomatoes",
    group: "fruiting",
    description:
      "How to grow tomatoes in raised beds: spacing, soil, watering, planting depth, harvest timing, and common problems.",
    intro:
      "Tomatoes are the crop most backyard raised beds get built for. They want heat, consistent water, and more space than the seedling tray suggests. Determinate plants stay bushier; indeterminate plants keep growing until frost.",
    complete: true,
    facts: [
      { label: "Spacing", value: "18–24 in determinate; 24–36 in indeterminate" },
      { label: "Soil", value: "Well-drained, compost-rich, pH about 6.0–6.8" },
      { label: "Sunlight", value: "8+ hours; light afternoon shade can help in extreme heat" },
      { label: "Planting depth", value: "Bury two-thirds of the stem on transplants" },
      { label: "Water", value: "Even moisture; about 1–1.5 in/week as a planning estimate" },
      { label: "Days to harvest", value: "Often 55–85 days from transplant, variety-dependent" },
    ],
    soil: [
      "A 12–18 inch rooting depth is a practical target in a closed bed. Open-bottom beds can be shallower if native soil below is decent.",
      "Compost-rich mix is better than a heavy nitrogen dump at transplant. Too much nitrogen makes vines and few flowers.",
      "If blossom-end rot shows up, look at watering consistency and soil calcium before assuming you need a foliar spray. A soil test is more informative than adding random lime.",
    ],
    watering: [
      "Keep moisture even once fruit sets. Wild swings are a common factor in cracking and blossom-end rot.",
      "Water the soil, not the leaves. Soaker hose or drip under mulch is easier than overhead spray.",
      "Check 2 inches down with a finger. Crop type, heat, wind, and humidity change how fast a bed dries — there is no honest weekly gallon formula.",
    ],
    sunlight:
      "Full sun is the default. In the hottest US summers, a bit of late-afternoon shade can reduce sunscald on exposed fruit. Do not plant on the north side of a tall trellis that steals morning light.",
    planting: [
      "Transplant after nights stay reliably above the low 50s °F and soil has warmed. Cold, wet soil stalls plants.",
      "Strip the lower leaves and bury most of the stem. Tomatoes grow roots along the buried stem.",
      "Set the support the same day. Wrestling a cage over a 3-foot plant damages branches.",
    ],
    spacing: [
      "Determinate / bush: 18–24 inches.",
      "Indeterminate with cages and little pruning: 30–36 inches.",
      "Indeterminate pruned to one or two stems: 18–24 inches, with weekly sucker removal.",
      "Square-foot: 1 plant per square for determinates; 1 per two squares is more realistic for vigorous indeterminates.",
    ],
    problems: [
      {
        name: "Blossom-end rot",
        detail:
          "Dark leathery patch on the blossom end. Often tied to uneven water and calcium uptake, not a one-time “add calcium” fix. Mulch and steady irrigation first.",
      },
      {
        name: "Early blight / leaf spots",
        detail:
          "Lower leaves yellow with spots in humid weather. Improve airflow, avoid wetting foliage, and do not crowd plants. Remove badly affected leaves; do not compost obviously diseased material if your pile stays cold.",
      },
      {
        name: "Hornworms",
        detail:
          "Missing leaves and dark droppings. Hand-pick. If you see wasp cocoons on a worm, leave that one — the wasps are already working.",
      },
      {
        name: "Cracking",
        detail:
          "Often follows a rain after a dry spell. Even water and varieties listed as crack-resistant help; they do not make fruit waterproof.",
      },
    ],
    tools: [
      "Stakes, twine, or a stout cage",
      "Bypass pruners for suckers and harvest",
      "Mulch and a soaker hose",
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/calculators/potting-mix", label: "Potting mix calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-far-apart-to-plant-tomatoes",
        label: "How far apart to plant tomatoes",
      },
      {
        href: "/guides/growing-vegetables-in-containers",
        label: "Growing vegetables in containers",
      },
      {
        href: "/guides/how-to-fertilize-a-raised-bed-garden",
        label: "How to fertilize a raised bed garden",
      },
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
      { href: "/guides/best-pruning-shears", label: "Pruning shears buying guide" },
    ],
    faqs: [
      {
        question: "Should I remove tomato suckers?",
        answer:
          "On indeterminate plants grown as one or two stems, yes, regularly. On determinates, go easy — those side shoots carry much of the crop.",
      },
      {
        question: "Can I grow tomatoes in a 6-inch bed?",
        answer:
          "Only if roots can go down into native soil. In a closed-bottom 6-inch planter they will be stressed in heat.",
      },
      {
        question: "What size pot does a tomato need?",
        answer:
          "A determinate or patio type needs about 5 gallons. An indeterminate vine wants 10–15 gallons and a real cage. A 1- or 3-gallon nursery pot will stall in July. See the container gardening pages on this site.",
      },
    ],
    extraSections: [
      {
        heading: "Support systems",
        paragraphs: [
          "Flimsy wire cones sold as tomato cages are undersized for most indeterminate varieties. Use a cage you can barely wrap your hands around, a Florida weave between stakes, or twine from an overhead bar. Pick one system and install it at planting.",
        ],
      },
      {
        heading: "Feeding without overdoing it",
        paragraphs: [
          "If the bed was filled with a compost blend, skip a heavy fertilizer at transplant. Side-dress when the first fruit sets if plants look pale or growth stalls. Calculate amounts for your square footage instead of pouring from the bag.",
        ],
        bullets: [
          "Use the fertilizer calculator: pick tomatoes, then shop for a bag where potassium keeps up with nitrogen.",
          "Follow the label if it conflicts with a generic target rate.",
        ],
      },
    ],
  },
  {
    slug: "peppers",
    name: "Peppers",
    group: "fruiting",
    description:
      "How to grow bell and hot peppers in raised beds: spacing, warmth, soil, watering, and common problems.",
    intro:
      "Peppers are heat lovers that dislike cold, soggy soil. In a raised bed they often start faster in spring than in-ground plants, as long as you wait for real warmth before transplanting.",
    complete: true,
    facts: [
      { label: "Spacing", value: "12–18 in for most; 18–24 in for large bells" },
      { label: "Soil", value: "Well-drained, moderately fertile, pH about 6.0–6.8" },
      { label: "Sunlight", value: "6–8+ hours" },
      { label: "Planting depth", value: "Same depth as in the pot; do not bury the stem like a tomato" },
      { label: "Water", value: "Even but not soggy; let the surface dry slightly between waterings" },
      { label: "Days to harvest", value: "Often 60–90 days from transplant, variety-dependent" },
    ],
    soil: [
      "Drainage matters. Peppers sitting in wet mix drop flowers and rot at the stem.",
      "They do not need an extremely rich bed. Excess nitrogen makes leaves at the expense of fruit.",
      "A 10–12 inch soil depth is usually enough in an open-bottom bed; go deeper in a closed planter.",
    ],
    watering: [
      "Less frequent than tomatoes once established, but do not drought them during flower and fruit set.",
      "Blossom drop in a heat wave is often temperature, not a fertilizer emergency. Night temperatures over about 75°F and day temperatures over about 90°F can abort flowers on many bells.",
      "Mulch to buffer raised-bed drying.",
    ],
    sunlight:
      "Full sun. In desert or extreme inland heat, light afternoon shade can reduce sunscald on fruit. Do not hide peppers behind tomato cages.",
    planting: [
      "Harden off transplants. Set them out when soil is near 60°F and frost is not a conversation anymore.",
      "Plant at the same depth as the container. Unlike tomatoes, peppers do not want a buried stem.",
      "A single stake prevents plants from snapping when loaded with bells.",
    ],
    spacing: [
      "Compact hot peppers: 12–14 inches.",
      "Standard bells and jalapeños: 14–18 inches.",
      "Large bell plants: 18–24 inches.",
      "Square-foot: usually 1 per square.",
    ],
    problems: [
      {
        name: "Blossom drop",
        detail:
          "Common in temperature extremes or after a sudden shift from indoor to outdoor. Wait out the weather before over-fertilizing.",
      },
      {
        name: "Aphids",
        detail:
          "Check undersides of leaves. A strong water spray and beneficial insects handle light pressure. Avoid broad insecticides that also kill pollinators.",
      },
      {
        name: "Sunscald",
        detail:
          "White, papery patches on fruit. Maintain leaf cover; do not over-prune.",
      },
      {
        name: "Slow start in cool soil",
        detail:
          "Raised beds help, but they cannot cancel a cold spring. Wait. Row cover can add a few degrees.",
      },
    ],
    tools: [
      "Stakes",
      "Mulch",
      "Soaker hose or watering can with a rose",
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-far-apart-to-plant-peppers",
        label: "How far apart to plant peppers",
      },
      {
        href: "/guides/growing-vegetables-in-containers",
        label: "Growing vegetables in containers",
      },
      {
        href: "/guides/how-to-fertilize-a-raised-bed-garden",
        label: "How to fertilize a raised bed garden",
      },
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
    ],
    faqs: [
      {
        question: "Why are my pepper flowers falling off?",
        answer:
          "Heat, cold nights, or a dry-wet shock are the usual causes. Check soil moisture, then wait for milder weather before changing fertilizer.",
      },
      {
        question: "Can I grow hot and sweet peppers together?",
        answer:
          "Yes. They will not make sweet peppers hot on the same plant. Cross-pollination affects seeds if you save them, not this year’s fruit flavor in any practical kitchen sense.",
      },
    ],
    extraSections: [
      {
        heading: "Harvest",
        paragraphs: [
          "Bells can be picked green or left to color up; flavor sweetens as they ripen, and the plant’s total yield may drop if every fruit stays on until full color. Use pruners instead of tearing branches.",
        ],
      },
    ],
  },
  {
    slug: "cucumbers",
    name: "Cucumbers",
    group: "fruiting",
    description:
      "Cucumber spacing, trellising, soil, and watering for raised beds.",
    intro:
      "Trellis vining cucumbers and keep water steady. Sprawling vines will take a whole bed; vertical plants stay pickable and get more air.",
    complete: false,
    facts: [
      { label: "Spacing", value: "10–12 in trellised; 18–24 in bush; 36 in+ if sprawling" },
      { label: "Soil", value: "Warm, well-drained, compost-rich" },
      { label: "Sunlight", value: "6–8+ hours" },
      { label: "Planting depth", value: "About 1 inch for seed" },
      { label: "Water", value: "Consistent; stress makes bitter fruit" },
      { label: "Days to harvest", value: "Often 50–70 days" },
    ],
    soil: [
      "Wait for warm soil before sowing. Cold soil rots seed.",
      "Compost-rich raised-bed mix is enough for a start; side-dress if vines pale midseason.",
    ],
    watering: [
      "Do not let beds dry to dust, then flood. That is how you get misshapen fruit.",
      "Water at the soil line. Wet leaves plus crowding invites mildew.",
    ],
    sunlight: "Full sun. Put the trellis where it will not shade the entire bed all day.",
    planting: [
      "Direct-sow after frost, or transplant with care — cucumbers resent root disturbance.",
      "Install the trellis at planting.",
    ],
    spacing: [
      "Vining on a trellis: about 12 inches.",
      "Bush types: 18–24 inches.",
    ],
    problems: [
      {
        name: "Powdery mildew",
        detail: "White film on leaves in late summer. Airflow and resistant varieties help.",
      },
      {
        name: "Cucumber beetles",
        detail: "Can spread bacterial wilt. Row cover until flowering where beetles are severe.",
      },
    ],
    tools: ["Trellis", "Soaker hose", "Mulch"],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-to-grow-cucumbers-in-raised-beds",
        label: "How to grow cucumbers in raised beds",
      },
      { href: "/guides/best-garden-trellis", label: "Trellis buying guide" },
    ],
    faqs: [
      {
        question: "Why are my cucumbers bitter?",
        answer:
          "Water stress, heat, and some older varieties. Keep moisture even and harvest small.",
      },
    ],
  },
  {
    slug: "lettuce",
    name: "Lettuce",
    group: "leafy",
    description:
      "Grow lettuce in raised beds: spacing, cool-season timing, soil, and watering.",
    intro:
      "Lettuce is a cool-season crop that earns its keep in spring and fall raised beds. Heat and drought make it bitter and send it to flower.",
    complete: false,
    facts: [
      { label: "Spacing", value: "4–6 in for leaf types; 10–12 in for heads" },
      { label: "Soil", value: "Loose, compost-rich, even moisture" },
      { label: "Sunlight", value: "Full sun in cool weather; afternoon shade in heat" },
      { label: "Planting depth", value: "Surface to ¼ inch; light helps some types germinate" },
      { label: "Water", value: "Steady; never bone-dry" },
      { label: "Days to harvest", value: "Leaf mixes 30–45 days; heads 50–70" },
    ],
    soil: [
      "A 6–8 inch depth can work; 10–12 inches buffers moisture.",
      "High nitrogen from lots of compost grows tender leaves. That is appropriate here.",
    ],
    watering: [
      "Shallow roots dry out in raised beds. Mulch lightly once seedlings are up.",
      "Water in the morning so leaves dry.",
    ],
    sunlight:
      "Spring and fall: full sun. Summer: shade cloth or a north-side planting beside taller crops.",
    planting: [
      "Sow successive small pinches every 1–2 weeks instead of one giant row.",
      "In heat, germinate in a cooler spot or pre-chill seed if your variety needs it.",
    ],
    spacing: [
      "Leaf lettuce: 4–6 inches, or 9–16 per square foot.",
      "Head lettuce: 10–12 inches, about 1 per square.",
    ],
    problems: [
      {
        name: "Bolting",
        detail: "Long days and heat trigger flowers. Harvest earlier, choose bolt-resistant types, provide shade.",
      },
      {
        name: "Slugs",
        detail: "More of a problem in wet, mulched beds. Hand-pick; avoid slug bait not labeled for food gardens.",
      },
    ],
    tools: ["Row cover or shade cloth in season", "Watering can with a fine rose"],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
    ],
    faqs: [
      {
        question: "Can I grow lettuce in summer?",
        answer:
          "In many US regions only with shade, frequent water, and heat-tolerant varieties. Fall sowings are often easier.",
      },
    ],
  },
  {
    slug: "carrots",
    name: "Carrots",
    group: "roots",
    description:
      "Carrot spacing, soil depth, and watering for straight roots in raised beds.",
    intro:
      "Carrots need a deep, stone-free, fluffy column of soil. Raised beds are a good fit if you actually fill them deep enough and do not leave clumps or fresh manure in the root zone.",
    complete: false,
    facts: [
      { label: "Spacing", value: "1–3 in in the row; thin hard" },
      { label: "Soil", value: "Loose, 12+ inches, no fresh manure" },
      { label: "Sunlight", value: "6+ hours" },
      { label: "Planting depth", value: "¼–½ inch" },
      { label: "Water", value: "Keep seedbed moist until germination, then even moisture" },
      { label: "Days to harvest", value: "Often 50–80 days" },
    ],
    soil: [
      "Fork out rocks and clods. Forked roots are usually a soil-structure problem.",
      "Fresh manure makes hairy, branched roots. Use finished compost.",
      "See raised bed depth if your frame is only 6 inches tall.",
    ],
    watering: [
      "The seedbed cannot crust and dry for 1–3 weeks. A light board or row cover can help hold moisture until sprouts show.",
      "After thinning, water deeply so roots chase moisture down.",
    ],
    sunlight: "Full sun produces sweeter, fuller roots. Light shade is a last resort in extreme heat.",
    planting: [
      "Sow densely, then thin. Crowded carrots do not size up.",
      "Mix seed with sand for more even sowing.",
    ],
    spacing: [
      "Thin to 1–3 inches depending on variety (Nantes vs large storage types).",
      "Square-foot: often 16 per square.",
    ],
    problems: [
      {
        name: "Poor germination",
        detail: "Usually a dry seedbed or old seed. Carrot seed is short-lived.",
      },
      {
        name: "Forked roots",
        detail: "Rocks, compaction, or fresh manure. Not a fertilizer brand problem.",
      },
    ],
    tools: ["Soil sieve for rocky fill", "Row cover optional"],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
    ],
    faqs: [
      {
        question: "Why are my carrots short?",
        answer:
          "Shallow soil, late thinning, or a variety that is naturally short (many “container” types). Match variety to bed depth.",
      },
    ],
  },
  {
    slug: "radishes",
    name: "Radishes",
    group: "roots",
    description:
      "Fast radish crops in raised beds: spacing, soil, and why they get pithy or all tops.",
    intro:
      "Radishes are a 3–5 week crop if the soil is loose and you do not let them sit. They are a good way to use the edge of a tomato bed in spring.",
    complete: false,
    facts: [
      { label: "Spacing", value: "1–2 inches" },
      { label: "Soil", value: "Loose, even moisture; 4–6 inches can work for round types" },
      { label: "Sunlight", value: "6+ hours" },
      { label: "Planting depth", value: "½ inch" },
      { label: "Water", value: "Steady; drought makes them woody" },
      { label: "Days to harvest", value: "Often 21–30 days for spring types" },
    ],
    soil: [
      "Fresh, high-nitrogen fertilizer can push tops instead of roots. Compost-rich soil is enough.",
      "Daikon and other long types need more depth than round red radishes.",
    ],
    watering: [
      "Keep the top few inches evenly moist. Heat plus drought equals pithy roots.",
    ],
    sunlight: "Full sun in cool weather. Provide afternoon shade if you try a summer sowing.",
    planting: [
      "Sow every 7–10 days for a continuous harvest.",
      "Harvest on time. Extra days in the bed do not make them better.",
    ],
    spacing: [
      "1–2 inches. Square-foot: 16 per square is the usual pattern.",
    ],
    problems: [
      {
        name: "All leaves, tiny roots",
        detail: "Crowding, too much nitrogen, or heat. Thin and sow in cooler weather.",
      },
      {
        name: "Flea beetles",
        detail: "Shot-holes in leaves. Row cover right after sowing helps.",
      },
    ],
    tools: ["Row cover optional"],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-deep-should-a-raised-bed-be",
        label: "How deep should a raised bed be?",
      },
      { href: "/vegetable-gardening", label: "Vegetable gardening hub" },
    ],
    faqs: [
      {
        question: "Can radishes share a tomato bed?",
        answer:
          "Yes, as a quick spring edge crop. Pull them before tomato canopies close in.",
      },
    ],
  },
  {
    slug: "strawberries",
    name: "Strawberries",
    group: "perennials",
    description:
      "Growing strawberries in raised beds: June-bearing vs everbearing, spacing, and watering.",
    intro:
      "Strawberries are perennials. A raised bed gives drainage and a defined home for runners, but you still have to choose a fruiting type and keep water even during harvest.",
    complete: false,
    facts: [
      { label: "Spacing", value: "12–18 in for plants; plan room for runners" },
      { label: "Soil", value: "Well-drained, slightly acidic if you can (pH ~5.8–6.5)" },
      { label: "Sunlight", value: "8+ hours for best fruit" },
      { label: "Planting depth", value: "Crown at soil level — not buried, not perched" },
      { label: "Water", value: "Steady while fruiting; they are shallow-rooted" },
      { label: "Days to harvest", value: "June-bearers peak in a short window; everbearing spread out" },
    ],
    soil: [
      "Drainage is non-negotiable. Soggy crowns rot.",
      "Do not bury the crown. Do not leave roots in the air.",
    ],
    watering: [
      "Shallow roots in a raised bed dry fast. Mulch with straw to keep fruit off wet soil.",
      "Reduce splash to cut rot.",
    ],
    sunlight: "Full sun. Shade makes pretty plants and thin fruit.",
    planting: [
      "June-bearing types make a big crop once a year and send more runners.",
      "Everbearing / day-neutral types spread harvest through the season and usually want runners removed.",
      "Many gardeners pinch flowers the first weeks after planting so roots establish. Follow your plant source if it says otherwise.",
    ],
    spacing: [
      "12–18 inches in the bed. Leave a path or a runner strip so you are not stepping on crowns.",
    ],
    problems: [
      {
        name: "Birds and slugs",
        detail: "Netting and keeping fruit on straw mulch, not soil, are the practical defenses.",
      },
      {
        name: "Gray mold",
        detail: "Airflow, dry foliage, and prompt harvest. Do not crowd.",
      },
    ],
    tools: ["Straw mulch", "Netting if birds are bad"],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
      {
        href: "/guides/best-soil-mix-for-raised-beds",
        label: "Best soil mix for raised beds",
      },
    ],
    faqs: [
      {
        question: "How long will a strawberry bed last?",
        answer:
          "Production often drops after 3–4 years. Plan to renovate or replant rather than treating the bed as permanent.",
      },
    ],
  },
  {
    slug: "zucchini",
    name: "Zucchini",
    group: "fruiting",
    description:
      "Growing zucchini in raised beds: spacing, powdery mildew, pollination, and watering.",
    intro:
      "One or two zucchini plants can feed a household. The failure mode is planting six of them in a 4×8 bed. Give them room, water the soil, and harvest small.",
    complete: false,
    facts: [
      { label: "Spacing", value: "24–36 in; one plant can fill 9+ sq ft" },
      { label: "Soil", value: "Rich, well-drained, 12 inches or more" },
      { label: "Sunlight", value: "6–8+ hours" },
      { label: "Planting depth", value: "About 1 inch for seed" },
      { label: "Water", value: "Deep, at the base; avoid wet leaves" },
      { label: "Days to harvest", value: "Often 45–60 days" },
    ],
    soil: [
      "Compost-rich mix supports fast growth. They are hungry compared with lettuce.",
      "Mounds are optional in a well-drained raised bed.",
    ],
    watering: [
      "Water at the crown’s drip line, not over the leaves, to slow mildew.",
      "Inconsistent water makes misshapen fruit.",
    ],
    sunlight: "Full sun. They will tolerate a little shade at the cost of production.",
    planting: [
      "Sow or transplant after frost when soil is warm.",
      "Two plants, staggered by two weeks, beat six plants at once.",
    ],
    spacing: [
      "24–36 inches minimum. Do not use 1-per-square-foot math unless it is a true compact variety.",
    ],
    problems: [
      {
        name: "Powdery mildew",
        detail: "Almost inevitable late season in many regions. Spacing and dry leaves delay it.",
      },
      {
        name: "Squash vine borer",
        detail: "Sudden wilt in the East and Midwest. Stem inspection matters more than fertilizer.",
      },
      {
        name: "Poor pollination",
        detail: "Baby fruit yellows and falls off. You need bees, or you hand-pollinate male to female flowers.",
      },
    ],
    tools: ["Optional trellis for some compact or vining types", "Pruners for harvest"],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
      { href: "/calculators/fertilizer", label: "Fertilizer calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-to-fertilize-a-raised-bed-garden",
        label: "How to fertilize a raised bed garden",
      },
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
    ],
    faqs: [
      {
        question: "How many zucchini plants do I need?",
        answer:
          "One or two for most families. Harvest at 6–8 inches. Giant zucchini are not a prize.",
      },
    ],
  },
];

export const crops: Crop[] = [...coreCrops, ...additionalCrops];

export function getCrop(slug: string): Crop | undefined {
  return crops.find((crop) => crop.slug === slug);
}

export function getCropsByGroup(group: CropGroup): Crop[] {
  return crops.filter((crop) => crop.group === group);
}

export function getRelatedCrops(slug: string, limit = 4): RelatedLink[] {
  const crop = getCrop(slug);
  if (!crop) return [];
  return crops
    .filter((item) => item.group === crop.group && item.slug !== slug)
    .slice(0, limit)
    .map((item) => ({
      href: `/vegetable-gardening/${item.slug}`,
      label: item.name,
    }));
}

export function getCompleteCrops(): Crop[] {
  return crops.filter((crop) => crop.complete);
}
