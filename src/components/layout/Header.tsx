"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/layout/Logo";
import { primaryNav } from "@/data/site";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center px-4 pr-14 sm:px-6 sm:pr-16 xl:px-6 xl:pr-6">
        <div className="shrink-0">
          <Logo compact />
        </div>
        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center justify-end xl:flex"
        >
          {primaryNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 whitespace-nowrap rounded-md px-2 py-2 text-sm font-medium ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-foreground hover:bg-background"
                }`}
              >
                {item.shortLabel ?? item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 sm:right-6 xl:hidden">
          <MobileNav key={pathname} />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {open ? (
          <span aria-hidden="true" className="text-2xl leading-none">
            ×
          </span>
        ) : (
          <span aria-hidden="true" className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
            <span className="block h-0.5 w-5 bg-foreground" />
          </span>
        )}
      </button>
      {open ? (
        <div
          id={menuId}
          className="fixed inset-x-0 top-16 border-b border-border bg-card"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-2 py-3 text-base font-medium hover:bg-background"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
