# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

`tinhthanhvn` is a zero-dependency npm package (Bun-based, TypeScript) that provides lookup tables for Vietnam's administrative divisions — provinces, districts, wards — both before and after the 2025 administrative merger. It is a data/library package: no server, no frontend, no database. The published artifact is just `dist/` (bundled JS + `.d.ts`).

## Commands

| Command | What it does |
| --- | --- |
| `bun install` | Install dependencies |
| `bun test` | Run the full test suite |
| `bun test test/lookups/current/wards.test.ts` | Run a single test file |
| `bun test -t "byProvinceCode"` | Run only tests whose name matches a pattern |
| `bun run lint` | Check formatting/lint with Biome |
| `bun run format` | Auto-fix formatting/lint with Biome |
| `bun run build` | Emit `dist/` for all four entry points (`index`, `current`, `pre`, `merge`) |
| `bunx tsc --noEmit -p tsconfig.json` | Type-check the whole project (src + test) — **not run by CI**, see gotcha below |
| `bunx changeset` | Add a changeset before committing a consumer-facing change |

CI (`.github/workflows/ci.yml`) runs `bun install && bun run lint && bun test && bun run build` on every push/PR to `master`. Releases (`.github/workflows/release.yml`) are changesets-driven: merges to `master` open a release PR or publish to npm automatically — there is no manual `npm publish`.

## Architecture

### Dual hierarchy, four entry points

The package exposes two parallel data hierarchies because the 2025 merger flattened districts out of the provincial structure. Consumers pick the entry point matching the date they care about (mapped via `package.json` `exports`):

- `tinhthanhvn` / `tinhthanhvn/current` → `src/current.ts` → **Province → Ward** (post-merger, no districts)
- `tinhthanhvn/pre` → `src/pre.ts` → **Province → District → Ward** (pre-merger)
- `tinhthanhvn/merge` → `src/merge.ts` → **old ward code ↔ new ward code**, the crosswalk between the two hierarchies above

`src/index.ts` re-exports the current hierarchy plus pre-merger types, for consumers who want both hierarchies' types from one import. `merge` is **not** re-exported from `index.ts` or bundled into `current`/`pre`: it's the only module that imports both hierarchies' ward lookups at once, so it's kept as an opt-in entry point — `dist/merge.js` is ~5x the size of `dist/current.js` because it carries both datasets. Don't fold it into `index.ts`.

### Layered structure: data → lookups → utils

- **`src/data/{current,pre}/*.ts`** — large, effectively generated literal arrays, each paired with a `_BY_CODE` `Map` and, for province/district-scoped entities, a `_BY_PROVINCE_CODE` / `_BY_DISTRICT_CODE` plain-object grouping index, all built once at module load. **`src/data/merge/ward-merges.ts`** follows the same shape: `WARD_MERGES: WardMerge[]` (currently `[]` — see gotcha below) paired with `WARD_MERGES_BY_OLD_CODE` and `WARD_MERGES_BY_NEW_CODE`.
- **`src/lookups/{current,pre,merge}/*.ts`** — the public API surface (`all`, `byCode`, `by*Code`, `search`), thin wrappers over the data layer. Every list-returning method returns a **fresh array copy** (`[...x]`) on each call, never a live reference, so a caller mutating a result can't corrupt internal state. Singular `byCode`/`by*Code` lookups return `undefined` for unknown keys — nothing throws. `src/lookups/merge/ward-merges.ts` additionally resolves codes to the actual `Ward`/`PreMergerWard` objects (via `current/wards` and `pre/wards`), matching the existing `provinces.byWardCode` precedent of returning full objects rather than raw codes — and both its lookups (`byOldWardCode`, `byNewWardCode`) return **arrays**, not a single object, because either side of a merge can legitimately fan out (see below).
- **`src/utils/`** — `normalizeVietnamese` (accent/case/whitespace-insensitive normalization) and `search-by-name.ts` (`buildNameSearchIndex`, `searchByName`, `optionalScopeCode`), shared across all five lookup modules.

**Map vs. plain-object index — pick by cardinality, not by neighboring file.** A `_BY_CODE`-style index where each key maps to exactly one item is a `Map` (`WARDS_BY_CODE`, `PROVINCES_BY_CODE`). A grouping index where each key maps to zero-or-more items is a plain object guarded with `Object.hasOwn()` (`WARDS_BY_PROVINCE_CODE`, `WARD_MERGES_BY_OLD_CODE`, `WARD_MERGES_BY_NEW_CODE`) — never a `Map`, even when it sits next to a `Map` in the same file.

