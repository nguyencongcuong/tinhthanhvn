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
