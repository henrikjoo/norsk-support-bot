"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hentBedriftForInnloggetBruker } from "@/lib/company";

export type SvarState = { error?: string; success?: boolean } | undefined;

export async function sendMenneskeligSvar(
  _prevState: SvarState,
  formData: FormData,
): Promise<SvarState> {
  const sessionId = String(formData.get("sessionId") ?? "");
  const tekst = String(formData.get("svar") ?? "").trim();

  if (!tekst) {
    return { error: "Skriv inn et svar." };
  }

  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    return { error: "Du må være logget inn med en registrert bedrift." };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("conversations").insert({
    company_id: resultat.company.id,
    session_id: sessionId,
    customer_message: "",
    ai_response: tekst,
    escalated: false,
    answered_by: "human",
  });

  if (error) {
    return { error: "Kunne ikke sende svaret. Prøv igjen." };
  }

  revalidatePath("/dashboard/samtaler");
  return { success: true };
}
