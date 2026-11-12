import type { Deck } from "../data/types";
import { GAP, LEARNED_MIN_RIGHT, LEARNED_RIGHT_PER_MISS } from "./tuning";

export interface ItemRecord { right: number; wrong: number; lastSeen: number }
export interface Progress { version: 1; items: Record<string, ItemRecord>; bestStreak: number }
export type LevelFilter = "5" | "4" | "3" | "both";
export type Mode = "mixed" | "choice" | "match" | "type" | "spell" | "fill" | "cards" | "grammar" | "order";
export interface Settings { deck: Deck; level: LevelFilter; mode: Mode; sound: boolean }

const PROGRESS_KEY = "tango-dojo:v1";
const SETTINGS_KEY = "tango-dojo:settings";
const DECKS: readonly Deck[] = ["kanji", "vocab", "grammar"];
const LEVELS: readonly LevelFilter[] = ["5", "4", "3", "both"];
const MODES: readonly Mode[] = ["mixed", "choice", "match", "type", "spell", "fill", "cards", "grammar", "order"];

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

export const isLearned = (r: ItemRecord | undefined): boolean =>
  !!r && r.right >= LEARNED_MIN_RIGHT && r.right >= LEARNED_RIGHT_PER_MISS * r.wrong;

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

/** The practice screen's running count. Kept for the rest of the day, back to zero the next day. */
export interface Tally { correct: number; total: number; streak: number }
const TODAY_KEY = "tango-dojo:today";
const zeroTally = (): Tally => ({ correct: 0, total: 0, streak: 0 });
export const dayOf = (now: number) => { const d = new Date(now); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };

export function loadToday(now = Date.now(), storage: Storage | undefined = store()): Tally {
  const d = readJson(storage, TODAY_KEY);
  if (!isObject(d) || d.day !== dayOf(now)) return zeroTally();
  const n = (v: unknown) => (typeof v === "number" && v >= 0 ? v : 0);
  return { correct: n(d.correct), total: n(d.total), streak: n(d.streak) };
}

export function saveToday(t: Tally, now = Date.now(), storage: Storage | undefined = store()): void {
  writeJson(storage, TODAY_KEY, { day: dayOf(now), ...t });
}

/** The words of the last questions (oldest first), kept through a refresh for the deck and level they came from. */
const RECENT_KEY = "tango-dojo:recent";

export function loadRecent(deck: Deck, level: LevelFilter, storage: Storage | undefined = store()): string[][] {
  const d = readJson(storage, RECENT_KEY);
  if (!isObject(d) || d.deck !== deck || d.level !== level || !Array.isArray(d.questions)) return [];
  return d.questions
    .filter((q): q is string[] => Array.isArray(q) && q.every(id => typeof id === "string"))
    .slice(-GAP);
}

export function saveRecent(deck: Deck, level: LevelFilter, questions: string[][], storage: Storage | undefined = store()): void {
  writeJson(storage, RECENT_KEY, { deck, level, questions });
}
