import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import { KunnskapsbaseForm } from "./kunnskapsbase-form";
import type { KnowledgeBase } from "@/lib/types";

export default async function KunnskapsbasePage() {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }

  const supabase = await createClient();
  const { data: kunnskapsbase } = await supabase
    .from("knowledge_base")
    .select("*")
    .eq("company_id", resultat.company.id)
    .maybeSingle();

  const tom: KnowledgeBase = {
    company_id: resultat.company.id,
    faq: "",
    product_info: "",
    return_policy: "",
    shipping_policy: "",
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Kunnskapsbase
      </h1>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        Dette er informasjonen AI-assistenten din svarer kunder ut ifra.
        Jo mer utfyllende, jo bedre svar.
      </p>
      <KunnskapsbaseForm kunnskapsbase={(kunnskapsbase as KnowledgeBase) ?? tom} />
    </div>
  );
}
