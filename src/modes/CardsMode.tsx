import { useEffect, useState } from "react";
import { Explanation } from "../components/Explanation";
import { Hint, Prompt, promptKind } from "./Prompt";
import type { ModeProps } from "./types";

export function CardsMode({ question, locked, onAnswer }: ModeProps) {
  const it = question.items[0];
  const [flipped, setFlipped] = useState(false);

  const rate = (correct: boolean) => { if (!locked) onAnswer({ results: [{ item: it, correct }], skipPanel: true }); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " && !flipped) { e.preventDefault(); setFlipped(true); }
      else if (flipped && e.key === "1") rate(false);
      else if (flipped && e.key === "2") rate(true);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <button type="button" data-testid="flip-card" onClick={() => setFlipped(true)} disabled={flipped}
        aria-label={flipped ? undefined : "Lật thẻ"}
        className="mt-1 block w-full rounded-card text-ink disabled:cursor-default">
        <Prompt text={it.prompt} kind={promptKind(it.prompt)} />
        {!flipped && <Hint>Nhớ lại nghĩa và cách đọc, rồi bấm vào thẻ (hoặc phím Space) để lật · めくってみよう</Hint>}
      </button>
      {flipped && (
        <>
          <div className="mt-4 rounded-card bg-raised p-4 text-left [&_.big]:hidden">
            <Explanation item={it} kanjiFirst />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" data-testid="rate-again" onClick={() => rate(false)}
              className="min-h-12 rounded-control border-2 border-negative bg-negative-bg font-semibold text-negative">
              1 · Chưa nhớ
            </button>
            <button type="button" data-testid="rate-good" onClick={() => rate(true)}
              className="min-h-12 rounded-control border-2 border-positive bg-positive-bg font-semibold text-positive">
              2 · Đã nhớ
            </button>
          </div>
        </>
      )}
    </>
  );
}
