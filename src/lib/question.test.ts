import { ITEMS } from "../data/items";
import { emptyProgress } from "./progress";
import { poolFor } from "./picker";
import { availableModes, barePattern, buildQuestion, choiceField, fullSentence, isKanjiFirst, pickMode } from "./question";
import { kanaUnits } from "./romaji";
import { seeded } from "../test/seeded";
import type { Deck, Grammar, Item } from "../data/types";
import type { LevelFilter } from "./progress";

const ctx = (deck: Deck, level: LevelFilter, rand: () => number) =>
  ({ pool: poolFor(ITEMS, deck, level), all: ITEMS, progress: emptyProgress(), recent: [], rand });

test("availableModes", () => {
  expect(availableModes("kanji")).not.toContain("fill");
  expect(availableModes("vocab")).toContain("fill");
});

test("pickMode never gives fill for kanji", () => {
  for (let s = 0; s < 200; s++) expect(pickMode("kanji", seeded(s))).not.toBe("fill");
});

test("buildQuestion choice always has 4 unique options including the answer", () => {
  for (const deck of ["kanji", "vocab"] as const) for (let s = 0; s < 200; s++) {
    const q = buildQuestion("choice", ctx(deck, "4", seeded(s)));
    expect(new Set(q.options).size).toBe(4);
    expect(q.options).toContain(q.answer);
    expect(q.answer).toBe(choiceField(q.kind!)(q.items[0]));
  }
});

test("buildQuestion match always has 5 unique values", () => {
  for (const deck of ["kanji", "vocab"] as const) for (let s = 0; s < 200; s++) {
    const q = buildQuestion("match", ctx(deck, "4", seeded(s)));
    expect(q.items).toHaveLength(5);
    const field = q.matchField!;
    expect(new Set(q.items.map(i => i[field])).size).toBe(5);
    expect(deck === "kanji" ? ["meaning", "hanViet"] : ["meaning", "reading"]).toContain(field);
  }
});

test("buildQuestion fill uses an item with a sentence and same-pos options", () => {
  for (let s = 0; s < 200; s++) {
    const q = buildQuestion("fill", ctx("vocab", "4", seeded(s)));
    const it = q.items[0];
    expect(it.sentence).toBeDefined();
    expect(new Set(q.options).size).toBe(4);
    expect(q.answer).toBe(it.word);
    for (const o of q.options!) expect(ITEMS.find(x => x.deck === "vocab" && x.word === o)?.pos).toBe(it.pos);
  }
});

test("spell tiles contain every unit of the reading plus 3 decoys", () => {
  for (let s = 0; s < 100; s++) {
    const q = buildQuestion("spell", ctx("vocab", "both", seeded(s)));
    const units = kanaUnits(q.items[0].reading);
    expect(q.tiles).toHaveLength(units.length + 3);
    for (const u of units) expect(q.tiles).toContain(u);
  }
});

test("isKanjiFirst", () => {
  const k = ITEMS.find(i => i.deck === "kanji")!;
  const v = ITEMS.find(i => i.deck === "vocab")!;
  expect(isKanjiFirst({ mode: "choice", items: [k], kind: "meaning" })).toBe(true);
  expect(isKanjiFirst({ mode: "choice", items: [k], kind: "reading" })).toBe(false);
  expect(isKanjiFirst({ mode: "cards", items: [k] })).toBe(true);
  expect(isKanjiFirst({ mode: "type", items: [k] })).toBe(false);
  expect(isKanjiFirst({ mode: "choice", items: [v], kind: "meaning" })).toBe(false);
});

test("availableModes for grammar", () => {
  expect(availableModes("grammar")).toEqual(["choice", "grammar", "order"]);
});

test("pickMode for grammar draws grammar ×2, order, choice", () => {
  const seq = [0, 0.3, 0.6, 0.9];
  expect(seq.map(r => pickMode("grammar", () => r))).toEqual(["grammar", "grammar", "order", "choice"]);
});

const gItem = (id: string, answer: string, confusables: string[] = [], level: 3 | 4 | 5 = 4): Item => {
  const ex = { ja: `AA＿＿BB。`, answer, pieces: ["AA", answer, "BB。"], vi: "v" };
  const g: Grammar = { id, pattern: "〜" + answer, level, form: "f", meaning: "m " + id, note: "n", confusables, examples: [ex, ex] };
  return { id: "g:" + id, deck: "grammar", level, prompt: g.pattern, meaning: g.meaning, word: g.pattern, reading: "", wordMeaning: g.meaning, grammar: g };
};
const G = [gItem("nagara", "ながら", ["tsutsu"]), gItem("tsutsu", "つつ"), gItem("a", "ため"), gItem("b", "よう"),
  gItem("c", "ばかり"), gItem("d", "ところ"), gItem("same", "ながら")];
