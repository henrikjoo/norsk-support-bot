"use server";

import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
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

  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?neste=/tilbakestill-passord`,
  });

  if (error) {
    return { error: oversettAuthFeil(error.message) };
  }

  return { success: true };
}
