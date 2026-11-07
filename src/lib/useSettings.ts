import { useCallback, useState } from "react";
import { loadSettings, saveSettings, type Settings } from "./progress";
import { availableModes } from "./question";

/**
 * Keep settings to combinations that have content: a mode the deck doesn't offer falls back to mixed,
 * and vocab has no N5 (falls back to N4).
 */
function fit(s: Settings): Settings {
  const next = { ...s };
  if (next.mode !== "mixed" && !availableModes(next.deck).includes(next.mode)) next.mode = "mixed";
  if (next.deck === "vocab" && next.level === "5") next.level = "4";
  return next;
}

/** Settings persisted to storage. */
export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const [settings, setSettings] = useState<Settings>(() => fit(loadSettings()));
  const update = useCallback((patch: Partial<Settings>) => {
    setSettings(prev => {
      const next = fit({ ...prev, ...patch });
      saveSettings(next);
      return next;
    });
  }, []);
  return [settings, update];
}
