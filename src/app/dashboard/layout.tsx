import Link from "next/link";
import { redirect } from "next/navigation";
import { hentBedriftForInnloggetBruker } from "@/lib/company";

export default async function DashboardLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const resultat = await hentBedriftForInnloggetBruker();

  if (resultat.status === "uinnlogget") {
    redirect("/logg-inn");
  }
  if (resultat.status === "mangler-bedrift") {
    redirect("/onboarding");
  }

  const { company } = resultat;

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex items-center justify-between border-b border-neutral-200 px-6 py-4 dark:border-neutral-800">
        <div>
          <p className="text-sm font-semibold">{company.name}</p>
          <nav className="mt-1 flex gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <Link href="/dashboard" className="hover:underline">
              Oversikt
            </Link>
            <Link href="/dashboard/samtaler" className="hover:underline">
              Samtaler
            </Link>
            <Link href="/dashboard/kunnskapsbase" className="hover:underline">
              Kunnskapsbase
            </Link>
            <Link href="/dashboard/widget" className="hover:underline">
              Installer widget
            </Link>
            <Link href="/dashboard/abonnement" className="hover:underline">
              Abonnement
            </Link>
          </nav>
        </div>
        <form action="/auth/logg-ut" method="post">
          <button
            type="submit"
            className="text-sm text-neutral-600 hover:underline dark:text-neutral-400"
          >
            Logg ut
          </button>
        </form>
      </header>
      <div className="flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
