import { z } from "zod";

export const PreMergerProvinceS = z
  .object({
    province_id: z.number().positive(),
    code: z.string(),
    name: z.string(),
    type: z.string(),
  })
  .strict();

export const PreMergerDistrictS = z
  .object({
    district_id: z.number().positive(),
    code: z.string(),
    name: z.string(),
    type: z.string(),
    province_code: z.string(),
  })
  .strict();

export const PreMergerWardS = z
  .object({
    ward_id: z.number().positive(),
    code: z.string(),
    name: z.string(),
    type: z.string(),
    district_code: z.string(),
    province_code: z.string(),
  })
  .strict();

export const PostMergerProvinceS = z
  .object({
    province_id: z.number().positive(),
    code: z.string(),
    name: z.string(),
    type: z.string(),
  })
  .strict();

export const PostMergerWardS = z
  .object({
    ward_id: z.number().positive(),
    code: z.string(),
    name: z.string(),
    type: z.string(),
    province_code: z.string(),
  })
  .strict();

export type PreMergerProvince = z.infer<typeof PreMergerProvinceS>;
export type PreMergerDistrict = z.infer<typeof PreMergerDistrictS>;
export type PreMergerWard = z.infer<typeof PreMergerWardS>;

export type PostMergerProvince = z.infer<typeof PostMergerProvinceS>;
export type PostMergerWard = z.infer<typeof PostMergerWardS>;
