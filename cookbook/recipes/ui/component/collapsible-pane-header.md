---
id: 1dd2111a-eb05-40e4-b469-1aecd79c5863
title: "Collapsible Pane Header"
domain: cookbook.recipes.ui.component.collapsible-pane-header
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
tags: 
  - collapsible-pane-header
  - component
  - ui
depends-on: []
related: []
references: []
---

# Collapsible Pane Header

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS, iOS, visionOS]
tags: [layout, split-view, collapse, header]
dependencies: []
---

## Overview

A clickable header bar with a disclosure chevron that collapses or expands a section of a split view. Used at the top of split pane sections (e.g., editor pane, terminal pane, sidebar) to let the user hide/show content areas. Common in IDE-style multi-pane layouts.

## Behavioral Requirements

- **REQ-001**: Tapping anywhere on the header MUST toggle the associated pane's visibility.
- **REQ-002**: The disclosure chevron MUST animate between collapsed (pointing right) and expanded (pointing down) states.
- **REQ-003**: The pane collapse/expand MUST animate with an ease-in-out curve (~0.2s duration).
- **REQ-004**: The header MUST display a title.
- **REQ-005**: The header MAY display an icon to the left of the title (e.g., a file icon for an editor pane header).
- **REQ-006**: The header MAY display a subtitle or secondary label to the right of the title (e.g., a filename).
- **REQ-007**: The header MUST remain visible when the pane is collapsed — it is the mechanism to re-expand.
- **REQ-008**: The collapsed/expanded state MUST be persisted per-pane so it survives app restart.

## Appearance

- **Height**: 24–28pt (compact, does not waste vertical space)
- **Background**: System tertiary background / subtle separator color
- **Chevron**: 10pt system disclosure indicator, leading edge, secondary color
- **Title**: Caption or footnote weight medium, primary color
- **Icon** (optional): 12pt system symbol, leading, before title
- **Subtitle** (optional): Caption weight regular, secondary color, trailing
- **Padding**: 6pt vertical, 8pt horizontal
- **Cursor**: Pointer cursor on hover (macOS)

## States

| State | Appearance |
|-------|-----------|
| Expanded | Chevron points down, pane content visible |
| Collapsed | Chevron points right, pane content hidden, header remains |
| Hover (macOS) | Subtle background highlight, pointer cursor |

## Accessibility

- **REQ-009**: The header MUST be a button role with label describing the action: "Collapse {{title}}" or "Expand {{title}}".
- **REQ-010**: The expanded/collapsed state MUST be announced: `accessibilityValue("expanded")` or `accessibilityValue("collapsed")`.
- **REQ-011**: The header MUST be keyboard-focusable and toggleable via Return/Space.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| pane-001 | REQ-001 | Tap header when expanded | Pane collapses with animation |
| pane-002 | REQ-001 | Tap header when collapsed | Pane expands with animation |
| pane-003 | REQ-002 | Toggle pane | Chevron animates between down↔right |
| pane-004 | REQ-007 | Collapse pane | Header still visible, pane content hidden |
| pane-005 | REQ-008 | Collapse pane, restart app | Pane opens collapsed |
| pane-006 | REQ-011 | Focus header with keyboard, press Return | Pane toggles |

## Edge Cases

- **Multiple pane headers in one window**: Each operates independently.
- **All panes collapsed**: The split view should show only headers stacked vertically — this is valid.
- **Pane has minimum height**: Collapse overrides minimum height constraints.

## Logging

Subsystem: `{{bundle_id}}` | Category: `PaneHeader`

| Event | Level | Message |
|-------|-------|---------|
| Toggled | debug | `PaneHeader: "{{title}}" toggled to {{expanded\|collapsed}}` |

## Platform Notes

- **SwiftUI (macOS)**: `HStack` with `Image(systemName: "chevron.right").rotationEffect(isExpanded ? .degrees(90) : .degrees(0))`. Use `.onTapGesture` on the entire `HStack`. Persist via `@AppStorage` or project settings binding. Animate with `.animation(.easeInOut(duration: 0.2), value: isExpanded)`.
- **SwiftUI (iOS/visionOS)**: Same pattern, useful in `HSplitView` or custom multi-pane layouts.
- **Compose**: `Row` with `Icon` (animated rotation via `animateFloatAsState`). Click on entire row. Persist via `rememberSaveable` or preferences.

## Design Decisions

_None yet._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, extracted from scratching-post PaneHeader/EditorPaneHeader |
