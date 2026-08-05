import { describe, expect, test } from "bun:test";
import { provinces } from "../../src/lookups/current/provinces";
import { provinces as preProvinces } from "../../src/lookups/pre/provinces";
import { COUNTS, PROVINCE_HN } from "../fixtures";

describe("provinces", () => {
  test("all returns the frozen province list", () => {
    const all = provinces.all();

    expect(all).toHaveLength(COUNTS.provinces);
    expect(all).toContainEqual(PROVINCE_HN);
    expect(provinces.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
    expect(Object.isFrozen(all[0])).toBe(true);
  });

  test("byCode looks up a province", () => {
    const byCode = provinces.byCode(PROVINCE_HN.code);

    expect(byCode).toEqual(PROVINCE_HN);
    expect(Object.isFrozen(byCode)).toBe(true);
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
    expect(Object.isFrozen(byWardCode)).toBe(true);
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

describe("pre provinces", () => {
  test("all returns the frozen pre-merger province list", () => {
    const all = preProvinces.all();

    expect(all).toHaveLength(COUNTS.preProvinces);
    expect(all.length).toBeGreaterThan(COUNTS.provinces);
    expect(all).toContainEqual(
      expect.objectContaining({
        code: "01",
        name: "Hà Nội",
        type: "Thành phố",
      }),
    );
    expect(preProvinces.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
  });

  test("byCode looks up a pre-merger province", () => {
    const byCode = preProvinces.byCode("01");

    expect(byCode).toEqual({
      code: "01",
      name: "Hà Nội",
      type: "Thành phố",
    });
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("byCode returns undefined for unknown keys", () => {
    expect(preProvinces.byCode("00")).toBeUndefined();
  });

  test("byDistrictCode resolves the parent province", () => {
    const byDistrictCode = preProvinces.byDistrictCode("001");

    expect(byDistrictCode).toEqual({
      code: "01",
      name: "Hà Nội",
      type: "Thành phố",
    });
    expect(Object.isFrozen(byDistrictCode)).toBe(true);
    expect(preProvinces.byDistrictCode("001")).toBe(preProvinces.byCode("01"));
  });

  test("byDistrictCode returns undefined for unknown district codes", () => {
    expect(preProvinces.byDistrictCode("000")).toBeUndefined();
    expect(preProvinces.byDistrictCode("")).toBeUndefined();
  });

  test("byWardCode resolves the parent province", () => {
    const byWardCode = preProvinces.byWardCode("00007");

    expect(byWardCode).toEqual({
      code: "01",
      name: "Hà Nội",
      type: "Thành phố",
    });
    expect(Object.isFrozen(byWardCode)).toBe(true);
    expect(preProvinces.byWardCode("00007")).toBe(preProvinces.byCode("01"));
  });

  test("byWardCode returns undefined for unknown ward codes", () => {
    expect(preProvinces.byWardCode("99999")).toBeUndefined();
  });
});
