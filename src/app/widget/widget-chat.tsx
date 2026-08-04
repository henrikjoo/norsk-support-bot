"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

type Melding = { rolle: "bruker" | "assistent"; tekst: string };

export function WidgetChat() {
  const searchParams = useSearchParams();
  const companyId = searchParams.get("companyId") ?? "";

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
        body: JSON.stringify({ companyId, message: tekst }),
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
      <header className="border-b border-neutral-200 px-4 py-3">
        <p className="text-sm font-semibold">{bedriftsnavn}</p>
        <p className="text-xs text-neutral-500">Vanligvis svarer vi med det samme</p>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
        {meldinger.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.rolle === "bruker" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                m.rolle === "bruker"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 text-neutral-900"
              }`}
            >
              {m.tekst}
            </div>
          </div>
        ))}
        {sender && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-2xl bg-neutral-100 px-3 py-2 text-sm text-neutral-500">
              Skriver…
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
          className="flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none focus:border-neutral-500 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={sender || !input.trim()}
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
