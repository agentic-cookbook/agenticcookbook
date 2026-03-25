# Settings Window

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS, Windows, Linux]
tags: [window-management, preferences, settings]
dependencies: []
---

## Overview

A standard desktop application settings/preferences window. Opens from the conventional menu location via platform-standard keyboard shortcut. Displays setting categories in a sidebar with the corresponding settings panel on the right. Changes apply immediately — no save/apply button.

## Terminology

| Term | Definition |
|------|-----------|
| Category | A named group of related settings displayed in the sidebar |
| Content panel | The right-side area showing settings for the selected category |
| Frame autosave | Platform mechanism for persisting window position and size between sessions |

## Behavioral Requirements

- **REQ-001**: The window MUST open via the platform-standard keyboard shortcut:
  - macOS: `⌘,` from the app menu (app name menu), labeled "Settings…" (macOS 13+) or "Preferences…" (older)
  - Windows: `Ctrl+,` from the File menu, labeled "Settings"
  - Linux: from the Edit or app menu, labeled "Preferences"
- **REQ-002**: The app MUST enforce single-instance — if the shortcut is triggered while the window is open, the existing window MUST be brought to front. A second instance MUST NOT be created.
- **REQ-003**: The window MUST be non-modal — it MUST NOT block interaction with other app windows.
- **REQ-004**: The window MUST NOT reopen automatically on app launch, even if it was open when the app was last quit.
- **REQ-005**: The window MUST remember its size and position between sessions using the platform's standard frame autosave mechanism.
- **REQ-006**: The window MUST be resizable with a minimum size of 500×400pt.
- **REQ-007**: Setting changes MUST take effect immediately when the user interacts with the control. There MUST NOT be an "Apply" or "Save" button.
- **REQ-008**: The sidebar MUST display a vertical list of category names. The first category MUST be selected by default.
- **REQ-009**: Selecting a category MUST update the content panel to show that category's settings.
- **REQ-010**: The content panel MUST scroll vertically if its content exceeds the panel height.
- **REQ-011**: Settings MUST be read from and written to the platform's standard persistence layer:
  - macOS/iOS: `UserDefaults` / `@AppStorage`
  - Windows: Registry or app config file
  - Web/Electron: `localStorage` or `electron-store`

## Appearance

```
┌──────────────────────────────────────────────┐
│ Settings                                     │
├────────────┬─────────────────────────────────┤
│            │                                 │
│ General    │  Setting Label         [control]│
│ Appearance │  Setting Label         [control]│
│ Advanced   │  Setting Label         [control]│
│            │                                 │
│            │                                 │
│            │                                 │
│            │                                 │
├────────────┴─────────────────────────────────┤
```

- **Layout**: Horizontal split view — sidebar on left, content panel on right
- **Sidebar width**: Fixed or narrow resizable range (150–220pt)
- **Sidebar selection**: Platform-native selection highlight
- **Content layout**: Labeled rows — label on left, control on right. Group related settings with section headers.
- **Controls**: Native controls only — toggles, dropdowns/pickers, sliders, text fields, steppers
- **Category icons**: Optional — whether to show icons alongside category names is a **Design Decision** that MUST be approved by the user

## States

| State | Behavior |
|-------|----------|
| No window open | Menu item and keyboard shortcut are enabled |
| Window open, shortcut triggered | Existing window brought to front (REQ-002) |
| Category selected | Content panel updates to show that category's settings (REQ-009) |
| Window resized | Frame saved automatically for next open (REQ-005) |
| App quit with window open | Window does not reopen on next launch (REQ-004) |
| Setting changed | Change persisted and applied immediately (REQ-007) |

## Accessibility

- **REQ-012**: The sidebar list MUST be navigable via keyboard (arrow keys to move selection, Return/Space to confirm).
- **REQ-013**: Tab key MUST move focus between the sidebar and content panel controls.
- **REQ-014**: All setting controls MUST have accessible labels.
- **REQ-015**: VoiceOver/screen reader MUST announce the selected category name when selection changes.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| settings-001 | REQ-002 | Open settings window, trigger shortcut again | Window count remains 1, existing window is key/front |
| settings-002 | REQ-004 | Open settings, quit app, relaunch | Settings window is not visible after relaunch |
| settings-003 | REQ-005 | Open settings, resize to 600×500 at (100,200), close, reopen | Window opens at 600×500 at (100,200) |
| settings-004 | REQ-007 | Toggle a boolean setting | Setting value in persistence layer matches new state immediately |
| settings-005 | REQ-008 | Open settings window | First category in list is selected, content panel shows its settings |
| settings-006 | REQ-009 | Select second category | Content panel updates to show second category's settings |
| settings-007 | REQ-006 | Attempt to resize window below 500×400 | Window does not shrink below minimum |
| settings-008 | REQ-012 | Focus sidebar, press Down arrow | Selection moves to next category |
| settings-009 | REQ-013 | Press Tab from sidebar | Focus moves to first control in content panel |

## Edge Cases

- **No categories defined**: The window SHOULD display an empty state message rather than crashing.
- **Category with no settings**: The content panel SHOULD show a message like "No settings available" rather than a blank panel.
- **Extremely long category name**: Sidebar SHOULD truncate with ellipsis rather than expanding width.
- **Many settings in one category**: Content panel scrolls (REQ-010); performance SHOULD remain smooth with 50+ settings.
- **Rapid category switching**: Content panel MUST update without flicker or stale content.

## Logging

Subsystem: `{{bundle_id}}` | Category: `SettingsWindow`

| Event | Level | Message |
|-------|-------|---------|
| Window opened | debug | `SettingsWindow: opened` |
| Window brought to front | debug | `SettingsWindow: already open, brought to front` |
| Window closed | debug | `SettingsWindow: closed` |
| Category selected | debug | `SettingsWindow: selected category "{{name}}"` |
| Setting changed | debug | `SettingsWindow: changed "{{key}}" from "{{oldValue}}" to "{{newValue}}"` |
| Frame saved | debug | `SettingsWindow: frame saved ({{x}}, {{y}}, {{width}}×{{height}})` |

## Platform Notes

- **SwiftUI (macOS)**: Use `NavigationSplitView` with `.navigationSplitViewStyle(.balanced)`. Register `⌘,` via `Settings` scene (preferred) or `.commands` modifier with `CommandGroup(replacing: .appSettings)`. For single-instance enforcement, use `Window` scene with `defaultPosition` and `handlesExternalEvents`. Use `@AppStorage` for binding settings. Frame autosave via `SceneStorage` or `WindowGroup(id:)`.
- **Compose (Windows)**: Use `Window` with `rememberWindowState()` for position/size persistence. Use a `Row` with a `LazyColumn` sidebar and content panel. Store settings in a preferences file. Register `Ctrl+,` via `MenuBar` and keyboard shortcut handler.
- **React/Electron (Desktop)**: Use a `BrowserWindow` with `show: false` initially. Track instance to prevent duplicates. Use CSS Grid or Flexbox for the split layout. Persist settings in `electron-store` or `localStorage`. Register shortcut via `globalShortcut` or menu accelerator.

## Design Decisions

_None yet — decisions made during implementation should be recorded here._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec |
