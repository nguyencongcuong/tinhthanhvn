import {
  PRE_MERGER_WARDS,
  PRE_MERGER_WARDS_BY_CODE,
  PRE_MERGER_WARDS_BY_DISTRICT_CODE,
  PRE_MERGER_WARDS_BY_ID,
} from "../data/pre/wards";
import { WARDS, WARDS_BY_CODE, WARDS_BY_ID, WARDS_BY_PROVINCE_CODE } from "../data/current/wards";
import { EMPTY_ARRAY } from "../utils/empty";

export const wards = {
  all: () => WARDS,
  byProvinceCode: (provinceCode: string) => WARDS_BY_PROVINCE_CODE[provinceCode] ?? EMPTY_ARRAY,
  byCode: (code: string) => WARDS_BY_CODE.get(code),
  byId: (id: number) => WARDS_BY_ID.get(id),

  pre: {
    all: () => PRE_MERGER_WARDS,
    byDistrictCode: (districtCode: string) => PRE_MERGER_WARDS_BY_DISTRICT_CODE[districtCode] ?? EMPTY_ARRAY,
    byCode: (code: string) => PRE_MERGER_WARDS_BY_CODE.get(code),
    byId: (id: number) => PRE_MERGER_WARDS_BY_ID.get(id),
  },
};
