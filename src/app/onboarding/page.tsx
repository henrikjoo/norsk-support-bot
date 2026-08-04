import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { OnboardingForm } from "./onboarding-form";

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
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">
          Fortell oss om bedriften din
        </h1>
        <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
          Dette hjelper oss å sette opp AI-assistenten din riktig.
        </p>
        <OnboardingForm />
      </div>
    </main>
  );
}
