import { KANJI } from "./kanji";
import { VOCAB } from "./vocab";
import { KANJI_INFO } from "./kanjiInfo";
import { ITEMS, lookupKanji } from "./items";
import { GRAMMAR } from "./grammar";
import { fullSentence } from "../lib/question";

const HIRAGANA = /^[\u3040-\u309f\u30fc]+$/;
const CJK = /[\u4e00-\u9faf]/;
const allWords = [...KANJI.map(k => k.example.word), ...VOCAB.map(v => v.word)];

test("counts match the audited data", () => {
  expect(KANJI).toHaveLength(252);
  expect(KANJI.filter(k => k.level === 5)).toHaveLength(99);
  expect(VOCAB).toHaveLength(336);
  expect(Object.keys(KANJI_INFO)).toHaveLength(334);
  expect(KANJI.filter(k => k.level === 4)).toHaveLength(73);
  expect(VOCAB.filter(v => v.level === 4)).toHaveLength(172);
  expect(ITEMS).toHaveLength(588 + GRAMMAR.length);
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
  expect(lookupKanji("社")).toMatchObject({ hanViet: "XÃ", core: true });
  expect(lookupKanji("仕")).toMatchObject({ hanViet: "SĨ", on: "シ、ジ", core: false });
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

test("grammar patterns become items", () => {
  const g = ITEMS.filter(i => i.deck === "grammar");
  expect(g).toHaveLength(GRAMMAR.length);
  expect(g.map(i => i.id)).toEqual(GRAMMAR.map(x => "g:" + x.id));
  expect(g[0].grammar).toBe(GRAMMAR[0]);
});

describe("grammar", () => {
  const ids = new Set(GRAMMAR.map(g => g.id));
  const examples = GRAMMAR.flatMap(g => g.examples.map(ex => ({ g, ex })));

  test("ids are unique slugs", () => {
    expect(ids.size).toBe(GRAMMAR.length);
    for (const g of GRAMMAR) expect(g.id).toMatch(/^[a-z0-9-]+$/);
  });

  test("confusables point to other real patterns", () => {
    for (const g of GRAMMAR) for (const c of g.confusables) {
      expect(ids.has(c), `${g.id} → ${c}`).toBe(true);
      expect(c).not.toBe(g.id);
    }
  });

  test("each example has exactly one ＿＿", () => {
    for (const { g, ex } of examples) expect(ex.ja.split("＿＿"), g.id).toHaveLength(2);
  });

  test("pieces join to the full sentence, 3–5 of them, exactly one starting with the answer", () => {
    for (const { g, ex } of examples) {
      expect(ex.pieces.join(""), g.id).toBe(fullSentence(ex));
      expect(ex.pieces.length, g.id).toBeGreaterThanOrEqual(3);
      expect(ex.pieces.length, g.id).toBeLessThanOrEqual(5);
      expect(ex.pieces.filter(p => p.startsWith(ex.answer)), g.id).toHaveLength(1);
    }
  });

  test("no two patterns share a meaning token", () => {
    const tokens = (m: string) => m.split(/[;,]/).map(t => t.replace(/\(.*?\)/g, "").trim().toLowerCase()).filter(Boolean);
    const seen = new Map<string, string>();
    for (const g of GRAMMAR) for (const t of tokens(g.meaning)) {
      const prev = seen.get(t);
      expect(prev === undefined || prev === g.id, `"${t}" in ${prev} and ${g.id}`).toBe(true);
      seen.set(t, g.id);
    }
  });

  test("every kanji in every example has a lookup entry", () => {
    for (const { ex } of examples) for (const c of fullSentence(ex)) if (CJK.test(c)) expect(lookupKanji(c), c).toBeDefined();
  });
});
