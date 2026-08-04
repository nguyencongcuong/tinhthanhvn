import { normalizeVietnamese } from "./normalize-vietnamese";

export type NameSearchEntry<T> = {
  item: T;
  key: string;
};

export function buildNameSearchIndex<T extends { name: string }>(items: readonly T[]): NameSearchEntry<T>[] {
  return items.map((item) => ({
    item,
    key: normalizeVietnamese(item.name),
  }));
}

export function searchByName<T>(
  index: readonly NameSearchEntry<T>[],
  query: string,
  predicate?: (item: T) => boolean,
): T[] {
  const needle = normalizeVietnamese(query);
  if (!needle) {
    return [];
  }

  const matches: T[] = [];
  for (const entry of index) {
    if (!entry.key.includes(needle)) {
      continue;
    }
    if (predicate && !predicate(entry.item)) {
      continue;
    }
    matches.push(entry.item);
  }
  return matches;
}
