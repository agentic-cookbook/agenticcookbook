---
id: 6af1d30a-c2ee-4a6d-97ec-50c67f01a243
title: "Inspector Panel"
domain: cookbook.recipes.ui.panel.inspector-panel
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
  - macos
  - swift
  - typescript
  - web
tags: 
  - inspector-panel
  - panel
  - ui
depends-on: []
related: []
references: []
---

# Inspector Panel

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS, iPadOS, visionOS]
tags: [inspector, metadata, sidebar, detail]
dependencies: [ui/git-status-indicator.md@1.0.0, ui/empty-state.md@1.0.0]
---

## Overview

A right-side sliding panel that shows metadata for the currently selected item in the workspace. Toggled via a toolbar button using the standard inspector icon. Uses a `Form` with `LabeledContent` for structured key-value display. Shows an empty state when nothing is selected. Derived from scratching-post `ProjectInspectorView` and `ContentViewerView`.

## Terminology

| Term | Definition |
|------|-----------|
| Inspector | A right-side auxiliary panel that displays detail/metadata about the current selection |
| Selected item | The file or folder currently highlighted in the file tree or content area |
| Metadata row | A single key-value pair displayed via `LabeledContent` inside a `Form` |

## Behavioral Requirements

### Visibility and toggling

- **REQ-001**: The inspector panel MUST slide in from the right side of the window using the platform's native inspector mechanism (SwiftUI `.inspector` modifier or equivalent).
- **REQ-002**: The inspector panel MUST have a fixed width of 250pt.
- **REQ-003**: The inspector panel MUST be toggled via a toolbar button using the standard inspector icon (SF Symbol `sidebar.trailing` on Apple platforms).
- **REQ-004**: The inspector visibility state MUST be persisted in project/app settings so that it is restored on next launch.
- **REQ-005**: When the inspector is hidden, the toolbar toggle button MUST remain accessible.

### Content — item selected

- **REQ-006**: When an item is selected, the inspector MUST display a `Form` with grouped style containing the following metadata rows using `LabeledContent`:

  | Label | Value | Notes |
  |-------|-------|-------|
  | Name | File or folder name | Display name only, not full path |
  | Path | Relative path from project root | Selectable text, truncated middle, caption font |
  | Type | File type description | Derived from file extension / UTType |
  | Size | Human-readable file size | Files only; use `ByteCountFormatter` / equivalent |
  | Modified | Last modification date | Formatted via `DateFormatter`, medium date + short time |
  | Git Status | Colored badge + label | Uses git-status-indicator component (character + color + label) |

- **REQ-007**: The Path value MUST be displayed as selectable text so the user can copy it.
- **REQ-008**: The Path value MUST use a caption-sized font and MUST truncate in the middle when it exceeds the available width.
- **REQ-009**: The Size row MUST only appear for files, not directories.
- **REQ-010**: The Size value MUST be formatted using `ByteCountFormatter` (Apple) or equivalent locale-aware byte formatting on other platforms.
- **REQ-011**: The Modified date MUST be formatted using a medium date style and short time style (e.g., "Mar 25, 2026 at 2:30 PM").
- **REQ-012**: The Git Status row MUST use the git-status-indicator component (as defined in `ui/git-status-indicator.md`), showing the status character, color, and full label (e.g., "M Modified").
- **REQ-013**: The Git Status row MUST NOT appear if the file has no git status (clean/committed) or the project is not a git repository.
- **REQ-014**: The Type value MUST be derived from the file extension using `UTType` on Apple platforms or MIME type lookup on other platforms. If the type cannot be determined, it SHOULD display "Unknown".

### Content — nothing selected

- **REQ-015**: When no item is selected, the inspector MUST display an empty state (as defined in `ui/empty-state.md`) with:
  - Icon: `doc.text.magnifyingglass` (SF Symbol) or equivalent
  - Heading: "Select a file to inspect"
  - No action buttons

### Form layout

- **REQ-016**: The form MUST use grouped style (`.formStyle(.grouped)` on SwiftUI or equivalent).
- **REQ-017**: The form MUST scroll vertically if content exceeds the panel height.

## Appearance

```
┌──────────────────────┐
│ Inspector        [×] │
├──────────────────────┤
│                      │
│ Name     README.md   │
│ Path     src/...md   │
│ Type     Markdown    │
│ Size     4.2 KB      │
│ Modified Mar 25, ... │
│ Git      M Modified  │
│                      │
└──────────────────────┘
```

Empty state:

