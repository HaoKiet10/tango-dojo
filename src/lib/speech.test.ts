import { speak } from "./speech";

class FakeUtterance { lang = ""; rate = 1; voice: unknown = null; constructor(public text: string) {} }

function installFake(voices: { lang: string }[] = []) {
  const spoken: FakeUtterance[] = [];
  const synth = { cancel: vi.fn(), speak: vi.fn((u: FakeUtterance) => spoken.push(u)), getVoices: () => voices };
  vi.stubGlobal("speechSynthesis", synth);
  vi.stubGlobal("SpeechSynthesisUtterance", FakeUtterance);
  return { synth, spoken };
}

afterEach(() => vi.unstubAllGlobals());

test("speak is a no-op without speechSynthesis", () => {
  vi.stubGlobal("speechSynthesis", undefined);
  expect(() => speak("かいしゃ", true)).not.toThrow();
});

test("speak does nothing when disabled", () => {
  const { synth } = installFake();
  speak("かいしゃ", false);
  expect(synth.speak).not.toHaveBeenCalled();
});

test("speak sets ja-JP and uses a Japanese voice when there is one", () => {
  const ja = { lang: "ja-JP" };
  const { spoken } = installFake([{ lang: "en-US" }, ja]);
  speak("かいしゃ", true);
  expect(spoken[0].lang).toBe("ja-JP");
  expect(spoken[0].rate).toBe(0.85);
  expect(spoken[0].voice).toBe(ja);
});
