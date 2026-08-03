import { POST_MERGER_WARDS, POST_MERGER_WARDS_BY_CODE, POST_MERGER_WARDS_BY_ID, POST_MERGER_WARDS_BY_NAME, POST_MERGER_WARDS_BY_PROVINCE_CODE } from "../data/post-merger-wards";

export const wards = {
    all: () => POST_MERGER_WARDS,
    byProvinceCode: (provinceCode: string) => POST_MERGER_WARDS_BY_PROVINCE_CODE[provinceCode] || [],
    byCode: (code: string) => POST_MERGER_WARDS_BY_CODE.get(code),
    byId: (id: number) => POST_MERGER_WARDS_BY_ID.get(id),
    byName: (name: string) => POST_MERGER_WARDS_BY_NAME.get(name),
}
