"use server";

import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { hentOrigin } from "@/lib/origin";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import { proveperiodeDagerIgjen } from "@/lib/subscription";

export type AbonnementState = { error?: string } | undefined;

export async function startAbonnement(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kreves av useActionState sin signatur
  _prevState: AbonnementState,
): Promise<AbonnementState> {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }
  const { company } = resultat;
  const origin = await hentOrigin();
  const dagerIgjen = proveperiodeDagerIgjen(company.trial_ends_at);

  let checkoutUrl: string | null;
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${origin}/dashboard/abonnement?status=success`,
      cancel_url: `${origin}/dashboard/abonnement?status=avbrutt`,
      allow_promotion_codes: true,
      client_reference_id: company.id,
      customer: company.stripe_customer_id ?? undefined,
      subscription_data: {
        metadata: { company_id: company.id },
        ...(dagerIgjen && dagerIgjen > 0 ? { trial_period_days: dagerIgjen } : {}),
      },
      metadata: { company_id: company.id },
    });
    checkoutUrl = session.url;
  } catch (error) {
    console.error("Stripe checkout-feil:", error);
    return { error: "Kunne ikke starte abonnement. Prøv igjen senere." };
  }

  if (!checkoutUrl) {
    return { error: "Kunne ikke starte abonnement. Prøv igjen senere." };
  }
  redirect(checkoutUrl);
}

export async function apneKundeportal(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- kreves av useActionState sin signatur
  _prevState: AbonnementState,
): Promise<AbonnementState> {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }
  const { company } = resultat;

  if (!company.stripe_customer_id) {
    return { error: "Fant ingen aktiv Stripe-kunde." };
  }

  const origin = await hentOrigin();

  let portalUrl: string | null;
  try {
    const stripe = getStripe();
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: company.stripe_customer_id,
      return_url: `${origin}/dashboard/abonnement`,
    });
    portalUrl = portalSession.url;
  } catch (error) {
    console.error("Stripe kundeportal-feil:", error);
    return { error: "Kunne ikke åpne kundeportalen. Prøv igjen senere." };
  }

  redirect(portalUrl);
}
