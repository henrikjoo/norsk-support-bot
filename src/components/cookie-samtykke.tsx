"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const SAMTYKKE_KEY = "cookie-samtykke";
type Samtykke = "godkjent" | "avslatt";

export function CookieSamtykke() {
  const pathname = usePathname();
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [samtykke, setSamtykke] = useState<Samtykke | null>(null);
  const [lastet, setLastet] = useState(false);

  useEffect(() => {
    const lagret = localStorage.getItem(SAMTYKKE_KEY);
    if (lagret === "godkjent" || lagret === "avslatt") {
      setSamtykke(lagret);
    }
    setLastet(true);
  }, []);

  function velg(verdi: Samtykke) {
    localStorage.setItem(SAMTYKKE_KEY, verdi);
    setSamtykke(verdi);
  }

  // Widgeten kjører embeddet på kundenes nettsider — skal aldri vise
  // cookie-banner eller laste analytics der.
  if (pathname?.startsWith("/widget")) {
    return null;
  }

  return (
    <>
      {gaId && samtykke === "godkjent" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {lastet && samtykke === null && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col items-center justify-between gap-3 border-t border-neutral-200 bg-white px-6 py-4 text-sm shadow-lg sm:flex-row dark:border-neutral-800 dark:bg-neutral-950">
          <p className="text-neutral-600 dark:text-neutral-400">
            Vi bruker cookies for å måle bruk av nettsiden (Google Analytics).{" "}
            <a href="/personvern" className="font-medium text-brand hover:underline">
              Les mer i personvernerklæringen
            </a>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => velg("avslatt")}
              className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Avslå
            </button>
            <button
              onClick={() => velg("godkjent")}
              className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground hover:opacity-90"
            >
              Godta
            </button>
          </div>
        </div>
      )}
    </>
  );
}
