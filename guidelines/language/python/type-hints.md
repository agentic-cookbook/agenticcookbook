---
id: 82072abf-0ece-42da-805d-3cb15ce7921d
title: "Type hints"
domain: agentic-cookbook://guidelines/language/python/type-hints
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Type hints are welcome but not required. Maintain Python 3.9 compatibility — use `from __future__ import annotations`..."
platforms: 
  - python
tags: 
  - language
  - python
  - type-hints
depends-on: []
related: []
references: []
---

# Type hints

Type hints are welcome but not required. Maintain Python 3.9 compatibility — use `from __future__ import annotations` or `typing` module forms (e.g., `list[str]` requires 3.9+, `Optional[str]` works everywhere).

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
