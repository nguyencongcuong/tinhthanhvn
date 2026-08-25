---
"tinhthanhvn": patch
---

Fix three ward name data errors: `tinhthanhvn/current` ward `31027` was `"u Minh Thượng"` (lowercase u), now `"U Minh Thượng"`; `tinhthanhvn/pre` ward `30475` was `"Ô Long Vỹ"`, now `"Ô Long Vĩ"` to match the official spelling; `tinhthanhvn/pre` ward `30688` was `"Thị Trấn Óc Eo"` (the administrative type baked into the name), now `"Óc Eo"` — its `type` field already correctly says `"Thị trấn"`. Also normalize `tinhthanhvn/pre` province, district, and ward names that used old-style diacritic placement (`Hoà`, `Thuỷ`) to the new style (`Hòa`, `Thủy`), matching `tinhthanhvn/current`. `byCode`, `search`, and any exact-name comparison against these names will see the corrected spelling.
