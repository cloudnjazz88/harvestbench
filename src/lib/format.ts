export function roundTo(value: number, digits = 2): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function formatNumber(value: number, digits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return roundTo(value, digits).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
  });
}

export function formatInteger(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return Math.round(value).toLocaleString("en-US");
}

export function formatMoney(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return roundTo(value, 2).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(roundTo(value, 2)) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function plural(count: number, singular: string, pluralForm?: string): string {
  return count === 1 ? singular : (pluralForm ?? `${singular}s`);
}

export type FertilizerDiameterUnitLabel = "in" | "cm";

/** Result-card line for pot/container size, e.g. "1 × 12-inch pot". */
export function formatContainerSize(
  pots: number,
  diameter: number,
  unit: FertilizerDiameterUnitLabel,
): string {
  if (!Number.isFinite(pots) || pots <= 0 || !Number.isFinite(diameter) || diameter <= 0) {
    return "—";
  }
  const digits = Math.abs(diameter - Math.round(diameter)) < 1e-9 ? 0 : 1;
  const size = unit === "cm" ? `${formatNumber(diameter, digits)}-cm` : `${formatNumber(diameter, digits)}-inch`;
  return `${formatInteger(pots)} × ${size} ${plural(pots, "pot")}`;
}

/** Kitchen scoop for granular fertilizer: 1 oz ≈ 2 Tbsp. Density varies by product. */
export const TBSP_PER_OZ_GRANULAR = 2;
export const TSP_PER_TBSP = 3;

function formatOunceHint(ounces: number): string {
  if (!Number.isFinite(ounces) || ounces <= 0) return "—";
  if (ounces < 0.005) return "under 0.01 oz by weight";
  if (ounces < 0.05) return `${formatNumber(ounces, 2)} oz by weight`;
  return `${formatNumber(ounces, 1)} oz by weight`;
}

export type KitchenSpoonMeasure = {
  heroValue: string;
  heroUnit: string;
  detail: string;
};

export function formatKitchenSpoons(ounces: number): KitchenSpoonMeasure {
  if (!Number.isFinite(ounces) || ounces <= 0) {
    return { heroValue: "—", heroUnit: "", detail: "" };
  }

  const totalTsp = roundTo(ounces * TBSP_PER_OZ_GRANULAR * TSP_PER_TBSP, 1);
  let tbsp = Math.floor((totalTsp + 1e-9) / TSP_PER_TBSP);
  let tsp = roundTo(Math.round((totalTsp - tbsp * TSP_PER_TBSP) * 2) / 2, 1);

  if (tsp >= 2.8) {
    tbsp += 1;
    tsp = 0;
  }

  const cups = Math.floor(tbsp / 16);
  const tbspAfterCups = tbsp - cups * 16;
  const ozHint = formatOunceHint(ounces);

  if (tbsp < 1) {
    const tspFine = roundTo(totalTsp, 1);
    if (tspFine < 0.1) {
      return {
        heroValue: "< 0.1",
        heroUnit: "tsp",
        detail: `Less than 0.1 tsp · ${ozHint}. Level spoons; granule size varies.`,
      };
    }
    return {
      heroValue: formatNumber(tspFine, 1),
      heroUnit: tspFine === 1 ? "tsp" : "tsp",
      detail: `About ${ozHint}. Level teaspoons; granule size varies.`,
    };
  }

  if (cups >= 1) {
    const extra =
      tbspAfterCups > 0
        ? ` + ${formatNumber(tbspAfterCups, 0)} Tbsp`
        : tsp >= 0.5
          ? ` + ${formatNumber(tsp, 1)} tsp`
          : "";
    return {
      heroValue: formatNumber(cups, cups >= 10 ? 0 : 1),
      heroUnit: cups === 1 && tbspAfterCups === 0 && tsp < 0.5 ? "cup" : "cups",
      detail: `${extra ? `${formatNumber(cups, 0)} cup${cups === 1 ? "" : "s"}${extra}. ` : ""}${ozHint}. Use a dry measuring cup; granule size varies.`,
    };
  }

  const tspBit = tsp >= 0.5 ? ` + ${formatNumber(tsp, 1)} tsp` : "";
  return {
    heroValue: formatNumber(tbsp, 0),
    heroUnit: tbsp === 1 && tsp < 0.5 ? "Tbsp" : "Tbsp",
    detail: tspBit
      ? `${formatNumber(tbsp, 0)} Tbsp${tspBit} · ${ozHint}. Level spoons; granule size varies.`
      : `${ozHint}. Level tablespoons; granule size varies.`,
  };
}
