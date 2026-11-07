import type { Grammar } from "./types";

export const GRAMMAR: Grammar[] = [
  {
    "id": "nagara",
    "pattern": "〜ながら",
    "level": 4,
    "form": "Vます(bỏ ます) + ながら",
    "meaning": "vừa … vừa …",
    "note": "Hai hành động diễn ra cùng lúc; hành động chính đặt ở vế sau.",
    "confusables": [],
    "examples": [
      { "ja": "音楽を聞き＿＿勉強します。", "answer": "ながら", "pieces": ["音楽を", "聞き", "ながら", "勉強します。"], "vi": "Tôi vừa nghe nhạc vừa học." },
      { "ja": "歩き＿＿電話するのは危ないです。", "answer": "ながら", "pieces": ["歩き", "ながら", "電話するのは", "危ないです。"], "vi": "Vừa đi bộ vừa gọi điện thoại thì nguy hiểm." }
    ]
  },
  {
    "id": "tame-ni",
    "pattern": "〜ために",
    "level": 4,
    "form": "V(từ điển) / Nの + ために",
    "meaning": "để (mục đích)",
    "note": "Chỉ mục đích mà người nói chủ động hướng tới; hai vế cùng chủ ngữ.",
    "confusables": ["you-ni"],
    "examples": [
      { "ja": "日本で働く＿＿、日本語を勉強しています。", "answer": "ために", "pieces": ["日本で", "働く", "ために、", "日本語を勉強しています。"], "vi": "Tôi học tiếng Nhật để làm việc ở Nhật." },
      { "ja": "健康の＿＿、毎朝走ります。", "answer": "ために", "pieces": ["健康の", "ために、", "毎朝", "走ります。"], "vi": "Tôi chạy mỗi sáng vì sức khỏe." }
    ]
  },
  {
    "id": "you-ni",
    "pattern": "〜ように",
    "level": 4,
    "form": "V(từ điển) / Vない + ように",
    "meaning": "sao cho, để có thể",
    "note": "Mục đích là một trạng thái không tự kiểm soát được, thường đi với động từ khả năng hoặc thể phủ định.",
    "confusables": ["tame-ni"],
    "examples": [
      { "ja": "忘れない＿＿、メモを書きます。", "answer": "ように", "pieces": ["忘れない", "ように、", "メモを", "書きます。"], "vi": "Tôi ghi chú để không quên." },
      { "ja": "よく見える＿＿、前に座りました。", "answer": "ように", "pieces": ["よく", "見える", "ように、", "前に座りました。"], "vi": "Tôi ngồi phía trước để nhìn rõ." }
    ]
  }
];
