"use client";

import { useActionState } from "react";
import { startAbonnement, apneKundeportal } from "./actions";
import { erIProveperiode, proveperiodeDagerIgjen } from "@/lib/subscription";
import type { SubscriptionStatus } from "@/lib/types";

const STATUS_TEKST: Record<SubscriptionStatus, string> = {
  active: "Aktivt",
  inactive: "Ikke aktivt",
  past_due: "Betaling forsinket",
  canceled: "Kansellert",
};

const STATUS_FARGE: Record<SubscriptionStatus, string> = {
  active: "text-green-700 dark:text-green-400",
  inactive: "text-neutral-600 dark:text-neutral-400",
  past_due: "text-amber-700 dark:text-amber-400",
  canceled: "text-red-700 dark:text-red-400",
};

export function AbonnementForm({
  status,
  harStripekunde,
  trialEndsAt,
}: {
  status: SubscriptionStatus;
  harStripekunde: boolean;
  trialEndsAt: string | null;
}) {
  const [startState, startAction, startPending] = useActionState(
    startAbonnement,
    undefined,
  );
  const [portalState, portalAction, portalPending] = useActionState(
    apneKundeportal,
    undefined,
  );

  const iProveperiode = status !== "active" && erIProveperiode(trialEndsAt);
  const dagerIgjen = proveperiodeDagerIgjen(trialEndsAt);
  const proveperiodeUtlopt =
    status !== "active" && trialEndsAt !== null && !iProveperiode;

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-neutral-200 p-5 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Status</p>
        <p className={`mt-1 text-lg font-semibold ${STATUS_FARGE[status]}`}>
          {iProveperiode ? "Prøveperiode" : STATUS_TEKST[status]}
        </p>
        {iProveperiode && (
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {dagerIgjen === 0
              ? "Utløper i dag."
              : `${dagerIgjen} ${dagerIgjen === 1 ? "dag" : "dager"} igjen.`}
          </p>
        )}
        {proveperiodeUtlopt && (
          <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
            Prøveperioden er utløpt. Start abonnement for å ta widgeten i bruk igjen.
          </p>
        )}
      </div>

      {status === "active" && harStripekunde && (
        <form action={portalAction} className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={portalPending}
            className="rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            {portalPending ? "Åpner…" : "Administrer abonnement"}
          </button>
          {portalState?.error && (
            <p className="text-sm text-red-600" role="alert">
              {portalState.error}
            </p>
          )}
        </form>
      )}

      {status !== "active" && (
        <form action={startAction} className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={startPending}
            className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {startPending ? "Starter…" : "Start abonnement – 990 kr/mnd"}
          </button>
          {startState?.error && (
            <p className="text-sm text-red-600" role="alert">
              {startState.error}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
