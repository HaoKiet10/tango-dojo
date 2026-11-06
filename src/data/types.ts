export type Level = 4 | 3;
export type Deck = "kanji" | "vocab";
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

export interface KanjiInfo { hanViet: string; meaning: string; on: string; kun: string }

/** One practisable thing. For kanji: prompt = the char; word/reading/wordMeaning = its example word. */
export interface Item {
  id: string; deck: Deck; level: Level; prompt: string; meaning: string;
  word: string; reading: string; wordMeaning: string;
  hanViet?: string; on?: string; kun?: string;
  pos?: Pos; sentence?: { ja: string; vi: string };
}
