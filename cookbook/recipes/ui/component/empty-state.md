---
id: ce2af25c-4f18-41ae-91b9-342e363449b3
title: "Empty State"
domain: cookbook.recipes.ui.component.empty-state
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
  - ios
  - kotlin
  - macos
  - swift
  - typescript
  - web
tags: 
  - component
  - empty-state
  - ui
depends-on: []
related: []
references: []
---

# Empty State

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [iOS, macOS, watchOS, tvOS, visionOS, Android, Web]
tags: [placeholder, empty, onboarding]
dependencies: []
---

## Overview

A centered placeholder view shown when there is no content to display. Used for: empty lists, no search results, no selection in a split view, first-launch with no data, error states, or any view that needs to communicate "nothing here yet" with an optional call to action.

## Behavioral Requirements

- **REQ-001**: The empty state MUST be centered both horizontally and vertically within its container.
- **REQ-002**: The empty state MUST display at minimum an icon and a heading.
- **REQ-003**: The empty state MAY display a description below the heading for additional context.
- **REQ-004**: The empty state MAY display one or more action buttons below the description.
- **REQ-005**: If action buttons are present, the primary action SHOULD be visually prominent (filled/borderedProminent style).
- **REQ-006**: The empty state MUST adapt to the container's available space — it MUST NOT overflow or require scrolling in typical container sizes.
- **REQ-007**: On Apple platforms (iOS 17+, macOS 14+), implementations SHOULD use the native `ContentUnavailableView` as the base control.
- **REQ-008**: The icon MUST use a platform-native symbol (SF Symbol on Apple, Material Icon on Android, inline SVG on Web).

## Appearance

- **Icon**: 48pt system symbol, secondary color
- **Heading**: Title3 weight semibold (Apple), Headline5 (Material), h3 (Web)
- **Description**: Subheadline/body, secondary/tertiary color, max 2 lines, centered
- **Action buttons**: Standard platform button styles, 8pt spacing between multiple buttons
- **Vertical spacing**: 8pt icon→heading, 4pt heading→description, 16pt description→buttons
- **Max content width**: 280pt (prevents overly wide text on large screens)

## States

| State | Appearance |
|-------|-----------|
| Icon + heading only | Minimal empty state |
| With description | Adds context text below heading |
| With single action | One prominent button below |
| With multiple actions | Primary + secondary buttons, stacked or horizontal |
| Loading | Can transition from empty state to content via fade |

## Accessibility

- **REQ-009**: The heading MUST be the first element announced by screen readers.
- **REQ-010**: Action buttons MUST have descriptive labels (not just "Go" or "OK").
- **REQ-011**: The icon SHOULD be decorative (`accessibilityHidden(true)`) since the heading conveys the meaning.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| empty-001 | REQ-001 | Render in a 400×400 container | Content is centered |
| empty-002 | REQ-002 | Provide icon + heading only | Both displayed, no crash |
| empty-003 | REQ-004 | Provide 2 action buttons | Both rendered, primary is prominent |
| empty-004 | REQ-006 | Render in 200×150 container | Content fits without scrolling/overflow |
| empty-005 | REQ-007 | Build on macOS 14+ | Uses ContentUnavailableView |
| empty-006 | REQ-011 | Enable VoiceOver, navigate to empty state | Icon is not announced, heading is first |

## Edge Cases

- **Very long heading**: SHOULD truncate to 2 lines max
- **Very long description**: SHOULD truncate to 3 lines max with ellipsis
- **No icon provided**: MUST still display heading (icon is visually expected but not structurally required)
- **Container too small**: Content SHOULD scale down gracefully, not clip

## Logging

Subsystem: `{{bundle_id}}` | Category: `EmptyState`

| Event | Level | Message |
|-------|-------|---------|
| Displayed | debug | `EmptyState: displayed "{{heading}}"` |
| Action tapped | debug | `EmptyState: action "{{label}}" tapped` |

## Platform Notes

- **SwiftUI**: Use `ContentUnavailableView(label:description:actions:)` on iOS 17+/macOS 14+. For older targets, use `VStack` with centered alignment in a `GeometryReader`.
- **Compose**: Use `Column(modifier = Modifier.fillMaxSize(), verticalArrangement = Arrangement.Center, horizontalAlignment = Alignment.CenterHorizontally)` with `Icon`, `Text`, `Button` composables.
- **React/Web**: Centered `<div>` with flexbox `align-items: center; justify-content: center`. Use semantic heading tags (`<h3>`) and `<button>` elements.

## Design Decisions

_None yet._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, extracted from scratching-post WorkspaceWelcomeView |
