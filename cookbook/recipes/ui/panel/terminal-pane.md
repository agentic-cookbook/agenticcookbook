---
id: 4a2898cf-34ed-4153-8d06-c795f80c19cd
title: "Terminal Pane"
domain: cookbook.recipes.ui.panel.terminal-pane
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
  - macos
  - swift
  - windows
tags: 
  - panel
  - terminal-pane
  - ui
depends-on: []
related: []
references: []
---

# Terminal Pane

---
version: 1.0.0
status: accepted
created: 2026-03-25
last-updated: 2026-03-25
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
platforms: [macOS, iOS, visionOS]
tags: [terminal, shell, sessions, pty]
dependencies: [ui/color-profile.md@1.0.0, ui/metadata-line.md@1.0.0, ui/empty-state.md@1.0.0]
---

## Overview

A multi-session terminal pane that provides PTY-backed shell sessions within the workspace. Bundles five cooperating parts: terminal sessions (PTY lifecycle and state), a session manager (per-window session orchestration), a terminal view (SwiftTerm rendering with reparenting), a session list sidebar (selection and metadata display), and terminal profiles (shell and project-level settings). Derived from scratching-post terminal subsystem.

## Terminology

| Term | Definition |
|------|-----------|
| PTY | Pseudo-terminal — a kernel-level pair of file descriptors that connect a terminal emulator to a shell process |
| Terminal session | A single PTY-backed shell instance with its own state, scrollback, and metadata |
| Session manager | Per-window controller that owns an ordered list of sessions and manages their lifecycle |
| Terminal view | The visual rendering surface for a terminal session, backed by SwiftTerm on Apple platforms |
| Reparenting | Moving a terminal's NSView from one container to another without destroying scrollback or state |
| OSC | Operating System Command — an escape sequence used for terminal-to-app communication |
| Foreground process | The currently running process in the terminal's PTY, detected via `tcgetpgrp` |
| Dot color | A user-assignable colored indicator displayed in the session list row |
| Custom subtitle | Key-value metadata injected via OSC 7770 and displayed beneath the session name |

## Behavioral Requirements

### Terminal session

- **REQ-001**: Each terminal session MUST be backed by a PTY using a terminal emulator library (SwiftTerm on Apple platforms).
- **REQ-002**: Each session MUST have a unique UUID-based identifier.
- **REQ-003**: Each session MUST publish the following observable properties:
  - `name` — user-visible session name (editable)
  - `terminalTitle` — title set by the shell via OSC 2
  - `currentWorkingDirectory` — path set via OSC 7
  - `gitBranch` — current git branch for the working directory
  - `foregroundProcess` — name of the currently running foreground process
  - `dotColors` — array of user-assignable colored indicators
  - `customSubtitles` — dictionary of key-value subtitle metadata
  - `state` — enum: `.running` or `.terminated`
- **REQ-004**: The session MUST read the user's default shell from the `$SHELL` environment variable. If `$SHELL` is unset or empty, it MUST fall back to `/bin/zsh`.
- **REQ-005**: The shell MUST be launched as a login shell by prefixing the process name with `"-"` (e.g., `"-zsh"`).
- **REQ-006**: The session MUST set `TERM=xterm-256color` in the child process environment.
- **REQ-007**: The session MUST preserve the following environment variables from the parent process: `HOME`, `USER`, `LOGNAME`, `PATH`, `LANG`, `LC_ALL`, `LC_CTYPE`.

### OSC escape handling

- **REQ-008**: The session MUST handle OSC 7 (directory update). On receipt, it MUST update `currentWorkingDirectory` by parsing the `file://` URL and MUST trigger an asynchronous git branch detection for the new directory.
- **REQ-009**: The session MUST handle OSC 2 (title update). On receipt, it MUST update `terminalTitle`.
- **REQ-010**: The session MUST handle custom OSC 7770 with the following sub-commands:
  - `color=#rrggbb` — sets a dot color on the session
  - `subtitle:key=value` — sets or updates a custom subtitle entry
  - `clear-subtitle:key` — removes a specific custom subtitle entry
  - `clear-all-subtitles` — removes all custom subtitle entries

### Process monitoring

- **REQ-011**: The session MUST poll the foreground process every 1.5 seconds using `tcgetpgrp` to get the foreground process group ID, then `proc_pidpath` to resolve the process name.
- **REQ-012**: When the foreground process changes, the session MUST update the `foregroundProcess` property.
- **REQ-013**: When the shell process exits, the session MUST transition `state` to `.terminated`.

