import { ITEMS } from "../data/items";
import { emptyProgress, recordAnswer } from "./progress";
import { distractors, pickWeighted, poolFor, remember, weight } from "./picker";
import { seeded } from "../test/seeded";

test("poolFor filters deck and level", () => {
  expect(poolFor(ITEMS, "kanji", "4")).toHaveLength(73);
  expect(poolFor(ITEMS, "kanji", "3")).toHaveLength(80);
  expect(poolFor(ITEMS, "vocab", "both")).toHaveLength(336);
});

test("weight favours unseen and missed items and penalises recent ones", () => {
  const it = ITEMS[0];
  const p = emptyProgress();
  expect(weight(it, p, [])).toBe(2);
  expect(weight(it, p, [it.id])).toBeCloseTo(0.1);
  const missed = recordAnswer(p, it.id, false, 0, 1);
  expect(weight(it, missed, [])).toBe(4);           // 1 + 3*1/(0+1)
  let learned = p;
  for (let i = 0; i < 3; i++) learned = recordAnswer(learned, it.id, true, 1, 1);
  expect(weight(it, learned, [])).toBeCloseTo(0.4); // learned ×0.4
});

test("pickWeighted never returns duplicates", () => {
  const pool = poolFor(ITEMS, "kanji", "4");
  for (let s = 0; s < 50; s++) {
    const picked = pickWeighted(pool, 5, emptyProgress(), [], seeded(s));
    expect(new Set(picked.map(i => i.id)).size).toBe(5);
  }
});

test("pickWeighted avoids recent items when it can", () => {
  const pool = poolFor(ITEMS, "vocab", "4").slice(0, 3);
  const recent = [pool[0].id, pool[1].id];
  let hits = 0;
  for (let s = 0; s < 100; s++) if (pickWeighted(pool, 1, emptyProgress(), recent, seeded(s))[0].id === pool[2].id) hits++;
  expect(hits).toBeGreaterThan(85);
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

test("remember keeps the newest 8", () => {
  let r: string[] = [];
  for (let i = 0; i < 10; i++) r = remember(r, [String(i)]);
  expect(r).toEqual(["2", "3", "4", "5", "6", "7", "8", "9"]);
});
