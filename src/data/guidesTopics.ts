import type { Guide } from "@/data/guides";

/** Seed starting, pests, and extra tool guides appended to the main guides list. */
export const topicGuides: Guide[] = [
  {
    slug: "how-to-start-vegetable-seeds-indoors",
    title: "How to Start Vegetable Seeds Indoors",
    description:
      "Soil mix, light, warmth, and timing for starting tomatoes, peppers, and other vegetables from seed indoors.",
    type: "guide",
    category: "seeds",
    updated: "2026-08-27",
    featured: true,
    intro:
      "Most fruiting vegetables want a head start indoors so they have enough warm weeks outdoors. Use a light seed mix, real light, and transplant before the plants starve in a tiny cell.",
    body: [
      {
        type: "p",
        text: "Seed starting is not complicated, but it is exacting. Weak light and wet soil are the usual failures. You do not need a greenhouse; a shelf, a heat mat for peppers, and an LED shop light that hangs close to the leaves will outgrow a sunny windowsill.",
      },
      {
        type: "h2",
        id: "when",
        text: "When to start",
      },
      {
        type: "p",
        text: "Count backward from your average last spring frost date. County extension pages list that date. Then match the crop:",
      },
      {
        type: "table",
        caption: "Typical indoor start windows before last frost",
        headers: ["Crop", "Start indoors", "Notes"],
        rows: [
          ["Onion, leek", "8–12 weeks", "Cool-tolerant; can go out earlier than tomatoes"],
          ["Pepper, eggplant", "8–10 weeks", "Want warmth to germinate and grow"],
          ["Tomato", "5–7 weeks", "Too early makes leggy plants in small pots"],
          ["Broccoli, cabbage", "4–6 weeks", "Can take some cool outdoor nights"],
          ["Cucumber, squash, melon", "2–3 weeks", "Hate root disturbance; often direct-sow instead"],
          ["Lettuce, herbs", "3–5 weeks", "Or sow outdoors when soil is workable"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Beans and peas usually skip the tray",
        text: "Bush beans and peas germinate fast outdoors. Starting them indoors rarely pays unless wildlife eats every seed in the bed.",
      },
      {
        type: "h2",
        text: "Mix, trays, and moisture",
      },
      {
        type: "ul",
        items: [
          "Use a seed-starting or fine potting mix, not garden soil. Garden soil packs and stays cold.",
          "Moisten the mix before filling cells so dry peat does not float when you water.",
          "Sow at the depth on the packet — usually about twice the seed’s thickness.",
          "Cover trays until sprouts show, then remove the cover so humidity does not invite damping-off.",
          "Water from below when you can. The surface should not stay soggy.",
        ],
      },
      {
        type: "h2",
        text: "Light and temperature",
      },
      {
        type: "ul",
        items: [
          "Hang lights a few inches above the tops. Raise the light as plants grow. A distant ceiling fixture makes spindly stems.",
          "Most vegetables germinate around 70–75°F. Peppers like the warm end; a heat mat helps.",
          "After germination, cooler nights (60s°F) keep tomatoes stockier than a hot closet.",
          "A south window alone is usually not enough in late winter. Supplement with light.",
        ],
      },
      {
        type: "h2",
        text: "Potting up",
      },
      {
        type: "p",
        text: "When roots fill the cell or true leaves are crowded, move to a larger pot with the same kind of mix. Tomatoes can go deeper — bury part of the stem. Peppers prefer to stay at the same depth. See [when to transplant seedlings](/guides/when-to-transplant-seedlings) for hardening off and outdoor timing.",
      },
    ],
    faqs: [
      {
        question: "Do I need grow lights?",
        answer:
          "If you start more than a few herbs on a bright sill in late spring, maybe not. For tomatoes and peppers in February–March in most of the US, yes — or accept skinny plants.",
      },
      {
        question: "Why did my seedlings fall over and die?",
        answer:
          "Often damping-off from wet, still air, or reused dirty trays. Use fresh mix, airflow, and stop covering trays after sprouts appear.",
      },
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/seeds", label: "Seeds & seed starting hub" },
    ],
    relatedGuides: [
      {
        href: "/guides/when-to-transplant-seedlings",
        label: "When to transplant seedlings",
      },
      {
        href: "/guides/how-to-prepare-a-raised-bed",
        label: "How to prepare a raised bed",
      },
      { href: "/vegetable-gardening/tomatoes", label: "Growing tomatoes" },
    ],
  },
  {
    slug: "when-to-transplant-seedlings",
    title: "When to Transplant Seedlings",
    description:
      "Hardening off, frost dates, and soil temperature cues for moving vegetable seedlings into raised beds and pots.",
    type: "guide",
    category: "seeds",
    updated: "2026-08-27",
    intro:
      "Transplant when the plant is sturdy, the outdoor risk of hard frost has passed for that crop, and the soil is warm enough. Rushing warm-season crops into cold mud stalls them for weeks.",
    body: [
      {
        type: "h2",
        text: "Hardening off",
      },
      {
        type: "p",
        text: "Indoor plants have soft tissue. Over 5–7 days, move them outside into shade for a few hours, then more sun and wind each day. Bring them in if nights drop hard. Skip this step and leaves bleach or wilt even if the calendar looks fine.",
      },
      {
        type: "h2",
        text: "Crop timing outdoors",
      },
      {
        type: "table",
        headers: ["Crop", "Plant out when", "Watch for"],
        rows: [
          [
            "Tomato",
            "After last frost; nights usually above ~50°F",
            "Black plastic or wall-of-water only if you know your microclimate",
          ],
          [
            "Pepper, eggplant",
            "A week or more after tomatoes; soil warm",
            "Cold nights yellow leaves and slow growth",
          ],
          [
            "Cucumber, squash",
            "Soil near 60°F+; after frost",
            "Direct sow often beats a root-bound transplant",
          ],
          [
            "Broccoli, cabbage, kale",
            "Can go earlier; they tolerate cool nights",
            "Hard freezes still damage small starts",
          ],
          [
            "Onion sets / plants",
            "As soon as soil can be worked in spring",
            "Long-day vs short-day type for your latitude",
          ],
        ],
      },
      {
        type: "h2",
        text: "How to plant",
      },
      {
        type: "ol",
        items: [
          "Water the seedling in its pot an hour before you dig.",
          "Set tomatoes deeper than they sat in the pot; keep peppers at the same depth.",
          "Firm soil gently. Water in. Mulch after a day or two once soil is settled.",
          "Use the [plant spacing calculator](/calculators/plant-spacing) so the bed is not overcrowded on day one.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Do not transplant into dust-dry mix",
        text: "Fill new pots and beds with moistened potting mix or bed soil first. Dry peat mixes shed water around the root ball and the plant wilts while the surface looks watered.",
      },
    ],
    faqs: [
      {
        question: "Can I transplant on a hot afternoon?",
        answer:
          "Evening or a cloudy day is kinder. If you must plant in heat, shade for a day and water deeply.",
      },
      {
        question: "My seedlings are flowering in the tray. Plant them?",
        answer:
          "Yes if the outdoor date is right — pinch early flowers on peppers and tomatoes if the plant is still tiny. Next year start a week later or pot up sooner.",
      },
    ],
    relatedTools: [
      { href: "/calculators/plant-spacing", label: "Plant spacing calculator" },
      { href: "/seeds", label: "Seeds & seed starting hub" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-to-start-vegetable-seeds-indoors",
        label: "How to start vegetable seeds indoors",
      },
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
    ],
  },
  {
    slug: "aphids-on-vegetable-plants",
    title: "Aphids on Vegetable Plants",
    description:
      "How to recognize aphids on tomatoes, peppers, and greens, and what to do before reaching for a spray.",
    type: "guide",
    category: "pests",
    updated: "2026-08-27",
    featured: true,
    intro:
      "Aphids cluster on soft tips and leaf undersides. A strong water spray and patience for beneficial insects handle light pressure. Broad insecticides often make the next outbreak worse.",
    body: [
      {
        type: "p",
        text: "Aphids are soft-bodied and come in green, black, yellow, and gray. Sticky honeydew and ants farming the colony are clues. They prefer lush, nitrogen-heavy growth — overfertilized beds get hit first.",
      },
      {
        type: "h2",
        text: "First responses",
      },
      {
        type: "ol",
        items: [
          "Blast undersides of leaves with water in the morning. Repeat a few days in a row.",
          "Pinch out the worst tips into a bag and trash them if the colony is tiny and localized.",
          "Watch for lady beetles, lacewings, and hoverfly larvae. If they are present, pause sprays.",
          "For a stubborn patch, insecticidal soap or horticultural oil labeled for food crops — cover undersides, and follow the label.",
        ],
      },
      {
        type: "callout",
        tone: "warning",
        title: "Skip the hose-end “kill everything” jug",
        text: "Pyrethroid sprays knock down aphids and the predators that keep them in check. The rebound is a classic backyard pattern.",
      },
      {
        type: "h2",
        text: "Prevention that actually helps",
      },
      {
        type: "ul",
        items: [
          "Do not push soft growth with constant high-nitrogen feeding. See [fertilizing a raised bed](/guides/how-to-fertilize-a-raised-bed-garden).",
          "Keep weeds down at the bed edge; some harbor aphids between crops.",
          "Inspect new nursery plants before they join the garden.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will aphids kill my tomato?",
        answer:
          "Heavy colonies distort tips and can spread viruses, but a moderate infestation rarely kills a healthy plant. Act early on peppers and greens, which show damage faster.",
      },
      {
        question: "Are yellow sticky traps enough?",
        answer:
          "They catch some winged adults and help you notice a problem. They do not replace checking leaves.",
      },
    ],
    relatedTools: [{ href: "/pest-problems", label: "Pest & plant problems hub" }],
    relatedGuides: [
      { href: "/guides/tomato-hornworms", label: "Tomato hornworms" },
      { href: "/vegetable-gardening/tomatoes", label: "Growing tomatoes" },
      { href: "/vegetable-gardening/peppers", label: "Growing peppers" },
    ],
  },
  {
    slug: "tomato-hornworms",
    title: "Tomato Hornworms",
    description:
      "How to find and remove tomato hornworms, and how to tell them apart from beneficial lookalikes.",
    type: "guide",
    category: "pests",
    updated: "2026-08-27",
    intro:
      "Hornworms strip tomato and sometimes pepper leaves overnight. They are large, green, and hard to see until the damage appears. Hand-picking is still the most reliable backyard control.",
    body: [
      {
        type: "p",
        text: "Look for chewed leaves, dark droppings on foliage, and stems stripped bare. The caterpillar has a horn at the rear. Search at dusk with a flashlight — their eyeshine helps — or scan the plant after you notice fresh frass.",
      },
      {
        type: "h2",
        text: "What to do",
      },
      {
        type: "ul",
        items: [
          "Pick them into soapy water or relocate far from the garden if you prefer.",
          "If a hornworm is covered in white cocoons, leave it. Those are parasitic wasp pupae; the wasp generation will hunt more hornworms.",
          "Bt (Bacillus thuringiensis) products labeled for caterpillars on vegetables can help on young worms; large ones are easier to pick.",
          "Clear nearby nightshade weeds that can host related moths.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Tobacco hornworms look similar",
        text: "Markings differ slightly, and both eat tomatoes. Treatment is the same: find and remove, protect the parasitized ones.",
      },
      {
        type: "h2",
        text: "After the damage",
      },
      {
        type: "p",
        text: "A defoliated plant can still set fruit if stems and some leaves remain. Water evenly and avoid a heavy nitrogen push that only makes soft new tips for the next moth. Spacing and airflow notes are on the [tomato page](/vegetable-gardening/tomatoes).",
      },
    ],
    faqs: [
      {
        question: "Will hornworms eat the fruit?",
        answer:
          "They prefer leaves but will scar green fruit. Removing worms promptly protects later clusters.",
      },
    ],
    relatedTools: [{ href: "/pest-problems", label: "Pest & plant problems hub" }],
    relatedGuides: [
      { href: "/guides/aphids-on-vegetable-plants", label: "Aphids on vegetables" },
      { href: "/guides/blossom-end-rot", label: "Blossom-end rot" },
      { href: "/vegetable-gardening/tomatoes", label: "Growing tomatoes" },
    ],
  },
  {
    slug: "blossom-end-rot",
    title: "Blossom-End Rot on Tomatoes and Peppers",
    description:
      "Why blossom-end rot shows up, what uneven watering has to do with calcium, and what actually helps in a raised bed.",
    type: "guide",
    category: "pests",
    updated: "2026-08-27",
    featured: true,
    intro:
      "Blossom-end rot is a dark, leathery patch on the flower end of tomato or pepper fruit. It is a calcium uptake problem tied closely to uneven soil moisture — not a disease you catch from a neighbor.",
    body: [
      {
        type: "p",
        text: "Calcium moves with water in the plant. When the bed swings from bone-dry to soaked, fruit tissue can fail at the blossom end even if the soil test shows enough calcium. Foliar calcium sprays are a weak fix if watering stays erratic.",
      },
      {
        type: "h2",
        text: "What to do first",
      },
      {
        type: "ol",
        items: [
          "Mulch. Keep the top inches from baking and crusting.",
          "Water so the root zone stays evenly moist — finger test two inches down. See [how often to water](/guides/how-often-to-water-raised-beds).",
          "Pick and discard the damaged fruit. The plant can set clean fruit later if conditions stabilize.",
          "Avoid heavy nitrogen that pushes leaves at the expense of balanced growth.",
        ],
      },
      {
        type: "h2",
        text: "When to think about soil calcium",
      },
      {
        type: "p",
        text: "If rot continues after watering is steady, get a soil test. Adding lime or gypsum without a test can push pH or nutrient balance the wrong way. Raised beds filled with a compost-heavy mix are not automatically “low calcium,” but very peaty mixes sometimes need mineral balance over time.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Variety and early fruit",
        text: "The first fruits of the season show blossom-end rot more often. Some varieties are more prone. Do not rip out the plant after one bad tomato.",
      },
    ],
    faqs: [
      {
        question: "Is blossom-end rot contagious?",
        answer:
          "No. It is a physiological disorder. Fix the bed’s moisture and nutrition story; you do not need to sterilize tools for this one.",
      },
      {
        question: "Will crushed eggshells fix it this season?",
        answer:
          "Shells break down too slowly to rescue fruit that is already forming. Focus on water and a soil test for next season.",
      },
    ],
    relatedTools: [
      { href: "/pest-problems", label: "Pest & plant problems hub" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
    ],
    relatedGuides: [
      {
        href: "/guides/how-often-to-water-raised-beds",
        label: "How often to water raised beds",
      },
      { href: "/vegetable-gardening/tomatoes", label: "Growing tomatoes" },
      { href: "/vegetable-gardening/peppers", label: "Growing peppers" },
    ],
  },
  {
    slug: "best-garden-cart",
    title: "Best Garden Cart: Buying Criteria",
    description:
      "What to look for in a garden cart or wheelbarrow for moving soil, compost, and mulch — without fake product rankings.",
    type: "product",
    category: "products",
    updated: "2026-08-27",
    intro:
      "A cart earns its keep when you haul bags of mix, compost, or mulch. Capacity, wheel type, and whether you can dump cleanly matter more than color.",
    body: [
      {
        type: "callout",
        tone: "info",
        title: "Recommendations not yet researched",
        text: "Buying criteria only. No ranked list, prices, or “we tested” claims until a real product is added.",
      },
      {
        type: "h2",
        text: "What matters",
      },
      {
        type: "ul",
        items: [
          "Load rating that matches wet soil and compost — dry liters on the label understate weight when wet",
          "Wheel size and type: pneumatic tires soften rough ground; foam-filled avoid flats",
          "Tray shape you can shovel out of; a steep dump angle helps",
          "Handle height that does not force a bent back on your paths",
          "Width that fits your gates and bed aisles",
        ],
      },
      {
        type: "h2",
        text: "Cart vs wheelbarrow",
      },
      {
        type: "p",
        text: "Wheelbarrows turn tighter in a crowded yard. Four-wheel carts carry more with less wrist strain on flat ground. For filling a new raised bed, volume math still starts with the [raised bed soil calculator](/calculators/raised-bed-soil) so you know how many loads you are signing up for.",
      },
    ],
    faqs: [
      {
        question: "Do I need a $400 garden cart?",
        answer:
          "Not for a couple of 4×8 beds. A sturdy barrow or mid-size cart that dumps cleanly is enough. Spend on soil and compost first.",
      },
    ],
    relatedTools: [
      { href: "/garden-tools", label: "Garden tools hub" },
      { href: "/calculators/raised-bed-soil", label: "Raised bed soil calculator" },
    ],
    relatedGuides: [
      { href: "/guides/best-garden-hose", label: "Garden hose buying guide" },
      {
        href: "/guides/how-much-soil-does-a-raised-bed-need",
        label: "How much soil does a raised bed need?",
      },
    ],
    products: ["garden-cart-placeholder"],
  },
];
