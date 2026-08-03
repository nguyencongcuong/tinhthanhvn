import { describe, expect, test } from "bun:test";
import { provinces } from "../../src/lookups/provinces";
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

  test("byCode and byId look up the same province", () => {
    const byCode = provinces.byCode(PROVINCE_HN.code);
    const byId = provinces.byId(PROVINCE_HN.province_id);

    expect(byCode).toEqual(PROVINCE_HN);
    expect(byId).toBe(byCode);
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("byCode and byId return undefined for unknown keys", () => {
    expect(provinces.byCode("00")).toBeUndefined();
    expect(provinces.byCode("")).toBeUndefined();
    expect(provinces.byId(-1)).toBeUndefined();
    expect(provinces.byId(0)).toBeUndefined();
  });

  test("pre.all returns the frozen pre-merger province list", () => {
    const all = provinces.pre.all();

    expect(all).toHaveLength(COUNTS.preProvinces);
    expect(all.length).toBeGreaterThan(COUNTS.provinces);
    expect(all).toContainEqual(
      expect.objectContaining({
        code: "01",
        name: "Hà Nội",
        type: "Thành phố",
      }),
    );
    expect(provinces.pre.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
  });

  test("pre.byCode and pre.byId look up the same pre-merger province", () => {
    const byCode = provinces.pre.byCode("01");

    expect(byCode).toMatchObject({
      code: "01",
      name: "Hà Nội",
      type: "Thành phố",
    });
    expect(byCode).toBeDefined();
    expect(typeof byCode?.province_id).toBe("number");
    expect(provinces.pre.byId(byCode?.province_id ?? Number.NaN)).toBe(byCode);
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("pre.byCode and pre.byId return undefined for unknown keys", () => {
    expect(provinces.pre.byCode("00")).toBeUndefined();
    expect(provinces.pre.byId(-1)).toBeUndefined();
  });
});
