import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import type { Conversation } from "@/lib/types";

export default async function SamtalerPage() {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("conversations")
    .select("*")
    .eq("company_id", resultat.company.id)
    .order("created_at", { ascending: false })
    .limit(100);

  const samtaler = (data as Conversation[] | null) ?? [];

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Samtaler</h1>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        De siste {samtaler.length > 0 ? samtaler.length : ""} kundehenvendelsene
        fra widgeten din.
      </p>

      {samtaler.length === 0 ? (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Ingen samtaler ennå.
        </p>
      ) : (
        <ul className="divide-y divide-neutral-200 rounded-md border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
          {samtaler.map((s) => (
            <li key={s.id} className="p-4">
              <div className="mb-1 flex items-center justify-between gap-2">
                <p className="text-xs text-neutral-500">
                  {new Date(s.created_at).toLocaleString("nb-NO")}
                </p>
                {s.escalated && (
                  <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    Eskalert
                  </span>
                )}
              </div>
              <p className="text-sm font-medium">{s.customer_message}</p>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                {s.ai_response}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
