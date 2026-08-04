import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const nesteParam = searchParams.get("neste") ?? "/onboarding";
  const neste = nesteParam.startsWith("/") ? nesteParam : "/onboarding";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${neste}`);
    }
  }

  return NextResponse.redirect(
    `${origin}/logg-inn?feil=Bekreftelseslenken er ugyldig eller utløpt.`,
  );
}
