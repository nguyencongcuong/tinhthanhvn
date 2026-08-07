---
"tinhthanhvn": patch
---

Fix `wards.byProvinceCode`, `wards.byDistrictCode` (pre-merger), and `districts.byProvinceCode` throwing `TypeError` for keys that collide with `Object.prototype` members (e.g. `"constructor"`, `"__proto__"`, `"toString"`, `"hasOwnProperty"`). These now return `[]` like any other unknown code, matching the documented "no throws" contract.
