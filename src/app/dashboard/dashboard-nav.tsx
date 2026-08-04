"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LENKER = [
  { href: "/dashboard", label: "Oversikt" },
  { href: "/dashboard/samtaler", label: "Samtaler" },
  { href: "/dashboard/kunnskapsbase", label: "Kunnskapsbase" },
  { href: "/dashboard/widget", label: "Installer widget" },
  { href: "/dashboard/abonnement", label: "Abonnement" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto text-sm font-medium">
      {LENKER.map((lenke) => {
        const aktiv =
          lenke.href === "/dashboard"
            ? pathname === lenke.href
            : pathname?.startsWith(lenke.href);

        return (
          <Link
            key={lenke.href}
            href={lenke.href}
            className={`whitespace-nowrap rounded-md px-3 py-1.5 transition ${
              aktiv
                ? "bg-brand-soft text-brand"
                : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-900"
            }`}
          >
            {lenke.label}
          </Link>
        );
      })}
    </nav>
  );
}
