import { getCropCreditRecord, isReusableImageCredit } from "@/data/imageCreditRecords";

export type CropImage = {
  src: string;
  alt: string;
  credit: string;
  license: string;
  commonsUrl: string;
};

export const cropImages: Record<string, CropImage> = {
  "tomatoes": {
    src: "/images/crops/tomatoes.jpg",
    alt: "Ripe red tomatoes",
    credit: "Fir0002",
    license: "GFDL 1.2",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Bright_red_tomato_and_cross_section02.jpg",
  },
  "peppers": {
    src: "/images/crops/peppers.jpg",
    alt: "Red bell peppers",
    credit: "Fir0002",
    license: "GFDL 1.2",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Red_capsicum_and_cross_section.jpg",
  },
  "cucumbers": {
    src: "/images/crops/cucumbers-generated.webp",
    alt: "Green cucumber growing on the vine beside a yellow blossom",
    credit: "OpenAI image generation for HarvestBench",
    license: "AI-generated site asset",
    commonsUrl: "",
  },
  "lettuce": {
    src: "/images/crops/lettuce.jpg",
    alt: "Butterhead lettuce growing in a garden bed",
    credit: "Dwight Sipler",
    license: "CC BY 2.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Lettuce_Mini_Heads_(7331119710).jpg",
  },
  "carrots": {
    src: "/images/crops/carrots.jpg",
    alt: "Orange carrots at market",
    credit: "domdomegg",
    license: "CC BY 4.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Carrots_at_Ljubljana_Central_Market.JPG",
  },
  "radishes": {
    src: "/images/crops/radishes.jpg",
    alt: "Red radishes with greens",
    credit: "Unknown",
    license: "Public domain",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Raphanus_sativus.jpg",
  },
  "strawberries": {
    src: "/images/crops/strawberries.jpg",
    alt: "Ripe strawberries on the plant",
    credit: "Brian Prechtel",
    license: "Public domain",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Strawberries.jpg",
  },
  "zucchini": {
    src: "/images/crops/zucchini.jpg",
    alt: "Green zucchini squash",
    credit: "Diego Delso",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Calabac%C3%ADn,_M%C3%BAnich,_Alemania,_2013-03-30,_DD_01.JPG",
  },
  "eggplant": {
    src: "/images/crops/eggplant.jpg",
    alt: "Purple eggplant fruit",
    credit: "Horst Frank",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Aubergine.jpg",
  },
  "beans": {
    src: "/images/crops/beans.jpg",
    alt: "Fresh green beans",
    credit: "Lin dafni",
    license: "CC BY-SA 4.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Green_beans.jpg",
  },
  "peas": {
    src: "/images/crops/peas.jpg",
    alt: "Garden peas in pods",
    credit: "Bill Ebbesen",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Peas_in_pods_-_Studio.jpg",
  },
  "okra": {
    src: "/images/crops/okra.jpg",
    alt: "Green okra pods",
    credit: "Cheikh cherif",
    license: "CC BY-SA 4.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Gombo-2025.jpg",
  },
  "winter-squash": {
    src: "/images/crops/winter-squash.jpg",
    alt: "Butternut squash",
    credit: "Tiia Monto",
    license: "CC BY-SA 4.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Butternut_squash.jpg",
  },
  "corn": {
    src: "/images/crops/corn.jpg",
    alt: "Ears of corn",
    credit: "Asbestos",
    license: "CC BY-SA 2.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Corncobs.jpg",
  },
  "kale": {
    src: "/images/crops/kale.jpg",
    alt: "Curly kale leaves",
    credit: "Rasbak",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Boerenkool.jpg",
  },
  "spinach": {
    src: "/images/crops/spinach.jpg",
    alt: "Fresh spinach leaves",
    credit: "Nillerdk",
    license: "CC BY 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Spinach_leaves.jpg",
  },
  "swiss-chard": {
    src: "/images/crops/swiss-chard.jpg",
    alt: "Rainbow Swiss chard",
    credit: "Ruth Hartnup",
    license: "CC BY-SA 4.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Rainbow_chard_for_sale_at_the_Campbell_farmers_market.jpg",
  },
  "broccoli": {
    src: "/images/crops/broccoli.jpg",
    alt: "Broccoli head",
    credit: "Fir0002",
    license: "GFDL 1.2",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Broccoli_and_cross_section_edit.jpg",
  },
  "cabbage": {
    src: "/images/crops/cabbage.jpg",
    alt: "Green cabbage head",
    credit: "Bill Tarpenning",
    license: "Public domain",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Cabbage.jpg",
  },
  "cauliflower": {
    src: "/images/crops/cauliflower.jpg",
    alt: "White cauliflower head",
    credit: "User Anthony DiPierro on en.wikipedia",
    license: "Public domain",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Cauliflower.JPG",
  },
  "arugula": {
    src: "/images/crops/arugula.jpg",
    alt: "Arugula leaves",
    credit: "Whut",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Eruca_sativa.jpg",
  },
  "collard-greens": {
    src: "/images/crops/collard-greens.jpg",
    alt: "Collard green leaves",
    credit: "Kevin L. Bardon",
    license: "CC BY-SA 2.5",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Collard_greens.jpg",
  },
  "beets": {
    src: "/images/crops/beets.jpg",
    alt: "Beetroots with greens",
    credit: "Evan-Amos",
    license: "CC0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Beets-Bundle.jpg",
  },
  "onions": {
    src: "/images/crops/onions.jpg",
    alt: "Yellow onion bulbs",
    credit: "Donovan Govan",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Onion.jpg",
  },
  "garlic": {
    src: "/images/crops/garlic.jpg",
    alt: "Garlic bulbs",
    credit: "Donovan Govan",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Garlic.jpg",
  },
  "potatoes": {
    src: "/images/crops/potatoes.jpg",
    alt: "Potato tubers",
    credit: "Scott Bauer / USDA ARS",
    license: "Public domain",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Patates.jpg",
  },
  "sweet-potatoes": {
    src: "/images/crops/sweet-potatoes.jpg",
    alt: "Sweet potatoes",
    credit: "Llez",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Ipomoea_batatas_006.JPG",
  },
  "turnips": {
    src: "/images/crops/turnips.jpg",
    alt: "Turnip roots",
    credit: "Miya",
    license: "CC BY-SA 4.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Turnip-ja202211-1.jpg",
  },
  "basil": {
    src: "/images/crops/basil.jpg",
    alt: "Fresh basil leaves",
    credit: "Castielli",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Basil-Basilico-Ocimum_basilicum-albahaca.jpg",
  },
  "cilantro": {
    src: "/images/crops/cilantro.jpg",
    alt: "Fresh cilantro leaves",
    credit: "HaJunkiyada",
    license: "CC BY-SA 4.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Cilantro_from_San_Francisco_Farmers_Market.jpg",
  },
  "parsley": {
    src: "/images/crops/parsley.jpg",
    alt: "Curly parsley",
    credit: "H. Zell",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Petroselinum_crispum_002.JPG",
  },
  "asparagus": {
    src: "/images/crops/asparagus.jpg",
    alt: "Green asparagus spears",
    credit: "Evan-Amos",
    license: "CC BY-SA 3.0",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Asparagus-Bundle.jpg",
  },
};

export function getCropImage(slug: string): CropImage | undefined {
  const image = cropImages[slug];
  if (!image) return undefined;
  const credit = getCropCreditRecord(slug);
  if (!credit) return undefined;
  const fileName = image.src.replace("/images/crops/", "");
  if (credit.file !== fileName) return undefined;
  if (!isReusableImageCredit(credit)) return undefined;
  return image;
}
