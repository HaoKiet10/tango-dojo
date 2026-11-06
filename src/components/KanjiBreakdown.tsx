import { lookupKanji } from "../data/items";

const CJK = /[一-龯]/;

/** One row per kanji in the word: kanji · Hán Việt · meaning, and On/Kun. The studied kanji gets a tag. */
export function KanjiBreakdown({ word, focus, exclude }: { word: string; focus?: string; exclude?: string }) {
  const chars = [...word].filter(c => CJK.test(c) && c !== exclude);
  if (!chars.length) return null;
  return (
    <div className="mt-3 border-b border-line">
      {chars.map((c, i) => {
        const k = lookupKanji(c);
        return (
          <div key={c + i} data-testid="breakdown-row"
            className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 border-t border-line py-2 sm:grid-cols-[2.75rem_1fr_auto]">
            <span className="row-span-2 font-jp text-2xl leading-none sm:row-span-1">{c}</span>
            <span className="text-sm">
              <b className="mr-2 inline-block min-w-16 font-semibold">{k?.hanViet ?? "—"}</b>
              {k?.meaning ?? "—"}
              {c === focus && (
                <span className="ml-2 inline-block whitespace-nowrap rounded-full border border-seal px-2 align-[1px] text-xs font-semibold text-seal">
                  chữ đang học
                </span>
              )}
            </span>
            <span className="font-jp text-xs text-muted sm:text-right">
              On {k?.on || "—"} · Kun {k?.kun || "—"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
