import "server-only";

async function sendEpost({
  til,
  emne,
  tekst,
}: {
  til: string;
  emne: string;
  tekst: string;
}): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kundeservice Norge <varsel@kundeservicenorge.no>",
        to: til,
        subject: emne,
        text: tekst,
      }),
    });
    if (!response.ok) {
      console.error("Resend avviste e-post:", await response.text());
    }
  } catch (error) {
    console.error("Kunne ikke sende e-post:", error);
  }
}

export async function sendEskaleringsvarsel({
  til,
  bedriftsnavn,
  kundemelding,
  dashboardUrl,
}: {
  til: string;
  bedriftsnavn: string;
  kundemelding: string;
  dashboardUrl: string;
}): Promise<void> {
  await sendEpost({
    til,
    emne: `Ny eskalert samtale hos ${bedriftsnavn}`,
    tekst: `En kunde fikk ikke svar fra AI-assistenten din:\n\n"${kundemelding}"\n\nSe samtalen i dashbordet: ${dashboardUrl}`,
  });
}

export async function sendNyKundeVarsel({
  bedriftsnavn,
}: {
  bedriftsnavn: string;
}): Promise<void> {
  const adminEpost = process.env.ADMIN_EPOST;
  if (!adminEpost) return;

  await sendEpost({
    til: adminEpost,
    emne: "Ny bedrift registrert på Kundeservice Norge",
    tekst: `En ny bedrift har registrert seg: "${bedriftsnavn}".`,
  });
}
