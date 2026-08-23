import { describe, expect, test } from "bun:test";
import { buildNameSearchIndex, optionalScopeCode, searchByName } from "../../src/utils/search-by-name";

type NamedRegion = {
  name: string;
  region: string;
};

const BA_DINH: NamedRegion = { name: "Ba Đình", region: "north" };
const CAU_GIAY: NamedRegion = { name: "Cầu Giấy", region: "north" };
const HOA_BINH: NamedRegion = { name: "Hòa Bình", region: "south" };

const ITEMS: readonly NamedRegion[] = [BA_DINH, CAU_GIAY, HOA_BINH];

describe("optionalScopeCode", () => {
  test("returns undefined for undefined input", () => {
    expect(optionalScopeCode(undefined)).toBeUndefined();
  });

  test("returns undefined for blank input", () => {
    expect(optionalScopeCode("")).toBeUndefined();
    expect(optionalScopeCode("   ")).toBeUndefined();
  });

  test("returns the trimmed value for non-blank input", () => {
    expect(optionalScopeCode("01")).toBe("01");
    expect(optionalScopeCode("  01  ")).toBe("01");
  });
});

describe("buildNameSearchIndex", () => {
  test("builds one entry per item, preserving item reference and order", () => {
    const index = buildNameSearchIndex(ITEMS);

    expect(index).toHaveLength(ITEMS.length);
    expect(index.map((entry) => entry.item)).toEqual([BA_DINH, CAU_GIAY, HOA_BINH]);

    const [first] = index;
    expect(first?.item).toBe(BA_DINH);
  });

  test("normalizes the name into key and compactKey", () => {
    const [entry] = buildNameSearchIndex([BA_DINH]);

    expect(entry).toBeDefined();
    expect(entry?.key).toBe("ba dinh");
    expect(entry?.compactKey).toBe("badinh");
  });
});

describe("searchByName", () => {
  const index = buildNameSearchIndex(ITEMS);

  test("matches accent- and case-insensitive substrings", () => {
    expect(searchByName(index, "ba dinh")).toEqual([BA_DINH]);
    expect(searchByName(index, "BA DINH")).toEqual([BA_DINH]);
  });

  test("matches queries with spaces removed", () => {
    expect(searchByName(index, "badinh")).toEqual([BA_DINH]);
  });

  test("returns empty array for blank queries", () => {
    expect(searchByName(index, "")).toEqual([]);
    expect(searchByName(index, "   ")).toEqual([]);
  });

  test("returns empty array when nothing matches", () => {
    expect(searchByName(index, "khong ton tai")).toEqual([]);
  });

  test("applies the optional predicate as an additional filter", () => {
    const results = searchByName(index, "binh", (item) => item.region === "south");

    expect(results).toEqual([HOA_BINH]);
    expect(searchByName(index, "binh", (item) => item.region === "east")).toEqual([]);
  });

  test("returns a fresh array for each call", () => {
    const first = searchByName(index, "ba dinh");
    const second = searchByName(index, "ba dinh");

    expect(second).not.toBe(first);
    expect(second).toEqual(first);
  });
});
