/**
 * Fisher–Yates shuffle: every order is equally likely (unlike sort(() => Math.random() - 0.5)).
 * Returns a new array; `random` can be replaced in tests.
 */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}
