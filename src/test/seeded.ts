/** Deterministic random numbers for tests (a small LCG). */
export function seeded(seed: number): () => number {
  let s = (seed * 2654435761 + 1) >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; };
}
