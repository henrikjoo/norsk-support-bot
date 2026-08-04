import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Bruker service_role-nøkkelen og omgår RLS. Kun for bruk i webhooks
 * (f.eks. Stripe) der det ikke finnes en innlogget bruker-sesjon.
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
