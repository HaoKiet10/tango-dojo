import type { Mode, Settings } from "../lib/progress";
import { availableModes } from "../lib/question";
import { Segmented } from "./Segmented";
import {
  DECK_LABELS, FILL_DISABLED_REASON, GRAMMAR_ONLY_REASON, LEVEL_LABELS, MODE_LABELS, N5_DISABLED_REASON, NOT_GRAMMAR_REASON,
} from "./labels";

/** Why a practice type can't be used with this deck, or undefined when it can. */
function modeDisabledReason(mode: Mode, deck: Settings["deck"]): string | undefined {
  if (mode === "mixed" || availableModes(deck).includes(mode)) return undefined;
  if (deck === "grammar") return NOT_GRAMMAR_REASON;
  if (mode === "grammar" || mode === "order") return GRAMMAR_ONLY_REASON;
  return FILL_DISABLED_REASON;
}

/** The visible note under the practice types. */
const deckNote = (deck: Settings["deck"]) =>
  deck === "kanji" ? FILL_DISABLED_REASON : deck === "vocab" ? N5_DISABLED_REASON : NOT_GRAMMAR_REASON;

export function SettingsControls({ settings, onChange }: { settings: Settings; onChange: (p: Partial<Settings>) => void }) {
  return (
    // Phone (inside the sheet): stacked. From 640px: deck · level · sound on one row, practice types as a 4-column grid below.
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2">
      <Segmented label="Bộ thẻ" value={settings.deck} onChange={deck => onChange({ deck })}
        options={(["kanji", "vocab", "grammar"] as const).map(v => ({ value: v, text: DECK_LABELS[v].full }))} />
      <Segmented label="Cấp độ" value={settings.level} onChange={level => onChange({ level })}
        disabled={l => (l === "5" && settings.deck === "vocab" ? N5_DISABLED_REASON : undefined)}
        options={(["5", "4", "3", "both"] as const).map(v => ({ value: v, text: LEVEL_LABELS[v] }))} />
      <div className="min-w-0 sm:order-last sm:basis-full">
        <Segmented label="Dạng bài" value={settings.mode} onChange={mode => onChange({ mode })} grid
          disabled={m => modeDisabledReason(m, settings.deck)}
          options={(Object.keys(MODE_LABELS) as (keyof typeof MODE_LABELS)[]).map(v => ({ value: v, text: MODE_LABELS[v].vi }))} />
        <p className="m-0 mt-1 text-xs text-muted">{deckNote(settings.deck)}</p>
      </div>
      <label className="flex min-h-11 items-center gap-3 text-sm sm:ml-2">
        <button type="button" role="switch" aria-checked={settings.sound} aria-label="Âm thanh 音"
          onClick={() => onChange({ sound: !settings.sound })}
          className={`relative h-6 w-10 rounded-full transition-colors ${settings.sound ? "bg-primary" : "bg-control"}`}>
          <span className={`absolute top-1 h-4 w-4 rounded-full bg-on-primary transition-transform ${settings.sound ? "translate-x-5" : "translate-x-1"} left-0`} />
        </button>
        <span aria-hidden="true">Âm thanh 音</span>
      </label>
    </div>
  );
}
