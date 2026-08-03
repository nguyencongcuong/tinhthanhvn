import { POST_MERGER_WARDS, POST_MERGER_WARDS_BY_CODE, POST_MERGER_WARDS_BY_ID, POST_MERGER_WARDS_BY_NAME, POST_MERGER_WARDS_BY_PROVINCE_CODE } from "../data/post-merger-wards";
import { PRE_MERGER_WARDS, PRE_MERGER_WARDS_BY_CODE, PRE_MERGER_WARDS_BY_ID, PRE_MERGER_WARDS_BY_NAME } from "../data/pre-merger-wards";

export const wards = {
    all: () => POST_MERGER_WARDS,
    byProvinceCode: (provinceCode: string) => POST_MERGER_WARDS_BY_PROVINCE_CODE[provinceCode] || [],
    byCode: (code: string) => POST_MERGER_WARDS_BY_CODE.get(code),
    byId: (id: number) => POST_MERGER_WARDS_BY_ID.get(id),
    byName: (name: string) => POST_MERGER_WARDS_BY_NAME.get(name),

    pre: {
        all: () => PRE_MERGER_WARDS,
        byCode: (code: string) => PRE_MERGER_WARDS_BY_CODE.get(code),
        byId: (id: number) => PRE_MERGER_WARDS_BY_ID.get(id),
        byName: (name: string) => PRE_MERGER_WARDS_BY_NAME.get(name),
    }
}
