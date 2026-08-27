import {
  cubicFeetToDryQuarts,
  cubicFeetToLiters,
  cubicFeetToYards,
  gallonsToCubicFeet,
  squareFeetToMeters,
  toFeet,
  toInches,
  type LengthUnit,
} from "@/lib/units";

export type CalcError = { field?: string; message: string };

export function isPositive(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

export function parseNumber(raw: string): number | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const value = Number(trimmed);
  if (!Number.isFinite(value)) return null;
  return value;
}

const MAX_DIMENSION_FT = 500;
const MAX_BEDS = 200;

function dimensionError(
  label: string,
  value: number,
  unit: LengthUnit,
): string | null {
  if (!isPositive(value)) return `Enter a ${label} greater than 0.`;
  const feet = toFeet(value, unit);
  if (feet > MAX_DIMENSION_FT) {
    return `${label} is too large. Use a value under ${MAX_DIMENSION_FT} feet.`;
  }
  return null;
}

export type BoxVolumeInput = {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  depth: number;
  depthUnit: LengthUnit;
};

export type BoxVolumeResult = {
  cubicFeet: number;
  cubicYards: number;
  liters: number;
  lengthFt: number;
  widthFt: number;
  depthFt: number;
};

export function validateBoxVolume(input: BoxVolumeInput): CalcError[] {
  const errors: CalcError[] = [];
  const length = dimensionError("length", input.length, input.lengthUnit);
  const width = dimensionError("width", input.width, input.widthUnit);
  const depth = dimensionError("depth", input.depth, input.depthUnit);
  if (length) errors.push({ field: "length", message: length });
  if (width) errors.push({ field: "width", message: width });
  if (depth) errors.push({ field: "depth", message: depth });
  return errors;
}

export function calculateBoxVolume(input: BoxVolumeInput): BoxVolumeResult {
  const lengthFt = toFeet(input.length, input.lengthUnit);
  const widthFt = toFeet(input.width, input.widthUnit);
  const depthFt = toFeet(input.depth, input.depthUnit);
  const cubicFeet = lengthFt * widthFt * depthFt;
  return {
    cubicFeet,
    cubicYards: cubicFeetToYards(cubicFeet),
    liters: cubicFeetToLiters(cubicFeet),
    lengthFt,
    widthFt,
    depthFt,
  };
}

export type PotShape = "round" | "tapered" | "rectangle";

export type PotSizeMode = "gallon" | "custom";

export type PottingMixInput = {
  sizeMode: PotSizeMode;
  gallons: number;
  shape: PotShape;
  diameter: number;
  diameterUnit: LengthUnit;
  bottomDiameter: number;
  bottomDiameterUnit: LengthUnit;
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  height: number;
  heightUnit: LengthUnit;
  headspaceInches: number;
  pots: number;
  bagSizeCuFt: number;
};

export type PottingMixResult = {
  perPotCubicFeet: number;
  cubicFeet: number;
  cubicYards: number;
  dryQuarts: number;
  liters: number;
  bags: number;
  bagSizeCuFt: number;
  fillHeightFt: number;
  pots: number;
};

const MAX_POTS = 50;

