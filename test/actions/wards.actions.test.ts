import { describe, expect, test } from "bun:test";
import { wards } from "../../src/actions/wards.actions";
import { EMPTY_ARRAY } from "../../src/utils/empty";
import { COUNTS, POST_WARD_BA_DINH, PRE_WARD_CONG_VI } from "../fixtures";

describe("wards", () => {
  test("all returns the frozen post-merger ward list", () => {
    const all = wards.all();

    expect(all).toHaveLength(COUNTS.postWards);
    expect(all).toContainEqual(POST_WARD_BA_DINH);
    expect(wards.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
    expect(Object.isFrozen(all[0])).toBe(true);
  });

  test("byProvinceCode returns frozen wards for a province", () => {
    const list = wards.byProvinceCode("01");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((ward) => ward.province_code === "01")).toBe(true);
    expect(list).toContainEqual(POST_WARD_BA_DINH);
    expect(wards.byProvinceCode("01")).toBe(list);
    expect(Object.isFrozen(list)).toBe(true);
  });

  test("byProvinceCode returns the shared empty array for unknown provinces", () => {
    expect(wards.byProvinceCode("00")).toBe(EMPTY_ARRAY);
    expect(wards.byProvinceCode("missing")).toBe(EMPTY_ARRAY);
  });

  test("byCode and byId look up the same post-merger ward", () => {
    const byCode = wards.byCode(POST_WARD_BA_DINH.code);
    const byId = wards.byId(POST_WARD_BA_DINH.ward_id);

    expect(byCode).toEqual(POST_WARD_BA_DINH);
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

describe("wards.pre", () => {
  test("all returns the frozen pre-merger ward list", () => {
    const all = wards.pre.all();

    expect(all).toHaveLength(COUNTS.preWards);
    expect(all.length).toBeGreaterThan(COUNTS.postWards);
    expect(all).toContainEqual(PRE_WARD_CONG_VI);
    expect(wards.pre.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
  });

  test("byDistrictCode returns frozen wards for a district", () => {
    const list = wards.pre.byDistrictCode("001");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((ward) => ward.district_code === "001")).toBe(true);
    expect(list).toContainEqual(PRE_WARD_CONG_VI);
    expect(wards.pre.byDistrictCode("001")).toBe(list);
    expect(Object.isFrozen(list)).toBe(true);
  });

  test("byDistrictCode returns the shared empty array for unknown districts", () => {
    expect(wards.pre.byDistrictCode("000")).toBe(EMPTY_ARRAY);
    expect(wards.pre.byDistrictCode("missing")).toBe(EMPTY_ARRAY);
  });

  test("byCode and byId look up the same pre-merger ward", () => {
    const byCode = wards.pre.byCode(PRE_WARD_CONG_VI.code);
    const byId = wards.pre.byId(PRE_WARD_CONG_VI.ward_id);

    expect(byCode).toEqual(PRE_WARD_CONG_VI);
    expect(byId).toBe(byCode);
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("byCode and byId return undefined for unknown keys", () => {
    expect(wards.pre.byCode("99999")).toBeUndefined();
    expect(wards.pre.byId(-1)).toBeUndefined();
  });
});
