import { useEffect, useState } from "react";
import { kanaUnits } from "../lib/romaji";
import { isAnswerKey } from "./keys";
import { Hint, Prompt, promptKind } from "./Prompt";
import type { ModeProps } from "./types";

export function SpellMode({ question, locked, onAnswer }: ModeProps) {
  const it = question.items[0];
  const target = kanaUnits(it.reading);
  const tiles = question.tiles ?? [];
  const [placed, setPlaced] = useState<number[]>([]);     // indexes into tiles, in order
  const [result, setResult] = useState<boolean | null>(null);
  const done = locked || result !== null;

  const place = (i: number) => {
    if (done || placed.includes(i)) return;
    const next = [...placed, i];
    setPlaced(next);
    if (next.length === target.length) {
      const correct = next.map(n => tiles[n]).join("") === it.reading;
      setResult(correct);
      onAnswer({ results: [{ item: it, correct }] });
    }
  };
  const remove = (slot: number) => { if (!done && slot < placed.length) setPlaced(placed.filter((_, k) => k !== slot)); };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Backspace" && !done && isAnswerKey(e)) setPlaced(p => p.slice(0, -1)); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [done]);

  const slotColour = result === null ? "border-line" : result ? "border-positive text-positive" : "border-negative text-negative";
  return (
    <>
      <Prompt text={it.word} kind={promptKind(it.word)} />
      <Hint>Bấm các chữ kana theo đúng thứ tự · 読みを並べよう</Hint>
      <div className="mt-5 flex flex-wrap justify-center gap-1.5">
        {target.map((_, s) => (
          <button key={s} type="button" data-testid="slot" onClick={() => remove(s)} aria-label={`Ô ${s + 1}`}
            className={`flex h-14 min-w-12 items-center justify-center border-b-[3px] px-1 font-jp text-3xl ${placed[s] !== undefined && result === null ? "border-ink" : slotColour}`}>
            {placed[s] !== undefined ? tiles[placed[s]] : ""}
          </button>
        ))}
      </div>
      {result === false && <p data-testid="spell-correction" className="m-0 mt-2 text-center font-jp text-xl">→ {it.reading}</p>}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {tiles.map((t, i) => (
          <button key={i} type="button" data-testid="tile" onClick={() => place(i)} disabled={done}
            className={`min-h-12 min-w-12 rounded-control border-2 border-line bg-surface px-3 font-jp text-2xl active:scale-95 ${placed.includes(i) ? "invisible" : ""}`}>
            {t}
          </button>
        ))}
      </div>
      <Hint>Bấm vào ô đã điền để xóa · hoặc nhấn Backspace</Hint>
    </>
  );
}
