# tinhthanhvn

Zero-dependency lookup for Vietnam provinces, districts, and wards — **current** (post-2025 merger) and **pre-merger** hierarchies. Accent-insensitive search, full TypeScript types. Works in Node, Bun, and browsers.

```bash
npm install tinhthanhvn
```

```ts
import { provinces, wards } from "tinhthanhvn";

provinces.byCode("01"); // Hà Nội
provinces.byWardCode("00004"); // parent province of ward Ba Đình
wards.byProvinceCode("01"); // wards in Hà Nội
provinces.search("hanoi"); // accent- & space-insensitive
```

## Entry points

| Import                                 | Hierarchy                  | When             |
| -------------------------------------- | -------------------------- | ---------------- |
| `tinhthanhvn` or `tinhthanhvn/current` | Province → Ward            | After 01/07/2025 |
| `tinhthanhvn/pre`                      | Province → District → Ward | Before merger    |

## Current (`tinhthanhvn`)

```ts
import { provinces, wards } from "tinhthanhvn";

provinces.all();
provinces.byCode("01");
provinces.byWardCode("00004");
provinces.search("ha noi");

wards.all();
wards.byCode("00004");
wards.byProvinceCode("01");
wards.search("ba dinh", { provinceCode: "01" });
```

## Pre-merger (`tinhthanhvn/pre`)

```ts
import { provinces, districts, wards } from "tinhthanhvn/pre";

provinces.all();
provinces.byCode("01");
provinces.byDistrictCode("001");
provinces.byWardCode("00007");
provinces.search("ha noi");

districts.all();
districts.byProvinceCode("01");
districts.byCode("001");
districts.byWardCode("00007");
districts.search("cau giay", { provinceCode: "01" });

wards.all();
wards.byProvinceCode("01");
wards.byDistrictCode("001");
wards.byCode("00007");
wards.search("cong vi", { provinceCode: "01", districtCode: "001" });
```

## Search

`search()` matches substrings without caring about diacritics or spaces. Blank queries return `[]`.

```ts
provinces.search("hanoi"); // matches Hà Nội
provinces.search("ha noi"); // same result
```

## Notes

- Look up by `code` (e.g. `"01"`, `"00004"`) — not by name or array order.
- Unknown codes → `undefined` (single lookup) or `[]` (lists). No throws.
- `all()`, scoped lists, and `search()` return a new array each call; sort yourself when order matters.

## License

[MIT](LICENSE.md) © [Cuong Nguyen](https://github.com/nguyencongcuong)

## Legal References

The ward-level (commune-level) merger behind the post-2025 `current` hierarchy in this package is defined by 34 separate resolutions of the Standing Committee of the National Assembly (Uy ban Thuong vu Quoc hoi), one per new province/city, all issued 2025-06-18. Each resolution's appendix lists exactly which old wards/communes merged into which new ward. Signed PDF originals below are hosted on the Government e-Portal (chinhphu.vn).

| No. | Resolution | Province / City | PDF |
| --- | --- | --- | --- |
| 1 | 1654/NQ-UBTVQH15 | An Giang | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1654-nq.signed.pdf) |
| 2 | 1655/NQ-UBTVQH15 | Ca Mau | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1655-nq.signed.pdf) |
| 3 | 1656/NQ-UBTVQH15 | Ha Noi | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1656-nq.signed.pdf) |
| 4 | 1657/NQ-UBTVQH15 | Cao Bang | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1657-nq.signed.pdf) |
| 5 | 1658/NQ-UBTVQH15 | Bac Ninh | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1658-nq.signed.pdf) |
| 6 | 1659/NQ-UBTVQH15 | Da Nang | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1659-nq.signed.pdf) |
| 7 | 1660/NQ-UBTVQH15 | Dak Lak | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1660-nq.signed.pdf) |
| 8 | 1661/NQ-UBTVQH15 | Dien Bien | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1661-nq.signed.pdf) |
| 9 | 1662/NQ-UBTVQH15 | Dong Nai | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1662-nq.signed.pdf) |
| 10 | 1663/NQ-UBTVQH15 | Dong Thap | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1663-nq.signed.pdf) |
| 11 | 1664/NQ-UBTVQH15 | Gia Lai | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1664-nq.signed.pdf) |
| 12 | 1665/NQ-UBTVQH15 | Ha Tinh | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1665-nq.signed.pdf) |
| 13 | 1666/NQ-UBTVQH15 | Hung Yen | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1666-nq.signed.pdf) |
| 14 | 1667/NQ-UBTVQH15 | Khanh Hoa | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1667-nq.signed.pdf) |
| 15 | 1668/NQ-UBTVQH15 | Can Tho | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1668-nq.signed.pdf) |
| 16 | 1669/NQ-UBTVQH15 | Hai Phong | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1669-nq.signed.pdf) |
| 17 | 1670/NQ-UBTVQH15 | Lai Chau | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1670-nq.signed.pdf) |
| 18 | 1671/NQ-UBTVQH15 | Lam Dong | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1671-nq.signed.pdf) |
| 19 | 1672/NQ-UBTVQH15 | Lang Son | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1672-nq.signed.pdf) |
| 20 | 1673/NQ-UBTVQH15 | Lao Cai | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1673-nq.signed.pdf) |
| 21 | 1674/NQ-UBTVQH15 | Ninh Binh | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1674-nq.signed.pdf) |
| 22 | 1675/NQ-UBTVQH15 | Hue | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1675-nq.signed.pdf) |
| 23 | 1676/NQ-UBTVQH15 | Phu Tho | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1676-nq.signed.pdf) |
| 24 | 1677/NQ-UBTVQH15 | Quang Ngai | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1677-nq.signed.pdf) |
| 25 | 1678/NQ-UBTVQH15 | Nghe An | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1678-nq.signed.pdf) |
| 26 | 1679/NQ-UBTVQH15 | Quang Ninh | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1679-nq.signed.pdf) |
| 27 | 1680/NQ-UBTVQH15 | Quang Tri | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1680-nq.signed.pdf) |
| 28 | 1681/NQ-UBTVQH15 | Son La | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1681-nq.signed.pdf) |
| 29 | 1682/NQ-UBTVQH15 | Tay Ninh | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1682-nq.signed.pdf) |
| 30 | 1683/NQ-UBTVQH15 | Thai Nguyen | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1683-nq.signed.pdf) |
| 31 | 1684/NQ-UBTVQH15 | Tuyen Quang | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1684-nq.signed.pdf) |
| 32 | 1685/NQ-UBTVQH15 | Ho Chi Minh City | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1685-nq.signed.pdf) |
| 33 | 1686/NQ-UBTVQH15 | Thanh Hoa | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1686-nq.signed.pdf) |
| 34 | 1687/NQ-UBTVQH15 | Vinh Long | [PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2025/6/1687-nq.signed.pdf) |
