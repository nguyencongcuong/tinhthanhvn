import { PRE_MERGER_PROVINCES, PRE_MERGER_PROVINCES_BY_CODE } from "../../data/pre/provinces";

export const provinces = {
  all: () => PRE_MERGER_PROVINCES,
  byCode: (code: string) => PRE_MERGER_PROVINCES_BY_CODE.get(code),
};
