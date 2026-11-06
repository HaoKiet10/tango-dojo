import { useState } from "react";
import { OptionList } from "./OptionList";
import type { ModeProps } from "./types";

export function FillMode({ question, locked, onAnswer }: ModeProps) {
  const it = question.items[0];
  const [picked, setPicked] = useState<string | null>(null);
  const [before, after] = (it.sentence?.ja ?? "＿＿").split("＿＿");

  const choose = (o: string) => {
    if (locked || picked !== null) return;
    setPicked(o);
    onAnswer({ results: [{ item: it, correct: o === question.answer }], speakText: before + it.word + after });
  };

  return (
    <>
      <p data-testid="sentence" className="m-0 mt-5 text-center font-jp text-2xl leading-relaxed sm:text-3xl">
        {before}
        <span data-testid="blank" className="mx-1 inline-block min-w-20 border-b-[3px] border-ink px-1">
          {picked === null ? "？" : it.word}
        </span>
        {after}
      </p>
      <p className="m-0 mt-2 text-center text-sm italic text-muted">{it.sentence?.vi}</p>
      <OptionList options={question.options ?? []} answer={question.answer} picked={picked} jp onPick={choose} />
    </>
  );
}
