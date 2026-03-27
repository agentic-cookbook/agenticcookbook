# Token Handling

### guide.domain.security.token-handling. Access tokens

Short-lived (5-15 min). Include only necessary claims — no PII in JWTs
that transit untrusted parties.

### guide.domain.security.token-handling. Refresh tokens

Longer-lived but bound to client. Use rotation (see Authentication above).
Store server-side when possible.

### guide.domain.security.token-handling. Token refresh strategy

- Proactive refresh before expiry (e.g., at 75% of TTL)
- Queue concurrent requests during refresh to avoid race conditions
- Retry with backoff on refresh failure

### guide.domain.security.token-handling. Secure storage per platform

See also guide.core.general.privacy-and-security-by-default.

- **Apple:** Keychain Services
- **Android:** EncryptedSharedPreferences / Android Keystore
- **Windows:** DPAPI (`ProtectedData`)
- **Web:** HttpOnly Secure SameSite cookies (never localStorage)

### guide.domain.security.token-handling. Never do these

- Store tokens in `localStorage` or `sessionStorage` (XSS-accessible)
- Put tokens in URL query parameters (logged in server logs, browser history, referrer headers)
- Use `alg: none` in JWTs — always validate the `alg` header server-side against an allowlist
- Trust client-supplied JWT claims for authorization without server-side verification

References:
- [RFC 6750: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750)
- [RFC 7519: JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519)
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