export function validatePottingMix(input: PottingMixInput): CalcError[] {
  const errors: CalcError[] = [];

  if (input.sizeMode === "gallon") {
    if (!isPositive(input.gallons)) {
      errors.push({ field: "gallons", message: "Enter a pot size greater than 0 gallons." });
    } else if (input.gallons > 100) {
      errors.push({
        field: "gallons",
        message: "That pot is unusually large. Check the label or measure the pot instead.",
      });
    }
  } else {
    const height = dimensionError("height", input.height, input.heightUnit);
    if (height) errors.push({ field: "height", message: height });

    if (input.shape === "rectangle") {
      const length = dimensionError("length", input.length, input.lengthUnit);
      const width = dimensionError("width", input.width, input.widthUnit);
      if (length) errors.push({ field: "length", message: length });
      if (width) errors.push({ field: "width", message: width });
    } else {
      const diameter = dimensionError("diameter", input.diameter, input.diameterUnit);
      if (diameter) errors.push({ field: "diameter", message: diameter });
      if (input.shape === "tapered") {
        const bottom = dimensionError(
          "bottom diameter",
          input.bottomDiameter,
          input.bottomDiameterUnit,
        );
        if (bottom) errors.push({ field: "bottomDiameter", message: bottom });
      }
    }

    const heightFt = toFeet(input.height, input.heightUnit);
    const headspaceFt = input.headspaceInches / 12;
    if (input.headspaceInches < 0) {
      errors.push({ field: "headspace", message: "Headspace cannot be negative." });
    } else if (isPositive(input.height) && heightFt - headspaceFt <= 0) {
      errors.push({
        field: "height",
        message: "Pot height must be greater than the empty rim you leave.",
      });
    }
  }

  if (!isPositive(input.pots) || !Number.isInteger(input.pots)) {
    errors.push({ field: "pots", message: "Enter a whole number of pots (1 or more)." });
  } else if (input.pots > MAX_POTS) {
    errors.push({ field: "pots", message: `Number of pots must be ${MAX_POTS} or fewer.` });
  }
  if (!isPositive(input.bagSizeCuFt)) {
    errors.push({ field: "bagSize", message: "Choose a bag size." });
  }
  return errors;
}

export function calculatePottingMix(input: PottingMixInput): PottingMixResult {
  let perPotCubicFeet = 0;
  let fillHeightFt = 0;

  if (input.sizeMode === "gallon") {
    const full = gallonsToCubicFeet(input.gallons);
    const fillFraction = input.headspaceInches > 0 ? 0.92 : 1;
    perPotCubicFeet = full * fillFraction;
  } else {
    fillHeightFt = Math.max(
      0,
      toFeet(input.height, input.heightUnit) - input.headspaceInches / 12,
    );
    if (input.shape === "round") {
      const radiusFt = toFeet(input.diameter, input.diameterUnit) / 2;
      perPotCubicFeet = Math.PI * radiusFt * radiusFt * fillHeightFt;
    } else if (input.shape === "tapered") {
      const topRadiusFt = toFeet(input.diameter, input.diameterUnit) / 2;
      const bottomRadiusFt = toFeet(input.bottomDiameter, input.bottomDiameterUnit) / 2;
      perPotCubicFeet =
        ((Math.PI * fillHeightFt) / 3) *
        (topRadiusFt * topRadiusFt +
          topRadiusFt * bottomRadiusFt +
          bottomRadiusFt * bottomRadiusFt);
    } else {
      perPotCubicFeet =
        toFeet(input.length, input.lengthUnit) *
        toFeet(input.width, input.widthUnit) *
        fillHeightFt;
    }
  }
  const cubicFeet = perPotCubicFeet * input.pots;
  return {
    perPotCubicFeet,
    cubicFeet,
    cubicYards: cubicFeetToYards(cubicFeet),
    dryQuarts: cubicFeetToDryQuarts(cubicFeet),
    liters: cubicFeetToLiters(cubicFeet),
    bags: Math.ceil(cubicFeet / input.bagSizeCuFt - 1e-12),
    bagSizeCuFt: input.bagSizeCuFt,
    fillHeightFt,
    pots: input.pots,
  };
}

export type RaisedBedSoilInput = BoxVolumeInput & {
  beds: number;
  bagSize: number;
};

export type RaisedBedSoilResult = BoxVolumeResult & {
  beds: number;
  perBedCubicFeet: number;
  bags: number;
  bagSize: number;
};

