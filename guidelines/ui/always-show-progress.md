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
approved-by: ""
approved-date: ""
---

# Always show progress

When the UI is waiting on an async task:

- Show **determinate progress** (progress bar with percentage) when total work is known
- Show **indeterminate progress** (spinner, skeleton, shimmer) when it is not
- Never show a frozen or unresponsive UI

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
