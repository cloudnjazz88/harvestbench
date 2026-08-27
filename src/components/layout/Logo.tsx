import Link from "next/link";
import { siteConfig } from "@/data/site";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2.5 text-foreground no-underline"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-white" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="11" width="18" height="8" rx="1.2" />
          <path d="M6 11V8.5c0-1 .8-2 2.2-2.2 1.4-.2 2.3.6 2.8 1.7.5-1.1 1.4-1.9 2.8-1.7 1.4.2 2.2 1.2 2.2 2.2V11" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </span>
        {!compact ? (
          <span className="block text-xs text-muted">Tools for edible gardens</span>
        ) : null}
      </span>
    </Link>
  );
}
