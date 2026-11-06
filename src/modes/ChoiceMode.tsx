import { useEffect, useState } from "react";
import type { ChoiceKind } from "../lib/question";
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
      if (o !== undefined && !(e.target instanceof HTMLInputElement)) choose(o);
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

export function OptionList({ options, answer, picked, jp, onPick }: {
  options: string[]; answer?: string; picked: string | null; jp: boolean; onPick: (o: string) => void;
}) {
  return (
    <div className="mx-auto mt-5 grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
      {options.map((o, i) => {
        const state = picked === null ? "" : o === answer ? "right" : o === picked ? "wrong" : "dim";
        return (
          <button key={o} type="button" data-testid="choice-option" data-state={state || undefined}
            disabled={picked !== null} onClick={() => onPick(o)}
            className={`flex min-h-12 items-center gap-3 rounded-control border-2 px-4 py-2 text-left transition-colors ${
              jp ? "font-jp text-xl" : "text-base"} ${
              state === "right" ? "border-positive bg-positive-bg text-positive"
              : state === "wrong" ? "border-negative bg-negative-bg text-negative"
              : state === "dim" ? "border-line bg-surface text-muted"
              : "border-line bg-surface hover:border-ink active:scale-[0.99]"}`}>
            <span aria-hidden="true" className="hidden rounded border border-line px-1.5 font-sans text-xs text-muted [@media(pointer:fine)]:inline">{i + 1}</span>
            <span>{o}</span>
          </button>
        );
      })}
    </div>
  );
}
