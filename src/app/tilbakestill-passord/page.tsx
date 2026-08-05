import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TilbakestillPassordForm } from "./tilbakestill-passord-form";

export default async function TilbakestillPassordPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logg-inn");
  }

  return <TilbakestillPassordForm />;
}
