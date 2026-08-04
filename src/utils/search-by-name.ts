import { deepFreeze } from "./deep-freeze";
import { EMPTY_ARRAY } from "./empty";
import { normalizeVietnamese } from "./normalize-vietnamese";

export type NameSearchEntry<T> = {
  item: T;
  key: string;
  compactKey: string;
};

export function buildNameSearchIndex<T extends { name: string }>(items: readonly T[]): NameSearchEntry<T>[] {
  return items.map((item) => {
    const key = normalizeVietnamese(item.name);
    return {
      item,
      key,
      compactKey: key.replace(/ /g, ""),
    };
  });
}

export function searchByName<T>(
  index: readonly NameSearchEntry<T>[],
  query: string,
  predicate?: (item: T) => boolean,
): readonly T[] {
  const needle = normalizeVietnamese(query);
  if (!needle) {
    return EMPTY_ARRAY;
  }

  const compactNeedle = needle.replace(/ /g, "");
  const matches: T[] = [];

  for (const entry of index) {
    const hit = entry.key.includes(needle) || entry.compactKey.includes(compactNeedle);
    if (!hit) {
      continue;
    }
    if (predicate && !predicate(entry.item)) {
      continue;
    }
    matches.push(entry.item);
  }
  return matches.length === 0 ? EMPTY_ARRAY : deepFreeze(matches);
}
