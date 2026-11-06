/** Four answer buttons: 1 column on phones, 2 from 640px. After a pick, right is green and a wrong pick red. */
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
