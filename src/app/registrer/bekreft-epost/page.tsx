export default function BekreftEpostPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Sjekk e-posten din</h1>
      <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        Vi har sendt deg en bekreftelseslenke. Klikk på lenken i e-posten for
        å aktivere kontoen og fortsette registreringen.
      </p>
    </main>
  );
}
