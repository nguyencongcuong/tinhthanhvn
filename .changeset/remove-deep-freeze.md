---
"tinhthanhvn": major
---

Replace deeply frozen lookup results with shallow array copies. `all()`, `byProvinceCode()`, `byDistrictCode()`, and `search()` now return fresh arrays via spread (`[...]`) or `[]` for empty results.
