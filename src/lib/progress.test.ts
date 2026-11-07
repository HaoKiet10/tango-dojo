import { DEFAULT_SETTINGS, emptyProgress, isLearned, loadProgress, loadSettings, loadToday, recordAnswer, saveProgress, saveSettings, saveToday } from "./progress";

const fake = (raw: string | null): Storage => {
  const data = new Map<string, string>();
  if (raw !== null) { data.set("tango-dojo:v1", raw); data.set("tango-dojo:settings", raw); }
  return {
    getItem: (k: string) => data.get(k) ?? null, setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k), clear: () => data.clear(), key: () => null, length: 0,
  } as Storage;
};

test("loadProgress returns empty for missing, corrupt, or wrong-version data", () => {
  for (const raw of [null, "{oops", JSON.stringify({ version: 2, items: {} })]) {
    expect(loadProgress(fake(raw))).toEqual(emptyProgress());
  }
});

test("progress round-trips through storage", () => {
  const s = fake(null);
  const p = recordAnswer(emptyProgress(), "k:会", true, 1, 5);
  saveProgress(p, s);
  expect(loadProgress(s)).toEqual(p);
});

test("recordAnswer counts and keeps the best streak", () => {
  let p = recordAnswer(emptyProgress(), "v:夢", true, 3, 100);
  p = recordAnswer(p, "v:夢", false, 0, 200);
  expect(p.items["v:夢"]).toEqual({ right: 1, wrong: 1, lastSeen: 200 });
  expect(p.bestStreak).toBe(3);
});

test("isLearned", () => {
  expect(isLearned({ right: 3, wrong: 1, lastSeen: 0 })).toBe(true);
  expect(isLearned({ right: 3, wrong: 2, lastSeen: 0 })).toBe(false);
  expect(isLearned(undefined)).toBe(false);
});

test("saveProgress survives a throwing storage", () => {
  const bad = { setItem() { throw new Error("QuotaExceeded"); } } as unknown as Storage;
  expect(() => saveProgress(emptyProgress(), bad)).not.toThrow();
  expect(() => saveSettings(DEFAULT_SETTINGS, bad)).not.toThrow();
});

test("loads survive a throwing getItem", () => {
  const bad = { getItem() { throw new Error("SecurityError"); } } as unknown as Storage;
  expect(loadProgress(bad)).toEqual(emptyProgress());
  expect(loadSettings(bad)).toEqual(DEFAULT_SETTINGS);
});

test("loadSettings drops invalid values", () => {
  expect(loadSettings(fake(JSON.stringify({ deck: "x", level: "3", mode: "fill", sound: "yes" }))))
    .toEqual({ ...DEFAULT_SETTINGS, level: "3", mode: "fill" });
});

test("defaults", () => expect(DEFAULT_SETTINGS).toEqual({ deck: "vocab", level: "4", mode: "mixed", sound: true }));

test("loadSettings keeps a grammar deck and its modes", () => {
  const s = new Map<string, string>([["tango-dojo:settings", JSON.stringify({ deck: "grammar", level: "5", mode: "order", sound: true })]]);
  const storage = { getItem: (k: string) => s.get(k) ?? null } as unknown as Storage;
  expect(loadSettings(storage)).toMatchObject({ deck: "grammar", level: "5", mode: "order" });
});

test("today's tally survives a reload on the same day", () => {
  const s = fake(null);
  const noon = new Date(2026, 10, 7, 12).getTime();
  saveToday({ correct: 3, total: 5, streak: 2 }, noon, s);
  expect(loadToday(new Date(2026, 10, 7, 23, 59).getTime(), s)).toEqual({ correct: 3, total: 5, streak: 2 });
});

test("today's tally starts at zero on a new day or with bad data", () => {
  const s = fake(null);
  saveToday({ correct: 3, total: 5, streak: 2 }, new Date(2026, 10, 7, 23, 59).getTime(), s);
  expect(loadToday(new Date(2026, 10, 8, 0, 1).getTime(), s)).toEqual({ correct: 0, total: 0, streak: 0 });
  s.setItem("tango-dojo:today", "{oops");
  expect(loadToday(Date.now(), s)).toEqual({ correct: 0, total: 0, streak: 0 });
});
