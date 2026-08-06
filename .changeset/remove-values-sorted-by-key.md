---
"tinhthanhvn": patch
---

Remove internal `valuesSortedByKey` helper. Flat list exports (`WARDS`, `PRE_MERGER_DISTRICTS`, `PRE_MERGER_WARDS`) now use `Object.values(...).flat()` — order follows bundled data, not lexicographic parent-code sort. Sort yourself when order matters.
