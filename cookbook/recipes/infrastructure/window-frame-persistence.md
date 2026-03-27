---
id: 85d04a9b-5692-4025-a489-eac8bbb14663
title: "Window Frame Persistence"
domain: cookbook.recipes.infrastructure.window-frame-persistence
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
  - windows
tags: 
  - infrastructure
  - window-frame-persistence
depends-on: []
related: []
references: []
---

# Window Frame Persistence

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS]
tags: [window, persistence, frame, macOS]
dependencies: []
---

## Overview

An invisible view modifier that persists a window's position and size between sessions using the platform's native frame autosave mechanism. Attached as a background modifier to any window's root content. On macOS, accesses the hosting `NSWindow` and calls `setFrameAutosaveName`. Supports a close callback for cleanup.

## Behavioral Requirements

- **REQ-001**: The component MUST persist the window's frame (origin + size) across app sessions using `NSWindow.setFrameAutosaveName`.
- **REQ-002**: Each window MUST have a unique autosave name. For document windows, this SHOULD be derived from the document's file path (e.g., SHA256 hash prefix).
- **REQ-003**: The component MUST NOT be visible — it renders as an empty `NSView` added as a background.
- **REQ-004**: The component MUST access the hosting `NSWindow` via the view hierarchy after a brief delay (next main run loop cycle) to ensure the window exists.
- **REQ-005**: The component MAY accept an `onClose` callback that fires when the window is closed (via `NSWindow.willCloseNotification`).
- **REQ-006**: The component MUST clean up notification observers on deinit.
- **REQ-007**: On first launch (no saved frame), the window SHOULD use its default position/size defined elsewhere.

## Appearance

Not applicable — this component is invisible.

## States

| State | Behavior |
|-------|----------|
| Window appears | Autosave name applied, previous frame restored if saved |
| Window moved/resized | Frame auto-saved by AppKit (no manual intervention needed) |
| Window closed | `onClose` callback fired, observers cleaned up |
| No saved frame | Window uses default layout |

## Accessibility

Not applicable — this component has no visual or interactive surface.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| frame-001 | REQ-001 | Open window, move to (200,300), close, reopen | Window appears at (200,300) |
| frame-002 | REQ-001 | Open window, resize to 800×600, close, reopen | Window appears at 800×600 |
| frame-003 | REQ-002 | Open two document windows | Each has unique autosave name, saved independently |
| frame-004 | REQ-003 | Inspect view hierarchy | No visible NSView from this component |
| frame-005 | REQ-005 | Close window with onClose callback | Callback fires |

## Edge Cases

- **Window opens off-screen** (e.g., saved on external monitor now disconnected): AppKit handles this — `setFrameAutosaveName` adjusts to visible screen area.
- **Duplicate autosave names**: Two windows with the same name will interfere. Use unique identifiers.
- **Rapid open/close**: Observer cleanup in deinit prevents leaks.

## Logging

Subsystem: `{{bundle_id}}` | Category: `WindowFrame`

| Event | Level | Message |
|-------|-------|---------|
| Frame autosave set | debug | `WindowFrame: autosave name set to "{{name}}"` |
| Window closed | debug | `WindowFrame: window "{{name}}" closed` |

## Platform Notes

- **SwiftUI (macOS)**: Implement as `NSViewRepresentable`. In `makeNSView`, return an empty `NSView`. In `updateNSView`, dispatch to main queue to access `view.window`, then call `window.setFrameAutosaveName(name)`. Observe `NSWindow.willCloseNotification` for close callback. Attach via `.background(WindowAccessor(name: "...", onClose: { }))`.
- **Other platforms**: Not applicable. iOS, Android, and Web handle window/view positioning differently (iOS has no user-movable windows, Android has activity lifecycle, Web uses CSS/URL state).

## Design Decisions

_None yet._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, extracted from scratching-post WindowAccessor |
