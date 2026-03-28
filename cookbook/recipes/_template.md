---
id: 611115cb-0e59-402e-bc77-140f53e32607
title: "ComponentName"
domain: agentic-cookbook://recipes/_template
type: recipe
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "version: 1.0.0"
platforms: 
  - kotlin
  - swift
  - typescript
  - web
tags: []
depends-on: []
related: []
references: []
---

# ComponentName

---
version: 1.0.0
status: draft
created: YYYY-MM-DD
last-updated: YYYY-MM-DD
author:
copyright: YYYY Mike Fullerton / Temporal
platforms: []
tags: []
dependencies: []
---

## Overview

Brief description of what this component is and when to use it.

## Behavioral Requirements

- **REQ-001**: Component MUST ...
- **REQ-002**: Component SHOULD ...
- **REQ-003**: Component MAY ...

## Appearance

- **Corner radius**:
- **Padding**: vertical × horizontal
- **Font**: weight, size
- **Background**: color value or description
- **Foreground/Text**: color value or description
- **Border**: width, color (if any)
- **Shadow**: offset, blur, color (if any)
- **Min/Max size**: constraints (if any)

## States

| State | Appearance change |
|-------|------------------|
| Default | — |
| Pressed | |
| Disabled | |
| Focused | |
| Loading | |

## Accessibility

- Role/trait (e.g., button, heading, text field)
- Label requirements
- Announce state changes (e.g., loading, disabled)
- Minimum tap target: 44×44pt

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| component-001 | REQ-001 | | |

## Edge Cases

- Describe boundary conditions, error states, unexpected input

## Deep Linking

| Platform | URL Pattern |
|----------|-------------|
| Apple | `{{app_scheme}}://component-name` |
| Android | `https://{{app_domain}}/component-name` |
| Web | `/component-name` |

## Localization

| String Key | Default (en) | Context |
|-----------|-------------|---------|
| | | |

## Accessibility Options

Document which accessibility display options (Rule 15) this component responds to:

| Option | Behavior |
|--------|----------|
| Reduce Motion | |
| Increase Contrast | |
| Differentiate Without Color | |

## Feature Flags

| Flag Key | Default | Description |
|----------|---------|-------------|
| `{{app_prefix}}.component_name` | `true` | Enables this component |

## Analytics

| Event | Properties | When |
|-------|-----------|------|
| `component_name.viewed` | `{}` | Component appears on screen |
| `component_name.interacted` | `{ action: string }` | User interacts with component |

## Privacy

- **Data collected**: None / describe what is collected
- **Storage**: Where and how data is stored
- **Transmission**: Whether data leaves the device
- **Retention**: How long data is kept

## Logging

Subsystem: `{{bundle_id}}` | Category: `ComponentName`

| Event | Level | Message |
|-------|-------|---------|
| | debug | `ComponentName: ` |

## Platform Notes

- **SwiftUI**:
- **Compose**:
- **React/Web**:

## Design Decisions

Record any decisions made during implementation that affect visual or behavioral outcome. Each decision should be approved by the user.

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | YYYY-MM-DD | Initial spec |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
