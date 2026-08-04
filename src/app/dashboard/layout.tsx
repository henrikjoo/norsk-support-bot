import Link from "next/link";
import { redirect } from "next/navigation";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import { Logo } from "@/components/logo";
import { DashboardNav } from "./dashboard-nav";

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
      <header className="border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/dashboard">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-neutral-500 sm:inline">
              {company.name}
            </span>
            <form action="/auth/logg-ut" method="post">
              <button
                type="submit"
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                Logg ut
              </button>
            </form>
          </div>
        </div>
        <div className="px-6 pb-3">
          <DashboardNav />
        </div>
      </header>
      <div className="flex-1 px-6 py-8">{children}</div>
    </div>
  );
}