### Git branch detection

- **REQ-014**: Git branch detection MUST be performed asynchronously with a 2-second timeout by running `git rev-parse --abbrev-ref HEAD` in the session's current working directory.
- **REQ-015**: Git branch detection MUST use a stale-request-tracking mechanism (UUID per request) so that results from outdated directory changes are discarded.
- **REQ-016**: If the directory is not a git repository, `gitBranch` MUST be set to `nil`.

### Session manager

- **REQ-017**: Each window MUST have its own session manager instance. Session managers MUST NOT be shared across windows.
- **REQ-018**: The session manager MUST maintain an ordered list of sessions and a selected session ID.
- **REQ-019**: Session names MUST be auto-incremented using the pattern "Session 1", "Session 2", etc. The counter MUST be monotonically increasing (not reused after deletion).
- **REQ-020**: The session manager MAY accept an optional working directory (for project context). When provided, new sessions MUST start in that directory.
- **REQ-021**: `addSession()` MUST create a new session, append it to the list, select it, and return it.
- **REQ-022**: `removeSession(id:)` MUST terminate the session's PTY, remove it from the list, and apply smart selection: prefer the previous session in the list, then the next session, then nil if none remain.
- **REQ-023**: `terminateAll()` MUST terminate all sessions' PTYs and clear the list. This MUST be called on window close.

### Terminal view

- **REQ-024**: The terminal view MUST be implemented as an `NSViewRepresentable` (macOS) or `UIViewRepresentable` (iOS/visionOS) wrapper containing a container `NSView`/`UIView`.
- **REQ-025**: On session change, the terminal view MUST reparent the selected session's terminal view into the container — not destroy and recreate it. This preserves scrollback history and cursor state.
- **REQ-026**: On profile change, the terminal view MUST apply the new color profile (foreground, background, cursor, selection, 16 ANSI colors, font, cursor style) without reparenting the view.
- **REQ-027**: Profile colors MUST be applied using the color-profile component's palette structure: FG, BG, cursor, selection, and exactly 16 ANSI colors (indices 0-15).

### Session list sidebar

- **REQ-028**: The session list MUST be displayed as a sidebar list showing one row per session.
- **REQ-029**: Each session row MUST display:
  - Dot color indicator(s) (if any assigned)
  - Session name (primary text)
  - Subtitle lines using the metadata-line component for: working directory (folder icon, middle-truncated path), git branch (branch icon), and foreground process (terminal icon)
- **REQ-030**: The session list MUST bind to the session manager's selected session ID for selection state.
- **REQ-031**: The session list MUST include an add button (`+`) that creates a new session via the session manager.
- **REQ-032**: Each session row MUST have a context menu with at least: "Rename" and "Close" actions.

### Empty state

- **REQ-033**: When no sessions exist, the terminal pane MUST display an empty state (per `ui/empty-state.md`) with:
  - Icon: `terminal` (SF Symbol) or platform equivalent
  - Heading: "No active terminal session"
  - Description: "Click + to open a new terminal session"
  - Optional action button: "New Session" (calls `addSession()`)

### Project settings

- **REQ-034**: The following settings MUST be available per-project in the settings window:
  - `defaultShell` — a string picker with options: `/bin/zsh`, `/bin/bash`, `/bin/sh`, `/usr/local/bin/fish`, `/opt/homebrew/bin/fish`. Overrides `$SHELL` when set.
  - `autoOpenTerminal` — a boolean that, when enabled, automatically opens a terminal session when the project is opened.

## Appearance

### Terminal pane layout

```
┌───────────────┬────────────────────────────────────┐
│ Sessions  [+] │                                    │
├───────────────┤                                    │
│               │                                    │
│ ● Session 1   │  user@host ~ %                     │
│   ~/projects  │  ls -la                            │
│   main        │  total 42                          │
│   zsh         │  drwxr-xr-x  5 user staff  160 ...│
│               │  -rw-r--r--  1 user staff  230 ...│
│ ○ Session 2   │                                    │
│   ~/docs      │                                    │
│   bash        │                                    │
│               │                                    │
│               │                                    │
│               │                                    │
└───────────────┴────────────────────────────────────┘
```

### Session row detail

