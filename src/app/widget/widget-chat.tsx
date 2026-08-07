"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Melding = { rolle: "bruker" | "assistent" | "menneske"; tekst: string };

export function WidgetChat() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") ?? "";

  const [sessionId] = useState(() => crypto.randomUUID());
  const [bedriftsnavn, setBedriftsnavn] = useState<string>("Kundeservice");
  const [meldinger, setMeldinger] = useState<Melding[]>([
    {
      rolle: "assistent",
      tekst: "Hei! Spør meg om noe, så gjør jeg mitt beste for å hjelpe deg.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sender, setSender] = useState(false);
  const bunnRef = useRef<HTMLDivElement>(null);
  const sisteSjekkRef = useRef<string>(new Date().toISOString());

  useEffect(() => {
    if (!companyId) return;
    fetch(`/api/company/${companyId}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.name) setBedriftsnavn(data.name);
      })
      .catch(() => {});
  }, [companyId]);

  useEffect(() => {
    bunnRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [meldinger]);

  useEffect(() => {
    if (!companyId) return;

    const intervall = setInterval(async () => {
      try {
        const res = await fetch(
          `/api/chat/poll?companyId=${encodeURIComponent(companyId)}&sessionId=${encodeURIComponent(
            sessionId,
          )}&after=${encodeURIComponent(sisteSjekkRef.current)}`,
        );
        if (!res.ok) return;
        const data = await res.json();
        const nye: Array<{ ai_response: string; created_at: string }> = data.svar ?? [];
        if (nye.length > 0) {
          setMeldinger((prev) => [
            ...prev,
            ...nye.map((n) => ({ rolle: "menneske" as const, tekst: n.ai_response })),
          ]);
          sisteSjekkRef.current = nye[nye.length - 1].created_at;
        }
      } catch {
        // stille feil, prøver igjen ved neste intervall
      }
    }, 5000);

    return () => clearInterval(intervall);
  }, [companyId, sessionId]);

  async function sendMelding(e: React.FormEvent) {
    e.preventDefault();
    const tekst = input.trim();
    if (!tekst || sender || !companyId) return;

    setMeldinger((prev) => [...prev, { rolle: "bruker", tekst }]);
    setInput("");
    setSender(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, message: tekst, sessionId }),
      });
      const data = await res.json();
      const svar: string = res.ok
        ? data.answer
        : "Beklager, noe gikk galt. Prøv igjen om litt.";
      setMeldinger((prev) => [...prev, { rolle: "assistent", tekst: svar }]);
    } catch {
      setMeldinger((prev) => [
        ...prev,
        { rolle: "assistent", tekst: "Beklager, noe gikk galt. Prøv igjen om litt." },
      ]);
    } finally {
      setSender(false);
    }
  }

  if (!companyId) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-sm text-neutral-500">
        Mangler bedrifts-ID. Sjekk embed-koden.
      </div>
    );
  }

  return (
    <div className="flex h-dvh flex-col bg-white">
      <header className="flex items-center gap-3 bg-gradient-to-br from-brand to-brand/85 px-4 py-3.5 text-brand-foreground">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15">
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path
              d="M4 5.5C4 4.67 4.67 4 5.5 4h13c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5H9l-4 4v-4H5.5A1.5 1.5 0 0 1 4 14.5v-9Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{bedriftsnavn}</p>
          <p className="truncate text-xs opacity-80">
            AI svarer deg — usikker på noe? Da tar et menneske over
          </p>
        </div>
      </header>

      <p className="border-b border-neutral-100 bg-neutral-50 px-4 py-1.5 text-center text-[11px] text-neutral-400">
        {bedriftsnavn} kan se denne samtalen
      </p>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {meldinger.map((m, i) => (
          <div
            key={i}
            className={`flex animate-[melding-inn_0.25s_ease-out] ${
              m.rolle === "bruker" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="max-w-[85%]">
              {m.rolle === "menneske" && (
                <p className="mb-1 text-xs font-medium text-neutral-500">
                  {bedriftsnavn} (svarer direkte)
                </p>
              )}
              <div
                className={`px-3 py-2 text-sm shadow-sm ${
                  m.rolle === "bruker"
                    ? "rounded-2xl rounded-br-md bg-brand text-brand-foreground"
                    : m.rolle === "menneske"
                      ? "rounded-2xl rounded-bl-md bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-200"
                      : "rounded-2xl rounded-bl-md bg-neutral-100 text-neutral-900"
                }`}
              >
                {m.tekst}
              </div>
            </div>
          </div>
        ))}
        {sender && (
          <div className="flex justify-start">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-neutral-100 px-3.5 py-3">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400" />
            </div>
          </div>
        )}
        <div ref={bunnRef} />
      </div>

      <form onSubmit={sendMelding} className="flex gap-2 border-t border-neutral-200 p-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Skriv en melding…"
          disabled={sender}
          className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={sender || !input.trim()}
          aria-label="Send melding"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand text-brand-foreground transition hover:opacity-90 disabled:opacity-40"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M2.94 2.06 17.94 9.4a1 1 0 0 1 0 1.79L2.94 18.5a1 1 0 0 1-1.44-1.11L3.6 10 1.5 3.17a1 1 0 0 1 1.44-1.11Z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
