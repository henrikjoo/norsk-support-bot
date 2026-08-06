"use client";

import { useActionState } from "react";
import { sendMenneskeligSvar } from "./actions";

export function SvarForm({ sessionId }: { sessionId: string }) {
  const [state, action, pending] = useActionState(sendMenneskeligSvar, undefined);

  return (
    <form
      action={action}
      className="flex flex-col gap-2 border-t border-neutral-200 p-4 dark:border-neutral-800"
    >
      <input type="hidden" name="sessionId" value={sessionId} />
      <label className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
        Svar kunden direkte
      </label>
      <textarea
        name="svar"
        rows={2}
        placeholder="Skriv svaret ditt her — det dukker opp i chatten hos kunden."
        className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-neutral-900"
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="self-start rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Sender…" : "Send svar"}
        </button>
        {state?.success && (
          <p className="text-sm font-medium text-brand">Svar sendt!</p>
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
