import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(
  _request: NextRequest,
  ctx: RouteContext<"/api/company/[id]">,
) {
  const { id } = await ctx.params;
  const supabase = createAdminClient();

  const { data: company } = await supabase
    .from("companies")
    .select("id, name, widget_color")
    .eq("id", id)
    .maybeSingle();

  if (!company) {
    return NextResponse.json(
      { error: "Fant ikke bedriften." },
      { status: 404, headers: CORS_HEADERS },
    );
  }

  return NextResponse.json(company, { headers: CORS_HEADERS });
}
