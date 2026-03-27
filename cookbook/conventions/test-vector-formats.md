---
id: 1f5e5f5f-b18d-4821-8920-e4d5822fdaa8
title: "Test Vector Formats"
domain: contributing.test-vector-formats
type: reference
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Two formats, use whichever fits:"
platforms: []
tags: 
  - test-vector-formats
depends-on: []
related: []
references: []
---

# Test Vector Formats

Two formats, use whichever fits:

### Behavioral (table)

For state/action/outcome tests:

```markdown
| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| component-001 | REQ-001 | Action description | Expected outcome |
| component-002 | REQ-002, REQ-003 | Action description | Expected outcome |
```

### Data (JSON blocks)

For serialization, algorithms, and wire formats:

```markdown
#### vector-name-001
**Input**:
```json
{ "field": "value" }
```
**Expected**:
```json
{ "result": "value" }
```
```

For complex components, test vectors may also be published as separate JSON files in a `vectors/` directory.
