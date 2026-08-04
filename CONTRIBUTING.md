# Contributing to tinhthanhvn

Thanks for taking the time to contribute! This project is community-maintained, and contributions of all sizes - typo fixes, bug reports, data corrections, new features - are welcome.

By participating, you agree to uphold the [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting started

This project uses [Bun](https://bun.sh) as the runtime, package manager, test runner, and bundler, and [Biome](https://biomejs.dev) for linting/formatting.

```bash
git clone https://github.com/nguyencongcuong/tinhthanhvn.git
cd tinhthanhvn
bun install
```

| Command          | What it does                        |
| ---------------- | ----------------------------------- |
| `bun test`       | Run the test suite                  |
| `bun run lint`   | Check formatting/lint with Biome    |
| `bun run format` | Auto-fix formatting/lint with Biome |
| `bun run build`  | Emit `dist/` for all entry points   |

## Making a change

1. Fork the repo and create a branch off `master`.
2. Make your change, adding or updating tests under `test/` as needed.
3. Run `bun run lint` and `bun test` - both must pass, and CI will check them too.
4. If your change should ship a release (a fix, feature, or data update - not a docs/CI-only change), add a changeset:

   ```bash
   bunx changeset
   ```

5. Commit, push, and open a pull request against `master` describing what changed and why.

## Commit messages

This repo follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope]: <description>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`. Use a `!` (e.g. `feat!:`) or a `BREAKING CHANGE:` footer for breaking changes.

```
feat(wards): add search by district code
fix(search): normalize whitespace before matching
docs: clarify pre-merger data model
```

## Reporting bugs and requesting features

Please [open an issue](https://github.com/nguyencongcuong/tinhthanhvn/issues) with as much detail as possible - for bugs, include a minimal repro; for data issues (e.g. an incorrect province/ward name or code), cite the official source if you have one.

## Questions

Not sure where to start? Open an issue and ask - we're happy to help point you in the right direction.
