import { LoggInnForm } from "./logg-inn-form";

export default async function LoggInnPage({
  searchParams,
}: PageProps<"/logg-inn">) {
  const params = await searchParams;
  const nesteParam = params?.neste;
  const neste = Array.isArray(nesteParam) ? nesteParam[0] : nesteParam;

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <LoggInnForm neste={neste ?? "/dashboard"} />
    </main>
  );
}
