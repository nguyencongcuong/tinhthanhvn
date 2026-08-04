import { WARDS, WARDS_BY_CODE, WARDS_BY_PROVINCE_CODE } from "../../data/current/wards";
import { EMPTY_ARRAY } from "../../utils/empty";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";

const WARD_NAME_INDEX = buildNameSearchIndex(WARDS);

export type WardSearchOptions = {
  provinceCode?: string;
};

export const wards = {
  all: () => WARDS,
  byProvinceCode: (provinceCode: string) => WARDS_BY_PROVINCE_CODE[provinceCode.trim()] ?? EMPTY_ARRAY,
  byCode: (code: string) => WARDS_BY_CODE.get(code.trim()),
  search: (query: string, options?: WardSearchOptions) => {
    const provinceCode = options?.provinceCode?.trim();
    return searchByName(
      WARD_NAME_INDEX,
      query,
      provinceCode === undefined ? undefined : (ward) => ward.province_code === provinceCode,
    );
  },
};
