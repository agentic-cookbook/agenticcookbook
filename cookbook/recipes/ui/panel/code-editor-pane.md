---
id: 954e559c-e2bf-494c-a37e-de0b88bec89a
title: "Code Editor Pane"
domain: agentic-cookbook://recipes/ui/panel/code-editor-pane
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
  - python
  - swift
  - typescript
  - web
tags: 
  - code-editor-pane
  - panel
  - ui
depends-on: []
related: []
references: []
---

# Code Editor Pane

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS, iOS, visionOS]
tags: [editor, code, syntax-highlighting, text-editor]
dependencies: [ui/color-profile.md@1.0.0, ui/collapsible-pane-header.md@1.0.0, ui/empty-state.md@1.0.0]
---

## Overview

A text editor pane for viewing and editing source code files with syntax highlighting, line numbers, minimap, dirty state tracking, and auto-save. Loads file contents asynchronously and provides language-aware editing via CodeEditSourceEditor on Apple platforms. Derived from scratching-post FileEditorView and EditorState.

## Terminology

| Term | Definition |
|------|-----------|
| EditorState | An ObservableObject that manages the loaded file content, modification tracking, load state, and save operations for a single file |
| Dirty state | The editor has unsaved modifications — determined by comparing current content to last-saved content |
| loadGeneration | A monotonically increasing counter that forces the SourceEditor to be recreated when a new file is loaded, preventing stale editor state |
| Syntax highlighting | Colorized rendering of source code tokens (keywords, strings, comments, etc.) based on the detected language |
| Minimap | A scaled-down overview of the entire file shown as a narrow column on the trailing edge of the editor |
| Gutter | The column to the left of the editing area that displays line numbers |
| Auto-save | Automatic persistence of modified content when the user switches to a different file |

## Behavioral Requirements

### File loading

- **REQ-001**: The editor MUST load file contents asynchronously as UTF-8 text. During loading, a progress spinner MUST be displayed.
- **REQ-002**: On successful load, the editor MUST set `isLoaded` to true, populate `content` with the file text, and increment `loadGeneration` to force the SourceEditor to recreate.
- **REQ-003**: If the file cannot be read as UTF-8 text (binary file, encoding error), the editor MUST display a placeholder: "Cannot display this file type".
- **REQ-004**: If no file is selected, the editor MUST display a placeholder: "Select a file to view its contents".
- **REQ-005**: If a directory is selected (rather than a file), the editor MUST display a directory-appropriate placeholder rather than attempting to load.
- **REQ-006**: The `loadGeneration` counter MUST be incremented each time a new file is loaded. The SourceEditor view MUST use this value as an identity key (e.g., SwiftUI `.id(loadGeneration)`) so that the editor is fully recreated for each file, preventing stale content or cursor position from the previous file.

### Syntax highlighting and language detection

- **REQ-007**: The editor MUST detect the programming language from the file extension and apply syntax highlighting accordingly.
- **REQ-008**: Language detection MUST support at minimum the following mappings:

| Extension(s) | Language |
|--------------|----------|
| `.swift` | Swift |
| `.json` | JSON |
| `.md`, `.markdown` | Markdown |
| `.py` | Python |
| `.js` | JavaScript |
| `.ts` | TypeScript |
| `.jsx` | JSX |
| `.tsx` | TSX |
| `.yaml`, `.yml` | YAML |
| `.toml` | TOML |
| `.html`, `.htm` | HTML |
| `.css` | CSS |
| `.sh`, `.bash`, `.zsh` | Shell |
| `.rb` | Ruby |
| `.rs` | Rust |
| `.go` | Go |
| `.c`, `.h` | C |
| `.cpp`, `.hpp`, `.cc` | C++ |
| `.java` | Java |
| `.kt`, `.kts` | Kotlin |
| `.xml`, `.plist` | XML |
| `.sql` | SQL |
| `.r`, `.R` | R |
| `.lua` | Lua |
| `.dockerfile`, `Dockerfile` | Dockerfile |
| `.gitignore` | Git Ignore |

- **REQ-009**: If the file extension is unrecognized, the editor MUST fall back to plain text (no syntax highlighting).
- **REQ-010**: The editor MUST follow the system appearance to select a dark or light theme. On Apple platforms, use CatnipDark for dark mode and CatnipLight for light mode, or equivalent named themes from the syntax highlighting library.

### Editor configuration

