import { PRE_MERGER_PROVINCES, PRE_MERGER_PROVINCES_BY_CODE } from "../../data/pre/provinces";
import { buildNameSearchIndex, searchByName } from "../../utils/search-by-name";
import { districts } from "./districts";
import { wards } from "./wards";

const PRE_MERGER_PROVINCE_NAME_INDEX = buildNameSearchIndex(PRE_MERGER_PROVINCES);

export const provinces = {
  all: () => [...PRE_MERGER_PROVINCES],
  byCode: (code: string) => PRE_MERGER_PROVINCES_BY_CODE.get(code.trim()),
  byDistrictCode: (districtCode: string) => {
    const district = districts.byCode(districtCode);
    return district === undefined ? undefined : PRE_MERGER_PROVINCES_BY_CODE.get(district.province_code);
  },
  byWardCode: (wardCode: string) => {
    const ward = wards.byCode(wardCode);
    return ward === undefined ? undefined : PRE_MERGER_PROVINCES_BY_CODE.get(ward.province_code);
  },
  search: (query: string) => searchByName(PRE_MERGER_PROVINCE_NAME_INDEX, query),
};
