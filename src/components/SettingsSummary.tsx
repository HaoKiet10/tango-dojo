import type { Settings } from "../lib/progress";
import { DECK_LABELS, LEVEL_LABELS, MODE_LABELS } from "./labels";

/** Phone only: one button that names the current settings and opens the sheet. */
export function SettingsSummary({ settings, onOpen }: { settings: Settings; onOpen: () => void }) {
  return (
    <button type="button" data-testid="settings-summary" onClick={onOpen} aria-haspopup="dialog"
      className="flex min-h-11 w-full items-center justify-between rounded-card border border-line bg-surface px-4 text-left text-sm sm:hidden">
      <span>{DECK_LABELS[settings.deck].short} · {LEVEL_LABELS[settings.level]} · {MODE_LABELS[settings.mode].vi}</span>
      <span aria-hidden="true" className="text-muted">▾</span>
    </button>
  );
}
