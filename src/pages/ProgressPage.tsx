import { useState } from "react";
import { PageTitle } from "../components/PageTitle";
import { ITEMS } from "../data/items";
import type { Deck, Level } from "../data/types";
import { emptyProgress, isLearned, loadProgress, saveProgress } from "../lib/progress";

const DECKS: { deck: Deck; level: Level; label: string }[] = [
  { deck: "kanji", level: 5, label: "Kanji 漢字 · N5" },
  { deck: "kanji", level: 4, label: "Kanji 漢字 · N4" },
  { deck: "kanji", level: 3, label: "Kanji 漢字 · N3" },
  { deck: "vocab", level: 4, label: "Từ vựng 語彙 · N4" },
  { deck: "vocab", level: 3, label: "Từ vựng 語彙 · N3" },
  { deck: "grammar", level: 5, label: "Ngữ pháp 文法 · N5" },
  { deck: "grammar", level: 4, label: "Ngữ pháp 文法 · N4" },
  { deck: "grammar", level: 3, label: "Ngữ pháp 文法 · N3" },
];

const pct = (n: number, of: number) => `${of ? (n / of) * 100 : 0}%`;

export function ProgressPage() {
  const [progress, setProgress] = useState(loadProgress);
  const rec = (id: string) => progress.items[id];

  const weak = ITEMS.filter(i => (rec(i.id)?.wrong ?? 0) > 0)
    .sort((a, b) => {
      const score = (id: string) => rec(id)!.wrong - rec(id)!.right / 2;
      return score(b.id) - score(a.id);
    })
    .slice(0, 18);

  const reset = () => {
    if (!window.confirm("Xóa toàn bộ tiến độ đã lưu?")) return;
    const p = emptyProgress();
    saveProgress(p);
    setProgress(p);
  };

  return (
    <>
      <PageTitle>Tiến độ 進捗</PageTitle>
      <h2 className="mb-2 mt-2 text-base font-semibold">Bạn đã thuộc bao nhiêu</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {DECKS.map(d => {
          const list = ITEMS.filter(i => i.deck === d.deck && i.level === d.level);
          const learned = list.filter(i => isLearned(rec(i.id))).length;
          const seen = list.filter(i => rec(i.id) && !isLearned(rec(i.id))).length;
          return (
            <div key={d.label} data-testid="deck-bar" className="rounded-card border border-line bg-surface p-4">
              <div className="mb-2 flex justify-between text-sm">
                <b className="font-semibold">{d.label}</b>
                <span className="num text-muted">đã thuộc {learned} / {list.length}</span>
              </div>
              <div className="flex h-2 overflow-hidden rounded-full bg-active" aria-hidden="true">
                <i className="block bg-positive" style={{ width: pct(learned, list.length) }} />
                <i className="block bg-late/50" style={{ width: pct(seen, list.length) }} />
              </div>
            </div>
          );
        })}
      </div>
      <p className="m-0 mt-2 text-xs text-muted">
        <span className="mr-1 inline-block h-2 w-2 rounded-full bg-positive" />đã thuộc (đúng từ 3 lần trở lên, phần lớn là đúng)
        <span className="ml-3 mr-1 inline-block h-2 w-2 rounded-full bg-late/50" />đã gặp
      </p>

      <h2 className="mb-2 mt-6 text-base font-semibold">Những chữ hay sai nhất — sẽ xuất hiện thường xuyên hơn</h2>
      {weak.length === 0
        ? <p className="m-0 rounded-card border border-dashed border-line p-3 text-sm text-muted">Chưa sai câu nào — luyện tập thôi!</p>
        : (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {weak.map(i => (
              <div key={i.id} data-testid="weak-item" className="rounded-card border border-line bg-surface px-3 py-2 text-sm">
                <span className="num float-right text-xs text-muted">✗{rec(i.id)!.wrong} ✓{rec(i.id)!.right}</span>
                <span className="mr-2 font-jp text-xl">{i.prompt}</span>
                {i.deck === "kanji" ? <b className="font-semibold">{i.hanViet}</b> : i.reading && <span className="font-jp">{i.reading}</span>}
                <div className="text-muted">{i.meaning}</div>
              </div>
            ))}
          </div>
        )}
      <button type="button" onClick={reset} className="mt-6 min-h-11 text-sm text-muted underline">Xóa toàn bộ tiến độ</button>
    </>
  );
}
