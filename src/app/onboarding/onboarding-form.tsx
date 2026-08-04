"use client";

import { useActionState } from "react";
import { fullforOnboarding } from "./actions";

export function OnboardingForm() {
  const [state, action, pending] = useActionState(fullforOnboarding, undefined);

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Bedriftsnavn
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="F.eks. Nordisk Interiør AS"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="website_url" className="text-sm font-medium">
          Nettside-URL
        </label>
        <input
          id="website_url"
          name="website_url"
          type="text"
          placeholder="www.dinbutikk.no"
          className="rounded-md border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600" role="alert">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-md bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
      >
        {pending ? "Lagrer…" : "Fortsett"}
      </button>
    </form>
  );
}
