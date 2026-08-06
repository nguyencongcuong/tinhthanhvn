---
name: conventional-commit
description: Use when the user asks to commit, push changes, commit and push changes, or commit and push staged changes; or when drafting/shipping a git commit message for current work.
---

# Conventional Commit & Push

Follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/#specification): lowercase type/description, no title case.

## Scope by phrase

| User says                        | Commit                           | Push | Files                                |
| -------------------------------- | -------------------------------- | ---- | ------------------------------------ |
| `commit`                         | yes                              | no   | all relevant                         |
| `push changes`                   | only if uncommitted work remains | yes  | if committing: all relevant          |
| `commit and push`                | yes                              | yes  | all relevant                         |
| `commit and push staged changes` | yes                              | yes  | **staged only** — never add unstaged |

Tree clean + only asked to push → just `git push`.

## Workflow

1. Parallel: `git status`, `git diff`, `git log --oneline -5`
2. **REQUIRED SUB-SKILL:** Use `changeset` when the change affects the published package
3. Stage correct scope — never secrets
4. Commit
5. Push only if table says yes

## Rationalizations

| Excuse                                   | Reality                                 |
| ---------------------------------------- | --------------------------------------- |
| "too small / hurry / add later"          | add changeset before commit if required |
| "title case looks better"                | forbidden                               |
| "staged only but related unstaged files" | staged means staged only                |
| "always push after commit"               | only if user asked                      |

## Safety

Never: commit `.env`/credentials · force-push `main`/`master` without explicit request · `--no-verify` without explicit request · amend a pushed commit without explicit allowance.

## Red flags — stop and fix

- Missing changeset when required
- Duplicate changeset for covered change
- Pushed when user only said `commit`
- Added unstaged files when user said `staged`
