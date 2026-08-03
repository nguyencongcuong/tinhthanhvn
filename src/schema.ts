export type PreMergerProvince = {
  province_id: number;
  code: string;
  name: string;
  type: string;
};

export type PreMergerDistrict = {
  district_id: number;
  code: string;
  name: string;
  type: string;
  province_code: string;
};

export type PreMergerWard = {
  ward_id: number;
  code: string;
  name: string;
  type: string;
  district_code: string;
  province_code: string;
};

export type Province = {
  province_id: number;
  code: string;
  name: string;
  type: string;
};

export type Ward = {
  ward_id: number;
  code: string;
  name: string;
  type: string;
  province_code: string;
};
