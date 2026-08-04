import {
  PRE_MERGER_DISTRICTS,
  PRE_MERGER_DISTRICTS_BY_CODE,
  PRE_MERGER_DISTRICTS_BY_ID,
  PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE,
} from "../../data/pre/districts";
import { EMPTY_ARRAY } from "../../utils/empty";

export const districts = {
  all: () => PRE_MERGER_DISTRICTS,
  byProvinceCode: (provinceCode: string) => PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE[provinceCode] ?? EMPTY_ARRAY,
  byCode: (code: string) => PRE_MERGER_DISTRICTS_BY_CODE.get(code),
  byId: (id: number) => PRE_MERGER_DISTRICTS_BY_ID.get(id),
};
