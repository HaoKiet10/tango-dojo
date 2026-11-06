import { act, fireEvent, render, screen } from "@testing-library/react";
import { AnswerPanel } from "./AnswerPanel";

test("Next ignores presses in the first moment after the panel appears", () => {
  vi.useFakeTimers();
  const onNext = vi.fn();
  render(<AnswerPanel correct onNext={onNext}>x</AnswerPanel>);
  fireEvent.click(screen.getByTestId("next-button"));
  expect(onNext).not.toHaveBeenCalled();
  act(() => { vi.advanceTimersByTime(350); });
  fireEvent.click(screen.getByTestId("next-button"));
  expect(onNext).toHaveBeenCalledTimes(1);
  vi.useRealTimers();
});
