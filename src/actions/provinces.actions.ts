import { POST_MERGER_PROVINCES, POST_MERGER_PROVINCES_BY_CODE, POST_MERGER_PROVINCES_BY_ID, POST_MERGER_PROVINCES_BY_NAME } from "../data/post-merger-provinces";

export const provinces = {
    all: () => POST_MERGER_PROVINCES,
    byCode: (code: string) => POST_MERGER_PROVINCES_BY_CODE.get(code),
    byId: (id: number) => POST_MERGER_PROVINCES_BY_ID.get(id),
    byName: (name: string) => POST_MERGER_PROVINCES_BY_NAME.get(name),
}