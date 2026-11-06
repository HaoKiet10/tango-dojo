export function StatsLine({ correct, total, streak }: { correct: number; total: number; streak: number }) {
  const pct = total ? Math.round((correct / total) * 100) + "%" : "–";
  return (
    <p data-testid="stats-line" className="num m-0 mt-3 text-center text-sm text-muted">
      {correct} đúng · {pct} · chuỗi {streak}
    </p>
  );
}
