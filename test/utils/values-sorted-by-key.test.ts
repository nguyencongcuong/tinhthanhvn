import { describe, expect, test } from "bun:test";
import { valuesSortedByKey } from "../../src/utils/values-sorted-by-key";

describe("valuesSortedByKey", () => {
  test("flattens values in lexicographic key order", () => {
    const record: Record<string, { code: string }[]> = {
      "11": [{ code: "a" }],
      "01": [{ code: "b" }, { code: "c" }],
      "10": [{ code: "d" }],
    };

    expect(valuesSortedByKey(record).map((item) => item.code)).toEqual(["b", "c", "d", "a"]);
  });

  test("returns an empty array for an empty record", () => {
    expect(valuesSortedByKey({})).toEqual([]);
  });
});
