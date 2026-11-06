import type { Settings } from "../lib/progress";
import { Segmented } from "./Segmented";
import { DECK_LABELS, FILL_DISABLED_REASON, LEVEL_LABELS, MODE_LABELS } from "./labels";

export function SettingsControls({ settings, onChange }: { settings: Settings; onChange: (p: Partial<Settings>) => void }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start">
      <Segmented label="Bộ thẻ" value={settings.deck} onChange={deck => onChange({ deck })}
        options={(["kanji", "vocab"] as const).map(v => ({ value: v, text: DECK_LABELS[v].full }))} />
      <Segmented label="Cấp độ" value={settings.level} onChange={level => onChange({ level })}
        options={(["4", "3", "both"] as const).map(v => ({ value: v, text: LEVEL_LABELS[v] }))} />
      <Segmented label="Dạng bài" value={settings.mode} onChange={mode => onChange({ mode })}
        disabled={m => (m === "fill" && settings.deck === "kanji" ? FILL_DISABLED_REASON : undefined)}
        options={(Object.keys(MODE_LABELS) as (keyof typeof MODE_LABELS)[]).map(v => ({ value: v, text: MODE_LABELS[v].vi }))} />
      <label className="flex min-h-11 items-center gap-3 text-sm">
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
