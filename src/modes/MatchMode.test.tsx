import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ITEMS } from "../data/items";
import { MatchSummary } from "../components/MatchSummary";
import { MatchMode } from "./MatchMode";
import type { AnswerResult } from "./types";

const items = ["k:会", "k:同", "k:事", "k:自", "k:発"].map(id => ITEMS.find(i => i.id === id)!);
const question = { mode: "match" as const, items, matchField: "hanViet" as const };

const lefts = () => screen.getAllByTestId("match-left");
const rights = () => screen.getAllByTestId("match-right");
const rightFor = (id: string) => rights().find(r => r.dataset.item === id)!;

function setup() {
  const answers: AnswerResult[] = [];
  render(<MatchMode question={question} locked={false} onAnswer={r => answers.push(r)} />);
  return answers;
}

test("shows the title for the field being matched", () => {
  setup();
  expect(screen.getByText("Nối mỗi chữ kanji với âm Hán Việt của nó")).toBeInTheDocument();
});

test("tapping each pair finishes the round and every row holds a true pair", async () => {
  const answers = setup();
  for (const l of lefts()) {
    await userEvent.click(l);
    await userEvent.click(rightFor(l.dataset.item!));
  }
  for (const l of lefts()) expect(rightFor(l.dataset.item!).style.gridRow).toBe(l.style.gridRow);
  for (const el of [...lefts(), ...rights()]) expect(el).toHaveAttribute("data-state", "done");
  expect(answers).toHaveLength(1);
  expect(answers[0].summary).toBe("match");
  expect(answers[0].results.every(r => r.correct)).toBe(true);
});

test("a wrong attempt marks that pair late and reports it as wrong", async () => {
  const answers = setup();
  const first = lefts()[0];
  const wrongRight = rights().find(r => r.dataset.item !== first.dataset.item)!;
  await userEvent.click(first);
  await userEvent.click(wrongRight);
  expect(first).not.toHaveAttribute("data-state", "done");
  for (const l of lefts()) {
    await userEvent.click(l);
    await userEvent.click(rightFor(l.dataset.item!));
  }
  expect(first).toHaveAttribute("data-state", "late");
  expect(rightFor(first.dataset.item!)).toHaveAttribute("data-state", "late");
  const wrong = answers[0].results.filter(r => !r.correct);
  expect(wrong.map(r => r.item.id)).toEqual([first.dataset.item]);
});

test("match summary lists every pair and marks the missed one", () => {
  render(<MatchSummary results={items.map((item, i) => ({ item, correct: i !== 2 }))} />);
  expect(screen.getByText(/Nối sai 1 \/ 5 cặp/)).toBeInTheDocument();
  expect(screen.getByText(/ô màu cam là cặp bạn đã nối sai lúc đầu/)).toBeInTheDocument();
  const rows = screen.getAllByTestId("summary-row");
  expect(rows).toHaveLength(5);
  expect(rows[2]).toHaveTextContent("事SỰviệc, sự việcnối sai");
  expect(rows[0]).not.toHaveTextContent("nối sai");
});

test("match summary when all pairs were right first time", () => {
  render(<MatchSummary results={items.map(item => ({ item, correct: true }))} />);
  expect(screen.getByText("Nối đúng hết ngay lần đầu!")).toBeInTheDocument();
});
