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
