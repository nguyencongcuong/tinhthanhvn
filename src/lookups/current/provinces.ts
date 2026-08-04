import { PROVINCES, PROVINCES_BY_CODE } from "../../data/current/provinces";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";

const PROVINCE_NAME_INDEX = buildNameSearchIndex(PROVINCES);

export const provinces = {
  all: () => PROVINCES,
  byCode: (code: string) => PROVINCES_BY_CODE.get(code),
  search: (query: string) => searchByName(PROVINCE_NAME_INDEX, query),
};
