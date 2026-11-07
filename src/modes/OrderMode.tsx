import { useEffect, useState } from "react";
import { fullSentence } from "../lib/question";
import { isAnswerKey } from "./keys";
import { Hint } from "./Prompt";
import type { ModeProps } from "./types";

/** 並べ替え: tap the sentence pieces in order, then check. Right when the joined text matches, so identical pieces may swap. */
export function OrderMode({ question, locked, onAnswer }: ModeProps) {
  const it = question.items[0];
  const ex = it.grammar!.examples[question.example ?? 0];
  const target = fullSentence(ex);
  const tiles = question.tiles ?? [];
  const [placed, setPlaced] = useState<number[]>([]);     // indexes into tiles, in order
  const [result, setResult] = useState<boolean | null>(null);
  const done = locked || result !== null;
  const attempt = placed.map(i => tiles[i]).join("");

  const place = (i: number) => { if (!done && !placed.includes(i)) setPlaced([...placed, i]); };
  const remove = (slot: number) => { if (!done && slot < placed.length) setPlaced(placed.filter((_, k) => k !== slot)); };
  const check = () => {
    if (done || placed.length < tiles.length) return;
    const correct = attempt === target;
    setResult(correct);
    onAnswer({ results: [{ item: it, correct }], speakText: target });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Backspace" && !done && isAnswerKey(e)) setPlaced(p => p.slice(0, -1)); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [done]);

  const slotColour = result === null ? "border-ink" : result ? "border-positive text-positive" : "border-negative text-negative";
  return (
    <>
      <Hint>Bấm các mảnh theo đúng thứ tự câu · 文を並べ替えよう</Hint>
      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {tiles.map((_, s) => (
          <button key={s} type="button" data-testid="slot" onClick={() => remove(s)} aria-label={`Ô ${s + 1}`}
            className={`flex min-h-12 min-w-12 items-center justify-center border-b-[3px] px-1 font-jp text-xl ${placed[s] !== undefined ? slotColour : "border-line"}`}>
            {placed[s] !== undefined ? tiles[placed[s]] : ""}
          </button>
        ))}
      </div>
      {result === false && (
        <p data-testid="order-correction" className="m-0 mt-2 text-center font-jp text-lg">
          <s className="text-negative">{attempt}</s> → {target}
        </p>
      )}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {tiles.map((t, i) => (
          <button key={i} type="button" data-testid="tile" onClick={() => place(i)} disabled={done}
            className={`min-h-12 min-w-12 rounded-control border-2 border-line bg-surface px-3 font-jp text-xl active:scale-95 ${placed.includes(i) ? "invisible" : ""}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-4 max-w-md">
        <button type="button" data-testid="check-button" onClick={check} disabled={done || placed.length < tiles.length}
          className="min-h-12 w-full rounded-control bg-primary px-4 text-base font-semibold text-on-primary disabled:opacity-50">
          Kiểm tra
        </button>
      </div>
      <Hint>Bấm vào ô đã điền để xóa · hoặc nhấn Backspace</Hint>
    </>
  );
}
