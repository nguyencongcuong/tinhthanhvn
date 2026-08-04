import { PROVINCES, PROVINCES_BY_CODE } from "../../data/current/provinces";

export const provinces = {
  all: () => PROVINCES,
  byCode: (code: string) => PROVINCES_BY_CODE.get(code),
};
