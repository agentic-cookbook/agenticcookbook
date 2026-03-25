# Settings Window

A standard desktop application settings/preferences window. Opens from the conventional menu location, displays setting categories in a sidebar with the corresponding settings panel on the right.

## Behavior

- Opened via the platform-standard keyboard shortcut and menu location:
  - **macOS**: `⌘,` from the app menu (app name menu, not File) — labeled "Settings…" (macOS 13+) or "Preferences…" (older)
  - **Windows**: `Ctrl+,` or from the File menu — labeled "Settings"
  - **Linux**: from the Edit menu or app menu — labeled "Preferences"
- **Single instance**: Only one settings window may exist at a time. If the user triggers the shortcut while the window is open, bring the existing window to front — do not create a second instance.
- **Non-modal**: The settings window does not block interaction with other app windows. The user can freely switch between the settings window and the main app.
- **Does not reopen on launch**: The settings window is never shown automatically when the app launches, even if it was open when the app was last quit.
- **Remembers frame**: The window remembers its size and position between sessions. Use the platform's standard frame autosave mechanism.
- **Resizable**: The window is resizable. Set a reasonable minimum size (e.g., 500×400pt) to prevent the layout from collapsing.
- **Changes apply immediately**: Setting changes take effect as soon as the user interacts with the control — no "Apply" or "Save" button. This is the macOS and modern Windows convention.

## Layout

A horizontal split view dividing the window into two regions:

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

### Sidebar (left)

- Vertical list of setting category names
- Each row is selectable; the selected row is visually highlighted using the platform's native selection style
- First category is selected by default
- Sidebar width should be fixed or have a narrow resizable range (150–220pt)
- Categories are simple text labels — no icons required, but an icon can be added per category (this is a **Design Decision** that should be approved by the user)

### Content panel (right)

- Displays the settings for the currently selected category
- Content scrolls vertically if it exceeds the panel height
- Settings are laid out as labeled rows: label on the left, control on the right
- Group related settings with section headers where appropriate
- Use native controls for all setting types: toggles, dropdowns/pickers, sliders, text fields, steppers

## Data flow

- Settings are read from and written to the app's standard persistence layer:
  - **macOS/iOS**: `UserDefaults` (or `@AppStorage` in SwiftUI)
  - **Windows**: Registry or app config file
  - **Web**: `localStorage` or equivalent
- Each setting control binds directly to the persisted value — changes propagate immediately to any part of the app observing that setting
- No intermediate "draft" state or undo for individual settings

## States

| State | Behavior |
|-------|----------|
| No settings window open | Menu item and shortcut are enabled |
| Settings window open | Shortcut brings existing window to front |
| Category selected | Content panel shows that category's settings |
| Window resized | Frame is saved automatically for next open |
| App quit with window open | Window does not reopen on next launch |

## Accessibility

- The sidebar list must be navigable via keyboard (arrow keys to move, Return/Space to select)
- Tab key moves focus between sidebar and content panel controls
- All setting controls must have accessible labels
- VoiceOver/screen reader should announce the selected category name when it changes

## Logging

Subsystem: `{app bundle ID}` | Category: `SettingsWindow`

| Event | Level | Message |
|-------|-------|---------|
| Window opened | debug | `SettingsWindow: opened` |
| Window brought to front | debug | `SettingsWindow: already open, brought to front` |
| Window closed | debug | `SettingsWindow: closed` |
| Category selected | debug | `SettingsWindow: selected category "{name}"` |
| Setting changed | debug | `SettingsWindow: changed "{key}" from "{oldValue}" to "{newValue}"` |
| Frame saved | debug | `SettingsWindow: frame saved ({x}, {y}, {width}×{height})` |

## Platform notes

- **SwiftUI (macOS)**: Use `NavigationSplitView` with `.navigationSplitViewStyle(.balanced)`. Register the `⌘,` shortcut via `Settings` scene (preferred) or `.commands` modifier with `CommandGroup(replacing: .appSettings)`. For single-instance enforcement, use `Window` scene with `defaultPosition` and `handlesExternalEvents`. Use `@AppStorage` for binding settings. Frame autosave: use `.windowResizability(.contentSize)` with frame persistence via `SceneStorage` or `WindowGroup(id:)`.
- **Compose (Windows)**: Use `Window` with `rememberWindowState()` for position/size persistence. Use a `Row` with a `LazyColumn` sidebar and content panel. Store settings in a preferences file. Register `Ctrl+,` via `MenuBar` and keyboard shortcut handler.
- **React/Electron (Web/Desktop)**: Use a `BrowserWindow` with `show: false` initially. Track instance to prevent duplicates. Use CSS Grid or Flexbox for the split layout. Persist settings in `electron-store` or `localStorage`. Register shortcut via `globalShortcut` or menu accelerator.
