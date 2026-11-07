import { useState } from "react";
import { LEVEL_LABELS } from "../components/labels";
import { PageTitle } from "../components/PageTitle";
import { Segmented } from "../components/Segmented";
import { GRAMMAR } from "../data/grammar";
import type { Grammar } from "../data/types";
import { fold } from "../lib/fold";
import type { LevelFilter } from "../lib/progress";

function Row({ g }: { g: Grammar }) {
  const [open, setOpen] = useState(false);
  return (
    <li data-testid="grammar-row" className="rounded-card border border-line bg-surface">
      <button type="button" aria-expanded={open} onClick={() => setOpen(o => !o)}
        className="flex min-h-11 w-full flex-wrap items-baseline gap-x-3 px-4 py-2 text-left">
        <span className="font-jp text-lg">{g.pattern}</span>
        <span className="text-sm text-muted">{g.meaning}</span>
        <span aria-hidden="true" className="ml-auto text-xs text-muted">N{g.level}</span>
      </button>
      {open && (
        <div className="border-t border-line px-4 py-3 text-sm">
          <p className="m-0 font-jp text-muted">{g.form}</p>
          <p className="m-0 mt-1">{g.note}</p>
          {g.examples.map((ex, i) => {
            const [before, after] = ex.ja.split("＿＿");
            return (
              <div key={i} className="mt-2">
                <p className="m-0 font-jp text-base">{before}<b className="font-semibold">{ex.answer}</b>{after}</p>
                <p className="m-0 italic text-muted">{ex.vi}</p>
              </div>
            );
          })}
        </div>
      )}
    </li>
  );
}

export function GrammarPage() {
  const [level, setLevel] = useState<LevelFilter>("both");
  const [query, setQuery] = useState("");
  const q = fold(query.trim());
  const list = GRAMMAR.filter(g => (level === "both" || String(g.level) === level)
    && (!q || fold(g.pattern).includes(q) || fold(g.meaning).includes(q)));

  return (
    <>
      <PageTitle>Ngữ pháp 文法</PageTitle>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Segmented label="Cấp độ" value={level} onChange={setLevel}
          options={(["5", "4", "3", "both"] as const).map(v => ({ value: v, text: LEVEL_LABELS[v] }))} />
        <input type="search" value={query} onChange={e => setQuery(e.target.value)}
          aria-label="Tìm mẫu ngữ pháp" placeholder="vd: ながら, vừa"
          className="min-h-11 min-w-0 flex-1 rounded-control border-2 border-line bg-surface px-3 text-base outline-none focus:border-ink" />
      </div>
      {list.length === 0
        ? <p className="m-0 mt-3 rounded-card border border-dashed border-line p-3 text-sm text-muted">Không tìm thấy mẫu nào</p>
        : <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">{list.map(g => <Row key={g.id} g={g} />)}</ul>}
    </>
  );
}
