import type { Company } from "@/lib/types";

const PROVEPERIODE_DAGER = 14;

export function beregnProveperiodeSlutt(fra: Date = new Date()): string {
  return new Date(fra.getTime() + PROVEPERIODE_DAGER * 24 * 60 * 60 * 1000).toISOString();
}

export function harTilgang(
  company: Pick<Company, "subscription_status" | "trial_ends_at">,
): boolean {
  if (company.subscription_status === "active") return true;
  return erIProveperiode(company.trial_ends_at);
}

export function erIProveperiode(trialEndsAt: string | null): boolean {
  if (!trialEndsAt) return false;
  return new Date(trialEndsAt).getTime() > Date.now();
}

export function proveperiodeDagerIgjen(trialEndsAt: string | null): number | null {
  if (!trialEndsAt) return null;
  const msIgjen = new Date(trialEndsAt).getTime() - Date.now();
  if (msIgjen <= 0) return 0;
  return Math.ceil(msIgjen / (1000 * 60 * 60 * 24));
}
