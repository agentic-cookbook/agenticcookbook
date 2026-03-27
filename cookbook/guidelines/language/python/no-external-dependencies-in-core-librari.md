---
id: dca53225-bd2b-4a11-8abb-5226e05de4a7
title: "No external dependencies in core libraries"
domain: cookbook.guidelines.language.python.no-external-dependencies-in-core-librari
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "`roadmap_lib` uses the standard library only. Do not add PyYAML, requests, or other third-party packages to core libr..."
platforms: []
tags: 
  - language
  - no-external-dependencies-in-core-librari
  - python
depends-on: []
related: []
references: []
---

# No external dependencies in core libraries

`roadmap_lib` uses the standard library only. Do not add PyYAML, requests, or other third-party packages to core library code. This keeps the library portable and installable without dependency management.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
