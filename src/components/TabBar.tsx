import type { Route } from "../lib/useHashRoute";
import { NAV, NavIcon } from "./nav";

/** Phone-only bottom tab bar (hidden from 640px, where the links sit in the top bar). */
export function TabBar({ route }: { route: Route }) {
  return (
    <nav aria-label="Thanh tab"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-surface pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="grid h-14 grid-cols-3">
        {NAV.map(n => {
          const on = route === n.route;
          return (
            <a key={n.route} href={`#/${n.route}`} aria-current={on ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 border-t-2 text-xs no-underline ${on ? "border-ink text-ink" : "border-transparent text-muted"}`}>
              <NavIcon route={n.route} />
              {n.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
