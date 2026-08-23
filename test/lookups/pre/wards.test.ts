import { describe, expect, test } from "bun:test";
import { wards as preWards } from "../../../src/lookups/pre/wards";
import { COUNTS, PRE_WARD_CONG_VI } from "../../fixtures";

describe("pre wards", () => {
  test("all returns a copy of the pre-merger ward list", () => {
    const all = preWards.all();

    expect(all).toHaveLength(COUNTS.preWards);
    expect(all.length).toBeGreaterThan(COUNTS.wards);
    expect(all).toContainEqual(PRE_WARD_CONG_VI);
    expect(preWards.all()).not.toBe(all);
    expect(preWards.all()).toEqual(all);
  });

  test("byProvinceCode returns a copy of wards for a province", () => {
    const list = preWards.byProvinceCode("01");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((ward) => ward.province_code === "01")).toBe(true);
    expect(list).toContainEqual(PRE_WARD_CONG_VI);
    expect(preWards.byProvinceCode("01")).not.toBe(list);
    expect(preWards.byProvinceCode("01")).toEqual(list);
    list.pop();
    expect(preWards.byProvinceCode("01").length).toBeGreaterThan(list.length);
  });

  test("byProvinceCode returns an empty array for unknown provinces", () => {
    expect(preWards.byProvinceCode("00")).toEqual([]);
    expect(preWards.byProvinceCode("missing")).toEqual([]);
  });

  test("byProvinceCode returns an empty array for Object.prototype keys", () => {
    expect(preWards.byProvinceCode("constructor")).toEqual([]);
    expect(preWards.byProvinceCode("__proto__")).toEqual([]);
    expect(preWards.byProvinceCode("toString")).toEqual([]);
    expect(preWards.byProvinceCode("hasOwnProperty")).toEqual([]);
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

  test("byDistrictCode returns an empty array for Object.prototype keys", () => {
    expect(preWards.byDistrictCode("constructor")).toEqual([]);
    expect(preWards.byDistrictCode("__proto__")).toEqual([]);
    expect(preWards.byDistrictCode("toString")).toEqual([]);
    expect(preWards.byDistrictCode("hasOwnProperty")).toEqual([]);
  });

  test("byCode looks up a pre-merger ward", () => {
    const byCode = preWards.byCode(PRE_WARD_CONG_VI.code);

    expect(byCode).toEqual(PRE_WARD_CONG_VI);
  });

  test("byCode returns undefined for unknown keys", () => {
    expect(preWards.byCode("99999")).toBeUndefined();
  });

  test("byCode, byProvinceCode, and byDistrictCode trim surrounding whitespace", () => {
    expect(preWards.byCode(`  ${PRE_WARD_CONG_VI.code}  `)).toEqual(PRE_WARD_CONG_VI);
    expect(preWards.byProvinceCode("  01  ")).toContainEqual(PRE_WARD_CONG_VI);
    expect(preWards.byDistrictCode("  001  ")).toContainEqual(PRE_WARD_CONG_VI);
  });
});

describe("pre wards.search", () => {
  test("pre wards search can scope by district", () => {
    const results = preWards.search("cong vi", { districtCode: "001" });

    expect(results).toContainEqual({
      code: "00007",
      district_code: "001",
      name: "Cống Vị",
      province_code: "01",
      type: "Phường",
    });
  });

  test("pre wards search can scope by province", () => {
    const results = preWards.search("cong vi", { provinceCode: "01" });

    expect(results).toContainEqual({
      code: "00007",
      district_code: "001",
      name: "Cống Vị",
      province_code: "01",
      type: "Phường",
    });
    expect(results.every((ward) => ward.province_code === "01")).toBe(true);
  });

  test("pre wards search ANDs provinceCode and districtCode", () => {
    const both = preWards.search("cong vi", {
      provinceCode: "01",
      districtCode: "001",
    });
    expect(both).toContainEqual({
      code: "00007",
      district_code: "001",
      name: "Cống Vị",
      province_code: "01",
      type: "Phường",
    });

    expect(
      preWards.search("cong vi", {
        provinceCode: "79",
        districtCode: "001",
      }),
    ).toEqual([]);
  });

  test("pre wards search treats blank scope codes as unscoped", () => {
    const nationwide = preWards.search("cong vi");
    expect(preWards.search("cong vi", { provinceCode: "" })).toEqual(nationwide);
    expect(preWards.search("cong vi", { districtCode: "   " })).toEqual(nationwide);
    expect(preWards.search("cong vi", { provinceCode: "", districtCode: "" })).toEqual(nationwide);

    const byDistrict = preWards.search("cong vi", { districtCode: "001" });
    expect(preWards.search("cong vi", { provinceCode: "   ", districtCode: "001" })).toEqual(byDistrict);
  });
});
