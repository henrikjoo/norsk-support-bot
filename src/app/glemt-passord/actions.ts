"use server";

import { createClient } from "@/lib/supabase/server";
import { hentOrigin } from "@/lib/origin";
import { oversettAuthFeil } from "@/lib/supabase/feilmeldinger";

export type GlemtPassordState = { error?: string; success?: boolean } | undefined;

export async function sendTilbakestillingslenke(
  _prevState: GlemtPassordState,
  formData: FormData,
): Promise<GlemtPassordState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { error: "Fyll ut e-postadressen din." };
  }

  const origin = await hentOrigin();
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: origin,
  });

  if (error) {
    return { error: oversettAuthFeil(error.message) };
  }

  return { success: true };
}
