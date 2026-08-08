"use client";

import { useActionState, useState } from "react";
import { lagreWidgetFarge } from "./actions";

const FORHANDSVALG = [
  "#0d9488",
  "#2563eb",
  "#7c3aed",
  "#db2777",
  "#ea580c",
  "#16a34a",
  "#dc2626",
  "#0891b2",
  "#4f46e5",
  "#65a30d",
  "#525252",
  "#000000",
];

const HEX_MØNSTER = /^#[0-9a-fA-F]{6}$/;

export function FargeForm({ farge }: { farge: string }) {
  const [state, action, pending] = useActionState(lagreWidgetFarge, undefined);
  const [valgtFarge, setValgtFarge] = useState(farge);
  const [tekstfelt, setTekstfelt] = useState(farge);

  function settFarge(ny: string) {
    setValgtFarge(ny);
    setTekstfelt(ny);
  }

  function oppdaterTekstfelt(verdi: string) {
    setTekstfelt(verdi);
    if (HEX_MØNSTER.test(verdi)) {
      setValgtFarge(verdi);
    }
  }

  const ugyldigHex = tekstfelt.length > 0 && !HEX_MØNSTER.test(tekstfelt);

  return (
    <form action={action} className="flex flex-col gap-3">
      <input type="hidden" name="widget_color" value={valgtFarge} />

      <div className="flex flex-wrap items-center gap-3">
        <input
          type="color"
          value={valgtFarge}
          onChange={(e) => settFarge(e.target.value)}
          aria-label="Velg egen farge"
          className="h-10 w-14 cursor-pointer rounded-lg border border-neutral-300 dark:border-neutral-700"
        />

        <input
          type="text"
          value={tekstfelt}
          onChange={(e) => oppdaterTekstfelt(e.target.value)}
          placeholder="#0d9488"
          maxLength={7}
          className={`w-28 rounded-lg border px-3 py-2 text-sm outline-none transition focus:ring-2 ${
            ugyldigHex
              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
              : "border-neutral-300 focus:border-brand focus:ring-brand/20 dark:border-neutral-700"
          }`}
        />

        <button
          type="submit"
          disabled={pending || ugyldigHex}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Lagrer…" : "Lagre farge"}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FORHANDSVALG.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => settFarge(f)}
            title={f}
            aria-label={`Velg fargen ${f}`}
            className={`h-7 w-7 rounded-full border-2 ${
              valgtFarge.toLowerCase() === f ? "border-neutral-900 dark:border-white" : "border-black/10"
            }`}
            style={{ backgroundColor: f }}
          />
        ))}
      </div>

      {ugyldigHex && (
        <p className="text-sm text-red-600" role="alert">
          Skriv en gyldig fargekode, f.eks. #0d9488.
        </p>
      )}
      {state?.success && <p className="text-sm font-medium text-brand">Farge lagret!</p>}
      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}
    </form>
  );
}
