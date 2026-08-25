---
"tinhthanhvn": minor
---

Add `tinhthanhvn/merge`, a new entry point exposing `wardMerges` to cross-walk the 2025 ward merger: `byOldWardCode(code)` resolves a pre-merger ward code to every current `Ward` its area was folded into, and `byNewWardCode(code)` resolves a current ward code back to every pre-merger `Ward` that merged into it. Both return arrays — usually one entry, but a merger resolution can split an old ward's area across multiple new wards. The underlying merge data isn't populated yet, so both currently return no matches — this ships the API surface ahead of the data.
