# Tango Dojo · 単語道場

Luyện Kanji, Từ vựng & Ngữ pháp tiếng Nhật trình độ **N5–N3**, giao diện tiếng Việt + tiếng Nhật, dùng tốt trên điện thoại.

**Dùng ngay:** https://haokiet10.github.io/tango-dojo/

## Có gì bên trong

- **252 kanji** (N5: 99, N4: 73, N3: 80) — âm Hán Việt, nghĩa, âm On/Kun, từ ví dụ
- **336 từ vựng** (N4: 172, N3: 164) — cách đọc, nghĩa, câu ví dụ kèm bản dịch
- **107 mẫu ngữ pháp** (N5: 49, N4: 58) — cấu trúc, nghĩa, cách dùng, 2 câu ví dụ
- Mỗi chữ kanji trong từ đều được giải thích (Hán Việt, nghĩa, On/Kun)
- Trang **Ngữ pháp** — tra cứu mẫu ngữ pháp theo cấp độ, tìm kiếm không cần dấu
- Trang **Luyện Kana** — kiểm tra hiragana/katakana và bảng chữ có phát âm
- Trang **Tiến độ** — đã thuộc bao nhiêu, những chữ hay sai nhất
- Giao diện sáng/tối theo cài đặt của điện thoại

## Các dạng bài luyện

| Dạng bài | Mô tả |
|---|---|
| Hỗn hợp | Trộn ngẫu nhiên các dạng bên dưới |
| Trắc nghiệm · 選択 | Nghĩa, âm Hán Việt, cách đọc, hoặc chọn chữ theo nghĩa (phím 1–4) |
| Kéo nối · マッチング | Nối 5 cặp — bấm hai ô, hoặc kéo thả |
| Gõ cách đọc · 読み入力 | Gõ romaji, tự chuyển sang kana (`hikkosu` → ひっこす) |
| Ghép cách đọc · 読み並べ | Bấm các chữ kana theo đúng thứ tự |
| Điền chỗ trống · 穴埋め | Chọn từ đúng cho câu ví dụ (chỉ từ vựng) |
| Thẻ ghi nhớ · カード | Lật thẻ, tự đánh giá "Đã nhớ / Chưa nhớ" |
| Chọn ngữ pháp · 文法形式 | Chọn mẫu ngữ pháp đúng cho chỗ trống (chỉ ngữ pháp) |
| Sắp xếp câu · 並べ替え | Bấm các mảnh câu theo đúng thứ tự (chỉ ngữ pháp) |

- Sau mỗi câu, trang luôn chờ bạn bấm **Tiếp 次へ** (hoặc Enter).
- Chữ hay sai sẽ xuất hiện nhiều hơn; tiến độ lưu trong trình duyệt.
- Có phát âm tiếng Nhật (bật/tắt trong cài đặt).

## Chạy trên máy

Cần Node.js 22 trở lên.

```bash
npm install
npm run dev        # http://localhost:5173/tango-dojo/
```

| Lệnh | Việc |
|---|---|
| `npm run check` | Kiểm tra kiểu (TypeScript), lint (ESLint) và unit test (Vitest) |
| `npm run e2e` | Kiểm tra giao diện trên trình duyệt thật ở 360/390/768/1280px, sáng và tối (Playwright) |
| `npm run build` | Tạo bản web trong `dist/` |

Mỗi lần push lên `main`, GitHub Actions chạy toàn bộ kiểm tra rồi mới đăng lên GitHub Pages.

**Cài đặt một lần:** Settings → Pages → Build and deployment → Source chọn **GitHub Actions**. Nếu để "Deploy from a branch", GitHub sẽ đăng thẳng mã nguồn chưa build (trang trắng) song song với bản build.

## Công nghệ

Vite · React · TypeScript · Tailwind CSS v4 · @dnd-kit · Vitest · Playwright · phông Be Vietnam Pro + Noto Sans JP.

## Ghi chú

- Dữ liệu nằm trong `src/data/` (`kanji.ts`, `vocab.ts`, `grammar.ts`, `kanjiInfo.ts`, `kana.ts`) và được kiểm tra tự động (đủ trường, cách đọc là kana, không có hai nghĩa trùng nhau…).
- N5 hiện chỉ có kanji (chưa có từ vựng N5).
- Cấp độ JLPT chỉ mang tính tương đối (từ năm 2010 không còn danh sách chính thức).
- Thiết kế và kế hoạch: `docs/superpowers/specs/`, `docs/superpowers/plans/`.
