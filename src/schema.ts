import { z } from "zod"

export const PostMergerProvinceS = z.object({
  province_id: z.number().positive(),
  code: z.string(),
  name: z.string(),
  type: z.string(),
}).strict()

export const PostMergerWardS = z.object({
  ward_id: z.number().positive(),
  code: z.string(),
  name: z.string(),
  type: z.string(),
  province_code: z.string(),
}).strict()

export type PostMergerProvince = z.infer<typeof PostMergerProvinceS>
export type PostMergerWard = z.infer<typeof PostMergerWardS>