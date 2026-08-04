import { WARDS, WARDS_BY_CODE, WARDS_BY_PROVINCE_CODE } from "../../data/current/wards";
import { EMPTY_ARRAY } from "../../utils/empty";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";

const WARD_NAME_INDEX = buildNameSearchIndex(WARDS);

export type WardSearchOptions = {
  provinceCode?: string;
};

export const wards = {
  all: () => WARDS,
  byProvinceCode: (provinceCode: string) => WARDS_BY_PROVINCE_CODE[provinceCode] ?? EMPTY_ARRAY,
  byCode: (code: string) => WARDS_BY_CODE.get(code),
  search: (query: string, options?: WardSearchOptions) =>
    searchByName(
      WARD_NAME_INDEX,
      query,
      options?.provinceCode === undefined ? undefined : (ward) => ward.province_code === options.provinceCode,
    ),
};
