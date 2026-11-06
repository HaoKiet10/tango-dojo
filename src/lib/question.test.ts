import { ITEMS } from "../data/items";
import { emptyProgress } from "./progress";
import { poolFor } from "./picker";
import { availableModes, buildQuestion, choiceField, isKanjiFirst, pickMode } from "./question";
import { kanaUnits } from "./romaji";
import { seeded } from "../test/seeded";
import type { Deck } from "../data/types";
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
