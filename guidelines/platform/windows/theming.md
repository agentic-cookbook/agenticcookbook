---
id: 5cc9773e-78de-493e-891c-2a819baf9b60
title: "Theming"
domain: agentic-cookbook://guidelines/platform/windows/theming
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "WinUI 3 supports tri-state theming: Light, Dark, and High Contrast."
platforms: 
  - csharp
  - windows
tags: 
  - platform
  - theming
  - windows
depends-on: []
related: []
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-04-04"
---

# Theming

WinUI 3 supports tri-state theming: Light, Dark, and High Contrast.

- Set app-level theme via `Application.RequestedTheme`, override per-element with `FrameworkElement.RequestedTheme`
- Colors and brushes MUST use `ThemeResource` (not `StaticResource`) — enables runtime theme switching
- Semantic color resources (`TextFillColorPrimary`, `CardBackgroundFillColorDefault`) SHOULD be used instead of hex values
- Define custom theme-aware colors in a `ResourceDictionary` with `Default`/`Light`/`Dark` theme dictionaries

```xml
<!-- Good: semantic theme resource -->
<TextBlock Foreground="{ThemeResource TextFillColorPrimaryBrush}" />

<!-- Bad: hard-coded color -->
<TextBlock Foreground="#FFFFFF" />
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
