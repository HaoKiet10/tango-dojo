import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GRAMMAR } from "../data/grammar";
import type { Grammar, GrammarExample, Item } from "../data/types";
import type { Question } from "../lib/question";
import { OrderMode } from "./OrderMode";
import { fullSentence } from "../lib/question";
import { DEFAULT_SETTINGS, type Mode } from "../lib/progress";
import { seeded } from "../test/seeded";
import { PracticePage } from "../pages/PracticePage";

const renderGrammar = (mode: Mode, seed = 1) =>
  render(<PracticePage settings={{ ...DEFAULT_SETTINGS, deck: "grammar", level: "both", mode, sound: false }}
    onSettings={() => {}} rand={seeded(seed)} />);

/** The pattern and example shown, found from the sentence on screen. */
function shown(): { pattern: (typeof GRAMMAR)[number]; ex: GrammarExample } {
  const text = screen.getByTestId("sentence").textContent!;
  for (const pattern of GRAMMAR) for (const ex of pattern.examples) {
    const [before, after] = ex.ja.split("＿＿");
    if (text.startsWith(before) && text.endsWith(after)) return { pattern, ex };
  }
  throw new Error("sentence not in GRAMMAR: " + text);
}

describe("Chọn ngữ pháp", () => {
  test("shows the sentence with a blank and 4 options, the translation hidden", () => {
    renderGrammar("grammar");
    const { ex } = shown();
    expect(screen.getByTestId("blank")).toHaveTextContent("？");
    expect(screen.getAllByTestId("choice-option")).toHaveLength(4);
    expect(screen.queryByText(ex.vi)).not.toBeInTheDocument();
  });

  test("the right answer shows the pattern's explanation and the translation", async () => {
    renderGrammar("grammar");
    const { pattern, ex } = shown();
    await userEvent.click(screen.getAllByTestId("choice-option").find(b => b.textContent!.endsWith(ex.answer))!);
    expect(screen.getByTestId("verdict")).toHaveTextContent("Chính xác");
    const head = screen.getByTestId("explain-head");
    expect(head).toHaveTextContent(pattern.pattern);
    expect(head).toHaveTextContent(pattern.form);
    expect(head).toHaveTextContent(pattern.meaning);
    expect(screen.getByText(pattern.note)).toBeInTheDocument();
    expect(screen.getByTestId("explain-sentence")).toHaveTextContent(fullSentence(ex));
    expect(screen.getAllByText(ex.vi).length).toBeGreaterThan(0);
  });

  test("a wrong answer is marked wrong and the right one right", async () => {
    renderGrammar("grammar");
    const { ex } = shown();
    const options = screen.getAllByTestId("choice-option");
    await userEvent.click(options.find(b => !b.textContent!.endsWith(ex.answer))!);
    expect(screen.getByTestId("verdict")).toHaveTextContent("Chưa đúng");
    expect(options.find(b => b.textContent!.endsWith(ex.answer))).toHaveAttribute("data-state", "right");
  });
});

describe("Sắp xếp câu", () => {
  const makeQuestion = (pieces: string[], tiles: string[]): Question => {
    const ex = { ja: pieces.join("").replace("に行く", "＿＿行く"), answer: "に", pieces, vi: "Tôi đi đến nhà ga." };
    const g: Grammar = { id: "x", pattern: "〜に", level: 4, form: "f", meaning: "m", note: "n", confusables: [], examples: [ex, ex] };
    const item: Item = { id: "g:x", deck: "grammar", level: 4, prompt: "〜に", meaning: "m", word: "〜に", reading: "", wordMeaning: "m", grammar: g };
    return { mode: "order", items: [item], example: 0, tiles };
  };
  const tile = (text: string, nth = 0) => screen.getAllByTestId("tile").filter(t => t.textContent === text && !t.className.includes("invisible"))[nth];

  test("tapping the tiles in order, then Kiểm tra, is correct", async () => {
    const onAnswer = vi.fn();
    render(<OrderMode question={makeQuestion(["駅", "に", "行く。"], ["行く。", "駅", "に"])} locked={false} onAnswer={onAnswer} />);
    expect(screen.getByTestId("check-button")).toBeDisabled();
    for (const t of ["駅", "に", "行く。"]) await userEvent.click(tile(t));
    await userEvent.click(screen.getByTestId("check-button"));
    expect(onAnswer).toHaveBeenCalledWith(expect.objectContaining({ results: [expect.objectContaining({ correct: true })] }));
  });

  test("tapping a filled slot puts its tile back", async () => {
    render(<OrderMode question={makeQuestion(["駅", "に", "行く。"], ["行く。", "駅", "に"])} locked={false} onAnswer={vi.fn()} />);
    await userEvent.click(tile("駅"));
    expect(screen.getAllByTestId("slot")[0]).toHaveTextContent("駅");
    await userEvent.click(screen.getAllByTestId("slot")[0]);
    expect(screen.getAllByTestId("slot")[0]).toHaveTextContent("");
    expect(tile("駅")).toBeVisible();
  });

  test("a wrong order shows the attempt struck through and the right sentence", async () => {
    const onAnswer = vi.fn();
    render(<OrderMode question={makeQuestion(["駅", "に", "行く。"], ["行く。", "駅", "に"])} locked={false} onAnswer={onAnswer} />);
    for (const t of ["に", "駅", "行く。"]) await userEvent.click(tile(t));
    await userEvent.click(screen.getByTestId("check-button"));
    expect(onAnswer).toHaveBeenCalledWith(expect.objectContaining({ results: [expect.objectContaining({ correct: false })] }));
    const fix = screen.getByTestId("order-correction");
    expect(fix.querySelector("s")).toHaveTextContent("に駅行く。");
    expect(fix).toHaveTextContent("駅に行く。");
  });

  test("identical pieces in swapped places still count as right", async () => {
    const onAnswer = vi.fn();
    render(<OrderMode question={makeQuestion(["駅", "に", "行く", "に", "。"], ["に", "。", "行く", "駅", "に"])} locked={false} onAnswer={onAnswer} />);
    // The two に tiles are placed in the opposite order to their tile positions.
    for (const [t, n] of [["駅", 0], ["に", 1], ["行く", 0], ["に", 0], ["。", 0]] as const) await userEvent.click(tile(t, n));
    await userEvent.click(screen.getByTestId("check-button"));
    expect(onAnswer).toHaveBeenCalledWith(expect.objectContaining({ results: [expect.objectContaining({ correct: true })] }));
  });
});
