"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <Link href="/" className="mb-4">
        <Logo />
      </Link>
      <h1 className="text-2xl font-semibold tracking-tight">Noe gikk galt</h1>
      <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        Det oppstod en uventet feil. Prøv igjen, eller gå tilbake til
        forsiden hvis problemet vedvarer.
      </p>
      <div className="mt-3 flex gap-3">
        <button
          onClick={() => retry()}
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90"
        >
          Prøv igjen
        </button>
        <Link
          href="/"
          className="rounded-lg border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          Til forsiden
        </Link>
      </div>
      {error.digest && (
        <p className="mt-4 text-xs text-neutral-400">Feilkode: {error.digest}</p>
      )}
    </main>
  );
}
