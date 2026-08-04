import { describe, expect, test } from "bun:test";
import { districts } from "../../src/lookups/pre/districts";
import { EMPTY_ARRAY } from "../../src/utils/empty";
import { COUNTS, PRE_DISTRICT_BA_DINH } from "../fixtures";

describe("districts", () => {
  test("all returns the frozen pre-merger district list", () => {
    const all = districts.all();

    expect(all).toHaveLength(COUNTS.preDistricts);
    expect(all).toContainEqual(PRE_DISTRICT_BA_DINH);
    expect(all[0]?.province_code).toBe("01");
    expect(districts.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
    expect(Object.isFrozen(all[0])).toBe(true);
  });

  test("byProvinceCode returns frozen districts for a province", () => {
    const list = districts.byProvinceCode("01");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((district) => district.province_code === "01")).toBe(true);
    expect(list).toContainEqual(PRE_DISTRICT_BA_DINH);
    expect(districts.byProvinceCode("01")).toBe(list);
    expect(Object.isFrozen(list)).toBe(true);
  });

  test("byProvinceCode returns the shared empty array for unknown provinces", () => {
    const list = districts.byProvinceCode("00");

    expect(list).toBe(EMPTY_ARRAY);
    expect(list).toHaveLength(0);
    expect(districts.byProvinceCode("missing")).toBe(EMPTY_ARRAY);
  });

  test("byCode looks up a district", () => {
    const byCode = districts.byCode(PRE_DISTRICT_BA_DINH.code);

    expect(byCode).toEqual(PRE_DISTRICT_BA_DINH);
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("byCode returns undefined for unknown keys", () => {
    expect(districts.byCode("000")).toBeUndefined();
    expect(districts.byCode("")).toBeUndefined();
  });

  test("byCode and byProvinceCode trim surrounding whitespace", () => {
    expect(districts.byCode(`  ${PRE_DISTRICT_BA_DINH.code}  `)).toEqual(PRE_DISTRICT_BA_DINH);
    expect(districts.byProvinceCode("  01  ")).toContainEqual(PRE_DISTRICT_BA_DINH);
  });
});
