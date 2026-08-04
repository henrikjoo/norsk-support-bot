import { AuthShell } from "@/components/auth-shell";

export default function BekreftEpostPage() {
  return (
    <AuthShell tittel="Sjekk e-posten din">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Vi har sendt deg en bekreftelseslenke. Klikk på lenken i e-posten for
        å aktivere kontoen og fortsette registreringen.
      </p>
    </AuthShell>
  );
}
