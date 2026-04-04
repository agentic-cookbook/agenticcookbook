---
id: 4c070e8f-332c-4831-95a1-d0776e7b7ce8
title: "YAML frontmatter"
domain: agentic-cookbook://guidelines/language/python/yaml-frontmatter
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Parse YAML frontmatter with the built-in frontmatter parser in `roadmap_lib`. Do not add a PyYAML dependency. The par..."
platforms: []
tags: 
  - language
  - python
  - yaml-frontmatter
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# YAML frontmatter

The built-in frontmatter parser in `roadmap_lib` MUST be used for parsing YAML frontmatter. A PyYAML dependency MUST NOT be added. The parser handles the `---` delimited frontmatter block at the top of markdown files.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
