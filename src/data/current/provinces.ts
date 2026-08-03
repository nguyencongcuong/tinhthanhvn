import type { Province } from "../../types";
import { deepFreeze } from "../../utils/deep-freeze";

export const PROVINCES: Province[] = [
  {
    code: "91",
    name: "An Giang",
    province_id: 2,
    type: "Tỉnh",
  },
  {
    code: "24",
    name: "Bắc Ninh",
    province_id: 3,
    type: "Tỉnh",
  },
  {
    code: "96",
    name: "Cà Mau",
    province_id: 4,
    type: "Tỉnh",
  },
  {
    code: "92",
    name: "Cần Thơ",
    province_id: 6,
    type: "Thành phố",
  },
  {
    code: "04",
    name: "Cao Bằng",
    province_id: 5,
    type: "Tỉnh",
  },
  {
    code: "48",
    name: "Đà Nẵng",
    province_id: 7,
    type: "Thành phố",
  },
  {
    code: "66",
    name: "Đắk Lắk",
    province_id: 8,
    type: "Tỉnh",
  },
  {
    code: "11",
    name: "Điện Biên",
    province_id: 9,
    type: "Tỉnh",
  },
  {
    code: "75",
    name: "Đồng Nai",
    province_id: 10,
    type: "Tỉnh",
  },
  {
    code: "82",
    name: "Đồng Tháp",
    province_id: 11,
    type: "Tỉnh",
  },
  {
    code: "52",
    name: "Gia Lai",
    province_id: 12,
    type: "Tỉnh",
  },
  {
    code: "01",
    name: "Hà Nội",
    province_id: 13,
    type: "Thành phố",
  },
  {
    code: "42",
    name: "Hà Tĩnh",
    province_id: 14,
    type: "Tỉnh",
  },
  {
    code: "31",
    name: "Hải Phòng",
    province_id: 15,
    type: "Thành phố",
  },
  {
    code: "79",
    name: "Hồ Chí Minh",
    province_id: 37,
    type: "Thành phố",
  },
  {
    code: "46",
    name: "Huế",
    province_id: 16,
    type: "Thành phố",
  },
  {
    code: "33",
    name: "Hưng Yên",
    province_id: 17,
    type: "Tỉnh",
  },
  {
    code: "56",
    name: "Khánh Hòa",
    province_id: 18,
    type: "Tỉnh",
  },
  {
    code: "12",
    name: "Lai Châu",
    province_id: 19,
    type: "Tỉnh",
  },
  {
    code: "68",
    name: "Lâm Đồng",
    province_id: 22,
    type: "Tỉnh",
  },
  {
    code: "20",
    name: "Lạng Sơn",
    province_id: 20,
    type: "Tỉnh",
  },
  {
    code: "15",
    name: "Lào Cai",
    province_id: 21,
    type: "Tỉnh",
  },
  {
    code: "40",
    name: "Nghệ An",
    province_id: 23,
    type: "Tỉnh",
  },
  {
    code: "37",
    name: "Ninh Bình",
    province_id: 24,
    type: "Tỉnh",
  },
  {
    code: "25",
    name: "Phú Thọ",
    province_id: 25,
    type: "Tỉnh",
  },
  {
    code: "51",
    name: "Quảng Ngãi",
    province_id: 26,
    type: "Tỉnh",
  },
  {
    code: "22",
    name: "Quảng Ninh",
    province_id: 27,
    type: "Tỉnh",
  },
  {
    code: "44",
    name: "Quảng Trị",
    province_id: 28,
    type: "Tỉnh",
  },
  {
    code: "14",
    name: "Sơn La",
    province_id: 29,
    type: "Tỉnh",
  },
  {
    code: "80",
    name: "Tây Ninh",
    province_id: 30,
    type: "Tỉnh",
  },
  {
    code: "19",
    name: "Thái Nguyên",
    province_id: 31,
    type: "Tỉnh",
  },
  {
    code: "38",
    name: "Thanh Hóa",
    province_id: 32,
    type: "Tỉnh",
  },
  {
    code: "08",
    name: "Tuyên Quang",
    province_id: 34,
    type: "Tỉnh",
  },
  {
    code: "86",
    name: "Vĩnh Long",
    province_id: 35,
    type: "Tỉnh",
  },
];

export const PROVINCES_BY_CODE = new Map<string, Province>(PROVINCES.map((province) => [province.code, province]));

export const PROVINCES_BY_ID = new Map<number, Province>(PROVINCES.map((province) => [province.province_id, province]));

deepFreeze(PROVINCES);
deepFreeze(PROVINCES_BY_CODE);
deepFreeze(PROVINCES_BY_ID);
