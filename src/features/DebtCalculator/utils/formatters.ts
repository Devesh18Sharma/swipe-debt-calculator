/** Compact currency format: $10k, $1.2M */
export function formatCompact(value: number): string {
  if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(value >= 1e4 ? 0 : 1)}k`;
  }
  return `$${Math.round(value).toLocaleString()}`;
}

/** Full currency format: $8,000 */
export function formatFull(value: number): string {
  return `$${Math.round(value).toLocaleString()}`;
}

/** Generate a random short ID */
export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}
