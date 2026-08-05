"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { oversettAuthFeil } from "@/lib/supabase/feilmeldinger";

export type TilbakestillPassordState = { error?: string } | undefined;

export async function tilbakestillPassord(
  _prevState: TilbakestillPassordState,
  formData: FormData,
): Promise<TilbakestillPassordState> {
  const password = String(formData.get("password") ?? "");

  if (password.length < 8) {
    return { error: "Passordet må være minst 8 tegn." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: oversettAuthFeil(error.message) };
  }

  redirect("/dashboard");
}
