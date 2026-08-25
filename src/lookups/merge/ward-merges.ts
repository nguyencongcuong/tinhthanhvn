import { WARD_MERGES, WARD_MERGES_BY_NEW_CODE, WARD_MERGES_BY_OLD_CODE } from "../../data/merge/ward-merges";
import type { PreMergerWard, Ward, WardMerge } from "../../types";
import { wards as currentWards } from "../current/wards";
import { wards as preWards } from "../pre/wards";

export const wardMerges = {
  all: () => [...WARD_MERGES],
  /**
   * Every current ward that a pre-merger ward's area was folded into —
   * usually one, but more than one when the old ward was split across
   * multiple new wards.
   */
  byOldWardCode: (oldWardCode: string): Ward[] => {
    const code = oldWardCode.trim();
    if (!Object.hasOwn(WARD_MERGES_BY_OLD_CODE, code)) return [];
    return (WARD_MERGES_BY_OLD_CODE[code] as WardMerge[])
      .map((merge) => currentWards.byCode(merge.new_ward_code))
      .filter((ward): ward is Ward => ward !== undefined);
  },
  /** Every pre-merger ward that was folded into the given current ward code. */
  byNewWardCode: (newWardCode: string): PreMergerWard[] => {
    const code = newWardCode.trim();
    if (!Object.hasOwn(WARD_MERGES_BY_NEW_CODE, code)) return [];
    return (WARD_MERGES_BY_NEW_CODE[code] as WardMerge[])
      .map((merge) => preWards.byCode(merge.old_ward_code))
      .filter((ward): ward is PreMergerWard => ward !== undefined);
  },
};
