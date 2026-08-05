export function LogoMerke({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="h-4.5 w-4.5"
        aria-hidden="true"
      >
        <path
          d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMerke />
      <span className="text-sm font-semibold tracking-tight">
        Kundeservice <span className="text-brand">Norge</span>
      </span>
    </span>
  );
}
