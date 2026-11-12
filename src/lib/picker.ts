import type { Deck, Item } from "../data/types";
import { isLearned, type LevelFilter, type Progress } from "./progress";
import { BASE_TICKETS, GAP, GAP_MAX_SHARE, LEARNED_FACTOR, MAX_TICKETS, MISS_BOOST, UNSEEN_BONUS } from "./tuning";

export type Rand = () => number;

export function shuffle<T>(xs: readonly T[], rand: Rand = Math.random): T[] {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const poolFor = (items: readonly Item[], deck: Deck, level: LevelFilter): Item[] =>
  items.filter(i => i.deck === deck && (level === "both" || String(i.level) === level));

/** Lottery tickets for one word. The numbers live in tuning.ts. `blocked` = words asked in the last questions. */
export function weight(item: Item, p: Progress, blocked: ReadonlySet<string> = new Set()): number {
  if (blocked.has(item.id)) return 0;
  const r = p.items[item.id];
  if (!r) return BASE_TICKETS + UNSEEN_BONUS;
  let w = Math.min(BASE_TICKETS + (MISS_BOOST * r.wrong) / (r.right + 1), Math.max(MAX_TICKETS, BASE_TICKETS));
  if (isLearned(r)) w *= LEARNED_FACTOR;
  return w;
}

/** How many questions a word waits before it can come back: GAP, or a share of a small set. */
export const gapFor = (poolSize: number): number => Math.min(GAP, Math.floor(poolSize * GAP_MAX_SHARE));

/**
 * Draw n different words, each in proportion to its tickets. `recent` is the words of the last
 * questions, oldest first. Words from the last `gap` questions are skipped; if nothing else is left,
 * the one asked longest ago goes first.
 */
export function pickWeighted(pool: readonly Item[], n: number, p: Progress, recent: readonly (readonly string[])[],
  rand: Rand = Math.random, gap = gapFor(pool.length)): Item[] {
  const lastAsked = new Map<string, number>();           // id → index of the question it was last in
  recent.forEach((ids, q) => ids.forEach(id => lastAsked.set(id, q)));
  const blocked = new Set(recent.slice(Math.max(0, recent.length - gap)).flat());
  const left = [...pool];
  const out: Item[] = [];
  while (out.length < n && left.length) {
    const ws = left.map(i => weight(i, p, blocked));
    const total = ws.reduce((a, b) => a + b, 0);
    let k = 0;
    if (total > 0) {
      let t = rand() * total;
      for (; k < left.length - 1; k++) { t -= ws[k]; if (t <= 0 && ws[k] > 0) break; }
      while (ws[k] === 0) k--;                            // rounding at the end: step back to a word with tickets
    } else {
      for (let j = 1; j < left.length; j++) if ((lastAsked.get(left[j].id) ?? -1) < (lastAsked.get(left[k].id) ?? -1)) k = j;
    }
    out.push(left.splice(k, 1)[0]);
  }
  return out;
}

/** n wrong-answer values, unique and different from the item's own; primary first, then fallback. */
export function distractors(item: Item, field: (i: Item) => string, n: number,
  primary: readonly Item[], fallback: readonly Item[], rand: Rand = Math.random): string[] {
  const seen = new Set([field(item)]);
  const out: string[] = [];
  for (const src of [shuffle(primary, rand), shuffle(fallback, rand)]) {
    for (const x of src) {
      if (out.length >= n) return out;
      const v = field(x);
      if (x.id !== item.id && v && !seen.has(v)) { seen.add(v); out.push(v); }
    }
  }
  return out;
}

/** Add a question's words to the memory of the last GAP questions (a Kéo nối round is one question). */
export const remember = (recent: readonly string[][], ids: readonly string[], max = GAP): string[][] =>
  [...recent, [...ids]].slice(-max);
