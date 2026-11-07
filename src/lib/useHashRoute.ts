import { useCallback, useEffect, useState } from "react";

export type Route = "practice" | "grammar" | "progress" | "kana";
const ROUTES: readonly Route[] = ["practice", "grammar", "progress", "kana"];

const parse = (hash: string): Route => {
  const r = hash.replace(/^#\/?/, "") as Route;
  return ROUTES.includes(r) ? r : "practice";
};

export function useHashRoute(): [Route, (r: Route) => void] {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));
  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  const go = useCallback((r: Route) => { window.location.hash = "#/" + r; setRoute(r); }, []);
  return [route, go];
}
