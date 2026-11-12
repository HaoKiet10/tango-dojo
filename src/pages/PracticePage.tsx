import { useCallback, useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { AnswerPanel } from "../components/AnswerPanel";
import { Explanation } from "../components/Explanation";
import { MatchSummary } from "../components/MatchSummary";
import { MODE_LABELS } from "../components/labels";
import { PageTitle } from "../components/PageTitle";
import { SettingsControls } from "../components/SettingsControls";
import { SettingsSheet } from "../components/SettingsSheet";
import { SettingsSummary } from "../components/SettingsSummary";
import { StatsLine } from "../components/StatsLine";
import { ITEMS } from "../data/items";
import { poolFor, remember, type Rand } from "../lib/picker";
import { dayOf, loadProgress, loadRecent, loadToday, recordAnswer, saveProgress, saveRecent, saveToday, type Settings } from "../lib/progress";
import { availableModes, buildQuestion, fullSentence, isKanjiFirst, pickMode, type ConcreteMode, type Question } from "../lib/question";
import { speak } from "../lib/speech";
import { CardsMode } from "../modes/CardsMode";
import { ChoiceMode } from "../modes/ChoiceMode";
import { FillMode } from "../modes/FillMode";
import { GrammarMode } from "../modes/GrammarMode";
import { MatchMode } from "../modes/MatchMode";
import { OrderMode } from "../modes/OrderMode";
import { SpellMode } from "../modes/SpellMode";
import { TypeMode } from "../modes/TypeMode";
import { isAnswerKey } from "../modes/keys";
import type { AnswerResult, ModeProps } from "../modes/types";

const MODES: Partial<Record<ConcreteMode, ComponentType<ModeProps>>> = {
  choice: ChoiceMode,
  type: TypeMode,
  spell: SpellMode,
  fill: FillMode,
  cards: CardsMode,
  match: MatchMode,
  grammar: GrammarMode,
  order: OrderMode,
};

interface Props { settings: Settings; onSettings: (p: Partial<Settings>) => void; rand?: Rand }

export function PracticePage({ settings, onSettings, rand = Math.random }: Props) {
  const progressRef = useRef(loadProgress());
  const recent = useRef(loadRecent(settings.deck, settings.level));   // last questions, kept through a refresh
  // Today's running count, kept through refreshes. `day` tells a tab left open past midnight to start over.
  const [session, setSession] = useState(() => ({ ...loadToday(), day: dayOf(Date.now()) }));
  const [answer, setAnswer] = useState<AnswerResult | null>(null);
  const answered = useRef<{ at: number } | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [qid, setQid] = useState(0);

  const pool = useMemo(() => poolFor(ITEMS, settings.deck, settings.level), [settings.deck, settings.level]);

  const makeQuestion = useCallback((): Question => {
    let mode: ConcreteMode = settings.mode === "mixed" ? pickMode(settings.deck, rand) : settings.mode;
    if (!availableModes(settings.deck).includes(mode) || !MODES[mode]) mode = "choice";
    const q = buildQuestion(mode, { pool, all: ITEMS, progress: progressRef.current, recent: recent.current, rand });
    recent.current = remember(recent.current, q.items.map(i => i.id));
    saveRecent(settings.deck, settings.level, recent.current);
    return q;
  }, [settings.mode, settings.deck, settings.level, pool, rand]);

  // Lazy initializer: runs once on mount, reading the progress/recent refs is intended here.
  // eslint-disable-next-line react-hooks/refs
  const [question, setQuestion] = useState<Question>(makeQuestion);

  const next = useCallback(() => {
    answered.current = null;
    setAnswer(null);
    setQuestion(makeQuestion());
    setQid(n => n + 1);
  }, [makeQuestion]);

  // Deck or level change: new pool, forget recent items. Mode change keeps the recent memory.
  const firstRun = useRef(true);
  useEffect(() => { if (!firstRun.current) recent.current = []; }, [settings.deck, settings.level]);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    next();
  }, [settings.deck, settings.level, settings.mode]); // eslint-disable-line react-hooks/exhaustive-deps

  const onAnswer = useCallback((r: AnswerResult) => {
    if (answered.current) return;                 // one answer per question, however fast the taps
    answered.current = { at: Date.now() };
    let p = progressRef.current;
    const now = Date.now();
    const day = dayOf(now);
    let { correct, total, streak } = day === session.day ? session : { correct: 0, total: 0, streak: 0 };
    for (const { item, correct: ok } of r.results) {
      total++;
      if (ok) { correct++; streak++; } else streak = 0;
      p = recordAnswer(p, item.id, ok, streak, Date.now());
    }
    progressRef.current = p;
    saveProgress(p);
    saveToday({ correct, total, streak }, now);
    setSession({ correct, total, streak, day });
    speak(r.speakText ?? r.results[0]?.item.reading ?? "", settings.sound);
    if (r.skipPanel) next(); else setAnswer(r);
  }, [session, settings.sound, next]);

  useEffect(() => {
    if (!answer) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && isAnswerKey(e) && answered.current && Date.now() - answered.current.at > 300) {
        e.preventDefault();
        next();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [answer, next]);

  // Không biết: give up on the question. Counts as wrong and shows the answer; Next is still a tap away.
  // Flashcards rate themselves and match rounds hold several words, so neither gets the button.
  const canGiveUp = !answer && question.mode !== "cards" && question.mode !== "match";
  const giveUp = useCallback(() => {
    const it = question.items[0];
    const ex = it.grammar?.examples[question.example ?? 0];
    onAnswer({ results: [{ item: it, correct: false }], speakText: ex ? fullSentence(ex) : undefined });
  }, [question, onAnswer]);

  useEffect(() => {
    if (!canGiveUp) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "0" && isAnswerKey(e)) giveUp(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [canGiveUp, giveUp]);

  const Mode = MODES[question.mode] ?? ChoiceMode;
  const label = MODE_LABELS[question.mode];
  const allRight = !!answer && answer.results.every(x => x.correct);

  return (
    <>
      <PageTitle>Luyện tập 練習</PageTitle>
      <SettingsSummary settings={settings} onOpen={() => setSheetOpen(true)} />
      <SettingsSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <SettingsControls settings={settings} onChange={onSettings} />
      </SettingsSheet>
      <div className="hidden sm:block"><SettingsControls settings={settings} onChange={onSettings} /></div>

      <section data-testid="question" className="mt-3 rounded-card border border-line bg-surface p-4 sm:p-6">
        <span data-testid="mode-tag" className="inline-block rounded-full bg-active px-2.5 py-0.5 text-xs text-muted">
          {settings.mode === "mixed" ? "Hỗn hợp · " : ""}{label.vi} · {label.ja}
        </span>
        <Mode key={qid} question={question} locked={!!answer} onAnswer={onAnswer} />
        {canGiveUp && (
          <div className="mt-4 flex justify-center">
            <button type="button" data-testid="idk-button" onClick={giveUp}
              className="flex min-h-11 items-center gap-2 rounded-control px-4 text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
              <span aria-hidden="true" className="hidden rounded border border-line px-1.5 text-xs [@media(pointer:fine)]:inline">0</span>
              Không biết · 分からない
            </button>
          </div>
        )}
      </section>

      {answer && (
        <AnswerPanel correct={allRight} onNext={next}>
          {answer.summary === "match"
            ? <MatchSummary results={answer.results} />
            : <Explanation item={answer.results[0].item} kanjiFirst={isKanjiFirst(question)} example={question.example} />}
        </AnswerPanel>
      )}
      <StatsLine correct={session.correct} total={session.total} streak={session.streak} />
    </>
  );
}
