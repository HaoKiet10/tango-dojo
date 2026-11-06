import { useCallback, useState } from "react";
import { loadSettings, saveSettings, type Settings } from "./progress";

/** Settings persisted to storage. Fill-the-blank needs vocab, so choosing kanji on fill falls back to mixed. */
export function useSettings(): [Settings, (patch: Partial<Settings>) => void] {
  const [settings, setSettings] = useState<Settings>(() => {
    const s = loadSettings();
    return s.deck === "kanji" && s.mode === "fill" ? { ...s, mode: "mixed" } : s;
  });
  const update = useCallback((patch: Partial<Settings>) => {
    setSettings(prev => {
      const next = { ...prev, ...patch };
      if (next.deck === "kanji" && next.mode === "fill") next.mode = "mixed";
      saveSettings(next);
      return next;
    });
  }, []);
  return [settings, update];
}
