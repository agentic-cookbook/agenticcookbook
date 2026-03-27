# GUIDE-11.7. Content Security Policy

Prevent XSS and injection with a strict CSP. Web apps only.

- **Start strict:** `default-src 'none'` then add only what is needed
- **Nonce-based scripts:** `script-src 'nonce-{random}' 'strict-dynamic'` — more secure than
  domain allowlisting (bypassable via JSONP/CDN scripts)
- **Never use** `'unsafe-inline'` or `'unsafe-eval'` for script-src
- **`frame-ancestors 'self'`** to prevent clickjacking (replaces X-Frame-Options)
- **Deploy in report-only mode first** (`Content-Security-Policy-Report-Only`) to find
  violations before enforcing

References:
- [MDN: CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [OWASP CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [Google CSP Evaluator](https://csp-evaluator.withgoogle.com/)
