---
id: 72DAFECD-184A-4974-9EEC-3FCE8D9447A6
title: "Artifact Formatting Compliance"
domain: agentic-cookbook://compliance/artifact-formatting/INDEX
type: reference
version: 1.0.0
status: draft
language: en
created: 2026-04-04
modified: 2026-04-04
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Index of structural formatting checks for cookbook artifacts — principles, guidelines, and recipes."
platforms: []
tags:
  - compliance
  - artifact-formatting
  - index
depends-on:
  - agentic-cookbook://introduction/conventions
related:
  - agentic-cookbook://compliance/INDEX
references: []
---

# Artifact Formatting Compliance

Structural formatting checks for cookbook artifacts. Each artifact type (principle, guideline, recipe) has its own set of checks defining the required sections, ordering, and content rules. These checks are the authoritative spec that `/lint-artifact` and `/approve-artifact` evaluate against.

## Architecture

```
/lint-artifact  →  Formatting Checks  →  Conventions  →  Frontmatter Standard
/approve-artifact     (this category)      (introduction/conventions.md)
```

- **Formatting checks** define required structure per artifact type
- **Conventions** define the shared frontmatter and cross-referencing rules all artifacts share
- Checks here govern the artifact's markdown structure, not the code it describes

## Sub-Categories

| Category | File | Checks | Scope |
|----------|------|--------|-------|
| Principle Formatting | [principle-formatting.md](principle-formatting.md) | 7 | Required structure for principle artifacts |
| Guideline Formatting | [guideline-formatting.md](guideline-formatting.md) | 8 | Required structure for guideline artifacts |
| Recipe Formatting | [recipe-formatting.md](recipe-formatting.md) | 15 | Required structure for recipe artifacts |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-04 | Mike Fullerton | Initial creation |
