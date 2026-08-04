# tinhthanhvn

Lookup Vietnam provinces, districts, and wards — current (post-2025 merger) and pre-merger.

## Why

Vietnam’s 2025 administrative merger collapsed districts and reduced provinces. This package ships both timelines so address UIs and migrations can resolve either era without juggling raw datasets.

## Install

```bash
npm install tinhthanhvn
```

```bash
bun add tinhthanhvn
```

## Usage

Default and `tinhthanhvn/current` use **current** data (province → ward). Import `tinhthanhvn/pre` for the **pre-merger** hierarchy (province → district → ward).

```ts
import { provinces, wards } from "tinhthanhvn";
// or: import { provinces, wards } from "tinhthanhvn/current";

provinces.byCode("01"); // Hà Nội
wards.byProvinceCode("01");
```

```ts
import { provinces, districts, wards } from "tinhthanhvn/pre";

provinces.byCode("01");
districts.byProvinceCode("01");
wards.byDistrictCode("001");
```

## API

| Entry             | Export      | Methods                           |
| ----------------- | ----------- | --------------------------------- |
| `.` / `./current` | `provinces` | `all`, `byCode`                   |
| `.` / `./current` | `wards`     | `all`, `byProvinceCode`, `byCode` |
| `./pre`           | `provinces` | `all`, `byCode`                   |
| `./pre`           | `districts` | `all`, `byProvinceCode`, `byCode` |
| `./pre`           | `wards`     | `all`, `byDistrictCode`, `byCode` |

Types: `Province`, `Ward`, `ProvinceType`, `WardType` from `.` / `./current`; `PreMergerProvince`, `PreMergerDistrict`, `PreMergerWard`, `PreMergerProvinceType`, `PreMergerDistrictType`, `PreMergerWardType` from `./pre`.

Stable identity is the official administrative `code` (e.g. `"01"`, `"00004"`). Use it for lookups, React keys, and persistence.

## Notes

Current data follows [Quyết định số 19/2025/QĐ-TTg](https://congbao.chinhphu.vn/van-ban/quyet-dinh-so-19-2025-qd-ttg-45430.htm) (effective 01/07/2025). Here “ward” means a commune-level unit (`Phường` / `Xã` / `Đặc khu`).

- 📌 Current: **34** provinces (**6** thành phố, **28** tỉnh), **3321** wards (**687** phường, **2621** xã, **13** đặc khu) — no districts
- 📌 Pre-merger: **63** provinces, **696** districts, **10035** wards
- 🧊 Returned lists and objects are deeply frozen
- ❓ Missing `byCode` → `undefined`; missing group filters → `[]`

## Develop

```bash
bun install
bun test
bun run build
```
