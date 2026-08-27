export type LengthUnit = "ft" | "in";

export function toFeet(value: number, unit: LengthUnit): number {
  return unit === "in" ? value / 12 : value;
}

export function toInches(value: number, unit: LengthUnit): number {
  return unit === "ft" ? value * 12 : value;
}

export const CU_FT_PER_CU_YD = 27;
export const LITERS_PER_CU_FT = 28.316846592;
export const SQ_METERS_PER_SQ_FT = 0.09290304;

export function cubicFeetToYards(cubicFeet: number): number {
  return cubicFeet / CU_FT_PER_CU_YD;
}

export function cubicFeetToLiters(cubicFeet: number): number {
  return cubicFeet * LITERS_PER_CU_FT;
}

export const DRY_QUARTS_PER_CU_FT = 25.71;

export function cubicFeetToDryQuarts(cubicFeet: number): number {
  return cubicFeet * DRY_QUARTS_PER_CU_FT;
}

/** US liquid gallon. Grow bags and buckets are usually sold this way; nursery “trade gallons” can be smaller. */
export const CU_FT_PER_US_GALLON = 0.133681;

export function gallonsToCubicFeet(gallons: number): number {
  return gallons * CU_FT_PER_US_GALLON;
}

export function squareFeetToMeters(squareFeet: number): number {
  return squareFeet * SQ_METERS_PER_SQ_FT;
}
