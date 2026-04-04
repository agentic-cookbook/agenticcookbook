---
id: 497a717f-de29-4baf-b7b8-4487f672d9a8
title: "Design-Time Data"
domain: agentic-cookbook://guidelines/platform/windows/design-time-data
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "- Use `d:DataContext` and `d:DesignInstance` for XAML designer preview data"
platforms: 
  - csharp
  - windows
tags: 
  - design-time-data
  - platform
  - windows
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# Design-Time Data

Wire up design-time data contexts so the XAML designer always shows realistic preview content, not empty surfaces.

- Views SHOULD use `d:DataContext` and `d:DesignInstance` for XAML designer preview data
- XAML Hot Reload SHOULD be used for live iteration during development

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
