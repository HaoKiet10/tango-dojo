import { useEffect, useState } from "react";
import type { ChoiceKind } from "../lib/question";
import { isAnswerKey } from "./keys";
import { OptionList } from "./OptionList";
import { Hint, Prompt, promptKind } from "./Prompt";
import type { ModeProps } from "./types";

const JP_KINDS: ChoiceKind[] = ["prompt", "reading"];

export function ChoiceMode({ question, locked, onAnswer }: ModeProps) {
  const it = question.items[0];
  const kind = question.kind ?? "meaning";
  const [picked, setPicked] = useState<string | null>(null);

  const choose = (o: string) => {
    if (locked || picked !== null) return;
    setPicked(o);
    onAnswer({ results: [{ item: it, correct: o === question.answer }] });
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
      {kind === "prompt" ? <Prompt text={it.meaning} kind="meaning" />
        : kind === "reading" ? <Prompt text={it.word} kind={promptKind(it.word)} />
        : <Prompt text={it.prompt} kind={promptKind(it.prompt)} />}
      <Hint>
        {kind === "meaning" && "Nghĩa là gì? · 意味は？"}
        {kind === "hanViet" && "Âm Hán Việt là gì? · 漢越音は？"}
        {kind === "reading" && <>Đọc thế nào? · 読み方は？ · <i>{it.wordMeaning}</i></>}
        {kind === "prompt" && (it.deck === "kanji" ? "Chữ kanji nào mang nghĩa này? · どの漢字？" : "Từ nào mang nghĩa này? · どの言葉？")}
      </Hint>
      <OptionList options={question.options ?? []} answer={question.answer} picked={picked}
        jp={JP_KINDS.includes(kind)} onPick={choose} />
    </>
  );
}
