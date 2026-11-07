import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GRAMMAR } from "../data/grammar";
import type { GrammarExample } from "../data/types";
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
