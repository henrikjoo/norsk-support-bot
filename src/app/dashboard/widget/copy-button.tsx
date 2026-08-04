"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [kopiert, setKopiert] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setKopiert(true);
        setTimeout(() => setKopiert(false), 2000);
      }}
      className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition ${
        kopiert
          ? "border-brand bg-brand-soft text-brand"
          : "border-neutral-300 hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
      }`}
    >
      {kopiert ? "Kopiert!" : "Kopier"}
    </button>
  );
}
