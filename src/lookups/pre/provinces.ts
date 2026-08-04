import { PRE_MERGER_PROVINCES, PRE_MERGER_PROVINCES_BY_CODE } from "../../data/pre/provinces";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";

const PRE_MERGER_PROVINCE_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_PROVINCES);

export const provinces = {
  all: () => PRE_MERGER_PROVINCES,
  byCode: (code: string) => PRE_MERGER_PROVINCES_BY_CODE.get(code),
  search: (query: string) => searchByName(PRE_MERGER_PROVINCE_NAME_INDEX, query),
};