```
┌──────────────────────┐
│ Inspector        [×] │
├──────────────────────┤
│                      │
│                      │
│     📄🔍             │
│  Select a file       │
│  to inspect          │
│                      │
│                      │
└──────────────────────┘
```

- **Panel width**: 250pt fixed
- **Form style**: Grouped
- **Path font**: Caption, secondary color, truncation middle
- **Git status**: Monospaced bold character + color + label (per git-status-indicator spec)
- **Empty state**: Centered vertically and horizontally within panel

## States

| State | Behavior |
|-------|----------|
| Panel hidden | Main content area fills available width; toolbar toggle button visible |
| Panel visible, item selected | Panel slides in from right; form displays metadata for selected item |
| Panel visible, nothing selected | Panel slides in from right; empty state displayed |
| Selection changes | Form content updates immediately to reflect newly selected item |
| Panel toggled off | Panel slides out to the right; state persisted |
| Panel toggled on | Panel slides in from the right; state persisted |

## Accessibility

- **REQ-018**: The toolbar toggle button MUST have an accessible label: "Toggle Inspector" (or platform-localized equivalent).
- **REQ-019**: The toggle button MUST announce its state to screen readers (e.g., "Inspector, showing" / "Inspector, hidden").
- **REQ-020**: Each metadata row label MUST be the accessible label for its corresponding value.
- **REQ-021**: The selectable Path text MUST be accessible to screen readers with the full path announced, not the truncated display.
- **REQ-022**: The Git Status badge MUST have an accessibility label with the full status name (e.g., "Git Status: Modified"), not just the character. This is inherited from the git-status-indicator spec (REQ-011).
- **REQ-023**: The empty state MUST follow the empty-state accessibility requirements (heading announced first, icon decorative).
- **REQ-024**: The inspector panel MUST be fully keyboard-navigable — Tab key should move focus through metadata rows and the close/toggle button.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| inspector-001 | REQ-001 | Toggle inspector on | Panel slides in from the right side |
| inspector-002 | REQ-002 | Measure panel width | Panel width is 250pt |
| inspector-003 | REQ-003 | Click toolbar inspector button | Panel visibility toggles |
| inspector-004 | REQ-004 | Show inspector, quit app, relaunch | Inspector is visible on relaunch |
| inspector-005 | REQ-004 | Hide inspector, quit app, relaunch | Inspector is hidden on relaunch |
| inspector-006 | REQ-006, REQ-014 | Select a Markdown file (README.md) | Name shows "README.md", Type shows "Markdown" or UTType description |
| inspector-007 | REQ-009, REQ-010 | Select a 4,200-byte file | Size row shows "4.2 KB" (or locale-appropriate equivalent) |
| inspector-008 | REQ-009 | Select a directory | Size row is not displayed |
| inspector-009 | REQ-011 | Select a file modified on 2026-03-25 at 14:30 | Modified shows "Mar 25, 2026 at 2:30 PM" (or locale equivalent) |
| inspector-010 | REQ-012, REQ-013 | Select a modified file in a git repo | Git Status row shows orange "M" badge with label "Modified" |
| inspector-011 | REQ-013 | Select a clean/committed file in a git repo | Git Status row is not displayed |
| inspector-012 | REQ-013 | Select a file in a non-git project | Git Status row is not displayed |
| inspector-013 | REQ-015 | No file selected, inspector visible | Empty state shows icon and "Select a file to inspect" |
| inspector-014 | REQ-007 | Select a file, attempt to select the path text | Path text is selectable and copyable |
| inspector-015 | REQ-008 | Select a file with a very long path | Path truncates in the middle with ellipsis |
| inspector-016 | REQ-016 | Inspect form style | Form uses grouped style |
| inspector-017 | REQ-018, REQ-019 | Enable VoiceOver, activate toolbar toggle | Button announces "Toggle Inspector" and state |
| inspector-018 | REQ-024 | Press Tab repeatedly while inspector is open | Focus moves through metadata rows and toggle button |

## Edge Cases

