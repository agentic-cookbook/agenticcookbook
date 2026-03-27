---
id: e56d4b42-9abe-47ac-bd9e-27471bd47b82
title: "App Lifecycle"
domain: cookbook.recipes.app.lifecycle
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
  - web
  - windows
tags: 
  - app
  - lifecycle
depends-on: []
related: []
references: []
---

# App Lifecycle

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS, iOS, visionOS, Android, Web]
tags: [lifecycle, startup, restore, cleanup, app]
dependencies: [ui/Recipes/settings-window.md@1.2.0]
---

## Overview

Pattern for managing desktop and mobile app lifecycle: what happens on startup, how sessions and documents are restored, and how processes are cleaned up on quit. Covers multi-window scene wiring for SwiftUI apps, UIKit scene delegates, Android activity lifecycle, and Web page lifecycle. Derived from scratching-post CatnipApp.swift and AppDelegate.swift.

## Terminology

| Term | Definition |
|------|-----------|
| Startup behavior | The configurable action the app takes when it first becomes active after launch |
| Session restore | The process of reopening previously open documents or windows from a saved URL list |
| Child process | Any process spawned by the app (terminal sessions, background tasks, language servers) that must be cleaned up on quit |
| Orphaned process | A child process that continues running after the parent app has terminated |
| Scene | A SwiftUI construct (`WindowGroup`, `DocumentGroup`, `Window`, `Settings`) that declares a window type the app can display |
| Untitled file | A new, unsaved document window that macOS may open automatically on launch |
| Process group | A set of processes sharing a PGID, allowing bulk signal delivery |

## Behavioral Requirements

### Startup behavior

- **REQ-001**: The app MUST support configurable startup behavior with at least the following modes:
  - `newWindow` — open the default window (e.g., new document or welcome screen)
  - `restoreSession` — reopen previously open documents/windows
  - `nothing` — launch silently to the menu bar (macOS) or dock/background without opening any window
- **REQ-002**: Startup behavior MUST be a user-configurable setting stored via the platform's standard persistence layer (per `settings-window.md` REQ-011). The setting key MUST be centralized in the app's settings key constants (per `settings-window.md` REQ-016).
- **REQ-003**: The startup behavior setting MUST default to `restoreSession` on first launch (no prior user preference).

### Session restore

- **REQ-004**: When startup behavior is `restoreSession`, the app MUST save the list of open document URLs on quit and reopen them on the next launch.
- **REQ-005**: The URL list SHOULD be stored in `UserDefaults` (or platform equivalent) as an array of path strings, under a centralized settings key.
- **REQ-006**: On restore, the app SHOULD filter saved URLs to only include files whose extensions match the app's registered document types. Unrecognized extensions MUST be silently skipped.
- **REQ-007**: On restore, the app MUST validate that each saved URL points to an existing file. Missing files MUST be silently skipped and removed from the saved list.
- **REQ-008**: On restore, the app SHOULD open documents in the same order they were saved (matching the order they were open at quit time).
- **REQ-009**: If no saved URLs exist (first launch in `restoreSession` mode, or all saved URLs are invalid), the app SHOULD fall back to the `newWindow` behavior.

### Process cleanup

- **REQ-010**: On app termination, the app MUST terminate all child processes (terminal sessions, background tasks, language servers, build processes).
- **REQ-011** (macOS): The app SHOULD send `SIGHUP` to its process group on `applicationWillTerminate` to ensure child processes receive a termination signal.
- **REQ-012**: The app MUST NOT leave orphaned processes after quitting. All child process handles MUST be tracked and cleaned up.
- **REQ-013**: Child process cleanup MUST complete within a reasonable timeout (5 seconds). After the timeout, remaining processes SHOULD be sent `SIGKILL`.

### Untitled window suppression

- **REQ-014** (macOS): `applicationShouldOpenUntitledFile(_:)` MUST return `false` when startup behavior is `nothing` or `restoreSession`.
- **REQ-015** (macOS): `applicationShouldOpenUntitledFile(_:)` MUST return `true` when startup behavior is `newWindow`.
- **REQ-016** (macOS): This method MUST also return `false` when the app is being relaunched by the system after a logout/restart and `restoreSession` is active, to avoid duplicating restored windows with an additional untitled window.

### Multi-window scene wiring

- **REQ-017** (macOS/SwiftUI): The app MUST support multiple window types via scene declarations (`WindowGroup`, `DocumentGroup`, `Window`, `Settings`).
- **REQ-018**: Each document type SHOULD have its own `DocumentGroup` scene with the appropriate content type and file extensions registered.
- **REQ-019**: Settings SHOULD use a dedicated `Settings` scene (macOS 14+) or `Window` scene with `.handlesExternalEvents(matching:)` for older macOS versions.
- **REQ-020**: Custom menu commands SHOULD be applied via the `.commands` modifier on the primary `WindowGroup`.
- **REQ-021**: The `@main` App struct MUST compose all scene declarations in its `body` property. Scene declarations MUST NOT be generated dynamically at runtime.

## States

