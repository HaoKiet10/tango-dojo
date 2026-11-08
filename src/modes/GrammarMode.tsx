import { useEffect, useState } from "react";
import { fullSentence } from "../lib/question";
import { isAnswerKey } from "./keys";
import { OptionList } from "./OptionList";
import { Hint } from "./Prompt";
import type { ModeProps } from "./types";

/** 文法形式: a sentence with a blank and its translation; pick the grammar that fits. */
export function GrammarMode({ question, locked, onAnswer }: ModeProps) {
  const it = question.items[0];
  const ex = it.grammar!.examples[question.example ?? 0];
  const [before, after] = ex.ja.split("＿＿");
  const [picked, setPicked] = useState<string | null>(null);

  const choose = (o: string) => {
    if (locked || picked !== null) return;
    setPicked(o);
    onAnswer({ results: [{ item: it, correct: o === question.answer }], speakText: fullSentence(ex) });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const o = question.options?.[Number(e.key) - 1];
      if (o !== undefined && isAnswerKey(e)) choose(o);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  return (
    <>
      <p data-testid="sentence" className="m-0 mt-5 text-center font-jp text-2xl leading-relaxed sm:text-3xl">
        {before}
        <span data-testid="blank" className="mx-1 inline-block min-w-20 border-b-[3px] border-ink px-1">
          {picked === null ? "？" : ex.answer}
        </span>
        {after}
      </p>
      {/* The translation tells look-alike patterns apart (ましょう vs ませんか, あげる vs もらう) without naming the answer. */}
      <p data-testid="sentence-vi" className="m-0 mt-2 text-center text-sm italic text-muted">{ex.vi}</p>
      <Hint>Chọn mẫu ngữ pháp đúng · 正しい文法を選ぼう</Hint>
      <OptionList options={question.options ?? []} answer={question.answer} picked={picked ?? (locked ? "" : null)} jp onPick={choose} />
    </>
  );
}
