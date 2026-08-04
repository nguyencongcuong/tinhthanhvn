import { PROVINCES, PROVINCES_BY_CODE, PROVINCES_BY_ID } from "../../data/current/provinces";

export const provinces = {
  all: () => PROVINCES,
  byCode: (code: string) => PROVINCES_BY_CODE.get(code),
  byId: (id: number) => PROVINCES_BY_ID.get(id),
};
