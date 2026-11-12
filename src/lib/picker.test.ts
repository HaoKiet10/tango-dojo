import { ITEMS } from "../data/items";
import { emptyProgress, recordAnswer } from "./progress";
import { distractors, gapFor, pickWeighted, poolFor, remember, weight } from "./picker";
import { seeded } from "../test/seeded";

test("poolFor filters deck and level", () => {
  expect(poolFor(ITEMS, "kanji", "4")).toHaveLength(73);
  expect(poolFor(ITEMS, "kanji", "3")).toHaveLength(80);
  expect(poolFor(ITEMS, "vocab", "both")).toHaveLength(336);
});

test("weight: unseen 2, missed capped at 3, learned 0.4, just shown 0", () => {
  const it = ITEMS[0];
  const p = emptyProgress();
  expect(weight(it, p)).toBe(2);
  expect(weight(it, p, new Set([it.id]))).toBe(0);
  const missed = recordAnswer(p, it.id, false, 0, 1);
  expect(weight(it, missed)).toBe(3);               // 1 + 3 = 4, capped at 3
  let many = missed;
  for (let i = 0; i < 5; i++) many = recordAnswer(many, it.id, false, 0, 1);
  expect(weight(it, many)).toBe(3);                 // however many misses
  const oneRight = recordAnswer(missed, it.id, true, 1, 1);
  expect(weight(it, oneRight)).toBe(2.5);           // 1 + 3*1/(1+1)
  let learned = p;
  for (let i = 0; i < 3; i++) learned = recordAnswer(learned, it.id, true, 1, 1);
  expect(weight(it, learned)).toBeCloseTo(0.4);
});

test("gapFor is 12 questions, or a third of a small set", () => {
  expect(gapFor(172)).toBe(12);
  expect(gapFor(49)).toBe(12);
  expect(gapFor(20)).toBe(6);
  expect(gapFor(2)).toBe(0);
});

test("pickWeighted never returns duplicates", () => {
  const pool = poolFor(ITEMS, "kanji", "4");
  for (let s = 0; s < 50; s++) {
    const picked = pickWeighted(pool, 5, emptyProgress(), [], seeded(s));
    expect(new Set(picked.map(i => i.id)).size).toBe(5);
  }
});

test("pickWeighted never picks a word from the last questions while others are left", () => {
  const pool = poolFor(ITEMS, "vocab", "4").slice(0, 30);              // gap 10
  const recent = pool.slice(0, 10).map(i => [i.id]);
  for (let s = 0; s < 100; s++)
    expect(recent.flat()).not.toContain(pickWeighted(pool, 1, emptyProgress(), recent, seeded(s))[0].id);
});

test("when every word is blocked, pickWeighted takes the one shown longest ago", () => {
  const pool = poolFor(ITEMS, "vocab", "4").slice(0, 3);
  const recent = [[pool[2].id], [pool[0].id], [pool[1].id]];
  expect(pickWeighted(pool, 1, emptyProgress(), recent, seeded(1), 3)[0].id).toBe(pool[2].id);
});

test("distractors are unique, exclude the answer, and fall back when the pool is small", () => {
  const adv4 = poolFor(ITEMS, "vocab", "4").filter(i => i.pos === "adv");
  expect(adv4.length).toBeGreaterThan(1);
  const it = adv4[0];
  const d = distractors(it, i => i.prompt, 3, adv4.filter(x => x !== it).slice(0, 1), ITEMS, seeded(1));
  expect(d).toHaveLength(3);
  expect(new Set(d).size).toBe(3);
  expect(d).not.toContain(it.prompt);
});

test("remember keeps the newest 12 questions, a match round as one", () => {
  let r: string[][] = [];
  for (let i = 0; i < 14; i++) r = remember(r, i === 13 ? ["a", "b", "c", "d", "e"] : [String(i)]);
  expect(r).toHaveLength(12);
  expect(r[0]).toEqual(["2"]);
  expect(r[11]).toEqual(["a", "b", "c", "d", "e"]);
});
