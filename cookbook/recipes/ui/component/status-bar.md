---
id: 22729bee-7ab4-4648-aa5a-2beef067d0c3
title: "Status Bar"
domain: agentic-cookbook://recipes/ui/component/status-bar
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
  - status-bar
  - ui
depends-on: []
related: []
references: []
---

# Status Bar

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [iOS, macOS, watchOS, tvOS, visionOS, Android, Web]
tags: [progress, loading, sync, status]
dependencies: []
---

## Overview

A slim, animated bar that slides in at the bottom of a view to indicate a background operation is in progress. Shows an indeterminate spinner and a status text message. Appears during sync, loading, or processing operations and disappears when complete.

## Behavioral Requirements

- **REQ-001**: The bar MUST slide in from the bottom edge with an animated transition when an operation begins.
- **REQ-002**: The bar MUST slide out with an animated transition when the operation completes.
- **REQ-003**: The bar MUST display an indeterminate progress spinner (platform-native).
- **REQ-004**: The bar MUST display a status text message describing the current operation.
- **REQ-005**: The bar MUST be overlaid on existing content (not push content up).
- **REQ-006**: The animation MUST use an ease-in-out curve with ~0.3s duration.
- **REQ-007**: The bar SHOULD support updating the status text while visible (e.g., "Scanning…" → "Scanning 42 files…").
- **REQ-008**: The bar MUST NOT block interaction with the content beneath it.

## Appearance

- **Height**: 28–32pt
- **Background**: System material / translucent with subtle blur (or opaque secondary background)
- **Spinner**: Platform-native indeterminate `ProgressView` / `CircularProgressIndicator` / CSS spinner, 16pt
- **Text**: Caption, secondary color
- **Spacing**: 8pt between spinner and text
- **Padding**: 8pt horizontal, 4pt vertical
- **Corner radius**: 0 (full-width bar) or 8pt if floating
- **Position**: Bottom edge of container, full width

## States

| State | Appearance |
|-------|-----------|
| Hidden | Not rendered, no space consumed |
| Appearing | Slides in from bottom with opacity fade |
| Visible | Spinner animating, text displayed |
| Text updating | Text cross-fades to new value |
| Disappearing | Slides out to bottom with opacity fade |

## Accessibility

- **REQ-009**: The bar MUST announce its appearance to screen readers with the status text.
- **REQ-010**: Status text updates SHOULD be announced as polite live region updates (not interrupting).

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| status-001 | REQ-001 | Set isSyncing = true | Bar slides in from bottom |
| status-002 | REQ-002 | Set isSyncing = false | Bar slides out to bottom |
| status-003 | REQ-005 | Bar visible over scrollable content | Content beneath is still scrollable |
| status-004 | REQ-007 | Change text while visible | Text updates without bar re-animating |
| status-005 | REQ-008 | Tap content behind visible bar | Content responds to tap |

## Edge Cases

- **Rapid show/hide**: If the operation completes before the appear animation finishes, the bar SHOULD reverse smoothly (not jump).
- **Very long status text**: Truncate with ellipsis on one line.
- **Multiple overlapping operations**: Show the most recent status text. Bar stays visible until all operations complete.

## Logging

Subsystem: `{{bundle_id}}` | Category: `StatusBar`

| Event | Level | Message |
|-------|-------|---------|
| Shown | debug | `StatusBar: shown with "{{text}}"` |
| Text updated | debug | `StatusBar: updated to "{{text}}"` |
| Hidden | debug | `StatusBar: hidden` |

## Platform Notes

- **SwiftUI**: Use `.overlay(alignment: .bottom)` with a `Group` that conditionally renders the bar. Transition: `.move(edge: .bottom).combined(with: .opacity)`. Animation: `.easeInOut(duration: 0.3)`. Use `ProgressView()` for spinner.
- **Compose**: `Box(modifier = Modifier.fillMaxSize())` with `AnimatedVisibility(enter = slideInVertically + fadeIn, exit = slideOutVertically + fadeOut)` at bottom. `CircularProgressIndicator(modifier = Modifier.size(16.dp))`.
- **React/Web**: Absolutely positioned `<div>` at `bottom: 0` with CSS transition on `transform: translateY()` and `opacity`. Use CSS `@keyframes spin` for spinner or a library spinner.

## Design Decisions

_None yet._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, extracted from scratching-post SyncProgressBar |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
