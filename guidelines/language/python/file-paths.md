---
id: 1aef5b69-c5d5-4b9f-907e-285ee03cb079
title: "File paths"
domain: agentic-cookbook://guidelines/language/python/file-paths
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Use `pathlib.Path`, not `os.path`. All path manipulation should go through `pathlib`."
platforms: 
  - python
tags: 
  - file-paths
  - language
  - python
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# File paths

`pathlib.Path` MUST be used, not `os.path`. All path manipulation MUST go through `pathlib`.

```python
from pathlib import Path

roadmap_dir = Path.home() / ".roadmaps" / project_name
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
