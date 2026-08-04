import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <div className="flex max-w-xl flex-col gap-4">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          AI-kundeservice for norske nettbutikker
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400">
          Svar kundene dine automatisk, 24/7, basert på din egen FAQ og
          policy — uten å måtte betale for Zendesk eller Intercom.
        </p>
      </div>
      <div className="flex gap-3">
        <Link
          href="/registrer"
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        >
          Kom i gang
        </Link>
        <Link
          href="/logg-inn"
          className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
        >
          Logg inn
        </Link>
      </div>
    </main>
  );
}
