import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import type { Conversation } from "@/lib/types";

export default async function DashboardPage() {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }

  const supabase = await createClient();
  const companyId = resultat.company.id;

  const [totalResultat, eskalertResultat, sisteResultat] = await Promise.all([
    supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("company_id", companyId),
    supabase
      .from("conversations")
      .select("*", { count: "exact", head: true })
      .eq("company_id", companyId)
      .eq("escalated", true),
    supabase
      .from("conversations")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalAntall = totalResultat.count ?? 0;
  const eskalertAntall = eskalertResultat.count ?? 0;
  const sisteSamtaler = (sisteResultat.data as Conversation[] | null) ?? [];
  const eskalertAndel =
    totalAntall > 0 ? Math.round((eskalertAntall / totalAntall) * 100) : 0;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Oversikt</h1>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatKort tittel="Samtaler totalt" verdi={totalAntall} />
        <StatKort tittel="Eskalert til menneske" verdi={eskalertAntall} />
        <StatKort tittel="Andel eskalert" verdi={`${eskalertAndel}%`} />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Siste samtaler</h2>
        <Link
          href="/dashboard/samtaler"
          className="text-sm font-medium underline"
        >
          Se alle
        </Link>
      </div>

      {sisteSamtaler.length === 0 ? (
        <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
          Ingen samtaler ennå. De vises her så snart en kunde bruker widgeten.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-neutral-200 rounded-md border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {sisteSamtaler.map((s) => (
            <li key={s.id} className="p-4 text-sm">
              <p className="font-medium">{s.customer_message}</p>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                {s.ai_response}
              </p>
              {s.escalated && (
                <span className="mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  Eskalert
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatKort({ tittel, verdi }: { tittel: string; verdi: string | number }) {
  return (
    <div className="rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">{tittel}</p>
      <p className="mt-1 text-2xl font-semibold">{verdi}</p>
    </div>
  );
}
