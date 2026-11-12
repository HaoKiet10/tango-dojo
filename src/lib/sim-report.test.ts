/**
 * `npm run sim`: prints how practice behaves with the numbers in tuning.ts.
 * Skipped in the normal test run.
 */
import type { Deck } from "../data/types";
import { gapFor, poolFor } from "./picker";
import type { LevelFilter } from "./progress";
import { simulate } from "./sim";

// Tests run in Node; the app's tsconfig has no Node types, so declare the two bits used here.
declare const process: { env: Record<string, string | undefined>; stdout: { write(s: string): void } };

const SETS: [Deck, LevelFilter][] = [["kanji", "5"], ["kanji", "4"], ["kanji", "3"], ["vocab", "4"], ["vocab", "3"], ["grammar", "5"], ["grammar", "4"], ["grammar", "3"]];

test.runIf(process.env.npm_lifecycle_event === "sim")("simulation report", () => {
  const rows = ["Set           | Words | Mode          | GAP | Fewest between | Missed word every | Known word every", "-".repeat(101)];
  for (const [deck, level] of SETS) for (const mixed of [false, true]) {
    const r = simulate({ deck, level, mixed, questions: 3000, seed: 1 });
    rows.push([`${deck} N${level}`.padEnd(13), String(r.pool).padStart(5), (mixed ? "Hỗn hợp" : "one type").padEnd(13),
      String(gapFor(poolFor(r.all, deck, level).length)).padStart(3), String(r.minGap).padStart(15),
      `${r.missedEvery.toFixed(1)} q`.padStart(17), `${r.knownEvery.toFixed(1)} q`.padStart(16)].join(" | "));
  }
  process.stdout.write("\nOne word is missed every time it comes up; every other word was answered right once. 3000 questions.\n\n" + rows.join("\n") + "\n\n");
}, 300000);
