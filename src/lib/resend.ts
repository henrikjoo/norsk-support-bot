import "server-only";

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
        from: "Kundeservice Norge <onboarding@resend.dev>",
        to: til,
        subject: `Ny eskalert samtale hos ${bedriftsnavn}`,
        text: `En kunde fikk ikke svar fra AI-assistenten din:\n\n"${kundemelding}"\n\nSe samtalen i dashbordet: ${dashboardUrl}`,
      }),
    });
    if (!response.ok) {
      console.error("Resend avviste eskaleringsvarsel:", await response.text());
    }
  } catch (error) {
    console.error("Kunne ikke sende eskaleringsvarsel:", error);
  }
}
