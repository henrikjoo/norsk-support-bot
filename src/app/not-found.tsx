import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-24 text-center">
      <Link href="/" className="mb-4">
        <Logo />
      </Link>
      <p className="text-sm font-semibold text-brand">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">
        Siden finnes ikke
      </h1>
      <p className="max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        Vi fant ikke siden du lette etter. Den kan ha blitt flyttet eller
        fjernet.
      </p>
      <Link
        href="/"
        className="mt-3 rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition hover:opacity-90"
      >
        Til forsiden
      </Link>
    </main>
  );
}
