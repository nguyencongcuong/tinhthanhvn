import { PRE_MERGER_WARDS, PRE_MERGER_WARDS_BY_CODE, PRE_MERGER_WARDS_BY_DISTRICT_CODE } from "../../data/pre/wards";
import { buildNameSearchIndex, optionalScopeCode, searchByName } from "../../utils/search-by-name";

const PRE_MERGER_WARD_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_WARDS);

export type PreWardSearchOptions = {
  provinceCode?: string;
  districtCode?: string;
};

export const wards = {
  all: () => [...PRE_MERGER_WARDS],
  byDistrictCode: (districtCode: string) => {
    const list = PRE_MERGER_WARDS_BY_DISTRICT_CODE[districtCode.trim()];
    return list === undefined ? [] : [...list];
  },
  byCode: (code: string) => PRE_MERGER_WARDS_BY_CODE.get(code.trim()),
  search: (query: string, options?: PreWardSearchOptions) => {
    const provinceCode = optionalScopeCode(options?.provinceCode);
    const districtCode = optionalScopeCode(options?.districtCode);
    const hasFilter = provinceCode !== undefined || districtCode !== undefined;
    return searchByName(
      PRE_MERGER_WARD_NAME_INDEX,
      query,
      hasFilter
        ? (ward) =>
            (provinceCode === undefined || ward.province_code === provinceCode) &&
            (districtCode === undefined || ward.district_code === districtCode)
        : undefined,
    );
  },
};
