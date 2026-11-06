import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

const h1 = () => screen.getByRole("heading", { level: 1 });
const tabs = () => within(screen.getByRole("navigation", { name: "Thanh tab" }));

test("renders the product name and an h1", () => {
  render(<App />);
  expect(screen.getByText("Tango Dojo")).toBeInTheDocument();
  expect(h1()).toBeInTheDocument();
});

test("defaults to the practice page", () => {
  render(<App />);
  expect(h1()).toHaveTextContent("Luyện tập 練習");
});

test("tab click changes route and h1", async () => {
  render(<App />);
  await userEvent.click(tabs().getByRole("link", { name: "Tiến độ" }));
  expect(window.location.hash).toBe("#/progress");
  expect(h1()).toHaveTextContent("Tiến độ 進捗");
  await userEvent.click(tabs().getByRole("link", { name: "Kana" }));
  expect(h1()).toHaveTextContent("Luyện Kana かな");
  expect(tabs().getByRole("link", { name: "Kana" })).toHaveAttribute("aria-current", "page");
});

test("unknown hash falls back to practice", () => {
  window.location.hash = "#/nope";
  render(<App />);
  expect(h1()).toHaveTextContent("Luyện tập 練習");
});

test("hash change from outside switches page", () => {
  render(<App />);
  act(() => { window.location.hash = "#/progress"; window.dispatchEvent(new HashChangeEvent("hashchange")); });
  expect(h1()).toHaveTextContent("Tiến độ 進捗");
});
