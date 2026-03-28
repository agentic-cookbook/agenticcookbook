---
id: 8ea0409f-405a-4f4d-9bbf-54bf21c86d33
title: "CORS"
domain: agentic-cookbook://guidelines/security/cors
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Cross-Origin Resource Sharing — get it right or don't enable it."
platforms: 
  - web
tags: 
  - cors
  - security
depends-on: []
related: []
references: 
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  - https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing
---

# CORS

Cross-Origin Resource Sharing — get it right or don't enable it.

- **Never reflect the Origin header** back as `Access-Control-Allow-Origin`. Maintain an
  explicit allowlist of origins.
- **Never use `*` with credentials** — browsers block this, and attempting it reveals a
  design misunderstanding.
- **Preflight caching:** Set `Access-Control-Max-Age: 86400` to reduce preflight overhead.
- **Minimize exposed headers:** Only what the client actually needs.

**Common misconfigurations:**
- Wildcard origin with credentials
- Regex matching without anchoring (`evil-example.com` matching `example.com`)
- Allowing `null` origin (exploitable via sandboxed iframes)
- Overly broad allowed methods and headers

References:
- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [OWASP: CORS Testing](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/11-Client-side_Testing/07-Testing_Cross_Origin_Resource_Sharing)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
