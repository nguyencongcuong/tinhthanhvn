/** Lowercase, strip Vietnamese diacritics, collapse whitespace. Does not mutate source names. */
export function normalizeVietnamese(input: string): string {
  return input.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase().replace(/\s+/g, " ").trim();
}
