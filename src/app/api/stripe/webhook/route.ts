import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import type { SubscriptionStatus } from "@/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signatur = request.headers.get("stripe-signature");

  if (!signatur) {
    return NextResponse.json({ error: "Mangler signatur." }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signatur,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("Ugyldig Stripe-webhook-signatur:", error);
    return NextResponse.json({ error: "Ugyldig signatur." }, { status: 400 });
  }

  const supabase = createAdminClient();

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const companyId = session.metadata?.company_id ?? session.client_reference_id;

      if (companyId && session.customer && session.subscription) {
        const { error } = await supabase
          .from("companies")
          .update({
            subscription_status: "active",
            stripe_customer_id: String(session.customer),
            stripe_subscription_id: String(session.subscription),
          })
          .eq("id", companyId);
        if (error) console.error("Kunne ikke oppdatere bedrift etter checkout:", error);
      }
      break;
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object;
      const status = oversettStripeStatus(subscription.status, event.type);
      const companyId = subscription.metadata?.company_id;

      const oppdatering = supabase
        .from("companies")
        .update({ subscription_status: status });

      const { error } = companyId
        ? await oppdatering.eq("id", companyId)
        : await oppdatering.eq("stripe_customer_id", String(subscription.customer));

      if (error) console.error("Kunne ikke oppdatere abonnementsstatus:", error);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}

function oversettStripeStatus(
  stripeStatus: Stripe.Subscription.Status,
  eventType: string,
): SubscriptionStatus {
  if (eventType === "customer.subscription.deleted") return "canceled";

  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete_expired":
      return "canceled";
    default:
      return "inactive";
  }
}
