import type { Conversation } from "@/lib/types";

export type Samtale = {
  sessionId: string;
  meldinger: Conversation[];
  forsteTidspunkt: string;
  sisteTidspunkt: string;
  eskalert: boolean;
};

export function grupperISamtaler(rader: Conversation[]): Samtale[] {
  const grupper = new Map<string, Conversation[]>();
  for (const rad of rader) {
    const liste = grupper.get(rad.session_id) ?? [];
    liste.push(rad);
    grupper.set(rad.session_id, liste);
  }

  const samtaler: Samtale[] = [];
  for (const [sessionId, meldinger] of grupper) {
    meldinger.sort((a, b) => a.created_at.localeCompare(b.created_at));
    samtaler.push({
      sessionId,
      meldinger,
      forsteTidspunkt: meldinger[0].created_at,
      sisteTidspunkt: meldinger[meldinger.length - 1].created_at,
      eskalert: meldinger.some((m) => m.escalated),
    });
  }

  samtaler.sort((a, b) => b.sisteTidspunkt.localeCompare(a.sisteTidspunkt));
  return samtaler;
}
