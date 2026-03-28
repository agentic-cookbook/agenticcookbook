---
id: 49acdf9f-e4cb-4492-a620-809438eefb37
title: "Pagination"
domain: agentic-cookbook://guidelines/networking/pagination
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Prefer **cursor pagination** for most APIs — stable under concurrent mutations, consistent"
platforms: []
tags: 
  - networking
  - pagination
depends-on: []
related: []
references: 
  - https://google.aip.dev/158
  - https://opensource.zalando.com/restful-api-guidelines/#pagination
---

# Pagination

Prefer **cursor pagination** for most APIs — stable under concurrent mutations, consistent
performance at any depth. Use offset pagination only when users need page numbers or data
is relatively static.

**Cursor response:**
```json
{
  "data": [ ... ],
  "pagination": {
    "next_cursor": "eyJpZCI6MTAwfQ==",
    "has_more": true
  }
}
```

**Offset response:**
```json
{
  "data": [ ... ],
  "pagination": {
    "offset": 20,
    "limit": 10,
    "total": 142
  }
}
```

References:
- [Google AIP-158: Pagination](https://google.aip.dev/158)
- [Zalando: Pagination](https://opensource.zalando.com/restful-api-guidelines/#pagination)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
