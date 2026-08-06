import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

const NESTE_FOR_TYPE: Partial<Record<EmailOtpType, string>> = {
  signup: "/onboarding",
  recovery: "/tilbakestill-passord",
};

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      const neste = NESTE_FOR_TYPE[type] ?? "/onboarding";
      return NextResponse.redirect(`${origin}${neste}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/logg-inn?feil=Bekreftelseslenken er ugyldig eller utløpt.`,
  );
}
