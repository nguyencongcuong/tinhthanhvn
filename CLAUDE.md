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
| `bun run build` | Emit `dist/` for all three entry points (`index`, `current`, `pre`) |
| `bunx tsc --noEmit -p tsconfig.json` | Type-check the whole project (src + test) — **not run by CI**, see gotcha below |
| `bunx changeset` | Add a changeset before committing a consumer-facing change |

CI (`.github/workflows/ci.yml`) runs `bun install && bun run lint && bun test && bun run build` on every push/PR to `master`. Releases (`.github/workflows/release.yml`) are changesets-driven: merges to `master` open a release PR or publish to npm automatically — there is no manual `npm publish`.

## Architecture

### Dual hierarchy, three entry points

The package exposes two parallel data hierarchies because the 2025 merger flattened districts out of the provincial structure. Consumers pick the entry point matching the date they care about (mapped via `package.json` `exports`):

- `tinhthanhvn` / `tinhthanhvn/current` → `src/current.ts` → **Province → Ward** (post-merger, no districts)
- `tinhthanhvn/pre` → `src/pre.ts` → **Province → District → Ward** (pre-merger)

`src/index.ts` re-exports the current hierarchy plus pre-merger types, for consumers who want both hierarchies' types from one import.

### Layered structure: data → lookups → utils

- **`src/data/{current,pre}/*.ts`** — large, effectively generated literal arrays, each paired with a `_BY_CODE` `Map` and, for province/district-scoped entities, a `_BY_PROVINCE_CODE` / `_BY_DISTRICT_CODE` plain-object grouping index, all built once at module load.
- **`src/lookups/{current,pre}/*.ts`** — the public API surface (`all`, `byCode`, `by*Code`, `search`), thin wrappers over the data layer. Every list-returning method returns a **fresh array copy** (`[...x]`) on each call, never a live reference, so a caller mutating a result can't corrupt internal state. Singular `byCode`/`by*Code` lookups return `undefined` for unknown keys — nothing throws.
- **`src/utils/`** — `normalizeVietnamese` (accent/case/whitespace-insensitive normalization) and `search-by-name.ts` (`buildNameSearchIndex`, `searchByName`, `optionalScopeCode`), shared across all five lookup modules.

Grouping-object lookups (`byProvinceCode`, `byDistrictCode`) guard with `Object.hasOwn()` before indexing — a plain `obj[code]` would resolve `Object.prototype` members for codes like `"constructor"`/`"__proto__"`/`"toString"` and misbehave instead of returning `[]`. This was a real shipped bug (CHANGELOG `08eadde`); keep the guard when touching these.

`search()` matches accent- and space-insensitive substrings (not whole words) via `normalizeVietnamese`; blank/whitespace-only queries return `[]`. Scoped variants (current `wards.search(q, {provinceCode})`; pre `wards.search(q, {provinceCode, districtCode})`) AND all provided filters together and treat blank/whitespace scope values as unscoped, via `optionalScopeCode`.

### Type-checking gotcha: CI doesn't run `tsc`

`tsconfig.json` sets `noUncheckedIndexedAccess: true`, so `array[i]` types as `T | undefined`. `bun test` transpiles but does not type-check, and `bunx biome check` doesn't either — only `bunx tsc --noEmit -p tsconfig.json` catches this, and CI never runs it. Run it manually before pushing test or lookup changes. When writing test fixtures, avoid indexing into arrays (`ITEMS[0]`) — use named constants instead, per the pattern in `test/fixtures.ts`.

### Test layout mirrors src layout

`test/lookups/{current,pre}/*.test.ts` mirrors `src/lookups/{current,pre}/*.ts` file-for-file, and `test/utils/*.test.ts` mirrors `src/utils/*.ts`. Keep new lookup/util modules and their tests in the same relative position.

### Data integrity invariants

The `_BY_CODE` maps and `_BY_PROVINCE_CODE`/`_BY_DISTRICT_CODE` grouping objects are all derived from the same literal arrays in `src/data/`, so when editing that data: no code may repeat within a dataset (or the `Map` silently drops the earlier entry), every item's own `province_code`/`district_code` must match the group key it's filed under, and a pre-merger ward's `district_code` must resolve to a district whose `province_code` equals the ward's own `province_code`. None of this is type-checked — verify with a throwaway script importing the data if you touch `src/data/`.

## Changesets

Add a changeset (`bunx changeset`) for any change that affects the published package — bug fixes, new lookups/options, data updates. Skip it for docs/CI/test-only changes (see `CONTRIBUTING.md` for the full contribution workflow, including commit message conventions).
