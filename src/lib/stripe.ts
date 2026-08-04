import "server-only";
import Stripe from "stripe";

export function getStripe(): Stripe {
  const apiKey = process.env.STRIPE_SECRET_KEY;
  if (!apiKey) {
    throw new Error("STRIPE_SECRET_KEY er ikke satt.");
  }
  return new Stripe(apiKey);
}
