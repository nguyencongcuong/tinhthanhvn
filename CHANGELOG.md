# tinhthanhvn

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