- **REQ-011**: The gutter (line numbers) MUST be enabled by default.
- **REQ-012**: The minimap MUST be enabled by default.
- **REQ-013**: Line wrapping MUST be disabled. Horizontal scrolling MUST be used for long lines.
- **REQ-014**: The default font MUST be Menlo 13pt (monospaced). The font MAY be configurable via project or app settings.

### Dirty state and saving

- **REQ-015**: The editor MUST track dirty state by subscribing to content changes (via Combine or equivalent reactive mechanism) and comparing the current content to the last-saved content.
- **REQ-016**: When the content differs from the last-saved content, `isModified` MUST be set to true. When they match, `isModified` MUST be set to false.
- **REQ-017**: When the user switches to a different file and `isModified` is true, the editor MUST auto-save the current file before loading the new file.
- **REQ-018**: The user MUST be able to trigger a manual save via Cmd+S (macOS) or the platform-equivalent keyboard shortcut.
- **REQ-019**: Save MUST write the content atomically to disk to prevent data loss from partial writes.
- **REQ-020**: After a successful save, `isModified` MUST be reset to false and the last-saved content snapshot MUST be updated.

### EditorState

- **REQ-021**: EditorState MUST be implemented as an ObservableObject (or platform equivalent) with the following published properties:
  - `content: String` — the current text in the editor
  - `isModified: Bool` — whether the content has unsaved changes
  - `loadError: String?` — an error message if the file could not be loaded
  - `isLoaded: Bool` — whether the file has been successfully loaded
  - `loadGeneration: Int` — incremented to force editor recreation on file change
- **REQ-022**: EditorState MUST debounce dirty-state comparison by a short interval (e.g., 0.3s) to avoid excessive comparisons during rapid typing.

### Pane header

- **REQ-023**: The editor pane MUST use the collapsible-pane-header component at the top.
- **REQ-024**: When a file is selected, the header MUST display a file icon and the filename.
- **REQ-025**: When no file is selected, the header MUST display a generic title (e.g., "Editor").
- **REQ-026**: When the file is modified (dirty), the header SHOULD display a dirty indicator (e.g., a dot or bullet adjacent to the filename, or the standard macOS edited-document indicator).

## Appearance

### Editor pane layout

```
┌────────────────────────────────────────────────────────┐
│  ▼  📄 ContentView.swift  ●                           │  ← pane header (collapsible)
├──────────────────────────────────────────────────┬─────┤
│ 1  import SwiftUI                                │▓▓▓▓▓│
│ 2                                                │▓░░▓▓│
│ 3  struct ContentView: View {                    │▓░░▓▓│
│ 4      var body: some View {                     │▓░░▓▓│
│ 5          VStack {                              │▓░░▓▓│
│ 6              Image(systemName: "globe")        │▓░░▓▓│
│ 7                  .imageScale(.large)           │▓▓▓▓▓│
│ 8                  .foregroundStyle(.tint)       │▓▓▓▓▓│
│ 9              Text("Hello, world!")             │▓▓▓▓▓│
│10          }                                     │▓▓▓▓▓│
│11          .padding()                            │▓▓▓▓▓│
│12      }                                         │     │
│13  }                                             │     │
│14                                                │     │
│                                                  │     │
└──────────────────────────────────────────────────┴─────┘
 ↑ gutter (line numbers)   ↑ editor area            ↑ minimap
```

### No file selected (empty state)

