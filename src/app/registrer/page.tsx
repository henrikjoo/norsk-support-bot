"use client";

import Link from "next/link";
import { useActionState } from "react";
import { registrerBedrift } from "./actions";
import { AuthShell } from "@/components/auth-shell";

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-neutral-900";

export default function RegistrerPage() {
  const [state, action, pending] = useActionState(registrerBedrift, undefined);

  return (
    <AuthShell
      tittel="Registrer bedriften din"
      undertekst="Opprett en konto for å komme i gang med AI-kundeservice."
      bunntekst={
        <>
          Har du allerede en konto?{" "}
          <Link href="/logg-inn" className="font-medium text-brand hover:underline">
            Logg inn
          </Link>
        </>
      }
    >
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
            className={inputClass}
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
            className={inputClass}
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
          className="mt-2 w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Oppretter konto…" : "Opprett konto"}
        </button>
      </form>
    </AuthShell>
  );
}
