---
id: 2598f495-1820-47e7-b7e7-ce548d390148
title: "Token Handling"
domain: agentic-cookbook://guidelines/security/token-handling
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Short-lived (5-15 min). Include only necessary claims — no PII in JWTs"
platforms: 
  - kotlin
  - typescript
  - web
  - windows
tags: 
  - security
  - token-handling
depends-on: []
related: []
references: 
  - https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html
  - https://datatracker.ietf.org/doc/html/rfc6750
  - https://datatracker.ietf.org/doc/html/rfc7519
approved-by: ""
approved-date: ""
---

# Token Handling

### Access tokens

Short-lived (5-15 min). Include only necessary claims — no PII in JWTs
that transit untrusted parties.

### Refresh tokens

Longer-lived but bound to client. Use rotation (see Authentication above).
Store server-side when possible.

### Token refresh strategy

- Proactive refresh before expiry (e.g., at 75% of TTL)
- Queue concurrent requests during refresh to avoid race conditions
- Retry with backoff on refresh failure

### Secure storage per platform

See also agentic-cookbook://guidelines/security/privacy

- **Apple:** Keychain Services
- **Android:** EncryptedSharedPreferences / Android Keystore
- **Windows:** DPAPI (`ProtectedData`)
- **Web:** HttpOnly Secure SameSite cookies (never localStorage)

### Never do these

- Store tokens in `localStorage` or `sessionStorage` (XSS-accessible)
- Put tokens in URL query parameters (logged in server logs, browser history, referrer headers)
- Use `alg: none` in JWTs — always validate the `alg` header server-side against an allowlist
- Trust client-supplied JWT claims for authorization without server-side verification

References:
- [RFC 6750: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750)
- [RFC 7519: JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519)
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
