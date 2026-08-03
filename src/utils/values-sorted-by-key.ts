/** Flatten record values in lexicographic key order (avoids Object.values integer-index quirks). */
export function valuesSortedByKey<T>(record: Record<string, T[]>): T[] {
  return Object.keys(record)
    .sort()
    .flatMap((key) => record[key] ?? []);
}
