# Tango Dojo — Grammar (Ngữ pháp) design

Date: 2026-11-07 · Status: approved in chat, awaiting spec review

## Goal

Add JLPT-style grammar practice to Tango Dojo for a Vietnamese-speaking learner at about N4→N3, mostly on a phone. Grammar becomes a third deck next to kanji and vocab, with about 150 N5–N3 patterns and a browsable reference page.

**Success:** the learner can drill grammar the way the JLPT tests it (pick the pattern that fits a blank, put sentence pieces in order, know what a pattern means). Wrong patterns come back more often, progress shows per level, and any pattern can be looked up on a Ngữ pháp page.

Existing rules still apply: UI in Vietnamese + Japanese (no English), meanings in Vietnamese, never auto-advance, mobile first, colour only carries meaning.

## Scope

In scope:
- About 150 patterns (≈50 each at N5, N4, N3), each with 2 example sentences.
- A third deck, `grammar`, in the practice screen.
- Two new practice modes, plus the existing multiple choice for meaning.
- A new Ngữ pháp tab with a reference page.
- Grammar bars on the Progress page.

Out of scope: typing, flashcards and drag-match for grammar; JLPT ★-position trivia (we order all pieces instead); audio beyond the existing speech helper; complete JLPT lists (~350).

## Data

New file `src/data/grammar.ts` exports `GRAMMAR: Grammar[]`. New types in `src/data/types.ts`:

```ts
export type Deck = "kanji" | "vocab" | "grammar";

export interface GrammarExample {
  /** contains ＿＿ exactly once, where `answer` goes */
  ja: string;
  answer: string;
  /** 3–5 pieces; joined they equal ja with ＿＿ replaced by answer; one piece equals answer */
  pieces: string[];
  vi: string;
}

export interface Grammar {
  id: string;            // ascii slug, unique, e.g. "nagara"
  pattern: string;       // "〜ながら"
  level: Level;
  form: string;          // "Vます(bỏ ます) + ながら"
  meaning: string;       // "vừa … vừa …" — Vietnamese, unique per deck by the existing token rule
  note: string;          // one or two Vietnamese sentences on usage
  confusables: string[]; // ids of look-alike patterns, may be empty
  examples: [GrammarExample, GrammarExample];
}
```

`Item` gains optional `grammar?: Grammar`. `src/data/items.ts` maps each pattern to one item:
- `id: "g:" + id`, `deck: "grammar"`, `prompt: pattern`, `meaning`, `level`.
- `word` = pattern, `reading` = "" and `wordMeaning` = meaning. These keep the shared fields filled.

Progress is per pattern, whichever example was used.

### Data checks (`src/data/data.test.ts`)

- Pinned counts: total and per level.
- Ids are unique and match `/^[a-z0-9-]+$/`.
- Every `confusables` id exists and is not the pattern's own id.
- Each example's `ja` has exactly one ＿＿.
- Joining `pieces` gives `ja` with ＿＿ replaced by `answer`.
- `pieces` has 3–5 entries, exactly one of which equals `answer`.
- No two patterns share a meaning token. This is the same rule as kanji and vocab: split on `,` and `;`, remove bracketed text, lowercase.
- Every kanji in every example has a `lookupKanji` entry, as for vocab sentences.
- Two patterns may share an `answer` string (e.g. two uses of ように). The question builder drops any wrong option equal to the right answer, so a correct option is never marked wrong.

## Modes

`Mode` gains `"grammar"` and `"order"`. `ConcreteMode` follows.

| Mode | Label | Kanji | Vocab | Grammar |
|---|---|---|---|---|
| mixed | Hỗn hợp ミックス | ✓ | ✓ | ✓ |
| choice | Trắc nghiệm 選択 | ✓ | ✓ | ✓ (meaning only) |
| match, type, spell, cards | (unchanged) | ✓ | ✓ | disabled |
| fill | Điền chỗ trống 穴埋め | disabled | ✓ | disabled |
| grammar | Chọn ngữ pháp 文法形式 | disabled | disabled | ✓ |
| order | Sắp xếp câu 並べ替え | disabled | disabled | ✓ |

- **Which modes each deck has:** `availableModes(deck)` in `src/lib/question.ts` is the single source.
- **Disabled options:** `SettingsControls` asks it which options to disable. A short reason shows under them:
  - "Chỉ dùng cho ngữ pháp" on grammar and order when the deck is kanji or vocab.
  - "Không dùng cho ngữ pháp" on the others when the deck is grammar.
  - The current fill message stays.
