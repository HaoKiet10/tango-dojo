import type { Route } from "../lib/useHashRoute";

export const NAV: { route: Route; label: string; title: string }[] = [
  { route: "practice", label: "Luyện tập", title: "Luyện tập 練習" },
  { route: "progress", label: "Tiến độ", title: "Tiến độ 進捗" },
  { route: "kana", label: "Kana", title: "Luyện Kana かな" },
];

/** 20px outline icons, 1.5px stroke. */
export function NavIcon({ route }: { route: Route }) {
  const common = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
    strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (route === "practice")
    return <svg {...common}><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>;
  if (route === "progress")
    return <svg {...common}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
  return <svg {...common}><path d="M5 7h9M9.5 4v3M7 7c0 5 4 9 9 10M13 7c-1 5-5 9-8 10" /><path d="M15 21l3-8 3 8M16 18h4" /></svg>;
}