const gctx = (pool: Item[], rand: () => number) => ({ pool, all: G, progress: emptyProgress(), recent: [], rand });

test("grammar options never offer a look-alike's answer, in either direction", () => {
  for (let s = 0; s < 50; s++) {
    const q = buildQuestion("grammar", gctx([G[0]], seeded(s)));
    expect(q.options).toHaveLength(4);
    expect(q.options).not.toContain("つつ");
    // tsutsu lists no look-alikes, but nagara lists tsutsu: its answer is still kept out.
    expect(buildQuestion("grammar", gctx([G[1]], seeded(s))).options).not.toContain("ながら");
    expect(q.options!.filter(o => o === "ながら")).toHaveLength(1);
    expect(q.answer).toBe("ながら");
    expect([0, 1]).toContain(q.example);
  }
});

test("grammar options never repeat the answer, even when another pattern shares it", () => {
  const nagara = { ...G[0], grammar: { ...G[0].grammar!, confusables: ["same", "tsutsu"] } };
  for (let s = 0; s < 50; s++) {
    const q = buildQuestion("grammar", gctx([nagara], seeded(s)));
    expect(new Set(q.options).size).toBe(4);
    expect(q.options!.filter(o => o === "ながら")).toHaveLength(1);
  }
});

test("order tiles are the pieces shuffled, never already in order", () => {
  for (let s = 0; s < 50; s++) {
    const q = buildQuestion("order", gctx([G[0]], seeded(s)));
    const ex = G[0].grammar!.examples[q.example!];
    expect([...q.tiles!].sort()).toEqual([...ex.pieces].sort());
    expect(q.tiles!.join("")).not.toBe(fullSentence(ex));
  }
  const q = buildQuestion("order", gctx([G[0]], () => 0.999));
  expect(q.tiles!.join("")).not.toBe("AAながらBB。");
});

test("choice on grammar asks for the meaning or the pattern only", () => {
  const kinds = new Set<string>();
  for (let s = 0; s < 100; s++) {
    const q = buildQuestion("choice", gctx(G, seeded(s)));
    kinds.add(q.kind!);
    expect(new Set(q.options).size).toBe(4);
  }
  expect([...kinds].sort()).toEqual(["meaning", "prompt"]);
});

test("real grammar questions never offer an answer of a linked look-alike", () => {
  const grammar = ITEMS.filter(i => i.grammar);
  const byId = new Map(grammar.map(i => [i.grammar!.id, i]));
  const linked = (it: Item) => {
    const ids = new Set(it.grammar!.confusables);
    for (const x of grammar) if (x.grammar!.confusables.includes(it.grammar!.id)) ids.add(x.grammar!.id);
    return new Set([...ids].flatMap(id => byId.get(id)!.grammar!.examples.map(e => e.answer)));
  };
  for (const it of grammar) for (let s = 0; s < 6; s++) {
    const q = buildQuestion("grammar", { pool: [it], all: ITEMS, progress: emptyProgress(), recent: [], rand: seeded(s) });
    const bad = linked(it);
    for (const o of q.options!) if (o !== q.answer) expect(bad.has(o), `${it.grammar!.id}: ${o}`).toBe(false);
  }
});

test("grammar choice shows bare patterns: no bracketed note, no two options with the same pattern", () => {
  const grammar = ITEMS.filter(i => i.grammar);
  for (let s = 0; s < 300; s++) {
    const q = buildQuestion("choice", { pool: grammar, all: ITEMS, progress: emptyProgress(), recent: [], rand: seeded(s) });
    if (q.kind === "prompt") {
      for (const o of q.options!) expect(o).not.toMatch(/[()]/);
      expect(new Set(q.options).size).toBe(4);
    } else {
      const bare = barePattern(q.items[0].prompt);
      const owners = q.options!.filter(o => o !== q.answer).map(o => grammar.find(g => g.meaning === o)!);
      for (const g of owners) expect(barePattern(g.prompt), `${bare} vs ${g.prompt}`).not.toBe(bare);
    }
  }
});
