import { describe, expect, test } from "bun:test";
import { wards } from "../../src/lookups/current/wards";
import { wards as preWards } from "../../src/lookups/pre/wards";
import { COUNTS, PRE_WARD_CONG_VI, WARD_BA_DINH } from "../fixtures";

describe("wards", () => {
  test("all returns a copy of the ward list", () => {
    const all = wards.all();

    expect(all).toHaveLength(COUNTS.wards);
    expect(all).toContainEqual(WARD_BA_DINH);
    expect(wards.all()).not.toBe(all);
    expect(wards.all()).toEqual(all);
    all.pop();
    expect(wards.all()).toHaveLength(COUNTS.wards);
  });

  test("byProvinceCode returns a copy of wards for a province", () => {
    const list = wards.byProvinceCode("01");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((ward) => ward.province_code === "01")).toBe(true);
    expect(list).toContainEqual(WARD_BA_DINH);
    expect(wards.byProvinceCode("01")).not.toBe(list);
    expect(wards.byProvinceCode("01")).toEqual(list);
    list.pop();
    expect(wards.byProvinceCode("01").length).toBeGreaterThan(list.length);
  });

  test("byProvinceCode returns an empty array for unknown provinces", () => {
    expect(wards.byProvinceCode("00")).toEqual([]);
    expect(wards.byProvinceCode("missing")).toEqual([]);
  });

  test("byCode looks up a ward", () => {
    const byCode = wards.byCode(WARD_BA_DINH.code);

    expect(byCode).toEqual(WARD_BA_DINH);
  });

  test("byCode returns undefined for unknown keys", () => {
    expect(wards.byCode("99999")).toBeUndefined();
    expect(wards.byCode("")).toBeUndefined();
  });

  test("byCode and byProvinceCode trim surrounding whitespace", () => {
    expect(wards.byCode(`  ${WARD_BA_DINH.code}  `)).toEqual(WARD_BA_DINH);
    expect(wards.byProvinceCode("  01  ")).toContainEqual(WARD_BA_DINH);
  });
});

describe("pre wards", () => {
  test("all returns a copy of the pre-merger ward list", () => {
    const all = preWards.all();

    expect(all).toHaveLength(COUNTS.preWards);
    expect(all.length).toBeGreaterThan(COUNTS.wards);
    expect(all).toContainEqual(PRE_WARD_CONG_VI);
    expect(preWards.all()).not.toBe(all);
    expect(preWards.all()).toEqual(all);
  });

  test("byDistrictCode returns a copy of wards for a district", () => {
    const list = preWards.byDistrictCode("001");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((ward) => ward.district_code === "001")).toBe(true);
    expect(list).toContainEqual(PRE_WARD_CONG_VI);
    expect(preWards.byDistrictCode("001")).not.toBe(list);
    expect(preWards.byDistrictCode("001")).toEqual(list);
  });

  test("byDistrictCode returns an empty array for unknown districts", () => {
    expect(preWards.byDistrictCode("000")).toEqual([]);
    expect(preWards.byDistrictCode("missing")).toEqual([]);
  });

  test("byCode looks up a pre-merger ward", () => {
    const byCode = preWards.byCode(PRE_WARD_CONG_VI.code);

    expect(byCode).toEqual(PRE_WARD_CONG_VI);
  });

  test("byCode returns undefined for unknown keys", () => {
    expect(preWards.byCode("99999")).toBeUndefined();
  });

  test("byCode and byDistrictCode trim surrounding whitespace", () => {
    expect(preWards.byCode(`  ${PRE_WARD_CONG_VI.code}  `)).toEqual(PRE_WARD_CONG_VI);
    expect(preWards.byDistrictCode("  001  ")).toContainEqual(PRE_WARD_CONG_VI);
  });
});