```
┌───────────────────┐
│ ● Session 1       │  ← dot color + name
│  📁 ~/projects    │  ← metadata-line: working directory (middle-truncated)
│  🌿 main          │  ← metadata-line: git branch
│  ⬛ zsh           │  ← metadata-line: foreground process
└───────────────────┘
```

### Empty state

```
┌────────────────────────────────────────────────────┐
│                                                    │
│                                                    │
│                   ⬛                               │
│         No active terminal session                 │
│     Click + to open a new terminal session         │
│              [New Session]                         │
│                                                    │
│                                                    │
└────────────────────────────────────────────────────┘
```

- **Sidebar width**: 180–220pt, resizable
- **Session row spacing**: 4pt between dot/name line and metadata lines
- **Metadata lines**: Use metadata-line component (12pt secondary icon + caption text)
- **Dot color**: 8pt filled circle, leading the session name
- **Terminal background**: Determined by active color profile
- **Terminal font**: Determined by active color profile (monospaced)

## States

| State | Behavior |
|-------|----------|
| No sessions | Empty state displayed in main area; sidebar shows only the + button |
| One or more sessions, one selected | Selected session's terminal view reparented into container; sidebar highlights selected row |
| Session added | New session appended, selected, terminal view shown |
| Session removed | PTY terminated, smart selection applied (previous > next > nil) |
| Session terminated (shell exited) | State transitions to `.terminated`; row may show visual indicator |
| Profile changed | Colors/font applied to terminal view without reparenting |
| Working directory changed (OSC 7) | Sidebar row updates directory metadata line; git branch detection triggered |
| Terminal title changed (OSC 2) | `terminalTitle` property updated |
| Foreground process changed | Sidebar row updates process metadata line |
| Custom OSC 7770 received | Dot color or subtitle updated on session; sidebar row reflects change |
| Window closing | `terminateAll()` called; all PTYs cleaned up |

## Accessibility

- **REQ-035**: The session list MUST be keyboard-navigable. Arrow keys MUST move selection between sessions.
- **REQ-036**: The add button MUST have an accessible label: "New Terminal Session".
- **REQ-037**: Each session row MUST announce: session name, working directory, git branch (if present), and foreground process via a combined accessibility label.
- **REQ-038**: The context menu MUST be accessible via keyboard (e.g., Shift+F10 or Control+Click equivalent).
- **REQ-039**: The terminal view MUST support VoiceOver cursor navigation for reading terminal output.
- **REQ-040**: The empty state MUST follow empty-state accessibility requirements (heading announced first, icon decorative).
- **REQ-041**: The `.terminated` state MUST be announced to screen readers when a session's shell exits.

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| term-001 | REQ-001 | Create a new session | PTY is allocated, shell process is running |
| term-002 | REQ-004, REQ-005 | Create session with $SHELL=/bin/zsh | Shell launched as login shell "-zsh" |
| term-003 | REQ-004 | Create session with $SHELL unset | Falls back to /bin/zsh |
| term-004 | REQ-006 | Create session, inspect child environment | TERM=xterm-256color |
| term-005 | REQ-007 | Create session, inspect child environment | HOME, USER, LOGNAME, PATH, LANG, LC_ALL, LC_CTYPE present |
| term-006 | REQ-008 | Shell emits OSC 7 with file:///Users/me/projects | `currentWorkingDirectory` updates to /Users/me/projects; git branch detection starts |
| term-007 | REQ-009 | Shell emits OSC 2 with "my-title" | `terminalTitle` updates to "my-title" |
| term-008 | REQ-010 | Send OSC 7770 color=#ff0000 | Session dot color set to red |
| term-009 | REQ-010 | Send OSC 7770 subtitle:task=Building | Custom subtitle "task" = "Building" appears |
| term-010 | REQ-010 | Send OSC 7770 clear-subtitle:task | Custom subtitle "task" removed |
| term-011 | REQ-010 | Send OSC 7770 clear-all-subtitles | All custom subtitles removed |
| term-012 | REQ-011, REQ-012 | Run `sleep 60` in terminal, wait 1.5s | `foregroundProcess` updates to "sleep" |
| term-013 | REQ-013 | Type `exit` in shell | Session state transitions to `.terminated` |
| term-014 | REQ-014, REQ-015 | cd to a git repo, then quickly cd to another git repo | Only the second repo's branch is reported (stale result discarded) |
| term-015 | REQ-014 | cd to a non-git directory | `gitBranch` set to nil |
| term-016 | REQ-017 | Open two windows | Each window has its own session manager with independent session lists |
| term-017 | REQ-019 | Create 3 sessions, delete Session 2, create another | Sessions named "Session 1", "Session 2", "Session 3"; after delete + create: "Session 1", "Session 3", "Session 4" |
| term-018 | REQ-021 | Click + button | New session created, selected, terminal view shows shell prompt |
| term-019 | REQ-022 | With sessions [A, B, C], B selected, remove B | A becomes selected (prefers previous) |
| term-020 | REQ-022 | With sessions [A, B], A selected, remove A | B becomes selected (falls to next) |
| term-021 | REQ-022 | With single session [A], remove A | No selection; empty state displayed |
| term-022 | REQ-023 | Close window with 3 active sessions | All 3 PTYs terminated |
| term-023 | REQ-025 | Switch from Session 1 to Session 2 and back | Session 1 scrollback and cursor position preserved |
| term-024 | REQ-026 | Change color profile while session is active | Colors update immediately; no reparenting; scrollback preserved |
| term-025 | REQ-029 | Session in ~/projects on branch main running vim | Row shows: name, "~/projects" with folder icon, "main" with branch icon, "vim" with terminal icon |
| term-026 | REQ-032 | Right-click session row | Context menu shows "Rename" and "Close" |
| term-027 | REQ-033 | Remove all sessions | Empty state displayed with icon, heading, description, and New Session button |
| term-028 | REQ-034 | Set defaultShell to /bin/bash, create session | Session launches /bin/bash instead of $SHELL |
| term-029 | REQ-034 | Enable autoOpenTerminal, open project | Terminal session created automatically on project open |
| term-030 | REQ-035 | Focus session list, press Down arrow | Selection moves to next session |
| term-031 | REQ-020 | Session manager with working directory /tmp, create session | New session shell starts in /tmp |

