export function oversettAuthFeil(message: string): string {
  const m = message.toLowerCase();

  if (m.includes("already registered") || m.includes("already exists")) {
    return "Denne e-postadressen er allerede registrert.";
  }
  if (m.includes("invalid login credentials")) {
    return "Feil e-post eller passord.";
  }
  if (m.includes("password") && (m.includes("at least") || m.includes("short"))) {
    return "Passordet er for kort (minst 8 tegn).";
  }
  if (m.includes("email not confirmed")) {
    return "E-posten er ikke bekreftet ennå. Sjekk innboksen din.";
  }
  if (m.includes("rate limit")) {
    return "For mange forsøk. Vent litt og prøv igjen.";
  }
  if (m.includes("unable to validate email") || m.includes("invalid email")) {
    return "Ugyldig e-postadresse.";
  }

  return "Noe gikk galt. Prøv igjen.";
}
