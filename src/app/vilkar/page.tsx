import Link from "next/link";
import { Logo } from "@/components/logo";

export default function VilkarPage() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-24">
        <h1 className="mb-2 text-3xl font-semibold tracking-tight">Vilkår</h1>
        <p className="mb-10 text-sm text-neutral-500">Sist oppdatert: august 2026</p>

        <div className="flex flex-col gap-8 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          <p>
            Disse vilkårene gjelder for bruk av Kundeservice Norge, en
            AI-basert kundeserviceløsning for norske nettbutikker. Ved å
            opprette en konto godtar du disse vilkårene.
          </p>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              1. Tjenesten
            </h2>
            <p>
              Kundeservice Norge lar deg legge inn en kunnskapsbase (FAQ,
              produktinfo, retur- og fraktpolicy) som en AI-assistent bruker
              til å svare kundene dine automatisk via en chat-widget du
              installerer på nettsiden din.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              2. Priser og betaling
            </h2>
            <p>
              Tjenesten koster 990 kr/mnd. Nye kontoer får 14 dagers gratis
              prøveperiode uten krav om betalingskort. Etter prøveperioden må
              du ha et aktivt abonnement for at chat-widgeten skal fortsette å
              svare kundene dine. Betaling håndteres av Stripe.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              3. Oppsigelse
            </h2>
            <p>
              Det er ingen bindingstid. Du kan si opp abonnementet når som
              helst fra dashbordet ditt, og beholder tilgang ut inneværende
              betalte periode. Vi refunderer ikke allerede betalte perioder.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              4. Ditt ansvar
            </h2>
            <p>
              Du er selv ansvarlig for at innholdet du legger inn i
              kunnskapsbasen er korrekt, oppdatert og lovlig. AI-assistenten
              svarer kun ut fra det du selv har lagt inn — den finner ikke
              opp informasjon, men kan likevel gjøre feil eller misforstå.
              Kontroller jevnlig at svarene den gir er riktige.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              5. Vår leveranse
            </h2>
            <p>
              Vi tilstreber høy oppetid, men leverer tjenesten "som den er"
              uten garanti for at den er feilfri eller tilgjengelig til enhver
              tid. Vi er ikke ansvarlige for feil eller mangler hos våre
              underleverandører (Supabase, Anthropic, Stripe, Resend, Vercel).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              6. Ansvarsbegrensning
            </h2>
            <p>
              Vårt samlede erstatningsansvar overfor deg er uansett
              grunnlag begrenset til det beløpet du har betalt for tjenesten
              de siste 12 månedene. Vi er ikke ansvarlige for indirekte tap,
              følgeskader eller tapt fortjeneste.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              7. Rettigheter
            </h2>
            <p>
              Du beholder alle rettigheter til innholdet du legger inn
              (kunnskapsbase, bedriftsinformasjon). Vi beholder alle
              rettigheter til selve plattformen og programvaren.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              8. Endringer
            </h2>
            <p>
              Vi kan oppdatere disse vilkårene fra tid til annen. Ved
              vesentlige endringer varsler vi deg på e-post eller i
              dashbordet.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              9. Lovvalg
            </h2>
            <p>
              Disse vilkårene er underlagt norsk rett. Tvister søkes løst i
              minnelighet, subsidiært ved norske domstoler.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-base font-semibold text-neutral-900 dark:text-neutral-100">
              Kontakt
            </h2>
            <p>
              Spørsmål om vilkårene? Kontakt oss på{" "}
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
