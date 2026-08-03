# tinhthanhvn

Lookup Vietnam provinces, districts, and wards before and after the 2025 administrative merger.

## Install

```bash
bun add tinhthanhvn
```

## Usage

```ts
import { provinces, districts, wards } from "tinhthanhvn";

provinces.all();
provinces.byCode("01");
provinces.pre.byCode("01");

districts.pre.byProvinceCode("01");

wards.byProvinceCode("01");
wards.pre.byDistrictCode("001");
```

## Develop

```bash
bun install
bun run build
bun test
```
