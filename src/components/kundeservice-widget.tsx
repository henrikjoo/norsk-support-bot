"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";

export function KundeserviceWidget() {
  const pathname = usePathname();
  const companyId = process.env.NEXT_PUBLIC_KUNDESERVICE_WIDGET_ID;

  // Widget-siden er selve chat-vinduet som embeddes andre steder —
  // skal ikke ha en widget inni seg selv.
  if (!companyId || pathname?.startsWith("/widget")) {
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
