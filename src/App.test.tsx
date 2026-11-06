import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the product name and an h1", () => {
  render(<App />);
  expect(screen.getByText("Tango Dojo")).toBeInTheDocument();
  expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
});
