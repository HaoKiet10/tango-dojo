import { ITEMS } from "../data/items";
import type { Deck, Item } from "../data/types";
import { poolFor, remember } from "./picker";
import { emptyProgress, recordAnswer, type LevelFilter } from "./progress";
import { buildQuestion, pickMode } from "./question";
import { seeded } from "../test/seeded";

export interface SimOptions { deck: Deck; level: LevelFilter; mixed: boolean; questions: number; seed?: number }
export interface SimResult {
  all: Item[];
  pool: number;
  /** Fewest other questions asked between two appearances of the same word, over every word. */
  minGap: number;
  /** On average, a word you keep missing comes back every … questions. */
  missedEvery: number;
  /** On average, a word you got right once comes back every … questions. */
  knownEvery: number;
}

/**
 * Play `questions` questions the way the practice page does. Every word starts answered right once,
 * except one that is missed and keeps being missed each time it comes up (the worst case).
 */
export function simulate({ deck, level, mixed, questions, seed = 1 }: SimOptions): SimResult {
  const rand = seeded(seed);
  const pool = poolFor(ITEMS, deck, level);
  let p = emptyProgress();
  for (const i of pool) p = recordAnswer(p, i.id, true, 0, 0);
  const missed = pool[0].id;
  p = recordAnswer(p, missed, false, 0, 0);

  let recent: string[][] = [];
  const lastSeen = new Map<string, number>();
  const seen = new Map<string, number>();
  let minGap = Infinity;
  for (let n = 0; n < questions; n++) {
    const mode = mixed ? pickMode(deck, rand) : deck === "grammar" ? "grammar" : "choice";
    const q = buildQuestion(mode, { pool, all: ITEMS, progress: p, recent, rand });
    recent = remember(recent, q.items.map(i => i.id));
    for (const it of q.items) {
      const last = lastSeen.get(it.id);
      if (last !== undefined) minGap = Math.min(minGap, n - last - 1);
      lastSeen.set(it.id, n);
      seen.set(it.id, (seen.get(it.id) ?? 0) + 1);
      p = recordAnswer(p, it.id, it.id !== missed, 0, 0);
    }
  }
  const known = pool.filter(i => i.id !== missed).map(i => seen.get(i.id) ?? 0);
  const knownAvg = known.reduce((a, b) => a + b, 0) / known.length;
  return {
    all: ITEMS, pool: pool.length, minGap,
    missedEvery: questions / Math.max(1, seen.get(missed) ?? 0),
    knownEvery: questions / Math.max(knownAvg, 1e-9),
  };
}
