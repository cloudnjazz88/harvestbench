import type { ProductRecommendationRecord } from "@/data/products";

const retailerLabel: Record<ProductRecommendationRecord["retailer"], string> = {
  amazon: "Amazon",
  "home-depot": "Home Depot",
  lowes: "Lowe's",
  other: "Retailer",
  unspecified: "Retailer not set",
};

export function ProductRecommendation({
  product,
}: {
  product: ProductRecommendationRecord;
}) {
  const hasLink = Boolean(product.externalUrl) && product.status === "ready";

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            {product.category}
          </p>
          <h3 className="mt-1 font-serif text-xl font-semibold">{product.name}</h3>
        </div>
        {product.status === "placeholder" ? (
          <span className="rounded-full border border-border px-2.5 py-1 text-xs font-medium text-muted">
            Placeholder
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm leading-6 text-muted">{product.shortDescription}</p>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="font-semibold">Best for</dt>
          <dd className="mt-1 text-muted">{product.idealUse}</dd>
        </div>
        <div>
          <dt className="font-semibold">Price range</dt>
          <dd className="mt-1 text-muted">{product.priceRange}</dd>
        </div>
      </dl>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <List title="Pros" items={product.pros} />
        <List title="Cons" items={product.cons} />
      </div>
      <p className="mt-4 text-sm text-muted">
        {retailerLabel[product.retailer]}
        {product.affiliate ? " · Affiliate-ready when a live URL is added" : ""}
      </p>
      {hasLink ? (
        <a
          href={product.externalUrl}
          className="mt-4 inline-flex min-h-11 items-center rounded-md bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover"
          rel={product.affiliate ? "sponsored nofollow noopener" : "noopener noreferrer"}
          target="_blank"
        >
          View at {retailerLabel[product.retailer]}
        </a>
      ) : (
        <p className="mt-4 rounded-md bg-background px-3 py-2 text-sm text-muted">
          Retailer link disabled until a real product URL is added. Swap
          {" "}
          <code className="text-foreground">externalUrl</code>
          {" "}
          in the product data to enable it.
        </p>
      )}
    </article>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function AffiliateNotice({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  return (
    <p className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted">
      Some links on this site may be affiliate links. If you purchase through
      these links, we may earn a commission at no additional cost to you.
    </p>
  );
}
