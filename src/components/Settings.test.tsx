import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { useSettings } from "../lib/useSettings";
import { SettingsControls } from "./SettingsControls";
import { SettingsSheet } from "./SettingsSheet";
import { SettingsSummary } from "./SettingsSummary";

function Harness() {
  const [s, set] = useSettings();
  const [open, setOpen] = useState(false);
  return (
    <>
      <SettingsSummary settings={s} onOpen={() => setOpen(true)} />
      <SettingsSheet open={open} onClose={() => setOpen(false)}>
        <SettingsControls settings={s} onChange={set} />
      </SettingsSheet>
    </>
  );
}

const stored = () => JSON.parse(localStorage.getItem("tango-dojo:settings") ?? "{}");
const summary = () => screen.getByTestId("settings-summary");
const dialog = () => within(screen.getByRole("dialog"));

test("summary shows current settings", () => {
  render(<Harness />);
  expect(summary()).toHaveTextContent("Từ vựng · N4 · Hỗn hợp");
});

test("opening the sheet and choosing N3 updates summary and storage", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "N3" }));
  expect(summary()).toHaveTextContent("Từ vựng · N3 · Hỗn hợp");
  expect(stored().level).toBe("3");
  expect(dialog().getByRole("button", { name: "N3" })).toHaveAttribute("aria-pressed", "true");
});

test("fill is disabled for kanji with a reason", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "Kanji 漢字" }));
  const fill = dialog().getByRole("button", { name: "Điền chỗ trống" });
  expect(fill).toBeDisabled();
  expect(fill).toHaveAttribute("title", "Điền chỗ trống chỉ dùng cho từ vựng");
});

test("switching to kanji while on fill falls back to mixed", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "Điền chỗ trống" }));
  expect(summary()).toHaveTextContent("Điền chỗ trống");
  await userEvent.click(dialog().getByRole("button", { name: "Kanji 漢字" }));
  expect(summary()).toHaveTextContent("Kanji · N4 · Hỗn hợp");
  expect(stored().mode).toBe("mixed");
});

test("sound switch saves", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("switch", { name: "Âm thanh 音" }));
  expect(stored().sound).toBe(false);
});

test("Escape and Xong close the sheet", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.keyboard("{Escape}");
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "Xong" }));
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("the reason fill is unavailable is visible text, not only a tooltip", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "Kanji 漢字" }));
  expect(dialog().getByText("Điền chỗ trống chỉ dùng cho từ vựng")).toBeVisible();
});

test("N5 is kanji-only: disabled for vocab, and switching to vocab from N5 falls back to N4", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  expect(dialog().getByRole("button", { name: "N5" })).toBeDisabled();
  expect(dialog().getByText("N5 hiện chỉ có kanji")).toBeInTheDocument();
  await userEvent.click(dialog().getByRole("button", { name: "Kanji 漢字" }));
  await userEvent.click(dialog().getByRole("button", { name: "N5" }));
  expect(summary()).toHaveTextContent("Kanji · N5 · Hỗn hợp");
  await userEvent.click(dialog().getByRole("button", { name: "Từ vựng 語彙" }));
  expect(summary()).toHaveTextContent("Từ vựng · N4 · Hỗn hợp");
  expect(stored()).toMatchObject({ deck: "vocab", level: "4" });
});

test("a saved vocab + N5 setting loads as N4", () => {
  localStorage.setItem("tango-dojo:settings", JSON.stringify({ deck: "vocab", level: "5", mode: "mixed", sound: true }));
  render(<Harness />);
  expect(summary()).toHaveTextContent("Từ vựng · N4 · Hỗn hợp");
});

test("switching to grammar while on Gõ cách đọc falls back to mixed", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "Gõ cách đọc" }));
  await userEvent.click(dialog().getByRole("button", { name: "Ngữ pháp 文法" }));
  expect(summary()).toHaveTextContent("Ngữ pháp · N4 · Hỗn hợp");
  expect(stored()).toMatchObject({ deck: "grammar", mode: "mixed" });
});

test("grammar disables the word modes and enables its own", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "Ngữ pháp 文法" }));
  expect(dialog().getByRole("button", { name: "Gõ cách đọc" })).toBeDisabled();
  expect(dialog().getByRole("button", { name: "Gõ cách đọc" })).toHaveAttribute("title", "Không dùng cho ngữ pháp");
  expect(dialog().getByRole("button", { name: "Chọn ngữ pháp" })).toBeEnabled();
  expect(dialog().getByRole("button", { name: "N5" })).toBeEnabled();
});

test("grammar-only modes are disabled for kanji", async () => {
  render(<Harness />);
  await userEvent.click(summary());
  await userEvent.click(dialog().getByRole("button", { name: "Kanji 漢字" }));
  expect(dialog().getByRole("button", { name: "Sắp xếp câu" })).toBeDisabled();
  expect(dialog().getByRole("button", { name: "Sắp xếp câu" })).toHaveAttribute("title", "Chỉ dùng cho ngữ pháp");
});

test("a saved grammar + N5 setting stays N5", () => {
  localStorage.setItem("tango-dojo:settings", JSON.stringify({ deck: "grammar", level: "5", mode: "mixed", sound: true }));
  render(<Harness />);
  expect(summary()).toHaveTextContent("Ngữ pháp · N5 · Hỗn hợp");
});
