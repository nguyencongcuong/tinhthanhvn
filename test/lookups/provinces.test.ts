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
});
