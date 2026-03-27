---
id: 12d6b9fe-d1a0-4b9f-b772-41d9b4aa0b8a
title: "Security Headers Checklist"
domain: cookbook.guidelines.security.security-headers-checklist
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Every web application should set these response headers:"
platforms: 
  - web
tags: 
  - security
  - security-headers-checklist
depends-on: []
related: []
references: []
---

# Security Headers Checklist

Every web application should set these response headers:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
Content-Security-Policy: default-src 'none'; script-src 'nonce-{random}' 'strict-dynamic'; ...
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Cache-Control: no-store  (for sensitive responses)
```
