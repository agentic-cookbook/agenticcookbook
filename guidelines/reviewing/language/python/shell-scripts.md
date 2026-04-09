---

id: 792f0b2d-c4b2-440f-9e58-33fa1e30a2c4
title: "Shell scripts"
domain: agentic-cookbook://guidelines/reviewing/language/python/shell-scripts
type: guideline
version: 1.0.1
status: accepted
language: en
created: 2026-03-27
modified: 2026-04-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Shell script `main()` functions must only call other functions — no inline logic. Keep scripts composable and testable."
platforms: []
tags: 
  - language
  - python
  - shell-scripts
depends-on: []
related: []
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-04-04"
---

# Shell scripts

Shell script `main()` functions MUST only call other functions — no inline logic. Scripts MUST be kept composable and testable.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.1 | 2026-04-09 | Mike Fullerton | Reorganize into use-case directory |
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
