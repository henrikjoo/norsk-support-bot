"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { beregnProveperiodeSlutt } from "@/lib/subscription";
import { sendNyKundeVarsel } from "@/lib/resend";

export type OnboardingState = { error?: string } | undefined;

export async function fullforOnboarding(
  _prevState: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const name = String(formData.get("name") ?? "").trim();

  if (!name) {
    return { error: "Fyll ut bedriftsnavn." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logg-inn");
  }

  const { data: company, error } = await supabase
    .from("companies")
    .insert({
      owner_id: user.id,
      name,
      trial_ends_at: beregnProveperiodeSlutt(),
    })
    .select("id")
    .single();

  if (error || !company) {
    return { error: "Kunne ikke opprette bedriften. Prøv igjen." };
  }

  await supabase.from("knowledge_base").insert({ company_id: company.id });
  await sendNyKundeVarsel({ bedriftsnavn: name });

  redirect("/dashboard/kunnskapsbase");
}
