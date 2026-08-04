export type ProvinceType = "Thành phố" | "Tỉnh";

export type WardType = "Phường" | "Xã" | "Đặc khu";

export type PreMergerProvinceType = ProvinceType;

export type PreMergerDistrictType = "Huyện" | "Quận" | "Thành phố" | "Thị xã";

export type PreMergerWardType = "Phường" | "Thị trấn" | "Xã";

export type PreMergerProvince = {
  province_id: number;
  code: string;
  name: string;
  type: PreMergerProvinceType;
};

export type PreMergerDistrict = {
  district_id: number;
  code: string;
  name: string;
  type: PreMergerDistrictType;
  province_code: string;
};

export type PreMergerWard = {
  ward_id: number;
  code: string;
  name: string;
  type: PreMergerWardType;
  district_code: string;
  province_code: string;
};

export type Province = {
  province_id: number;
  code: string;
  name: string;
  type: ProvinceType;
};

export type Ward = {
  ward_id: number;
  code: string;
  name: string;
  type: WardType;
  province_code: string;
};
