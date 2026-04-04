---
id: 8d52028b-d358-4965-93a1-030fc8405068
title: "Always show progress"
domain: agentic-cookbook://guidelines/ui/always-show-progress
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "When the UI is waiting on an async task:"
platforms: []
tags: 
  - always-show-progress
  - ui
depends-on: []
related: []
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-04-04"
---

# Always show progress

When the UI is waiting on an async task:

- **Determinate progress** (progress bar with percentage) MUST be shown when total work is known
- **Indeterminate progress** (spinner, skeleton, shimmer) MUST be shown when it is not
- The UI MUST NOT appear frozen or unresponsive

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
