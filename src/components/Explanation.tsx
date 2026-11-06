import type { Item } from "../data/types";
import { KanjiBreakdown } from "./KanjiBreakdown";

/** The explanation after an answer. Kanji-first when the question was about the single kanji. */
export function Explanation({ item, kanjiFirst }: { item: Item; kanjiFirst: boolean }) {
  if (item.deck === "kanji" && kanjiFirst) {
    return (
      <div>
        <div data-testid="explain-head" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="big font-jp text-3xl leading-tight">{item.prompt}</span>
          <span className="text-xl font-semibold">{item.hanViet}</span>
          <span className="text-base font-semibold">{item.meaning}</span>
        </div>
        <p className="m-0 mt-1 text-sm text-muted">
          On <span className="font-jp">{item.on || "—"}</span> · Kun <span className="font-jp">{item.kun || "—"}</span>
        </p>
        <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3">
          <span className="text-xs font-semibold text-muted">Ví dụ</span>
          <span className="font-jp text-xl">{item.word}</span>
          <span className="font-jp text-base text-muted">{item.reading}</span>
          <span className="text-base">{item.wordMeaning}</span>
        </div>
        <KanjiBreakdown word={item.word} exclude={item.prompt} />
      </div>
    );
  }
  return (
    <div>
      <div data-testid="explain-head" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="big font-jp text-3xl leading-tight">{item.word}</span>
        <span className="font-jp text-base text-muted">{item.reading}</span>
        <span className="text-base font-semibold">{item.wordMeaning}</span>
      </div>
      <KanjiBreakdown word={item.word} focus={item.deck === "kanji" ? item.prompt : undefined} />
    </div>
  );
}
