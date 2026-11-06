import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { emptyProgress, loadProgress, recordAnswer, saveProgress } from "../lib/progress";
import { ProgressPage } from "./ProgressPage";

test("shows the five decks with their totals", () => {
  render(<ProgressPage />);
  const bars = screen.getAllByTestId("deck-bar").map(b => b.textContent);
  expect(bars).toEqual([
    expect.stringContaining("Kanji 漢字 · N5đã thuộc 0 / 99"),
    expect.stringContaining("Kanji 漢字 · N4đã thuộc 0 / 73"),
    expect.stringContaining("Kanji 漢字 · N3đã thuộc 0 / 80"),
    expect.stringContaining("Từ vựng 語彙 · N4đã thuộc 0 / 172"),
    expect.stringContaining("Từ vựng 語彙 · N3đã thuộc 0 / 164"),
  ]);
  expect(screen.getByText("Chưa sai câu nào — luyện tập thôi!")).toBeInTheDocument();
});

test("counts learned items and lists a missed kanji with its Hán Việt", () => {
  let p = emptyProgress();
  for (let i = 0; i < 3; i++) p = recordAnswer(p, "k:会", true, 1, 1);
  p = recordAnswer(p, "k:同", false, 0, 2);
  p = recordAnswer(p, "v:夢", false, 0, 3);
  saveProgress(p);
  render(<ProgressPage />);
  expect(screen.getAllByTestId("deck-bar")[1]).toHaveTextContent("đã thuộc 1 / 73");
  const weak = screen.getAllByTestId("weak-item").map(w => w.textContent);
  expect(weak).toEqual(expect.arrayContaining([
    expect.stringContaining("同ĐỒNG"), expect.stringContaining("夢ゆめ"),
  ]));
  expect(weak.join()).not.toContain("会");
});

test("reset clears after confirm", async () => {
  saveProgress(recordAnswer(emptyProgress(), "k:同", false, 0, 1));
  vi.stubGlobal("confirm", vi.fn(() => true));
  render(<ProgressPage />);
  await userEvent.click(screen.getByRole("button", { name: "Xóa toàn bộ tiến độ" }));
  expect(loadProgress()).toEqual(emptyProgress());
  expect(screen.getByText("Chưa sai câu nào — luyện tập thôi!")).toBeInTheDocument();
  vi.unstubAllGlobals();
});

test("reset does nothing when cancelled", async () => {
  saveProgress(recordAnswer(emptyProgress(), "k:同", false, 0, 1));
  vi.stubGlobal("confirm", vi.fn(() => false));
  render(<ProgressPage />);
  await userEvent.click(screen.getByRole("button", { name: "Xóa toàn bộ tiến độ" }));
  expect(loadProgress().items["k:同"]).toBeDefined();
  vi.unstubAllGlobals();
});
