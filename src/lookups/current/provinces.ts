import { PROVINCES, PROVINCES_BY_CODE } from "../../data/current/provinces";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";
import { wards } from "./wards";

const PROVINCE_NAME_INDEX = buildNameSearchIndex(PROVINCES);

export const provinces = {
  all: () => PROVINCES,
  byCode: (code: string) => PROVINCES_BY_CODE.get(code.trim()),
  byWardCode: (wardCode: string) => {
    const ward = wards.byCode(wardCode);
    return ward === undefined ? undefined : PROVINCES_BY_CODE.get(ward.province_code);
  },
  search: (query: string) => searchByName(PROVINCE_NAME_INDEX, query),
};
