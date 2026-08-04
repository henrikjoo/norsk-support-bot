import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import { grupperISamtaler } from "@/lib/samtaler";
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
    .limit(500);

  const rader = (data as Conversation[] | null) ?? [];
  const samtaler = grupperISamtaler(rader).slice(0, 50);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Samtaler</h1>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        De siste {samtaler.length > 0 ? samtaler.length : ""} samtalene fra
        widgeten din.
      </p>

      {samtaler.length === 0 ? (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Ingen samtaler ennå.
        </p>
      ) : (
        <ul className="flex flex-col gap-4">
          {samtaler.map((s) => (
            <li
              key={s.sessionId}
              className="rounded-md border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-center justify-between gap-2 border-b border-neutral-200 px-4 py-2.5 dark:border-neutral-800">
                <p className="text-xs text-neutral-500">
                  {new Date(s.forsteTidspunkt).toLocaleString("nb-NO")}
                  {" · "}
                  {s.meldinger.length}{" "}
                  {s.meldinger.length === 1 ? "melding" : "meldinger"}
                </p>
                {s.eskalert && (
                  <span className="inline-block rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                    Eskalert
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-3 p-4">
                {s.meldinger.map((m) => (
                  <div key={m.id} className="flex flex-col gap-1.5">
                    <p className="text-sm font-medium">{m.customer_message}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {m.ai_response}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
