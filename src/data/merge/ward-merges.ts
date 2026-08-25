import type { WardMerge } from "../../types";

// TODO: populate from the 34 ward-merger resolutions listed in README.md#legal-references.
// Must be total over every pre-merger ward code (see WardMerge doc comment).
export const WARD_MERGES: WardMerge[] = [];

// Grouping index, not a Map: a merger resolution can transfer part of an old
// ward's area into one new ward and the remainder into another ("một phần
// diện tích tự nhiên..." / "phần còn lại..." in the source resolutions), so a
// single old_ward_code can legitimately produce more than one WardMerge row.
export const WARD_MERGES_BY_OLD_CODE: Record<string, WardMerge[]> = WARD_MERGES.reduce<Record<string, WardMerge[]>>(
  (byOldWardCode, merge) => {
    const list = byOldWardCode[merge.old_ward_code];
    if (list === undefined) {
      byOldWardCode[merge.old_ward_code] = [merge];
    } else {
      list.push(merge);
    }
    return byOldWardCode;
  },
  {},
);

export const WARD_MERGES_BY_NEW_CODE: Record<string, WardMerge[]> = WARD_MERGES.reduce<Record<string, WardMerge[]>>(
  (byNewWardCode, merge) => {
    const list = byNewWardCode[merge.new_ward_code];
    if (list === undefined) {
      byNewWardCode[merge.new_ward_code] = [merge];
    } else {
      list.push(merge);
    }
    return byNewWardCode;
  },
  {},
);
