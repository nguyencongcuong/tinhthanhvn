---
"tinhthanhvn": patch
---

Fix misspelled pre-merger ward names in old Đắk Lắk and Phú Yên, found while transcribing resolution 1660/NQ-UBTVQH15. Some are strongly evidenced — a second, independent spelling of the same code already exists in `current/wards.ts` or elsewhere in `pre/wards.ts` (e.g. `"KRông Búk"` → `"Krông Búk"`, `"Ea Knuếc"`, `"Cuôr Đăng"`, `"Dliê Ya"`, `"Ia Rvê"`) or a curly apostrophe (`’`) silently broke exact-name lookups (`"Ea M'Droh"`); one thị trấn had "Thị Trấn" baked into its `name` instead of living in `type` (`"Thị Trấn Phú Hòa"` → `"Phú Hòa"`). The remaining fixes rest only on matching the resolution text's own rendering — see `src/data/resolutions/CHECKLIST.md` → "Notes from resolution 1660" for the full per-code breakdown by evidence tier.
