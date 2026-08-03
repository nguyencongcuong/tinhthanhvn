import {
  PRE_MERGER_PROVINCES,
  PRE_MERGER_PROVINCES_BY_CODE,
  PRE_MERGER_PROVINCES_BY_ID,
} from "../data/pre-merger-provinces";
import { PROVINCES, PROVINCES_BY_CODE, PROVINCES_BY_ID } from "../data/provinces";

export const provinces = {
  all: () => PROVINCES,
  byCode: (code: string) => PROVINCES_BY_CODE.get(code),
  byId: (id: number) => PROVINCES_BY_ID.get(id),

  pre: {
    all: () => PRE_MERGER_PROVINCES,
    byCode: (code: string) => PRE_MERGER_PROVINCES_BY_CODE.get(code),
    byId: (id: number) => PRE_MERGER_PROVINCES_BY_ID.get(id),
  },
};
