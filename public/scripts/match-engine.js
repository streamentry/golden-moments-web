/**
 * Small, framework-free state machine for the website's two-pair illustration.
 * No timers, telemetry, audio, scores, storage, or network requests.
 */
export function makeBoard(kinds) {
  if (!Array.isArray(kinds) || kinds.length !== 4) {
    throw new TypeError('The preview requires exactly four picture cards.');
  }
  const occurrences = new Map();
  for (const kind of kinds) occurrences.set(kind, (occurrences.get(kind) ?? 0) + 1);
  if (occurrences.size !== 2 || [...occurrences.values()].some(count => count !== 2)) {
    throw new TypeError('The preview must contain exactly two matching pairs.');
  }

  let chosen = [];
  const matched = new Set();

  return {
    snapshot() {
      return {
        chosen: [...chosen],
        matched: [...matched],
        complete: matched.size === kinds.length
      };
    },
    tap(index) {
      if (!Number.isInteger(index) || index < 0 || index >= kinds.length || matched.has(index)) {
        return 'ignored';
      }

      // A mismatch remains selected until the person deliberately taps again.
      if (chosen.length === 2) chosen = [];
      if (chosen.length === 0) {
        chosen = [index];
        return 'first';
      }
      if (chosen[0] === index) return 'ignored';

      chosen.push(index);
      if (kinds[chosen[0]] !== kinds[chosen[1]]) return 'different';

      matched.add(chosen[0]);
      matched.add(chosen[1]);
      chosen = [];
      return matched.size === kinds.length ? 'complete' : 'pair';
    },
    reset() {
      chosen = [];
      matched.clear();
      return 'reset';
    }
  };
}
