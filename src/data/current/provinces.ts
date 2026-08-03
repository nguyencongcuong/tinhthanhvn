import type { Province } from "../../types";
import { deepFreeze } from "../../utils/deep-freeze";

export const PROVINCES: Province[] = [
  { province_id: 1, code: "01", name: "Hà Nội", type: "Thành phố" },
  { province_id: 2, code: "04", name: "Cao Bằng", type: "Tỉnh" },
  { province_id: 3, code: "08", name: "Tuyên Quang", type: "Tỉnh" },
  { province_id: 4, code: "11", name: "Điện Biên", type: "Tỉnh" },
  { province_id: 5, code: "12", name: "Lai Châu", type: "Tỉnh" },
  { province_id: 6, code: "14", name: "Sơn La", type: "Tỉnh" },
  { province_id: 7, code: "15", name: "Lào Cai", type: "Tỉnh" },
  { province_id: 8, code: "19", name: "Thái Nguyên", type: "Tỉnh" },
  { province_id: 9, code: "20", name: "Lạng Sơn", type: "Tỉnh" },
  { province_id: 10, code: "22", name: "Quảng Ninh", type: "Tỉnh" },
  { province_id: 11, code: "24", name: "Bắc Ninh", type: "Tỉnh" },
  { province_id: 12, code: "25", name: "Phú Thọ", type: "Tỉnh" },
  { province_id: 13, code: "31", name: "Hải Phòng", type: "Thành phố" },
  { province_id: 14, code: "33", name: "Hưng Yên", type: "Tỉnh" },
  { province_id: 15, code: "37", name: "Ninh Bình", type: "Tỉnh" },
  { province_id: 16, code: "38", name: "Thanh Hóa", type: "Tỉnh" },
  { province_id: 17, code: "40", name: "Nghệ An", type: "Tỉnh" },
  { province_id: 18, code: "42", name: "Hà Tĩnh", type: "Tỉnh" },
  { province_id: 19, code: "44", name: "Quảng Trị", type: "Tỉnh" },
  { province_id: 20, code: "46", name: "Huế", type: "Thành phố" },
  { province_id: 21, code: "48", name: "Đà Nẵng", type: "Thành phố" },
  { province_id: 22, code: "51", name: "Quảng Ngãi", type: "Tỉnh" },
  { province_id: 23, code: "52", name: "Gia Lai", type: "Tỉnh" },
  { province_id: 24, code: "56", name: "Khánh Hòa", type: "Tỉnh" },
  { province_id: 25, code: "66", name: "Đắk Lắk", type: "Tỉnh" },
  { province_id: 26, code: "68", name: "Lâm Đồng", type: "Tỉnh" },
  { province_id: 27, code: "75", name: "Đồng Nai", type: "Tỉnh" },
  { province_id: 28, code: "79", name: "Hồ Chí Minh", type: "Thành phố" },
  { province_id: 29, code: "80", name: "Tây Ninh", type: "Tỉnh" },
  { province_id: 30, code: "82", name: "Đồng Tháp", type: "Tỉnh" },
  { province_id: 31, code: "86", name: "Vĩnh Long", type: "Tỉnh" },
  { province_id: 32, code: "91", name: "An Giang", type: "Tỉnh" },
  { province_id: 33, code: "92", name: "Cần Thơ", type: "Thành phố" },
  { province_id: 34, code: "96", name: "Cà Mau", type: "Tỉnh" },
];

export const PROVINCES_BY_CODE = new Map<string, Province>(PROVINCES.map((province) => [province.code, province]));

export const PROVINCES_BY_ID = new Map<number, Province>(PROVINCES.map((province) => [province.province_id, province]));

deepFreeze(PROVINCES);
deepFreeze(PROVINCES_BY_CODE);
deepFreeze(PROVINCES_BY_ID);
