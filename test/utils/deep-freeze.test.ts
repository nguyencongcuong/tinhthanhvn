import { describe, expect, test } from "bun:test";
import { deepFreeze } from "../../src/utils/deep-freeze";

describe("deepFreeze", () => {
  test("freezes nested plain objects and arrays in place", () => {
    const value = {
      nested: { name: "Hà Nội" },
      list: [{ code: "01" }],
    };

    const frozen = deepFreeze(value);

    expect(frozen).toBe(value);
    expect(Object.isFrozen(value)).toBe(true);
    expect(Object.isFrozen(value.nested)).toBe(true);
    expect(Object.isFrozen(value.list)).toBe(true);
    expect(Object.isFrozen(value.list[0])).toBe(true);
    expect(() => {
      value.nested.name = "changed";
    }).toThrow();
    expect(() => {
      value.list.push({ code: "02" });
    }).toThrow();
  });

  test("makes Map mutation methods throw and freezes entries", () => {
    const map = new Map<string, { name: string } | null | undefined>([
      ["01", { name: "Hà Nội" }],
      ["null", null],
      ["undefined", undefined],
    ]);
    deepFreeze(map);

    expect(Object.isFrozen(map)).toBe(true);
    expect(Object.isFrozen(map.get("01"))).toBe(true);
    expect(map.get("null")).toBeNull();
    expect(map.get("undefined")).toBeUndefined();
    expect(() => map.set("02", { name: "Huế" })).toThrow("map is read-only");
    expect(() => map.delete("01")).toThrow("map is read-only");
    expect(() => map.clear()).toThrow("map is read-only");
  });

  test("makes Set mutation methods throw and freezes values", () => {
    const item = { code: "01" };
    const set = new Set([item]);
    deepFreeze(set);

    expect(Object.isFrozen(set)).toBe(true);
    expect(Object.isFrozen(item)).toBe(true);
    expect(() => set.add({ code: "02" })).toThrow("set is read-only");
    expect(() => set.delete(item)).toThrow("set is read-only");
    expect(() => set.clear()).toThrow("set is read-only");
  });

  test("makes WeakMap and WeakSet mutation methods throw", () => {
    const key = {};
    const weakMap = new WeakMap<object, string>([[key, "value"]]);
    const weakSet = new WeakSet<object>([key]);

    deepFreeze(weakMap);
    deepFreeze(weakSet);

    expect(() => weakMap.set({}, "other")).toThrow("WeakMap is read-only");
    expect(() => weakMap.delete(key)).toThrow("WeakMap is read-only");
    expect(() => weakSet.add({})).toThrow("WeakSet is read-only");
    expect(() => weakSet.delete(key)).toThrow("WeakSet is read-only");
  });

  test("skips already-frozen nested objects without throwing", () => {
    const nested = Object.freeze({ name: "Huế" });
    const value = { nested };

    expect(() => deepFreeze(value)).not.toThrow();
    expect(Object.isFrozen(value)).toBe(true);
    expect(value.nested).toBe(nested);
  });

  test("returns primitives unchanged", () => {
    expect(deepFreeze(null)).toBeNull();
    expect(deepFreeze(undefined)).toBeUndefined();
    expect(deepFreeze(42)).toBe(42);
    expect(deepFreeze("01")).toBe("01");
    expect(deepFreeze(true)).toBe(true);
  });
});
