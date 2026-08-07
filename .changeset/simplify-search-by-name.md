---
"tinhthanhvn": patch
---

Remove a redundant array copy in `searchByName`. `matches` was already a fresh local array; no behavior change.
