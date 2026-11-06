import type { Item } from "../data/types";

/** After a match round: how many pairs went wrong first, and every pair with its meaning. */
export function MatchSummary({ results }: { results: { item: Item; correct: boolean }[] }) {
  const missed = results.filter(r => !r.correct).length;
  return (
    <div>
      <p className="m-0 text-base font-semibold">
        {missed === 0 ? "Nối đúng hết ngay lần đầu!"
          : <>Nối sai {missed} / {results.length} cặp <span className="text-sm font-normal text-muted">· ô màu cam là cặp bạn đã nối sai lúc đầu</span></>}
      </p>
      <div className="mt-2 border-b border-line">
        {results.map(({ item, correct }) => (
          <div key={item.id} data-testid="summary-row"
            className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-3 border-t border-line py-2 text-sm sm:grid-cols-[4rem_7rem_1fr_auto]">
            <span className="row-span-2 font-jp text-xl sm:row-span-1">{item.prompt}</span>
            <span className={item.deck === "kanji" ? "font-semibold" : "font-jp"}>{item.deck === "kanji" ? item.hanViet : item.reading}</span>
            <span className="col-start-2 sm:col-start-auto">{item.meaning}</span>
            <span className="col-start-2 sm:col-start-auto">
              {!correct && <span className="inline-block rounded-full border border-late px-2 text-xs font-semibold text-late">nối sai</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