export function validateRaisedBedSoil(input: RaisedBedSoilInput): CalcError[] {
  const errors = validateBoxVolume(input);
  if (!isPositive(input.beds) || !Number.isInteger(input.beds)) {
    errors.push({ field: "beds", message: "Enter a whole number of beds (1 or more)." });
  } else if (input.beds > MAX_BEDS) {
    errors.push({ field: "beds", message: `Number of beds must be ${MAX_BEDS} or fewer.` });
  }
  if (!isPositive(input.bagSize)) {
    errors.push({ field: "bagSize", message: "Choose a bag size." });
  }
  return errors;
}

export function calculateRaisedBedSoil(
  input: RaisedBedSoilInput,
): RaisedBedSoilResult {
  const volume = calculateBoxVolume(input);
  const perBedCubicFeet = volume.cubicFeet;
  const cubicFeet = perBedCubicFeet * input.beds;
  return {
    ...volume,
    cubicFeet,
    cubicYards: cubicFeetToYards(cubicFeet),
    liters: cubicFeetToLiters(cubicFeet),
    beds: input.beds,
    perBedCubicFeet,
    bags: Math.ceil(cubicFeet / input.bagSize),
    bagSize: input.bagSize,
  };
}

export type HugelkulturInput = {
  fullCubicFeet: number;
  depthFt: number;
  soilOnTopFt: number;
  bagSize: number;
  pricePerBag: number;
};

export type HugelkulturResult = {
  soilOnTopFt: number;
  woodFt: number;
  soilCubicFeet: number;
  woodCubicFeet: number;
  savedCubicFeet: number;
  savedPercent: number;
  soilBags: number;
  fullBags: number;
  bagsSaved: number;
  fullCost: number | null;
  soilCost: number | null;
  moneySaved: number | null;
  tooShallow: boolean;
};

/** Twigs and leaves in a 12 in bed; keep extra wood only when the frame is taller. */
export const HUGEL_WOOD_LAYER_IN = 3;
export const HUGEL_PREFERRED_SOIL_IN = 12;

export function suggestedHugelSoilOnTopInches(depthInches: number): number {
  if (!(depthInches > 0)) return HUGEL_PREFERRED_SOIL_IN;
  return Math.min(
    HUGEL_PREFERRED_SOIL_IN,
    Math.max(depthInches - HUGEL_WOOD_LAYER_IN, 0),
  );
}

/** Brush, leaves, or logs replace the volume below the soil layer. */
export function calculateHugelkultur(input: HugelkulturInput): HugelkulturResult {
  const depthFt = Math.max(0, input.depthFt);
  const soilOnTopFt = Math.min(Math.max(input.soilOnTopFt, 0), depthFt);
  const woodFt = Math.max(0, depthFt - soilOnTopFt);
  const soilShare = depthFt > 0 ? soilOnTopFt / depthFt : 1;
  const soilCubicFeet = input.fullCubicFeet * soilShare;
  const woodCubicFeet = Math.max(0, input.fullCubicFeet - soilCubicFeet);
  const bagSize = input.bagSize;
  const fullBags = bagSize > 0 ? Math.ceil(input.fullCubicFeet / bagSize) : 0;
  const soilBags = bagSize > 0 ? Math.ceil(soilCubicFeet / bagSize) : 0;
  const bagsSaved = Math.max(0, fullBags - soilBags);
  const hasPrice = input.pricePerBag > 0;
  return {
    soilOnTopFt,
    woodFt,
    soilCubicFeet,
    woodCubicFeet,
    savedCubicFeet: woodCubicFeet,
    savedPercent: input.fullCubicFeet > 0 ? (woodCubicFeet / input.fullCubicFeet) * 100 : 0,
    soilBags,
    fullBags,
    bagsSaved,
    fullCost: hasPrice ? fullBags * input.pricePerBag : null,
    soilCost: hasPrice ? soilBags * input.pricePerBag : null,
    moneySaved: hasPrice ? bagsSaved * input.pricePerBag : null,
    tooShallow: woodFt < 1 / 12,
  };
}

export type MulchInput = BoxVolumeInput & {
  bagSize: number;
};

export type MulchResult = BoxVolumeResult & {
  bags: number;
  bagSize: number;
};

