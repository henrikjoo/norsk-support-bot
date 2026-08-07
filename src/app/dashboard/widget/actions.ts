"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { hentBedriftForInnloggetBruker } from "@/lib/company";

export type FargeState = { error?: string; success?: boolean } | undefined;

export async function lagreWidgetFarge(
  _prevState: FargeState,
  formData: FormData,
): Promise<FargeState> {
  const farge = String(formData.get("widget_color") ?? "").trim();

  if (!/^#[0-9a-fA-F]{6}$/.test(farge)) {
    return { error: "Ugyldig farge." };
  }

  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    return { error: "Du må være logget inn med en registrert bedrift." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("companies")
    .update({ widget_color: farge })
    .eq("id", resultat.company.id);

  if (error) {
    return { error: "Kunne ikke lagre fargen. Prøv igjen." };
  }

  revalidatePath("/dashboard/widget");
  return { success: true };
}
