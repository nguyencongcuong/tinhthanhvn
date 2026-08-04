import { describe, expect, test } from "bun:test";
import { wards } from "../../src/lookups/current/wards";
import { wards as preWards } from "../../src/lookups/pre/wards";
import { EMPTY_ARRAY } from "../../src/utils/empty";
import { COUNTS, PRE_WARD_CONG_VI, WARD_BA_DINH } from "../fixtures";

describe("wards", () => {
  test("all returns the frozen ward list", () => {
    const all = wards.all();

    expect(all).toHaveLength(COUNTS.wards);
    expect(all).toContainEqual(WARD_BA_DINH);
    expect(all[0]?.province_code).toBe("01");
    expect(wards.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
    expect(Object.isFrozen(all[0])).toBe(true);
  });

  test("byProvinceCode returns frozen wards for a province", () => {
    const list = wards.byProvinceCode("01");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((ward) => ward.province_code === "01")).toBe(true);
    expect(list).toContainEqual(WARD_BA_DINH);
    expect(wards.byProvinceCode("01")).toBe(list);
    expect(Object.isFrozen(list)).toBe(true);
  });

  test("byProvinceCode returns the shared empty array for unknown provinces", () => {
    expect(wards.byProvinceCode("00")).toBe(EMPTY_ARRAY);
    expect(wards.byProvinceCode("missing")).toBe(EMPTY_ARRAY);
  });

  test("byCode and byId look up the same ward", () => {
    const byCode = wards.byCode(WARD_BA_DINH.code);
    const byId = wards.byId(WARD_BA_DINH.ward_id);

    expect(byCode).toEqual(WARD_BA_DINH);
    expect(byId).toBe(byCode);
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("byCode and byId return undefined for unknown keys", () => {
    expect(wards.byCode("99999")).toBeUndefined();
    expect(wards.byCode("")).toBeUndefined();
    expect(wards.byId(-1)).toBeUndefined();
    expect(wards.byId(0)).toBeUndefined();
  });
});

describe("pre wards", () => {
  test("all returns the frozen pre-merger ward list", () => {
    const all = preWards.all();

    expect(all).toHaveLength(COUNTS.preWards);
    expect(all.length).toBeGreaterThan(COUNTS.wards);
    expect(all).toContainEqual(PRE_WARD_CONG_VI);
    expect(all[0]?.district_code).toBe("001");
    expect(preWards.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
  });

  test("byDistrictCode returns frozen wards for a district", () => {
    const list = preWards.byDistrictCode("001");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((ward) => ward.district_code === "001")).toBe(true);
    expect(list).toContainEqual(PRE_WARD_CONG_VI);
    expect(preWards.byDistrictCode("001")).toBe(list);
    expect(Object.isFrozen(list)).toBe(true);
  });

  test("byDistrictCode returns the shared empty array for unknown districts", () => {
    expect(preWards.byDistrictCode("000")).toBe(EMPTY_ARRAY);
    expect(preWards.byDistrictCode("missing")).toBe(EMPTY_ARRAY);
  });

  test("byCode and byId look up the same pre-merger ward", () => {
    const byCode = preWards.byCode(PRE_WARD_CONG_VI.code);
    const byId = preWards.byId(PRE_WARD_CONG_VI.ward_id);

    expect(byCode).toEqual(PRE_WARD_CONG_VI);
    expect(byId).toBe(byCode);
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("byCode and byId return undefined for unknown keys", () => {
    expect(preWards.byCode("99999")).toBeUndefined();
    expect(preWards.byId(-1)).toBeUndefined();
  });
});
