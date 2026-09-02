import Link from "next/link";
import { isPublicPath } from "@/data/routes";

export const cardSurfaceClass =
  "rounded-xl border border-accent/25 bg-accent/[0.07] transition-colors hover:border-accent hover:bg-accent/[0.16]";

export function CardLink({
  href,
  title,
  description,
  kicker,
}: {
  href: string;
  title: string;
  description: string;
  kicker?: string;
}) {
  return (
    <Link href={href} className={`flex h-full flex-col p-5 ${cardSurfaceClass}`}>
      {kicker ? (
        <span className="text-xs font-semibold uppercase tracking-wide text-accent">{kicker}</span>
      ) : null}
      <span className="mt-1 font-serif text-xl font-semibold">{title}</span>
      <span className="mt-2 text-sm leading-6 text-muted">{description}</span>
    </Link>
  );
}

export function PublicCardLink(props: {
  href: string;
  title: string;
  description: string;
  kicker?: string;
}) {
  if (!isPublicPath(props.href)) return null;
  return <CardLink {...props} />;
}

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      <h2 className="font-serif text-2xl font-semibold sm:text-3xl">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-muted">{description}</p> : null}
    </div>
  );
}
