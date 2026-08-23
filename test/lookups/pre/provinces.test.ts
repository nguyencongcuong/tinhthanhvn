import { describe, expect, test } from "bun:test";
import { provinces as preProvinces } from "../../../src/lookups/pre/provinces";
import { COUNTS } from "../../fixtures";

describe("pre provinces", () => {
  test("all returns a copy of the pre-merger province list", () => {
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
    expect(preProvinces.all()).not.toBe(all);
    expect(preProvinces.all()).toEqual(all);
  });

  test("byCode looks up a pre-merger province", () => {
    const byCode = preProvinces.byCode("01");

    expect(byCode).toEqual({
      code: "01",
      name: "Hà Nội",
      type: "Thành phố",
    });
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
    expect(preProvinces.byWardCode("00007")).toBe(preProvinces.byCode("01"));
  });

  test("byWardCode returns undefined for unknown ward codes", () => {
    expect(preProvinces.byWardCode("99999")).toBeUndefined();
  });
});

describe("pre provinces.search", () => {
  test("pre provinces search without diacritics", () => {
    expect(preProvinces.search("ho chi minh").some((province) => province.code === "79")).toBe(true);
  });
});
