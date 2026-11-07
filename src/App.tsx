import { TabBar } from "./components/TabBar";
import { TopBar } from "./components/TopBar";
import { useHashRoute } from "./lib/useHashRoute";
import { useSettings } from "./lib/useSettings";
import { GrammarPage } from "./pages/GrammarPage";
import { KanaPage } from "./pages/KanaPage";
import { PracticePage } from "./pages/PracticePage";
import { ProgressPage } from "./pages/ProgressPage";

export default function App() {
  const [route] = useHashRoute();
  const [settings, setSettings] = useSettings();
  return (
    <div className="min-h-dvh">
      <TopBar route={route} />
      <main className="mx-auto max-w-[720px] px-4 pb-[calc(56px+env(safe-area-inset-bottom)+var(--next-space,0px)+16px)] sm:px-6 sm:pb-10">
        {route === "practice" && <PracticePage settings={settings} onSettings={setSettings} />}
        {route === "grammar" && <GrammarPage />}
        {route === "progress" && <ProgressPage />}
        {route === "kana" && <KanaPage />}
      </main>
      <TabBar route={route} />
    </div>
  );
}
