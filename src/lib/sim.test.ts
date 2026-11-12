import { gapFor, poolFor } from "./picker";
import { simulate } from "./sim";

const CASES = [["vocab", "4", true], ["vocab", "4", false], ["kanji", "5", true], ["grammar", "5", true], ["grammar", "5", false]] as const;

test.each(CASES)("%s N%s (mixed %s): no word comes back within the gap, even one you keep missing", (deck, level, mixed) => {
  const r = simulate({ deck, level, mixed, questions: 600, seed: 7 });
  expect(r.minGap).toBeGreaterThanOrEqual(gapFor(poolFor(r.all, deck, level).length));
  expect(r.missedEvery).toBeGreaterThanOrEqual(gapFor(poolFor(r.all, deck, level).length));
});

test("a missed word still comes up more often than one you got right", () => {
  const r = simulate({ deck: "vocab", level: "4", mixed: false, questions: 3000, seed: 3 });
  expect(r.missedEvery).toBeLessThan(r.knownEvery);
});
