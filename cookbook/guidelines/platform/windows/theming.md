---
id: 5cc9773e-78de-493e-891c-2a819baf9b60
title: "Theming"
domain: cookbook.guidelines.platform.windows.theming
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
---

# Theming

WinUI 3 supports tri-state theming: Light, Dark, and High Contrast.

- Set app-level theme via `Application.RequestedTheme`, override per-element with `FrameworkElement.RequestedTheme`
- Always use `ThemeResource` (not `StaticResource`) for colors and brushes — enables runtime theme switching
- Use semantic color resources (`TextFillColorPrimary`, `CardBackgroundFillColorDefault`) not hex values
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
