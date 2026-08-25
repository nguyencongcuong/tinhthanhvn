export type ProvinceType = "Thành phố" | "Tỉnh";

export type WardType = "Phường" | "Xã" | "Đặc khu";

export type PreMergerProvinceType = ProvinceType;

export type PreMergerDistrictType = "Huyện" | "Quận" | "Thành phố" | "Thị xã";

export type PreMergerWardType = "Phường" | "Thị trấn" | "Xã";

export type PreMergerProvince = {
  code: string;
  name: string;
  type: PreMergerProvinceType;
};

export type PreMergerDistrict = {
  code: string;
  name: string;
  type: PreMergerDistrictType;
  province_code: string;
};

export type PreMergerWard = {
  code: string;
  name: string;
  type: PreMergerWardType;
  district_code: string;
  province_code: string;
};

export type Province = {
  code: string;
  name: string;
  type: ProvinceType;
};

export type Ward = {
  code: string;
  name: string;
  type: WardType;
  province_code: string;
};

/**
 * Maps a pre-merger ward code to the current ward code it was folded into by
 * the 2025 merger. Total over every pre-merger ward code, including wards
 * whose boundaries didn't change — for those, `old_ward_code === new_ward_code`.
 */
export type WardMerge = {
  old_ward_code: string;
  new_ward_code: string;
};
