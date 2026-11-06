import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KANA_BASIC, KANA_DAKUTEN, KANA_YOON, toKata } from "../data/kana";
import { seeded } from "../test/seeded";
import { KanaPage } from "./KanaPage";

const ALL = [...KANA_BASIC, ...KANA_DAKUTEN, ...KANA_YOON].filter(Boolean) as (readonly [string, ...string[]])[];
const readingsOf = (shown: string) => ALL.find(([h]) => h === shown || toKata(h) === shown)!.slice(1);

test("typing an accepted romaji of the shown kana is correct, and the page waits for Next", async () => {
  render(<KanaPage rand={seeded(2)} />);
  const shown = screen.getByTestId("kana-prompt").textContent!;
  const readings = readingsOf(shown);
  await userEvent.type(screen.getByTestId("kana-input"), readings[readings.length - 1].toUpperCase() + "{Enter}");
  expect(screen.getByTestId("verdict")).toHaveTextContent("正解！");
  expect(screen.getByTestId("next-button")).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("next-button"));
  expect(screen.queryByTestId("next-button")).not.toBeInTheDocument();
});

test("a wrong answer says the right reading and lists the kana as tricky", async () => {
  render(<KanaPage rand={seeded(5)} />);
  const shown = screen.getByTestId("kana-prompt").textContent!;
  await userEvent.type(screen.getByTestId("kana-input"), "qqq{Enter}");
  expect(screen.getByTestId("verdict")).toHaveTextContent("Chưa đúng");
  expect(screen.getByTestId("kana-answer")).toHaveTextContent(`${shown} = ${readingsOf(shown)[0]}`);
  expect(screen.getByTestId("kana-weak")).toHaveTextContent(shown);
  expect(JSON.parse(localStorage.getItem("tango-dojo:kana")!).miss[shown]).toBe(1);
});

test("choice mode shows 4 options with the right one among them", async () => {
  render(<KanaPage rand={seeded(3)} />);
  await userEvent.click(screen.getByRole("button", { name: "Trắc nghiệm" }));
  const opts = screen.getAllByTestId("choice-option").map(o => o.textContent!.replace(/^\d/, ""));
  expect(opts).toHaveLength(4);
  expect(opts).toContain(readingsOf(screen.getByTestId("kana-prompt").textContent!)[0]);
});

test("at least one kana set stays selected", async () => {
  render(<KanaPage rand={seeded(3)} />);
  const basic = screen.getByRole("button", { name: "Cơ bản" });
  await userEvent.click(basic);
  expect(basic).toHaveAttribute("aria-pressed", "true");
});

test("chart has 104 hiragana cells and switches to katakana", async () => {
  render(<KanaPage rand={seeded(1)} />);
  await userEvent.click(screen.getByRole("button", { name: "Bảng chữ 五十音表" }));
  const cells = screen.getAllByTestId("kana-cell");
  expect(cells).toHaveLength(104);
  expect(cells[0]).toHaveTextContent("あa");
  await userEvent.click(screen.getByRole("button", { name: "Katakana" }));
  expect(screen.getAllByTestId("kana-cell")[0]).toHaveTextContent("アa");
});
