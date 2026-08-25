export const COUNTS = {
  provinces: 34,
  preProvinces: 63,
  preDistricts: 696,
  wards: 3321,
  preWards: 10035,
} as const;

export const PROVINCE_HN = {
  code: "01",
  name: "Hà Nội",
  type: "Thành phố",
} as const;

export const PRE_DISTRICT_BA_DINH = {
  code: "001",
  name: "Ba Đình",
  province_code: "01",
  type: "Quận",
} as const;

export const WARD_BA_DINH = {
  code: "00004",
  name: "Ba Đình",
  province_code: "01",
  type: "Phường",
} as const;

export const WARD_NGOC_HA = {
  code: "00008",
  name: "Ngọc Hà",
  province_code: "01",
  type: "Phường",
} as const;

export const PRE_WARD_CONG_VI = {
  code: "00007",
  district_code: "001",
  name: "Cống Vị",
  province_code: "01",
  type: "Phường",
} as const;
