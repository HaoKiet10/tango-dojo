import { KANJI } from "./kanji";
import { VOCAB } from "./vocab";
import { KANJI_INFO } from "./kanjiInfo";
import { ITEMS, lookupKanji } from "./items";

const HIRAGANA = /^[\u3040-\u309f\u30fc]+$/;
const CJK = /[\u4e00-\u9faf]/;
const allWords = [...KANJI.map(k => k.example.word), ...VOCAB.map(v => v.word)];

test("counts match the audited data", () => {
  expect(KANJI).toHaveLength(153);
  expect(VOCAB).toHaveLength(110);
  expect(Object.keys(KANJI_INFO)).toHaveLength(173);
  expect(KANJI.filter(k => k.level === 4)).toHaveLength(73);
  expect(VOCAB.filter(v => v.level === 4)).toHaveLength(53);
  expect(ITEMS).toHaveLength(263);
});

test("readings are hiragana only", () => {
  for (const r of [...KANJI.map(k => k.example.reading), ...VOCAB.map(v => v.reading)]) expect(r).toMatch(HIRAGANA);
});

test("every example word contains its kanji", () => {
  for (const k of KANJI) expect(k.example.word).toContain(k.char);
});

test("every sentence has exactly one ＿＿", () => {
  for (const v of VOCAB) expect(v.sentence.ja.split("＿＿")).toHaveLength(2);
});

test("okurigana in a word matches the end of its reading", () => {
  for (const v of VOCAB) {
    const tail = v.word.match(/[\u3040-\u309f]+$/);
    if (tail) expect(v.reading.endsWith(tail[0]), v.word).toBe(true);
  }
});

test("every kanji in every word has a lookup entry", () => {
  for (const w of allWords) for (const c of w) if (CJK.test(c)) expect(lookupKanji(c), c).toBeDefined();
});

test("lookupKanji marks core kanji", () => {
  expect(lookupKanji("会")).toMatchObject({ hanViet: "HỘI", core: true });
  expect(lookupKanji("社")).toMatchObject({ hanViet: "XÃ", on: "シャ", core: false });
  expect(lookupKanji("x")).toBeUndefined();
});

test("no two items in a deck share a meaning token", () => {
  const tokens = (m: string) => m.split(/[;,]/).map(t => t.replace(/\(.*?\)/g, "").trim().toLowerCase()).filter(Boolean);
  for (const [name, list] of [["kanji", KANJI.map(k => [k.char, k.meaning])], ["vocab", VOCAB.map(v => [v.word, v.meaning])]] as const) {
    const seen = new Map<string, string>();
    for (const [id, m] of list) for (const t of tokens(m)) {
      const prev = seen.get(t);
      expect(prev === undefined || prev === id, `${name}: "${t}" in ${prev} and ${id}`).toBe(true);
      seen.set(t, id);
    }
  }
});

test("ids are unique", () => {
  expect(new Set(ITEMS.map(i => i.id)).size).toBe(ITEMS.length);
});
