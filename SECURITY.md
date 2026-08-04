# Security Policy

## Supported versions

Only the latest published version of `tinhthanhvn` on npm is supported with security updates.

| Version  | Supported |
| -------- | --------- |
| latest   | ✅        |
| < latest | ❌        |

## Reporting a vulnerability

Please report security vulnerabilities privately via [GitHub Security Advisories](https://github.com/nguyencongcuong/tinhthanhvn/security/advisories/new) rather than opening a public issue.

Include as much detail as you can - affected version, a minimal reproduction, and potential impact. We'll acknowledge your report as soon as possible and follow up once the issue is triaged.

## Scope

`tinhthanhvn` is a zero-dependency, static data package - it makes no network calls, reads no files, and has no runtime dependencies. Most realistic risks are limited to the npm package itself (e.g. supply-chain/build issues) rather than data misuse at runtime.
