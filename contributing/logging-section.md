---
id: 4a8c4b75-a145-4bb4-84de-03e5e87d2b92
title: "Logging Section"
domain: contributing.logging-section
type: reference
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Every behavioral spec MUST include a Logging section with exact log messages. This enables verification by grepping o..."
platforms: []
tags: 
  - logging-section
depends-on: []
related: []
references: []
---

# Logging Section

Every behavioral spec MUST include a Logging section with exact log messages. This enables verification by grepping output rather than visual inspection.

Format: `Subsystem: {{org_package}} | Category: ComponentName`

```markdown
## Logging

Subsystem: `{{bundle_id}}` | Category: `ComponentName`

| Event | Level | Message |
|-------|-------|---------|
| Tap | debug | `ComponentName: tapped, starting async action` |
| Action success | debug | `ComponentName: async action completed (success, {duration}ms)` |
| Action failure | debug | `ComponentName: async action failed ({error})` |
| State change | debug | `ComponentName: state changed to {state}` |
```
