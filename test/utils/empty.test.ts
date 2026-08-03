import { describe, expect, test } from "bun:test";
import { EMPTY_ARRAY } from "../../src/utils/empty";

describe("EMPTY_ARRAY", () => {
  test("is a frozen singleton empty array", () => {
    expect(EMPTY_ARRAY).toEqual([]);
    expect(EMPTY_ARRAY).toHaveLength(0);
    expect(Object.isFrozen(EMPTY_ARRAY)).toBe(true);
    expect(EMPTY_ARRAY).toBe(EMPTY_ARRAY);
  });

  test("rejects mutation", () => {
    const mutable = EMPTY_ARRAY as unknown as unknown[];

    expect(() => {
      mutable.push(1);
    }).toThrow();
    expect(() => {
      mutable.pop();
    }).toThrow();
    expect(() => {
      mutable[0] = 1;
    }).toThrow();
  });
});
