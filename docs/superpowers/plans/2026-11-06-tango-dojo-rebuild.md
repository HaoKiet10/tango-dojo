# Tango Dojo Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the static Japanese practice page as a mobile-first Vite + React + TypeScript + Tailwind app with the same content and behaviour, tested at four screen sizes and auto-published to GitHub Pages.

**Architecture:** All logic (romaji, picking, question building, progress) lives in pure functions in `src/lib/` and is unit-tested without a browser. React components in `src/modes/` render one question each and report an `AnswerResult`; `PracticePage` owns the question → answered → Next state machine. Hash routes switch three pages inside one shell (top bar + phone tab bar).

**Tech Stack:** Vite 7, React 19, TypeScript 5, Tailwind CSS v4 (`@tailwindcss/vite`), @dnd-kit/core, Vitest 3 + @testing-library/react + jsdom, Playwright, ESLint 9 (typescript-eslint), @fontsource/be-vietnam-pro, @fontsource/noto-sans-jp, GitHub Actions (`actions/deploy-pages`).

**Spec:** `docs/superpowers/specs/2026-11-06-tango-dojo-rebuild-design.md` — read it before Task 1. The old app (`index.html`, `app.js`, `data.js`, `kana.html`) stays in the repo as the porting reference until Task 15 deletes it.

## Global Constraints

