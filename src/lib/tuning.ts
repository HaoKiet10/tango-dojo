/**
 * Every number that decides what practice asks next, in one place.
 * Đổi một con số ở đây → chạy `npm run sim` để xem tác dụng → push.
 * Change a number here → run `npm run sim` to see what it does → push.
 *
 * How the next question is picked (see also docs/how-picking-works.md):
 *  1. The pool is every word of the chosen deck and level.
 *  2. In Hỗn hợp, the question type is drawn from MIXED_BAG.
 *  3. Each word in the pool gets lottery tickets (below); one word is drawn at random,
 *     in proportion to its tickets. Kéo nối draws MATCH_PAIRS words the same way.
 *  4. A word asked in the last GAP questions has no tickets at all.
 */
import type { ChoiceKind, ConcreteMode } from "./question";
import type { Deck } from "../data/types";

// ── Lottery tickets ─────────────────────────────────────────────────────────────

/** Tickets every word starts with. */
export const BASE_TICKETS = 1;

/** Extra tickets for a word you have never been asked. Higher = new words come sooner. */
export const UNSEEN_BONUS = 1;

/**
 * Extra tickets for misses: MISS_BOOST × misses ÷ (rights + 1).
 * Higher = words you got wrong come back more often. Each right answer shrinks the bonus.
 */
export const MISS_BOOST = 3;

/** Most tickets a missed word can hold, however many times you missed it. Stops one word taking over. */
export const MAX_TICKETS = 3;

/** Learned words keep this share of their tickets. Lower = learned words rarely come up. */
export const LEARNED_FACTOR = 0.4;

/** A word counts as learned (here and on Tiến độ) with at least this many right answers… */
export const LEARNED_MIN_RIGHT = 3;
/** …and at least this many rights per miss. */
export const LEARNED_RIGHT_PER_MISS = 2;

// ── Spacing ─────────────────────────────────────────────────────────────────────

/** A word can't be asked again until this many other questions have passed. Kéo nối counts as one question. */
export const GAP = 12;

/** In a small set the gap shrinks to this share of the set, so there are always words left to ask. */
export const GAP_MAX_SHARE = 1 / 3;

// ── Question types ─────────────────────────────────────────────────────────────

/** Hỗn hợp: how many tickets each question type gets, per deck. */
export const MIXED_BAG: Record<Deck, Partial<Record<ConcreteMode, number>>> = {
  kanji: { choice: 3, type: 2, spell: 2, match: 1 },
  vocab: { choice: 3, type: 2, spell: 2, match: 1, fill: 3 },
  grammar: { grammar: 2, order: 1, choice: 1 },
};

/** Trắc nghiệm: what a question asks for (meaning, Hán Việt, "which word", reading), per deck. */
export const CHOICE_KINDS: Record<Deck, Partial<Record<ChoiceKind, number>>> = {
  kanji: { meaning: 2, hanViet: 1, prompt: 1, reading: 1 },
  vocab: { meaning: 1, prompt: 1, reading: 1 },
  grammar: { meaning: 1, prompt: 1 },
};

/** Words in one Kéo nối round. */
export const MATCH_PAIRS = 5;

/** Expand a ticket table into a bag to draw from: { a: 2, b: 1 } → [a, a, b]. */
export const bag = <K extends string>(tickets: Partial<Record<K, number>>): K[] =>
  (Object.entries(tickets) as [K, number][]).flatMap(([k, n]) => Array<K>(n).fill(k));
