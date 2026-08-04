"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { oversettAuthFeil } from "@/lib/supabase/feilmeldinger";

export type LoggInnState = { error?: string } | undefined;

export async function loggInn(
  _prevState: LoggInnState,
  formData: FormData,
): Promise<LoggInnState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const neste = String(formData.get("neste") ?? "/dashboard");

  if (!email || !password) {
    return { error: "Fyll ut e-post og passord." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: oversettAuthFeil(error.message) };
  }

  redirect(neste.startsWith("/") ? neste : "/dashboard");
}
