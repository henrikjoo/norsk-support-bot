import { redirect } from "next/navigation";
import { hentBedriftForInnloggetBruker } from "@/lib/company";
import { hentOrigin } from "@/lib/origin";
import { CopyButton } from "./copy-button";

export default async function WidgetInstallasjonPage() {
  const resultat = await hentBedriftForInnloggetBruker();
  if (resultat.status !== "ok") {
    redirect(resultat.status === "uinnlogget" ? "/logg-inn" : "/onboarding");
  }

  const origin = await hentOrigin();
  const snippet = `<script src="${origin}/widget.js" data-company-id="${resultat.company.id}"></script>`;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Installer widget
      </h1>
      <p className="mb-6 text-sm text-neutral-600 dark:text-neutral-400">
        Lim inn denne koden rett før{" "}
        <code className="rounded bg-neutral-100 px-1 py-0.5 dark:bg-neutral-800">
          {"</body>"}
        </code>{" "}
        på nettsiden din. Den legger til en chat-boks nederst i høyre hjørne.
      </p>

      <div className="flex flex-col gap-3 rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
        <pre className="overflow-x-auto rounded-md bg-neutral-100 p-3 text-xs dark:bg-neutral-900">
          <code>{snippet}</code>
        </pre>
        <div>
          <CopyButton text={snippet} />
        </div>
      </div>
    </div>
  );
}
