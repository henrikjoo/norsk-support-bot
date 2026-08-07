"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export function KundeserviceWidget() {
  const pathname = usePathname();
  const companyId = process.env.NEXT_PUBLIC_KUNDESERVICE_WIDGET_ID;

  // Widget-siden er selve chat-vinduet som embeddes andre steder —
  // skal ikke ha en widget inni seg selv.
  if (pathname?.startsWith("/widget")) {
    return null;
  }

  if (!companyId) {
    console.warn("NEXT_PUBLIC_KUNDESERVICE_WIDGET_ID er ikke satt.");
    return null;
  }

  return (
    <Script
      src="/widget.js"
      data-company-id={companyId}
      strategy="afterInteractive"
    />
  );
}
