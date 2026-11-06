import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, useDraggable, useDroppable, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { useMemo, useRef, useState } from "react";
import type { Item } from "../data/types";
import { shuffle } from "../lib/picker";
import type { MatchField } from "../lib/question";
import type { ModeProps } from "./types";

const FIELD_NAME: Record<MatchField, string> = { meaning: "nghĩa", hanViet: "âm Hán Việt", reading: "cách đọc" };
const value = (it: Item, f: MatchField) => (f === "meaning" ? it.meaning : f === "hanViet" ? it.hanViet ?? "" : it.reading);

type CardState = "idle" | "selected" | "bad" | "done" | "late";

const cardClass = (state: CardState) =>
  state === "done" ? "border-positive bg-positive-bg text-positive"
  : state === "late" ? "border-late bg-late-bg text-late"
  : state === "bad" ? "border-negative bg-negative-bg text-negative"
  : state === "selected" ? "border-ink bg-surface scale-[1.02]"
  : "border-line bg-surface";

function LeftCard({ item, row, state, onTap }: { item: Item; row: number; state: CardState; onTap: () => void }) {
  const finished = state === "done" || state === "late";
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id, disabled: finished });
  return (
    <button ref={setNodeRef} type="button" data-testid="match-left" data-item={item.id} data-state={state}
      onClick={onTap} {...attributes} {...listeners}
      style={{ gridColumn: 1, gridRow: row, transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined, zIndex: isDragging ? 10 : undefined }}
      className={`flex min-h-14 touch-none items-center justify-center rounded-card border-2 px-2 py-2 font-jp text-2xl transition-colors ${cardClass(state)} ${isDragging ? "shadow-lg" : ""}`}>
      {item.prompt}
    </button>
  );
}

function RightCard({ item, row, text, jp, state, onTap }: { item: Item; row: number; text: string; jp: boolean; state: CardState; onTap: () => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: item.id, disabled: state === "done" || state === "late" });
  return (
    <button ref={setNodeRef} type="button" data-testid="match-right" data-item={item.id} data-state={state} onClick={onTap}
      style={{ gridColumn: 2, gridRow: row }}
      className={`flex min-h-14 items-center justify-center rounded-card border-2 px-2 py-2 text-center transition-[grid-row,background-color] ${jp ? "font-jp text-lg" : "text-sm"} ${cardClass(isOver && state === "idle" ? "selected" : state)}`}>
      {text}
    </button>
  );
}

export function MatchMode({ question, locked, onAnswer }: ModeProps) {
  const items = question.items;
  const field = question.matchField ?? "meaning";
  const deckName = items[0]?.deck === "kanji" ? "chữ kanji" : "từ";
  const leftRow = useMemo(() => new Map(items.map((it, i) => [it.id, i + 1])), [items]);
  const [rightRow, setRightRow] = useState(() => new Map(shuffle(items).map((it, i) => [it.id, i + 1])));
  const [done, setDone] = useState<Set<string>>(new Set());
  const [missed, setMissed] = useState<Set<string>>(new Set());
  const [bad, setBad] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<string | null>(null);
  const finished = useRef(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor),
  );

  const attempt = (leftId: string, rightId: string) => {
    if (locked || finished.current || done.has(leftId) || done.has(rightId)) return;
    setSelected(null);
    if (leftId !== rightId) {
      const nextMissed = new Set(missed).add(leftId);
      setMissed(nextMissed);
      const flash = new Set([`L:${leftId}`, `R:${rightId}`]);
      setBad(flash);
      setTimeout(() => setBad(b => (b === flash ? new Set() : b)), 450);
      return;
    }
    // Slide the matched answer into its kanji's row, swapping with whatever card sits there.
    setRightRow(prev => {
      const next = new Map(prev);
      const target = leftRow.get(leftId)!;
      const from = prev.get(rightId)!;
      const occupant = [...prev].find(([, r]) => r === target)?.[0];
      if (occupant) next.set(occupant, from);
      next.set(rightId, target);
      return next;
    });
    const nextDone = new Set(done).add(leftId);
    setDone(nextDone);
    if (nextDone.size === items.length) {
      finished.current = true;
      onAnswer({ results: items.map(item => ({ item, correct: !missed.has(item.id) })), summary: "match", speakText: items.map(i => i.reading).join("、") });
    }
  };

  const stateOf = (id: string, side: "L" | "R"): CardState =>
    done.has(id) ? (missed.has(id) ? "late" : "done") : bad.has(`${side}:${id}`) ? "bad" : side === "L" && selected === id ? "selected" : "idle";

  const onDragEnd = (e: DragEndEvent) => { if (e.over) attempt(String(e.active.id), String(e.over.id)); };

  return (
    <>
      <div className="mt-3 text-center text-lg font-semibold">Nối mỗi {deckName} với {FIELD_NAME[field]} của nó</div>
      <div className="mt-1 text-center text-sm text-muted">Bấm một ô bên trái rồi bấm ô tương ứng bên phải — hoặc kéo thả · 線で結ぼう</div>
      <DndContext sensors={sensors} onDragEnd={onDragEnd}>
        <div className="mx-auto mt-4 grid max-w-xl grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-8">
          {items.map(it => (
            <LeftCard key={it.id} item={it} row={leftRow.get(it.id)!} state={stateOf(it.id, "L")}
              onTap={() => !done.has(it.id) && setSelected(s => (s === it.id ? null : it.id))} />
          ))}
          {items.map(it => (
            <RightCard key={it.id} item={it} row={rightRow.get(it.id)!} text={value(it, field)} jp={field === "reading"}
              state={stateOf(it.id, "R")} onTap={() => selected && attempt(selected, it.id)} />
          ))}
        </div>
      </DndContext>
    </>
  );
}
