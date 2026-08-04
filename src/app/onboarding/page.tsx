import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";
import { AuthShell } from "@/components/auth-shell";

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logg-inn");
  }

  const { data: eksisterendeBedrift } = await supabase
    .from("companies")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (eksisterendeBedrift) {
    redirect("/dashboard/kunnskapsbase");
  }

  return (
    <AuthShell
      tittel="Fortell oss om bedriften din"
      undertekst="Dette hjelper oss å sette opp AI-assistenten din riktig."
    >
      <OnboardingForm />
    </AuthShell>
  );
}
