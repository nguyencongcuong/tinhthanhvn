export const COUNTS = {
  postProvinces: 34,
  preProvinces: 63,
  preDistricts: 696,
  postWards: 3321,
  preWards: 10035,
} as const;

export const POST_PROVINCE_HN = {
  code: "01",
  name: "Hà Nội",
  province_id: 13,
  type: "Thành phố",
} as const;

export const PRE_DISTRICT_BA_DINH = {
  code: "001",
  district_id: 1,
  name: "Ba Đình",
  province_code: "01",
  type: "Quận",
} as const;

export const POST_WARD_BA_DINH = {
  code: "00004",
  name: "Ba Đình",
  province_code: "01",
  type: "Phường",
  ward_id: 3,
} as const;

export const PRE_WARD_CONG_VI = {
  code: "00007",
  district_code: "001",
  name: "Cống Vị",
  province_code: "01",
  type: "Phường",
  ward_id: 4,
} as const;