```
┌────────────────────────────────────────────────────────┐
│  ▼  Editor                                             │
├────────────────────────────────────────────────────────┤
│                                                        │
│                                                        │
│                      📄                                │
│           Select a file to view its contents           │
│                                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Binary file placeholder

```
┌────────────────────────────────────────────────────────┐
│  ▼  📄 image.png                                       │
├────────────────────────────────────────────────────────┤
│                                                        │
│                                                        │
│                      ⚠️                                │
│           Cannot display this file type                │
│                                                        │
│                                                        │
└────────────────────────────────────────────────────────┘
```

- **Gutter**: Monospaced, right-aligned line numbers, secondary text color, subtle separator from editor area
- **Editor area**: Monospaced font (Menlo 13pt default), themed background per color-profile
- **Minimap**: ~60pt wide trailing column, scaled-down representation of the file
- **Dirty indicator**: Small filled circle (●) adjacent to the filename in the pane header, or platform-standard edited-document indicator

## States

| State | Behavior |
|-------|----------|
| No file selected | Empty state placeholder: "Select a file to view its contents" |
| Loading file | ProgressView spinner centered in the editor area |
| File loaded | Editor displayed with syntax highlighting, line numbers, minimap |
| Binary / non-UTF-8 file | Placeholder: "Cannot display this file type" |
| Directory selected | Placeholder appropriate for directory (e.g., "Select a file to view its contents") |
| Modified (dirty) | Dirty indicator shown in pane header; `isModified` is true |
| Unmodified (clean) | No dirty indicator; `isModified` is false |
| Save in progress | Content written atomically; on completion, dirty state cleared |
| Load error | Error placeholder displayed with the load error message |
| Pane collapsed | Header visible (via collapsible-pane-header), editor content hidden |

## Accessibility

- **REQ-027**: The editor MUST be accessible as a text editor role to screen readers and MUST support standard text navigation (by character, word, line).
- **REQ-028**: The pane header MUST follow collapsible-pane-header accessibility requirements (button role, expand/collapse announced).
- **REQ-029**: The dirty indicator MUST be communicated to assistive technologies — e.g., the header's accessibility label SHOULD include "edited" or "modified" when `isModified` is true.
- **REQ-030**: Empty state and error placeholders MUST follow empty-state accessibility requirements (heading announced first, icon decorative).
- **REQ-031**: The Cmd+S save shortcut MUST be discoverable via the app's menu bar (File > Save) on macOS.
- **REQ-032**: Line numbers in the gutter MUST be decorative and not announced individually by screen readers.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| ced-001 | REQ-001 | Select a .swift file | Loading spinner shown, then editor with syntax-highlighted Swift content |
| ced-002 | REQ-002 | Load a file successfully | `isLoaded` is true, `content` matches file text, `loadGeneration` incremented |
| ced-003 | REQ-003 | Select a .png file | Placeholder "Cannot display this file type" displayed |
| ced-004 | REQ-004 | No file selected | Placeholder "Select a file to view its contents" displayed |
| ced-005 | REQ-005 | Select a directory node | Directory placeholder displayed, no file load attempted |
| ced-006 | REQ-006 | Load file A, then load file B | `loadGeneration` incremented for each load; editor recreated (no stale state from A) |
| ced-007 | REQ-007, REQ-008 | Load file.swift | Language detected as Swift, syntax highlighting applied |
| ced-008 | REQ-008 | Load file.py | Language detected as Python |
| ced-009 | REQ-008 | Load file.yaml | Language detected as YAML |
| ced-010 | REQ-009 | Load file.xyz (unknown extension) | Plain text mode, no syntax highlighting |
| ced-011 | REQ-010 | System in dark mode | CatnipDark theme applied to editor |
| ced-012 | REQ-010 | System in light mode | CatnipLight theme applied to editor |
| ced-013 | REQ-010 | Toggle system appearance while editor is open | Theme switches without reloading file |
| ced-014 | REQ-011 | Load any file | Line numbers visible in gutter |
| ced-015 | REQ-012 | Load any file | Minimap visible on trailing edge |
| ced-016 | REQ-013 | Load file with 500-character line | No wrapping; horizontal scroll available |
| ced-017 | REQ-014 | Load any file | Font is Menlo 13pt monospaced |
| ced-018 | REQ-015, REQ-016 | Type a character in the editor | `isModified` becomes true |
| ced-019 | REQ-016 | Undo all changes back to saved state | `isModified` becomes false |
| ced-020 | REQ-017 | Edit file A, select file B | File A auto-saved before file B loads |
| ced-021 | REQ-018 | Press Cmd+S with unsaved changes | File saved, `isModified` becomes false |
| ced-022 | REQ-019 | Save file | File written atomically (no partial content on disk) |
| ced-023 | REQ-020 | Save file, then check state | `isModified` is false, last-saved snapshot updated |
| ced-024 | REQ-022 | Type rapidly (10 chars in 0.2s) | Dirty comparison fires once after debounce, not per keystroke |
| ced-025 | REQ-023 | View editor pane | Collapsible pane header present at top |
| ced-026 | REQ-024 | Select ContentView.swift | Header shows file icon + "ContentView.swift" |
| ced-027 | REQ-025 | No file selected | Header shows "Editor" |
| ced-028 | REQ-026 | Edit file (make dirty) | Dirty indicator (●) appears in header |
| ced-029 | REQ-026 | Save file (clear dirty) | Dirty indicator removed from header |
| ced-030 | REQ-029 | VoiceOver active, file is dirty | Header announces "ContentView.swift, edited" |
| ced-031 | REQ-031 | Open menu bar File menu | "Save" item present with Cmd+S shortcut |

## Edge Cases

- **Very large files (1MB+)**: The editor SHOULD load and render without blocking the main thread. If the file exceeds a configurable size threshold (e.g., 5MB), the editor MAY display a warning or truncate rendering. The editor MUST NOT crash.
- **Binary files**: Files that cannot be decoded as UTF-8 MUST show the "Cannot display this file type" placeholder. The editor MUST NOT attempt to render binary data as text.
- **File deleted while editing**: If the file is deleted externally while open in the editor, the editor SHOULD detect this on the next save attempt and present an appropriate error (e.g., "File no longer exists. Save as...?" or re-create the file). The editor MUST NOT crash or silently lose content.
- **File modified externally (concurrent edit)**: If the file is modified by another process while open, the editor SHOULD detect the external change (e.g., via file system events or mtime check on save) and warn the user before overwriting. The editor MUST NOT silently discard external changes without notice.
- **Encoding issues**: Files with mixed encoding, BOM markers, or invalid UTF-8 sequences MUST be handled gracefully. Invalid bytes SHOULD cause the file to be treated as non-displayable (REQ-003), not crash the editor.
- **Empty file**: A zero-byte file MUST load successfully and display an empty editor (not a placeholder). The file SHOULD be editable.
- **Read-only file**: If the file does not have write permissions, the editor SHOULD indicate read-only status. Save attempts MUST show an error rather than silently failing.
- **File path with special characters**: Paths containing spaces, unicode characters, or shell-special characters MUST be handled correctly for both load and save operations.
- **Rapid file switching**: If the user switches files faster than the async load completes, only the most recently selected file's content MUST be displayed. Stale load results MUST be discarded (the `loadGeneration` mechanism handles this).
- **Save fails (disk full, permissions)**: Save errors MUST be surfaced to the user (e.g., via an alert or inline error) and the dirty state MUST remain true so the user does not lose their changes.
- **Undo after save**: Undo history is per-editor-session. After save, undo SHOULD still work to revert to pre-save content (the dirty indicator reappears if content diverges from the saved snapshot).
- **New file with no extension**: Files without an extension MUST load as plain text with no syntax highlighting.
- **Extremely long lines (10,000+ characters)**: The editor MUST remain responsive. Horizontal scrolling (REQ-013) handles display. The minimap SHOULD still render without performance degradation.
- **Tab characters vs spaces**: The editor MUST preserve the original indentation characters in the file. Tab width rendering MAY be configurable (default: 4 spaces).

## Logging

Subsystem: `{{bundle_id}}` | Category: `CodeEditorPane`

| Event | Level | Message |
|-------|-------|---------|
| File load started | debug | `CodeEditorPane: loading file "{{path}}"` |
| File load succeeded | debug | `CodeEditorPane: loaded "{{filename}}" ({{bytes}} bytes, language: {{language}})` |
| File load failed (encoding) | debug | `CodeEditorPane: cannot display "{{filename}}" — not valid UTF-8` |
| File load failed (error) | error | `CodeEditorPane: failed to load "{{path}}": {{error}}` |
| Language detected | debug | `CodeEditorPane: detected language "{{language}}" for extension "{{ext}}"` |
| Theme applied | debug | `CodeEditorPane: applied theme "{{theme}}" (appearance: {{light\|dark}})` |
| Content modified | debug | `CodeEditorPane: "{{filename}}" marked as modified` |
| Content reverted to clean | debug | `CodeEditorPane: "{{filename}}" marked as clean (matches saved)` |
| Auto-save triggered | debug | `CodeEditorPane: auto-saving "{{filename}}" before switching to "{{newFilename}}"` |
| Manual save triggered | debug | `CodeEditorPane: manual save "{{filename}}" (Cmd+S)` |
| Save succeeded | debug | `CodeEditorPane: saved "{{filename}}" ({{bytes}} bytes)` |
| Save failed | error | `CodeEditorPane: save failed for "{{path}}": {{error}}` |
| External modification detected | warning | `CodeEditorPane: "{{filename}}" modified externally` |
| File deleted while open | warning | `CodeEditorPane: "{{filename}}" deleted externally while open in editor` |
| Load generation incremented | debug | `CodeEditorPane: loadGeneration incremented to {{generation}} for "{{filename}}"` |
| Placeholder displayed | debug | `CodeEditorPane: showing placeholder — {{reason}}` |
| Editor recreated | debug | `CodeEditorPane: editor recreated (loadGeneration={{generation}})` |
| Large file warning | warning | `CodeEditorPane: "{{filename}}" is {{size}}MB — may impact performance` |

## Accessibility Options

| Option | Behavior |
|--------|----------|
| Reduce Motion | Pane collapse/expand transitions are instant (per collapsible-pane-header) |
| Increase Contrast | Editor uses higher-contrast syntax theme variant; gutter separator more prominent |
| Differentiate Without Color | Syntax highlighting uses bold/italic/underline styles in addition to color to differentiate token types |
| VoiceOver | Editor text navigable by character/word/line; header announces filename, modified state, and collapse state; placeholders announced per empty-state requirements |
| Dynamic Type | Editor font size SHOULD respect the system font size preference while maintaining monospaced rendering |

## Platform Notes

- **SwiftUI (macOS)**: Use `CodeEditSourceEditor` (from the CodeEditSourceEditor package) as the primary editor component, wrapped in an `NSViewRepresentable` if needed. Set language via `CodeLanguage` enum mapped from file extension. Configure: `lineNumbers: true`, `minimap: true`, `wrapLines: false`, font: `NSFont.monospacedSystemFont(ofSize: 13, weight: .regular)` or `NSFont(name: "Menlo", size: 13)`. Theme: use `EditorTheme` conforming types — CatnipDark and CatnipLight — switching based on `@Environment(\.colorScheme)`. Bind editor text to `EditorState.content` as a `Binding<String>`. Use `.id(editorState.loadGeneration)` on the editor view to force recreation when a new file loads. Dirty state tracking: subscribe to `editorState.$content` via Combine, debounce 0.3s, compare to `lastSavedContent` snapshot. Save: use `Data(content.utf8).write(to: fileURL, options: .atomic)` or `String.write(to:atomically:encoding:)`. Auto-save: in the file-selection `onChange` handler, call `save()` if `isModified` before loading the new file. Cmd+S: register via `.keyboardShortcut("s", modifiers: .command)` on a hidden button or via the `commands` modifier on the scene. Pane header: use collapsible-pane-header with the filename as title and a file-type SF Symbol as the icon.
- **SwiftUI (iOS / visionOS)**: CodeEditSourceEditor may not be available on iOS. Use a `UITextView`-based editor with custom syntax highlighting (e.g., Highlightr or a tree-sitter wrapper) inside a `UIViewRepresentable`. Line numbers and minimap may need custom drawing. On visionOS, the editor pane appears within the workspace window's detail area. Keyboard shortcut Cmd+S is available when an external keyboard is connected.
- **Compose (Android)**: Use a code editor library such as CodeView or Sora Editor. Configure syntax highlighting via language grammars. Line numbers and minimap depend on library capabilities. Dirty state tracking via `MutableState<String>` observation. Save with `File.writeText()` using `createTempFile` + `renameTo` for atomic writes. Auto-save triggered in `onDispose` or selection-change callback.
- **Web (React)**: Use Monaco Editor or CodeMirror 6. Monaco provides built-in language support, minimap, line numbers, and theme switching. Bind editor value to React state. Dirty tracking via `onChange` callback comparing to saved snapshot. Save via backend API or File System Access API. Cmd+S / Ctrl+S intercepted via `editor.addCommand` or `onKeyDown` handler. Theme: configure `vs-dark` / `vs` based on `prefers-color-scheme` media query.

## Privacy

- **Data collected**: File contents are loaded into memory for editing. No content is transmitted off-device.
- **Storage**: File contents are persisted only to their original file path on save. No copies or caches are created.
- **Transmission**: None — file content never leaves the device.
- **Retention**: Editor content exists in memory only for the lifetime of the editing session. Closing the file releases memory.

## Design Decisions

_None yet — decisions made during implementation should be recorded here._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, derived from scratching-post FileEditorView and EditorState. Covers file loading, syntax highlighting, dirty state tracking, auto-save, and multi-platform editor guidance. |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
