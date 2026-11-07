import type { Deck, Item } from "../data/types";
import { distractors, pickWeighted, shuffle, type Rand } from "./picker";
import type { Mode, Progress } from "./progress";
import { kanaUnits } from "./romaji";

export type ConcreteMode = Exclude<Mode, "mixed">;
/** prompt = show the meaning, pick the kanji/word */
export type ChoiceKind = "meaning" | "hanViet" | "prompt" | "reading";
export type MatchField = "meaning" | "hanViet" | "reading";

export interface Question {
  mode: ConcreteMode;
  items: Item[];
  kind?: ChoiceKind;
  matchField?: MatchField;
  options?: string[];
  answer?: string;
  tiles?: string[];
}

export interface QuestionContext { pool: Item[]; all: Item[]; progress: Progress; recent: string[]; rand?: Rand }

const DECK_MODES: Record<Deck, ConcreteMode[]> = {
  kanji: ["choice", "match", "type", "spell", "cards"],
  vocab: ["choice", "match", "type", "spell", "fill", "cards"],
  grammar: ["choice", "grammar", "order"],
};
export const availableModes = (deck: Deck): ConcreteMode[] => DECK_MODES[deck];

const pickOne = <T,>(xs: readonly T[], rand: Rand): T => xs[Math.floor(rand() * xs.length)];

export function pickMode(deck: Deck, rand: Rand = Math.random): ConcreteMode {
  if (deck === "grammar") return pickOne<ConcreteMode>(["grammar", "grammar", "order", "choice"], rand);
  const bag: ConcreteMode[] = ["choice", "choice", "choice", "type", "type", "spell", "spell", "match"];
  if (deck === "vocab") bag.push("fill", "fill", "fill");
  return pickOne(bag, rand);
}

export const choiceField = (kind: ChoiceKind) => (i: Item): string =>
  kind === "meaning" ? i.meaning : kind === "hanViet" ? i.hanViet ?? "" : kind === "prompt" ? i.prompt : i.reading;

const sameDeck = (all: Item[], it: Item) => all.filter(x => x.deck === it.deck);

export function buildQuestion(mode: ConcreteMode, ctx: QuestionContext): Question {
  const { pool, all, progress, recent } = ctx;
  const rand = ctx.rand ?? Math.random;
  const one = (from: Item[]) => pickWeighted(from, 1, progress, recent, rand)[0];

  switch (mode) {
    case "choice": {
      const it = one(pool);
      const kinds: ChoiceKind[] = it.deck === "kanji"
        ? ["meaning", "meaning", "hanViet", "prompt", "reading"] : ["meaning", "prompt", "reading"];
      const kind = pickOne(kinds, rand);
      const field = choiceField(kind);
      const answer = field(it);
      const options = shuffle([answer, ...distractors(it, field, 3, pool, sameDeck(all, it), rand)], rand);
      return { mode, items: [it], kind, options, answer };
    }
    case "fill": {
      const withSentence = pool.filter(i => i.sentence);
      const it = one(withSentence.length ? withSentence : all.filter(i => i.sentence));
      const field = (i: Item) => i.word;
      const options = shuffle([it.word, ...distractors(it, field, 3,
        pool.filter(i => i.pos === it.pos), all.filter(i => i.pos === it.pos), rand)], rand);
      return { mode, items: [it], options, answer: it.word };
    }
    case "match": {
      const deck = pool[0]?.deck ?? "vocab";
      const matchField: MatchField = pickOne(deck === "kanji" ? ["meaning", "hanViet"] : ["meaning", "reading"], rand);
      const items: Item[] = [];
      const seen = new Set<string>();
      const candidates = [...pickWeighted(pool, pool.length, progress, recent, rand),
        ...shuffle(all.filter(i => i.deck === deck && !pool.includes(i)), rand)];
      for (const x of candidates) {
        const v = x[matchField] ?? "";
        if (v && !seen.has(v)) { seen.add(v); items.push(x); }
        if (items.length === 5) break;
      }
      return { mode, items, matchField };
    }
    case "spell": {
      const it = one(pool);
      const target = kanaUnits(it.reading);
      const decoys = shuffle([...new Set(all.flatMap(x => kanaUnits(x.reading)))].filter(u => !target.includes(u)), rand).slice(0, 3);
      return { mode, items: [it], tiles: shuffle([...target, ...decoys], rand) };
    }
    case "grammar":
    case "order":
      throw new Error(`${mode} questions are not built yet`);
    case "type":
    case "cards":
      return { mode, items: [one(pool)] };
  }
}

/** Questions about a single kanji (not its example word's reading) lead the explanation with the kanji. */
export const isKanjiFirst = (q: Question): boolean =>
  q.items[0]?.deck === "kanji" && (q.mode === "cards" || (q.mode === "choice" && q.kind !== "reading"));
