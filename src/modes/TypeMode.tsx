import { useEffect, useRef, useState } from "react";
import { normalizeAnswer, readingsMatch, toKana } from "../lib/romaji";
import { Hint, Prompt, promptKind } from "./Prompt";
import type { ModeProps } from "./types";

export function TypeMode({ question, locked, onAnswer }: ModeProps) {
  const it = question.items[0];
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ typed: string; correct: boolean } | null>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { input.current?.focus({ preventScroll: true }); }, []);

  const submit = () => {
    if (locked || result) return;
    const typed = normalizeAnswer(value);
    if (!typed) return;
    const correct = readingsMatch(typed, it.reading);
    setResult({ typed, correct });
    onAnswer({ results: [{ item: it, correct }] });
  };

  return (
    <>
      <Prompt text={it.word} kind={promptKind(it.word)} />
      <Hint>Gõ cách đọc bằng romaji (hoặc kana) · 読みを入力</Hint>
      <form className="mx-auto mt-5 flex max-w-md gap-2" onSubmit={e => { e.preventDefault(); submit(); }}>
        <input ref={input} data-testid="type-input" value={value} disabled={!!result}
          onChange={e => setValue(e.target.value)} placeholder="vd: kaisha" aria-label="Cách đọc"
          autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} enterKeyHint="done"
          className="min-h-12 min-w-0 flex-1 rounded-control border-2 border-line bg-surface px-3 text-center text-lg outline-none focus:border-ink disabled:opacity-70" />
        <button type="submit" data-testid="check-button" disabled={!!result}
          className="min-h-12 shrink-0 rounded-control bg-primary px-4 text-base font-semibold text-on-primary disabled:opacity-50">
          Kiểm tra
        </button>
      </form>
      <p data-testid="kana-preview" className="m-0 mt-2 flex min-h-8 items-center justify-center text-center font-jp text-xl">
        {!result && (value.trim()
          ? toKana(value, false)
          : <span className="font-sans text-sm text-muted">Phụ âm đôi ra っ (kitte) · gõ “nn” hoặc “n'” ra ん khi cần</span>)}
        {result?.correct && result.typed}
        {result && !result.correct && <><s className="text-negative">{result.typed}</s> → {it.reading}</>}
      </p>
    </>
  );
}