## Edge Cases

- **Shell not found**: If the configured shell path does not exist (e.g., fish not installed), the session MUST fall back to `/bin/zsh` and log a warning. It MUST NOT crash.
- **PTY allocation failure**: If PTY allocation fails, the session MUST display an error message in the terminal view area and log an error. It MUST NOT crash.
- **Rapid session switching**: Reparenting MUST complete without flicker. If a session switch occurs while a reparenting is in progress, the latest switch MUST win.
- **Very long session name**: Session name SHOULD truncate with trailing ellipsis in the sidebar row.
- **Many sessions (50+)**: The session list MUST remain scrollable and performant. Consider virtualized/recycled list.
- **Git branch detection timeout**: If `git rev-parse` exceeds 2 seconds, the request MUST be cancelled and `gitBranch` left unchanged. No error shown to user.
- **Git not installed**: If `git` is not available on PATH, git branch detection MUST silently set `gitBranch` to nil. No error shown.
- **OSC 7770 malformed payload**: Invalid sub-commands or malformed hex colors MUST be silently ignored. Log at debug level.
- **Process monitoring after shell exit**: Polling MUST stop when the session transitions to `.terminated`. Timer MUST be invalidated.
- **Large scrollback buffer**: SwiftTerm should handle large scrollback (10,000+ lines) without excessive memory growth. Rely on library defaults.
- **Session terminated while selected**: The terminated session SHOULD remain visible (showing final output) until the user removes it or switches away.
- **Multiple dot colors**: A session MAY have multiple dot colors (from multiple OSC 7770 color commands). Display them in order.
- **Window restored after crash**: Session manager MUST NOT attempt to restore PTY sessions from a previous run. Sessions are ephemeral.
- **Environment variable conflicts**: If `defaultShell` project setting and `$SHELL` both exist, `defaultShell` MUST take precedence.
- **Non-UTF-8 output**: The terminal emulator library (SwiftTerm) handles encoding. Invalid sequences SHOULD be rendered as replacement characters, not cause a crash.

## Logging

Subsystem: `{{bundle_id}}` | Category: `TerminalPane`

