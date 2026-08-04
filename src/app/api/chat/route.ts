import { NextResponse, type NextRequest } from "next/server";
import { anthropic, CHAT_MODEL } from "@/lib/anthropic";
import { createAdminClient } from "@/lib/supabase/admin";
import type { KnowledgeBase } from "@/lib/types";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const USIKKER_SVAR =
  "Jeg er usikker på svaret her, en av oss tar kontakt med deg snart.";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Ugyldig forespørsel." },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const { companyId, message, sessionId } =
    (body as { companyId?: unknown; message?: unknown; sessionId?: unknown }) ??
    {};

  if (typeof companyId !== "string" || !companyId) {
    return NextResponse.json(
      { error: "Mangler companyId." },
      { status: 400, headers: CORS_HEADERS },
    );
  }
  if (typeof message !== "string" || !message.trim()) {
    return NextResponse.json(
      { error: "Mangler spørsmål." },
      { status: 400, headers: CORS_HEADERS },
    );
  }
  if (message.length > 2000) {
    return NextResponse.json(
      { error: "Spørsmålet er for langt." },
      { status: 400, headers: CORS_HEADERS },
    );
  }
  if (typeof sessionId !== "string" || !sessionId) {
    return NextResponse.json(
      { error: "Mangler sessionId." },
      { status: 400, headers: CORS_HEADERS },
    );
  }

  const supabase = createAdminClient();

  const { data: company, error: bedriftsfeil } = await supabase
    .from("companies")
    .select("id, name, subscription_status")
    .eq("id", companyId)
    .maybeSingle();

  if (bedriftsfeil) {
    console.error("Kunne ikke hente bedrift:", bedriftsfeil);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen." },
      { status: 500, headers: CORS_HEADERS },
    );
  }

  if (!company) {
    return NextResponse.json(
      { error: "Fant ikke bedriften." },
      { status: 404, headers: CORS_HEADERS },
    );
  }

  if (company.subscription_status !== "active") {
    return NextResponse.json(
      { answer: "Denne chatten er ikke tilgjengelig for øyeblikket." },
      { headers: CORS_HEADERS },
    );
  }

  const { data: kunnskapsbase } = await supabase
    .from("knowledge_base")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  const kontekst = byggKontekst(kunnskapsbase as KnowledgeBase | null);

  const systemPrompt = `Du er kundeservice-assistenten til "${company.name}", en norsk nettbutikk.

Du skal KUN svare basert på informasjonen i kunnskapsbasen nedenfor. Ikke bruk generell kunnskap, ikke gjett, og ikke finn opp informasjon som ikke står der.

Hvis svaret på kundens spørsmål ikke finnes i kunnskapsbasen, skal du svare nøyaktig med: "${USIKKER_SVAR}"

Svar alltid på norsk, kort og vennlig. Du fører en løpende samtale med kunden - bruk tidligere meldinger i samtalen til å forstå oppfølgingsspørsmål og referanser til det som ble sagt tidligere.

Kunnskapsbase:
${kontekst || "(Kunnskapsbasen er tom.)"}`;

  const { data: historikk } = await supabase
    .from("conversations")
    .select("customer_message, ai_response")
    .eq("company_id", companyId)
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true })
    .limit(10);

  const samtalemeldinger: Array<{ role: "user" | "assistant"; content: string }> =
    [];
  for (const rad of historikk ?? []) {
    samtalemeldinger.push({ role: "user", content: rad.customer_message });
    samtalemeldinger.push({ role: "assistant", content: rad.ai_response });
  }
  samtalemeldinger.push({ role: "user", content: message });

  try {
    const response = await anthropic.messages.create({
      model: CHAT_MODEL,
      max_tokens: 1024,
      thinking: { type: "disabled" },
      output_config: { effort: "low" },
      system: systemPrompt,
      messages: samtalemeldinger,
    });

    let svar = USIKKER_SVAR;
    if (response.stop_reason !== "refusal") {
      const tekstBlokk = response.content.find((block) => block.type === "text");
      svar = tekstBlokk?.type === "text" ? tekstBlokk.text : USIKKER_SVAR;
    }

    const { error: lagringsfeil } = await supabase.from("conversations").insert({
      company_id: companyId,
      session_id: sessionId,
      customer_message: message,
      ai_response: svar,
      escalated: svar.trim() === USIKKER_SVAR,
    });
    if (lagringsfeil) {
      console.error("Kunne ikke lagre samtale:", lagringsfeil);
    }

    return NextResponse.json({ answer: svar }, { headers: CORS_HEADERS });
  } catch (error) {
    console.error("Feil ved kall til Claude:", error);
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen." },
      { status: 500, headers: CORS_HEADERS },
    );
  }
}

function byggKontekst(kb: KnowledgeBase | null): string {
  if (!kb) return "";

  const deler = [
    kb.faq && `FAQ:\n${kb.faq}`,
    kb.product_info && `Produktinfo:\n${kb.product_info}`,
    kb.return_policy && `Returpolicy:\n${kb.return_policy}`,
    kb.shipping_policy && `Fraktpolicy:\n${kb.shipping_policy}`,
  ].filter(Boolean);

  return deler.join("\n\n");
}
