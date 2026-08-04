"use client";

import { useActionState } from "react";
import { lagreKunnskapsbase } from "./actions";
import type { KnowledgeBase } from "@/lib/types";

const feltStil =
  "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900";

export function KunnskapsbaseForm({
  kunnskapsbase,
}: {
  kunnskapsbase: KnowledgeBase;
}) {
  const [state, action, pending] = useActionState(lagreKunnskapsbase, undefined);

  return (
    <form action={action} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="faq" className="text-sm font-medium">
          FAQ (spørsmål og svar)
        </label>
        <textarea
          id="faq"
          name="faq"
          rows={6}
          defaultValue={kunnskapsbase.faq}
          placeholder={"Eksempel:\nSpm: Kan jeg bytte størrelse?\nSvar: Ja, innen 30 dager."}
          className={feltStil}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="product_info" className="text-sm font-medium">
          Produktinfo
        </label>
        <textarea
          id="product_info"
          name="product_info"
          rows={6}
          defaultValue={kunnskapsbase.product_info}
          placeholder="Beskriv produktene, materialer, størrelsesguide, lagerstatus osv."
          className={feltStil}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="return_policy" className="text-sm font-medium">
          Returpolicy
        </label>
        <textarea
          id="return_policy"
          name="return_policy"
          rows={5}
          defaultValue={kunnskapsbase.return_policy}
          placeholder="Hvor lang angrefrist, hvem betaler frakt ved retur osv."
          className={feltStil}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="shipping_policy" className="text-sm font-medium">
          Fraktpolicy
        </label>
        <textarea
          id="shipping_policy"
          name="shipping_policy"
          rows={5}
          defaultValue={kunnskapsbase.shipping_policy}
          placeholder="Leveringstid, fraktkostnad, hvilke transportører osv."
          className={feltStil}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          {pending ? "Lagrer…" : "Lagre kunnskapsbase"}
        </button>
        {state?.success && (
          <p className="text-sm text-green-600">Lagret!</p>
        )}
        {state?.error && (
          <p className="text-sm text-red-600" role="alert">
            {state.error}
          </p>
        )}
      </div>
    </form>
  );
}