export function validateMulch(input: MulchInput): CalcError[] {
  const errors = validateBoxVolume(input);
  if (!isPositive(input.bagSize)) {
    errors.push({ field: "bagSize", message: "Choose a bag size." });
  }
  return errors;
}

export function calculateMulch(input: MulchInput): MulchResult {
  const volume = calculateBoxVolume(input);
  return {
    ...volume,
    bags: Math.ceil(volume.cubicFeet / input.bagSize),
    bagSize: input.bagSize,
  };
}

export type FertilizerInput = {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  nitrogenPercent: number;
  phosphorusPercent: number;
  potassiumPercent: number;
  targetNitrogenLbsPer1000: number;
};

export type FertilizerResult = {
  areaSqFt: number;
  nitrogenLbsNeeded: number;
  productLbs: number;
  productOz: number;
  phosphorusLbs: number;
  potassiumLbs: number;
};

export function validateFertilizer(input: FertilizerInput): CalcError[] {
  const errors: CalcError[] = [];
  const length = dimensionError("length", input.length, input.lengthUnit);
  const width = dimensionError("width", input.width, input.widthUnit);
  if (length) errors.push({ field: "length", message: length });
  if (width) errors.push({ field: "width", message: width });
  if (!Number.isFinite(input.nitrogenPercent) || input.nitrogenPercent <= 0) {
    errors.push({
      field: "nitrogenPercent",
      message: "Nitrogen (N) must be greater than 0. Check the first number in the N-P-K ratio.",
    });
  } else if (input.nitrogenPercent > 100) {
    errors.push({ field: "nitrogenPercent", message: "Nitrogen percent cannot exceed 100." });
  }
  for (const [field, label, value] of [
    ["phosphorusPercent", "Phosphorus (P)", input.phosphorusPercent],
    ["potassiumPercent", "Potassium (K)", input.potassiumPercent],
  ] as const) {
    if (!Number.isFinite(value) || value < 0) {
      errors.push({ field, message: `${label} cannot be negative.` });
    } else if (value > 100) {
      errors.push({ field, message: `${label} cannot exceed 100.` });
    }
  }
  if (
    !Number.isFinite(input.targetNitrogenLbsPer1000) ||
    input.targetNitrogenLbsPer1000 <= 0
  ) {
    errors.push({
      field: "targetNitrogenLbsPer1000",
      message: "Enter a target nitrogen rate greater than 0.",
    });
  } else if (input.targetNitrogenLbsPer1000 > 10) {
    errors.push({
      field: "targetNitrogenLbsPer1000",
      message:
        "That nitrogen rate is unusually high for a home garden. Double-check the product label or a soil-test recommendation.",
    });
  }
  return errors;
}

export function calculateFertilizer(input: FertilizerInput): FertilizerResult {
  const lengthFt = toFeet(input.length, input.lengthUnit);
  const widthFt = toFeet(input.width, input.widthUnit);
  const areaSqFt = lengthFt * widthFt;
  const nitrogenLbsNeeded =
    (areaSqFt / 1000) * input.targetNitrogenLbsPer1000;
  const productLbs = nitrogenLbsNeeded / (input.nitrogenPercent / 100);
  const phosphorusLbs = productLbs * (input.phosphorusPercent / 100);
  const potassiumLbs = productLbs * (input.potassiumPercent / 100);
  return {
    areaSqFt,
    nitrogenLbsNeeded,
    productLbs,
    productOz: productLbs * 16,
    phosphorusLbs,
    potassiumLbs,
  };
}

export type PlantSpacingMode = "grid" | "square-foot";

export type PlantSpacingInput = {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
  spacing: number;
  spacingUnit: LengthUnit;
  mode: PlantSpacingMode;
  plantsPerSquareFoot: number;
};