- All visible UI text is Vietnamese + Japanese. No English strings in the rendered UI (code identifiers are English).
- After every answer the app waits for **Tiếp 次へ →** (click, Enter or Space). Exception: flashcard rating buttons advance directly.
- Vite `base: "/tango-dojo/"`; routes are hash routes `#/practice` (default), `#/progress`, `#/kana`.
- localStorage keys: progress `tango-dojo:v1`, settings `tango-dojo:settings`, kana progress `tango-dojo:kana`.
- Settings defaults: `{ deck: "vocab", level: "4", mode: "mixed", sound: true }`.
- "Learned" = `right >= 3 && right >= 2 * wrong`.
- Tap targets ≥ 44px tall (answer buttons, tiles ≥ 48px); text inputs font-size ≥ 16px.
- Breakpoints: phone < 640px, tablet 640–1023px, desktop ≥ 1024px. Content column ≤ 720px on tablet/desktop.
- Colour only on meaning: correct `--positive`, wrong `--negative`, matched-after-mistake `--late`, vermilion `--seal` for the 道 mark and the "chữ đang học" tag. Selected controls = neutral `--active` pill; primary buttons `--primary` (near-black; white in dark).
- Every text colour ≥ 4.5:1 on its surface in both themes. Dark mode via `prefers-color-scheme`, true neutral darks (#000/#111/#222), no navy.
- 1px borders, no resting shadows, no gradients. Radius: 8px cards, 6px controls.
- Fonts: Be Vietnam Pro (Latin/Vietnamese) + Noto Sans JP (Japanese), self-hosted via @fontsource. At most six UI sizes: 12/14/16/20/24 + the prompt's `clamp()`. Numbers use `tabular-nums`.
- Motion is feedback only and respects `prefers-reduced-motion`.
- Content must be byte-identical to the audited `data.js` (153 kanji, 110 vocab, 173 extra kanji).

## Review Focus

1. **Small pools** — N4-only adverbs number 4, so Fill-the-blank and Match can run short of distinct options. Expected: always 4 unique options (fallback to the whole deck) and always 5 unique match pairs, never a duplicate or an `undefined`. Tests: Task 4 (`distractors falls back…`, `buildQuestion match always has 5 unique values`).
2. **Double input** — a fast double-tap on an answer or on Next. Expected: one answer recorded, one question skipped. Test: Task 8 (`records only once on double click`).
3. **Storage unavailable** — Safari private mode / disabled storage throws on `setItem`. Expected: the app works, just without saving. Test: Task 3 (`saveProgress survives a throwing storage`).
4. **Messy typed answers** — uppercase, spaces, katakana, an empty Enter. Expected: `" KAISHA "` and `カイシャ` count as かいしゃ; empty Enter does nothing. Tests: Task 2 (`normalizeAnswer`) and Task 9 (`ignores empty submit`).
5. **No Japanese voice / no speechSynthesis** — many Android browsers. Expected: no crash, no error. Test: Task 5 (`speak is a no-op without speechSynthesis`).

---

## File Structure

```
index.html                      Vite entry (replaces the old static index.html in Task 1)
vite.config.ts                  base, react, tailwind, vitest config
playwright.config.ts            4 sizes × light, 2 sizes × dark
eslint.config.js · tsconfig*.json · package.json
scripts/convert-data.mjs        one-time: old data.js → src/data/*.ts
src/
  main.tsx · App.tsx · index.css            entry, router, tokens + fonts
  data/   types.ts · kanji.ts · vocab.ts · kanjiInfo.ts · items.ts · kana.ts
  lib/    romaji.ts · progress.ts · picker.ts · question.ts · speech.ts · useHashRoute.ts · useSettings.ts
  components/ TopBar.tsx · TabBar.tsx · SettingsSummary.tsx · SettingsSheet.tsx · SettingsControls.tsx
              StatsLine.tsx · AnswerPanel.tsx · Explanation.tsx · KanjiBreakdown.tsx · SealMark.tsx
  modes/  ChoiceMode.tsx · MatchMode.tsx · TypeMode.tsx · SpellMode.tsx · FillMode.tsx · CardsMode.tsx · types.ts
  pages/  PracticePage.tsx · ProgressPage.tsx · KanaPage.tsx
  **/*.test.ts(x)               unit + component tests next to their source
tests/e2e/  layout.spec.ts · helpers.ts
.github/workflows/deploy.yml
```

---

### Task 1: Project scaffold, tokens, fonts

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/test/setup.ts`, `src/App.test.tsx`
- Modify: `index.html` → `legacy/index.html` (move old app files `index.html app.js data.js kana.html` into `legacy/` so the Vite entry can take `index.html`; Task 15 deletes `legacy/`)

**Interfaces:**
- Produces: npm scripts `dev`, `build` (`tsc -b && vite build`), `preview`, `typecheck` (`tsc -b --noEmit`), `lint` (`eslint .`), `test` (`vitest run`), `e2e` (`playwright test`), `check` (typecheck && lint && test).
- Produces: CSS custom properties in `src/index.css`, mapped into Tailwind v4 via `@theme inline` so classes like `bg-surface text-ink border-line` exist: `--ground --surface --raised --active --line --rule --control --ink --muted --faint --primary --on-primary --positive --negative --late --seal` plus pale pill pairs `--positive-bg --negative-bg --late-bg`. Light values: ground `#f6f6f4`, surface `#ffffff`, active `#ececea`, line `#e6e6e3`, control `#cfd2d6`, ink `#141414`, muted `#5c5f63`, faint `#6b6b6b`, primary `#1d1f20`, on-primary `#ffffff`, positive `#247b50`, negative `#c4242a`, late `#b4610e`, seal `#d2381c`. Dark: ground `#000`, surface `#111`, raised/active `#222`, line `#2e2e2e`, control `#444`, ink `#fff`, muted `#b4b4b4`, faint `#949494`, primary `#fff`, on-primary `#000`, positive `#3fc07a`, negative `#e5566f`, late `#e39a45`, seal `#ff6a4d`.
- Produces: font stacks `--font-sans: "Be Vietnam Pro", "Noto Sans JP", system-ui, sans-serif` and `--font-jp: "Noto Sans JP", "Be Vietnam Pro", sans-serif` (Tailwind `font-sans`, `font-jp`).

- [ ] **Step 1: Move legacy files and scaffold**

Run: `git mv index.html legacy/index.html && git mv app.js data.js kana.html legacy/` then create the Vite React-TS project files by hand (do not run `npm create vite` into a non-empty folder). Install:
`npm i react react-dom @dnd-kit/core @fontsource/be-vietnam-pro @fontsource/noto-sans-jp`
`npm i -D vite @vitejs/plugin-react typescript @types/react @types/react-dom tailwindcss @tailwindcss/vite vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom @playwright/test eslint @eslint/js typescript-eslint eslint-plugin-react-hooks globals`

`vite.config.ts`: `base: "/tango-dojo/"`, plugins `[react(), tailwindcss()]`, `test: { environment: "jsdom", setupFiles: "src/test/setup.ts", include: ["src/**/*.test.{ts,tsx}"] }`. Import fonts in `main.tsx` (`@fontsource/be-vietnam-pro/400.css`, `/600.css`, `@fontsource/noto-sans-jp/400.css`, `/600.css`). `index.html`: `<html lang="vi">`, `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`, `<meta name="color-scheme" content="light dark">`, title `Tango Dojo · 単語道場`.

- [ ] **Step 2: Write the failing smoke test** (`src/App.test.tsx`)

```tsx
test("renders the product name and an h1", () => {
  render(<App />);
  expect(screen.getByText("Tango Dojo")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});
```

- [ ] **Step 3: Run it** — `npx vitest run src/App.test.tsx` → FAIL (App has no content).
- [ ] **Step 4: Implement** a minimal `App` rendering `Tango Dojo` and `<h1>Luyện tập</h1>`, and `src/index.css` with `@import "tailwindcss";`, the tokens above (`:root` and `@media (prefers-color-scheme: dark)`), `@theme inline` mapping, `body { background: var(--ground); color: var(--ink); }`, `.num { font-variant-numeric: tabular-nums; }`, and `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; } }`.
- [ ] **Step 5: Verify** — `npm run check && npm run build` → all pass, `dist/index.html` references `/tango-dojo/assets/`.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "chore: scaffold Vite React TS Tailwind app, move legacy files"`

---

### Task 2: Typed data + romaji

**Files:**
- Create: `scripts/convert-data.mjs`, `src/data/types.ts`, `src/data/kanji.ts`, `src/data/vocab.ts`, `src/data/kanjiInfo.ts`, `src/data/items.ts`, `src/data/data.test.ts`, `src/lib/romaji.ts`, `src/lib/romaji.test.ts`

**Interfaces:**
- Produces (`src/data/types.ts`):
```ts
export type Level = 4 | 3;
export type Deck = "kanji" | "vocab";
export type Pos = "n" | "v" | "i" | "na" | "adv";
export interface Kanji { char: string; hanViet: string; on: string; kun: string; meaning: string; level: Level;
  example: { word: string; reading: string; meaning: string } }
export interface Vocab { word: string; reading: string; meaning: string; pos: Pos; level: Level;
  sentence: { ja: string; vi: string } }
export interface KanjiInfo { hanViet: string; meaning: string; on: string; kun: string }
/** One practisable thing. For kanji: prompt = the char, word/reading/wordMeaning = its example. */
export interface Item { id: string; deck: Deck; level: Level; prompt: string; meaning: string;
  word: string; reading: string; wordMeaning: string;
  hanViet?: string; on?: string; kun?: string;          // kanji only
  pos?: Pos; sentence?: { ja: string; vi: string } }    // vocab only
```
- Produces: `KANJI: Kanji[]`, `VOCAB: Vocab[]`, `KANJI_INFO: Record<string, KanjiInfo>` (the 173 extra kanji, `KANJI_EXTRA` + `KANJI_EXTRA_RD` merged), `ITEMS: Item[]` (ids `"k:" + char`, `"v:" + word`), `lookupKanji(char: string): (KanjiInfo & { core: boolean }) | undefined` (core = it is one of `KANJI`).
- Produces (`src/lib/romaji.ts`): `toKana(input: string, final: boolean): string`, `kataToHira(s: string): string`, `normalizeAnswer(input: string): string` (= `kataToHira(toKana(input.trim(), true))`), `kanaUnits(reading: string): string[]` (small ゃゅょぁぃぅぇぉ join the previous char).

- [ ] **Step 1: Write the conversion script** `scripts/convert-data.mjs`: `vm.runInNewContext` on `legacy/data.js` (replace `const ` with `this.` first, as the old audit did), map positional arrays to the named shapes above, write `src/data/kanji.ts`, `vocab.ts`, `kanjiInfo.ts` as `export const X: Type[] = [...] as const satisfies…`-free plain typed literals via `JSON.stringify(…, null, 2)`. Run `node scripts/convert-data.mjs`.
- [ ] **Step 2: Write the failing data tests** (`src/data/data.test.ts`) — port the legacy audit:

```ts
test("counts match the audited data", () => {
  expect(KANJI).toHaveLength(153); expect(VOCAB).toHaveLength(110);
  expect(Object.keys(KANJI_INFO)).toHaveLength(173);
  expect(KANJI.filter(k => k.level === 4)).toHaveLength(73);
  expect(VOCAB.filter(v => v.level === 4)).toHaveLength(53);
});
test("readings are hiragana only", …);           // /^[぀-ゟー]+$/ for every reading
test("every example word contains its kanji", …);
test("every sentence has exactly one ＿＿", …);
test("okurigana in a word matches the end of its reading", …); // e.g. 珍しい / めずらしい
test("every kanji in every word has a lookup entry", …);      // lookupKanji(c) defined for all CJK chars
test("no two items in a deck share a meaning token", …);      // split on ; and , strip (…), lowercase
test("ids are unique", …);
```
- [ ] **Step 3: Write the failing romaji tests** (`src/lib/romaji.test.ts`):

```ts
test.each([["kaisha","かいしゃ"],["konnichiwa","こんにちわ"],["sennsei","せんせい"],["sensei","せんせい"],
  ["kitte","きって"],["hikkosu","ひっこす"],["ren'ai","れんあい"],["shinpai","しんぱい"],
  ["jouhou","じょうほう"],["gakkou","がっこう"],["hon","ほん"]])("toKana(%s)", (r, k) => expect(toKana(r, true)).toBe(k));
test("trailing n stays n while typing", () => expect(toKana("hon", false)).toBe("ほn"));
test("normalizeAnswer", () => {
  expect(normalizeAnswer(" KAISHA ")).toBe("かいしゃ");
  expect(normalizeAnswer("カイシャ")).toBe("かいしゃ");
  expect(normalizeAnswer("   ")).toBe("");
});
test("kanaUnits joins small kana", () => expect(kanaUnits("きょうみ")).toEqual(["きょ","う","み"]));
```
- [ ] **Step 4: Run** — `npx vitest run src/data src/lib/romaji.test.ts` → FAIL (modules missing).
- [ ] **Step 5: Implement** `items.ts` (`ITEMS`, `lookupKanji`) and `romaji.ts` by porting `legacy/app.js` `ROMA`, `toKana`, `kataToHira`, `units` unchanged in behaviour.
- [ ] **Step 6: Verify** — `npx vitest run` → all pass.
- [ ] **Step 7: Commit** — `git commit -am "feat: typed kanji/vocab data with integrity tests, romaji conversion"` (add new files first).

---

### Task 3: Progress and settings storage

**Files:**
- Create: `src/lib/progress.ts`, `src/lib/progress.test.ts`

**Interfaces:**
- Produces:
```ts
export interface ItemRecord { right: number; wrong: number; lastSeen: number }
export interface Progress { version: 1; items: Record<string, ItemRecord>; bestStreak: number }
export type LevelFilter = "4" | "3" | "both";
export type Mode = "mixed" | "choice" | "match" | "type" | "spell" | "fill" | "cards";
export interface Settings { deck: Deck; level: LevelFilter; mode: Mode; sound: boolean }
export const DEFAULT_SETTINGS: Settings;            // { deck:"vocab", level:"4", mode:"mixed", sound:true }
export function emptyProgress(): Progress;
export function loadProgress(storage?: Storage): Progress;          // key "tango-dojo:v1"
export function saveProgress(p: Progress, storage?: Storage): void; // swallows storage errors
export function recordAnswer(p: Progress, id: string, correct: boolean, streak: number, now: number): Progress; // pure; updates bestStreak = max(bestStreak, streak)
export function isLearned(r: ItemRecord | undefined): boolean;
export function loadSettings(storage?: Storage): Settings;          // key "tango-dojo:settings", merges over defaults, drops invalid values
export function saveSettings(s: Settings, storage?: Storage): void;
```

- [ ] **Step 1: Write the failing tests**

```ts
test("loadProgress returns empty for missing, corrupt, or wrong-version data", () => {
  for (const raw of [null, "{oops", JSON.stringify({ version: 2, items: {} })]) { /* fake storage */
    expect(loadProgress(fake(raw))).toEqual(emptyProgress()); }
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
});
test("loadSettings drops invalid values", () => {
  expect(loadSettings(fake(JSON.stringify({ deck: "x", level: "3", mode: "fill" }))))
    .toEqual({ ...DEFAULT_SETTINGS, level: "3", mode: "fill" });
});
```
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement.** Default `storage` arg = `globalThis.localStorage`, and `loadProgress`/`loadSettings` also catch a throwing `getItem`.
- [ ] **Step 4: Run** — PASS. **Step 5: Commit** — `feat: versioned progress and settings storage`.

---

### Task 4: Picker and question builder

**Files:**
- Create: `src/lib/picker.ts`, `src/lib/question.ts`, `src/lib/picker.test.ts`, `src/lib/question.test.ts`

**Interfaces:**
- Consumes: `Item`, `ITEMS` (Task 2); `Progress`, `isLearned`, `Settings`, `Mode` (Task 3).
- Produces (`picker.ts`):
```ts
export type Rand = () => number;                     // inject for deterministic tests
export function poolFor(items: Item[], deck: Deck, level: LevelFilter): Item[];
export function weight(item: Item, p: Progress, recent: string[]): number;
//   1 + 3*wrong/(right+1); +1 if never seen; ×0.4 if learned; ×0.05 if id in recent
export function pickWeighted(pool: Item[], n: number, p: Progress, recent: string[], rand?: Rand): Item[]; // without replacement
export function distractors(item: Item, field: (i: Item) => string, n: number,
  primary: Item[], fallback: Item[], rand?: Rand): string[]; // unique, ≠ field(item), primary first then fallback
export function remember(recent: string[], ids: string[], max?: number): string[]; // max 8, newest last
export function shuffle<T>(xs: T[], rand?: Rand): T[];
```
- Produces (`question.ts`):
```ts
export type ConcreteMode = Exclude<Mode, "mixed">;
export type ChoiceKind = "meaning" | "hanViet" | "prompt" | "reading";   // prompt = pick the kanji/word from its meaning
export interface Question {
  mode: ConcreteMode;
  items: Item[];                 // 1 item, or 5 for match
  kind?: ChoiceKind;             // choice only
  matchField?: "meaning" | "hanViet" | "reading"; // match only (kanji: meaning|hanViet, vocab: meaning|reading)
  options?: string[];            // choice/fill: 4 shuffled values incl. the answer
  answer?: string;               // choice/fill: the correct value
  tiles?: string[];              // spell: shuffled kanaUnits(reading) + 3 decoys
}
export function availableModes(deck: Deck): ConcreteMode[];  // vocab adds "fill"
export function pickMode(deck: Deck, rand?: Rand): ConcreteMode;
//   bag: choice×3, type×2, spell×2, match×1, + fill×3 for vocab
export function buildQuestion(mode: ConcreteMode, ctx: { pool: Item[]; all: Item[]; progress: Progress;
  recent: string[]; rand?: Rand }): Question;
export function choiceField(kind: ChoiceKind): (i: Item) => string;
export function isKanjiFirst(q: Question): boolean;  // kanji deck and kind ≠ "reading", or mode "cards" on kanji
```
Choice kinds: kanji bag `meaning, meaning, hanViet, prompt, reading`; vocab bag `meaning, prompt, reading`. Fill picks from pool items with `sentence`, distractors from same `pos` in the pool, fallback same `pos` in `all`. Spell decoys: 3 units from all readings not in the target. Match: 5 items whose `matchField` values are unique.

- [ ] **Step 1: Write the failing tests** (seeded `rand` from a tiny LCG helper in the test file)

```ts
test("poolFor filters deck and level", () => {
  expect(poolFor(ITEMS, "kanji", "4")).toHaveLength(73);
  expect(poolFor(ITEMS, "vocab", "both")).toHaveLength(110);
});
test("weight favours missed, unseen, and penalises recent", () => {
  const it = ITEMS[0]; const p = emptyProgress();
  expect(weight(it, p, [])).toBe(2);
  expect(weight(it, p, [it.id])).toBeCloseTo(0.1);
});
test("pickWeighted never returns duplicates", …);
test("distractors are unique, exclude the answer, and fall back when the pool is small", () => {
  const adv4 = poolFor(ITEMS, "vocab", "4").filter(i => i.pos === "adv"); // 4 items
  const it = adv4[0];
  const d = distractors(it, i => i.prompt, 3, adv4.filter(x => x !== it).slice(0, 1), ITEMS, seeded(1));
  expect(new Set(d).size).toBe(3); expect(d).not.toContain(it.prompt);
});
test("buildQuestion choice always has 4 unique options including the answer", () => {
  for (let s = 0; s < 200; s++) { const q = buildQuestion("choice", ctx(seeded(s)));
    expect(new Set(q.options).size).toBe(4); expect(q.options).toContain(q.answer); }
});
test("buildQuestion match always has 5 unique values", …);   // N4 kanji and N4 vocab, 200 seeds
test("buildQuestion fill uses an item with a sentence", …);
test("spell tiles contain every unit of the reading", …);
test("availableModes", () => expect(availableModes("kanji")).not.toContain("fill"));
```
- [ ] **Step 2: Run** — FAIL. **Step 3: Implement** (port `legacy/app.js` `weight`, `pickN`, `distractors`, `remember`, `modeChoice` kinds, `modeMatch` dedupe, `modeSpell` tiles).
- [ ] **Step 4: Run** — PASS. **Step 5: Commit** — `feat: weighted picker and question builder`.

---

### Task 5: Speech

**Files:**
- Create: `src/lib/speech.ts`, `src/lib/speech.test.ts`

**Interfaces:**
- Produces: `speak(text: string, enabled: boolean): void` — cancels any current speech, `lang = "ja-JP"`, `rate = 0.85`, uses a `ja` voice when `getVoices()` has one; no-op when `!enabled` or `speechSynthesis` is missing.

- [ ] **Step 1: Failing tests:** `speak is a no-op without speechSynthesis` (delete `window.speechSynthesis`, expect no throw); `speak does nothing when disabled` (spy on a fake `speechSynthesis.speak`, expect not called); `speak sets ja-JP` (fake, expect utterance.lang === "ja-JP"). Stub `SpeechSynthesisUtterance` in the test.
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS → **Step 5: Commit** `feat: Japanese speech helper`.

---

### Task 6: Shell — router, top bar, tab bar

**Files:**
- Create: `src/lib/useHashRoute.ts`, `src/components/SealMark.tsx`, `src/components/TopBar.tsx`, `src/components/TabBar.tsx`, `src/pages/ProgressPage.tsx` (placeholder `h1` only), `src/pages/KanaPage.tsx` (placeholder `h1` only), `src/App.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `type Route = "practice" | "progress" | "kana"`; `useHashRoute(): [Route, (r: Route) => void]` (unknown hash → `"practice"`). Page titles (the screen's `h1`): `practice` "Luyện tập 練習", `progress` "Tiến độ 進捗", `kana` "Luyện Kana かな". Tab labels: "Luyện tập", "Tiến độ", "Kana".
- Produces: layout contract used by later tasks — `<main>` has `pb-[calc(56px+env(safe-area-inset-bottom)+var(--next-space,0px))]` on phone; PracticePage sets `--next-space: 64px` while the pinned Next button is shown.

Layout: TopBar 48px (`SealMark` = vermilion rounded square with white 道, 28px; "Tango Dojo" 16/600). Phone: TabBar fixed bottom, 56px + `env(safe-area-inset-bottom)`, three equal tabs, active = `text-ink` + 2px top rule in ink, inactive `text-muted`; hidden from `sm:` (640px). From `sm:` the three links sit at the right of the TopBar. Content column `max-w-[720px] mx-auto px-4 sm:px-6`.

- [ ] **Step 1: Failing tests:** `defaults to the practice page` (h1 "Luyện tập 練習"); `tab click changes route and h1` (click "Tiến độ" → `location.hash === "#/progress"` and h1 "Tiến độ 進捗"); `unknown hash falls back to practice`.
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS.
- [ ] **Step 5: Commit** — `feat: app shell with hash routes, top bar and phone tab bar`.

---

### Task 7: Settings — summary button, sheet, inline controls

**Files:**
- Create: `src/lib/useSettings.ts`, `src/components/SettingsControls.tsx`, `src/components/SettingsSummary.tsx`, `src/components/SettingsSheet.tsx`, `src/components/Settings.test.tsx`

**Interfaces:**
- Consumes: `Settings`, `loadSettings`, `saveSettings`, `availableModes`.
- Produces: `useSettings(): [Settings, (patch: Partial<Settings>) => void]` (persists on change; if `deck` becomes `"kanji"` while `mode === "fill"`, mode becomes `"mixed"`).
- Produces: `MODE_LABELS: Record<Mode, { vi: string; ja: string }>` in `SettingsControls.tsx` — mixed "Hỗn hợp"/"ミックス", choice "Trắc nghiệm"/"選択", match "Kéo nối"/"マッチング", type "Gõ cách đọc"/"読み入力", spell "Ghép cách đọc"/"読み並べ", fill "Điền chỗ trống"/"穴埋め", cards "Thẻ ghi nhớ"/"カード". Deck labels "Kanji 漢字", "Từ vựng 語彙"; level "N4", "N3", "Cả hai"; sound "Âm thanh 音".
- Produces: `<SettingsControls settings onChange />` (segmented groups; selected = `bg-active text-ink`, never accent); `<SettingsSummary settings onOpen />` (phone only, `sm:hidden`, text `"{deck} · {level} · {mode}"`, e.g. "Từ vựng · N4 · Hỗn hợp ▾", ≥44px); `<SettingsSheet open onClose>` (bottom sheet, `role="dialog"`, `aria-modal`, closes on backdrop tap/Escape, has a "Xong" button); inline row from `sm:`.

- [ ] **Step 1: Failing tests:** `summary shows current settings` ("Từ vựng · N4 · Hỗn hợp"); `opening the sheet and choosing N3 updates summary and storage` (localStorage `tango-dojo:settings` level "3"); `fill is disabled for kanji with a reason` (button disabled, `title` "Điền chỗ trống chỉ dùng cho từ vựng"); `switching to kanji while on fill falls back to mixed`; `Escape closes the sheet`.
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS → **Step 5: Commit** `feat: settings summary, bottom sheet and inline controls`.

---

### Task 8: Practice engine, answer panel, explanation, Choice mode

**Files:**
- Create: `src/modes/types.ts`, `src/modes/ChoiceMode.tsx`, `src/components/AnswerPanel.tsx`, `src/components/Explanation.tsx`, `src/components/KanjiBreakdown.tsx`, `src/components/StatsLine.tsx`, `src/pages/PracticePage.tsx`, `src/pages/PracticePage.test.tsx`
- Modify: `src/App.tsx` (render PracticePage with settings)

**Interfaces:**
- Consumes: everything from Tasks 2–7.
- Produces (`src/modes/types.ts`):
```ts
export interface AnswerResult { results: { item: Item; correct: boolean }[]; skipPanel?: boolean; summary?: "match" }
export interface ModeProps { question: Question; locked: boolean; sound: boolean; onAnswer: (r: AnswerResult) => void }
```
- Produces: `<PracticePage settings rand? />` (`rand?: Rand`, defaults to `Math.random`; tests pass a seeded one) — holds `question`, `answer?: AnswerResult`, session `{ correct, total, streak }`, `progress`, `recent`. `onAnswer` ignored when `answer` is already set (lock). Records every result via `recordAnswer` + `saveProgress`, speaks `item.reading` (fill: the full sentence with the word), then shows `AnswerPanel` unless `skipPanel`. `next()` builds a new question (`pickMode` when mode is mixed), `remember`s the shown ids; Enter/Space trigger `next()` only when an answer is shown and ≥250ms after it appeared. Changing deck/level resets `recent`; changing mode keeps it.
- Produces: `<AnswerPanel correct onNext>{children}</AnswerPanel>` — verdict "正解！ Chính xác!" / "残念… Chưa đúng."; button "Tiếp 次へ →" (`data-testid="next-button"`, primary colours, full width and `fixed` above the tab bar on phone, right-aligned in flow from `sm:`); scrolls itself into view (`scrollIntoView({ block: "nearest" })`) on mount; focuses the Next button.
- Produces: `<Explanation item kanjiFirst />` — kanjiFirst (kanji item): big kanji, `hanViet` bold, meaning, "On … · Kun …", then "Ví dụ" word · reading · wordMeaning and `KanjiBreakdown` of the word's other kanji. Otherwise: word · reading · wordMeaning then `KanjiBreakdown` of the whole word with `focus` = the kanji item's char.
- Produces: `<KanjiBreakdown word focus? exclude? />` — one row per CJK char via `lookupKanji`: kanji · Hán Việt · meaning (+ "chữ đang học" tag in `--seal` when `focus`), On/Kun ("—" when empty). Phone: two lines per row; `sm:` 4-column table.
- Produces: `<StatsLine correct total streak />` → "12 đúng · 80% · chuỗi 4" ("–" for % when total 0), `tabular-nums`.
- Produces: `<ChoiceMode />` — prompt (`clamp(56px, 22vw, 112px)` for single kanji, `clamp(36px, 11vw, 64px)` for words, 26px/600 Vietnamese for `kind === "prompt"` questions), hint line per kind: meaning "Nghĩa là gì? · 意味は？", hanViet "Âm Hán Việt là gì? · 漢越音は？", reading "Đọc thế nào? · 読み方は？ · {wordMeaning}", prompt "Chữ kanji nào mang nghĩa này? · どの漢字？" / "Từ nào mang nghĩa này? · どの言葉？". Options `data-testid="choice-option"`, 1 column < 640px, 2 columns from `sm:`, min-height 48px; number badges only `@media (pointer: fine)`; keys 1–4. After answering: correct option green, chosen wrong option red, all disabled.

- [ ] **Step 1: Failing tests** (`PracticePage.test.tsx`, seeded rand injected via a `rand` prop):

```tsx
test("waits for Next after answering", async () => {
  renderPractice({ mode: "choice" });
  await user.click(screen.getAllByTestId("choice-option")[0]);
  expect(screen.getByTestId("next-button")).toBeInTheDocument();
  await new Promise(r => setTimeout(r, 2000));
  expect(screen.getByTestId("next-button")).toBeInTheDocument();   // no auto-advance
});
test("records only once on double click", async () => {
  renderPractice({ mode: "choice" });
  const opt = screen.getAllByTestId("choice-option")[0];
  await user.dblClick(opt);
  expect(Object.values(loadProgress().items).reduce((n, r) => n + r.right + r.wrong, 0)).toBe(1);
});
test("Next shows a new question and hides the panel", …);
test("kanji meaning question explains the kanji first, with Ví dụ", …);  // deck kanji, kind meaning
test("reading question explains every kanji of the word and tags the studied one", …); // "chữ đang học"
test("stats line updates", …);   // "1 đúng · 100% · chuỗi 1" after a correct answer
```
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS.
- [ ] **Step 5: Commit** — `feat: practice engine, answer panel, kanji breakdown, choice mode`.

---

### Task 9: Type and Spell modes

**Files:**
- Create: `src/modes/TypeMode.tsx`, `src/modes/SpellMode.tsx`, `src/modes/TypeSpell.test.tsx`
- Modify: `src/pages/PracticePage.tsx` (route `type`, `spell` to the new components)

**Interfaces:**
- Consumes: `ModeProps`, `normalizeAnswer`, `toKana`, `kanaUnits`.
- Produces: `TypeMode` — prompt = `item.word`, hint "Gõ cách đọc bằng romaji (hoặc kana) · 読みを入力 · {wordMeaning}"; input `data-testid="type-input"` (`font-size ≥16px`, `autoCapitalize="off" autoCorrect="off" spellCheck={false} enterKeyHint="done"`, placeholder "vd: kaisha"); live preview `toKana(value, false)`; button "Kiểm tra" (`data-testid="check-button"`). Submit compares `normalizeAnswer(value) === item.reading`; empty → ignored. Wrong: preview shows the typed kana struck through → correct reading.
- Produces: `SpellMode` — slots = `kanaUnits(item.reading).length`; tiles `data-testid="tile"` ≥48px; tapping a filled slot or Backspace removes it; when full, compares and answers. Hint "Bấm các chữ kana theo đúng thứ tự · 読みを並べよう · {wordMeaning}".

- [ ] **Step 1: Failing tests:** `typing the romaji reading is correct` (`kaisha` for 会社 → verdict "正解！"); `katakana input is accepted`; `ignores empty submit` (click Kiểm tra with "  " → no next-button); `spell: tapping tiles in order is correct`; `spell: tapping a filled slot removes it`.
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS → **Step 5: Commit** `feat: type-the-reading and build-the-reading modes`.

---

### Task 10: Fill and Cards modes

**Files:**
- Create: `src/modes/FillMode.tsx`, `src/modes/CardsMode.tsx`, `src/modes/FillCards.test.tsx`
- Modify: `src/pages/PracticePage.tsx`

**Interfaces:**
- Produces: `FillMode` — `sentence.ja` with ＿＿ rendered as a blank (`data-testid="blank"`, "？" until answered, then the word), `sentence.vi` below in muted italic, 4 options reusing ChoiceMode's option list component (extract `OptionList` into `src/modes/OptionList.tsx` in this task and use it from ChoiceMode too).
- Produces: `CardsMode` — front: prompt + hint "Nhớ lại nghĩa và cách đọc, rồi bấm vào thẻ (hoặc phím Space) để lật · めくってみよう"; tap/Space flips (`data-testid="flip-card"`); back: `<Explanation kanjiFirst />` with the big repeated prompt hidden; buttons "1 · Chưa nhớ" (`rate-again`) and "2 · Đã nhớ" (`rate-good`), keys 1/2; rating calls `onAnswer({ results, skipPanel: true })` and PracticePage advances immediately.

- [ ] **Step 1: Failing tests:** `fill shows the sentence, the translation and fills the blank after answering`; `cards flip then "Đã nhớ" records right and shows a new card without a Next button`.
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS → **Step 5: Commit** `feat: fill-the-blank and flashcard modes`.

---

### Task 11: Match mode

**Files:**
- Create: `src/modes/MatchMode.tsx`, `src/modes/MatchMode.test.tsx`
- Modify: `src/pages/PracticePage.tsx`, `src/components/AnswerPanel.tsx` (match summary body)

**Interfaces:**
- Consumes: `@dnd-kit/core` (`DndContext`, `useDraggable`, `useDroppable`, `PointerSensor` with `activationConstraint: { distance: 6 }`, `TouchSensor` with `{ delay: 120, tolerance: 6 }`, `KeyboardSensor`).
- Produces: `MatchMode` — title "Nối mỗi {chữ kanji|từ} với {nghĩa|âm Hán Việt|cách đọc} của nó", hint "Bấm một ô bên trái rồi bấm ô tương ứng bên phải — hoặc kéo thả · 線で結ぼう". One CSS grid, `grid-template-columns: 1fr 1fr`, every card placed with explicit `gridRow`/`gridColumn` so rows share height; left `data-testid="match-left"`, right `data-testid="match-right"`, min-height 56px. Tap left then right (or drag) → attempt. Correct: both `done` (green); the right card swaps `gridRow` with whichever right card sits in the left card's row; if that item had a wrong attempt, both get `late` (orange). Wrong: both flash red 450ms, item marked missed. When all 5 done → `onAnswer({ results: items.map(i => ({ item: i, correct: !missed.has(i.id) })), summary: "match" })`.
- Produces: AnswerPanel body for `summary === "match"`: "Nối đúng hết ngay lần đầu!" or "Nối sai {n} / 5 cặp · ô màu cam là cặp bạn đã nối sai lúc đầu", then a table: prompt · (hanViet | reading) · meaning · "nối sai" tag.

- [ ] **Step 1: Failing tests** (tap path only; dnd-kit drag is covered by Playwright in Task 14):
```tsx
test("tapping each pair finishes the round and every row holds a true pair", …); // after: for each row r, left.item === right.item
test("a wrong attempt marks that pair late and reports it as wrong", …);       // class contains "late"; summary "Nối sai 1 / 5 cặp"
```
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS → **Step 5: Commit** `feat: match mode with tap and drag, pairs settle into rows`.

---

### Task 12: Progress page

**Files:**
- Modify: `src/pages/ProgressPage.tsx`
- Create: `src/pages/ProgressPage.test.tsx`

**Interfaces:**
- Produces: four bars "Kanji 漢字 · N4", "Kanji 漢字 · N3", "Từ vựng 語彙 · N4", "Từ vựng 語彙 · N3", each "đã thuộc {learned} / {total}" with a learned segment (`--positive`) and a seen segment (`--late` at 50% opacity); 1 column on phone, 2 from `sm:`. Legend "đã thuộc (đúng từ 3 lần trở lên, phần lớn là đúng) · đã gặp". "Những chữ hay sai nhất — sẽ xuất hiện thường xuyên hơn": up to 18 items sorted by `wrong - right/2` desc with `wrong > 0`, showing prompt, (hanViet | reading), meaning, "✗{wrong} ✓{right}"; empty state "Chưa sai câu nào — luyện tập thôi!". Reset button "Xóa toàn bộ tiến độ" → `confirm("Xóa toàn bộ tiến độ đã lưu?")` → `saveProgress(emptyProgress())`.

- [ ] **Step 1: Failing tests:** `shows totals 73 / 80 / 53 / 57`; `lists a missed item with its Hán Việt`; `reset clears after confirm`.
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS → **Step 5: Commit** `feat: progress page`.

---

### Task 13: Kana page

**Files:**
- Create: `src/data/kana.ts`, `src/pages/KanaPage.test.tsx`
- Modify: `src/pages/KanaPage.tsx`

**Interfaces:**
- Produces (`kana.ts`): `KANA_BASIC`, `KANA_DAKUTEN`, `KANA_YOON`: `(readonly [hira: string, ...romaji: string[]] | null)[]` ported verbatim from `legacy/kana.html` (`null` = empty chart cell); `toKata(s: string): string`.
- Produces: KanaPage with two segments "Kiểm tra テスト" / "Bảng chữ 五十音表". Quiz: script (Hiragana / Katakana / Cả hai), sets (Cơ bản / が・ぱ / きゃ, multi-select, at least one), answer type (Gõ romaji / Trắc nghiệm); same AnswerPanel + Next behaviour; weighted by misses stored under `tango-dojo:kana` (`{ miss: Record<string, number>, seen: Record<string, number>, best: number }`); "Chữ hay sai nhất" chips. Chart: grids of 5 (yōon 3) cells, tap to `speak`.

- [ ] **Step 1: Failing tests:** `typing the romaji of the shown kana is correct` (accepts alternates: し → "si"); `choice mode shows 4 options`; `chart has 104 hiragana cells and switches to katakana`.
- [ ] **Step 2: Run** FAIL → **Step 3: Implement** → **Step 4: Run** PASS → **Step 5: Commit** `feat: kana quiz and chart page`.

---

### Task 14: Browser layout tests and design inspection

**Files:**
- Create: `playwright.config.ts`, `tests/e2e/helpers.ts`, `tests/e2e/layout.spec.ts`

**Interfaces:**
- Produces: Playwright projects `phone-360` (360×740, `hasTouch`, `isMobile`), `phone-390` (390×844, `hasTouch`, `isMobile`), `tablet-768` (768×1024), `desktop-1280` (1280×800), `phone-390-dark` and `desktop-1280-dark` (`colorScheme: "dark"`). `webServer: { command: "npm run build && npm run preview -- --port 4173 --strictPort", url: "http://localhost:4173/tango-dojo/" }`, `baseURL` the same.
- Produces (`helpers.ts`): `gotoPractice(page, settings: Partial<Settings>)` (writes `tango-dojo:settings` via `addInitScript`, opens `#/practice`); `answerAny(page)` (answers whatever mode is showing using the test ids); `expectNoHorizontalOverflow(page)` (`scrollWidth <= innerWidth`); `expectTapTargets(page, selector, min = 44)`.

- [ ] **Step 1: Write the specs** — for each project, for deck `kanji` and `vocab`, for every mode in `availableModes(deck)` plus `mixed`:
  - no horizontal overflow before and after answering;
  - on phone projects the `[data-testid=question]` top is `< innerHeight / 2`;
  - after answering, `next-button` (or the next card for `cards`) is inside the viewport and not covered (`elementFromPoint` at its centre is the button);
  - every `choice-option`, `tile`, `match-left`, `match-right`, `check-button`, `next-button` ≥ 44px tall;
  - no `console` errors and no page errors.
  Plus: `match drag works with the mouse` (desktop: drag a left card onto its true pair → both `done`); `progress and kana pages have no overflow`.
- [ ] **Step 2: Run** — `npx playwright install chromium && npm run e2e` → fix any failure in the owning component, re-run until all pass.
- [ ] **Step 3: Design inspection** — `npm run preview -- --port 4173 &` then `node "$HOME/.claude/skills/design-taste-frontend/scripts/inspect.mjs" --app http://localhost:4173/tango-dojo/ --out .taste-skill/after`. Expected: `0 FAIL`. Open every listed screenshot (1440/768/390). A `WARN` about figures ≥ 48px is expected for the question prompt (it is the study object, not a dashboard figure); every other WARN gets fixed or a one-sentence defence in the commit message.
- [ ] **Step 4: Commit** — `test: Playwright layout checks at 4 sizes, light and dark`.

---

### Task 15: CI/CD, README, legacy removal

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`, `.gitignore` (add `playwright/.cache` if created)
- Delete: `legacy/`

**Interfaces:**
- Produces workflow: on `push` to `main` and on `pull_request`. Job `check` (ubuntu-latest, Node 22): `npm ci` → `npm run typecheck` → `npm run lint` → `npm test` → `npx playwright install --with-deps chromium` → `npm run e2e` (builds via webServer) → `actions/upload-pages-artifact@v3` with `path: dist` (push only). Job `deploy` (needs `check`, `if: github.event_name == 'push' && github.ref == 'refs/heads/main'`, `permissions: { pages: write, id-token: write }`, `environment: github-pages`): `actions/deploy-pages@v4`. Top-level `concurrency: { group: pages, cancel-in-progress: true }`.

- [ ] **Step 1: Delete legacy** — `git rm -r legacy` and confirm `npm run check && npm run e2e` still pass (nothing imports it; the conversion script already ran — keep `scripts/convert-data.mjs` but make it exit with a message if `legacy/data.js` is missing).
- [ ] **Step 2: Write the workflow** as above.
- [ ] **Step 3: Update README** (Vietnamese): live link `https://haokiet10.github.io/tango-dojo/`, features (unchanged list, plus dark mode and phone layout), `npm install`, `npm run dev`, `npm run check`, `npm run e2e`, `npm run build`, where the data lives (`src/data/`), JLPT-level note.
- [ ] **Step 4: Verify locally** — `npm ci && npm run check && npm run e2e && npm run build` → all pass.
- [ ] **Step 5: Commit and push** — `git commit -m "ci: test and deploy to GitHub Pages; remove legacy static app"` then `git push origin main`.
- [ ] **Step 6: Owner step** — ask the owner to set repo **Settings → Pages → Source: GitHub Actions**, then re-run the workflow (`gh` is not logged in on this machine; the owner can click "Re-run jobs"). Verify `https://haokiet10.github.io/tango-dojo/` loads, open it at 390px in the browser pane, answer one question per mode, and confirm no console errors.
