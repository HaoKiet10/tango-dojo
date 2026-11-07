import { KANJI } from "./kanji";
import { VOCAB } from "./vocab";
import { KANJI_INFO } from "./kanjiInfo";
import { GRAMMAR } from "./grammar";
import type { Item, KanjiInfo } from "./types";

export const ITEMS: Item[] = [
  ...KANJI.map((k): Item => ({
    id: "k:" + k.char, deck: "kanji", level: k.level, prompt: k.char, meaning: k.meaning,
    word: k.example.word, reading: k.example.reading, wordMeaning: k.example.meaning,
    hanViet: k.hanViet, on: k.on, kun: k.kun,
  })),
  ...VOCAB.map((v): Item => ({
    id: "v:" + v.word, deck: "vocab", level: v.level, prompt: v.word, meaning: v.meaning,
    word: v.word, reading: v.reading, wordMeaning: v.meaning, pos: v.pos, sentence: v.sentence,
  })),
  ...GRAMMAR.map((g): Item => ({
    id: "g:" + g.id, deck: "grammar", level: g.level, prompt: g.pattern, meaning: g.meaning,
    word: g.pattern, reading: "", wordMeaning: g.meaning, grammar: g,
  })),
];

const CORE = new Map(KANJI.map(k => [k.char, k]));

/** Hán Việt, meaning and readings for any kanji used in the app's words. */
export function lookupKanji(char: string): (KanjiInfo & { core: boolean }) | undefined {
  const k = CORE.get(char);
  if (k) return { hanViet: k.hanViet, meaning: k.meaning, on: k.on, kun: k.kun, core: true };
  const x = KANJI_INFO[char];
  return x ? { ...x, core: false } : undefined;
}
