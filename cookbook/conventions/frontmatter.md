---
id: b20d2528-fd14-404e-99bc-a1295256aa46
title: "Frontmatter"
domain: contributing.frontmatter
type: reference
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Every spec starts with a YAML frontmatter block:"
platforms: 
  - kotlin
  - web
  - windows
tags: 
  - frontmatter
depends-on: []
related: []
references: []
---

# Frontmatter

Every spec starts with a YAML frontmatter block:

```yaml
---
version: 1.0.0
status: draft | review | accepted | deprecated
created: YYYY-MM-DD
last-updated: YYYY-MM-DD
author: Name or claude-code
copyright: 2026 Mike Fullerton / Temporal. All rights reserved.
platforms: [Apple, Android, Windows, Web]
tags: [category, feature-area]
dependencies:
  - path/to/other-spec.md@1.0.0
supersedes: null
---
```

Field definitions:

- **version**: Semver. Major for breaking changes, minor for new requirements, patch for clarifications.
- **status**: `draft` (work in progress), `review` (ready for feedback), `accepted` (stable), `deprecated` (superseded).
- **created**: Immutable date of first creation.
- **last-updated**: Date of most recent change.
- **platforms**: Which platforms this spec targets.
- **dependencies**: Other specs this one references, with version pins. Omit if none.
