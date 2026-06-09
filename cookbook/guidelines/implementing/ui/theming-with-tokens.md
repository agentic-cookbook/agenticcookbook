---
id: 70f2ab2f-a05f-4981-9fea-e9d169fc1753
title: "Theming with tokens"
domain: agenticdevelopercookbook://guidelines/implementing/ui/theming-with-tokens
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-06-09
modified: 2026-06-09
author: Mike Fullerton
copyright: "2026 Mike Fullerton"
license: MIT
summary: "Implement themes as alternate value sets for the same semantic tokens; swap the active set, never the component code."
platforms:
  - swift
  - kotlin
  - typescript
  - csharp
  - web
tags:
  - design-system
  - theming
  - tokens
depends-on: []
related:
  - agenticdevelopercookbook://guidelines/implementing/ui/theming
  - agenticdevelopercookbook://guidelines/implementing/ui/color
  - agenticdevelopercookbook://guidelines/planning/ui/design-tokens
references:
  - https://www.designtokens.org/
approved-by: "approve-artifact v1.0.0"
approved-date: 2026-06-09
triggers:
  - ui-implementation
  - accessibility
---

# Theming with tokens

A theme is just an alternate set of values for the same semantic tokens. Components read semantic
tokens, so switching the active value set re-themes the whole UI automatically — you never edit
component code to add a theme.

## The token layering model

Keep three tiers so themes only rebind the middle one:

| Tier | Example | Themed? |
|------|---------|---------|
| **Primitive** (raw scale) | `blue-600 = #2563EB` | No — a fixed palette |
| **Semantic** (role) | `color.text.primary`, `color.surface.raised` | Yes — each theme maps it to a primitive |
| **Component** (optional) | `button.primary.background` | Aliases a semantic token |

- Components **MUST** consume only semantic (or component) tokens, never primitives or hard-coded
  literals. This is what makes theming automatic.
- Each theme **SHOULD** be authored as a value set that rebinds every semantic token — same keys,
  different primitive references. Light, dark, and high-contrast are sibling sets, not branches in code.

## Switching the active set

- Resolve tokens at a single boundary: a CSS custom-property scope (`:root[data-theme]`,
  `@media (prefers-color-scheme)`), a SwiftUI `Environment`/asset catalog, a Compose
  `MaterialTheme`/`CompositionLocal`, or a WinUI `ResourceDictionary` theme dictionary.
- Theme switching **MUST** be a single state change (swap the set), not per-component conditionals.
- Every semantic token **MUST** be defined in every theme. A missing key is a defect — fail fast in a
  build/test check rather than falling back silently.

## Respect the system and accessibility settings

- The app **MUST** honor the OS theme by default (`prefers-color-scheme`,
  `UITraitCollection.userInterfaceStyle`, `isSystemInDarkTheme()`, `RequestedTheme`), and **SHOULD**
  offer an explicit override.
- Provide a **high-contrast / increase-contrast** theme and **MUST** respond to the system signal
  (`prefers-contrast: more`, `forced-colors`/Windows High Contrast,
  `UIAccessibility.isDarkerSystemColorsEnabled`, `accessibilityHighContrast`).
- Under forced-colors / Windows High Contrast, defer to system colors; do not override them.

## Verify contrast per theme

- Every theme **MUST** satisfy WCAG 2.1 AA contrast: 4.5:1 normal text, 3:1 large text (18pt+ or 14pt+
  bold) and non-text UI/graphical components.
- Contrast **MUST** be checked for each theme independently — a token pair that passes in light can
  fail in dark or high-contrast. Automate this against the value sets in CI; do not eyeball it.
- Color **MUST NOT** be the sole signal for state (see
  agenticdevelopercookbook://guidelines/implementing/ui/color).

## Notes

- Pin the token spec: align names/types to the W3C Design Tokens Community Group Format Module
  (Draft, designtokens.org). It is a **draft**; treat structural details as a moving target and isolate
  the parser/build step so a spec revision is a localized change (forecast: ongoing revisions).
- Adopt a token build pipeline (e.g., Style Dictionary) only when measured need justifies it — a small
  app may hand-author per-platform value sets (per YAGNI).

References:
- [Design Tokens Community Group](https://www.designtokens.org/)
- [WCAG 1.4.3: Contrast (Minimum)](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WCAG 1.4.11: Non-text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-09 | Mike Fullerton | Initial creation |
