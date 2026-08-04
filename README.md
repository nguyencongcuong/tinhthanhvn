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

Top-level APIs use **current** data (province → ward). Use `.pre` for the **pre-merger** hierarchy (province → district → ward).

```ts
import { provinces, wards, districts } from "tinhthanhvn";

provinces.byCode("01"); // Hà Nội
wards.byProvinceCode("01");

provinces.pre.byCode("01");
districts.pre.byProvinceCode("01");
wards.pre.byDistrictCode("001");
```

## API

| Export      | Methods                                                                                       |
| ----------- | --------------------------------------------------------------------------------------------- |
| `provinces` | `all`, `byCode`, `byId` · `.pre` same                                                         |
| `wards`     | `all`, `byProvinceCode`, `byCode`, `byId` · `.pre`: `all`, `byDistrictCode`, `byCode`, `byId` |
| `districts` | `.pre` only: `all`, `byProvinceCode`, `byCode`, `byId`                                        |

Types: `Province`, `Ward`, `PreMergerProvince`, `PreMergerDistrict`, `PreMergerWard`.

## Notes

Current data follows [Quyết định số 19/2025/QĐ-TTg](https://congbao.chinhphu.vn/van-ban/quyet-dinh-so-19-2025-qd-ttg-45430.htm) (effective 01/07/2025). Here “ward” means a commune-level unit (`Phường` / `Xã` / `Đặc khu`).

- 📌 Current: **34** provinces (**6** thành phố, **28** tỉnh), **3321** wards (**687** phường, **2621** xã, **13** đặc khu) — no districts
- 📌 Pre-merger: **63** provinces, **696** districts, **10035** wards
- 🧊 Returned lists and objects are deeply frozen
- ❓ Missing `byCode` / `byId` → `undefined`; missing group filters → `[]`

## Develop

```bash
bun install
bun test
bun run build
```
