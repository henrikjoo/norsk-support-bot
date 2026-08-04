"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registrerBedrift } from "./actions";

export default function RegistrerPage() {
  const [state, action, pending] = useActionState(registrerBedrift, undefined);

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">
          Registrer bedriften din
        </h1>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          Opprett en konto for å komme i gang med AI-kundeservice.
        </p>

        <form action={action} className="flex flex-col gap-4">
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
              autoComplete="new-password"
              required
              minLength={8}
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
            />
            <p className="text-xs text-neutral-500">Minst 8 tegn.</p>
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
            {pending ? "Oppretter konto…" : "Opprett konto"}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
          Har du allerede en konto?{" "}
          <Link href="/logg-inn" className="font-medium underline">
            Logg inn
          </Link>
        </p>
      </div>
    </main>
  );
}
