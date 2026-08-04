import { redirect } from "next/navigation";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import { AbonnementForm } from "./abonnement-form";

export default async function AbonnementPage() {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }
  const { company } = resultat;

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">Abonnement</h1>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        990 kr/mnd, ingen bindingstid. Du trenger et aktivt abonnement for å
        bruke dashbordet og AI-assistenten på nettsiden din.
      </p>
      <AbonnementForm
        status={company.subscription_status}
        harStripekunde={Boolean(company.stripe_customer_id)}
      />
    </div>
  );
}
