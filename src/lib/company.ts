import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Company } from "@/lib/types";

type BedriftResultat =
  | { status: "uinnlogget" }
  | { status: "mangler-bedrift" }
  | { status: "ok"; company: Company };

export const hentBedriftForInnloggetBruker = cache(
  async (): Promise<BedriftResultat> => {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { status: "uinnlogget" };
    }

    const { data: company } = await supabase
      .from("companies")
      .select("*")
      .eq("owner_id", user.id)
      .maybeSingle();

    if (!company) {
      return { status: "mangler-bedrift" };
    }

    return { status: "ok", company: company as Company };
  },
);
