---
id: f68778f2-65e3-4e89-bbf8-115151efa9dc
title: "Database"
domain: agentic-cookbook://guidelines/language/python/database
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Use SQLite with WAL mode for concurrent read access. No ORM — use direct SQL via the `sqlite3` standard library module."
platforms: 
  - python
tags: 
  - database
  - language
  - python
depends-on: []
related: []
references: []
---

# Database

Use SQLite with WAL mode for concurrent read access. No ORM — use direct SQL via the `sqlite3` standard library module.

```python
conn = sqlite3.connect(db_path)
conn.execute("PRAGMA journal_mode=WAL")
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
