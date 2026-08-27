import Link from "next/link";
import { cardSurfaceClass } from "@/components/content/CardLink";
import type { FaqItem, RelatedLink } from "@/data/types";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <header className="mb-8">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-1 max-w-3xl font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-lg leading-7 text-muted">{description}</p>
    </header>
  );
}

export function RelatedLinks({
  title,
  items,
}: {
  title: string;
  items: RelatedLink[];
}) {
  if (!items.length) return null;

  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold">{title}</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`block px-4 py-3 ${cardSurfaceClass}`}
            >
              <span className="font-medium text-accent">{item.label}</span>
              {item.description ? (
                <span className="mt-1 block text-sm text-muted">{item.description}</span>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FaqList({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <section className="mt-10">
      <h2 className="font-serif text-2xl font-semibold">Frequently asked questions</h2>
      <div className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
        {items.map((item) => (
          <details key={item.question} className="group px-4 py-3">
            <summary className="cursor-pointer list-none font-medium marker:content-none">
              <span className="flex items-start justify-between gap-4">
                {item.question}
                <span aria-hidden="true" className="text-muted group-open:hidden">
                  +
                </span>
                <span aria-hidden="true" className="hidden text-muted group-open:inline">
                  −
                </span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-6 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Callout({
  title,
  children,
  tone = "info",
}: {
  title?: string;
  children: React.ReactNode;
  tone?: "info" | "warning" | "tip";
}) {
  const styles =
    tone === "warning"
      ? "border-[#e0c8a4] bg-[#f8efe3]"
      : tone === "tip"
        ? "border-accent/20 bg-accent/5"
        : "border-border bg-background";

  return (
    <aside className={`my-6 rounded-xl border px-4 py-3 text-sm leading-6 ${styles}`}>
      {title ? <p className="font-semibold">{title}</p> : null}
      <div className={title ? "mt-1 text-muted" : "text-muted"}>{children}</div>
    </aside>
  );
}