| Event | Level | Message |
|-------|-------|---------|
| Session created | debug | `TerminalPane: session created "{{name}}" ({{id}}) with shell {{shell}}` |
| Session selected | debug | `TerminalPane: session selected "{{name}}" ({{id}})` |
| Session removed | debug | `TerminalPane: session removed "{{name}}" ({{id}})` |
| Session terminated | debug | `TerminalPane: session "{{name}}" ({{id}}) shell exited with code {{code}}` |
| All sessions terminated | debug | `TerminalPane: all sessions terminated (window closing)` |
| Working directory changed | debug | `TerminalPane: session "{{name}}" directory changed to "{{path}}"` |
| Git branch detected | debug | `TerminalPane: session "{{name}}" git branch: "{{branch}}"` |
| Git branch detection timeout | debug | `TerminalPane: session "{{name}}" git branch detection timed out for "{{path}}"` |
| Git branch stale result | debug | `TerminalPane: session "{{name}}" discarding stale git branch result` |
| Foreground process changed | debug | `TerminalPane: session "{{name}}" foreground process: "{{process}}"` |
| OSC 7 received | debug | `TerminalPane: session "{{name}}" OSC 7: "{{url}}"` |
| OSC 2 received | debug | `TerminalPane: session "{{name}}" OSC 2: "{{title}}"` |
| OSC 7770 received | debug | `TerminalPane: session "{{name}}" OSC 7770: "{{payload}}"` |
| OSC 7770 malformed | debug | `TerminalPane: session "{{name}}" ignoring malformed OSC 7770: "{{payload}}"` |
| Profile applied | debug | `TerminalPane: applied profile "{{profileName}}" to session "{{name}}"` |
| Terminal reparented | debug | `TerminalPane: reparented terminal view to session "{{name}}" ({{id}})` |
| Shell fallback | warning | `TerminalPane: configured shell "{{shell}}" not found, falling back to /bin/zsh` |
| PTY allocation failed | error | `TerminalPane: failed to allocate PTY for session "{{name}}": {{error}}` |
| Session renamed | debug | `TerminalPane: session "{{id}}" renamed from "{{oldName}}" to "{{newName}}"` |
| Empty state displayed | debug | `TerminalPane: no sessions, showing empty state` |
| Auto-open triggered | debug | `TerminalPane: autoOpenTerminal enabled, creating initial session` |

## Platform Notes

- **SwiftUI (macOS)**: Use `NSViewRepresentable` wrapping a container `NSView`. SwiftTerm provides `TerminalView` (an `NSView` subclass) — do not recreate it per session switch; instead, remove it from the old container and add it to the new container via `addSubview` / `removeFromSuperview`. Apply color profiles via SwiftTerm's `installColors(foreground:background:cursor:selection:ansi:)` and `font` property. PTY creation: use `forkpty()` or `posix_openpt()` + `grantpt()` + `unlockpt()`. Process monitoring: `tcgetpgrp(fd)` for PGID, `proc_pidpath(pid, buf, bufSize)` for process path. Session list: `List(selection:)` with `ForEach` over session manager's sessions. Context menu via `.contextMenu`. The `+` button in the sidebar header via a `toolbar` item scoped to the sidebar.
- **SwiftUI (iOS / visionOS)**: Use `UIViewRepresentable` wrapping a container `UIView`. SwiftTerm provides `TerminalView` as a `UIView` subclass. Reparenting approach is identical. On iOS, the session list may be presented as a sheet or popover rather than a persistent sidebar, depending on size class. On visionOS, use a `NavigationSplitView` with the session list in the sidebar column. PTY APIs (`forkpty`, `tcgetpgrp`) are available on iOS but sandboxing restrictions may limit shell execution to developer/enterprise contexts.
- **General**: The terminal emulator library (SwiftTerm) handles VT100/xterm escape sequence parsing, scrollback buffer management, and text rendering. The session layer is responsible for PTY lifecycle, environment setup, OSC dispatch, and process monitoring. The view layer is responsible for reparenting and profile application.

## Privacy

- **Data collected**: Terminal output is rendered in-memory by SwiftTerm. Custom subtitles and dot colors are session-ephemeral.
- **Storage**: No terminal content is persisted to disk. Project settings (defaultShell, autoOpenTerminal) are stored in the project's settings file.
- **Transmission**: None — terminal content never leaves the device.
- **Retention**: Session data exists only for the lifetime of the session. Settings persist until changed.

## Design Decisions

_None yet — decisions made during implementation should be recorded here._

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-25 | Initial spec, bundling terminal session, session manager, terminal view, session list sidebar, and terminal profiles. Derived from scratching-post terminal subsystem. |
