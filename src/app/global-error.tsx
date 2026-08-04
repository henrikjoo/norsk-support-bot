"use client";

import "./globals.css";

export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="no">
      <body className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Noe gikk galt
        </h1>
        <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
          Det oppstod en uventet feil i applikasjonen. Prøv å laste siden på
          nytt.
        </p>
        <button
          onClick={() => retry()}
          className="mt-3 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90"
        >
          Prøv igjen
        </button>
        {error.digest && (
          <p className="mt-4 text-xs text-neutral-400">
            Feilkode: {error.digest}
          </p>
        )}
      </body>
    </html>
  );
}
