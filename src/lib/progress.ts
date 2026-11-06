import type { Deck } from "../data/types";

export interface ItemRecord { right: number; wrong: number; lastSeen: number }
export interface Progress { version: 1; items: Record<string, ItemRecord>; bestStreak: number }
export type LevelFilter = "4" | "3" | "both";
export type Mode = "mixed" | "choice" | "match" | "type" | "spell" | "fill" | "cards";
export interface Settings { deck: Deck; level: LevelFilter; mode: Mode; sound: boolean }

const PROGRESS_KEY = "tango-dojo:v1";
const SETTINGS_KEY = "tango-dojo:settings";
const DECKS: readonly Deck[] = ["kanji", "vocab"];
const LEVELS: readonly LevelFilter[] = ["4", "3", "both"];
const MODES: readonly Mode[] = ["mixed", "choice", "match", "type", "spell", "fill", "cards"];

export const DEFAULT_SETTINGS: Settings = { deck: "vocab", level: "4", mode: "mixed", sound: true };

export const emptyProgress = (): Progress => ({ version: 1, items: {}, bestStreak: 0 });

const store = (): Storage | undefined => {
  try { return globalThis.localStorage; } catch { return undefined; }
};

function readJson(storage: Storage | undefined, key: string): unknown {
  try {
    const raw = storage?.getItem(key);
    return raw == null ? undefined : JSON.parse(raw);
  } catch {
    return undefined; // corrupt data or storage blocked: start fresh
  }
}

function writeJson(storage: Storage | undefined, key: string, value: unknown): void {
  try { storage?.setItem(key, JSON.stringify(value)); } catch { /* storage full or blocked: keep working unsaved */ }
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null;

export function loadProgress(storage: Storage | undefined = store()): Progress {
  const data = readJson(storage, PROGRESS_KEY);
  if (!isObject(data) || data.version !== 1 || !isObject(data.items)) return emptyProgress();
  const items: Record<string, ItemRecord> = {};
  for (const [id, r] of Object.entries(data.items)) {
    if (isObject(r) && typeof r.right === "number" && typeof r.wrong === "number")
      items[id] = { right: r.right, wrong: r.wrong, lastSeen: typeof r.lastSeen === "number" ? r.lastSeen : 0 };
  }
  return { version: 1, items, bestStreak: typeof data.bestStreak === "number" ? data.bestStreak : 0 };
}

export function saveProgress(p: Progress, storage: Storage | undefined = store()): void {
  writeJson(storage, PROGRESS_KEY, p);
}

export function recordAnswer(p: Progress, id: string, correct: boolean, streak: number, now: number): Progress {
  const prev = p.items[id] ?? { right: 0, wrong: 0, lastSeen: 0 };
  const next: ItemRecord = { right: prev.right + (correct ? 1 : 0), wrong: prev.wrong + (correct ? 0 : 1), lastSeen: now };
  return { ...p, items: { ...p.items, [id]: next }, bestStreak: Math.max(p.bestStreak, streak) };
}

export const isLearned = (r: ItemRecord | undefined): boolean => !!r && r.right >= 3 && r.right >= 2 * r.wrong;

export function loadSettings(storage: Storage | undefined = store()): Settings {
  const d = readJson(storage, SETTINGS_KEY);
  const s = { ...DEFAULT_SETTINGS };
  if (!isObject(d)) return s;
  if (DECKS.includes(d.deck as Deck)) s.deck = d.deck as Deck;
  if (LEVELS.includes(d.level as LevelFilter)) s.level = d.level as LevelFilter;
  if (MODES.includes(d.mode as Mode)) s.mode = d.mode as Mode;
  if (typeof d.sound === "boolean") s.sound = d.sound;
  return s;
}

export function saveSettings(s: Settings, storage: Storage | undefined = store()): void {
  writeJson(storage, SETTINGS_KEY, s);
}
