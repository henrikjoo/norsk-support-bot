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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const companyId = searchParams.get("companyId");
  const sessionId = searchParams.get("sessionId");
  const after = searchParams.get("after");

  if (!companyId || !sessionId || !after) {
    return NextResponse.json(
      { error: "Mangler parametre." },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("conversations")
    .select("id, ai_response, created_at")
    .eq("company_id", companyId)
    .eq("session_id", sessionId)
    .eq("answered_by", "human")
    .gt("created_at", after)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json(
      { error: "Noe gikk galt." },
      { status: 500, headers: CORS_HEADERS },
    );
  }

  return NextResponse.json({ svar: data ?? [] }, { headers: CORS_HEADERS });
}
