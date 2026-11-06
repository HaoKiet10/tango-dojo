# Tango Dojo rebuild — design

Date: 2026-11-06 · Repo: https://github.com/HaoKiet10/tango-dojo · Status: approved in chat, awaiting written review

## 1. Goal

Rebuild the Japanese practice app (today: loose `index.html`, `app.js`, `data.js`, `kana.html`) as a
properly tooled, mobile-first web app, published automatically to GitHub Pages.

**Who it is for:** the owner (a Vietnamese speaker studying JLPT N4→N3), mainly on a phone, plus anyone
who finds the public repo.

**Success means**

- Every practice mode is comfortable on a 360–430px phone: nothing overflows sideways, the question sits
  in the top part of the screen, every tap target is at least 44px, drag-to-match works by touch.
- Same content and behaviour as today: Vietnamese + Japanese UI (no English), Hán Việt for every kanji,
  the app always waits for **Tiếp 次へ** after an answer, progress is saved.
- Live at `https://haokiet10.github.io/tango-dojo/`, published only when all checks pass.
- Light and dark mode, following the phone's setting.

**Out of scope:** installable/offline app (PWA), accounts or syncing progress between devices, new
kanji/vocab content, migrating progress from the old localhost page.

## 2. Stack

Vite · React · TypeScript · Tailwind CSS v4 · @dnd-kit (drag and drop) · Vitest + Testing Library ·
Playwright · ESLint · GitHub Actions → GitHub Pages. Fonts self-hosted with @fontsource:
Be Vietnam Pro (Latin/Vietnamese) and Noto Sans JP (Japanese).

## 3. Structure

```
src/
  data/        kanji.ts · vocab.ts · kanjiInfo.ts · types.ts
  lib/         romaji.ts     romaji → kana
               picker.ts     weighted picking, distractors, no two correct answers, recent-item memory
               progress.ts   load/save progress + settings (localStorage), versioned, corruption-safe
               speech.ts     Japanese pronunciation (Web Speech API), mute-aware
  components/  TopBar · SettingsSheet · SettingsSummary · StatsLine · AnswerPanel · KanjiBreakdown · TabBar
  modes/       ChoiceMode · MatchMode · TypeMode · SpellMode · FillMode · CardsMode
  pages/       PracticePage · ProgressPage · KanaPage (kana quiz + chart)
  App.tsx      hash routes: #/practice (default), #/progress, #/kana
tests/e2e/     Playwright specs
scripts/       convert-data.mjs (one-time: old data.js → typed TS)
```

**Data flow:** settings (deck, level, mode) → `picker` chooses the item(s) → the mode component renders
the question and reports only `{ item, correct }` → `progress` records it → `AnswerPanel` shows the
explanation and waits for Next. "Mixed" picks a mode per question (choice ×3, type ×2, spell ×2,
match ×1, plus fill ×3 for vocab), as today.

Mode components know nothing about each other; all logic lives in `lib/` as pure functions so it can be
unit-tested without a browser.

## 4. Screens and layout

Mobile first. Bands: phone < 640px, tablet 640–1023px, desktop ≥ 1024px. Checked at 360, 390, 768, 1280.

### 4.1 Shell

- **Top bar, 48px:** the product mark (a small vermilion **道** seal, hanko style) + "Tango Dojo"; the
  page's `h1` (Luyện tập / Tiến độ / Luyện Kana) at 20–24px below it on phone.
- **Phone:** bottom **tab bar**, 56px + safe-area inset: Luyện tập 練習 · Tiến độ 進捗 · Kana かな.
  Active tab = ink label and icon; inactive = grey. No coloured fill.
- **Tablet/desktop:** the three links move into the top bar; content in a centred column ≤ 720px.

### 4.2 Practice page

- **Settings, phone:** one summary button `Từ vựng · N4 · Hỗn hợp ▾` opening a bottom **SettingsSheet**
  with: deck (Kanji 漢字 / Từ vựng 語彙), level (N4 / N3 / Cả hai), practice type (7 options), sound
  on/off. **Tablet/desktop:** the same controls inline in one row. Fill-the-blank is disabled for the
  kanji deck, with the reason shown.
- **Question card:** prompt sized with `clamp()` so long words (相変わらず) never overflow; mode tag;
  one hint line in Vietnamese + Japanese.
- **StatsLine:** one quiet line, `12 đúng · 80% · chuỗi 4`; full numbers live on the Tiến độ page.
- **AnswerPanel:** verdict (正解！ Chính xác! / 残念… Chưa đúng.), the explanation, and **Tiếp 次へ →**.
  On phone the Next button is pinned above the tab bar, with matching padding under the content so it
  covers nothing; the panel scrolls into view when it appears. Enter/Space also trigger Next.
- **KanjiBreakdown:** one row per kanji in the word: kanji · Hán Việt · meaning, On/Kun. Phone: two
  lines per row (kanji · Hán Việt · meaning / On · Kun). Desktop: a 4-column table. The kanji being
  studied carries a "chữ đang học" tag. Kanji-only questions lead with the kanji, the example word
  under "Ví dụ". This breakdown is the app's signature element and the one place the accent appears.

### 4.3 Practice modes

