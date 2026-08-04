"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hentBedriftForInnloggetBruker } from "@/lib/company";

export type KunnskapsbaseState = { error?: string; success?: boolean } | undefined;

export async function lagreKunnskapsbase(
  _prevState: KunnskapsbaseState,
  formData: FormData,
): Promise<KunnskapsbaseState> {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    return { error: "Du må være logget inn med en registrert bedrift." };
  }

  const faq = String(formData.get("faq") ?? "");
  const productInfo = String(formData.get("product_info") ?? "");
  const returnPolicy = String(formData.get("return_policy") ?? "");
  const shippingPolicy = String(formData.get("shipping_policy") ?? "");

  const supabase = await createClient();
  const { error } = await supabase
    .from("knowledge_base")
    .update({
      faq,
      product_info: productInfo,
      return_policy: returnPolicy,
      shipping_policy: shippingPolicy,
      updated_at: new Date().toISOString(),
    })
    .eq("company_id", resultat.company.id);

  if (error) {
    return { error: "Kunne ikke lagre kunnskapsbasen. Prøv igjen." };
  }

  revalidatePath("/dashboard/kunnskapsbase");
  return { success: true };
}
