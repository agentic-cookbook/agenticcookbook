# GUIDE-11.8. Input Validation

**Never trust client input.** Client-side validation is a UX feature, not a security control.
All validation must be duplicated server-side.

- **Allowlists over denylists** — define what is valid, not what is invalid. Denylists have gaps.
- **Validate, sanitize, escape** — in that order. Validation rejects. Sanitization cleans.
  Escaping is context-specific output encoding (HTML, URL, SQL, JS).
- **Parameterized queries** — the only reliable defense against SQL injection. Never concatenate
  user input into queries.
- **Output encoding** — context-dependent: HTML-encode for HTML, URL-encode for URLs. Use
  framework auto-escaping (React JSX, Django templates) and understand when it does NOT apply
  (e.g., raw HTML insertion APIs — always sanitize with a library like DOMPurify first).
- **File uploads** — validate MIME type server-side (not just extension). Limit size. Store
  outside web root. Never serve with original filename or from the same origin.

References:
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [OWASP XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
