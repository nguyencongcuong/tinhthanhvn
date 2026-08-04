import { PRE_MERGER_WARDS, PRE_MERGER_WARDS_BY_CODE, PRE_MERGER_WARDS_BY_DISTRICT_CODE } from "../../data/pre/wards";
import { EMPTY_ARRAY } from "../../utils/empty";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";

const PRE_MERGER_WARD_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_WARDS);

export type PreWardSearchOptions = {
  provinceCode?: string;
  districtCode?: string;
};

export const wards = {
  all: () => PRE_MERGER_WARDS,
  byDistrictCode: (districtCode: string) => PRE_MERGER_WARDS_BY_DISTRICT_CODE[districtCode.trim()] ?? EMPTY_ARRAY,
  byCode: (code: string) => PRE_MERGER_WARDS_BY_CODE.get(code.trim()),
  search: (query: string, options?: PreWardSearchOptions) => {
    const provinceCode = options?.provinceCode?.trim();
    const districtCode = options?.districtCode?.trim();
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
