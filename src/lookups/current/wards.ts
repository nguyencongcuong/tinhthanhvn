import { WARDS, WARDS_BY_CODE, WARDS_BY_PROVINCE_CODE } from "../../data/current/wards";
import { EMPTY_ARRAY } from "../../utils/empty";

export const wards = {
  all: () => WARDS,
  byProvinceCode: (provinceCode: string) => WARDS_BY_PROVINCE_CODE[provinceCode] ?? EMPTY_ARRAY,
  byCode: (code: string) => WARDS_BY_CODE.get(code),
};
