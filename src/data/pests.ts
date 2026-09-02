export type PestProductTip = {
  name: string;
  when: string;
  lookFor: string;
};

export type Pest = {
  slug: string;
  name: string;
  alsoCalled?: string;
  summary: string;
  crops: string[];
  identify: string[];
  damage: string;
  controls: string[];
  products: PestProductTip[];
  image: {
    src: string;
    alt: string;
    credit: string;
    license: string;
    commonsUrl: string;
  };
  relatedGuideHref?: string;
};

const img = (
  slug: string,
  alt: string,
  credit: string,
  license: string,
  commonsUrl: string,
): Pest["image"] => ({
  src: `/images/pests/${slug}.jpg`,
  alt,
  credit,
  license,
  commonsUrl,
});

export const pests: Pest[] = [
  {
    slug: "aphids",
    name: "Aphids",
    alsoCalled: "Plant lice",
    summary: "Soft clusters on tips and leaf undersides that suck sap and leave sticky honeydew.",
    crops: [
      "Tomato",
      "Pepper",
      "Greens",
      "Beans",
      "Cucumber",
    ],
    identify: [
      "Pear-shaped soft insects in green, black, yellow, or gray",
      "Crowded on new growth and under leaves",
      "Sticky honeydew; ants may farm the colony",
    ],
    damage: "Distorted tips, yellowing, sooty mold on honeydew, and possible virus spread.",
    controls: [
      "Blast undersides of leaves with water in the morning for several days.",
      "Pinch out the worst tips into a bag if the colony is small.",
      "Protect lady beetles and lacewings — pause sprays if predators are present.",
      "Avoid constant high-nitrogen feeding that makes soft, attractive growth.",
    ],
    products: [
      {
        name: "Insecticidal soap",
        when: "Light to moderate colonies after water sprays fail",
        lookFor: "Labeled for aphids on edible crops; coat undersides; reapply per label",
      },
      {
        name: "Horticultural oil (summer rate)",
        when: "Stubborn colonies on sturdy leaves",
        lookFor: "Food-crop label; avoid hot midday sun to reduce leaf burn",
      },
    ],
    image: img(
      "aphids",
      "Green peach aphids clustered on a plant stem",
      "Jules Verne Times Two",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Green_peach_aphid_(Myzus_persicae)_on_a_stem,_Lisbon,_Portugal_(approx._GPS_location)_julesvernex2.jpg",
    ),
    relatedGuideHref: "/guides/aphids-on-vegetable-plants",
  },
  {
    slug: "tomato-hornworm",
    name: "Tomato hornworm",
    alsoCalled: "Five-spotted hawk moth larva",
    summary: "Large green caterpillars that can strip tomato leaves overnight.",
    crops: [
      "Tomato",
      "Pepper",
      "Eggplant",
    ],
    identify: [
      "Fat green caterpillar up to 4 inches with a horn at the rear",
      "White V-shaped marks along the sides (tobacco hornworms look similar)",
      "Dark droppings (frass) on leaves below the feeding site",
    ],
    damage: "Sudden defoliation; green fruit may be scarred.",
    controls: [
      "Hand-pick into soapy water; search at dusk with a flashlight.",
      "Leave worms covered in white cocoons — those are parasitic wasps.",
      "Clear nightshade weeds that can host related moths.",
    ],
    products: [
      {
        name: "Bt (Bacillus thuringiensis kurstaki)",
        when: "Young hornworms you cannot find by hand",
        lookFor: "Btk labeled for caterpillars on vegetables; spray leaf undersides",
      },
    ],
    image: img(
      "tomato-hornworm",
      "Tomato hornworm caterpillar on foliage",
      "Whitney Cranshaw, Colorado State University, Bugwood.org",
      "CC BY 3.0 us",
      "https://commons.wikimedia.org/wiki/File:Manduca_quinquemaculata_larva.jpg",
    ),
    relatedGuideHref: "/guides/tomato-hornworms",
  },
  {
    slug: "cabbage-worm",
    name: "Imported cabbageworm",
    alsoCalled: "Cabbage worm; Pieris rapae larva",
    summary: "Velvety green caterpillars that chew holes in brassica leaves and heads.",
    crops: [
      "Cabbage",
      "Broccoli",
      "Kale",
      "Cauliflower",
      "Brussels sprouts",
    ],
    identify: [
      "Soft green caterpillar matching the leaf color",
      "White butterflies fluttering over the bed in daytime",
      "Ragged holes and green frass on leaves",
    ],
    damage: "Chewed foliage; frass in broccoli heads; seedlings can be ruined.",
    controls: [
      "Cover beds with floating row cover from transplant day until flowering crops need pollinators (brassicas grown for leaves can stay covered).",
      "Hand-pick caterpillars and crush eggs on leaf undersides.",
      "Rotate brassicas; clear crop debris after harvest.",
    ],
    products: [
      {
        name: "Bt (kurstaki)",
        when: "Active feeding on leaves",
        lookFor: "Labeled for cabbageworms on cole crops; reapply after rain per label",
      },
      {
        name: "Spinosad (food-crop label)",
        when: "Heavy pressure when Bt is not enough",
        lookFor: "OMRI-listed options if you want organic; spray evening to reduce bee exposure",
      },
    ],
    image: img(
      "cabbage-worm",
      "Imported cabbageworm caterpillar",
      "Sam Fraser-Smith",
      "CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:Pieris_rapae_caterpillar_1.jpg",
    ),
  },
  {
    slug: "cabbage-looper",
    name: "Cabbage looper",
    summary: "Light green looping caterpillars that chew large holes in brassica leaves.",
    crops: [
      "Cabbage",
      "Broccoli",
      "Kale",
      "Lettuce",
    ],
    identify: [
      "Pale green caterpillar that arches into a loop when it crawls",
      "Thin white lines along the sides",
      "Large irregular holes between leaf veins",
    ],
    damage: "Defoliation and contaminated heads, similar to cabbageworms.",
    controls: [
      "Use floating row cover on spring brassicas.",
      "Hand-pick; look under leaves for pale eggs.",
      "Encourage parasitic wasps by avoiding broad insecticides.",
    ],
    products: [
      {
        name: "Bt (kurstaki)",
        when: "Young loopers on foliage",
        lookFor: "Labeled for loopers/cabbage caterpillars on vegetables",
      },
    ],
    image: img(
      "cabbage-looper",
      "Cabbage looper caterpillar",
      "Lua Eva Blue",
      "CC BY 3.0",
      "https://commons.wikimedia.org/wiki/File:Cabbage_looper_caterpillar.jpg",
    ),
  },
  {
    slug: "diamondback-moth",
    name: "Diamondback moth",
    summary: "Tiny green larvae that chew windows and holes in cabbage-family leaves.",
    crops: [
      "Cabbage",
      "Broccoli",
      "Kale",
      "Mustard greens",
    ],
    identify: [
      "Small pale-green larva that wriggles vigorously when poked",
      "Leaves with windowpane chewing that leaves the upper skin",
      "Adults are tiny gray moths that rest with diamond-patterned wings",
    ],
    damage: "Heavy leaf injury; can ruin transplants quickly.",
    controls: [
      "Row cover from sowing or transplanting.",
      "Remove crop debris; rotate brassicas.",
      "Scout twice a week in warm weather.",
    ],
    products: [
      {
        name: "Bt or spinosad (labeled)",
        when: "Active larvae on leaves",
        lookFor: "Diamondback moth or cabbage caterpillars listed; rotate modes of action if pressure is chronic",
      },
    ],
    image: img(
      "diamondback-moth",
      "Diamondback moth caterpillar on cabbage",
      "Merle Shepard et al. / Bugwood.org",
      "CC BY 3.0 us",
      "https://commons.wikimedia.org/wiki/File:Plutella_xylostella_caterpillar_on_cabbage_(20).jpg",
    ),
  },
  {
    slug: "cabbage-aphid",
    name: "Cabbage aphid",
    summary: "Gray, waxy aphids that coat brassica leaves and flower buds in dense colonies.",
    crops: [
      "Kale",
      "Broccoli",
      "Cabbage",
      "Brussels sprouts",
    ],
    identify: [
      "Powdery gray-green clusters on leaves and flower buds",
      "Waxy coating that makes them look dusty",
      "Often tucked into broccoli heads or kale folds",
    ],
    damage: "Stunted growth, distorted leaves, and unmarketable heads.",
    controls: [
      "Blast with water; remove heavily coated leaves.",
      "Harvest outer leaves often so colonies do not hide.",
      "Row cover on young plantings.",
    ],
    products: [
      {
        name: "Insecticidal soap",
        when: "Colonies persist after water sprays",
        lookFor: "Labeled for aphids on cole crops; soak the waxy clusters thoroughly",
      },
    ],
    image: img(
      "cabbage-aphid",
      "Cabbage aphids on curly kale",
      "Rasbak",
      "CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Melige_koolluis_op_boerenkool_(Brevicoryne_brassicae_on_curley_kale).jpg",
    ),
  },
  {
    slug: "harlequin-bug",
    name: "Harlequin bug",
    summary: "Bright black-and-orange shield bugs that suck sap from brassicas.",
    crops: [
      "Kale",
      "Collards",
      "Mustard",
      "Cabbage",
      "Radish",
    ],
    identify: [
      "Adults with bold orange/red and black geometric markings",
      "Barrel-shaped black-and-white eggs in neat rows",
      "White blotches and wilting on leaves",
    ],
    damage: "White scarring, wilting, and plant death under heavy pressure.",
    controls: [
      "Hand-pick adults and crush egg masses early.",
      "Remove mustard-family weeds that host early generations.",
      "Use row cover on spring greens.",
    ],
    products: [
      {
        name: "Insecticidal soap or neem (nymphs)",
        when: "Young nymphs present",
        lookFor: "Labeled for harlequin bugs or plant bugs on brassicas; adults are harder to kill",
      },
    ],
    image: img(
      "harlequin-bug",
      "Harlequin bug on a leaf",
      "Christina Butler",
      "CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:Harlequin_Bug_-_Murgantia_histrionica_(48720331102).jpg",
    ),
  },
  {
    slug: "squash-bug",
    name: "Squash bug",
    summary: "Shield-shaped bugs that suck sap from squash and pumpkin vines.",
    crops: [
      "Zucchini",
      "Winter squash",
      "Pumpkin",
      "Melon",
    ],
    identify: [
      "Gray-brown adults that look flat and shield-like",
      "Brick-red nymphs in clusters",
      "Bronze egg masses on leaf undersides",
    ],
    damage: "Wilting leaves, yellow spots, and vine collapse under heavy pressure.",
    controls: [
      "Crush egg masses every few days early in the season.",
      "Trap adults under boards overnight and dispose of them in the morning.",
      "Remove vines promptly after harvest; do not leave squash debris over winter.",
      "Row cover until flowering, then lift for pollination.",
    ],
    products: [
      {
        name: "Insecticidal soap or neem (nymphs)",
        when: "Young nymphs only — adults are hard to kill with soap",
        lookFor: "Labeled for squash bugs on cucurbits; contact sprays must hit the insect",
      },
    ],
    image: img(
      "squash-bug",
      "Adult squash bug on a leaf",
      "Ilona Loser",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Anasa_tristis,_adult.jpg",
    ),
  },
  {
    slug: "leaf-footed-bug",
    name: "Leaf-footed bug",
    alsoCalled: "Leptoglossus spp.",
    summary: "Elongated true bugs that pierce fruit; bright orange-red nymphs are common on cucumbers, tomatoes, and peppers.",
    crops: [
      "Cucumber",
      "Tomato",
      "Pepper",
      "Bean",
      "Pecan (nearby)",
    ],
    identify: [
      "Nymphs: slender orange to red bodies with long black antennae and black legs",
      "Adults: brown, elongated; hind legs flared into a leaf-shaped flat segment",
      "Often clustered on ripening fruit and soft stems",
      "Piercing damage leaves sunken spots, scars, or soft areas that later rot",
    ],
    damage: "Catfacing and hard spots on fruit; secondary rot; yield loss on tomatoes and cucurbits.",
    controls: [
      "Hand-pick nymphs and adults into soapy water early in the morning.",
      "Crush egg masses (neat rows of bronze barrels) on leaf undersides.",
      "Remove weedy hosts and overwintering debris at the bed edge.",
      "Use floating row cover on small plantings until flowering if pressure is high.",
      "Do not confuse with beneficial assassin bugs — assassin bugs have a stouter curved beak and often a narrower neck.",
    ],
    products: [
      {
        name: "Insecticidal soap or neem (nymphs)",
        when: "Young orange-red nymphs on fruit",
        lookFor: "Labeled for leaf-footed bugs or plant bugs on the crop; adults are harder to kill with soap alone",
      },
      {
        name: "Kaolin clay (particle film)",
        when: "Repeated fruit scarring on tomatoes or peppers",
        lookFor: "Crop protectant labeled for vegetables; reapply after rain",
      },
    ],
    image: img(
      "leaf-footed-bug",
      "Leaf-footed bug nymph with orange-red body and long black legs",
      "Kate Harper",
      "CC BY 4.0",
      "https://commons.wikimedia.org/wiki/File:Leptoglossus_zonatus_nymph.jpg",
    ),
  },
  {
    slug: "squash-vine-borer",
    name: "Squash vine borer",
    summary: "Moth larva that tunnels inside squash stems and wilts the plant suddenly.",
    crops: [
      "Zucchini",
      "Summer squash",
      "Pumpkin",
    ],
    identify: [
      "Sudden vine wilt while leaves still look green",
      "Sawdust-like frass at holes in the stem base",
      "Fat white grub with a brown head inside the stem",
    ],
    damage: "Stem girdling; plant collapse midseason.",
    controls: [
      "Wrap stem bases with foil or use row cover until flowers open.",
      "Plant a second succession of zucchini later in the season.",
      "If you catch frass early, slit the stem, remove the larva, and hill moist soil over the wound.",
    ],
    products: [
      {
        name: "Bt or spinosad (prevention sprays on stems)",
        when: "When adult moths are flying — timing matters more than product",
        lookFor: "Labeled for vine borer on squash; coat stem bases; follow local extension flight timing",
      },
    ],
    image: img(
      "squash-vine-borer",
      "Squash vine borer moth",
      "Mary Foley Benson",
      "Public domain",
      "https://commons.wikimedia.org/wiki/File:Melittia_cucurbitae.jpg",
    ),
  },
  {
    slug: "cucumber-beetle",
    name: "Cucumber beetle",
    alsoCalled: "Striped or spotted cucumber beetle",
    summary: "Yellow beetles that chew seedlings and can spread bacterial wilt.",
    crops: [
      "Cucumber",
      "Melon",
      "Squash",
      "Pumpkin",
    ],
    identify: [
      "Yellow-green beetles about 1/4 inch long",
      "Black stripes or spots depending on species",
      "Often on flowers and young leaves",
    ],
    damage: "Chewed seedlings; wilt from bacterial wilt transmitted by beetles.",
    controls: [
      "Use row cover until plants flower, then remove for bees.",
      "Transplant sturdy starts instead of tiny seedlings when pressure is high.",
      "Clean up cucurbit debris; beetles overwinter nearby.",
    ],
    products: [
      {
        name: "Kaolin clay (particle film)",
        when: "Early season protection on foliage",
        lookFor: "Crop protectant labeled for vegetables; reapply after rain",
      },
      {
        name: "Yellow sticky traps (monitoring)",
        when: "To detect early flights — not a full control",
        lookFor: "Place near plants, not as the only method",
      },
    ],
    image: img(
      "cucumber-beetle",
      "Striped cucumber beetle",
      "Jacy Lucier",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Acalymma_vittatum.jpg",
    ),
  },
  {
    slug: "flea-beetle",
    name: "Flea beetle",
    summary: "Tiny jumping beetles that shotgun-hole eggplant, greens, and brassica seedlings.",
    crops: [
      "Eggplant",
      "Radish",
      "Arugula",
      "Broccoli",
      "Potato",
    ],
    identify: [
      "Pinhead-sized dark beetles that jump when disturbed",
      "Many small round holes in leaves (shotgun damage)",
      "Worst on seedlings and first true leaves",
    ],
    damage: "Stunted seedlings; heavy damage can kill young plants.",
    controls: [
      "Floating row cover from day of transplant or sowing.",
      "Keep beds moist and growing fast — stressed seedlings suffer more.",
      "Yellow sticky cards for monitoring only.",
    ],
    products: [
      {
        name: "Spinosad or pyrethrin (labeled)",
        when: "Severe seedling damage when covers are not possible",
        lookFor: "Vegetable label; evening spray; do not treat blooming plants bees are visiting",
      },
    ],
    image: img(
      "flea-beetle",
      "Tobacco flea beetle on a leaf",
      "Natasha Wright / Bugwood.org",
      "CC BY 3.0 us",
      "https://commons.wikimedia.org/wiki/File:Tobacco_flea_beetle_-_Epitrix_hirtipennis_UGA5205021.jpg",
    ),
  },
  {
    slug: "cutworm",
    name: "Cutworm",
    summary: "Soil-surface caterpillars that clip seedlings off at night.",
    crops: [
      "Tomato",
      "Pepper",
      "Bean",
      "Corn",
      "Brassicas",
    ],
    identify: [
      "Seedlings cut cleanly at soil level overnight",
      "Gray-brown caterpillars curled under soil or mulch by day",
      "Damage in the first weeks after transplant",
    ],
    damage: "Lost transplants; one worm can kill several plants in a row.",
    controls: [
      "Cardboard or plastic collars around stems, pushed an inch into the soil.",
      "Plant slightly larger transplants; delay mulch until plants are established if cutworms are active.",
      "Hand-hunt in the soil at the base of wilted seedlings at dusk.",
    ],
    products: [
      {
        name: "Bt (kurstaki) soil drench / bait (labeled uses)",
        when: "Known cutworm history in the bed",
        lookFor: "Product labeled for cutworms on vegetables; follow soil-application directions",
      },
    ],
    image: img(
      "cutworm",
      "Cutworm larva",
      "W.M. Hantsbarger, Bugwood.org",
      "CC BY 3.0 us",
      "https://commons.wikimedia.org/wiki/File:Agrotis_ipsilon_larva.jpg",
    ),
  },
  {
    slug: "whitefly",
    name: "Whitefly",
    summary: "Tiny white flying insects that cloud up when you shake foliage.",
    crops: [
      "Tomato",
      "Pepper",
      "Squash",
      "Greens",
    ],
    identify: [
      "Clouds of white insects when leaves are disturbed",
      "Sticky honeydew on leaves",
      "Nymphs look like flat scales on leaf undersides",
    ],
    damage: "Yellowing, weakened plants, sooty mold; virus risk in some crops.",
    controls: [
      "Yellow sticky traps for monitoring and some adult catch.",
      "Remove heavily infested lower leaves.",
      "Avoid broad insecticides that wipe out Encarsia and other parasitoids.",
    ],
    products: [
      {
        name: "Insecticidal soap or horticultural oil",
        when: "Visible nymphs on undersides",
        lookFor: "Must contact insects; repeat applications per label",
      },
    ],
    image: img(
      "whitefly",
      "Silverleaf whitefly on a leaf",
      "USDA",
      "Public domain",
      "https://commons.wikimedia.org/wiki/File:Silverleaf_whitefly.jpg",
    ),
  },
  {
    slug: "spider-mite",
    name: "Spider mites",
    summary: "Tiny mites that stipple leaves and spin fine webbing in hot, dry weather.",
    crops: [
      "Tomato",
      "Bean",
      "Cucumber",
      "Eggplant",
    ],
    identify: [
      "Fine stippling on upper leaf surfaces",
      "Fine webbing on undersides in heavy infestations",
      "Hard to see without a hand lens — look for moving specks",
    ],
    damage: "Bronzed leaves, drop, and reduced yield in heat waves.",
    controls: [
      "Hose undersides of leaves; mites hate moisture.",
      "Reduce dust and drought stress; mulch helps.",
      "Avoid pyrethroid sprays that kill mite predators and worsen outbreaks.",
    ],
    products: [
      {
        name: "Insecticidal soap or horticultural oil",
        when: "Confirmed mites and webbing starting",
        lookFor: "Labeled for spider mites; excellent coverage of undersides required",
      },
    ],
    image: img(
      "spider-mite",
      "Two-spotted spider mites on a leaf",
      "Aleksey Gnilenkov",
      "CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:Red_spider_mite_(Tetranychus_urticae).jpg",
    ),
  },
  {
    slug: "slug",
    name: "Slugs & snails",
    summary: "Night feeders that rasp holes in seedlings and leave slime trails.",
    crops: [
      "Lettuce",
      "Hostas (nearby)",
      "Seedlings",
      "Strawberry",
    ],
    identify: [
      "Irregular holes with smooth edges",
      "Shiny slime trails on soil or leaves",
      "Active on damp nights and cloudy days",
    ],
    damage: "Destroyed seedlings; chewed greens and ripe strawberries.",
    controls: [
      "Hand-pick at night with a flashlight.",
      "Beer traps or board traps — empty daily.",
      "Reduce daytime hiding spots (boards, dense weeds) near beds.",
      "Water in the morning so surfaces dry by night.",
    ],
    products: [
      {
        name: "Iron phosphate slug bait",
        when: "Persistent damage after hand-picking",
        lookFor: "Iron phosphate (not metaldehyde near pets/wildlife if you can avoid it); scatter thinly per label",
      },
    ],
    image: img(
      "slug",
      "Gray field slug on a surface",
      "Holger Krisp",
      "CC BY 3.0",
      "https://commons.wikimedia.org/wiki/File:Genetzte_Ackerschnecke_Deroceras_reticulatum.jpg",
    ),
  },
  {
    slug: "japanese-beetle",
    name: "Japanese beetle",
    summary: "Metallic green beetles that skeletonize leaves in midsummer.",
    crops: [
      "Bean",
      "Basil",
      "Grape",
      "Raspberry",
      "Rose (nearby)",
    ],
    identify: [
      "Metallic green body with copper wing covers",
      "White tufts along the abdomen edge",
      "Clusters feeding on the upper leaf surface",
    ],
    damage: "Lace-like skeletonized leaves; reduced vigor.",
    controls: [
      "Hand-pick into soapy water in early morning when beetles are sluggish.",
      "Avoid Japanese beetle traps near the vegetable garden — they attract more beetles.",
      "Row cover on high-value beans during peak flight if needed.",
    ],
    products: [
      {
        name: "Neem or pyrethrin (labeled)",
        when: "Heavy feeding on edibles you cannot cover",
        lookFor: "Food-crop label; treat evenings; repeat only as directed",
      },
    ],
    image: img(
      "japanese-beetle",
      "Japanese beetle on a flower",
      "Kmtnewsman0",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Japanese_Beetle_(Popillia_japonica)_on_a_lantana.jpg",
    ),
  },
  {
    slug: "spotted-lanternfly",
    name: "Spotted lanternfly",
    alsoCalled: "Lycorma delicatula",
    summary: "Invasive planthopper — early nymphs are black with white spots; later nymphs turn bright red with white and black markings.",
    crops: [
      "Grape",
      "Hop",
      "Fruit trees",
      "Tree of heaven (host)",
    ],
    identify: [
      "4th-instar nymphs: bright red with white spots and black patches (matches many backyard photos)",
      "Younger nymphs: black with white spots only",
      "Adults: gray forewings with black spots; hind wings flash red in flight",
      "Egg masses look like smears of gray mud on trunks, stones, and outdoor gear",
    ],
    damage: "Heavy sap feeding weakens grapes and fruit trees; sticky honeydew and sooty mold on leaves and fruit.",
    controls: [
      "Crush nymphs and adults by hand (or into soapy water) when you see them.",
      "Scrape egg masses into a bag of rubbing alcohol or hand sanitizer from fall through spring.",
      "Remove or treat tree of heaven (Ailanthus) nearby — a preferred host that fuels outbreaks.",
      "Check cars, pots, and firewood before moving items out of infested areas.",
      "Report large finds to your state agriculture department if you are outside the known range.",
    ],
    products: [
      {
        name: "Insecticidal soap or horticultural oil (nymphs)",
        when: "Active nymphs on grapes or ornamentals you can spray thoroughly",
        lookFor: "Labeled for lanternflies or soft-bodied insects on that crop; coat the insect — contact kill only",
      },
      {
        name: "Sticky tree bands (use with caution)",
        when: "Nymphs climbing trunks of valued trees",
        lookFor: "Products made for lanternfly trapping; cover or use wildlife guards — bare sticky bands can catch birds and beneficials",
      },
    ],
    image: img(
      "spotted-lanternfly",
      "Spotted lanternfly nymphs — red fourth instar and black earlier instar on bark",
      "USDA",
      "Public domain",
      "https://commons.wikimedia.org/wiki/File:Spotted_Lanternfly_(20180716-ARS-SRA-d4016-05).jpg",
    ),
  },
  {
    slug: "stink-bug",
    name: "Stink bug",
    alsoCalled: "Brown marmorated stink bug and relatives",
    summary: "Shield-shaped bugs that pierce fruit and leave cloudy spots or catfacing.",
    crops: [
      "Tomato",
      "Pepper",
      "Bean",
      "Corn",
    ],
    identify: [
      "Shield-shaped bugs in brown, green, or mottled colors",
      "Piercing damage on fruit — white spongy spots under the skin",
      "Strong odor when crushed",
    ],
    damage: "Catfacing and cloudy spots that ruin market quality; yield loss.",
    controls: [
      "Hand-pick into soapy water; check under leaves early morning.",
      "Remove weedy borders that host early generations.",
      "Harvest ripe fruit promptly so bugs move on.",
    ],
    products: [
      {
        name: "Kaolin clay or labeled contact insecticides",
        when: "Severe fruit scarring year after year",
        lookFor: "Products labeled for stink bugs on the crop; soap alone rarely controls adults",
      },
    ],
    image: img(
      "stink-bug",
      "Brown marmorated stink bug",
      "Cvetaa...u",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Halyomorpha_halys_1.jpg",
    ),
  },
  {
    slug: "leafminer",
    name: "Leafminers",
    summary: "Larvae that tunnel pale trails inside leaves of greens and beets.",
    crops: [
      "Spinach",
      "Chard",
      "Beet",
      "Lettuce",
    ],
    identify: [
      "Winding pale mines inside the leaf blade",
      "Creamy maggots inside the leaf when you peel the mine open",
      "Damage worst on outer leaves of greens",
    ],
    damage: "Ugly leaves; heavy mining reduces photosynthesis on seedlings.",
    controls: [
      "Remove and trash mined leaves early.",
      "Floating row cover on spring spinach and chard.",
      "Keep beds weed-free; some weeds host miners.",
    ],
    products: [
      {
        name: "Spinosad (labeled for leafminers)",
        when: "Repeated mining on baby greens",
        lookFor: "Must be labeled for leafminers on leafy vegetables; coverage and timing matter",
      },
    ],
    image: img(
      "leafminer",
      "Spinach leafminer larvae on a damaged leaf",
      "Bugwood.org",
      "CC BY 3.0 us",
      "https://commons.wikimedia.org/wiki/File:Spinach_leafminer_(Larvae).jpg",
    ),
  },
  {
    slug: "colorado-potato-beetle",
    name: "Colorado potato beetle",
    summary: "Yellow-and-black striped beetles and red larvae that defoliate potatoes and eggplant.",
    crops: [
      "Potato",
      "Eggplant",
      "Tomato (less often)",
    ],
    identify: [
      "Adults with bold yellow and black stripes",
      "Humpbacked orange-red larvae",
      "Orange egg clusters under leaves",
    ],
    damage: "Rapid defoliation of potato and eggplant.",
    controls: [
      "Hand-pick adults, larvae, and crush eggs twice a week early on.",
      "Use floating row cover on young potatoes until you need to hill.",
      "Rotate nightshades; beetles overwinter in soil nearby.",
    ],
    products: [
      {
        name: "Spinosad or Bt tenebrionis (where labeled)",
        when: "Larvae present and hand-picking cannot keep up",
        lookFor: "Product specifically listing Colorado potato beetle on potatoes/eggplant",
      },
    ],
    image: img(
      "colorado-potato-beetle",
      "Colorado potato beetle on a leaf",
      "Adámozphoto",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Imago_of_Colorado_potato_beetle_on_leaf.jpg",
    ),
  },
  {
    slug: "mexican-bean-beetle",
    name: "Mexican bean beetle",
    summary: "Copper-colored lady-beetle relative that skeletonizes bean leaves.",
    crops: [
      "Bush beans",
      "Pole beans",
      "Lima beans",
    ],
    identify: [
      "Copper-orange adults with 16 black spots",
      "Yellow fuzzy larvae on leaf undersides",
      "Leaves skeletonized between veins",
    ],
    damage: "Defoliation and reduced pod set.",
    controls: [
      "Hand-pick adults and larvae; crush yellow egg masses.",
      "Plant a short succession so peak damage does not hit every planting.",
      "Avoid broad insecticides that kill Pediobius wasps that parasitize larvae.",
    ],
    products: [
      {
        name: "Insecticidal soap or neem (larvae)",
        when: "Young larvae on undersides",
        lookFor: "Labeled for Mexican bean beetle or leaf beetles on beans; hit undersides",
      },
    ],
    image: img(
      "mexican-bean-beetle",
      "Mexican bean beetle adult",
      "Stephen Ausmus",
      "Public domain",
      "https://commons.wikimedia.org/wiki/File:Epilachna_varivestis.jpg",
    ),
  },
  {
    slug: "bean-leaf-beetle",
    name: "Bean leaf beetle",
    summary: "Small yellow-to-red beetles that chew round holes in bean leaves and pods.",
    crops: [
      "Bush beans",
      "Pole beans",
      "Soybean (nearby)",
    ],
    identify: [
      "Yellow, orange, or red beetles with black spots and a black triangle behind the head",
      "Round holes in leaves from emergence onward",
      "Scarred pods later in the season",
    ],
    damage: "Seedling defoliation and pod scarring.",
    controls: [
      "Row cover until flowering if seedlings are hit hard.",
      "Plant when soil is warm so beans outgrow early feeding.",
      "Clean up bean debris after harvest.",
    ],
    products: [
      {
        name: "Spinosad or pyrethrin (labeled)",
        when: "Severe seedling defoliation",
        lookFor: "Bean leaf beetle or leaf beetles listed on beans; evening applications",
      },
    ],
    image: img(
      "bean-leaf-beetle",
      "Bean leaf beetle on a leaf",
      "ALauriston",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Bean_leaf_beetle_(Cerotoma_trifurcata)_on_a_leaf.jpg",
    ),
  },
  {
    slug: "corn-earworm",
    name: "Corn earworm / tomato fruitworm",
    alsoCalled: "Helicoverpa zea",
    summary: "Caterpillars that bore into corn ears and tomato fruit.",
    crops: [
      "Sweet corn",
      "Tomato",
      "Pepper",
    ],
    identify: [
      "Variable green to brown caterpillars in ear tips or fruit",
      "Frass at the silk end of corn ears",
      "Holes in green tomatoes",
    ],
    damage: "Wormy ear tips; tunneled tomatoes.",
    controls: [
      "For corn, apply a drop of mineral oil to silks just after pollination (home-garden method).",
      "Harvest corn promptly; destroy infested tips.",
      "On tomatoes, hand-pick and remove damaged fruit.",
    ],
    products: [
      {
        name: "Bt or spinosad timed to egg hatch",
        when: "When moth flights are active (extension alerts help)",
        lookFor: "Labeled for corn earworm / fruitworm on the crop; silk sprays on corn need careful timing",
      },
    ],
    image: img(
      "corn-earworm",
      "Corn earworm caterpillar",
      "cyanocorax",
      "CC BY-SA 2.0",
      "https://commons.wikimedia.org/wiki/File:Helicoverpa_zea_larva.jpg",
    ),
  },
  {
    slug: "european-corn-borer",
    name: "European corn borer",
    summary: "Caterpillars that bore into corn stalks and ears; adults are tan moths.",
    crops: [
      "Sweet corn",
      "Pepper",
      "Bean",
    ],
    identify: [
      "Tan moth with wavy wing markings (adult stage)",
      "Larvae tunnel in stalks; broken tassels or entry holes",
      "Frass and tunnels in ears later in the season",
    ],
    damage: "Stalk breakage, ear damage, and secondary rot.",
    controls: [
      "Plant resistant or early sweet-corn varieties when available.",
      "Shred and compost stalks after harvest — borers overwinter in debris.",
      "Scout for egg masses on leaf undersides in early summer.",
    ],
    products: [
      {
        name: "Bt timed to egg hatch",
        when: "When extension or pheromone traps show flights",
        lookFor: "Labeled for European corn borer on corn; timing beats product choice",
      },
    ],
    image: img(
      "european-corn-borer",
      "European corn borer adult moth",
      "entomart",
      "Attribution",
      "https://commons.wikimedia.org/wiki/File:Ostrinia_nubilalis01.jpg",
    ),
  },
  {
    slug: "fall-armyworm",
    name: "Fall armyworm",
    summary: "Striped caterpillars that chew leaves and bore into corn whorls and ears.",
    crops: [
      "Sweet corn",
      "Tomato",
      "Greens",
      "Beans",
    ],
    identify: [
      "Caterpillar with a distinct inverted Y on the head",
      "Longitudinal stripes; dark and light forms",
      "Frass in corn whorls; ragged leaf feeding",
    ],
    damage: "Rapid defoliation and ear damage in late summer.",
    controls: [
      "Hand-pick on small plantings; check whorls after storms.",
      "Keep weeds down; armyworms often move in from grassy edges.",
      "Harvest sweet corn promptly.",
    ],
    products: [
      {
        name: "Bt or spinosad (labeled)",
        when: "Young larvae on foliage",
        lookFor: "Fall armyworm or armyworms listed; spray into corn whorls when needed",
      },
    ],
    image: img(
      "fall-armyworm",
      "Fall armyworm caterpillar",
      "Wee Hong",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Spodoptera_frugiperda_(200211-0809).jpg",
    ),
  },
  {
    slug: "thrips",
    name: "Thrips",
    summary: "Tiny rasping insects that leave silvery streaks and black flecks on leaves and flowers.",
    crops: [
      "Onion",
      "Tomato",
      "Pepper",
      "Bean",
    ],
    identify: [
      "Silvery stippling or streaks on leaves",
      "Tiny black fecal dots",
      "Insects barely visible without a lens; they move quickly",
    ],
    damage: "Scarred fruit, distorted growth, and virus transmission in some crops.",
    controls: [
      "Hose plants; remove heavily scarred leaves.",
      "Control weeds that host thrips between crops.",
      "Blue or yellow sticky cards for monitoring.",
    ],
    products: [
      {
        name: "Spinosad or insecticidal soap (labeled)",
        when: "Persistent scarring on onions or fruit",
        lookFor: "Thrips listed on the label for that crop; multiple applications often needed",
      },
    ],
    image: img(
      "thrips",
      "Onion thrips under magnification",
      "Alton N. Sparks, Jr., University of Georgia, Bugwood.org",
      "CC BY 3.0",
      "https://commons.wikimedia.org/wiki/File:Thrips_tabaci.jpg",
    ),
  },
  {
    slug: "tarnished-plant-bug",
    name: "Tarnished plant bug",
    alsoCalled: "Lygus bug",
    summary: "Small mottled bugs that pierce buds and fruit, causing tip burn and catfacing.",
    crops: [
      "Strawberry",
      "Bean",
      "Pepper",
      "Lettuce",
      "Tomato",
    ],
    identify: [
      "Oval bugs about 1/4 inch with bronze/brown mottling and a yellow triangle on the back",
      "Black-tipped yellow nymphs",
      "Catfaced fruit and dead growing tips",
    ],
    damage: "Deformed strawberries, beans, and peppers; tip dieback on greens.",
    controls: [
      "Mow weedy borders before bloom so bugs do not migrate into crops.",
      "Row cover on strawberries until bloom if pressure is high.",
      "Hand-pick on small plantings early morning.",
    ],
    products: [
      {
        name: "Insecticidal soap or labeled pyrethrin",
        when: "Nymphs active on buds/fruit",
        lookFor: "Tarnished plant bug or lygus listed on the crop; adults are tougher",
      },
    ],
    image: img(
      "tarnished-plant-bug",
      "Tarnished plant bug on a leaf",
      "Judy Gallagher",
      "CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:Tarnished_Plant_Bug_-_Lygus_lineolaris,_near_Leesville,_Louisiana.jpg",
    ),
  },
  {
    slug: "four-lined-plant-bug",
    name: "Four-lined plant bug",
    summary: "Yellow-green bugs with four black stripes that leave round sunken spots on leaves.",
    crops: [
      "Mint",
      "Basil",
      "Cucumber",
      "Currant",
      "Many herbs",
    ],
    identify: [
      "Bright nymphs; adults yellow-green with four black stripes",
      "Round, sunken, dark spots that look like fungal disease",
      "Damage appears suddenly in late spring",
    ],
    damage: "Cosmetic leaf spotting; heavy feeding on herbs can set plants back.",
    controls: [
      "Hand-pick early; damage often tapers by midsummer.",
      "Cut back heavily damaged mint and basil to regrow clean leaves.",
      "Avoid spraying for cosmetic spots alone — plants usually recover.",
    ],
    products: [
      {
        name: "Insecticidal soap",
        when: "Heavy feeding on young herbs",
        lookFor: "Labeled for plant bugs on herbs/vegetables; hit nymphs early",
      },
    ],
    image: img(
      "four-lined-plant-bug",
      "Four-lined plant bug adult",
      "WanderingMogwai",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Four-lined_Plant_Bug_(Poecilocapsus_lineatus).jpg",
    ),
  },
  {
    slug: "potato-leafhopper",
    name: "Potato leafhopper",
    summary: "Tiny wedge-shaped green hoppers that cause hopperburn on beans and potatoes.",
    crops: [
      "Potato",
      "Bean",
      "Eggplant",
      "Raspberry",
    ],
    identify: [
      "Pale green, wedge-shaped insects that hop sideways when disturbed",
      "V-shaped yellowing and tip burn on leaves (hopperburn)",
      "Damage often mistaken for drought or disease",
    ],
    damage: "Hopperburn, stunting, and yield loss — especially on potatoes and beans.",
    controls: [
      "Row cover on early beans and potatoes until plants are sturdy.",
      "Avoid planting next to alfalfa that is cut midseason (hoppers move out).",
      "Keep plants evenly watered so stress does not amplify symptoms.",
    ],
    products: [
      {
        name: "Insecticidal soap or labeled insecticide",
        when: "Hopperburn starting and hoppers present",
        lookFor: "Potato leafhopper listed on potatoes/beans; soap works best on nymphs",
      },
    ],
    image: img(
      "potato-leafhopper",
      "Potato leafhopper on a leaf",
      "xpda",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Empoasca_fabae_P1400582a.jpg",
    ),
  },
  {
    slug: "earwig",
    name: "Earwig",
    summary: "Nocturnal insects with rear pincers that chew seedlings, flowers, and soft fruit.",
    crops: [
      "Lettuce",
      "Seedlings",
      "Corn silks",
      "Strawberry",
    ],
    identify: [
      "Reddish-brown insects with forceps-like cerci at the rear",
      "Hide under boards, mulch, and pots by day",
      "Ragged chewing on tender growth overnight",
    ],
    damage: "Chewed seedlings and flower petals; sometimes helpful as predators too.",
    controls: [
      "Roll newspaper or use oil traps overnight and empty in the morning.",
      "Reduce dense mulch against seedling stems if damage is severe.",
      "Tolerate low numbers — earwigs also eat aphids and soft insects.",
    ],
    products: [
      {
        name: "Oil/soy-sauce traps (DIY)",
        when: "Seedling damage is concentrated",
        lookFor: "Shallow traps with oil; empty daily — no need for a commercial insecticide in most gardens",
      },
    ],
    image: img(
      "earwig",
      "European earwig",
      "Charles J. Sharp",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Earwig_(Forficula_auricularia)_female.jpg",
    ),
  },
  {
    slug: "grasshopper",
    name: "Grasshoppers",
    summary: "Jumping insects that chew leaves and fruit, especially in hot, dry summers.",
    crops: [
      "Beans",
      "Corn",
      "Greens",
      "Most vegetables",
    ],
    identify: [
      "Large jumping insects with powerful hind legs",
      "Chewed leaf margins and ragged holes",
      "Often move in from grassy field edges",
    ],
    damage: "Defoliation and fruit scarring during outbreaks.",
    controls: [
      "Mow tall grass near beds before peak summer.",
      "Row cover on high-value plantings during outbreaks.",
      "Hand-catch in the cool morning on small gardens.",
    ],
    products: [
      {
        name: "Kaolin clay or labeled bait (where sold)",
        when: "Heavy local outbreaks",
        lookFor: "Products labeled for grasshoppers; baits are more targeted than canopy sprays",
      },
    ],
    image: img(
      "grasshopper",
      "Differential grasshopper",
      "Peterwchen",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Melanoplus_differentialis-female_gravid.jpg",
    ),
  },
  {
    slug: "asparagus-beetle",
    name: "Asparagus beetle",
    summary: "Red, black, and cream beetles that chew asparagus spears and ferns.",
    crops: [
      "Asparagus",
    ],
    identify: [
      "Adults with a red thorax and cream-and-black wing patches",
      "Dark larvae on spears and ferns",
      "Eggs stuck on spears like tiny black dashes",
    ],
    damage: "Scarred spears and defoliated ferns that weaken next year's crop.",
    controls: [
      "Hand-pick adults and larvae in the morning.",
      "Harvest spears frequently so eggs and beetles have less time on the crop.",
      "Leave a few early spears as a trap crop, then destroy them.",
    ],
    products: [
      {
        name: "Insecticidal soap or spinosad (labeled)",
        when: "Heavy fern feeding after harvest ends",
        lookFor: "Asparagus beetle listed; protect pollinators on flowering ferns",
      },
    ],
    image: img(
      "asparagus-beetle",
      "Common asparagus beetle on a stem",
      "Keith Edkins",
      "CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Crioceris_asparagi.jpg",
    ),
  },
  {
    slug: "blister-beetle",
    name: "Blister beetle",
    summary: "Soft-winged beetles that chew foliage; body fluids can blister skin.",
    crops: [
      "Tomato",
      "Potato",
      "Bean",
      "Beet",
      "Alfalfa (nearby)",
    ],
    identify: [
      "Elongated soft beetles; striped, black, or gray species",
      "Sudden clusters on foliage",
      "Handle with gloves — crushed beetles can blister skin",
    ],
    damage: "Rapid defoliation in patches; livestock hay contamination is a separate farm issue.",
    controls: [
      "Hand-pick with gloves into soapy water.",
      "Shake beetles onto a sheet early morning.",
      "Do not crush them against bare skin.",
    ],
    products: [
      {
        name: "Labeled contact insecticide (last resort)",
        when: "Large clusters defoliating plants",
        lookFor: "Blister beetles listed on the crop; hand-picking is usually enough in home gardens",
      },
    ],
    image: img(
      "blister-beetle",
      "Striped blister beetle",
      "Judy Gallagher",
      "CC BY 2.0",
      "https://commons.wikimedia.org/wiki/File:Striped_Blister_Beetle_-_Epicauta_vittata,_Horn_Point_Laboratory,_Cambridge,_Maryland,_September_7,_2018_(52979644591).jpg",
    ),
  },
  {
    slug: "mealybug",
    name: "Mealybug",
    summary: "White, cottony sap feeders common on container plants and greenhouse crops.",
    crops: [
      "Container herbs",
      "Citrus",
      "Pepper",
      "Tomato (indoors/greenhouse)",
    ],
    identify: [
      "White cottony masses in leaf crotches and on stems",
      "Sticky honeydew and sooty mold",
      "Slow-moving oval insects under the wax",
    ],
    damage: "Stunting, leaf drop, and sooty mold — especially in pots.",
    controls: [
      "Dab small colonies with a cotton swab dipped in rubbing alcohol.",
      "Hose plants; isolate infested containers.",
      "Check new plants before bringing them home.",
    ],
    products: [
      {
        name: "Insecticidal soap or horticultural oil",
        when: "Colonies too large to swab",
        lookFor: "Labeled for mealybugs on the crop; repeat treatments for hidden nymphs",
      },
    ],
    image: img(
      "mealybug",
      "Citrus mealybugs on a plant",
      "Mikhail Khokhlov",
      "CC BY-SA 4.0",
      "https://commons.wikimedia.org/wiki/File:Planococcus_citri_on_a_plant.jpg",
    ),
  },
  {
    slug: "pillbug",
    name: "Pillbugs & sowbugs",
    alsoCalled: "Roly-polies",
    summary: "Armored crustaceans that usually eat decaying matter but can nibble seedlings in damp beds.",
    crops: [
      "Seedlings",
      "Strawberry",
      "Cucumber (fruit on soil)",
    ],
    identify: [
      "Oval gray armor; pillbugs roll into a ball, sowbugs do not",
      "Active under mulch and boards in damp spots",
      "Shallow chewing on soft fruit touching soil",
    ],
    damage: "Usually minor; seedling stems and strawberries on wet soil are the main risk.",
    controls: [
      "Reduce excess moisture and thick mulch against tender stems.",
      "Elevate ripening strawberries on straw or clips.",
      "Remove boards and debris hiding spots near beds.",
    ],
    products: [
      {
        name: "Iron phosphate bait (labeled for sowbugs where listed)",
        when: "Seedlings repeatedly chewed in damp beds",
        lookFor: "Label listing sowbugs/pillbugs; fixing moisture often matters more",
      },
    ],
    image: img(
      "pillbug",
      "Common pillbug",
      "Franco Folini",
      "CC BY 2.5",
      "https://commons.wikimedia.org/wiki/File:Armadillidium_vulgare_001.jpg",
    ),
  },
  {
    slug: "cabbage-maggot",
    name: "Cabbage maggot",
    alsoCalled: "Cabbage root fly larva",
    summary: "White maggots that tunnel in brassica roots and stem bases.",
    crops: [
      "Cabbage",
      "Broccoli",
      "Radish",
      "Turnip",
      "Kohlrabi",
    ],
    identify: [
      "Wilting plants that do not recover after watering",
      "White legless maggots in roots or the stem base",
      "Tunnels and brown scarring in radishes/turnips",
    ],
    damage: "Seedling death and unusable root crops.",
    controls: [
      "Floating row cover from sowing until harvest for root crops.",
      "Paper or felt collars at the stem base to block egg-laying.",
      "Rotate brassicas; avoid planting into beds with recent damage.",
    ],
    products: [
      {
        name: "Row cover (primary tool)",
        when: "Every spring planting in problem beds",
        lookFor: "Lightweight insect netting sealed at the edges — more reliable than soil drenches for home gardens",
      },
    ],
    image: img(
      "cabbage-maggot",
      "Cabbage maggots in a kohlrabi stem",
      "Schlaghecken Josef",
      "CC BY 4.0",
      "https://commons.wikimedia.org/wiki/File:Kohlrabi_Kohlfliegen-Maden_im_Strunk--Josef_Schlaghecken.jpg",
    ),
  },
  {
    slug: "onion-maggot",
    name: "Onion maggot",
    summary: "Maggots that tunnel in onion, leek, and related bulbs.",
    crops: [
      "Onion",
      "Leek",
      "Garlic",
      "Shallot",
    ],
    identify: [
      "Wilting onion seedlings in patches",
      "Soft, rotting bulbs with white maggots inside",
      "Damage worse in cool, moist springs",
    ],
    damage: "Stand loss and rotting bulbs in storage.",
    controls: [
      "Row cover from sowing until midseason.",
      "Rotate allium beds; do not compost infested bulbs.",
      "Plant in well-drained soil; avoid overwatering seedlings.",
    ],
    products: [
      {
        name: "Row cover / insect netting",
        when: "Any bed with a history of onion maggot",
        lookFor: "Sealed edges; remove only for necessary weeding, then replace",
      },
    ],
    image: img(
      "onion-maggot",
      "Onion maggots on a leek stem",
      "Rasbak",
      "CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Delia_antiqua_maggots_at_Allium_porrum_,_uienvlieg_maden_op_prei.jpg",
    ),
  },
  {
    slug: "carrot-rust-fly",
    name: "Carrot rust fly",
    summary: "Maggots that leave rusty tunnels in carrot, parsnip, and related roots.",
    crops: [
      "Carrot",
      "Parsnip",
      "Celery",
      "Parsley",
    ],
    identify: [
      "Rusty tunnels just under the carrot skin",
      "Wilting seedlings in severe attacks",
      "Adults are small dark flies — hard to spot",
    ],
    damage: "Ugly, unusable roots; secondary rot in storage.",
    controls: [
      "Floating row cover from sowing to harvest.",
      "Delay sowing until after the first spring flight in problem areas (local timing varies).",
      "Harvest promptly; do not leave carrots in the ground late if flies are active.",
    ],
    products: [
      {
        name: "Row cover / insect netting",
        when: "Any carrot bed in a known rust-fly area",
        lookFor: "Fine mesh sealed at soil level — the standard home-garden control",
      },
    ],
    image: img(
      "carrot-rust-fly",
      "Carrot rust fly maggot",
      "Rasbak",
      "CC BY-SA 3.0",
      "https://commons.wikimedia.org/wiki/File:Psila_rosae_maggot,_wortelvlieg_made_(1).jpg",
    ),
  },
  {
    slug: "wireworm",
    name: "Wireworms",
    summary: "Hard, wire-like beetle larvae in soil that bore into roots, tubers, and seeds.",
    crops: [
      "Potato",
      "Carrot",
      "Corn",
      "Seedlings",
    ],
    identify: [
      "Slender, shiny, orange-brown larvae that feel hard like wire",
      "Holes in potato tubers and carrot roots",
      "Worse after sod or weedy ground is turned into a vegetable bed",
    ],
    damage: "Tunneled tubers and seed loss; plants may wilt.",
    controls: [
      "Avoid planting potatoes the first year after converting lawn.",
      "Use potato bait pieces to monitor before planting.",
      "Keep beds cultivated; reduce grassy weeds.",
    ],
    products: [
      {
        name: "Soil monitoring / bait potatoes",
        when: "Before planting into former sod",
        lookFor: "No reliable home-garden drench; prevention and site choice matter most",
      },
    ],
    image: img(
      "wireworm",
      "Click beetle wireworm larvae",
      "ZATRIPPIT",
      "CC0",
      "https://commons.wikimedia.org/wiki/File:Click_beetle_larvae.jpg",
    ),
  },
  {
    slug: "root-knot-nematode",
    name: "Root-knot nematodes",
    summary: "Microscopic worms that form galls on roots and stunt plants in warm soils.",
    crops: [
      "Tomato",
      "Pepper",
      "Cucumber",
      "Carrot",
      "Okra",
    ],
    identify: [
      "Swollen root galls (knots) on pulled plants",
      "Wilting in midday despite moist soil",
      "Patchy stunting in sandy, warm beds",
    ],
    damage: "Chronic yield loss and drought-like symptoms.",
    controls: [
      "Pull and trash heavily galled roots — do not compost them.",
      "Rotate with non-host cover crops; solarize empty beds in peak summer where practical.",
      "Choose nematode-resistant tomato rootstocks or varieties when available.",
    ],
    products: [
      {
        name: "Resistant varieties / rootstocks",
        when: "Confirmed galls in warm-climate beds",
        lookFor: "Seed catalogs listing root-knot resistance (often coded N or Mi); chemical nematicides are not a casual home-garden tool",
      },
    ],
    image: img(
      "root-knot-nematode",
      "Tomato roots with root-knot nematode galls",
      "Plant pests and diseases",
      "CC0",
      "https://commons.wikimedia.org/wiki/File:Tomato_(Solanum_lycopersicum)-_Root_knot_-_27443861719.jpg",
    ),
  },
];

export function getPest(slug: string): Pest | undefined {
  return pests.find((item) => item.slug === slug);
}

export function getPests(): Pest[] {
  return pests;
}
