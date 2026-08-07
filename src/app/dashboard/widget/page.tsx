import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import { hentOrigin } from "@/lib/origin";
import { CopyButton } from "./copy-button";
import { FargeForm } from "./farge-form";

export default async function WidgetInstallasjonPage() {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }

  const origin = await hentOrigin();
  const snippet = `<script src="${origin}/widget.js" data-company-id="${resultat.company.id}"></script>`;
  const direktelenke = `${origin}/widget?companyId=${resultat.company.id}`;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Installer widget
      </h1>
      <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        Velg metoden som passer best for hvordan nettsiden din er bygget.
      </p>

      <section className="mb-8">
        <h2 className="mb-2 text-base font-semibold">Temafarge</h2>
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          Velg fargen som matcher nettsiden din. Endringen vises med det
          samme i widgeten, uten at du behøver å lime inn koden på nytt.
        </p>
        <FargeForm farge={resultat.company.widget_color} />
      </section>

      <section className="mb-8">
        <TrinnTittel nr={1}>Har du tilgang til koden på nettsiden?</TrinnTittel>
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          Lim inn denne koden rett før{" "}
          <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
            {"</body>"}
          </code>{" "}
          på nettsiden din. Den legger til en chat-boks nederst i høyre
          hjørne på alle sider.
        </p>
        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <pre className="overflow-x-auto rounded-lg bg-neutral-100 p-3 text-xs dark:bg-neutral-900">
            <code>{snippet}</code>
          </pre>
          <div>
            <CopyButton text={snippet} />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <TrinnTittel nr={2}>
          Bruker du en nettsidebygger uten full kodetilgang?
        </TrinnTittel>
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          De fleste nettsidebyggere har en egen blokk for å lime inn
          egendefinert HTML/embed-kode, uten at du trenger å redigere resten
          av siden. Lim inn den samme koden fra punkt 1 der:
        </p>
        <ul className="flex flex-col gap-2 text-sm text-neutral-600 dark:text-neutral-400">
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">
              Shopify:
            </strong>{" "}
            Nettbutikk → Temaer → Rediger kode → legg koden i{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
              theme.liquid
            </code>{" "}
            rett før{" "}
            <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
              {"</body>"}
            </code>
            , eller bruk en «Custom HTML»-app fra App Store
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">
              Wix:
            </strong>{" "}
            Innstillinger → Egendefinert kode («Custom Code») → legg til kode
            → velg «Body – end»
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">
              WordPress:
            </strong>{" "}
            Bruk en plugin som «Insert Headers and Footers» og lim koden inn
            i footer-feltet, eller lim den inn i en «Custom HTML»-blokk i
            redigeringsverktøyet
          </li>
          <li>
            <strong className="text-neutral-900 dark:text-neutral-100">
              Squarespace:
            </strong>{" "}
            Innstillinger → Avansert → Kodeinjeksjon («Code Injection») →
            lim inn i «Footer»
          </li>
        </ul>
      </section>

      <section>
        <TrinnTittel nr={3}>Ingen kodetilgang i det hele tatt?</TrinnTittel>
        <p className="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
          Bruk denne direktelenken i stedet — den åpner chatten som en egen
          side. Legg den i menyen, som en «Kontakt oss»-knapp, i
          e-postsignaturen din, eller på sosiale medier. Krever ingen
          kodetilgang, bare at du kan legge til en vanlig lenke.
        </p>
        <div className="flex flex-col gap-3 rounded-xl border border-neutral-200 p-4 dark:border-neutral-800">
          <pre className="overflow-x-auto rounded-lg bg-neutral-100 p-3 text-xs dark:bg-neutral-900">
            <code>{direktelenke}</code>
          </pre>
          <div>
            <CopyButton text={direktelenke} />
          </div>
        </div>
      </section>
    </div>
  );
}

function TrinnTittel({ nr, children }: { nr: number; children: ReactNode }) {
  return (
    <h2 className="mb-2 flex items-center gap-2 text-base font-semibold">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-brand">
        {nr}
      </span>
      {children}
    </h2>
  );
}
