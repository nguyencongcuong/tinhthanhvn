# tinhthanhvn

## 3.0.5

### Patch Changes

- [`b6bb022`](https://github.com/nguyencongcuong/tinhthanhvn/commit/b6bb0222af6bc5f5e84972939f33a1dd453e025c) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix current ward `20458` (Tây Giang, Đà Nẵng): the name was misspelled `"A vương"` (lowercase v); it should be `"A Vương"`.

- [`b6bb022`](https://github.com/nguyencongcuong/tinhthanhvn/commit/b6bb0222af6bc5f5e84972939f33a1dd453e025c) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix current ward `20364` (Phú Ninh, Đà Nẵng): the name was misspelled `"Chiến Đàn"` (extra sắc tone mark); the official Đà Nẵng city portal and the ward's own merger resolution spell it `"Chiên Đàn"`.

- [`efc61ba`](https://github.com/nguyencongcuong/tinhthanhvn/commit/efc61baf8182930329795310b7792f43f897d9a4) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix `tinhthanhvn/pre` ward `00679` (Đại Áng, Thanh Trì, Hà Nội) from `"Đại áng"` to `"Đại Áng"` — the second syllable's capital was lowercased. Exact-name lookups against this ward now match the official spelling.

- [`c829ae3`](https://github.com/nguyencongcuong/tinhthanhvn/commit/c829ae39d73788c47ceb528f2e30d3c08133d277) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix five current-ward names in Đắk Lắk: `"Ea H'Leo"` → `"Ea H'leo"`, `"M’Drắk"` → `"M'Đrắk"`, and curly apostrophes on `"Cư M'gar"`, `"Ea M'Droh"`, and `"Cư M'ta"` (straight `'` so exact-name lookups match the rest of the dataset).

- [`01c5041`](https://github.com/nguyencongcuong/tinhthanhvn/commit/01c5041fe070865d6d93adb8ad18d3b0f2438829) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix misspelled pre-merger ward names in old Đắk Lắk and Phú Yên, found while transcribing resolution 1660/NQ-UBTVQH15. Some are strongly evidenced — a second, independent spelling of the same code already exists in `current/wards.ts` or elsewhere in `pre/wards.ts` (e.g. `"KRông Búk"` → `"Krông Búk"`, `"Ea Knuếc"`, `"Cuôr Đăng"`, `"Dliê Ya"`, `"Ia Rvê"`) or a curly apostrophe (`’`) silently broke exact-name lookups (`"Ea M'Droh"`); one thị trấn had "Thị Trấn" baked into its `name` instead of living in `type` (`"Thị Trấn Phú Hòa"` → `"Phú Hòa"`). The remaining fixes rest only on matching the resolution text's own rendering — see `src/data/resolutions/CHECKLIST.md` → "Notes from resolution 1660" for the full per-code breakdown by evidence tier.

- [`01c5041`](https://github.com/nguyencongcuong/tinhthanhvn/commit/01c5041fe070865d6d93adb8ad18d3b0f2438829) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix two pre-merger ward name quirks in `pre/wards.ts`, both in old Bình Phước: code `25225` was misspelled `"Đak Ơ"` (missing the breve on the ă), and code `26119` was misspelled `"Dak Lua"` (missing the stroke on the Đ); `current/wards.ts` already had the correct spellings, `"Đăk Ơ"` and `"Đak Lua"`, on the same codes.

- [`03be850`](https://github.com/nguyencongcuong/tinhthanhvn/commit/03be8500dd7a9cb769c8029491abe9e6b42d1f8d) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix two current-ward names in Gia Lai caused by an l/I confusion: `"la Băng"` → `"Ia Băng"` (`23710`) and `"AI Bá"` → `"Al Bá"` (`23954`).

- [`6d06969`](https://github.com/nguyencongcuong/tinhthanhvn/commit/6d06969c45e4c014833f6acdc13e16d1382dba99) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix five pre-merger ward/district name quirks in Gia Lai, found while transcribing resolution 1664/NQ-UBTVQH15, all confirmed against a same-code (or same-file) comparator plus the resolution text:
  
  - `pre/wards.ts` `23638` (Kbang, thị trấn) and `pre/districts.ts` `625` (the huyện itself): `"KBang"` → `"Kbang"`.
  - `pre/wards.ts` `23650` (Kbang, xã): `"KRong"` → `"Krong"`.
  - `pre/wards.ts` `23776` (Ia Grai, xã): `"Ia KRai"` → `"Ia Krái"`.
  - `pre/wards.ts` `23956` (Chư Sê, xã): `"AYun"` → `"Ayun"`.
  - `pre/wards.ts` `23644` (Kbang, xã): `"Đăk Roong"` → `"Đak Rong"`.

- [`01c5041`](https://github.com/nguyencongcuong/tinhthanhvn/commit/01c5041fe070865d6d93adb8ad18d3b0f2438829) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix pre-merger ward `30055` (Tháp Mười, Đồng Tháp): the name was misspelled `"Mỹ Quý"` (dấu ngã); `current/wards.ts` already had the correct spelling, `"Mỹ Quí"` (dấu sắc), on the same code.

- [`efc61ba`](https://github.com/nguyencongcuong/tinhthanhvn/commit/efc61baf8182930329795310b7792f43f897d9a4) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix `tinhthanhvn/pre` ward `01483` (Phong Nặm, Trùng Khánh, Cao Bằng) from `"Phong Nậm"` to `"Phong Nặm"` — the second syllable's vowel was misspelled (â instead of ă). Exact-name lookups against this ward now match the official spelling.

- [`01c5041`](https://github.com/nguyencongcuong/tinhthanhvn/commit/01c5041fe070865d6d93adb8ad18d3b0f2438829) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix pre-merger ward `03370` (Điện Biên Đông, Điện Biên): the name was misspelled `"Pú Nhi"` (with an extra sắc tone mark); `current/wards.ts` already had the correct spelling, `"Pu Nhi"`, on the same code.

## 3.0.4

### Patch Changes

- [`c0e3cea`](https://github.com/nguyencongcuong/tinhthanhvn/commit/c0e3cea089c84638c00acfbd43aa543b61652dc7) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix `tinhthanhvn/pre` ward `32191` from `"Thị Trấn Năm Căn"` to `"Năm Căn"` — the administrative type was baked into the name field, while `type` already correctly says `"Thị trấn"`. Exact-name lookups against this ward now match the official spelling.

## 3.0.3

### Patch Changes

- [`ebdc3fa`](https://github.com/nguyencongcuong/tinhthanhvn/commit/ebdc3faaec9974ca2fa439be1782cf21ea59a824) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix three ward name data errors: `tinhthanhvn/current` ward `31027` was `"u Minh Thượng"` (lowercase u), now `"U Minh Thượng"`; `tinhthanhvn/pre` ward `30475` was `"Ô Long Vỹ"`, now `"Ô Long Vĩ"` to match the official spelling; `tinhthanhvn/pre` ward `30688` was `"Thị Trấn Óc Eo"` (the administrative type baked into the name), now `"Óc Eo"` — its `type` field already correctly says `"Thị trấn"`. Also normalize `tinhthanhvn/pre` province, district, and ward names that used old-style diacritic placement (`Hoà`, `Thuỷ`) to the new style (`Hòa`, `Thủy`), matching `tinhthanhvn/current`. `byCode`, `search`, and any exact-name comparison against these names will see the corrected spelling.

## 3.0.2

### Patch Changes

- [`4b529fa`](https://github.com/nguyencongcuong/tinhthanhvn/commit/4b529fa8deb8552418f15cbdbe9a5c295756071a) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Export `WardSearchOptions` from `tinhthanhvn`/`tinhthanhvn/current`, and `DistrictSearchOptions`/`PreWardSearchOptions` from `tinhthanhvn`/`tinhthanhvn/pre`. These types already shaped the second argument of `wards.search()`/`districts.search()`; consumers can now name them instead of relying on `Parameters<...>` workarounds.

- [`08eadde`](https://github.com/nguyencongcuong/tinhthanhvn/commit/08eadde2a3a2fd258b90b8c83e466b1a8f280604) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Fix `wards.byProvinceCode`, `wards.byDistrictCode` (pre-merger), and `districts.byProvinceCode` throwing `TypeError` for keys that collide with `Object.prototype` members (e.g. `"constructor"`, `"__proto__"`, `"toString"`, `"hasOwnProperty"`). These now return `[]` like any other unknown code, matching the documented "no throws" contract.

- [`a0060d9`](https://github.com/nguyencongcuong/tinhthanhvn/commit/a0060d94f0d1d1cd2a1a04547d2ad081fc20cb0d) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Remove a redundant array copy in `searchByName`. `matches` was already a fresh local array; no behavior change.

## 3.0.1

### Patch Changes

- [`2d7224e`](https://github.com/nguyencongcuong/tinhthanhvn/commit/2d7224eb80bee76416a6376f05ba1c2ff4ccfe1e) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Remove `sideEffects: false` so bun build no longer tree-shakes lookup data out of dist.

## 3.0.0

### Major Changes

- [`aa6f0e8`](https://github.com/nguyencongcuong/tinhthanhvn/commit/aa6f0e8f210275617b21a7e1703641c8f6232e72) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Remove `normalizeVietnamese` from the public API. Accent-insensitive normalization remains available through `search()` on all lookup exports.

### Minor Changes

- [`c4e4283`](https://github.com/nguyencongcuong/tinhthanhvn/commit/c4e4283a13cb1b5f715e658cdfe2dbd3c7b6321a) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Add `wards.byProvinceCode()` to the pre-merger entry point so wards can be listed by province without iterating districts.

### Patch Changes

- [`0b1cd33`](https://github.com/nguyencongcuong/tinhthanhvn/commit/0b1cd33009ddc2f17146b89270087186617ac703) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Treat blank `provinceCode` and `districtCode` in scoped `search()` as unscoped instead of returning no results.

- [`4c8bc30`](https://github.com/nguyencongcuong/tinhthanhvn/commit/4c8bc30169ea796a69f730b7680f38845810b762) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Mark the package as side-effect free so bundlers can tree-shake unused exports.

## 2.0.0

### Major Changes

- [`90eafc7`](https://github.com/nguyencongcuong/tinhthanhvn/commit/90eafc788c169df0fe4e05efb38a6722e2d6e2e4) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Replace deeply frozen lookup results with shallow array copies. `all()`, `byProvinceCode()`, `byDistrictCode()`, and `search()` now return fresh arrays via spread (`[...]`) or `[]` for empty results.

### Patch Changes

- [`1c7bb0f`](https://github.com/nguyencongcuong/tinhthanhvn/commit/1c7bb0f780675f01f792beb9288112958d375d8c) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Remove internal `valuesSortedByKey` helper. Flat list exports (`WARDS`, `PRE_MERGER_DISTRICTS`, `PRE_MERGER_WARDS`) now use `Object.values(...).flat()` — order follows bundled data, not lexicographic parent-code sort. Sort yourself when order matters.

- [`7d565f6`](https://github.com/nguyencongcuong/tinhthanhvn/commit/7d565f65520573e0e5dbd7c00064bb9801646a7f) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Rewrite README for a shorter, usage-focused quick start.

## 1.1.0

### Minor Changes

- [`96a94f2`](https://github.com/nguyencongcuong/tinhthanhvn/commit/96a94f29250d5089956cd7c22f3ca7da5faeded0) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Add parent resolution helpers to traverse the administrative hierarchy upward: `provinces.byWardCode` (current and pre), `provinces.byDistrictCode` and `districts.byWardCode` (pre).

## 1.0.2

### Patch Changes

- [`6242486`](https://github.com/nguyencongcuong/tinhthanhvn/commit/624248657768014dc968c1d05a72903de32f6fd1) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Allow pre-merger wards.search to scope by provinceCode (AND with districtCode)

- [`4243185`](https://github.com/nguyencongcuong/tinhthanhvn/commit/4243185661cbad082614480523e084a025a0d2af) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Update package information including display name, author, MIT license

- [`6f36ab2`](https://github.com/nguyencongcuong/tinhthanhvn/commit/6f36ab28ae5349642591df6f8f99da6194690558) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Trim whitespace from byCode and related lookup arguments

- [`6f78c4d`](https://github.com/nguyencongcuong/tinhthanhvn/commit/6f78c4d91d1db88e18091f17cfbbb03ddb91adf3) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - Freeze search() result arrays to match immutability contract

- [`999541b`](https://github.com/nguyencongcuong/tinhthanhvn/commit/999541b16bb15eda8d04717a9644ce9aa2af84ae) Thanks [@nguyencongcuong](https://github.com/nguyencongcuong)! - add repository homepage bugs and keywords for npm discovery

## 1.0.1

Patch release. No user-facing API or data changes — package version bumped to `1.0.1` for npm republish.

## 1.0.0

Initial release.

### Features

- **Two administrative timelines** - lookup Vietnam's provinces, districts, and wards under both the **current** (post-2025 merger) `Province → Ward` hierarchy and the **pre-merger** `Province → District → Ward` hierarchy, via dedicated entry points (`tinhthanhvn`/`tinhthanhvn/current` and `tinhthanhvn/pre`).
- **Full dataset** - 34 current provinces and 3,321 wards; 63 pre-merger provinces, 696 districts, and 10,035 wards, sourced from [Quyết định số 19/2025/QĐ-TTg](https://congbao.chinhphu.vn/van-ban/quyet-dinh-so-19-2025-qd-ttg-45430.htm).
- **Consistent lookup API** - `all()`, `byCode(code)`, and `search(query)` on every entity, plus `byProvinceCode()` on wards/districts and `byDistrictCode()` on pre-merger wards.
- **Accent-insensitive fuzzy search** - `search()` ignores case, Vietnamese diacritics, and whitespace (`"hanoi"` and `"ha noi"` both match `Hà Nội`), backed by the exported `normalizeVietnamese` helper.
- **Official codes as stable identifiers** - every record exposes a stable `code` (e.g. `"01"`, `"00004"`) suitable for lookups, React `key`s, and persistence, independent of array order or display name.
- **Literal union types** - `ProvinceType`, `WardType`, `PreMergerDistrictType`, and `PreMergerWardType` are exported for precise TypeScript narrowing.
- **Immutable data** - all returned arrays and objects are deeply frozen, so they're safe to store as-is in React/Redux state without accidental mutation.
- **Zero runtime dependencies** - pure ESM, no network calls, no filesystem access; works in Node, Bun, and the browser.
