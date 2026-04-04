---
id: c84400d9-83b3-4c4c-83d4-325dfa989202
title: "Rate Limiting"
domain: agentic-cookbook://guidelines/networking/rate-limiting
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Respect server rate limits. Handle 429 responses gracefully."
platforms: []
tags: 
  - networking
  - rate-limiting
depends-on: []
related: []
references: 
  - https://www.rfc-editor.org/rfc/rfc6585
approved-by: ""
approved-date: ""
---

# Rate Limiting

Respect server rate limits. Handle 429 responses gracefully.

- Always honor the `Retry-After` header (seconds or HTTP-date)
- If no `Retry-After`, use exponential backoff (see Retry section)
- Track `RateLimit-Remaining` headers proactively — slow down before hitting 429
- Queue and batch requests at the allowed rate rather than fire-and-retry

References:
- [RFC 6585: 429 Too Many Requests](https://www.rfc-editor.org/rfc/rfc6585)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
