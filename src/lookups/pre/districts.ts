import {
  PRE_MERGER_DISTRICTS,
  PRE_MERGER_DISTRICTS_BY_CODE,
  PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE,
} from "../../data/pre/districts";
import { buildNameSearchIndex, optionalScopeCode, searchByName } from "../../utils/search-by-name";
import { wards } from "./wards";

const PRE_MERGER_DISTRICT_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_DISTRICTS);

export type DistrictSearchOptions = {
  provinceCode?: string;
};

export const districts = {
  all: () => [...PRE_MERGER_DISTRICTS],
  byProvinceCode: (provinceCode: string) => {
    const list = PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE[provinceCode.trim()];
    return list === undefined ? [] : [...list];
  },
  byCode: (code: string) => PRE_MERGER_DISTRICTS_BY_CODE.get(code.trim()),
  byWardCode: (wardCode: string) => {
    const ward = wards.byCode(wardCode);
    return ward === undefined ? undefined : PRE_MERGER_DISTRICTS_BY_CODE.get(ward.district_code);
  },
  search: (query: string, options?: DistrictSearchOptions) => {
    const provinceCode = optionalScopeCode(options?.provinceCode);
    return searchByName(
      PRE_MERGER_DISTRICT_NAME_INDEX,
      query,
      provinceCode === undefined ? undefined : (district) => district.province_code === provinceCode,
    );
  },
};
