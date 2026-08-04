import {
  PRE_MERGER_DISTRICTS,
  PRE_MERGER_DISTRICTS_BY_CODE,
  PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE,
} from "../../data/pre/districts";
import { EMPTY_ARRAY } from "../../utils/empty";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";

const PRE_MERGER_DISTRICT_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_DISTRICTS);

export type DistrictSearchOptions = {
  provinceCode?: string;
};

export const districts = {
  all: () => PRE_MERGER_DISTRICTS,
  byProvinceCode: (provinceCode: string) => PRE_MERGER_DISTRICTS_BY_PROVINCE_CODE[provinceCode.trim()] ?? EMPTY_ARRAY,
  byCode: (code: string) => PRE_MERGER_DISTRICTS_BY_CODE.get(code.trim()),
  search: (query: string, options?: DistrictSearchOptions) => {
    const provinceCode = options?.provinceCode?.trim();
    return searchByName(
      PRE_MERGER_DISTRICT_NAME_INDEX,
      query,
      provinceCode === undefined ? undefined : (district) => district.province_code === provinceCode,
    );
  },
};
