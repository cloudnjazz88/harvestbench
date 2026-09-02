import type { ProductRecommendationRecord } from "@/data/products";
import { isProductReady } from "@/data/products";
import {
  AFFILIATE_LINKS_NOTE,
  AMAZON_PRICE_BUTTON_LABEL,
  amazonAffiliateRel,
  getAmazonAssociateDisclosure,
} from "@/data/affiliates";

export function ProductRecommendation({
  product,
}: {
  product: ProductRecommendationRecord;
}) {
  if (!isProductReady(product)) return null;

  const keepInMind = product.keepInMind?.length ? product.keepInMind : product.cons;
  const affiliate = product.affiliate && product.retailer === "amazon";

  return (
    <article className="rounded-xl border border-border bg-card p-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          {product.category}
        </p>
        <h3 className="mt-1 font-serif text-xl font-semibold">{product.name}</h3>
      </div>
      <dl className="mt-4 grid gap-3 text-sm">
        <div>
          <dt className="font-semibold">Best for</dt>
          <dd className="mt-1 text-muted">{product.idealUse}</dd>
        </div>
        {product.keySpecification ? (
          <div>
            <dt className="font-semibold">Key specification</dt>
            <dd className="mt-1 text-muted">{product.keySpecification}</dd>
          </div>
        ) : null}
      </dl>
      <p className="mt-4 text-sm leading-6 text-muted">{product.shortDescription}</p>
      {keepInMind.length ? (
        <div className="mt-4">
          <p className="text-sm font-semibold">Keep in mind</p>
          {keepInMind.length === 1 ? (
            <p className="mt-1 text-sm leading-6 text-muted">{keepInMind[0]}</p>
          ) : (
            <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
              {keepInMind.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
      <a
        href={product.externalUrl}
        className="mt-4 inline-flex min-h-11 items-center rounded-md bg-accent px-4 text-sm font-semibold text-white hover:bg-accent-hover"
        rel={amazonAffiliateRel(affiliate)}
        target="_blank"
      >
        {affiliate ? AMAZON_PRICE_BUTTON_LABEL : `Check price and availability at ${product.retailer}`}
      </a>
    </article>
  );
}

export function AffiliateNotice({ enabled }: { enabled: boolean }) {
  if (!enabled) return null;

  const amazonDisclosure = getAmazonAssociateDisclosure();

  return (
    <div className="rounded-md border border-border bg-background px-3 py-2 text-sm text-muted">
      <p>{AFFILIATE_LINKS_NOTE}</p>
      {amazonDisclosure ? <p className="mt-1">{amazonDisclosure}</p> : null}
    </div>
  );
}
