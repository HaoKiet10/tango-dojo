# How practice picks the next question

Every number below lives in [`src/lib/tuning.ts`](../src/lib/tuning.ts). To change how practice behaves:

1. Edit a number in `tuning.ts`.
2. Run `npm run sim` to see what it does (table below).
3. Run `npm run check`, then push to main. The site updates in about 3 minutes.

## The four steps

**1. The pool.** Your settings choose the words: deck + level. Vocab N4 is 172 words, grammar N5 is 49 patterns.

**2. The question type.** A fixed mode always uses that type. **Hỗn hợp** draws one from `MIXED_BAG`:

| Deck | Bag |
|---|---|
| Kanji | choice ×3, type ×2, spell ×2, match ×1 |
| Vocab | choice ×3, type ×2, spell ×2, match ×1, fill ×3 |
| Grammar | grammar ×2, order ×1, choice ×1 |

A Trắc nghiệm question then draws what it asks for from `CHOICE_KINDS`: meaning, Hán Việt, "which word" or reading.

**3. The lottery.** Every word in the pool gets tickets, and one word is drawn at random in proportion to them. A word with 3 tickets is three times as likely as one with 1.

| Word | Tickets | Setting |
|---|---|---|
| Never asked | 1 + 1 = **2** | `BASE_TICKETS`, `UNSEEN_BONUS` |
| Answered before | **1** | `BASE_TICKETS` |
| Missed | 1 + 3 × misses ÷ (rights + 1), **at most 3** | `MISS_BOOST`, `MAX_TICKETS` |
| Learned (≥ 3 right, ≥ 2 rights per miss) | tickets × **0.4** | `LEARNED_FACTOR`, `LEARNED_MIN_RIGHT`, `LEARNED_RIGHT_PER_MISS` |
| Asked in the last 12 questions | **0**, can't be drawn | `GAP` |

Không biết counts as a miss, the same as any wrong answer. Nothing is scheduled: a missed word simply goes back into the lottery with a few more tickets.

**4. The gap.** A word can't come back until 12 other questions have passed. A Kéo nối round counts as one question, and all 5 of its words wait. In a small set the gap shrinks to a third of the set (`GAP_MAX_SHARE`): a 20-word set waits 6. That way there are always words left to ask. If every word is waiting, the one asked longest ago goes first.

The last 12 questions are saved, so a refresh doesn't let a word straight back. Changing deck or level starts a fresh memory.

Wrong options in multiple choice are plain random picks. They don't use tickets and don't count as asked.

## `npm run sim`

The simulation plays 3000 questions per set. One word is missed every time it comes up (the worst case); every other word was answered right once. With the current numbers:

| Set | Words | Mode | Fewest questions between repeats | Missed word every | Known word every |
|---|---|---|---|---|---|
| Vocab N4 | 172 | one type | 12 | ~35 | ~176 |
| Vocab N4 | 172 | Hỗn hợp | 12 | ~28 | ~126 |
| Kanji N5 | 99 | Hỗn hợp | 12 | ~20 | ~69 |
| Grammar N5 | 49 | one type | 12 | ~19 | ~51 |

**What to turn:**
- **Missed words back more often:** raise `MAX_TICKETS` (and `MISS_BOOST`), or lower `GAP`.
- **Fewer repeats overall:** raise `GAP`.
- **New words sooner:** raise `UNSEEN_BONUS`.
- **Learned words almost never:** lower `LEARNED_FACTOR`.
