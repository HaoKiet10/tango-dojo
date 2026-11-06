/**
 * Should a document-level shortcut handle this key press? Only when the user isn't aiming it at
 * something else: no modifier keys, and focus is on the page itself, the question, or the Next button.
 * (Enter on a focused settings button or nav link must do that control's job.)
 */
export function isAnswerKey(e: KeyboardEvent): boolean {
  if (e.ctrlKey || e.metaKey || e.altKey) return false;
  const t = e.target;
  if (!(t instanceof HTMLElement) || t === document.body || t === document.documentElement) return true;
  if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) return false;
  return !!t.closest('[data-testid="question"],[data-testid="next-button"]');
}
