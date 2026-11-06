const ROMA: Record<string, string> = (() => {
  const t: Record<string, string> = { a: "あ", i: "い", u: "う", e: "え", o: "お" };
  const rows: Record<string, string> = {
    k: "かきくけこ", s: "さしすせそ", t: "たちつてと", n: "なにぬねの", h: "はひふへほ", m: "まみむめも",
    r: "らりるれろ", g: "がぎぐげご", z: "ざじずぜぞ", d: "だぢづでど", b: "ばびぶべぼ", p: "ぱぴぷぺぽ",
  };
  const v = "aiueo";
  for (const c in rows) for (let j = 0; j < 5; j++) t[c + v[j]] = rows[c][j];
  Object.assign(t, {
    ya: "や", yu: "ゆ", yo: "よ", wa: "わ", wo: "を", shi: "し", chi: "ち", tsu: "つ", fu: "ふ", ji: "じ",
    sha: "しゃ", shu: "しゅ", sho: "しょ", she: "しぇ", cha: "ちゃ", chu: "ちゅ", cho: "ちょ", che: "ちぇ",
    ja: "じゃ", ju: "じゅ", jo: "じょ", je: "じぇ", "-": "ー",
    xa: "ぁ", xi: "ぃ", xu: "ぅ", xe: "ぇ", xo: "ぉ", la: "ぁ", li: "ぃ", lu: "ぅ", le: "ぇ", lo: "ぉ",
    xtu: "っ", ltu: "っ", xya: "ゃ", xyu: "ゅ", xyo: "ょ", lya: "ゃ", lyu: "ゅ", lyo: "ょ",
  });
  const iRow: Record<string, string> = { k: "き", g: "ぎ", n: "に", h: "ひ", b: "び", p: "ぴ", m: "み", r: "り", s: "し", z: "じ", t: "ち", c: "ち", d: "ぢ", j: "じ" };
  const small: Record<string, string> = { a: "ゃ", u: "ゅ", o: "ょ" };
  for (const c in iRow) for (const x in small) t[c + "y" + x] = iRow[c] + small[x];
  return t;
})();

/** Romaji → hiragana. `final` turns a trailing lone "n" into ん (on submit); while typing it stays "n". */
export function toKana(input: string, final: boolean): string {
  const s = input.toLowerCase().replace(/\s+/g, "");
  let out = "";
  let i = 0;
  while (i < s.length) {
    const c = s[i], n1 = s[i + 1], n2 = s[i + 2];
    if (c === "n") {
      if (n1 === undefined) { out += final ? "ん" : "n"; i++; continue; }
      if (n1 === "'") { out += "ん"; i += 2; continue; }
      if (n1 === "n") { out += "ん"; i += n2 !== undefined && /[aiueoy]/.test(n2) ? 1 : 2; continue; }
      if (!/[aiueoy]/.test(n1)) { out += "ん"; i++; continue; }
    }
    if (n1 === c && /[bcdfghjkmpqrstvwxz]/.test(c)) { out += "っ"; i++; continue; }
    let hit = false;
    for (let len = 3; len > 0; len--) {
      const seg = s.substr(i, len);
      if (ROMA[seg]) { out += ROMA[seg]; i += len; hit = true; break; }
    }
    if (!hit) { out += s[i]; i++; }
  }
  return out;
}

export const kataToHira = (s: string): string =>
  s.replace(/[\u30a1-\u30f6]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** What the user typed (romaji, hiragana or katakana, any case/spacing) → hiragana for comparing. */
export const normalizeAnswer = (input: string): string => kataToHira(toKana(input.trim(), true));

/** Reading → tap units; small ゃゅょぁぃぅぇぉ join the kana before them. */
export function kanaUnits(reading: string): string[] {
  const units: string[] = [];
  for (const ch of reading) {
    if ("ゃゅょぁぃぅぇぉ".includes(ch) && units.length) units[units.length - 1] += ch;
    else units.push(ch);
  }
  return units;
}
