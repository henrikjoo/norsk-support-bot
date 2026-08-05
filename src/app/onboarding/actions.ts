"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { beregnProveperiodeSlutt } from "@/lib/subscription";

export type OnboardingState = { error?: string } | undefined;

export async function fullforOnboarding(
  _prevState: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const name = String(formData.get("name") ?? "").trim();
  let websiteUrl = String(formData.get("website_url") ?? "").trim();

  if (!name) {
    return { error: "Fyll ut bedriftsnavn." };
  }

  if (websiteUrl && !/^https?:\/\//i.test(websiteUrl)) {
    websiteUrl = `https://${websiteUrl}`;
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
      website_url: websiteUrl || null,
      trial_ends_at: beregnProveperiodeSlutt(),
    })
    .select("id")
    .single();

  if (error || !company) {
    return { error: "Kunne ikke opprette bedriften. Prøv igjen." };
  }

  await supabase.from("knowledge_base").insert({ company_id: company.id });

  redirect("/dashboard/kunnskapsbase");
}
