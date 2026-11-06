import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnswerPanel } from "../components/AnswerPanel";
import { PageTitle } from "../components/PageTitle";
import { Segmented } from "../components/Segmented";
import { StatsLine } from "../components/StatsLine";
import { KANA_BASIC, KANA_DAKUTEN, KANA_YOON, toKata, type KanaCell } from "../data/kana";
import { shuffle, type Rand } from "../lib/picker";
import { loadSettings } from "../lib/progress";
import { speak } from "../lib/speech";
import { OptionList } from "../modes/OptionList";

type Script = "h" | "k" | "hk";
type SetName = "basic" | "dakuten" | "yoon";
type Answer = "type" | "choice";
interface KanaStore { miss: Record<string, number>; seen: Record<string, number>; best: number }
interface Card { kana: string; readings: string[] }

const KEY = "tango-dojo:kana";
const SETS: Record<SetName, KanaCell[]> = { basic: KANA_BASIC, dakuten: KANA_DAKUTEN, yoon: KANA_YOON };
const SET_LABELS: Record<SetName, string> = { basic: "Cơ bản", dakuten: "が・ぱ", yoon: "きゃ" };

function loadStore(): KanaStore {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (d && typeof d === "object") return { miss: d.miss ?? {}, seen: d.seen ?? {}, best: d.best ?? 0 };
  } catch { /* corrupt or blocked: start fresh */ }
  return { miss: {}, seen: {}, best: 0 };
}
function saveStore(s: KanaStore) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* keep working unsaved */ } }

function buildPool(script: Script, sets: SetName[]): Card[] {
  const out: Card[] = [];
  for (const name of sets) for (const cell of SETS[name]) {
    if (!cell) continue;
    const [h, ...readings] = cell;
    if (script.includes("h")) out.push({ kana: h, readings });
    if (script.includes("k")) out.push({ kana: toKata(h), readings });
  }
  return out;
}

export function KanaPage({ rand = Math.random }: { rand?: Rand }) {
  const [view, setView] = useState<"quiz" | "chart">("quiz");
  return (
    <>
      <PageTitle>Luyện Kana かな</PageTitle>
      <Segmented label="Chế độ" value={view} onChange={setView}
        options={[{ value: "quiz", text: "Kiểm tra テスト" }, { value: "chart", text: "Bảng chữ 五十音表" }]} />
      <div className="mt-3">{view === "quiz" ? <KanaQuiz rand={rand} /> : <KanaChart />}</div>
    </>
  );
}

