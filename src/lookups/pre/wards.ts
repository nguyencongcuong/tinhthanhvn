import { PRE_MERGER_WARDS, PRE_MERGER_WARDS_BY_CODE, PRE_MERGER_WARDS_BY_DISTRICT_CODE } from "../../data/pre/wards";
import { EMPTY_ARRAY } from "../../utils/empty";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";

const PRE_MERGER_WARD_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_WARDS);

export type PreWardSearchOptions = {
  districtCode?: string;
};

export const wards = {
  all: () => PRE_MERGER_WARDS,
  byDistrictCode: (districtCode: string) => PRE_MERGER_WARDS_BY_DISTRICT_CODE[districtCode.trim()] ?? EMPTY_ARRAY,
  byCode: (code: string) => PRE_MERGER_WARDS_BY_CODE.get(code.trim()),
  search: (query: string, options?: PreWardSearchOptions) => {
    const districtCode = options?.districtCode?.trim();
    return searchByName(
      PRE_MERGER_WARD_NAME_INDEX,
      query,
      districtCode === undefined ? undefined : (ward) => ward.district_code === districtCode,
    );
  },
};
