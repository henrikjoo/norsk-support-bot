"use client";

import { useActionState } from "react";
import { startAbonnement, apneKundeportal } from "./actions";
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
}: {
  status: SubscriptionStatus;
  harStripekunde: boolean;
}) {
  const [startState, startAction, startPending] = useActionState(
    startAbonnement,
    undefined,
  );
  const [portalState, portalAction, portalPending] = useActionState(
    apneKundeportal,
    undefined,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Status</p>
        <p className={`mt-1 text-lg font-semibold ${STATUS_FARGE[status]}`}>
          {STATUS_TEKST[status]}
        </p>
      </div>

      {status === "active" && harStripekunde && (
        <form action={portalAction} className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={portalPending}
            className="rounded-md border border-neutral-300 px-4 py-2.5 text-sm font-medium hover:bg-neutral-50 disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
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
            className="rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
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
