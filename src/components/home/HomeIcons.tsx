export function IconPlanting({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <ellipse cx="20" cy="31" rx="12" ry="4.2" fill="#6d4426" opacity="0.85" />
      <path d="M20 30V16" stroke="#2f4a35" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M20 20c-3.2-4.4-8.4-5.6-11.2-3.6 2.2 4.6 6.4 6.6 11.2 6.6" fill="#6ea35a" stroke="#2f4a35" strokeWidth="1.2" />
      <path d="M20 18c3.4-4.6 8.8-5.6 11.6-3.4-2 4.6-6.4 6.4-11.6 6.4" fill="#8fbf6a" stroke="#2f4a35" strokeWidth="1.2" />
    </svg>
  );
}

export function IconSoil({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <path d="M6 34c3-8 10-14 18-14s15 6 18 14H6Z" fill="#6d4426" />
      <path d="M10 32c2.4-5 7-9 14-9 6.6 0 11 3.6 13.6 8" stroke="#3d2a18" strokeWidth="1.2" opacity="0.45" />
      <circle cx="16" cy="30" r="1.2" fill="#c4a15a" />
      <circle cx="24" cy="28" r="1" fill="#c4a15a" />
      <circle cx="31" cy="31" r="1.1" fill="#c4a15a" />
    </svg>
  );
}

export function IconLeaf({ className = "h-16 w-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M12 44c18-22 32-28 44-30-4 16-12 30-30 38-8 2-16-1-14-8Z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M20 42c10-8 22-16 30-22" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export function IconArrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconCircleArrow({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.4" />
      <path d="M11 16h10M17 12l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconVine({ className = "h-3.5 w-28" }: { className?: string }) {
  return (
    <svg viewBox="0 0 112 16" className={className} fill="none" aria-hidden="true">
      <path
        d="M2 9c12-5 20 4 32 0 12-4 18 5 30 0 10-4 16 3 24 1 8-2 14 1 22 3"
        stroke="currentColor"
        strokeWidth="0.95"
        strokeLinecap="round"
      />
      <path d="M24 7c1.1-2.2 2.8-2.4 3.8-0.8M56 8.5c1.2-2.3 3-2.5 4-0.7" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round" />
    </svg>
  );
}
