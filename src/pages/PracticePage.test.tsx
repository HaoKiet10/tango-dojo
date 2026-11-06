import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DEFAULT_SETTINGS, loadProgress, type Settings } from "../lib/progress";
import { seeded } from "../test/seeded";
import { PracticePage } from "./PracticePage";

const renderPractice = (over: Partial<Settings> = {}, seed = 1) =>
  render(<PracticePage settings={{ ...DEFAULT_SETTINGS, sound: false, ...over }} onSettings={() => {}} rand={seeded(seed)} />);
const totalRecorded = () => Object.values(loadProgress().items).reduce((n, r) => n + r.right + r.wrong, 0);
const option = () => screen.getAllByTestId("choice-option")[0];

test("waits for Next after answering", async () => {
  renderPractice({ mode: "choice" });
  await userEvent.click(option());
  expect(screen.getByTestId("next-button")).toHaveTextContent("Tiếp 次へ →");
  await new Promise(r => setTimeout(r, 1500));
  expect(screen.getByTestId("next-button")).toBeInTheDocument();
});

test("records only once on double click", async () => {
  renderPractice({ mode: "choice" });
  await userEvent.dblClick(option());
  expect(totalRecorded()).toBe(1);
});

test("Next shows a new question and hides the panel", async () => {
  renderPractice({ mode: "choice" });
  await userEvent.click(option());
  await userEvent.click(screen.getByTestId("next-button"));
  expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
  expect(screen.getAllByTestId("choice-option")).toHaveLength(4);
});

test("Enter moves on after an answer", async () => {
  renderPractice({ mode: "choice" });
  await userEvent.click(option());
  await new Promise(r => setTimeout(r, 300));
  await userEvent.keyboard("{Enter}");
  expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
});

test("verdict and stats line agree", async () => {
  renderPractice({ mode: "choice" });
  expect(screen.getByTestId("stats-line")).toHaveTextContent("0 đúng · – · chuỗi 0");
  await userEvent.click(option());
  const right = screen.getByTestId("verdict").textContent!.includes("正解");
  expect(screen.getByTestId("stats-line")).toHaveTextContent(right ? "1 đúng · 100% · chuỗi 1" : "0 đúng · 0% · chuỗi 0");
});

test("mode tag names the practice type in both languages", () => {
  renderPractice({ mode: "choice" });
  expect(screen.getByTestId("mode-tag")).toHaveTextContent("Trắc nghiệm · 選択");
});
