# tinhthanhvn

Zero-dependency lookup for Vietnam's provinces, districts, and wards - both the **current** (post-2025 merger) and **pre-merger** administrative hierarchies, with accent-insensitive search and full TypeScript types.

```ts
import { provinces, wards } from "tinhthanhvn";

provinces.byCode("01"); // { code: "01", name: "Hà Nội", type: "Thành phố" }
wards.search("hanoi"); // fuzzy, accent- and space-insensitive
```

## Table of contents

- [Why](#why)
- [Install](#install)
- [Data model](#data-model)
- [Quick start](#quick-start)
- [Usage](#usage)
  - [Current structure](#current-structure-province--ward)
  - [Pre-merger structure](#pre-merger-structure-province--district--ward)
  - [Search](#search)
- [API reference](#api-reference)
- [Types](#types)
- [Behavior notes](#behavior-notes)
- [Data stats](#data-stats)

## Why

Vietnam's 2025 administrative merger collapsed districts and reduced the number of provinces. This package ships both timelines so address UIs, migrations, and reporting can resolve either era without juggling raw datasets or writing your own diacritic-folding search.

## Install

```bash
npm install tinhthanhvn
```

```bash
bun add tinhthanhvn
```

Works in Node, Bun, and the browser (pure ESM, no runtime dependencies).

## Data model

| Timeline                           | Hierarchy                    | Entry point                            |
| ---------------------------------- | ---------------------------- | -------------------------------------- |
| **Current** (effective 01/07/2025) | `Province → Ward`            | `tinhthanhvn` or `tinhthanhvn/current` |
| **Pre-merger** (before 01/07/2025) | `Province → District → Ward` | `tinhthanhvn/pre`                      |

Pick the entry point that matches the era you need - the default export (`tinhthanhvn`) is an alias for `tinhthanhvn/current`.

## Quick start

```ts
import { provinces, wards } from "tinhthanhvn";

const hanoi = provinces.byCode("01");
const hanoiWards = wards.byProvinceCode("01");

provinces.search("ha noi"); // → [Hà Nội]
```

## Usage

### Current structure (`Province → Ward`)

```ts
import { provinces, wards } from "tinhthanhvn";
// equivalent: import { provinces, wards } from "tinhthanhvn/current";

provinces.all(); // readonly Province[] - all 34 provinces
provinces.byCode("01"); // Province | undefined - Hà Nội
provinces.search("ha no"); // Province[] - accent-insensitive match

wards.byProvinceCode("01"); // readonly Ward[] - wards in Hà Nội
wards.byCode("00004"); // Ward | undefined - Ba Đình
wards.search("ba dinh", { provinceCode: "01" }); // scoped search
```

### Pre-merger structure (`Province → District → Ward`)

```ts
import { provinces, districts, wards } from "tinhthanhvn/pre";

provinces.byCode("01");
districts.byProvinceCode("01"); // readonly PreMergerDistrict[]
wards.byDistrictCode("001"); // readonly PreMergerWard[]

districts.search("cau giay", { provinceCode: "01" });
wards.search("cong vi", { provinceCode: "01" });
wards.search("cong vi", { districtCode: "001" });
```

### Search

`search()` is a fuzzy, diacritic- and whitespace-insensitive substring match, powered by the exported `normalizeVietnamese` helper:

```ts
import { normalizeVietnamese } from "tinhthanhvn";

normalizeVietnamese("Hà Nội"); // → "ha noi"
```

- Matches ignore case and Vietnamese diacritics: `"ha noi"` matches `Hà Nội`.
- Matches also ignore whitespace: `"hanoi"` matches `Hà Nội` just like `"ha noi"` does.
- Source `name` fields are left untouched (official Vietnamese spelling) - this is unaccented _search_, not an English/ASCII display name.
- Blank or whitespace-only queries return `[]` rather than every record.

## API reference

All entry points return readonly, deeply-frozen arrays/objects - safe to store as React state, Redux state, etc. without accidental mutation.

### `tinhthanhvn` / `tinhthanhvn/current`

| Export      | Method                                                       | Returns                 |
| ----------- | ------------------------------------------------------------ | ----------------------- |
| `provinces` | `all()`                                                      | `readonly Province[]`   |
| `provinces` | `byCode(code: string)`                                       | `Province \| undefined` |
| `provinces` | `search(query: string)`                                      | `readonly Province[]`   |
| `wards`     | `all()`                                                      | `readonly Ward[]`       |
| `wards`     | `byProvinceCode(provinceCode: string)`                       | `readonly Ward[]`       |
| `wards`     | `byCode(code: string)`                                       | `Ward \| undefined`     |
| `wards`     | `search(query: string, options?: { provinceCode?: string })` | `readonly Ward[]`       |

### `tinhthanhvn/pre`

| Export      | Method                                                                              | Returns                          |
| ----------- | ----------------------------------------------------------------------------------- | -------------------------------- |
| `provinces` | `all()`                                                                             | `readonly PreMergerProvince[]`   |
| `provinces` | `byCode(code: string)`                                                              | `PreMergerProvince \| undefined` |
| `provinces` | `search(query: string)`                                                             | `readonly PreMergerProvince[]`   |
| `districts` | `all()`                                                                             | `readonly PreMergerDistrict[]`   |
| `districts` | `byProvinceCode(provinceCode: string)`                                              | `readonly PreMergerDistrict[]`   |
| `districts` | `byCode(code: string)`                                                              | `PreMergerDistrict \| undefined` |
| `districts` | `search(query: string, options?: { provinceCode?: string })`                        | `readonly PreMergerDistrict[]`   |
| `wards`     | `all()`                                                                             | `readonly PreMergerWard[]`       |
| `wards`     | `byDistrictCode(districtCode: string)`                                              | `readonly PreMergerWard[]`       |
| `wards`     | `byCode(code: string)`                                                              | `PreMergerWard \| undefined`     |
| `wards`     | `search(query: string, options?: { provinceCode?: string; districtCode?: string })` | `readonly PreMergerWard[]`       |

### Everywhere

| Export                | Signature                   |
| --------------------- | --------------------------- |
| `normalizeVietnamese` | `(input: string) => string` |

## Types

```ts
// tinhthanhvn / tinhthanhvn/current
type ProvinceType = "Thành phố" | "Tỉnh";
type WardType = "Phường" | "Xã" | "Đặc khu";

type Province = { code: string; name: string; type: ProvinceType };
type Ward = {
  code: string;
  name: string;
  type: WardType;
  province_code: string;
};

// tinhthanhvn/pre
type PreMergerProvinceType = ProvinceType;
type PreMergerDistrictType = "Huyện" | "Quận" | "Thành phố" | "Thị xã";
type PreMergerWardType = "Phường" | "Thị trấn" | "Xã";

type PreMergerProvince = {
  code: string;
  name: string;
  type: PreMergerProvinceType;
};
type PreMergerDistrict = {
  code: string;
  name: string;
  type: PreMergerDistrictType;
  province_code: string;
};
type PreMergerWard = {
  code: string;
  name: string;
  type: PreMergerWardType;
  district_code: string;
  province_code: string;
};
```

`code` is the stable, official administrative identifier (e.g. `"01"`, `"00004"`) - use it for lookups, React `key`s, and persistence. Don't rely on array order or `name` for identity.

## Behavior notes

Current data follows [Quyết định số 19/2025/QĐ-TTg](https://congbao.chinhphu.vn/van-ban/quyet-dinh-so-19-2025-qd-ttg-45430.htm) (effective 01/07/2025). "Ward" means a commune-level unit (`Phường` / `Xã` / `Đặc khu`).

- 🧊 All returned lists and objects are deeply frozen - mutating them throws in strict mode / is a silent no-op otherwise.
- ❓ `byCode` / `byProvinceCode` / `byDistrictCode` for an unknown code returns `undefined` (single item) or `[]` (list) - never `null` or a thrown error.
- 🔎 `search` returns `[]` for blank queries; it never returns `undefined`.
- 🚫 No network calls, no filesystem access - everything is static, in-memory data bundled at build time.

## Data stats

| Timeline   | Provinces                 | Districts | Wards                                    |
| ---------- | ------------------------- | --------- | ---------------------------------------- |
| Current    | 34 (6 thành phố, 28 tỉnh) | -         | 3,321 (687 phường, 2,621 xã, 13 đặc khu) |
| Pre-merger | 63                        | 696       | 10,035                                   |

## License

[MIT](LICENSE.md) © [Cuong Nguyen](https://github.com/nguyencongcuong)
