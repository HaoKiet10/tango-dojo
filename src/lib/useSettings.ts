import { useCallback, useState } from "react";
import { loadSettings, saveSettings, type Settings } from "./progress";

/**
 * Keep settings to combinations that have content: fill-the-blank needs vocab (kanji falls back to mixed),
 * and N5 has kanji only (vocab falls back to N4).
 */
function fit(s: Settings): Settings {
  const next = { ...s };
  if (next.deck === "kanji" && next.mode === "fill") next.mode = "mixed";
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
