import { toKana, normalizeAnswer, kanaUnits, kataToHira } from "./romaji";

test.each([
  ["kaisha", "かいしゃ"], ["konnichiwa", "こんにちわ"], ["sennsei", "せんせい"], ["sensei", "せんせい"],
  ["kitte", "きって"], ["hikkosu", "ひっこす"], ["ren'ai", "れんあい"], ["shinpai", "しんぱい"],
  ["jouhou", "じょうほう"], ["gakkou", "がっこう"], ["hon", "ほん"],
])("toKana(%s)", (r, k) => expect(toKana(r, true)).toBe(k));

test("trailing n stays n while typing", () => expect(toKana("hon", false)).toBe("ほn"));

test("normalizeAnswer", () => {
  expect(normalizeAnswer(" KAISHA ")).toBe("かいしゃ");
  expect(normalizeAnswer("カイシャ")).toBe("かいしゃ");
  expect(normalizeAnswer("   ")).toBe("");
});

test("kataToHira keeps the long-vowel mark", () => expect(kataToHira("コーヒー")).toBe("こーひー"));

test("kanaUnits joins small kana", () => expect(kanaUnits("きょうみ")).toEqual(["きょ", "う", "み"]));
