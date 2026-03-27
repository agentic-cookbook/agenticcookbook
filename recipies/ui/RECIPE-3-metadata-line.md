# Metadata Line

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [iOS, macOS, watchOS, tvOS, visionOS, Android, Web]
tags: [label, metadata, icon, text]
dependencies: []
---

## Overview

A compact, single-line label combining a leading icon with a text value. Used to display metadata: file paths, git branches, process names, timestamps, status indicators. A fundamental building block for list rows, sidebars, and inspector panels.

## Behavioral Requirements

- **REQ-001**: The component MUST display a leading icon and a text label on a single line.
- **REQ-002**: The text MUST truncate with an ellipsis when it exceeds available width. The truncation position SHOULD be configurable: head, middle, or tail (default: tail).
- **REQ-003**: The icon MUST be a platform-native symbol (SF Symbol, Material Icon, or inline SVG).
- **REQ-004**: The component SHOULD support an optional tooltip showing the full, untruncated text (desktop platforms).
- **REQ-005**: The component MUST use secondary/tertiary text color by default to visually recede as metadata.
- **REQ-006**: The icon and text MUST be vertically centered on the same baseline.

## Appearance

- **Icon**: 12pt system symbol, secondary color
- **Text**: Caption/caption2, secondary color, single line
- **Spacing**: 4pt between icon and text
- **Height**: Natural text height (~16–18pt)
- **Truncation**: Configurable (`.head`, `.middle`, `.tail`)

## States

| State | Appearance |
|-------|-----------|
| Default | Icon + text in secondary color |
| Highlighted | Optional: primary color when parent row is selected |
| Empty value | Hide entirely or show placeholder dash |

## Accessibility

- **REQ-007**: The component MUST be a single accessibility element combining icon meaning and text into one label (e.g., "Branch: main" not "branch icon" then "main").
- **REQ-008**: If the text is truncated, the accessibility label MUST contain the full text.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| meta-001 | REQ-001 | icon: "folder", text: "/Users/me/projects" | Icon + text displayed on one line |
| meta-002 | REQ-002 | text: very long path, truncation: middle | Displays "…" in middle of path |
| meta-003 | REQ-004 | Hover over truncated text on macOS | Tooltip shows full text |
| meta-004 | REQ-008 | VoiceOver on truncated text | Full text announced |

## Edge Cases

- **Empty text**: Component SHOULD hide itself or show a dash placeholder.
- **Very short container**: Icon alone may show if text has zero space — acceptable.
- **RTL languages**: Icon remains on the leading edge (which is right in RTL).

## Logging

Subsystem: `{{bundle_id}}` | Category: `MetadataLine`

| Event | Level | Message |
|-------|-------|---------|
| Displayed | debug | `MetadataLine: displayed "{{text}}" with icon "{{icon}}"` |

## Platform Notes

- **SwiftUI**: `Label("text", systemImage: "icon").labelStyle(.titleAndIcon)` or custom `HStack { Image(systemName:) Text() }` with `.lineLimit(1).truncationMode()`.
- **Compose**: `Row(verticalAlignment = Alignment.CenterVertically) { Icon(); Spacer(4.dp); Text(maxLines = 1, overflow = TextOverflow.Ellipsis) }`.
- **React/Web**: `<span>` with flexbox `display: inline-flex; align-items: center; gap: 4px`. CSS `text-overflow: ellipsis; white-space: nowrap; overflow: hidden`.

## Design Decisions

_None yet._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, extracted from scratching-post SubtitleLineView |
