---
name: changeset
description: Use when the user asks to commit, commit and push, or push code; before pushing unreleased package changes; or when `.changeset/` exists and pending work should ship in the next release.
---

# Changeset (Changelog)

**REQUIRED before commit/push** when the change affects the published package — not docs-only or CI-only work.

## When to trigger

| Trigger                                                              | Action                                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------ |
| User asks to **commit** or **commit and push**                       | Ensure a changeset covers the change before committing |
| User asks to **push** and uncommitted/unreleased package work exists | Ensure a changeset exists before pushing               |
| User explicitly asks for a **changeset** or **changelog**            | Create or update one                                   |

**Skip** when the change is docs-only, CI-only, or tests-only with **no** package/runtime impact.

## Workflow

1. **Check existing changesets** — list `.changeset/*.md` (ignore `README.md`) and run `bunx changeset status`.
2. **If one already covers this change** — do not create another. Stage and commit the existing file with the code.
3. **If none covers it** — add a changeset:
   ```bash
   bunx changeset
   ```
   When the CLI is interactive, create `.changeset/<short-slug>.md` manually with the same format. Pick a short, descriptive kebab-case slug from the change (e.g. `remove-deep-freeze.md`).
4. **Pick bump type** (highest applicable wins when multiple changesets merge):

   | Type      | Use when                                                                               |
   | --------- | -------------------------------------------------------------------------------------- |
   | **patch** | Bug fixes, internal refactors, performance tweaks — no new API, no breaking change     |
   | **minor** | New backward-compatible features, new exports, new optional lookup options             |
   | **major** | Breaking changes — removed/changed public API, changed return shapes consumers rely on |

5. **Write the changelog message** — the body becomes the release note. Focus on **consumer impact**, not implementation detail.

## Changeset file format

```markdown
---
"tinhthanhvn": patch
---

Short summary in past tense or imperative. What changed for users and why it matters.
Second sentence only when scope needs clarification.
```

**Good message:** states user-visible outcome (`search()` now ignores whitespace in queries).

**Bad message:** restates the commit (`remove valuesSortedByKey helper`) without consumer context.

## Rules

- **One changeset per logical change** — never create multiple changelog entries for the same work.
- **Check before creating** — grep `.changeset/` and read pending files; extend an existing entry instead of adding a duplicate.
- **Descriptive filename** — hand-pick a short kebab-case slug that describes the change (e.g. `remove-deep-freeze.md`).
- **Stage with code** — commit the `.changeset/*.md` file in the same commit as the change it describes.
- **Message ≠ commit message** — changeset body is for end-user changelog; commit message follows **REQUIRED SUB-SKILL:** `conventional-commit`.

## Bump decision quick reference

```
breaking public API or behavior consumers may rely on? → major
new backward-compatible capability?                   → minor
everything else that ships                          → patch
```

## Red flags — stop

- Two changeset files describing the same change
- Committing package changes without checking `.changeset/`
- Changeset body that only names deleted files or internal helpers
- Skipping changeset because "commit message is enough"
