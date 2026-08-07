"use client";

import { useActionState, useState } from "react";
import { lagreWidgetFarge } from "./actions";

const FORHANDSVALG = ["#0d9488", "#2563eb", "#7c3aed", "#db2777", "#ea580c", "#16a34a"];

export function FargeForm({ farge }: { farge: string }) {
  const [state, action, pending] = useActionState(lagreWidgetFarge, undefined);
  const [valgtFarge, setValgtFarge] = useState(farge);

  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="widget_color" value={valgtFarge} />
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="color"
          value={valgtFarge}
          onChange={(e) => setValgtFarge(e.target.value)}
          aria-label="Velg egen farge"
          className="h-10 w-14 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-700"
        />
        <div className="flex gap-1.5">
          {FORHANDSVALG.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setValgtFarge(f)}
              title={f}
              aria-label={`Velg fargen ${f}`}
              className={`h-7 w-7 rounded-full border-2 ${
                valgtFarge.toLowerCase() === f ? "border-neutral-900 dark:border-white" : "border-black/10"
              }`}
              style={{ backgroundColor: f }}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Lagrer…" : "Lagre farge"}
        </button>
      </div>
      {state?.success && <p className="text-sm font-medium text-brand">Farge lagret!</p>}
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
