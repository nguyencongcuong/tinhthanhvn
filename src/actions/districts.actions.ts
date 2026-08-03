import {
  PRE_MERGER_DISTRICTS,
  PRE_MERGER_DISTRICTS_BY_CODE,
  PRE_MERGER_DISTRICTS_BY_ID,
  PRE_MERGER_DISTRICTS_BY_NAME,
  PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE,
} from "../data/pre-merger-districts";

export const districts = {
  pre: {
    all: () => PRE_MERGER_DISTRICTS,
    byProvinceCode: (provinceCode: string) => PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE[provinceCode] || [],
    byCode: (code: string) => PRE_MERGER_DISTRICTS_BY_CODE.get(code),
    byId: (id: number) => PRE_MERGER_DISTRICTS_BY_ID.get(id),
    byName: (name: string) => PRE_MERGER_DISTRICTS_BY_NAME.get(name),
  },
};
