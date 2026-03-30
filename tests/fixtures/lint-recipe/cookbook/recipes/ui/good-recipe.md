---
id: b1111111-1111-1111-1111-111111111111
title: "Primary Button"
domain: agentic-cookbook://recipes/ui/good-recipe
type: recipe
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "A primary action button with standard states and accessibility support."
platforms:
  - swift
  - kotlin
  - typescript
  - web
tags:
  - ui
  - button
depends-on: []
related: []
references: []
---

# Primary Button

## Overview

A primary action button used for the main call-to-action on a screen.

## Behavioral Requirements

- **tap-triggers-action**: Button MUST trigger its associated action on tap/click.
- **disabled-prevents-action**: Button MUST NOT trigger its action when in the disabled state.
- **loading-shows-indicator**: Button SHOULD display a loading indicator when processing.

## Appearance

- **Corner radius**: 8pt
- **Padding**: 12pt vertical, 24pt horizontal
- **Font**: Semibold, 16pt
- **Background**: Brand primary color
- **Foreground/Text**: White
- **Border**: None
- **Shadow**: 0 2pt 4pt rgba(0,0,0,0.1)
- **Min/Max size**: Min height 44pt

## States

| State | Appearance change |
|-------|------------------|
| Default | Standard appearance |
| Pressed | Background darkened 10% |
| Disabled | Opacity 0.4 |
| Focused | 2pt focus ring |
| Loading | Spinner replaces label |

## Accessibility

- Role: button
- Label: Action text content
- Announce loading state changes
- Minimum tap target: 44x44pt

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| btn-001 | tap-triggers-action | Tap default button | Action fires |
| btn-002 | disabled-prevents-action | Tap disabled button | No action |
| btn-003 | loading-shows-indicator | Set loading state | Spinner visible |

## Edge Cases

- Button label longer than available width should truncate with ellipsis
- Rapid taps should debounce to a single action

## Deep Linking

| Platform | URL Pattern |
|----------|-------------|
| Apple | `myapp://button` |
| Android | `https://myapp.example/button` |
| Web | `/button` |

## Localization

| String Key | Default (en) | Context |
|-----------|-------------|---------|
| btn.submit | Submit | Primary action label |

## Accessibility Options

| Option | Behavior |
|--------|----------|
| Reduce Motion | Disable press animation |
| Increase Contrast | Use higher contrast background |
| Differentiate Without Color | Add underline to label |

## Feature Flags

| Flag Key | Default | Description |
|----------|---------|-------------|
| `app.primary_button` | `true` | Enables the primary button |

## Analytics

| Event | Properties | When |
|-------|-----------|------|
| `button.tapped` | `{ label: string }` | User taps the button |

## Privacy

- **Data collected**: None
- **Storage**: N/A
- **Transmission**: N/A
- **Retention**: N/A

## Logging

Subsystem: `com.example.app` | Category: `PrimaryButton`

| Event | Level | Message |
|-------|-------|---------|
| tap | debug | `PrimaryButton: tapped with label={label}` |

## Platform Notes

- **SwiftUI**: Use `.buttonStyle(.primary)`
- **Compose**: Use `PrimaryButton` composable
- **React/Web**: Use `<Button variant="primary">`

## Design Decisions

- Chose 8pt corner radius for consistency with card components.

## Compliance

| Check | Status | Category |
|-------|--------|----------|
| [interactive-target-size](agentic-cookbook://compliance/accessibility#interactive-target-size) | passed | Accessibility |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
