import { describe, expect, test } from "bun:test";
import { districts } from "../../src/actions/districts.actions";
import { EMPTY_ARRAY } from "../../src/utils/empty";
import { COUNTS, PRE_DISTRICT_BA_DINH } from "../fixtures";

describe("districts.pre", () => {
  test("all returns the frozen pre-merger district list", () => {
    const all = districts.pre.all();

    expect(all).toHaveLength(COUNTS.preDistricts);
    expect(all).toContainEqual(PRE_DISTRICT_BA_DINH);
    expect(all[0]?.province_code).toBe("01");
    expect(districts.pre.all()).toBe(all);
    expect(Object.isFrozen(all)).toBe(true);
    expect(Object.isFrozen(all[0])).toBe(true);
  });

  test("byProvinceCode returns frozen districts for a province", () => {
    const list = districts.pre.byProvinceCode("01");

    expect(list.length).toBeGreaterThan(0);
    expect(list.every((district) => district.province_code === "01")).toBe(true);
    expect(list).toContainEqual(PRE_DISTRICT_BA_DINH);
    expect(districts.pre.byProvinceCode("01")).toBe(list);
    expect(Object.isFrozen(list)).toBe(true);
  });

  test("byProvinceCode returns the shared empty array for unknown provinces", () => {
    const list = districts.pre.byProvinceCode("00");

    expect(list).toBe(EMPTY_ARRAY);
    expect(list).toHaveLength(0);
    expect(districts.pre.byProvinceCode("missing")).toBe(EMPTY_ARRAY);
  });

  test("byCode and byId look up the same district", () => {
    const byCode = districts.pre.byCode(PRE_DISTRICT_BA_DINH.code);
    const byId = districts.pre.byId(PRE_DISTRICT_BA_DINH.district_id);

    expect(byCode).toEqual(PRE_DISTRICT_BA_DINH);
    expect(byId).toBe(byCode);
    expect(Object.isFrozen(byCode)).toBe(true);
  });

  test("byCode and byId return undefined for unknown keys", () => {
    expect(districts.pre.byCode("000")).toBeUndefined();
    expect(districts.pre.byCode("")).toBeUndefined();
    expect(districts.pre.byId(-1)).toBeUndefined();
    expect(districts.pre.byId(0)).toBeUndefined();
  });
});