- **Very long file name**: Name SHOULD truncate with trailing ellipsis rather than overflowing the panel.
- **Very long path**: Path MUST truncate in the middle (REQ-008), showing the beginning and end of the path.
- **Unknown file type**: Type SHOULD display "Unknown" rather than blank or crashing (REQ-014).
- **File with no extension**: Type SHOULD display "Document" or "Unknown" based on platform UTType inference.
- **Zero-byte file**: Size SHOULD display "Zero bytes" or "0 bytes", not blank.
- **Very large file (>1 TB)**: ByteCountFormatter SHOULD handle gracefully (e.g., "1.2 TB").
- **File deleted while inspector is open**: Inspector SHOULD clear to empty state or show a "File not found" message. It MUST NOT crash.
- **Rapid selection changes**: Inspector MUST update without flicker or stale content. Debounce if needed (100ms recommended).
- **Git status unavailable (git not installed)**: Git Status row MUST NOT appear. No error shown.
- **Symlink selected**: SHOULD show the symlink's own metadata, not the target's, unless the platform convention differs.
- **Localized date/number formatting**: Size and Modified values MUST respect the user's locale settings.

## Localization

| String Key | Default (en) | Context |
|-----------|-------------|---------|
| `inspector.title` | Inspector | Panel title |
| `inspector.toggle` | Toggle Inspector | Toolbar button accessible label |
| `inspector.name` | Name | Metadata row label |
| `inspector.path` | Path | Metadata row label |
| `inspector.type` | Type | Metadata row label |
| `inspector.size` | Size | Metadata row label |
| `inspector.modified` | Modified | Metadata row label |
| `inspector.git_status` | Git Status | Metadata row label |
| `inspector.empty_heading` | Select a file to inspect | Empty state heading |
| `inspector.type_unknown` | Unknown | Fallback file type |

## Accessibility Options

| Option | Behavior |
|--------|----------|
| Reduce Motion | Panel appears/disappears instantly (no slide animation) |
| Reduce Transparency | Panel background uses opaque material |
| Increase Contrast | Metadata labels and values use higher-contrast colors |
| Differentiate Without Color | Git status character provides differentiation (inherited from git-status-indicator) |

## Logging

Subsystem: `{{bundle_id}}` | Category: `InspectorPanel`

| Event | Level | Message |
|-------|-------|---------|
| Panel shown | debug | `InspectorPanel: shown` |
| Panel hidden | debug | `InspectorPanel: hidden` |
| Visibility state persisted | debug | `InspectorPanel: visibility persisted as {{visible}}` |
| Item inspected | debug | `InspectorPanel: inspecting "{{name}}" at "{{path}}"` |
| Empty state displayed | debug | `InspectorPanel: no selection, showing empty state` |
| Type detection failed | debug | `InspectorPanel: could not determine type for "{{name}}", showing "Unknown"` |

## Platform Notes

- **SwiftUI (macOS / iPadOS / visionOS)**: Use the `.inspector(isPresented:)` modifier on the main content view. Bind `isPresented` to a `@SceneStorage` or `@AppStorage` boolean for persistence. Inside the inspector, use `Form { ... }.formStyle(.grouped)` with `LabeledContent` for each metadata row. Path text: `Text(path).textSelection(.enabled).font(.caption).lineLimit(1).truncationMode(.middle)`. Size: `ByteCountFormatter` with `.countStyle = .file`. Date: `DateFormatter` with `dateStyle = .medium`, `timeStyle = .short`. Git status: use the git-status-indicator view with `.detailed` style. Empty state: `ContentUnavailableView("Select a file to inspect", systemImage: "doc.text.magnifyingglass")`. Set `.inspectorColumnWidth(250)` for fixed width. Toolbar button: `Button { isInspectorPresented.toggle() } label: { Label("Toggle Inspector", systemImage: "sidebar.trailing") }`.
- **Compose (Android / Desktop)**: Use a `ModalDrawer` or side sheet anchored to the right with `drawerContent`. Fixed width via `Modifier.width(250.dp)`. Use `LazyColumn` with labeled rows. Date formatting via `java.time.format.DateTimeFormatter`. File size via custom formatter or `Formatter.formatFileSize()`. Persist visibility in `DataStore` or `SharedPreferences`.
- **React / Web**: CSS sidebar with `position: fixed; right: 0; width: 250px; transition: transform 0.2s`. Toggle by translating off-screen. Use a `<dl>` (description list) for key-value pairs. File size via `filesize` npm package. Date via `Intl.DateTimeFormat`. Persist visibility in `localStorage`.

## Privacy

- **Data collected**: None — the inspector only reads and displays file metadata already available on the local filesystem
- **Storage**: Inspector visibility state stored in platform standard persistence (UserDefaults / SharedPreferences / localStorage)
- **Transmission**: None — no data leaves the device
- **Retention**: Visibility preference persisted until changed; file metadata is read on demand, never cached

## Design Decisions

_None yet — decisions made during implementation should be recorded here._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, derived from scratching-post ProjectInspectorView and ContentViewerView |
