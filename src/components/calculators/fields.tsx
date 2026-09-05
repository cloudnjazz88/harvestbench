"use client";

import { useId, useState } from "react";
import type { LengthUnit } from "@/lib/units";

export function NumberField({
  label,
  value,
  onChange,
  error,
  min = "0",
  step = "any",
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  min?: string;
  step?: string;
  suffix?: string;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1 flex min-w-0">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="h-12 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base outline-none focus:border-accent"
        />
        {suffix ? (
          <span className="ml-2 inline-flex items-center text-sm text-muted">{suffix}</span>
        ) : null}
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-cta" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function UnitField<T extends string = LengthUnit>({
  label,
  value,
  unit,
  onValueChange,
  onUnitChange,
  error,
  unitOptions,
}: {
  label: string;
  value: string;
  unit: T;
  onValueChange: (value: string) => void;
  onUnitChange: (unit: T) => void;
  error?: string;
  unitOptions?: { value: T; label: string }[];
}) {
  const id = useId();
  const unitId = `${id}-unit`;
  const errorId = `${id}-error`;
  const options = unitOptions ?? ([
    { value: "ft", label: "feet" },
    { value: "in", label: "inches" },
  ] as { value: T; label: string }[]);

  return (
    <div className="min-w-0">
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1 grid grid-cols-[minmax(0,1fr)_5.5rem] gap-2">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className="h-12 w-full min-w-0 rounded-md border border-border bg-card px-3 text-base outline-none focus:border-accent"
        />
        <select
          id={unitId}
          value={unit}
          aria-label={`${label} unit`}
          onChange={(event) => onUnitChange(event.target.value as T)}
          className="h-12 w-full min-w-0 rounded-md border border-border bg-card px-2 text-base"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p id={errorId} className="mt-1 text-sm text-cta" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options = [],
  groups,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
  groups?: { label: string; options: { value: string; label: string }[] }[];
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 h-12 w-full rounded-md border border-border bg-card px-3 text-base"
      >
        {groups
          ? groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))
          : options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
      </select>
    </div>
  );
}

export function ResultPanel({
  title = "Your result",
  hero,
  visual,
  children,
  summary,
  footer,
}: {
  title?: string;
  hero?: { label: string; value: string; unit?: string; detail?: string };
  visual?: React.ReactNode;
  children: React.ReactNode;
  summary: string;
  footer?: React.ReactNode;
}) {
  const [copied, setCopied] = useState<"results" | "link" | null>(null);
  const hasAnswer = Boolean(hero || summary);

  async function copy(kind: "results" | "link", text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied(null);
    }
  }

  if (!hasAnswer) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">Your result</p>
        <div className="mt-3 text-muted">{children}</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-result text-white shadow-[0_12px_32px_-16px_rgba(36,92,56,0.65)]">
      <div className="h-1.5 bg-cta" />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">{title}</p>
        {hero ? (
          <div className="mt-3" aria-live="polite">
            <p className="text-sm text-white/75">{hero.label}</p>
            <p key={hero.value} className="result-hero-pop mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0">
              <span className="font-serif text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                {hero.value}
              </span>
              {hero.unit ? (
                <span className="text-base font-medium text-white/80 sm:text-lg">{hero.unit}</span>
              ) : null}
              {hero.detail ? (
                <span className="text-sm font-normal text-white/60 sm:text-base">
                  <span className="mr-1.5 text-white/35" aria-hidden="true">
                    ·
                  </span>
                  {hero.detail}
                </span>
              ) : null}
            </p>
          </div>
        ) : (
          <h2 className="mt-2 font-serif text-2xl font-semibold">{title}</h2>
        )}
        {visual ? <div className="mt-4">{visual}</div> : null}
        <dl className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">{children}</dl>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/25 bg-white/10 px-4 text-sm font-medium text-white hover:bg-white/15"
            onClick={() => copy("results", summary)}
          >
            {copied === "results" ? "Copied results" : "Copy results"}
          </button>
          <button
            type="button"
            className="inline-flex min-h-10 items-center justify-center rounded-md border border-white/25 bg-transparent px-4 text-sm font-medium text-white/90 hover:bg-white/10"
            onClick={() => copy("link", window.location.href)}
          >
            {copied === "link" ? "Copied link" : "Copy page link"}
          </button>
        </div>
        {footer}
      </div>
    </div>
  );
}

export function ResultRow({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg bg-white/10 px-3 py-2.5">
      <dt className="text-xs font-medium uppercase tracking-wide text-white/65">{label}</dt>
      <dd className="mt-1">
        <span className="text-lg font-semibold leading-snug tabular-nums">{value}</span>
        {hint ? <span className="mt-0.5 block text-xs text-white/65">{hint}</span> : null}
      </dd>
    </div>
  );
}

export function CalculatorLayout({
  children,
  results,
  onReset,
  compact = false,
}: {
  children: React.ReactNode;
  results: React.ReactNode;
  onReset: () => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`grid gap-4 lg:items-start ${
        compact
          ? "lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)]"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(22rem,28rem)]"
      }`}
    >
      <form
        className={`rounded-xl border border-border bg-card ${
          compact ? "space-y-3 p-3 sm:p-4" : "space-y-4 p-4 sm:p-5"
        }`}
        onSubmit={(event) => event.preventDefault()}
      >
        {children}
        <button
          type="button"
          onClick={onReset}
          className="inline-flex min-h-10 items-center rounded-md border border-border px-4 text-sm font-medium hover:bg-background"
        >
          Reset
        </button>
      </form>
      <div className="order-first lg:sticky lg:top-24 lg:order-none">{results}</div>
    </div>
  );
}

export function fieldError(errors: { field?: string; message: string }[], field: string) {
  return errors.find((error) => error.field === field)?.message;
}
