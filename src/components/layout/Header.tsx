"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/layout/Logo";
import { headerNav, primaryNav } from "@/data/site";

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
      <div className="relative mx-auto flex h-14 w-full max-w-7xl items-center px-4 pr-14 sm:px-6 sm:pr-16 lg:px-6 lg:pr-6">
        <div className="shrink-0">
          <Logo compact />
        </div>
        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center justify-end gap-5 lg:flex"
        >
          {headerNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 whitespace-nowrap py-1 text-[0.9375rem] font-medium ${
                  active ? "text-accent" : "text-foreground hover:text-accent"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <MobileNav key={pathname} />
      </div>
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [closeMenu, open]);

  return (
    <div className="lg:hidden">
      <div className="absolute right-4 top-1/2 z-10 -translate-y-1/2 sm:right-6">
        <button
          ref={triggerRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => (open ? closeMenu() : setOpen(true))}
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
      </div>
      {open
        ? createPortal(
            <>
              <button
                type="button"
                aria-label="Close menu"
                className="fixed inset-0 z-[35] bg-foreground/25"
                onClick={closeMenu}
              />
              <div
                id={menuId}
                className="fixed top-14 right-0 z-50 box-border flex max-h-[calc(100dvh-3.5rem)] w-[min(24rem,100vw)] max-w-[100vw] translate-x-0 flex-col overflow-y-auto border-b border-l border-border bg-card"
                onClick={(event) => event.stopPropagation()}
              >
                <nav aria-label="Mobile" className="min-w-0 px-4 py-3 sm:px-6">
                  <ul className="flex min-w-0 flex-col">
                    {primaryNav.map((item) => (
                      <li key={item.href} className="min-w-0">
                        <Link
                          href={item.href}
                          className="block break-words rounded-md px-2 py-3 text-base font-medium hover:bg-background"
                          onClick={() => {
                            requestAnimationFrame(() => setOpen(false));
                          }}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </>,
            document.body,
          )
        : null}
    </div>
  );
}