export type PlantSpacingResult = {
  areaSqFt: number;
  plants: number;
  alongLength: number;
  alongWidth: number;
  spacingInches: number;
  mode: PlantSpacingMode;
  plantsPerSquareFoot: number;
  lengthFitsSpacing: boolean;
  widthFitsSpacing: boolean;
};

/** Full spacing squares that fit, or 1 if the side is narrower than spacing. */
export function countAlongSide(sideInches: number, spacingInches: number): number {
  if (!(sideInches > 0) || !(spacingInches > 0)) return 0;
  return Math.max(1, Math.floor(sideInches / spacingInches));
}

export function validatePlantSpacing(input: PlantSpacingInput): CalcError[] {
  const errors: CalcError[] = [];
  const length = dimensionError("length", input.length, input.lengthUnit);
  const width = dimensionError("width", input.width, input.widthUnit);
  if (length) errors.push({ field: "length", message: length });
  if (width) errors.push({ field: "width", message: width });
  if (!isPositive(input.spacing)) {
    errors.push({ field: "spacing", message: "Enter plant spacing greater than 0." });
  } else if (toInches(input.spacing, input.spacingUnit) > 120) {
    errors.push({ field: "spacing", message: "Spacing looks too large. Check the unit." });
  }
  if (input.mode === "square-foot") {
    if (![1, 4, 9, 16].includes(input.plantsPerSquareFoot)) {
      errors.push({
        field: "plantsPerSquareFoot",
        message: "Choose 1, 4, 9, or 16 plants per square foot.",
      });
    }
  }
  return errors;
}

export function calculatePlantSpacing(
  input: PlantSpacingInput,
): PlantSpacingResult {
  const lengthIn = toInches(input.length, input.lengthUnit);
  const widthIn = toInches(input.width, input.widthUnit);
  const spacingIn = toInches(input.spacing, input.spacingUnit);
  const areaSqFt = (lengthIn / 12) * (widthIn / 12);

  if (input.mode === "square-foot") {
    const plants = Math.floor(areaSqFt * input.plantsPerSquareFoot);
    return {
      areaSqFt,
      plants,
      alongLength: 0,
      alongWidth: 0,
      spacingInches: spacingIn,
      mode: input.mode,
      plantsPerSquareFoot: input.plantsPerSquareFoot,
      lengthFitsSpacing: true,
      widthFitsSpacing: true,
    };
  }

  const alongLength = countAlongSide(lengthIn, spacingIn);
  const alongWidth = countAlongSide(widthIn, spacingIn);
  return {
    areaSqFt,
    plants: alongLength * alongWidth,
    alongLength,
    alongWidth,
    spacingInches: spacingIn,
    mode: input.mode,
    plantsPerSquareFoot: input.plantsPerSquareFoot,
    lengthFitsSpacing: lengthIn >= spacingIn,
    widthFitsSpacing: widthIn >= spacingIn,
  };
}

export type GardenAreaInput = {
  length: number;
  lengthUnit: LengthUnit;
  width: number;
  widthUnit: LengthUnit;
};

export type GardenAreaResult = {
  squareFeet: number;
  squareMeters: number;
  perimeterFt: number;
  lengthFt: number;
  widthFt: number;
};

export function validateGardenArea(input: GardenAreaInput): CalcError[] {
  const errors: CalcError[] = [];
  const length = dimensionError("length", input.length, input.lengthUnit);
  const width = dimensionError("width", input.width, input.widthUnit);
  if (length) errors.push({ field: "length", message: length });
  if (width) errors.push({ field: "width", message: width });
  return errors;
}

export function calculateGardenArea(input: GardenAreaInput): GardenAreaResult {
  const lengthFt = toFeet(input.length, input.lengthUnit);
  const widthFt = toFeet(input.width, input.widthUnit);
  const squareFeet = lengthFt * widthFt;
  return {
    squareFeet,
    squareMeters: squareFeetToMeters(squareFeet),
    perimeterFt: 2 * (lengthFt + widthFt),
    lengthFt,
    widthFt,
  };
}
