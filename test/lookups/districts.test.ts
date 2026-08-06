import { describe, expect, test } from "bun:test";
import { districts } from "../../src/lookups/pre/districts";
import { COUNTS, PRE_DISTRICT_BA_DINH } from "../fixtures";

describe("districts", () => {
  test("all returns a copy of the pre-merger district list", () => {
    const all = districts.all();

    expect(all).toHaveLength(COUNTS.preDistricts);
    expect(all).toContainEqual(PRE_DISTRICT_BA_DINH);
    expect(all[0]?.province_code).toBe("01");
    expect(districts.all()).not.toBe(all);
    expect(districts.all()).toEqual(all);
    all.pop();
    expect(districts.all()).toHaveLength(COUNTS.preDistricts);
  });

  test("byProvinceCode returns a copy of districts for a province", () => {
    const list = districts.byProvinceCode("01");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((district) => district.province_code === "01")).toBe(true);
    expect(list).toContainEqual(PRE_DISTRICT_BA_DINH);
    expect(districts.byProvinceCode("01")).not.toBe(list);
    expect(districts.byProvinceCode("01")).toEqual(list);
  });

  test("byProvinceCode returns an empty array for unknown provinces", () => {
    const list = districts.byProvinceCode("00");

    expect(list).toEqual([]);
    expect(list).toHaveLength(0);
    expect(districts.byProvinceCode("missing")).toEqual([]);
  });

  test("byCode looks up a district", () => {
    const byCode = districts.byCode(PRE_DISTRICT_BA_DINH.code);

    expect(byCode).toEqual(PRE_DISTRICT_BA_DINH);
  });

  test("byCode returns undefined for unknown keys", () => {
    expect(districts.byCode("000")).toBeUndefined();
    expect(districts.byCode("")).toBeUndefined();
  });

  test("byCode and byProvinceCode trim surrounding whitespace", () => {
    expect(districts.byCode(`  ${PRE_DISTRICT_BA_DINH.code}  `)).toEqual(PRE_DISTRICT_BA_DINH);
    expect(districts.byProvinceCode("  01  ")).toContainEqual(PRE_DISTRICT_BA_DINH);
  });

  test("byWardCode resolves the parent district", () => {
    const byWardCode = districts.byWardCode("00007");

    expect(byWardCode).toEqual(PRE_DISTRICT_BA_DINH);
    expect(districts.byWardCode("00007")).toBe(districts.byCode("001"));
  });

  test("byWardCode returns undefined for unknown ward codes", () => {
    expect(districts.byWardCode("99999")).toBeUndefined();
    expect(districts.byWardCode("")).toBeUndefined();
  });

  test("byWardCode trims surrounding whitespace", () => {
    expect(districts.byWardCode("  00007  ")).toEqual(PRE_DISTRICT_BA_DINH);
  });
});
