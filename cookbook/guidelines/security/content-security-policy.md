---
id: 6f4cfd55-cb09-4ede-a53c-feaeb5781127
title: "Content Security Policy"
domain: cookbook.guidelines.security.content-security-policy
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Prevent XSS and injection with a strict CSP. Web apps only."
platforms: 
  - typescript
  - web
tags: 
  - content-security-policy
  - security
depends-on: []
related: []
references: 
  - https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
  - https://csp-evaluator.withgoogle.com/
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
---

# Content Security Policy

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
