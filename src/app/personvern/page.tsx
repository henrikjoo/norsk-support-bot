import Link from "next/link";
import { Logo } from "@/components/logo";

export default function PersonvernPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-24">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          Personvernerklæring
        </h1>
        <p className="mb-10 text-sm text-neutral-500">Sist oppdatert: august 2026</p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Kundeservice Norge ("vi", "oss") leverer AI-basert kundeservice til norske
            nettbutikker. Denne personvernerklæringen forklarer hvilke
            opplysninger vi behandler, hvorfor, og hvilke rettigheter du har.
          </p>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Hvilke opplysninger vi behandler
            </h2>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Kontoopplysninger:</strong> e-postadresse og passord
                (passordet lagres kryptert og er ikke tilgjengelig for oss)
                når du registrerer en bedriftskonto.
              </li>
              <li>
                <strong>Bedriftsopplysninger:</strong> bedriftsnavn og
                nettside-URL, samt innholdet du selv legger inn i
                kunnskapsbasen (FAQ, produktinfo, retur- og fraktpolicy).
              </li>
              <li>
                <strong>Samtaledata:</strong> meldinger sendt av dine kunder
                til chat-widgeten, og svarene AI-assistenten gir, slik at du
                kan følge med på og forbedre kundeservicen din.
              </li>
              <li>
                <strong>Betalingsopplysninger:</strong> håndteres av Stripe —
                vi lagrer ikke kortnummer eller annen betalingsinformasjon
                selv.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Hvorfor vi behandler opplysningene
            </h2>
            <p>
              Vi bruker opplysningene til å levere tjenesten (drifte
              kundekontoen din, generere AI-svar til dine kunder basert på
              kunnskapsbasen din, vise deg statistikk og samtalehistorikk),
              til fakturering, og til å oppfylle lovpålagte krav.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Databehandlere vi bruker
            </h2>
            <p className="mb-2">
              Vi deler opplysninger med følgende underleverandører, kun i den
              grad det er nødvendig for å levere tjenesten:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Supabase</strong> — database, innlogging og lagring av
                konto-, bedrifts- og samtaledata.
              </li>
              <li>
                <strong>Anthropic</strong> — behandler samtaleinnholdet for å
                generere AI-svar (Claude API).
              </li>
              <li>
                <strong>Stripe</strong> — behandler betaling og abonnement.
              </li>
              <li>
                <strong>Resend</strong> — sender e-post ved registrering og
                passordtilbakestilling.
              </li>
              <li>
                <strong>Vercel</strong> — hoster nettsiden og applikasjonen.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Hvor lenge vi lagrer opplysningene
            </h2>
            <p>
              Vi lagrer opplysningene så lenge kontoen din er aktiv. Sletter
              du kontoen, eller ber oss om det, sletter vi tilhørende
              bedrifts- og samtaledata innen rimelig tid, med mindre vi er
              lovpålagt å oppbevare enkelte opplysninger lenger (f.eks.
              regnskapsbilag).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Dine rettigheter
            </h2>
            <p>
              Du har rett til innsyn i, retting av og sletting av dine
              personopplysninger, samt rett til å be om at behandlingen
              begrenses. Ta kontakt med oss for å benytte deg av disse
              rettighetene, eller hvis du har spørsmål om behandlingen av
              opplysningene dine.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Kontakt
            </h2>
            <p>
              Har du spørsmål om personvern, kontakt oss på{" "}
              <a
                href="mailto:kontakt@norsk-support-bot.no"
                className="font-medium text-brand hover:underline"
              >
                kontakt@norsk-support-bot.no
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-200 px-6 py-8 text-center text-xs text-neutral-500 dark:border-neutral-800">
        <Logo className="mb-3 justify-center" />
        AI-kundeservice for norske nettbutikker.
      </footer>
    </div>
  );
}
