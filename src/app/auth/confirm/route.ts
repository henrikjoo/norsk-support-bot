import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const redirectToParam = searchParams.get("redirect_to") ?? "/onboarding";
  const neste = redirectToParam.startsWith("/")
    ? redirectToParam
    : new URL(redirectToParam).pathname + new URL(redirectToParam).search;

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      return NextResponse.redirect(`${origin}${neste}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/logg-inn?feil=Bekreftelseslenken er ugyldig eller utløpt.`,
  );
}
