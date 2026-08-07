import {
  PRE_MERGER_WARDS,
  PRE_MERGER_WARDS_BY_CODE,
  PRE_MERGER_WARDS_BY_DISTRICT_CODE,
  PRE_MERGER_WARDS_BY_PROVINCE_CODE,
} from "../../data/pre/wards";
import type { PreMergerWard } from "../../types";
import { buildNameSearchIndex, optionalScopeCode, searchByName } from "../../utils/search-by-name";

const PRE_MERGER_WARD_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_WARDS);

export type PreWardSearchOptions = {
  provinceCode?: string;
  districtCode?: string;
};

export const wards = {
  all: () => [...PRE_MERGER_WARDS],
  byProvinceCode: (provinceCode: string) => {
    const code = provinceCode.trim();
    if (!Object.hasOwn(PRE_MERGER_WARDS_BY_PROVINCE_CODE, code)) return [];
    return [...(PRE_MERGER_WARDS_BY_PROVINCE_CODE[code] as PreMergerWard[])];
  },
  byDistrictCode: (districtCode: string) => {
    const code = districtCode.trim();
    if (!Object.hasOwn(PRE_MERGER_WARDS_BY_DISTRICT_CODE, code)) return [];
    return [...(PRE_MERGER_WARDS_BY_DISTRICT_CODE[code] as PreMergerWard[])];
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
