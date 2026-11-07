export type Level = 5 | 4 | 3;
export type Deck = "kanji" | "vocab" | "grammar";
export type Pos = "n" | "v" | "i" | "na" | "adv";

export interface Kanji {
  char: string; hanViet: string; on: string; kun: string; meaning: string; level: Level;
  example: { word: string; reading: string; meaning: string };
}

export interface Vocab {
  word: string; reading: string; meaning: string; pos: Pos; level: Level;
  /** ja contains ＿＿ exactly once, where the word goes */
  sentence: { ja: string; vi: string };
}

export interface GrammarExample {
  /** contains ＿＿ exactly once, where `answer` goes */
  ja: string;
  answer: string;
  /** 3–5 pieces; joined they equal ja with ＿＿ replaced by answer; one piece equals answer */
  pieces: string[];
  vi: string;
}

export interface Grammar {
  id: string; pattern: string; level: Level; form: string; meaning: string; note: string;
  confusables: string[];
  examples: [GrammarExample, GrammarExample];
}

export interface KanjiInfo { hanViet: string; meaning: string; on: string; kun: string }

/** One practisable thing. For kanji: prompt = the char; word/reading/wordMeaning = its example word. */
export interface Item {
  id: string; deck: Deck; level: Level; prompt: string; meaning: string;
  word: string; reading: string; wordMeaning: string;
  hanViet?: string; on?: string; kun?: string;
  pos?: Pos; sentence?: { ja: string; vi: string };
  grammar?: Grammar;
}