| State | Behavior |
|-------|----------|
| Cold launch, mode = newWindow | App opens default window immediately |
| Cold launch, mode = restoreSession, saved URLs exist | App opens each saved document in order |
| Cold launch, mode = restoreSession, no saved URLs | App falls back to newWindow behavior |
| Cold launch, mode = nothing | App activates with no windows; only menu bar and dock icon visible |
| App becoming active (already running) | No automatic window creation; user activates existing windows |
| App quitting, documents open | URL list saved to persistence, child processes terminated |
| App quitting, no documents open | Empty URL list saved (clears previous restore list), child processes terminated |
| System logout/restart | Same as app quitting; session restore list saved normally |
| Force quit / crash | Saved URL list from previous clean quit preserved; no new save occurs |

## Accessibility

N/A — App lifecycle management has no direct user-facing UI elements. Accessibility requirements for any windows or views opened during startup are covered by their respective specs.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| lifecycle-001 | REQ-001, REQ-002 | Set startup behavior to `newWindow`, launch app | Default window opens |
| lifecycle-002 | REQ-001, REQ-004 | Set startup behavior to `restoreSession`, open 3 documents, quit, relaunch | Same 3 documents reopen |
| lifecycle-003 | REQ-001 | Set startup behavior to `nothing`, launch app | No windows open; app is active in menu bar/dock |
| lifecycle-004 | REQ-003 | Fresh install, launch app with no prior preferences | App behaves as `restoreSession` (and since no URLs saved, falls back to `newWindow` per REQ-009) |
| lifecycle-005 | REQ-005 | Open 2 documents, quit app | UserDefaults contains array of 2 path strings under the correct key |
| lifecycle-006 | REQ-006 | Save URL list containing a `.txt` file (not a registered type), relaunch in `restoreSession` mode | `.txt` file is skipped; only recognized document types open |
| lifecycle-007 | REQ-007 | Save URL list containing a path to a deleted file, relaunch in `restoreSession` mode | Deleted file is silently skipped; remaining files open |
| lifecycle-008 | REQ-008 | Open documents A, B, C (in that order), quit, relaunch in `restoreSession` mode | Documents open in order A, B, C |
| lifecycle-009 | REQ-009 | Set startup behavior to `restoreSession`, clear all saved URLs, relaunch | App falls back to `newWindow` behavior |
| lifecycle-010 | REQ-010, REQ-012 | Launch app, start 3 terminal sessions, quit | All 3 child processes terminated; no orphaned processes in `ps` output |
| lifecycle-011 | REQ-011 | (macOS) Launch app, start a child process, quit | `SIGHUP` sent to process group; child process terminated |
| lifecycle-012 | REQ-013 | Launch app, start a process that ignores SIGHUP, quit | After 5-second timeout, process receives `SIGKILL` |
| lifecycle-013 | REQ-014, REQ-015 | (macOS) Set startup behavior to `newWindow` | `applicationShouldOpenUntitledFile` returns `true` |
| lifecycle-014 | REQ-014 | (macOS) Set startup behavior to `nothing` | `applicationShouldOpenUntitledFile` returns `false` |
| lifecycle-015 | REQ-014 | (macOS) Set startup behavior to `restoreSession` | `applicationShouldOpenUntitledFile` returns `false` |
| lifecycle-016 | REQ-017 | (macOS) Inspect app scene declarations | App body contains at least one `WindowGroup` and one `Settings` or `Window` scene |
| lifecycle-017 | REQ-018 | (macOS) Open a registered document type via Finder | Correct `DocumentGroup` scene handles the file |
| lifecycle-018 | REQ-020 | (macOS) Open app, inspect menu bar | Custom menu commands present from `.commands` modifier |
| lifecycle-019 | REQ-016 | (macOS) System restarts with `restoreSession` active | App does not open both restored documents and an untitled window |

## Edge Cases

- **No saved URLs on restore**: The app MUST fall back to `newWindow` behavior (REQ-009). It MUST NOT show an error or empty state.
- **Saved URL points to deleted file**: The file MUST be silently skipped (REQ-007). The remaining valid URLs MUST still open. The invalid entry MUST be removed from the saved list.
- **Saved URL points to moved/renamed file**: Treated as a missing file — silently skipped. File-system-level bookmarks (Security-Scoped Bookmarks on macOS) MAY be used in a future version to track moved files, but this is out of scope for v1.
- **All saved URLs are invalid**: Falls back to `newWindow` behavior per REQ-009.
- **Crash during quit**: The saved URL list from the previous clean quit is preserved. The app MUST NOT corrupt the list during a partial write — writing SHOULD be atomic (write to temp file, then rename).
- **Crash during startup restore**: If the app crashes while opening a restored document, the next launch SHOULD still attempt to restore. A crash counter MAY be implemented to break infinite crash-restore loops (e.g., skip restore after 3 consecutive crashes).
- **Very large number of saved URLs (100+)**: The app SHOULD open documents asynchronously to avoid blocking the main thread. A progress indicator MAY be shown.
- **Duplicate URLs in saved list**: The app SHOULD deduplicate URLs before restoring. Each document SHOULD be opened at most once.
- **Read-only file restored**: The document SHOULD open in read-only mode. This is handled by the document subsystem, not lifecycle.
- **Child process ignores SIGHUP**: The app MUST escalate to `SIGKILL` after the timeout (REQ-013).
- **Quit during document save**: The app MUST wait for in-progress saves to complete before terminating child processes. This is handled by the document subsystem's save-on-close behavior.
- **Multiple app instances**: Each instance MUST manage its own URL list independently. On macOS, the system typically enforces single-instance for bundled apps.

