import Link from "next/link";
import { Logo } from "@/components/logo";

export default function DatabehandleravtalePage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-24">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">
          Databehandleravtale
        </h1>
        <p className="mb-10 text-sm text-neutral-500">Sist oppdatert: august 2026</p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Når du bruker Kundeservice Norge til å svare dine kunder via
            chat-widgeten, behandler vi personopplysninger om dine kunder
            (samtaledata) på dine vegne. Du er da <strong>behandlingsansvarlig</strong>{" "}
            og vi er <strong>databehandler</strong>, i tråd med personvernforordningen
            (GDPR) artikkel 28. Denne avtalen gjelder automatisk fra du tar
            tjenesten i bruk, som et tillegg til{" "}
            <Link href="/vilkar" className="font-medium text-brand hover:underline">
              vilkårene
            </Link>
            .
          </p>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              1. Formål og omfang
            </h2>
            <p>
              Vi behandler personopplysninger utelukkende for å levere
              AI-kundeservicetjenesten: motta meldinger fra dine kunder via
              chat-widgeten, generere svar basert på kunnskapsbasen du har
              lagt inn, og lagre samtalehistorikk slik at du kan følge opp og
              se statistikk.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              2. Kategorier av personopplysninger
            </h2>
            <p>
              Meldingene dine kunder selv skriver inn i chat-widgeten, samt
              tidspunkt og en anonym økt-ID. Vi ber ikke aktivt om
              identifiserende opplysninger, men kundene dine kan skrive inn
              slikt selv (f.eks. navn, ordrenummer, e-post) i meldingsteksten.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              3. Instruks
            </h2>
            <p>
              Vi behandler kun personopplysninger etter dokumenterte
              instrukser fra deg, slik disse fremgår av din bruk og
              konfigurasjon av tjenesten (kunnskapsbase, innstillinger).
              Vi bruker ikke opplysningene til egne formål, som markedsføring
              eller trening av egne AI-modeller.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              4. Underdatabehandlere
            </h2>
            <p className="mb-2">
              Vi bruker følgende underdatabehandlere for å levere tjenesten:
            </p>
            <ul className="list-disc space-y-1.5 pl-5">
              <li>
                <strong>Supabase</strong> — database og lagring av samtaledata.
              </li>
              <li>
                <strong>Anthropic</strong> — genererer AI-svar basert på
                kundens melding og din kunnskapsbase (Claude API).
              </li>
              <li>
                <strong>Resend</strong> — sender deg e-postvarsel (inkludert
                utdrag av kundens melding) når AI-assistenten ikke klarer å
                svare.
              </li>
              <li>
                <strong>Vercel</strong> — hoster applikasjonen.
              </li>
            </ul>
            <p className="mt-2">
              Vi varsler deg om vesentlige endringer i underdatabehandlere,
              slik at du kan komme med innsigelser.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              5. Sikkerhetstiltak
            </h2>
            <p>
              Data er logisk adskilt per bedrift i databasen med
              radnivå-sikkerhet (Row Level Security), slik at én bedrift ikke
              kan se en annen bedrifts data. All trafikk går over kryptert
              forbindelse (HTTPS). Tilgang til produksjonsdata er begrenset.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              6. Bistand
            </h2>
            <p>
              Vi bistår deg med rimelige midler dersom du mottar
              innsyns-, retting- eller slettekrav fra dine kunder som gjelder
              data lagret hos oss, og ved behov for å dokumentere
              sikkerhetstiltak overfor tilsynsmyndighet.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              7. Avvikshåndtering
            </h2>
            <p>
              Oppdager vi et brudd på personopplysningssikkerheten som
              berører dine data, varsler vi deg uten ugrunnet opphold, slik
              at du kan vurdere din egen varslingsplikt overfor
              Datatilsynet og eventuelt berørte kunder.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              8. Sletting ved avtaleslutt
            </h2>
            <p>
              Avslutter du kontoen din, sletter vi tilhørende samtaledata
              innen rimelig tid, med mindre lovpålagt oppbevaringsplikt
              tilsier noe annet.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Kontakt
            </h2>
            <p>
              Spørsmål om databehandlingen? Kontakt oss på{" "}
              <a
                href="mailto:kontakt@kundeservicenorge.no"
                className="font-medium text-brand hover:underline"
              >
                kontakt@kundeservicenorge.no
              </a>
              .
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-neutral-200 px-6 py-8 text-center text-xs text-neutral-500 dark:border-neutral-800">
        <Logo className="mb-3 justify-center" />
        AI-kundeservice for norske nettbutikker.
        <div className="mt-3 flex justify-center gap-4">
          <Link href="/vilkar" className="hover:underline">
            Vilkår
          </Link>
          <Link href="/personvern" className="hover:underline">
            Personvern
          </Link>
          <Link href="/databehandleravtale" className="hover:underline">
            Databehandleravtale
          </Link>
        </div>
      </footer>
    </div>
  );
}
