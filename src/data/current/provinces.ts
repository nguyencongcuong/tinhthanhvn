import type { Province } from "../../types";
import { deepFreeze } from "../../utils/deep-freeze";

export const PROVINCES: Province[] = [
  { code: "01", name: "Hà Nội", type: "Thành phố" },
  { code: "04", name: "Cao Bằng", type: "Tỉnh" },
  { code: "08", name: "Tuyên Quang", type: "Tỉnh" },
  { code: "11", name: "Điện Biên", type: "Tỉnh" },
  { code: "12", name: "Lai Châu", type: "Tỉnh" },
  { code: "14", name: "Sơn La", type: "Tỉnh" },
  { code: "15", name: "Lào Cai", type: "Tỉnh" },
  { code: "19", name: "Thái Nguyên", type: "Tỉnh" },
  { code: "20", name: "Lạng Sơn", type: "Tỉnh" },
  { code: "22", name: "Quảng Ninh", type: "Tỉnh" },
  { code: "24", name: "Bắc Ninh", type: "Tỉnh" },
  { code: "25", name: "Phú Thọ", type: "Tỉnh" },
  { code: "31", name: "Hải Phòng", type: "Thành phố" },
  { code: "33", name: "Hưng Yên", type: "Tỉnh" },
  { code: "37", name: "Ninh Bình", type: "Tỉnh" },
  { code: "38", name: "Thanh Hóa", type: "Tỉnh" },
  { code: "40", name: "Nghệ An", type: "Tỉnh" },
  { code: "42", name: "Hà Tĩnh", type: "Tỉnh" },
  { code: "44", name: "Quảng Trị", type: "Tỉnh" },
  { code: "46", name: "Huế", type: "Thành phố" },
  { code: "48", name: "Đà Nẵng", type: "Thành phố" },
  { code: "51", name: "Quảng Ngãi", type: "Tỉnh" },
  { code: "52", name: "Gia Lai", type: "Tỉnh" },
  { code: "56", name: "Khánh Hòa", type: "Tỉnh" },
  { code: "66", name: "Đắk Lắk", type: "Tỉnh" },
  { code: "68", name: "Lâm Đồng", type: "Tỉnh" },
  { code: "75", name: "Đồng Nai", type: "Tỉnh" },
  { code: "79", name: "Hồ Chí Minh", type: "Thành phố" },
  { code: "80", name: "Tây Ninh", type: "Tỉnh" },
  { code: "82", name: "Đồng Tháp", type: "Tỉnh" },
  { code: "86", name: "Vĩnh Long", type: "Tỉnh" },
  { code: "91", name: "An Giang", type: "Tỉnh" },
  { code: "92", name: "Cần Thơ", type: "Thành phố" },
  { code: "96", name: "Cà Mau", type: "Tỉnh" },
];

export const PROVINCES_BY_CODE = new Map<string, Province>(PROVINCES.map((province) => [province.code, province]));

deepFreeze(PROVINCES);
deepFreeze(PROVINCES_BY_CODE);
