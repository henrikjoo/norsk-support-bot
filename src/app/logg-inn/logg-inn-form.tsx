"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loggInn } from "./actions";

export function LoggInnForm({ neste }: { neste: string }) {
  const [state, action, pending] = useActionState(loggInn, undefined);

  return (
    <div className="w-full max-w-sm">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Logg inn</h1>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        Logg inn for å administrere kunnskapsbasen og se samtaler.
      </p>

      <form action={action} className="flex flex-col gap-4">
        <input type="hidden" name="neste" value={neste} />

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            E-post
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Passord
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        {state?.error && (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {pending ? "Logger inn…" : "Logg inn"}
        </button>
      </form>

      <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
        Ny hos oss?{" "}
        <Link href="/registrer" className="font-medium underline">
          Registrer bedriften din
        </Link>
      </p>
    </div>
  );
}
