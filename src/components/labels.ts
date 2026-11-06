import type { Deck } from "../data/types";
import type { LevelFilter, Mode } from "../lib/progress";

export const MODE_LABELS: Record<Mode, { vi: string; ja: string }> = {
  mixed: { vi: "Hỗn hợp", ja: "ミックス" },
  choice: { vi: "Trắc nghiệm", ja: "選択" },
  match: { vi: "Kéo nối", ja: "マッチング" },
  type: { vi: "Gõ cách đọc", ja: "読み入力" },
  spell: { vi: "Ghép cách đọc", ja: "読み並べ" },
  fill: { vi: "Điền chỗ trống", ja: "穴埋め" },
  cards: { vi: "Thẻ ghi nhớ", ja: "カード" },
};
export const DECK_LABELS: Record<Deck, { full: string; short: string }> = {
  kanji: { full: "Kanji 漢字", short: "Kanji" },
  vocab: { full: "Từ vựng 語彙", short: "Từ vựng" },
};
export const LEVEL_LABELS: Record<LevelFilter, string> = { "5": "N5", "4": "N4", "3": "N3", both: "Tất cả" };
export const N5_DISABLED_REASON = "N5 hiện chỉ có kanji";
export const FILL_DISABLED_REASON = "Điền chỗ trống chỉ dùng cho từ vựng";
