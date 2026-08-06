import { WARDS, WARDS_BY_CODE, WARDS_BY_PROVINCE_CODE } from "../../data/current/wards";
import { buildNameSearchIndex, optionalScopeCode, searchByName } from "../../utils/search-by-name";

const WARD_NAME_INDEX = buildNameSearchIndex(WARDS);

export type WardSearchOptions = {
  provinceCode?: string;
};

export const wards = {
  all: () => [...WARDS],
  byProvinceCode: (provinceCode: string) => {
    const list = WARDS_BY_PROVINCE_CODE[provinceCode.trim()];
    return list === undefined ? [] : [...list];
  },
  byCode: (code: string) => WARDS_BY_CODE.get(code.trim()),
  search: (query: string, options?: WardSearchOptions) => {
    const provinceCode = optionalScopeCode(options?.provinceCode);
    return searchByName(
      WARD_NAME_INDEX,
      query,
      provinceCode === undefined ? undefined : (ward) => ward.province_code === provinceCode,
    );
  },
};
