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
