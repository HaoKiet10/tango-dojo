import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ITEMS } from "../data/items";
import { DEFAULT_SETTINGS, loadProgress } from "../lib/progress";
import { PracticePage } from "../pages/PracticePage";
import { seeded } from "../test/seeded";
import { FillMode } from "./FillMode";
import type { AnswerResult } from "./types";

const mamoru = ITEMS.find(i => i.id === "v:守る")!;   // 約束は必ず＿＿。

test("fill shows the sentence and translation, then fills the blank", async () => {
  const answers: AnswerResult[] = [];
  render(<FillMode question={{ mode: "fill", items: [mamoru], options: ["頼む", "守る", "減る", "驚く"], answer: "守る" }}
    locked={false} onAnswer={r => answers.push(r)} />);
  expect(screen.getByTestId("sentence")).toHaveTextContent("約束は必ず？。");
  expect(screen.getByText("Tôi luôn giữ lời hứa.")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /守る/ }));
  expect(screen.getByTestId("blank")).toHaveTextContent("守る");
  expect(answers[0]).toMatchObject({ results: [{ item: mamoru, correct: true }], speakText: "約束は必ず守る。" });
});

test("cards flip, then Đã nhớ records right and shows a new card without a Next button", async () => {
  render(<PracticePage settings={{ ...DEFAULT_SETTINGS, mode: "cards", sound: false }} onSettings={() => {}} rand={seeded(3)} />);
  expect(screen.queryByTestId("rate-good")).not.toBeInTheDocument();
  await userEvent.click(screen.getByTestId("flip-card"));
  expect(screen.getByTestId("explain-head")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("rate-good"));
  const recs = Object.values(loadProgress().items);
  expect(recs).toEqual([expect.objectContaining({ right: 1, wrong: 0 })]);
  expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
  expect(screen.queryByTestId("rate-good")).not.toBeInTheDocument();   // back to the front of a new card
});

test("cards: keys Space then 1 rate as not remembered", async () => {
  render(<PracticePage settings={{ ...DEFAULT_SETTINGS, mode: "cards", sound: false }} onSettings={() => {}} rand={seeded(4)} />);
  await userEvent.keyboard(" ");
  await userEvent.keyboard("1");
  expect(Object.values(loadProgress().items)).toEqual([expect.objectContaining({ right: 0, wrong: 1 })]);
});
