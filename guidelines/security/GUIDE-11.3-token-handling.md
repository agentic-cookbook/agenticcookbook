# GUIDE-11.3. Token Handling

### GUIDE-11.3.1. Access tokens

Short-lived (5-15 min). Include only necessary claims — no PII in JWTs
that transit untrusted parties.

### GUIDE-11.3.2. Refresh tokens

Longer-lived but bound to client. Use rotation (see Authentication above).
Store server-side when possible.

### GUIDE-11.3.3. Token refresh strategy

- Proactive refresh before expiry (e.g., at 75% of TTL)
- Queue concurrent requests during refresh to avoid race conditions
- Retry with backoff on refresh failure

### GUIDE-11.3.4. Secure storage per platform

See also GUIDE-1.16.3.

- **Apple:** Keychain Services
- **Android:** EncryptedSharedPreferences / Android Keystore
- **Windows:** DPAPI (`ProtectedData`)
- **Web:** HttpOnly Secure SameSite cookies (never localStorage)

### GUIDE-11.3.5. Never do these

- Store tokens in `localStorage` or `sessionStorage` (XSS-accessible)
- Put tokens in URL query parameters (logged in server logs, browser history, referrer headers)
- Use `alg: none` in JWTs — always validate the `alg` header server-side against an allowlist
- Trust client-supplied JWT claims for authorization without server-side verification

References:
- [RFC 6750: Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750)
- [RFC 7519: JSON Web Tokens](https://datatracker.ietf.org/doc/html/rfc7519)
- [OWASP JWT Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_for_Java_Cheat_Sheet.html)
