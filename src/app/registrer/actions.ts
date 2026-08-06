"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { hentOrigin } from "@/lib/origin";
import { oversettAuthFeil } from "@/lib/supabase/feilmeldinger";

export type RegistrerState = { error?: string } | undefined;

export async function registrerBedrift(
  _prevState: RegistrerState,
  formData: FormData,
): Promise<RegistrerState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Fyll ut e-post og passord." };
  }
  if (password.length < 8) {
    return { error: "Passordet må være minst 8 tegn." };
  }

  const origin = await hentOrigin();
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: origin,
    },
  });

  if (error) {
    return { error: oversettAuthFeil(error.message) };
  }

  if (data.session) {
    redirect("/onboarding");
  }

  redirect("/registrer/bekreft-epost");
}
