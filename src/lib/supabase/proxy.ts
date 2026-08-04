import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const BESKYTTEDE_STIER = ["/dashboard", "/onboarding"];

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const krevesInnlogging = BESKYTTEDE_STIER.some((sti) =>
    path.startsWith(sti),
  );

  if (!user && krevesInnlogging) {
    const url = request.nextUrl.clone();
    url.pathname = "/logg-inn";
    url.searchParams.set("neste", path);
    return NextResponse.redirect(url);
  }

  const ABONNEMENT_STI = "/dashboard/abonnement";
  if (user && path.startsWith("/dashboard") && path !== ABONNEMENT_STI) {
    const { data: company } = await supabase
      .from("companies")
      .select("subscription_status")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (company && company.subscription_status !== "active") {
      const url = request.nextUrl.clone();
      url.pathname = ABONNEMENT_STI;
      return NextResponse.redirect(url);
    }
  }

  return response;
}
