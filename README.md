# Luyện Kanji & Từ vựng · 漢字と語彙 (N4–N3)

Trang web luyện kanji và từ vựng tiếng Nhật trình độ N4–N3, giao diện tiếng Việt + tiếng Nhật.
Chỉ là HTML/CSS/JS thuần — không cần cài đặt gì.

## Có gì bên trong

- **153 kanji** (N4: 73, N3: 80) — âm Hán Việt, nghĩa, âm On/Kun, từ ví dụ
- **110 từ vựng** (N4: 53, N3: 57) — cách đọc, nghĩa, câu ví dụ kèm bản dịch
- Mỗi chữ kanji trong từ đều được giải thích (Hán Việt, nghĩa, On/Kun)

## Các dạng bài luyện

| Dạng bài | Mô tả |
|---|---|
| Hỗn hợp | Trộn ngẫu nhiên các dạng bên dưới |
| Trắc nghiệm · 選択 | Nghĩa, âm Hán Việt, cách đọc, hoặc chọn chữ theo nghĩa (phím 1–4) |
| Kéo nối · マッチング | Kéo thả để nối 5 cặp |
| Gõ cách đọc · 読み入力 | Gõ romaji, tự chuyển sang kana (`hikkosu` → ひっこす) |
| Ghép cách đọc · 読み並べ | Bấm các chữ kana theo đúng thứ tự |
| Điền chỗ trống · 穴埋め | Chọn từ đúng cho câu ví dụ (chỉ từ vựng) |
| Thẻ ghi nhớ · カード | Lật thẻ, tự đánh giá "Đã nhớ / Chưa nhớ" |

Ngoài ra còn trang **Luyện Kana** (`kana.html`) cho hiragana/katakana và bảng chữ có phát âm.

- Trang luôn chờ bạn bấm **Tiếp 次へ** mới sang câu mới.
- Chữ hay sai sẽ xuất hiện nhiều hơn; tiến độ được lưu trong trình duyệt (localStorage).
- Bấm vào chữ / sau mỗi câu sẽ có phát âm tiếng Nhật (nếu trình duyệt có giọng ja-JP).

## Cách chạy

Mở `index.html` bằng trình duyệt, hoặc chạy một server tĩnh:

```bash
python -m http.server 5630
```

rồi vào `http://localhost:5630`.

## Ghi chú

- Cấp độ JLPT chỉ mang tính tương đối (từ năm 2010 không còn danh sách chính thức).
- Dữ liệu nằm trong `data.js` — có thể thêm kanji/từ vựng mới dễ dàng.