- **Fallback:** `fit()` in `useSettings.ts` sets the mode to `mixed` whenever it isn't in `availableModes(deck)`. That replaces today's special case for kanji and fill.
- **Levels:** the "vocab has no N5" rule doesn't apply to grammar.
- **Mixed for grammar:** `pickMode("grammar")` draws from a bag of `grammar ×2, order, choice` (about ½ choose-the-grammar, ¼ order, ¼ meaning).
- **Labels:** `Deck` labels get `grammar: { full: "Ngữ pháp 文法", short: "Ngữ pháp" }`.

### Choose the grammar (`grammar` mode, 文法形式)

`buildQuestion("grammar")` works like this:
1. Pick a weighted item, then one of its two examples at random. `Question` gains `example?: number`.
2. Wrong options come from the `answer` strings of the pattern's `confusables`, then from other patterns at the same level, then from the whole deck.
3. Drop any option equal to the right answer, and drop duplicates. Take 3, add the right answer and shuffle.

**UI (`GrammarMode.tsx`):**
- The sentence shows with the blank, styled like Điền chỗ trống, with the 4 options below in the existing `OptionList` (keys 1–4 work).
- The Vietnamese line is hidden until an answer is picked.

### Sentence order (`order` mode, 並べ替え)

`buildQuestion("order")` picks an item and one example. It shuffles the `pieces` into `tiles`, reshuffling if they come out already in order.

**UI (`OrderMode.tsx`):**
- Tap tiles to build the sentence and tap a placed tile to put it back. The interaction matches Ghép cách đọc (SpellMode).
- A Kiểm tra button checks the answer.
- It counts as correct when the joined result equals the full sentence. Comparing joined text means two identical pieces in swapped places still count as right.
- When wrong, the attempt shows struck through, followed by the right order.

### Meaning (`choice` mode with grammar)

For a grammar item, `choice` picks kind `meaning` (show 〜ながら, pick the Vietnamese meaning) or `prompt` (show the meaning, pick the pattern), with equal odds. Distractors come from the same deck through the existing `distractors()`.

## Explanation after answering

`Explanation.tsx` gets a grammar branch showing:
- The pattern (large), its form and meaning.
- The note.
- The example used, with the answer filled in and marked.
- The example's Vietnamese line.
- A 🔊 button that reads the sentence through the existing speech helper when sound is on.

`isKanjiFirst` is unchanged.

## Ngữ pháp page

`Route` gains `"grammar"`, reached at `#/grammar`. The tabs become Luyện tập · Ngữ pháp · Kana · Tiến độ, so the phone `TabBar` grid goes from 3 to 4 columns. `NAV` gets a grammar entry and icon.

`src/pages/GrammarPage.tsx` has:
- Level chips N5 / N4 / N3 / Tất cả, using the existing `Segmented` and its own local state that isn't saved.
- A search input that matches `pattern` or `meaning`. Matching ignores case and Vietnamese diacritics.
- Patterns listed in data order. Each row is a button showing the pattern and meaning.
  - Tapping a row expands its form, note, both examples (answer filled in) and their Vietnamese lines. Expanded rows use `aria-expanded`.
- An empty search shows "Không tìm thấy mẫu nào".

## Progress page

Three new bars after the vocab bars: "Ngữ pháp 文法 · N5/N4/N3". The weak list shows a grammar item's pattern with its meaning. Since `reading` is empty, the row shows nothing in the reading spot.

## Content authoring

- **How it's written:** in batches of about 50 (one level at a time), using compact arrays in a scratchpad `.mjs` file. A validation script checks the same rules as the tests, then a merge script appends to `grammar.ts`.
- **Example sentences:** prefer the app's own vocab and kanji. Any new kanji gets a `kanjiInfo` entry.
- **Meanings:** phrased the way Vietnamese JLPT books do (e.g. "vừa … vừa …", "để …", "dù … nhưng …").
- **Uncertain meanings:** I list any pattern whose Vietnamese meaning I'm unsure of in the closing message, for the user to check.

## Testing

**Unit tests:**
- Data checks (above).
- Grammar and order question building:
  - wrong options come from look-alikes first
  - the right answer is never repeated among the options
  - tiles are never already in order
- `availableModes` and the `fit()` fallback.
- GrammarMode and OrderMode components: right and wrong answers, Vietnamese line hidden until answered.
- GrammarPage: level filter, search ignoring diacritics, expanding a row.
- Progress bar counts.

**Playwright:** add grammar to the existing pass at 360/390/768/1280 in light and dark:
- the new tab
- one grammar question and one order question answered
- no horizontal scroll

CI must stay green before deploying.

## Rollout

The work ships as one feature pushed to main. If writing the content takes longer, the code and N4 patterns go first, and N5 and N3 follow in their own pushes. Counts in the README and the memory note get updated.
