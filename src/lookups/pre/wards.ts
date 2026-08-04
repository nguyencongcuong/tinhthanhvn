import {
  PRE_MERGER_WARDS,
  PRE_MERGER_WARDS_BY_CODE,
  PRE_MERGER_WARDS_BY_DISTRICT_CODE,
  PRE_MERGER_WARDS_BY_ID,
} from "../../data/pre/wards";
import { EMPTY_ARRAY } from "../../utils/empty";

export const wards = {
  all: () => PRE_MERGER_WARDS,
  byDistrictCode: (districtCode: string) => PRE_MERGER_WARDS_BY_DISTRICT_CODE[districtCode] ?? EMPTY_ARRAY,
  byCode: (code: string) => PRE_MERGER_WARDS_BY_CODE.get(code),
  byId: (id: number) => PRE_MERGER_WARDS_BY_ID.get(id),
};
