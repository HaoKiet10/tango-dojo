/** The big question text: a single kanji, a word, or a Vietnamese meaning. */
export function Prompt({ text, kind }: { text: string; kind: "kanji" | "word" | "meaning" }) {
  const cls = kind === "kanji" ? "font-jp text-[clamp(56px,22vw,112px)] leading-[1.1]"
    : kind === "word" ? "font-jp text-[clamp(36px,11vw,64px)] leading-[1.2] break-keep"
    : "text-2xl font-semibold leading-snug";
  return <div data-testid="prompt" className={`mt-2 text-center ${cls}`}>{text}</div>;
}

export function Hint({ children }: { children: React.ReactNode }) {
  return <div className="mt-2 text-center text-sm text-muted">{children}</div>;
}

export const promptKind = (text: string): "kanji" | "word" => ([...text].length > 1 ? "word" : "kanji");
