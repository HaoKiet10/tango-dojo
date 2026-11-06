import { useEffect, useRef } from "react";

/** Verdict + explanation + the Next button. On phones the button is pinned above the tab bar. */
export function AnswerPanel({ correct, onNext, children }: { correct: boolean; onNext: () => void; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const shownAt = useRef(0);
  useEffect(() => {
    shownAt.current = Date.now();
    // Reserve room for the pinned Next bar first, then scroll once that padding exists.
    document.documentElement.style.setProperty("--next-space", "64px");
    const frame = requestAnimationFrame(() => ref.current?.scrollIntoView?.({ block: "nearest", behavior: "smooth" }));
    button.current?.focus({ preventScroll: true });
    return () => { cancelAnimationFrame(frame); document.documentElement.style.removeProperty("--next-space"); };
  }, []);
  // A second tap or Enter right after answering must not skip the explanation unseen.
  const next = () => { if (Date.now() - shownAt.current >= 300) onNext(); };
  return (
    <div ref={ref} aria-live="polite"
      className={`mt-4 scroll-mb-[calc(136px+env(safe-area-inset-bottom))] rounded-card border p-4 sm:scroll-mb-4 ${correct ? "border-positive/40 bg-positive-bg" : "border-negative/40 bg-negative-bg"}`}>
      <p data-testid="verdict" className={`m-0 mb-2 text-sm font-semibold ${correct ? "text-positive" : "text-negative"}`}>
        {correct ? "正解！ Chính xác!" : "残念… Chưa đúng."}
      </p>
      <div className="text-ink">{children}</div>
      <div className="fixed inset-x-0 bottom-[calc(56px+env(safe-area-inset-bottom))] z-20 bg-ground/95 px-4 py-2 sm:static sm:mt-4 sm:flex sm:justify-end sm:bg-transparent sm:p-0">
        <button ref={button} type="button" data-testid="next-button" onClick={next}
          className="min-h-12 w-full rounded-control bg-primary px-6 text-base font-semibold text-on-primary active:scale-[0.98] sm:w-auto">
          Tiếp 次へ →
        </button>
      </div>
    </div>
  );
}
