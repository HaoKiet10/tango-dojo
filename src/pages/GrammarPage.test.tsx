import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GRAMMAR } from "../data/grammar";
import { GrammarPage } from "./GrammarPage";
import { fold } from "../lib/fold";

const rows = () => screen.queryAllByTestId("grammar-row");
const search = () => screen.getByRole("searchbox", { name: "Tìm mẫu ngữ pháp" });
const nagara = GRAMMAR.find(g => g.id === "nagara")!;

test("shows every pattern by default", () => {
  render(<GrammarPage />);
  expect(screen.getByRole("button", { name: "Tất cả" })).toHaveAttribute("aria-pressed", "true");
  expect(rows()).toHaveLength(GRAMMAR.length);
});

test("a level chip filters to that level", async () => {
  render(<GrammarPage />);
  await userEvent.click(screen.getByRole("button", { name: "N4" }));
  expect(rows()).toHaveLength(GRAMMAR.filter(g => g.level === 4).length);
  await userEvent.click(screen.getByRole("button", { name: "N3" }));
  expect(rows()).toHaveLength(GRAMMAR.filter(g => g.level === 3).length);
});

test("search matches the meaning without accents, and the pattern without 〜", async () => {
  render(<GrammarPage />);
  await userEvent.type(search(), "vua");
  const matches = GRAMMAR.filter(g => fold(g.meaning).includes("vua"));
  expect(rows()).toHaveLength(matches.length);
  expect(rows().map(r => r.textContent).join()).toContain("〜ながら");
  await userEvent.clear(search());
  await userEvent.type(search(), "ながら");
  expect(rows()).toHaveLength(1);
});

test("no match says so", async () => {
  render(<GrammarPage />);
  await userEvent.type(search(), "zzzz");
  expect(rows()).toHaveLength(0);
  expect(screen.getByText("Không tìm thấy mẫu nào")).toBeInTheDocument();
});

test("tapping a row expands its form, note and examples", async () => {
  render(<GrammarPage />);
  await userEvent.type(search(), "ながら");
  const button = within(rows()[0]).getByRole("button");
  expect(button).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByText(nagara.note)).not.toBeInTheDocument();
  await userEvent.click(button);
  expect(button).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText(nagara.form)).toBeInTheDocument();
  expect(screen.getByText(nagara.note)).toBeInTheDocument();
  for (const ex of nagara.examples) expect(screen.getByText(ex.vi)).toBeInTheDocument();
});
