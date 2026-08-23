import { describe, expect, test } from "bun:test";
import { provinces } from "../../../src/lookups/current/provinces";
import { COUNTS, PROVINCE_HN } from "../../fixtures";

describe("provinces", () => {
  test("all returns a copy of the province list", () => {
    const all = provinces.all();

    expect(all).toHaveLength(COUNTS.provinces);
    expect(all).toContainEqual(PROVINCE_HN);
    expect(provinces.all()).not.toBe(all);
    expect(provinces.all()).toEqual(all);
    all.pop();
    expect(provinces.all()).toHaveLength(COUNTS.provinces);
  });

  test("byCode looks up a province", () => {
    const byCode = provinces.byCode(PROVINCE_HN.code);

    expect(byCode).toEqual(PROVINCE_HN);
  });

  test("byCode returns undefined for unknown keys", () => {
    expect(provinces.byCode("00")).toBeUndefined();
    expect(provinces.byCode("")).toBeUndefined();
  });

  test("byCode trims surrounding whitespace", () => {
    expect(provinces.byCode(`  ${PROVINCE_HN.code}  `)).toEqual(PROVINCE_HN);
  });

  test("byWardCode resolves the parent province", () => {
    const byWardCode = provinces.byWardCode("00004");

    expect(byWardCode).toEqual(PROVINCE_HN);
    expect(provinces.byWardCode("00004")).toBe(provinces.byCode("01"));
  });

  test("byWardCode returns undefined for unknown ward codes", () => {
    expect(provinces.byWardCode("99999")).toBeUndefined();
    expect(provinces.byWardCode("")).toBeUndefined();
  });

  test("byWardCode trims surrounding whitespace", () => {
    expect(provinces.byWardCode("  00004  ")).toEqual(PROVINCE_HN);
  });
});

describe("provinces.search", () => {
  test("matches accent-insensitive substrings", () => {
    const results = provinces.search("ha no");

    expect(results.some((province) => province.code === "01")).toBe(true);
    expect(provinces.search("HA NOI")).toEqual(provinces.search("ha noi"));
  });

  test("matches queries with spaces removed (hanoi ↔ Hà Nội)", () => {
    expect(provinces.search("hanoi").some((province) => province.code === "01")).toBe(true);
    expect(provinces.search("hochiminh").some((province) => province.code === "79")).toBe(true);
  });

  test("returns empty array for blank queries", () => {
    expect(provinces.search("")).toEqual([]);
    expect(provinces.search("   ")).toEqual([]);
  });

  test("returns copied results for each call", () => {
    const results = provinces.search("ha noi");

    expect(provinces.search("ha noi")).not.toBe(results);
    expect(provinces.search("ha noi")).toEqual(results);
    const lengthBefore = results.length;
    results.pop();
    expect(provinces.search("ha noi")).toHaveLength(lengthBefore);

    expect(provinces.search("")).toEqual([]);
    expect(provinces.search("   ")).toEqual([]);
  });
});
