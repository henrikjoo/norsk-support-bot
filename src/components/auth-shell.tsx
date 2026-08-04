import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/logo";

export function AuthShell({
  tittel,
  undertekst,
  children,
  bunntekst,
}: {
  tittel: string;
  undertekst?: string;
  children: ReactNode;
  bunntekst?: ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <Link href="/" className="mb-8">
        <Logo />
      </Link>
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h1 className="mb-1 text-xl font-semibold tracking-tight">{tittel}</h1>
        {undertekst && (
          <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
            {undertekst}
          </p>
        )}
        {children}
      </div>
      {bunntekst && (
        <div className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          {bunntekst}
        </div>
      )}
    </main>
  );
}
