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

- 📌 Current: **34** provinces, **3321** wards (no districts)
- 📌 Pre-merger: **63** provinces, **696** districts, **10035** wards
- 🧊 Returned lists and objects are deeply frozen
- ❓ Missing `byCode` / `byId` → `undefined`; missing group filters → `[]`

## Develop

```bash
bun install
bun test
bun run build
```
