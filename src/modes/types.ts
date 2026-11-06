import type { Item } from "../data/types";
import type { Question } from "../lib/question";

export interface AnswerResult {
  results: { item: Item; correct: boolean }[];
  /** Flashcards rate themselves and move straight on. */
  skipPanel?: boolean;
  /** Match rounds show a table of all pairs instead of one item's explanation. */
  summary?: "match";
  /** What to read aloud; defaults to the first item's reading. */
  speakText?: string;
}

export interface ModeProps { question: Question; locked: boolean; onAnswer: (r: AnswerResult) => void }
