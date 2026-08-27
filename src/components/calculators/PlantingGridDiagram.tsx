"use client";

import { useId } from "react";
import { formatInteger, formatNumber } from "@/lib/format";

const MAX_DRAWN_DOTS = 400;

function sideLabel(inches: number): string {
  if (inches >= 12) {
    return `${formatNumber(inches / 12)} ft`;
  }
  return `${formatInteger(inches)} in`;
}

function stationsAlong(count: number, sideInches: number, spacingInches: number): number[] {
  if (count <= 0 || sideInches <= 0) return [];
  const used = count * spacingInches;
  if (used <= sideInches + 1e-9) {
    const margin = (sideInches - used) / 2;
    return Array.from({ length: count }, (_, i) => margin + (i + 0.5) * spacingInches);
  }
  return Array.from({ length: count }, (_, i) => ((i + 0.5) * sideInches) / count);
}

export function PlantingGridDiagram({
  lengthInches,
  widthInches,
  alongLength,
  alongWidth,
  spacingInches,
  cropName,
  lengthFitsSpacing,
  widthFitsSpacing,
}: {
  lengthInches: number;
  widthInches: number;
  alongLength: number;
  alongWidth: number;
  spacingInches: number;
  cropName: string;
  lengthFitsSpacing: boolean;
  widthFitsSpacing: boolean;
}) {
  const patternId = useId().replace(/:/g, "");
  const plants = alongLength * alongWidth;
  const xs = stationsAlong(alongLength, lengthInches, spacingInches);
  const ys = stationsAlong(alongWidth, widthInches, spacingInches);
  const overhangs = plants > 0 && (!lengthFitsSpacing || !widthFitsSpacing);
  const leftover =
    plants > 0 &&
    !overhangs &&
    (lengthInches - alongLength * spacingInches > 0.5 ||
      widthInches - alongWidth * spacingInches > 0.5);
  const cell = Math.min(spacingInches, lengthInches, widthInches);
  const dotRadius = Math.max(cell * 0.16, Math.min(lengthInches, widthInches) * 0.012);
  const drawDots = plants > 0 && plants <= MAX_DRAWN_DOTS;
  const usePattern = plants > MAX_DRAWN_DOTS && !overhangs;
  const showCells = plants > 0 && plants <= 48 && !overhangs;
  const aspect = lengthInches / Math.max(widthInches, 1e-9);
  const maxFitAspect = 8;
  const maxHeightPx = 160;
  const needsScroll = aspect > maxFitAspect;
  const frameStyle = needsScroll
    ? {
        width: `${(aspect / maxFitAspect) * 100}%`,
        paddingBottom: `${(widthInches / lengthInches) * 100}%`,
      }
    : {
        width: "100%",
        maxWidth: `${maxHeightPx * aspect}px`,
        paddingBottom: `${(widthInches / lengthInches) * 100}%`,
      };
  const usedLeft = xs.length ? xs[0] - Math.min(spacingInches, lengthInches) / 2 : 0;
  const usedTop = ys.length ? ys[0] - Math.min(spacingInches, widthInches) / 2 : 0;
  const usedWidth = xs.length
    ? xs[xs.length - 1] - xs[0] + Math.min(spacingInches, lengthInches)
    : 0;
  const usedHeight = ys.length
    ? ys[ys.length - 1] - ys[0] + Math.min(spacingInches, widthInches)
    : 0;

  const dots: { cx: number; cy: number; key: string }[] = [];
  if (drawDots) {
    ys.forEach((cy, row) => {
      xs.forEach((cx, col) => {
        dots.push({ key: `${row}-${col}`, cx, cy });
      });
    });
  }

  const label =
    plants === 0
      ? `${cropName}: enter a bed length and width.`
      : `${cropName}: ${formatInteger(plants)} plants, ${formatInteger(alongWidth)} across and ${formatInteger(alongLength)} along. Each dot is one plant.`;

  return (
    <figure className="mt-1">
      <p className="text-xs text-white/70">
        Top view · each dot is one plant
        {plants > 0
          ? ` · ${formatInteger(alongWidth)} across × ${formatInteger(alongLength)} along`
          : null}
      </p>
      <div className="mt-2 flex items-stretch gap-1.5">
        <p
          className="w-4 shrink-0 self-center text-center text-[10px] leading-none text-white/65"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {sideLabel(widthInches)} wide
        </p>
        <div className={`min-w-0 flex-1 ${needsScroll ? "overflow-x-auto" : "overflow-hidden"}`}>
          <div className="relative mx-auto h-0" style={frameStyle}>
            <svg
              viewBox={`0 0 ${lengthInches} ${widthInches}`}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label={label}
            >
            {usePattern ? (
              <defs>
                <pattern
                  id={patternId}
                  x={usedLeft}
                  y={usedTop}
                  width={spacingInches}
                  height={spacingInches}
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx={spacingInches / 2}
                    cy={spacingInches / 2}
                    r={dotRadius}
                    fill="#e7f3d8"
                  />
                </pattern>
              </defs>
            ) : null}
            <rect
              x={0}
              y={0}
              width={lengthInches}
              height={widthInches}
              rx={Math.min(lengthInches, widthInches) * 0.04}
              fill="#1c4a2d"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
            />
            {plants > 0 && !overhangs ? (
              <rect
                x={usedLeft}
                y={usedTop}
                width={usedWidth}
                height={usedHeight}
                fill={usePattern ? `url(#${patternId})` : "rgba(255,255,255,0.06)"}
              />
            ) : null}
            {showCells
              ? ys.flatMap((cy, row) =>
                  xs.map((cx, col) => (
                    <rect
                      key={`cell-${row}-${col}`}
                      x={cx - spacingInches / 2}
                      y={cy - spacingInches / 2}
                      width={spacingInches}
                      height={spacingInches}
                      fill="none"
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth={1}
                      vectorEffect="non-scaling-stroke"
                    />
                  )),
                )
              : null}
            {dots.map((dot) => (
              <circle key={dot.key} cx={dot.cx} cy={dot.cy} r={dotRadius} fill="#e7f3d8" />
            ))}
            </svg>
          </div>
        </div>
      </div>
      <p className="mt-1.5 text-center text-[10px] text-white/65">
        {sideLabel(lengthInches)} long
      </p>
      {overhangs ? (
        <p className="mt-2 text-xs leading-5 text-white/80">
          {!lengthFitsSpacing && !widthFitsSpacing
            ? `This bed is smaller than the ${formatInteger(spacingInches)}-inch spacing. You can still set ${formatInteger(plants)} ${plants === 1 ? "plant" : "plants"}; they will need room outside the bed.`
            : `This bed is narrower than the ${formatInteger(spacingInches)}-inch spacing. Plant a single row down the center — plants will hang over the sides.`}
        </p>
      ) : leftover ? (
        <p className="mt-2 text-xs leading-5 text-white/70">
          Darker edges are leftover inches — not enough for another plant at this
          spacing.
        </p>
      ) : null}
    </figure>
  );
}