| Mode | Phone behaviour |
|---|---|
| Trắc nghiệm | Answer buttons in 1 column, ≥ 48px; 2 columns from 640px. Number-key hints (1–4) shown only with a fine pointer. |
| Kéo nối | Two columns in one shared grid so rows align; **tap one, then its match** is the primary interaction on touch (hint says so); dragging via @dnd-kit also works (touch, mouse, keyboard). A correct match moves into its kanji's row; a pair matched after a mistake turns orange. |
| Gõ cách đọc | Full-width input, 16px+, `autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="done"`; live kana preview; a visible **Kiểm tra** button. |
| Ghép cách đọc | Kana tiles ≥ 48px, wrapping; tap a filled slot or Backspace to undo. |
| Điền chỗ trống | Sentence with a blank, Vietnamese translation, 4 choices (same part of speech). Vocab only. |
| Thẻ ghi nhớ | Tap/Space to flip; back shows the full explanation; **1 · Chưa nhớ** / **2 · Đã nhớ** advance. |

### 4.4 Progress and Kana pages

- **Tiến độ:** learned/seen bars for Kanji N4, Kanji N3, Từ vựng N4, Từ vựng N3 (1 column on phone,
  2 from 640px); the trickiest items (kanji with Hán Việt, vocab with reading); reset with confirmation.
- **Luyện Kana:** today's kana quiz (hiragana/katakana/both, basic/dakuten/yōon, type or choose) and
  the chart with pronunciation, in the same shell and visual system; waits for Next like the main app.

### 4.5 Visual system (from the design-taste-frontend app-screen review)

- **Colour:** neutral off-white ground, white surfaces, near-black ink. Colour only carries meaning:
  green = correct, red = wrong, orange = matched after a mistake, vermilion = the seal and the
  "chữ đang học" tag. Selected controls are a neutral grey pill; primary buttons (Next, Kiểm tra) are
  near-black (white in dark mode). The old cream + terracotta palette is not reused.
- **Contrast:** every text colour reaches 4.5:1 on its surface, in both themes.
- **Dark mode:** `prefers-color-scheme`; true neutral darks (#000 / #111 / #222), no navy.
- **Surfaces:** 1px quiet borders, no resting shadows; radius 8px cards, 6px controls, one system.
- **Type:** Be Vietnam Pro + Noto Sans JP; at most six UI sizes (12/14/16/20/24 + the prompt's fluid
  size); tabular figures for numbers.
- **Motion:** feedback only (press, card flip, a match sliding into its row, the sheet opening);
  respects `prefers-reduced-motion`.

## 5. Data

A one-time script converts today's positional arrays into named, typed records (no retyping):

```ts
interface Kanji     { char: string; hanViet: string; on: string; kun: string; meaning: string;
                      level: 4 | 3; example: { word: string; reading: string; meaning: string } }
interface Vocab     { word: string; reading: string; meaning: string;
                      pos: "n" | "v" | "i" | "na" | "adv"; level: 4 | 3;
                      sentence: { ja: string; vi: string } }   // ja contains ＿＿ exactly once
interface KanjiInfo { hanViet: string; meaning: string; on: string; kun: string }  // 173 extra kanji
```

Content is unchanged from the current, audited `data.js` (153 kanji, 110 vocab, 173 extra kanji).

## 6. Progress, settings and sound

- localStorage key `tango-dojo:v1`: `{ version: 1, items: { [id]: { right, wrong, lastSeen } }, bestStreak }`;
  settings under `tango-dojo:settings`. Unknown version or unparsable data → start fresh, no crash.
- **Learned** = right ≥ 3 and right ≥ 2 × wrong. Picking weight favours missed and unseen items and
  avoids the last 8 items; switching practice type keeps that memory, switching deck/level resets it.
- Sound: Web Speech API with a `ja-JP` voice; skipped silently if none; on/off switch in settings.

## 7. Testing

| Layer | Tool | Covers |
|---|---|---|
| Logic + data | Vitest | romaji→kana cases; picker (no repeats, weighting, unique correct answer, distractor fallback); progress save/load/corruption; data integrity (fields, kana readings, no overlapping meanings, every kanji in every word has info, okurigana matches reading, one blank per sentence) |
| Components | Vitest + Testing Library | each mode: correct/wrong flow, waits for Next, explanation content; match by tapping |
| Browser | Playwright | every mode × both decks at 360/390/768/1280, light + dark: no horizontal overflow, question starts in the top half on phone, tap targets ≥ 44px, no console errors |

Also: `tsc --noEmit`, ESLint, and `design-taste-frontend` `inspect.mjs --app` on the built site with
0 FAIL.

## 8. Publishing

- GitHub Actions on push to `main`: install → typecheck → lint → unit tests → build → Playwright →
  deploy to GitHub Pages (only if every step passes). Pull requests run the checks without deploying.
- Vite `base: "/tango-dojo/"`; hash routing so Pages needs no 404 fallback.
- One manual step for the owner: repo Settings → Pages → Source: "GitHub Actions".
- `.gitignore`: `node_modules`, `dist`, `.taste-skill`, Playwright reports.
- README updated with the live link and run/test/build commands. The old static files are removed once
  the new app reaches parity (they remain in git history).
