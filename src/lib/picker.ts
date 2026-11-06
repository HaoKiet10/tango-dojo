import type { Deck, Item } from "../data/types";
import { isLearned, type LevelFilter, type Progress } from "./progress";

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

/** Missed and unseen items come up more often; learned ones less; recent ones almost never. */
export function weight(item: Item, p: Progress, recent: readonly string[]): number {
  const r = p.items[item.id];
  let w = 1 + (3 * (r?.wrong ?? 0)) / ((r?.right ?? 0) + 1);
  if (!r) w += 1;
  if (isLearned(r)) w *= 0.4;
  if (recent.includes(item.id)) w *= 0.05;
  return w;
}

/** Weighted sample of n items without replacement. */
export function pickWeighted(pool: readonly Item[], n: number, p: Progress, recent: readonly string[], rand: Rand = Math.random): Item[] {
  const left = [...pool];
  const out: Item[] = [];
  while (out.length < n && left.length) {
    const ws = left.map(i => weight(i, p, recent));
    let t = rand() * ws.reduce((a, b) => a + b, 0);
    let k = 0;
    for (; k < left.length - 1; k++) { t -= ws[k]; if (t <= 0) break; }
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

export const remember = (recent: readonly string[], ids: readonly string[], max = 8): string[] =>
  [...recent.filter(r => !ids.includes(r)), ...ids].slice(-max);
