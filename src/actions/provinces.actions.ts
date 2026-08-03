import {
  POST_MERGER_PROVINCES,
  POST_MERGER_PROVINCES_BY_CODE,
  POST_MERGER_PROVINCES_BY_ID,
} from "../data/post-merger-provinces";
import {
  PRE_MERGER_PROVINCES,
  PRE_MERGER_PROVINCES_BY_CODE,
  PRE_MERGER_PROVINCES_BY_ID,
} from "../data/pre-merger-provinces";

export const provinces = {
  all: () => POST_MERGER_PROVINCES,
  byCode: (code: string) => POST_MERGER_PROVINCES_BY_CODE.get(code),
  byId: (id: number) => POST_MERGER_PROVINCES_BY_ID.get(id),

  pre: {
    all: () => PRE_MERGER_PROVINCES,
    byCode: (code: string) => PRE_MERGER_PROVINCES_BY_CODE.get(code),
    byId: (id: number) => PRE_MERGER_PROVINCES_BY_ID.get(id),
  },
};
