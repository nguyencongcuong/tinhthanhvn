# tinhthanhvn

Lookup Vietnam provinces, districts, and wards before and after the 2025 administrative merger.

## Install

```bash
bun add tinhthanhvn
```

## Usage

Top-level methods use the **post-2025 merger** data (34 provinces, province → ward).
`.pre` methods use the **pre-merger** hierarchy (63 provinces → districts → wards).

```ts
import { provinces, districts, wards } from "tinhthanhvn";
import type {
  PostMergerProvince,
  PostMergerWard,
  PreMergerDistrict,
  PreMergerProvince,
  PreMergerWard,
} from "tinhthanhvn";

// Post-merger
const allProvinces: PostMergerProvince[] = provinces.all();
const haNoi = provinces.byCode("01"); // { code, name, province_id, type } | undefined
const haNoiById = provinces.byId(13);

const wardsInHaNoi: PostMergerWard[] = wards.byProvinceCode("01");
const ward = wards.byCode("00004"); // | undefined
wards.byId(3);

// Pre-merger
const oldProvinces: PreMergerProvince[] = provinces.pre.all();
provinces.pre.byCode("01");
provinces.pre.byId(1);

const districtsInHaNoi: PreMergerDistrict[] =
  districts.pre.byProvinceCode("01");
districts.pre.byCode("001");
districts.pre.byId(1);
districts.pre.all();

const oldWardsInBaDinh: PreMergerWard[] = wards.pre.byDistrictCode("001");
wards.pre.byCode("00007");
wards.pre.byId(4);
wards.pre.all();

// Missing lookups
provinces.byCode("00"); // undefined
districts.pre.byProvinceCode("00"); // [] (frozen shared empty array)
wards.byProvinceCode("00"); // []
```

Returned lists and objects are deeply frozen. There are no post-merger districts — that level was removed in the 2025 merger.

## Develop

```bash
bun install
bun run build
bun test
```