## Logging

Subsystem: `{{bundle_id}}` | Category: `AppLifecycle`

| Event | Level | Message |
|-------|-------|---------|
| App launched | info | `AppLifecycle: launched, startup behavior = "{{mode}}"` |
| Startup behavior resolved | debug | `AppLifecycle: resolved startup behavior to "{{mode}}" (setting: "{{setting}}", fallback: {{fallback}})` |
| Session restore started | info | `AppLifecycle: restoring {{count}} document(s)` |
| Document restored | debug | `AppLifecycle: restored "{{path}}"` |
| Document restore skipped (missing) | warning | `AppLifecycle: skipping missing file "{{path}}"` |
| Document restore skipped (unrecognized type) | debug | `AppLifecycle: skipping unrecognized file type "{{path}}" (extension: "{{ext}}")` |
| Session restore completed | info | `AppLifecycle: restore complete, opened {{opened}} of {{total}} document(s)` |
| Session restore fell back to newWindow | debug | `AppLifecycle: no valid URLs to restore, falling back to newWindow` |
| URL list saved | debug | `AppLifecycle: saved {{count}} document URL(s) for restore` |
| URL list save failed | error | `AppLifecycle: failed to save document URLs: {{error}}` |
| Untitled file suppressed | debug | `AppLifecycle: applicationShouldOpenUntitledFile returning false (mode = "{{mode}}")` |
| Untitled file allowed | debug | `AppLifecycle: applicationShouldOpenUntitledFile returning true` |
| Child process cleanup started | info | `AppLifecycle: terminating {{count}} child process(es)` |
| SIGHUP sent | debug | `AppLifecycle: sent SIGHUP to process group {{pgid}}` |
| Child process terminated | debug | `AppLifecycle: child process {{pid}} ("{{name}}") terminated` |
| Child process cleanup timeout | warning | `AppLifecycle: child process {{pid}} ("{{name}}") did not terminate within {{timeout}}s, sending SIGKILL` |
| All child processes cleaned up | info | `AppLifecycle: all child processes terminated` |
| App terminating | info | `AppLifecycle: applicationWillTerminate` |

## Platform Notes

- **SwiftUI (macOS) with AppDelegate**: Use `@NSApplicationDelegateAdaptor` to bridge an `AppDelegate` into the SwiftUI app. Implement `applicationShouldOpenUntitledFile(_:)` in the `AppDelegate` to control untitled window creation based on the startup behavior setting. Implement `applicationWillTerminate(_:)` for process cleanup and URL list saving. Use `NSApp.windows` to enumerate open document windows and collect their file URLs before quit. Scene declarations (`WindowGroup`, `DocumentGroup`, `Settings`) go in the `@main` App struct's `body`. Apply `.commands` modifier on the primary `WindowGroup` for custom menu items. Use `NSDocumentController.shared.recentDocumentURLs` as a reference but maintain the restore list separately in `UserDefaults`. For `SIGHUP` delivery, call `kill(0, SIGHUP)` to signal the entire process group, then iterate tracked child PIDs for any survivors.

- **UIKit (iOS/visionOS) with SceneDelegate**: Implement `scene(_:willConnectTo:options:)` in the `UISceneDelegate` to handle startup behavior. Use `NSUserActivity` or `UserDefaults` to persist and restore the document URL list. In `sceneDidDisconnect(_:)`, save the current document state. In `applicationWillTerminate(_:)` on the `UIApplicationDelegate`, perform final cleanup. On iOS, background tasks should be cancelled via their task handles rather than POSIX signals. On visionOS, scene management follows the same pattern as iOS.

- **Android (Activity lifecycle)**: Map startup behavior to `onCreate` / `onRestoreInstanceState`. Store the document URL list in `SharedPreferences`. In `onStop` or `onDestroy`, save the current state. Use `ProcessLifecycleOwner` to detect app-level lifecycle events. Child processes (if any) should be terminated in `onDestroy`. Android's activity back stack provides some built-in restore behavior, but explicit URL list management is needed for document-centric apps.

- **Web (SPA with beforeunload)**: Use the `beforeunload` event to save the document URL list to `localStorage`. On page load, check `localStorage` for saved URLs and restore them. Use `navigator.sendBeacon` or synchronous `localStorage` writes in the `beforeunload` handler to ensure data is saved. Web Workers or child processes (via `Worker` API) should be terminated with `worker.terminate()` in the `beforeunload` handler. The `visibilitychange` event with `document.visibilityState === 'hidden'` is more reliable than `beforeunload` on mobile browsers.

## Design Decisions

_None yet — decisions made during implementation should be recorded here._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec covering startup behavior, session restore, process cleanup, untitled window suppression, and multi-window scene wiring |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
