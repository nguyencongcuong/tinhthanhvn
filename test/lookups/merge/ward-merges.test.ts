import { afterEach, beforeEach, describe, expect, test } from "bun:test";
import { WARD_MERGES_BY_NEW_CODE, WARD_MERGES_BY_OLD_CODE } from "../../../src/data/merge/ward-merges";
import { wardMerges } from "../../../src/lookups/merge/ward-merges";
import { PRE_WARD_CONG_VI, WARD_BA_DINH, WARD_NGOC_HA } from "../../fixtures";

// WARD_MERGES is currently empty (data not yet populated from the 34 ward-merger
// resolutions — see README.md#legal-references), so most of these tests only pin
// down the API contract: total-function semantics for byOldWardCode/byNewWardCode
// (both return [] rather than throwing or returning undefined), copy semantics for
// all(), and the Object.hasOwn guard on both grouping indexes. The "with synthetic
// merge rows" block below injects real merge rows directly into the data-layer
// indexes to exercise the actual resolution path — including the split-ward case
// (one old ward folded into more than one new ward) — ahead of real data landing.
// Replace it with real fixture rows once WARD_MERGES is populated.
describe("wardMerges", () => {
  test("all returns a copy of the merge list", () => {
    const all = wardMerges.all();

    expect(all).toEqual([]);
    expect(wardMerges.all()).not.toBe(all);
  });

  test("byOldWardCode returns an empty array for unknown keys", () => {
    expect(wardMerges.byOldWardCode("00007")).toEqual([]);
    expect(wardMerges.byOldWardCode("")).toEqual([]);
  });

  test("byOldWardCode returns an empty array for Object.prototype keys", () => {
    expect(wardMerges.byOldWardCode("constructor")).toEqual([]);
    expect(wardMerges.byOldWardCode("__proto__")).toEqual([]);
    expect(wardMerges.byOldWardCode("toString")).toEqual([]);
    expect(wardMerges.byOldWardCode("hasOwnProperty")).toEqual([]);
  });

  test("byNewWardCode returns an empty array for unknown keys", () => {
    expect(wardMerges.byNewWardCode("00004")).toEqual([]);
    expect(wardMerges.byNewWardCode("missing")).toEqual([]);
  });

  test("byNewWardCode returns an empty array for Object.prototype keys", () => {
    expect(wardMerges.byNewWardCode("constructor")).toEqual([]);
    expect(wardMerges.byNewWardCode("__proto__")).toEqual([]);
    expect(wardMerges.byNewWardCode("toString")).toEqual([]);
    expect(wardMerges.byNewWardCode("hasOwnProperty")).toEqual([]);
  });

  test("byOldWardCode and byNewWardCode trim surrounding whitespace", () => {
    expect(wardMerges.byOldWardCode("  00007  ")).toEqual([]);
    expect(wardMerges.byNewWardCode("  00004  ")).toEqual([]);
  });
});

describe("wardMerges with synthetic merge rows", () => {
  // Cống Vị (old) was split: part folded into Ba Đình, the remainder into Ngọc Hà.
  const toBaDinh = { old_ward_code: PRE_WARD_CONG_VI.code, new_ward_code: WARD_BA_DINH.code };
  const toNgocHa = { old_ward_code: PRE_WARD_CONG_VI.code, new_ward_code: WARD_NGOC_HA.code };

  beforeEach(() => {
    WARD_MERGES_BY_OLD_CODE[toBaDinh.old_ward_code] = [toBaDinh, toNgocHa];
    WARD_MERGES_BY_NEW_CODE[toBaDinh.new_ward_code] = [toBaDinh];
    WARD_MERGES_BY_NEW_CODE[toNgocHa.new_ward_code] = [toNgocHa];
  });

  afterEach(() => {
    delete WARD_MERGES_BY_OLD_CODE[toBaDinh.old_ward_code];
    delete WARD_MERGES_BY_NEW_CODE[toBaDinh.new_ward_code];
    delete WARD_MERGES_BY_NEW_CODE[toNgocHa.new_ward_code];
  });

  test("byOldWardCode resolves a split old ward to every current Ward it was folded into", () => {
    expect(wardMerges.byOldWardCode(toBaDinh.old_ward_code)).toEqual([WARD_BA_DINH, WARD_NGOC_HA]);
  });

  test("byNewWardCode resolves each new ward code back to the pre-merger ward it absorbed", () => {
    expect(wardMerges.byNewWardCode(toBaDinh.new_ward_code)).toEqual([PRE_WARD_CONG_VI]);
    expect(wardMerges.byNewWardCode(toNgocHa.new_ward_code)).toEqual([PRE_WARD_CONG_VI]);
  });
});
