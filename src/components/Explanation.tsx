import type { Item } from "../data/types";
import { KanjiBreakdown } from "./KanjiBreakdown";

/** The explanation after an answer. Kanji-first when the question was about the single kanji. */
export function Explanation({ item, kanjiFirst, example }: { item: Item; kanjiFirst: boolean; example?: number }) {
  if (item.grammar) {
    const g = item.grammar;
    const ex = g.examples[example ?? 0];
    const [before, after] = ex.ja.split("＿＿");
    return (
      <div>
        <div data-testid="explain-head" className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="big font-jp text-3xl leading-tight">{g.pattern}</span>
          <span className="text-base font-semibold">{g.meaning}</span>
          <span className="basis-full font-jp text-sm text-muted">{g.form}</span>
        </div>
        <p className="m-0 mt-2 text-sm">{g.note}</p>
        <div className="mt-3 border-t border-line pt-3">
          <p data-testid="explain-sentence" className="m-0 font-jp text-lg">{before}<b className="font-semibold">{ex.answer}</b>{after}</p>
          <p className="m-0 mt-1 text-sm italic text-muted">{ex.vi}</p>
        </div>
      </div>
    );
  }
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
