"use client";

import Link from "next/link";
import { useActionState } from "react";
import { sendTilbakestillingslenke } from "./actions";
import { AuthShell } from "@/components/auth-shell";

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-neutral-900";

export function GlemtPassordForm() {
  const [state, action, pending] = useActionState(
    sendTilbakestillingslenke,
    undefined,
  );

  if (state?.success) {
    return (
      <AuthShell tittel="Sjekk e-posten din">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Hvis det finnes en konto med denne e-postadressen, har vi sendt en
          lenke for å tilbakestille passordet.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      tittel="Glemt passord?"
      undertekst="Skriv inn e-posten din, så sender vi deg en lenke for å lage et nytt passord."
      bunntekst={
        <>
          Husker du passordet?{" "}
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
          {pending ? "Sender…" : "Send tilbakestillingslenke"}
        </button>
      </form>
    </AuthShell>
  );
}
