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
