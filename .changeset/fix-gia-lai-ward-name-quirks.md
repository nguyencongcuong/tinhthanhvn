---
"tinhthanhvn": patch
---

Fix five pre-merger ward/district name quirks in Gia Lai, found while transcribing resolution 1664/NQ-UBTVQH15, all confirmed against a same-code (or same-file) comparator plus the resolution text:

- `pre/wards.ts` `23638` (Kbang, thị trấn) and `pre/districts.ts` `625` (the huyện itself): `"KBang"` → `"Kbang"`.
- `pre/wards.ts` `23650` (Kbang, xã): `"KRong"` → `"Krong"`.
- `pre/wards.ts` `23776` (Ia Grai, xã): `"Ia KRai"` → `"Ia Krái"`.
- `pre/wards.ts` `23956` (Chư Sê, xã): `"AYun"` → `"Ayun"`.
- `pre/wards.ts` `23644` (Kbang, xã): `"Đăk Roong"` → `"Đak Rong"`.
