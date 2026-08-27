import type { Crop } from "@/data/crops";
import type { RelatedLink } from "@/data/types";

const tools: RelatedLink[] = [
  { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
  { href: "/calculators/mulch", label: "Mulch calculator" },
];

const fruitingGuides: RelatedLink[] = [
  { href: "/guides/how-to-fertilize-a-raised-bed-garden", label: "How to fertilize a raised bed garden" },
  { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
];

const leafyGuides: RelatedLink[] = [
  { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
  { href: "/guides/how-deep-should-a-raised-bed-be", label: "How deep should a raised bed be?" },
];

const rootGuides: RelatedLink[] = [
  { href: "/guides/how-deep-should-a-raised-bed-be", label: "How deep should a raised bed be?" },
  { href: "/guides/best-soil-mix-for-raised-beds", label: "Best soil mix for raised beds" },
];

export const additionalCrops: Crop[] = [
  {
    slug: "eggplant",
    name: "Eggplant",
    group: "fruiting",
    complete: false,
    description:
      "How to grow eggplant in raised beds: warmth, spacing, watering, and flea beetle pressure.",
    intro:
      "Eggplant is a heat crop. Raised beds help in spring, but cold nights still stall plants. Wait for real warmth, then keep water even once fruit sets.",
    facts: [
      { label: "Spacing", value: "18–24 in" },
      { label: "Soil", value: "Well-drained, moderately fertile; similar to peppers" },
      { label: "Sunlight", value: "8+ hours" },
      { label: "Planting depth", value: "Same depth as the pot" },
      { label: "Water", value: "Even moisture; do not let pots-on-legs dry out in heat" },
      { label: "Days to harvest", value: "Often 65–85 days from transplant" },
    ],
    soil: [
      "A 10–12 inch bed is usually enough if drainage is good.",
      "Too much nitrogen makes leaves instead of fruit, same as peppers.",
    ],
    watering: [
      "Keep soil evenly moist after flowering. Dry swings make bitter, seedy fruit.",
      "Mulch. Water the soil, not the foliage.",
    ],
    sunlight: "Full sun and heat. This is a poor crop for cool, foggy summers.",
    planting: [
      "Transplant after nights stay in the 60s °F. They sulk in the 50s.",
      "Stake or cage once fruit loads the branches.",
    ],
    spacing: ["18–24 inches. Square-foot: 1 per square."],
    problems: [
      { name: "Flea beetles", detail: "Shot-holes in leaves, especially on young plants. Row cover until flowering if beetles are bad." },
      { name: "Slow start", detail: "Almost always cold soil. Wait. Do not drown a stalled plant." },
    ],
    tools: ["Stake or small cage", "Row cover in beetle country"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/peppers", label: "Growing peppers" },
      ...fruitingGuides,
    ],
    faqs: [
      {
        question: "Why are my eggplant flowers falling off?",
        answer:
          "Cool nights, extreme heat, or dry soil. Eggplant wants the same weather window as peppers, only more so.",
      },
    ],
  },
  {
    slug: "beans",
    name: "Beans",
    group: "fruiting",
    complete: false,
    description:
      "Bush and pole beans in raised beds: spacing, nitrogen, trellising, and harvest timing.",
    intro:
      "Bush beans fill a square quickly. Pole beans need a trellis and keep producing longer. Do not plant either into cold, wet soil, and do not dump nitrogen on a crop that can fix its own.",
    facts: [
      { label: "Spacing", value: "Bush: 4–6 in, or 9 per sq ft. Pole: 4–6 in along a trellis" },
      { label: "Soil", value: "Average fertility; skip heavy nitrogen" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "About 1 inch" },
      { label: "Water", value: "Steady once pods form; flowers drop if the bed dries out" },
      { label: "Days to harvest", value: "Bush often 50–60 days; pole keeps going longer" },
    ],
    soil: [
      "Compost is enough in a new raised-bed mix. Extra nitrogen makes vines and few pods.",
      "Inoculant is optional; it can help in beds that have never grown beans.",
    ],
    watering: [
      "Keep moisture even from flowering onward.",
      "Avoid wetting leaves in humid regions if rust or mildew shows up.",
    ],
    sunlight: "Full sun. Pole beans on the north side of a bed so they do not shade lettuce all day.",
    planting: [
      "Direct-sow after the last frost when soil is warm. Beans rot in cold ground.",
      "Sow a second bush-bean row 3 weeks later for a longer harvest.",
    ],
    spacing: [
      "Bush: 4–6 inches, or 9 plants per square foot.",
      "Pole: a single row 4–6 inches apart along the trellis.",
    ],
    problems: [
      { name: "Mexican bean beetle", detail: "Copper beetles and spiny larvae skeletonize leaves. Hand-pick early; row cover on young plants." },
      { name: "No pods", detail: "Usually heat, drought at bloom, or too much nitrogen." },
    ],
    tools: ["Trellis for pole types", "See the trellis buying guide"],
    relatedTools: [...tools, { href: "/calculators/fertilizer", label: "Fertilizer calculator" }],
    relatedGuides: [
      { href: "/guides/best-garden-trellis", label: "Trellis buying guide" },
      { href: "/vegetable-gardening/peas", label: "Growing peas" },
    ],
    faqs: [
      {
        question: "Bush or pole beans in a 4×8 bed?",
        answer:
          "Bush beans are simpler. Pole beans yield more over time if you have a stout trellis on one long side.",
      },
    ],
  },
  {
    slug: "peas",
    name: "Peas",
    group: "fruiting",
    complete: false,
    description:
      "Grow peas in raised beds: cool-season timing, trellis spacing, and why they fail in heat.",
    intro:
      "Peas are a spring and fall crop. They germinate in cool soil and quit when nights stay warm. A trellis along the north side of a bed is the usual raised-bed layout.",
    facts: [
      { label: "Spacing", value: "2–4 in in a row along a trellis" },
      { label: "Soil", value: "Loose, not overly rich in nitrogen" },
      { label: "Sunlight", value: "6+ hours; they tolerate cooler, shorter days" },
      { label: "Planting depth", value: "About 1 inch" },
      { label: "Water", value: "Even moisture; do not let the trellis row go dusty at bloom" },
      { label: "Days to harvest", value: "Often 50–70 days" },
    ],
    soil: [
      "Peas do not need a heavy feeding. Compost-rich mix is enough.",
      "Open-bottom beds help if spring soil is wet.",
    ],
    watering: [
      "Keep the seedbed moist until germination, then water at the base.",
      "Mulch after plants are up. Raised beds dry faster than in-ground pea rows.",
    ],
    sunlight: "Full sun in spring. Heat plus full sun in June ends the crop.",
    planting: [
      "Sow as soon as the soil can be worked. Many US gardeners plant 4–6 weeks before the last frost.",
      "Install netting or a panel at sowing. Wrestling vines onto a late trellis breaks stems.",
    ],
    spacing: ["2–4 inches in a double row along the trellis, or a dense band 6 inches wide."],
    problems: [
      { name: "Powdery mildew", detail: "Common as weather warms. Airflow and resistant varieties delay it; harvest what you can." },
      { name: "Poor germination", detail: "Seed sitting in cold mud, or old seed. Peas are not a heat-soil crop." },
    ],
    tools: ["Netting or cattle-panel trellis"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/guides/best-garden-trellis", label: "Trellis buying guide" },
      { href: "/vegetable-gardening/beans", label: "Growing beans" },
    ],
    faqs: [
      {
        question: "Can I grow peas in summer?",
        answer:
          "In most of the US, no. Try a fall sowing 8–10 weeks before frost, or stick to spring.",
      },
    ],
  },
  {
    slug: "okra",
    name: "Okra",
    group: "fruiting",
    complete: false,
    description:
      "Growing okra in raised beds: heat, spacing, harvest size, and why it sulks in cool springs.",
    intro:
      "Okra is a Southern heat crop that also works in warm Midwestern and Western summers. One or two plants in a raised bed can produce a lot if you pick pods small and often.",
    facts: [
      { label: "Spacing", value: "12–18 in" },
      { label: "Soil", value: "Well-drained; tolerate average fertility" },
      { label: "Sunlight", value: "8+ hours" },
      { label: "Planting depth", value: "½–1 inch for seed" },
      { label: "Water", value: "Deep, less often once established; they handle heat better than lettuce" },
      { label: "Days to harvest", value: "Often 50–65 days" },
    ],
    soil: ["Drainage matters more than a rich mix. They dislike soggy spring beds."],
    watering: [
      "Water deeply, then let the surface dry a bit. Overwatering in cool weather rots seed.",
    ],
    sunlight: "Full sun. This is not a shade crop.",
    planting: [
      "Sow or transplant after soil is genuinely warm — often 2–3 weeks after tomatoes go out.",
      "Harvest pods at 2–4 inches. Larger pods get woody overnight.",
    ],
    spacing: ["12–18 inches. One plant per square is plenty."],
    problems: [
      { name: "Stunted seedlings", detail: "Cold soil. Wait or use a cloche. Do not keep sowing into 50°F mix." },
      { name: "Woody pods", detail: "You waited too long. Pick every 1–2 days in peak heat." },
    ],
    tools: ["Pruners or scissors for harvest — stems are tough"],
    relatedTools: tools,
    relatedGuides: fruitingGuides,
    faqs: [
      {
        question: "How many okra plants in a 4×8 bed?",
        answer:
          "Two to four plants is plenty for most kitchens. They get tall; put them where they will not shade peppers all afternoon.",
      },
    ],
  },
  {
    slug: "winter-squash",
    name: "Winter squash",
    group: "fruiting",
    complete: false,
    description:
      "Butternut and other winter squash in raised beds: space, trellising, and why one plant is enough.",
    intro:
      "Winter squash wants room. In a raised bed, trellis a compact or vining type, or give one plant a corner and let it run. Do not plant a 4×8 full of butternut.",
    facts: [
      { label: "Spacing", value: "36 in+ on the ground; 18–24 in if trellised and pruned" },
      { label: "Soil", value: "Rich, well-drained, 12 inches or more" },
      { label: "Sunlight", value: "8+ hours" },
      { label: "Planting depth", value: "About 1 inch for seed" },
      { label: "Water", value: "Deep watering at the base; keep leaves dry if you can" },
      { label: "Days to harvest", value: "Often 80–110 days" },
    ],
    soil: ["Compost-rich mix. They are hungrier than beans."],
    watering: [
      "Water deeply once or twice a week rather than daily sprinkles, then adjust for heat.",
      "See the zucchini page for vine-borer notes; winter squash can get the same pest.",
    ],
    sunlight: "Full sun. Fruit needs heat to ripen and cure.",
    planting: [
      "Sow after frost. One or two plants per household is the usual math.",
      "If you trellis, sling heavy fruit (butternut) so stems do not snap.",
    ],
    spacing: ["Treat it like a small shrub, not a square-foot crop."],
    problems: [
      { name: "Squash vine borer", detail: "Sudden wilt in the East and Midwest. Inspect stems; row cover until flowering." },
      { name: "Powdery mildew", detail: "Late-season almost everywhere. Airflow and dry leaves delay it." },
    ],
    tools: ["Stout trellis if growing vertically", "Cloth slings for hanging fruit"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/zucchini", label: "Growing zucchini" },
      { href: "/guides/best-garden-trellis", label: "Trellis buying guide" },
    ],
    faqs: [
      {
        question: "Is winter squash a good raised-bed crop?",
        answer:
          "Only if you trellis or you are willing to let vines leave the bed. For food per square foot, tomatoes and beans usually win.",
      },
    ],
  },
  {
    slug: "corn",
    name: "Corn",
    group: "fruiting",
    complete: false,
    description:
      "Sweet corn in backyard gardens: why it needs a block for pollination, and why a single raised bed is a weak fit.",
    intro:
      "Corn is wind-pollinated. A single row in a 4×8 bed usually makes poorly filled ears. Grow it in a block of at least 3–4 short rows, or skip it and spend the space on tomatoes.",
    facts: [
      { label: "Spacing", value: "8–12 in in a block, not a single row" },
      { label: "Soil", value: "Fertile, nitrogen-hungry compared with beans" },
      { label: "Sunlight", value: "8+ hours; it will shade everything north of it" },
      { label: "Planting depth", value: "1–1½ inches" },
      { label: "Water", value: "Steady from tasseling through fill" },
      { label: "Days to harvest", value: "Often 60–90 days, variety-dependent" },
    ],
    soil: [
      "Corn uses nitrogen. A compost-only bed may look pale by tasseling. Side-dress only if plants are yellowing. Pick corn in the fertilizer calculator (it will point to a higher-N bag), then follow the label.",
    ],
    watering: ["Do not let the bed dry out while ears are filling. Raised beds make that easy to miss."],
    sunlight: "Full sun. Plant it on the north edge if anything shorter shares the bed.",
    planting: [
      "Sow in a grid, not a hedgerow, so pollen falls on neighboring silks.",
      "Isolation matters if you grow more than one color/type and want true seed — not an issue if you are only eating the crop.",
    ],
    spacing: ["8–12 inches each way in a block of 12+ plants if you insist on trying it in beds."],
    problems: [
      { name: "Poorly filled ears", detail: "Not enough plants for pollen, or heat/drought at silk. This is the usual raised-bed failure." },
      { name: "Corn earworm", detail: "Common. Mineral oil on silks is a home-garden tactic; results vary." },
    ],
    tools: ["The plant spacing calculator — then honestly count whether you have a block"],
    relatedTools: [...tools, { href: "/calculators/fertilizer", label: "Fertilizer calculator" }],
    relatedGuides: [
      { href: "/guides/raised-bed-vs-in-ground-garden", label: "Raised bed vs in-ground garden" },
    ],
    faqs: [
      {
        question: "Should I grow corn in a raised bed?",
        answer:
          "Usually no. It needs a pollen block and a lot of nitrogen and water for a modest calorie return. In-ground rows or a dedicated plot work better.",
      },
    ],
  },
  {
    slug: "kale",
    name: "Kale",
    group: "leafy",
    complete: false,
    description:
      "Growing kale in raised beds: spacing, frost, watering, and cabbage worm pressure.",
    intro:
      "Kale is a cool-season workhorse. It holds in the bed longer than lettuce and often sweetens after a frost. Give it more room than a salad mix, and cover it if cabbage worms are bad.",
    facts: [
      { label: "Spacing", value: "12–18 in" },
      { label: "Soil", value: "Compost-rich, even moisture" },
      { label: "Sunlight", value: "6+ hours; light shade in summer heat" },
      { label: "Planting depth", value: "¼–½ inch for seed; transplant at pot depth" },
      { label: "Water", value: "Steady; dry beds get bitter, tough leaves" },
      { label: "Days to harvest", value: "Baby leaves ~30 days; full plants 50–70" },
    ],
    soil: ["Kale likes fertility. A compost top-dress in a working bed is usually enough."],
    watering: ["Shallow drying in raised beds makes kale tough. Mulch and water the root zone."],
    sunlight: "Full sun in spring and fall. Afternoon shade helps it linger in hot summers.",
    planting: [
      "Spring and late-summer sowings beat midsummer transplants in most of the US.",
      "Harvest outer leaves; leave the growing point.",
    ],
    spacing: ["12–18 inches, or 1 per square foot. Crowding invites aphids and mildew."],
    problems: [
      { name: "Cabbage worms", detail: "Green caterpillars chew holes. Row cover from transplant is the cleanest defense." },
      { name: "Aphids", detail: "Check new growth. A strong water spray handles light pressure." },
    ],
    tools: ["Row cover", "Harvest knife"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/collard-greens", label: "Growing collard greens" },
      ...leafyGuides,
    ],
    faqs: [
      {
        question: "Can kale overwinter in a raised bed?",
        answer:
          "In much of the South and the milder West, yes. In cold winters it may survive with a cover, or it may not. Raised beds freeze harder than in-ground soil.",
      },
    ],
  },
  {
    slug: "spinach",
    name: "Spinach",
    group: "leafy",
    complete: false,
    description:
      "Grow spinach in raised beds: cool soil, tight spacing, and why it bolts in heat.",
    intro:
      "Spinach is a short cool-season crop. It germinates poorly in warm soil and races to flower as days lengthen. Sow early, harvest fast, and switch to chard when heat arrives.",
    facts: [
      { label: "Spacing", value: "3–6 in, or 9–16 per sq ft" },
      { label: "Soil", value: "Rich, even moisture; slightly alkaline soils can lock up iron" },
      { label: "Sunlight", value: "Full sun in cool weather; shade as it warms" },
      { label: "Planting depth", value: "½ inch" },
      { label: "Water", value: "Never let the seedbed crust dry" },
      { label: "Days to harvest", value: "Often 35–50 days" },
    ],
    soil: ["Compost-rich mix. Spinach is a heavy feeder for a small plant."],
    watering: ["Keep the top inch moist until germination, which can take 1–2 weeks in cold soil."],
    sunlight: "Spring and fall sun. Long, hot days trigger bolting.",
    planting: [
      "Sow 4–6 weeks before the last frost, and again in late summer for fall.",
      "Successive small sowings beat one giant row that all bolts together.",
    ],
    spacing: ["3–6 inches. Square-foot: 9 or 16 depending on leaf size you want."],
    problems: [
      { name: "Bolting", detail: "Heat and long days. Harvest and replant chard or lettuce in shade." },
      { name: "Poor germination", detail: "Warm soil or old seed. Pre-sprout in the fridge if summers start early." },
    ],
    tools: ["Row cover for flea beetles and a bit of frost"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/lettuce", label: "Growing lettuce" },
      { href: "/vegetable-gardening/swiss-chard", label: "Growing Swiss chard" },
    ],
    faqs: [
      {
        question: "Spinach or chard for a hot climate?",
        answer:
          "Chard. Spinach is a spring/fall crop in most of the US South and inland West.",
      },
    ],
  },
  {
    slug: "swiss-chard",
    name: "Swiss chard",
    group: "leafy",
    complete: false,
    description:
      "Growing Swiss chard in raised beds: spacing, heat tolerance, and cut-and-come-again harvest.",
    intro:
      "Chard is the greens crop that stays after spinach has bolted. It takes heat better, still wants steady water, and feeds you for months if you harvest outer leaves.",
    facts: [
      { label: "Spacing", value: "8–12 in" },
      { label: "Soil", value: "Compost-rich, well-drained" },
      { label: "Sunlight", value: "6–8 hours; light afternoon shade in extreme heat" },
      { label: "Planting depth", value: "½ inch" },
      { label: "Water", value: "Even moisture; raised beds dry the shallow roots" },
      { label: "Days to harvest", value: "Baby leaves ~30 days; full size 50–60" },
    ],
    soil: ["Average-to-rich raised-bed mix is enough. It is less fussy than cauliflower."],
    watering: ["Water when the top inch is dry. Mulch through summer."],
    sunlight: "Full sun. It forgives part shade with slower growth.",
    planting: [
      "Sow after frost danger, or start indoors. One sowing can last until hard freeze.",
      "Harvest outer stalks; leave the center.",
    ],
    spacing: ["8–12 inches, or 4 plants per square foot for smaller leaves, 1 per square for big plants."],
    problems: [
      { name: "Leaf miners", detail: "Tunnels in leaves. Remove mined leaves; row cover on new sowings." },
      { name: "Bolting", detail: "Less common than spinach, but a hard drought-to-flood swing can trigger it." },
    ],
    tools: ["Harvest knife"],
    relatedTools: tools,
    relatedGuides: leafyGuides,
    faqs: [
      {
        question: "Are beet greens the same as chard?",
        answer:
          "They are relatives. Chard is bred for leaves; beets are bred for roots. You can eat both greens.",
      },
    ],
  },
  {
    slug: "broccoli",
    name: "Broccoli",
    group: "leafy",
    complete: false,
    description:
      "Growing broccoli in raised beds: cool weather, 18-inch spacing, and side-shoot harvest.",
    intro:
      "Broccoli wants a long cool stretch. Spring and fall plantings beat summer. Give each plant a full square, and you can often cut side shoots after the main head.",
    facts: [
      { label: "Spacing", value: "18 in, 1 per sq ft is tight" },
      { label: "Soil", value: "Fertile, even moisture, pH near 6.5–7.0 if you can" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "Transplant at pot depth" },
      { label: "Water", value: "Steady; drought makes button heads" },
      { label: "Days to harvest", value: "Often 50–80 days from transplant" },
    ],
    soil: ["Brassicas are hungry. Compost plus a measured fertilizer if a soil test or pale leaves say so."],
    watering: ["Never let a raised bed go dusty while heads are forming."],
    sunlight: "Full sun in cool weather. Heat plus sun makes tiny heads that flower.",
    planting: [
      "Transplant 2–4 weeks before the last frost for spring, and in midsummer for fall.",
      "Cut the main head with a few inches of stem; leave the plant for side shoots.",
    ],
    spacing: ["18 inches is the practical default. Closer spacing makes smaller heads."],
    problems: [
      { name: "Cabbage worms", detail: "Row cover from day one, or inspect undersides of leaves." },
      { name: "Buttoning", detail: "Tiny heads from stress: cold check, heat, or drought after transplant." },
    ],
    tools: ["Row cover", "Sharp knife"],
    relatedTools: [...tools, { href: "/calculators/fertilizer", label: "Fertilizer calculator" }],
    relatedGuides: [
      { href: "/vegetable-gardening/cabbage", label: "Growing cabbage" },
      { href: "/vegetable-gardening/cauliflower", label: "Growing cauliflower" },
    ],
    faqs: [
      {
        question: "Why did my broccoli flower?",
        answer:
          "You waited too long, or heat hit. Heads should be tight. Once yellow flowers open, flavor fades fast.",
      },
    ],
  },
  {
    slug: "cabbage",
    name: "Cabbage",
    group: "leafy",
    complete: false,
    description:
      "How to grow cabbage in raised beds: spacing by head size, watering, and split heads.",
    intro:
      "Cabbage is a cool-season brassica that needs more room than kale. Choose a head size, give it 12–18 inches, and keep water even as the head tightens or it will split after rain.",
    facts: [
      { label: "Spacing", value: "12–18 in depending on variety" },
      { label: "Soil", value: "Fertile, well-drained" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "Transplant at pot depth" },
      { label: "Water", value: "Even moisture, especially as heads firm up" },
      { label: "Days to harvest", value: "Often 60–100 days from transplant" },
    ],
    soil: ["Compost-rich mix. They are moderate-to-heavy feeders."],
    watering: [
      "A dry spell then a heavy rain is a classic way to split heads. Mulch and water steadily.",
    ],
    sunlight: "Full sun in spring and fall.",
    planting: [
      "Same calendar as broccoli: early spring and midsummer for fall.",
      "Harvest when heads are firm. Waiting for “just a bit bigger” invites split and pests.",
    ],
    spacing: ["12 inches for small heads; 18 inches for large storage types. One per square foot for compact varieties."],
    problems: [
      { name: "Split heads", detail: "Uneven water. Harvest promptly after a rain if a head is already tight." },
      { name: "Cabbage worms", detail: "Row cover. Check the wrapper leaves." },
    ],
    tools: ["Row cover"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/broccoli", label: "Growing broccoli" },
      { href: "/vegetable-gardening/kale", label: "Growing kale" },
    ],
    faqs: [
      {
        question: "How many cabbages in a 4×8 bed?",
        answer:
          "At 18-inch spacing, about 10 plants. That is a lot of cabbage. Mix with lettuce or onions if you do not eat kraut every week.",
      },
    ],
  },
  {
    slug: "cauliflower",
    name: "Cauliflower",
    group: "leafy",
    complete: false,
    description:
      "Growing cauliflower in raised beds: why it is fussier than broccoli, blanching, and heat.",
    intro:
      "Cauliflower aborts more easily than broccoli. It wants cool, even conditions and does not like a check in growth after transplant. If your springs jump from frost to 85°F, treat it as a fall crop.",
    facts: [
      { label: "Spacing", value: "18 in" },
      { label: "Soil", value: "Fertile, even moisture, no big droughts" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "Transplant at pot depth" },
      { label: "Water", value: "Never dry at heading" },
      { label: "Days to harvest", value: "Often 55–80 days from transplant" },
    ],
    soil: ["Rich, consistent mix. A stalled transplant often never makes a proper curd."],
    watering: ["More sensitive to dry raised beds than kale. Mulch."],
    sunlight: "Full sun in cool weather. Heat plus sun ricing or buttoning.",
    planting: [
      "Transplant carefully. Do not let starts get root-bound and hungry on the porch.",
      "Tie wrapper leaves over white types to keep curds pale if the variety is not self-blanching.",
    ],
    spacing: ["18 inches. One per square."],
    problems: [
      { name: "No head / ricing", detail: "Heat, drought, or a transplant check. Fall crops are more reliable in many states." },
      { name: "Cabbage worms", detail: "Same as broccoli. Row cover." },
    ],
    tools: ["Row cover", "Garden twine for blanching"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/broccoli", label: "Growing broccoli" },
    ],
    faqs: [
      {
        question: "Is cauliflower harder than broccoli?",
        answer:
          "Usually yes. Broccoli will still give side shoots after a heat wave. Cauliflower often gives you one chance at a curd.",
      },
    ],
  },
  {
    slug: "arugula",
    name: "Arugula",
    group: "leafy",
    complete: false,
    description:
      "Grow arugula in raised beds: fast harvest, tight spacing, and heat bitterness.",
    intro:
      "Arugula is a 30-day crop for the edge of a tomato bed in spring. Sow thick, cut young, and stop expecting sweet leaves after real heat arrives.",
    facts: [
      { label: "Spacing", value: "2–4 in, or 16 per sq ft" },
      { label: "Soil", value: "Average, well-drained" },
      { label: "Sunlight", value: "Full sun in cool weather; shade in heat" },
      { label: "Planting depth", value: "¼ inch" },
      { label: "Water", value: "Steady; drought makes it fiery and quick to bolt" },
      { label: "Days to harvest", value: "Often 21–40 days" },
    ],
    soil: ["It is not a heavy feeder. Compost-rich mix is plenty."],
    watering: ["Keep the surface evenly moist for tender leaves."],
    sunlight: "Spring and fall sun. Summer arugula wants shade cloth or a north-side strip.",
    planting: [
      "Broadcast or sow in a band every 1–2 weeks in cool weather.",
      "Cut-and-come-again once or twice, then resow.",
    ],
    spacing: ["2–4 inches. Treat it like a salad mix, not a heading crop."],
    problems: [
      { name: "Flea beetles", detail: "Shot-holes. Row cover right after sowing." },
      { name: "Bolting", detail: "Heat. Pull and sow chard or beans." },
    ],
    tools: ["Row cover", "Scissors"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/lettuce", label: "Growing lettuce" },
      { href: "/vegetable-gardening/radishes", label: "Growing radishes" },
    ],
    faqs: [
      {
        question: "Why is my arugula so spicy?",
        answer:
          "Heat, drought, and older leaves. Harvest smaller and water more evenly in warm spells.",
      },
    ],
  },
  {
    slug: "collard-greens",
    name: "Collard greens",
    group: "leafy",
    complete: false,
    description:
      "Growing collard greens in raised beds: spacing, Southern seasons, and frost flavor.",
    intro:
      "Collards take heat better than spinach and hold through frost better than lettuce. They are a staple in the South and a worthwhile fall crop farther north. Give each plant room — they get large.",
    facts: [
      { label: "Spacing", value: "18 in" },
      { label: "Soil", value: "Fertile, well-drained" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "Transplant at pot depth; seed ½ inch" },
      { label: "Water", value: "Steady; they are leafy and thirsty in heat" },
      { label: "Days to harvest", value: "Often 55–80 days; baby leaves sooner" },
    ],
    soil: ["Compost-rich mix. They are brassicas — hungry, but not cauliflower-fussy."],
    watering: ["Mulch in summer. Raised beds dry the big leaf canopy out faster than in-ground rows."],
    sunlight: "Full sun. Light shade in the Deep South in midsummer is a plus.",
    planting: [
      "Spring and late-summer plantings. Frost sweetens leaves.",
      "Harvest lower leaves; keep the growing tip.",
    ],
    spacing: ["18 inches. One per square foot is the usual pattern."],
    problems: [
      { name: "Cabbage worms", detail: "Row cover or regular inspection. Same pest complex as kale." },
      { name: "Aphids", detail: "Hose off; avoid blasting open hearts into rot." },
    ],
    tools: ["Row cover", "Harvest knife"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/kale", label: "Growing kale" },
      { href: "/vegetable-gardening/cabbage", label: "Growing cabbage" },
    ],
    faqs: [
      {
        question: "Collards or kale in a small bed?",
        answer:
          "Both work. Collards are usually more heat-tolerant. Kale is more cold-ornamental. Flavor is a kitchen preference.",
      },
    ],
  },
  {
    slug: "beets",
    name: "Beets",
    group: "roots",
    complete: false,
    description:
      "Growing beets in raised beds: thinning, soil depth, and using both roots and greens.",
    intro:
      "Beets need thinning more than they need fancy fertilizer. Each “seed” is a cluster. If you do not thin to 3–4 inches, you get greens and marbles instead of roots.",
    facts: [
      { label: "Spacing", value: "3–4 in after thinning" },
      { label: "Soil", value: "Loose, stone-free, not freshly manured" },
      { label: "Sunlight", value: "6+ hours" },
      { label: "Planting depth", value: "½ inch" },
      { label: "Water", value: "Even moisture; drought makes woody roots" },
      { label: "Days to harvest", value: "Often 50–70 days" },
    ],
    soil: [
      "Loose mix to 8–10 inches is enough for typical round beets.",
      "Fresh manure makes hairy, odd roots — same warning as carrots.",
    ],
    watering: ["Keep the seedbed moist until germination. Then water deeply."],
    sunlight: "Full sun produces fuller roots. Light shade is a last resort.",
    planting: [
      "Sow in spring and again in late summer.",
      "Thin hard. Eat the thinnings as greens.",
    ],
    spacing: ["3–4 inches. Square-foot: 9 or 16, then thin."],
    problems: [
      { name: "No bulbs", detail: "Crowding or heat. Thin earlier next time." },
      { name: "Leaf miners", detail: "Same as chard. Remove mined leaves." },
    ],
    tools: ["Soil that isn’t full of rocks"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/carrots", label: "Growing carrots" },
      { href: "/vegetable-gardening/swiss-chard", label: "Growing Swiss chard" },
    ],
    faqs: [
      {
        question: "Can I eat beet greens?",
        answer:
          "Yes. They cook like chard. Leave enough foliage if you still want the root to size up.",
      },
    ],
  },
  {
    slug: "onions",
    name: "Onions",
    group: "roots",
    complete: false,
    description:
      "Growing onions in raised beds: sets vs plants, spacing, day length, and watering.",
    intro:
      "Onions care about day length as much as soil. Long-day types belong in the North; short-day types in the South. Raised beds drain well, which onions like, as long as you do not let them dry to dust.",
    facts: [
      { label: "Spacing", value: "4–6 in for bulbs; closer for bunching onions" },
      { label: "Soil", value: "Loose, fertile, well-drained" },
      { label: "Sunlight", value: "8+ hours" },
      { label: "Planting depth", value: "Sets: tip showing; plants: about as deep as they grew" },
      { label: "Water", value: "Even while bulbing; ease off as tops fall" },
      { label: "Days to harvest", value: "Often 90–120 days from plants or sets" },
    ],
    soil: [
      "They are moderate feeders. Compost plus a light nitrogen feed if plants are pale — label rates only.",
      "Weeds compete badly. A clean, mulched bed matters.",
    ],
    watering: [
      "Keep moisture even until tops start to yellow and fall. Then cut back so bulbs cure.",
    ],
    sunlight: "Full sun. Shade from tomato cages makes skinny bulbs.",
    planting: [
      "Sets are easy; plants (transplants) often make better storage bulbs.",
      "Match variety to your latitude. This is not optional trivia.",
    ],
    spacing: ["4–6 inches for bulb onions. Square-foot: 9 per square is a common pattern."],
    problems: [
      { name: "Bolting", detail: "Big sets, or a cold snap after growth starts. Use smaller sets." },
      { name: "Rot", detail: "Poor drainage or watering after tops have fallen." },
    ],
    tools: ["The plant spacing calculator", "A dry rack for curing"],
    relatedTools: [...tools, { href: "/calculators/fertilizer", label: "Fertilizer calculator" }],
    relatedGuides: [
      { href: "/vegetable-gardening/garlic", label: "Growing garlic" },
      { href: "/guides/how-to-fertilize-a-raised-bed-garden", label: "How to fertilize a raised bed garden" },
    ],
    faqs: [
      {
        question: "Why are my onions all neck and no bulb?",
        answer:
          "Wrong day-length type for your region, too much shade, or crowding. Check the variety group before you buy sets next year.",
      },
    ],
  },
  {
    slug: "garlic",
    name: "Garlic",
    group: "roots",
    complete: false,
    description:
      "Growing garlic in raised beds: fall planting, spacing, watering, and harvest timing.",
    intro:
      "Garlic is a fall-planted crop in most of the US. A raised bed is a good home if it drains. Plant cloves in autumn, mulch, ignore them most of the winter, then water steadily in spring until harvest.",
    facts: [
      { label: "Spacing", value: "4–6 in" },
      { label: "Soil", value: "Loose, well-drained, moderate fertility" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "2–3 in, pointed end up" },
      { label: "Water", value: "Spring moisture; dry off as leaves brown" },
      { label: "Days to harvest", value: "Plant fall, harvest early to mid summer" },
    ],
    soil: ["Do not plant in a soggy closed-bottom bed. Rot is the winter killer."],
    watering: [
      "Winter precipitation often does the work. In dry Western winters, occasional water may be needed if the bed is bone dry.",
      "Stop heavy watering when leaves yellow in early summer.",
    ],
    sunlight: "Full sun in spring. It can share a bed that will later hold tomatoes after harvest.",
    planting: [
      "Break bulbs into cloves just before planting. Softneck vs hardneck is a climate and kitchen choice.",
      "Mulch after the ground cools. Pull mulch back in spring if it stays too wet.",
    ],
    spacing: ["4–6 inches in the row, 8–12 inches between rows if you use rows."],
    problems: [
      { name: "Rot", detail: "Poor drainage or planting grocery garlic treated to not sprout well." },
      { name: "Small bulbs", detail: "Late planting, crowding, or stopping water too early in spring." },
    ],
    tools: ["Mulch", "A dry, airy place to cure"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/onions", label: "Growing onions" },
      { href: "/guides/how-to-prepare-a-raised-bed", label: "How to prepare a raised bed" },
    ],
    faqs: [
      {
        question: "Can I plant grocery-store garlic?",
        answer:
          "Sometimes. It may be a type unsuited to your climate or treated against sprouting. Seed garlic from a grower is the more reliable path.",
      },
    ],
  },
  {
    slug: "potatoes",
    name: "Potatoes",
    group: "roots",
    complete: false,
    description:
      "Growing potatoes in raised beds: seed pieces, hilling, soil depth, and watering.",
    intro:
      "Potatoes want loose soil you can hill or fill as vines grow. A 12-inch-deep raised bed works; shallower boxes make a small crop. Start with certified seed potatoes, not grocery tubers.",
    facts: [
      { label: "Spacing", value: "10–12 in in the row" },
      { label: "Soil", value: "Loose, 12+ inches, not waterlogged; avoid fresh lime right before planting" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "3–4 in, then hill as shoots grow" },
      { label: "Water", value: "Even moisture while tubers bulk; less as vines die back" },
      { label: "Days to harvest", value: "Earlies ~70 days; storage types 90–120" },
    ],
    soil: [
      "Loose mix without rocks. Heavy clay in a closed bed makes odd tubers and rot.",
      "Do not plant in a bed that had potatoes or tomatoes last year if blight or scab was a problem.",
    ],
    watering: [
      "Uneven water causes hollow heart and scab pressure. Mulch after hilling.",
    ],
    sunlight: "Full sun. They will shade neighboring lettuce — plan the layout.",
    planting: [
      "Cut seed potatoes into pieces with at least one eye. Let cuts dry a day if you want less rot.",
      "Hill soil or add mix when plants are 6–8 inches tall so tubers stay covered and ungreened.",
    ],
    spacing: ["10–12 inches. A 4×8 bed can hold a lot — or a reasonable 8–12 plants if you want other crops too."],
    problems: [
      { name: "Colorado potato beetle", detail: "Strip adults and larvae by hand early. They can defoliate a small bed fast." },
      { name: "Greening", detail: "Tubers saw light. Hill higher next time; do not eat green parts." },
    ],
    tools: ["A fork for harvest — not a spade through the bed"],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      ...tools,
    ],
    relatedGuides: [
      { href: "/guides/how-deep-should-a-raised-bed-be", label: "How deep should a raised bed be?" },
      { href: "/vegetable-gardening/sweet-potatoes", label: "Growing sweet potatoes" },
    ],
    faqs: [
      {
        question: "Can I grow potatoes in a 6-inch bed?",
        answer:
          "You will get a small crop at best. Twelve inches of loose mix is the practical minimum.",
      },
    ],
  },
  {
    slug: "sweet-potatoes",
    name: "Sweet potatoes",
    group: "roots",
    complete: false,
    description:
      "Growing sweet potatoes in raised beds: slips, heat, spacing, and curing.",
    intro:
      "Sweet potatoes are a heat crop grown from slips, not from grocery leftovers you bury. They want a long warm season. A raised bed that drains and warms early is a good fit in the South and a gamble in short-season North.",
    facts: [
      { label: "Spacing", value: "12–18 in" },
      { label: "Soil", value: "Loose, well-drained; not heavy nitrogen" },
      { label: "Sunlight", value: "8+ hours and heat" },
      { label: "Planting depth", value: "Bury slip nodes; leaves above soil" },
      { label: "Water", value: "Steady until established, then moderate" },
      { label: "Days to harvest", value: "Often 90–120 frost-free days" },
    ],
    soil: ["Loose mix. Heavy nitrogen makes vines, not roots."],
    watering: ["Water slips in well. After they run, they handle heat better than Irish potatoes."],
    sunlight: "Full sun. This is not a cool-climate green.",
    planting: [
      "Plant slips after nights are reliably warm — often after tomatoes are already in.",
      "Cure harvested roots in warmth and humidity before storage. Fresh-dug sweet potatoes are not storage-ready.",
    ],
    spacing: ["12–18 inches. Vines will roam; pinch if they smother peppers."],
    problems: [
      { name: "Short season", detail: "Frost kills vines and can damage roots. Count your frost-free days before you buy slips." },
      { name: "Few roots", detail: "Too much nitrogen, cold soil, or harvesting too early." },
    ],
    tools: ["A fork for harvest", "A warm place to cure"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/potatoes", label: "Growing potatoes" },
      { href: "/guides/how-deep-should-a-raised-bed-be", label: "How deep should a raised bed be?" },
    ],
    faqs: [
      {
        question: "Can I grow sweet potatoes from a grocery tuber?",
        answer:
          "You can sprout slips from one, but grocery roots may be treated or a variety unsuited to your season. Bought slips are simpler.",
      },
    ],
  },
  {
    slug: "turnips",
    name: "Turnips",
    group: "roots",
    complete: false,
    description:
      "Growing turnips in raised beds: fast roots, greens, spacing, and cool-season timing.",
    intro:
      "Turnips are a 6-week cool-season crop. Grow them for roots, greens, or both. They are more forgiving than carrots and faster than beets, and they belong in spring and fall, not July.",
    facts: [
      { label: "Spacing", value: "3–4 in for roots; closer if you only want greens" },
      { label: "Soil", value: "Loose, average fertility" },
      { label: "Sunlight", value: "6+ hours" },
      { label: "Planting depth", value: "½ inch" },
      { label: "Water", value: "Even; drought makes pithy roots" },
      { label: "Days to harvest", value: "Greens ~30 days; roots 40–60" },
    ],
    soil: ["Loose mix. They do not need a deep box like parsnips."],
    watering: ["Keep moisture even. Heat plus drought is why people say they hate turnips."],
    sunlight: "Full sun in cool weather.",
    planting: [
      "Sow early spring and late summer.",
      "Thin to 3–4 inches if you want bulbs. Eat thinnings.",
    ],
    spacing: ["3–4 inches. Square-foot: 9–16."],
    problems: [
      { name: "Flea beetles on greens", detail: "Row cover. Roots may still form." },
      { name: "Woody roots", detail: "Left too long or grown in heat. Harvest small." },
    ],
    tools: ["Row cover"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/radishes", label: "Growing radishes" },
      { href: "/vegetable-gardening/beets", label: "Growing beets" },
    ],
    faqs: [
      {
        question: "Are turnip greens worth growing if I do not like the roots?",
        answer:
          "Yes. Sow denser, harvest young, and pull before they get tough. Same family as mustard and collards.",
      },
    ],
  },
  {
    slug: "basil",
    name: "Basil",
    group: "herbs",
    complete: false,
    description:
      "Growing basil in raised beds: warmth, pinching, spacing, and pairing with tomatoes.",
    intro:
      "Basil is a heat-loving annual herb. It earns a square at the sunny edge of a tomato bed if you pinch flower spikes and water the soil, not the leaves. Cold nights in the 40s can blacken it overnight.",
    facts: [
      { label: "Spacing", value: "8–12 in" },
      { label: "Soil", value: "Well-drained, moderate fertility" },
      { label: "Sunlight", value: "6–8 hours" },
      { label: "Planting depth", value: "Same as the pot" },
      { label: "Water", value: "Even moisture; hates wet leaves in cool weather" },
      { label: "Days to harvest", value: "Pinch in 3–4 weeks; full plants ~60 days" },
    ],
    soil: ["Average raised-bed mix. Too much nitrogen makes watery, less fragrant leaves."],
    watering: ["Water at the base. Basil downy mildew loves wet foliage in humid summers."],
    sunlight: "Full sun. A little afternoon shade in desert heat reduces stress.",
    planting: [
      "Transplant after nights stay above the 50s °F.",
      "Pinch above a leaf pair to make it bushy. Do not let it run to flower if you want leaves.",
    ],
    spacing: ["8–12 inches. One per square is plenty next to tomatoes."],
    problems: [
      { name: "Downy mildew", detail: "Yellowing and gray undersides. Airflow, dry leaves, resistant varieties." },
      { name: "Cold damage", detail: "It is not parsley. Wait to plant." },
    ],
    tools: ["Bypass pruners or fingers for pinching"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/tomatoes", label: "Growing tomatoes" },
      { href: "/vegetable-gardening/cilantro", label: "Growing cilantro" },
    ],
    faqs: [
      {
        question: "Should basil go in the tomato bed?",
        answer:
          "It can. Keep it on the sunny edge so tomatoes do not shade it out by July. Companions are not magic pest control.",
      },
    ],
  },
  {
    slug: "cilantro",
    name: "Cilantro",
    group: "herbs",
    complete: false,
    description:
      "Growing cilantro in raised beds: cool weather, succession sowing, and bolting.",
    intro:
      "Cilantro is a cool-season herb that bolts as soon as days warm. Sow small pinches every two weeks in spring and fall. In summer, grow it in shade or skip it and wait.",
    facts: [
      { label: "Spacing", value: "4–6 in" },
      { label: "Soil", value: "Average, well-drained" },
      { label: "Sunlight", value: "Full sun in cool weather; afternoon shade in heat" },
      { label: "Planting depth", value: "¼–½ inch" },
      { label: "Water", value: "Steady; drought speeds bolting" },
      { label: "Days to harvest", value: "Leaves often 21–40 days; seed (coriander) later" },
    ],
    soil: ["Not a heavy feeder. Compost-rich mix is enough."],
    watering: ["Keep the seedbed moist. Raised beds dry cilantro out faster than you expect."],
    sunlight: "Spring and fall sun. Long, hot days are why supermarket bunches look better than July plants.",
    planting: [
      "Direct-sow. It dislikes transplanting.",
      "Let a few plants flower if you want coriander seed or self-sown seedlings.",
    ],
    spacing: ["4–6 inches, or a dense band you cut as a mix."],
    problems: [
      { name: "Bolting", detail: "Heat. Succession sow and use slower-bolt varieties; they still bolt." },
    ],
    tools: ["Scissors"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/basil", label: "Growing basil" },
      { href: "/vegetable-gardening/parsley", label: "Growing parsley" },
    ],
    faqs: [
      {
        question: "Can I keep cilantro going all summer?",
        answer:
          "Only in mild-summer climates or with shade and constant reseeding. Most US gardeners treat it as a spring/fall herb.",
      },
    ],
  },
  {
    slug: "parsley",
    name: "Parsley",
    group: "herbs",
    complete: false,
    description:
      "Growing parsley in raised beds: slow germination, spacing, and biennial habit.",
    intro:
      "Parsley is slower than basil and tougher than cilantro. Seed can take 2–3 weeks to sprout. It is a biennial: leaves the first year, flowers the second. For kitchen use, treat it as an annual and resow.",
    facts: [
      { label: "Spacing", value: "6–8 in" },
      { label: "Soil", value: "Compost-rich, even moisture" },
      { label: "Sunlight", value: "6+ hours; light shade in heat" },
      { label: "Planting depth", value: "¼ inch" },
      { label: "Water", value: "Steady; it sulks if a raised bed dries out" },
      { label: "Days to harvest", value: "Often 70–90 days from seed; faster from starts" },
    ],
    soil: ["Average-to-rich mix. It is a moderate feeder."],
    watering: ["Do not let it wilt repeatedly. Flat-leaf and curly want the same moisture."],
    sunlight: "Full sun in the North; part afternoon shade in hot summers.",
    planting: [
      "Soak seed overnight to speed the slow germinate. Or buy transplants.",
      "Harvest outer stems. Leave the center.",
    ],
    spacing: ["6–8 inches. A few plants supply a household."],
    problems: [
      { name: "Slow germination", detail: "Normal. Keep the seedbed moist for weeks, not days." },
      { name: "Swallowtail caterpillars", detail: "They eat parsley and dill. Hand-pick or plant extra for them." },
    ],
    tools: ["Patience, or transplants"],
    relatedTools: tools,
    relatedGuides: [
      { href: "/vegetable-gardening/cilantro", label: "Growing cilantro" },
      { href: "/vegetable-gardening/basil", label: "Growing basil" },
    ],
    faqs: [
      {
        question: "Curly or flat-leaf parsley?",
        answer:
          "Flavor is a kitchen choice. Growing conditions are the same. Flat-leaf is what most cooks prefer.",
      },
    ],
  },
  {
    slug: "asparagus",
    name: "Asparagus",
    group: "perennials",
    complete: false,
    description:
      "Growing asparagus in a raised bed: crowns, patience, spacing, and why it needs a dedicated bed.",
    intro:
      "Asparagus is a 10–15 year crop. It does not belong in a bed you want to replant with tomatoes every May. Give it its own frame, plant crowns in spring, and skip a full harvest for the first two seasons.",
    facts: [
      { label: "Spacing", value: "12–18 in in the row" },
      { label: "Soil", value: "Deep, well-drained, not waterlogged; slightly acidic to neutral" },
      { label: "Sunlight", value: "8+ hours" },
      { label: "Planting depth", value: "Crowns in a trench, covered gradually to 6–8 in" },
      { label: "Water", value: "Steady the first year; established patches are moderately drought-tolerant" },
      { label: "Days to harvest", value: "Light harvest year 2–3; full harvest after that, in spring" },
    ],
    soil: [
      "Deep, draining mix. Closed-bottom shallow kits are a poor match.",
      "Do not plant in a bed that stays soggy. Crowns rot.",
    ],
    watering: ["Year one is establishment. Mulch. Do not let a new raised bed go bone dry in July."],
    sunlight: "Full sun. Ferns will shade anything you try to interplant by midsummer.",
    planting: [
      "Plant dormant crowns in spring. One-year crowns are the usual mail-order product.",
      "Let ferns grow all season after the short harvest window. They feed next year’s spears.",
    ],
    spacing: ["12–18 inches. A dedicated 4×8 can hold a real patch — or feel empty the first spring. That is normal."],
    problems: [
      { name: "Asparagus beetles", detail: "Hand-pick on spears and ferns. A small bed is manageable." },
      { name: "No spears", detail: "You harvested too hard too young, or the bed is too wet or too new." },
    ],
    tools: ["A dedicated bed you will not till", "Mulch"],
    relatedTools: [
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
      { href: "/guides/how-often-to-water-raised-beds", label: "How often to water raised beds" },
    ],
    relatedGuides: [
      { href: "/guides/how-to-prepare-a-raised-bed", label: "How to prepare a raised bed" },
      { href: "/vegetable-gardening/strawberries", label: "Growing strawberries" },
    ],
    faqs: [
      {
        question: "Can I mix asparagus with annual vegetables?",
        answer:
          "You can try lettuce at the edges in early spring. By the time tomato season starts, the ferns want the whole bed. A separate frame is cleaner.",
      },
    ],
  },
];
