import { describe, expect, test } from "bun:test";
import { wards } from "../../../src/lookups/current/wards";
import { COUNTS, WARD_BA_DINH } from "../../fixtures";

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

  test("byProvinceCode returns an empty array for Object.prototype keys", () => {
    expect(wards.byProvinceCode("constructor")).toEqual([]);
    expect(wards.byProvinceCode("__proto__")).toEqual([]);
    expect(wards.byProvinceCode("toString")).toEqual([]);
    expect(wards.byProvinceCode("hasOwnProperty")).toEqual([]);
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

describe("wards.search", () => {
  test("matches without diacritics and can scope by province", () => {
    const nationwide = wards.search("ba dinh");
    const scoped = wards.search("ba dinh", { provinceCode: "01" });

    expect(nationwide.some((ward) => ward.code === "00004")).toBe(true);
    expect(scoped).toContainEqual({
      code: "00004",
      name: "Ba Đình",
      province_code: "01",
      type: "Phường",
    });
    expect(scoped.every((ward) => ward.province_code === "01")).toBe(true);
  });

  test("returns empty array when province filter has no matches", () => {
    expect(wards.search("ba dinh", { provinceCode: "96" })).toEqual([]);
  });

  test("treats blank province filter as unscoped", () => {
    const nationwide = wards.search("ba dinh");
    expect(wards.search("ba dinh", { provinceCode: "" })).toEqual(nationwide);
    expect(wards.search("ba dinh", { provinceCode: "   " })).toEqual(nationwide);
  });

  test("returns copied result arrays", () => {
    const results = wards.search("ba dinh", { provinceCode: "01" });

    expect(wards.search("ba dinh", { provinceCode: "01" })).not.toBe(results);
    expect(wards.search("ba dinh", { provinceCode: "01" })).toEqual(results);
    expect(wards.search("ba dinh", { provinceCode: "96" })).toEqual([]);
  });
});
