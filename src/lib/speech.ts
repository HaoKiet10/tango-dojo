/** Read Japanese text aloud. Silently does nothing when muted or when the browser has no speech. */
export function speak(text: string, enabled: boolean): void {
  if (!enabled) return;
  const synth = (globalThis as { speechSynthesis?: SpeechSynthesis }).speechSynthesis;
  if (!synth || typeof SpeechSynthesisUtterance === "undefined") return;
  try {
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "ja-JP";
    u.rate = 0.85;
    const voice = synth.getVoices().find(v => v.lang.startsWith("ja"));
    if (voice) u.voice = voice;
    synth.speak(u);
  } catch { /* some browsers throw while voices load; sound is optional */ }
}
