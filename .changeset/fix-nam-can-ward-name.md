---
"tinhthanhvn": patch
---

Fix `tinhthanhvn/pre` ward `32191` from `"Thị Trấn Năm Căn"` to `"Năm Căn"` — the administrative type was baked into the name field, while `type` already correctly says `"Thị trấn"`. Exact-name lookups against this ward now match the official spelling.
