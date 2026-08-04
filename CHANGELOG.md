# tinhthanhvn

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