`WARD_MERGES_BY_OLD_CODE` *looks* like it should be 1:1 (each old ward merges into exactly one new ward) but isn't: some merger resolutions transfer only part of an old ward's area into one new ward and the remainder into another ("một phần diện tích tự nhiên..." / "phần còn lại..." in the source text — e.g. resolution 1654/NQ-UBTVQH15 splits An Giang's old xã Phước Hưng across three new wards). A single `old_ward_code` can therefore legitimately produce more than one `WardMerge` row, so `WARD_MERGES_BY_OLD_CODE` is a 1:N grouping index exactly like `WARD_MERGES_BY_NEW_CODE`, not a `Map`. Don't assume either side of a merge dataset is 1:1 without checking the resolution text.

Grouping-object lookups (`byProvinceCode`, `byDistrictCode`, `byOldWardCode`, `byNewWardCode`) guard with `Object.hasOwn()` before indexing — a plain `obj[code]` would resolve `Object.prototype` members for codes like `"constructor"`/`"__proto__"`/`"toString"` and misbehave instead of returning `[]`. This was a real shipped bug (CHANGELOG `08eadde`); keep the guard when touching these.

`search()` matches accent- and space-insensitive substrings (not whole words) via `normalizeVietnamese`; blank/whitespace-only queries return `[]`. Scoped variants (current `wards.search(q, {provinceCode})`; pre `wards.search(q, {provinceCode, districtCode})`) AND all provided filters together and treat blank/whitespace scope values as unscoped, via `optionalScopeCode`.

### Type-checking gotcha: CI doesn't run `tsc`

`tsconfig.json` sets `noUncheckedIndexedAccess: true`, so `array[i]` types as `T | undefined`. `bun test` transpiles but does not type-check, and `bunx biome check` doesn't either — only `bunx tsc --noEmit -p tsconfig.json` catches this, and CI never runs it. Run it manually before pushing test or lookup changes. When writing test fixtures, avoid indexing into arrays (`ITEMS[0]`) — use named constants instead, per the pattern in `test/fixtures.ts`.

### Test layout mirrors src layout

`test/lookups/{current,pre,merge}/*.test.ts` mirrors `src/lookups/{current,pre,merge}/*.ts` file-for-file, and `test/utils/*.test.ts` mirrors `src/utils/*.ts`. Keep new lookup/util modules and their tests in the same relative position.

### Data integrity invariants

The `_BY_CODE` maps and `_BY_PROVINCE_CODE`/`_BY_DISTRICT_CODE` grouping objects are all derived from the same literal arrays in `src/data/`, so when editing that data: no code may repeat within a dataset (or the `Map` silently drops the earlier entry), every item's own `province_code`/`district_code` must match the group key it's filed under, and a pre-merger ward's `district_code` must resolve to a district whose `province_code` equals the ward's own `province_code`. None of this is type-checked — verify with a throwaway script importing the data if you touch `src/data/`.

`WARD_MERGES` (in `src/data/merge/ward-merges.ts`) carries its own invariants, distinct from the `_BY_CODE`/grouping invariants above:

- Every `old_ward_code` must resolve via `PRE_MERGER_WARDS_BY_CODE` and every `new_ward_code` via `WARDS_BY_CODE`.
- Unlike a normal `_BY_CODE` map, **`old_ward_code` may legitimately repeat** across rows — a split old ward (see the cardinality note above) produces one row per new ward it was folded into. Don't "deduplicate" repeated `old_ward_code` values; that would silently drop real merge targets.
- Once fully populated, `WARD_MERGES` must be **total** over every pre-merger ward code: each of the 10,035 pre-merger wards appears as `old_ward_code` in at least one row, including unchanged wards, which get an identity row (`old_ward_code === new_ward_code`) — verify the old ward's code is genuinely unchanged in `src/data/current/wards.ts` before writing an identity row; a same-sounding name isn't enough (pre-merger data can carry legacy spellings, e.g. "Mỹ Hoà Hưng" vs. current "Mỹ Hòa Hưng" for the same code).
- Data is entered **one of the 34 ward-merger resolutions at a time** (see `README.md`'s Legal References section), so totality is the *end state*, not an invariant that holds after every edit — while resolutions are still being entered, `WARD_MERGES` legitimately covers a strict subset of pre-merger ward codes. Check coverage against the specific resolution(s) already entered, not against the full pre-merger dataset.

**`WARD_MERGES` is currently `[]`** — no resolution has been entered yet; `wardMerges.byOldWardCode`/`byNewWardCode` are correct but return no matches until it's populated.

## Changesets

Add a changeset (`bunx changeset`) for any change that affects the published package — bug fixes, new lookups/options, data updates. Skip it for docs/CI/test-only changes (see `CONTRIBUTING.md` for the full contribution workflow, including commit message conventions).
