import { describe, expect, test } from "bun:test";
import { provinces } from "../../src/lookups/current/provinces";
import { wards } from "../../src/lookups/current/wards";
import { districts } from "../../src/lookups/pre/districts";
import { provinces as preProvinces } from "../../src/lookups/pre/provinces";
import { wards as preWards } from "../../src/lookups/pre/wards";

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

describe("pre search", () => {
  test("pre provinces search without diacritics", () => {
    expect(preProvinces.search("ho chi minh").some((province) => province.code === "79")).toBe(true);
  });

  test("pre districts search can scope by province", () => {
    const results = districts.search("ba dinh", { provinceCode: "01" });

    expect(results).toContainEqual({
      code: "001",
      name: "Ba Đình",
      province_code: "01",
      type: "Quận",
    });
    expect(results.every((district) => district.province_code === "01")).toBe(true);
  });

  test("pre districts search treats blank province filter as unscoped", () => {
    const nationwide = districts.search("ba dinh");
    expect(districts.search("ba dinh", { provinceCode: "" })).toEqual(nationwide);
    expect(districts.search("ba dinh", { provinceCode: "   " })).toEqual(nationwide);
  });

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
