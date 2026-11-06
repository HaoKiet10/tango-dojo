import type { Route } from "../lib/useHashRoute";
import { NAV } from "./nav";
import { SealMark } from "./SealMark";

export function TopBar({ route }: { route: Route }) {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-ground">
      <div className="mx-auto flex h-12 max-w-[720px] items-center justify-between px-4 sm:px-6">
        <a href="#/practice" className="flex items-center gap-2 text-ink no-underline">
          <SealMark />
          <span className="text-base font-semibold">Tango Dojo</span>
        </a>
        <nav aria-label="Điều hướng" className="hidden items-center gap-1 sm:flex">
          {NAV.map(n => (
            <a key={n.route} href={`#/${n.route}`} aria-current={route === n.route ? "page" : undefined}
              className={`rounded-[6px] px-3 py-1.5 text-sm no-underline ${route === n.route ? "bg-active text-ink" : "text-muted hover:text-ink"}`}>
              {n.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
