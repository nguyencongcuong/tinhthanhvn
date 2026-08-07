---
"tinhthanhvn": patch
---

Export `WardSearchOptions` from `tinhthanhvn`/`tinhthanhvn/current`, and `DistrictSearchOptions`/`PreWardSearchOptions` from `tinhthanhvn`/`tinhthanhvn/pre`. These types already shaped the second argument of `wards.search()`/`districts.search()`; consumers can now name them instead of relying on `Parameters<...>` workarounds.
