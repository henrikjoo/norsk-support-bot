import Link from "next/link";
import { Logo } from "@/components/logo";

const FORDELER = [
  {
    tittel: "Svarer på sekunder",
    tekst:
      "Kundene får svar med det samme, døgnet rundt — ingen venting på e-post eller åpningstider.",
  },
  {
    tittel: "Kun basert på din info",
    tekst:
      "AI-en svarer utelukkende ut fra FAQ og policy du selv legger inn. Usikker på svaret? Den sier ifra i stedet for å gjette.",
  },
  {
    tittel: "Oppe på minutter",
    tekst:
      "Lim inn én kodesnutt på nettsiden din, eller del en direktelenke. Ingen utvikler nødvendig.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Logo />
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/logg-inn"
            className="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
          >
            Logg inn
          </Link>
          <Link
            href="/registrer"
            className="rounded-md bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          >
            Kom i gang
          </Link>
        </nav>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 pb-24">
        <section className="flex max-w-2xl flex-col items-center gap-6 pt-16 pb-20 text-center sm:pt-24">
          <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">
            Bygget for norske nettbutikker
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            AI-kundeservice som faktisk svarer riktig
          </h1>
          <p className="max-w-lg text-base text-neutral-600 sm:text-lg dark:text-neutral-400">
            Svar kundene dine automatisk, 24/7, basert på din egen FAQ og
            policy — uten å måtte betale for Zendesk eller Intercom.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/registrer"
              className="rounded-md bg-brand px-6 py-3 text-sm font-medium text-brand-foreground hover:opacity-90"
            >
              Kom i gang gratis
            </Link>
            <Link
              href="/logg-inn"
              className="rounded-md border border-neutral-300 px-6 py-3 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
            >
              Logg inn
            </Link>
          </div>
          <p className="text-xs text-neutral-500">
            14 dager gratis prøveperiode · 990 kr/mnd · ingen bindingstid
          </p>
        </section>

        <section className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
          {FORDELER.map((f) => (
            <div
              key={f.tittel}
              className="rounded-xl border border-neutral-200 p-6 dark:border-neutral-800"
            >
              <h2 className="mb-2 text-sm font-semibold">{f.tittel}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {f.tekst}
              </p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-neutral-200 px-6 py-8 text-center text-xs text-neutral-500 dark:border-neutral-800">
        <Logo className="mb-3 justify-center" />
        AI-kundeservice for norske nettbutikker.
      </footer>
    </div>
  );
}