function KanaQuiz({ rand }: { rand: Rand }) {
  const [script, setScript] = useState<Script>("h");
  const [sets, setSets] = useState<SetName[]>(["basic"]);
  const [answerType, setAnswerType] = useState<Answer>("type");
  const [store, setStore] = useState(loadStore);
  const storeRef = useRef(store);
  const last = useRef<string | null>(null);
  const pool = useMemo(() => buildPool(script, sets), [script, sets]);

  const pick = useCallback((): Card => {
    const s = storeRef.current;
    const candidates = pool.length > 1 ? pool.filter(c => c.kana !== last.current) : pool;
    const ws = candidates.map(c => 1 + (3 * (s.miss[c.kana] ?? 0)) / ((s.seen[c.kana] ?? 0) + 1));
    let t = rand() * ws.reduce((a, b) => a + b, 0);
    let k = 0;
    for (; k < candidates.length - 1; k++) { t -= ws[k]; if (t <= 0) break; }
    last.current = candidates[k].kana;
    return candidates[k];
  }, [pool, rand]);

  const [card, setCard] = useState<Card>(pick);
  const [qid, setQid] = useState(0);
  const [result, setResult] = useState<{ correct: boolean; picked?: string } | null>(null);
  const [value, setValue] = useState("");
  const [session, setSession] = useState({ correct: 0, total: 0, streak: 0 });

  const options = useMemo(() => {
    const others = [...new Set(pool.map(c => c.readings[0]))].filter(r => r !== card.readings[0]);
    return shuffle([card.readings[0], ...shuffle(others, rand).slice(0, 3)], rand);
  }, [card, pool, rand]);

  const next = useCallback(() => { setResult(null); setValue(""); setCard(pick()); setQid(n => n + 1); }, [pick]);

  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    next();
  }, [script, sets, answerType]); // eslint-disable-line react-hooks/exhaustive-deps

  const answer = (raw: string, picked?: string) => {
    if (result) return;
    const typed = raw.trim().toLowerCase();
    if (!typed) return;
    const correct = card.readings.includes(typed);
    const streak = correct ? session.streak + 1 : 0;
    const s: KanaStore = {
      miss: correct ? store.miss : { ...store.miss, [card.kana]: (store.miss[card.kana] ?? 0) + 1 },
      seen: { ...store.seen, [card.kana]: (store.seen[card.kana] ?? 0) + 1 },
      best: Math.max(store.best, streak),
    };
    storeRef.current = s;
    setStore(s);
    saveStore(s);
    setSession({ correct: session.correct + (correct ? 1 : 0), total: session.total + 1, streak });
    setResult({ correct, picked });
    speak(card.kana, loadSettings().sound);
  };

  const toggleSet = (name: SetName) =>
    setSets(prev => (prev.includes(name) ? (prev.length > 1 ? prev.filter(x => x !== name) : prev) : [...prev, name]));

  const weak = Object.entries(store.miss).sort((a, b) => b[1] - a[1]).slice(0, 12);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <Segmented label="Bảng chữ" value={script} onChange={setScript}
          options={[{ value: "h", text: "Hiragana" }, { value: "k", text: "Katakana" }, { value: "hk", text: "Cả hai" }]} />
        <div role="group" aria-label="Nhóm chữ" className="flex gap-1 rounded-card border border-line bg-surface p-1">
          {(Object.keys(SETS) as SetName[]).map(n => (
            <button key={n} type="button" aria-pressed={sets.includes(n)} onClick={() => toggleSet(n)}
              className={`min-h-9 rounded-control px-3 text-sm ${sets.includes(n) ? "bg-active font-semibold text-ink" : "text-muted"}`}>
              {SET_LABELS[n]}
            </button>
          ))}
        </div>
        <Segmented label="Cách trả lời" value={answerType} onChange={setAnswerType}
          options={[{ value: "type", text: "Gõ romaji" }, { value: "choice", text: "Trắc nghiệm" }]} />
      </div>

      <section data-testid="question" className="mt-3 rounded-card border border-line bg-surface p-4 sm:p-6">
        <button type="button" data-testid="kana-prompt" onClick={() => speak(card.kana, loadSettings().sound)}
          className="mx-auto block font-jp text-[clamp(72px,28vw,120px)] leading-[1.1]" aria-label={undefined}>
          {card.kana}
        </button>
        <div className="mt-1 text-center text-sm text-muted">
          {answerType === "type" ? "Gõ cách đọc rồi nhấn Enter · bấm vào chữ để nghe" : "Chọn cách đọc đúng · bấm vào chữ để nghe"}
        </div>
        {answerType === "type" ? (
          <form key={qid} className="mx-auto mt-5 flex max-w-sm gap-2" onSubmit={e => { e.preventDefault(); answer(value); }}>
            <input data-testid="kana-input" value={value} onChange={e => setValue(e.target.value)} disabled={!!result}
              autoFocus aria-label="Romaji" placeholder="romaji" autoComplete="off" autoCapitalize="off" autoCorrect="off"
              spellCheck={false} enterKeyHint="done"
              className="min-h-12 min-w-0 flex-1 rounded-control border-2 border-line bg-surface px-3 text-center text-lg outline-none focus:border-ink" />
            <button type="submit" disabled={!!result} className="min-h-12 rounded-control bg-primary px-4 font-semibold text-on-primary disabled:opacity-50">
              Kiểm tra
            </button>
          </form>
        ) : (
          <OptionList key={qid} options={options} answer={card.readings[0]} picked={result?.picked ?? null} jp={false}
            onPick={o => answer(o, o)} />
        )}
      </section>

      {result && (
        <AnswerPanel correct={result.correct} onNext={next}>
          <p data-testid="kana-answer" className="m-0 font-jp text-2xl">{card.kana} = {card.readings[0]}</p>
        </AnswerPanel>
      )}
      <StatsLine {...session} />

      <h2 className="mb-2 mt-6 text-base font-semibold">Chữ hay sai nhất (sẽ xuất hiện nhiều hơn)</h2>
      <div data-testid="kana-weak" className="flex flex-wrap gap-2">
        {weak.length === 0 ? <span className="text-sm text-muted">Chưa có — cố lên!</span>
          : weak.map(([k, n]) => (
            <span key={k} className="rounded-full border border-line bg-surface px-3 py-1 font-jp">
              {k}<small className="num ml-1 text-negative">×{n}</small>
            </span>
          ))}
      </div>
    </>
  );
}

function KanaChart() {
  const [kata, setKata] = useState<"h" | "k">("h");
  const block = (title: string, cells: KanaCell[], cols: string) => (
    <>
      <h2 className="mb-2 mt-4 text-base font-semibold">{title}</h2>
      <div className={`grid gap-1.5 ${cols}`}>
        {cells.map((c, i) => {
          if (!c) return <div key={i} aria-hidden="true" />;
          const k = kata === "k" ? toKata(c[0]) : c[0];
          return (
            <button key={i} type="button" data-testid="kana-cell" onClick={() => speak(k, loadSettings().sound)}
              className="min-h-14 rounded-card border border-line bg-surface py-2 text-center active:scale-95">
              <span className="block font-jp text-2xl">{k}</span>
              <span className="block text-xs text-muted">{c[1]}</span>
            </button>
          );
        })}
      </div>
    </>
  );
  return (
    <>
      <Segmented label="Bảng" value={kata} onChange={setKata}
        options={[{ value: "h", text: "Hiragana" }, { value: "k", text: "Katakana" }]} />
      <p className="m-0 mt-2 text-sm text-muted">Bấm vào chữ bất kỳ để nghe phát âm.</p>
      {block("Cơ bản", KANA_BASIC, "grid-cols-5")}
      {block("Âm đục & bán đục (dakuten)", KANA_DAKUTEN, "grid-cols-5")}
      {block("Âm ghép (yōon)", KANA_YOON, "grid-cols-3")}
    </>
  );
}
