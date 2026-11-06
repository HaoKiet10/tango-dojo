import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ITEMS } from "../data/items";
import { kanaUnits } from "../lib/romaji";
import { SpellMode } from "./SpellMode";
import { TypeMode } from "./TypeMode";
import type { AnswerResult } from "./types";

const kaisha = ITEMS.find(i => i.id === "k:会")!;          // 会社 / かいしゃ
const kyoumi = ITEMS.find(i => i.id === "v:興味")!;        // きょうみ

function setup(ui: (onAnswer: (r: AnswerResult) => void) => React.ReactElement) {
  const answers: AnswerResult[] = [];
  render(ui(r => answers.push(r)));
  return answers;
}

test("typing the romaji reading is correct, and the kana preview follows the typing", async () => {
  const answers = setup(on => <TypeMode question={{ mode: "type", items: [kaisha] }} locked={false} onAnswer={on} />);
  expect(screen.getByTestId("prompt")).toHaveTextContent("会社");
  await userEvent.type(screen.getByTestId("type-input"), "kaisha");
  expect(screen.getByTestId("kana-preview")).toHaveTextContent("かいしゃ");
  await userEvent.click(screen.getByTestId("check-button"));
  expect(answers).toEqual([{ results: [{ item: kaisha, correct: true }] }]);
});

test("Enter submits, and katakana input is accepted", async () => {
  const answers = setup(on => <TypeMode question={{ mode: "type", items: [kaisha] }} locked={false} onAnswer={on} />);
  await userEvent.type(screen.getByTestId("type-input"), "カイシャ{Enter}");
  expect(answers[0].results[0].correct).toBe(true);
});

test("a wrong answer shows the typed kana struck through and the right reading", async () => {
  const answers = setup(on => <TypeMode question={{ mode: "type", items: [kaisha] }} locked={false} onAnswer={on} />);
  await userEvent.type(screen.getByTestId("type-input"), "kaisa{Enter}");
  expect(answers[0].results[0].correct).toBe(false);
  expect(screen.getByTestId("kana-preview")).toHaveTextContent("かいさ → かいしゃ");
  expect(screen.getByTestId("type-input")).toBeDisabled();
});

test("ignores empty submit", async () => {
  const answers = setup(on => <TypeMode question={{ mode: "type", items: [kaisha] }} locked={false} onAnswer={on} />);
  await userEvent.type(screen.getByTestId("type-input"), "   ");
  await userEvent.click(screen.getByTestId("check-button"));
  expect(answers).toHaveLength(0);
});

test("type input is phone friendly", () => {
  setup(on => <TypeMode question={{ mode: "type", items: [kaisha] }} locked={false} onAnswer={on} />);
  const input = screen.getByTestId("type-input");
  expect(input).toHaveAttribute("autocapitalize", "off");
  expect(input).toHaveAttribute("autocorrect", "off");
  expect(input).toHaveAttribute("spellcheck", "false");
  expect(input).toHaveAttribute("enterkeyhint", "done");
});

const spellQ = { mode: "spell" as const, items: [kyoumi], tiles: ["み", "ぬ", "きょ", "た", "う", "ろ"] };

test("spell: tapping tiles in order is correct", async () => {
  const answers = setup(on => <SpellMode question={spellQ} locked={false} onAnswer={on} />);
  for (const u of kanaUnits("きょうみ")) await userEvent.click(screen.getByRole("button", { name: u }));
  expect(answers[0].results[0].correct).toBe(true);
});

test("spell: tapping a filled slot removes it", async () => {
  const answers = setup(on => <SpellMode question={spellQ} locked={false} onAnswer={on} />);
  await userEvent.click(screen.getByRole("button", { name: "ぬ" }));
  expect(screen.getAllByTestId("slot")[0]).toHaveTextContent("ぬ");
  await userEvent.click(screen.getAllByTestId("slot")[0]);
  expect(screen.getAllByTestId("slot")[0]).toHaveTextContent("");
  for (const u of ["きょ", "う", "み"]) await userEvent.click(screen.getByRole("button", { name: u }));
  expect(answers[0].results[0].correct).toBe(true);
});

test("spell: a wrong order is wrong and shows the reading", async () => {
  const answers = setup(on => <SpellMode question={spellQ} locked={false} onAnswer={on} />);
  for (const u of ["う", "きょ", "み"]) await userEvent.click(screen.getByRole("button", { name: u }));
  expect(answers[0].results[0].correct).toBe(false);
  expect(screen.getByTestId("spell-correction")).toHaveTextContent("きょうみ");
});
