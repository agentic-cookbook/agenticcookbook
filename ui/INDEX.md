# Spec Index

Master index of all UI component and recipe specs, organized by category.

Cross-reference using `SPEC-` notation: "See SPEC-3" means metadata-line.md. "See SPEC-3.2" means metadata-line.md section 2 (e.g., REQ-002). Gaps in numbering are reserved for future specs within that category.

**Maintenance**: This index MUST be updated on the same branch as any spec change. `SPEC-` numbers are stable — never reuse a number, even if a spec is removed. The CLAUDE.md `SPEC-` numbering table must stay in sync.

## UI Components

Reusable visual building blocks composed into larger layouts.

| ID | Spec | Version | Description |
|----|------|---------|-------------|
| SPEC-1 | [empty-state.md](empty-state.md) | 1.0.0 | Centered placeholder view for empty content areas |
| SPEC-2 | [collapsible-pane-header.md](collapsible-pane-header.md) | 1.0.0 | Clickable header bar with disclosure chevron for split-view sections |
| SPEC-3 | [metadata-line.md](metadata-line.md) | 1.0.0 | Compact single-line label with leading icon and text value |
| SPEC-4 | [status-bar.md](status-bar.md) | 1.0.0 | Slim animated bar indicating background operations |
| SPEC-5 | [git-status-indicator.md](git-status-indicator.md) | 1.0.0 | Semantic git file status with colors, characters, and directory rollup |
| SPEC-6 | [color-profile.md](color-profile.md) | 1.0.0 | Named color palette (foreground, background, cursor, selection, 16 ANSI colors) |

## Panels & Panes

Content areas that compose into windows.

| ID | Spec | Version | Description |
|----|------|---------|-------------|
| SPEC-10 | [Recipes/file-tree-browser.md](Recipes/file-tree-browser.md) | 1.0.0 | Hierarchical file browser with git status badges and lazy loading |
| SPEC-11 | [Recipes/code-editor-pane.md](Recipes/code-editor-pane.md) | 1.0.0 | Source code editor with syntax highlighting, minimap, and auto-save |
| SPEC-12 | [Recipes/terminal-pane.md](Recipes/terminal-pane.md) | 1.0.0 | Multi-session PTY-backed terminal pane |
| SPEC-13 | [Recipes/inspector-panel.md](Recipes/inspector-panel.md) | 1.0.0 | Right-side sliding panel for selected item metadata |
| SPEC-14 | [Recipes/ai-settings-panel.md](Recipes/ai-settings-panel.md) | 1.0.2 | Settings panel for AI/LLM provider configuration |
| SPEC-15 | [Recipes/debug-panel.md](Recipes/debug-panel.md) | 1.0.0 | Debug-only panel for feature flags, analytics, and runtime overrides |

## Windows

Top-level window layouts.

| ID | Spec | Version | Description |
|----|------|---------|-------------|
| SPEC-20 | [Recipes/project-window.md](Recipes/project-window.md) | 1.1.0 | Primary IDE-style four-panel project window |
| SPEC-21 | [Recipes/workspace-window.md](Recipes/workspace-window.md) | 1.0.0 | Two-pane workspace browser for managing multiple projects |
| SPEC-22 | [Recipes/settings-window.md](Recipes/settings-window.md) | 1.3.0 | Desktop application settings/preferences window |
| SPEC-23 | [Recipes/standalone-terminal-window.md](Recipes/standalone-terminal-window.md) | 1.0.0 | Standalone terminal window with session sidebar |

## Infrastructure & Patterns

Non-visual architecture specs: persistence, sync, logging.

| ID | Spec | Version | Description |
|----|------|---------|-------------|
| SPEC-30 | [logging.md](logging.md) | 1.0.0 | Centralized logging infrastructure with per-category Logger instances |
| SPEC-31 | [settings-keys.md](settings-keys.md) | 1.0.0 | Centralized settings key registry preventing duplication and typos |
| SPEC-32 | [window-frame-persistence.md](window-frame-persistence.md) | 1.0.0 | View modifier persisting window position/size between sessions |
| SPEC-33 | [Recipes/directory-sync.md](Recipes/directory-sync.md) | 1.0.0 | Lifecycle pattern for syncing in-memory file tree with filesystem |
| SPEC-34 | [Recipes/package-document.md](Recipes/package-document.md) | 1.0.1 | Directory bundle package pattern with SQLite databases |

## App-Level

Application lifecycle, menus, and commands.

| ID | Spec | Version | Description |
|----|------|---------|-------------|
| SPEC-40 | [Recipes/app-lifecycle.md](Recipes/app-lifecycle.md) | 1.0.0 | Startup, session restore, and quit cleanup pattern |
| SPEC-41 | [Recipes/menu-commands.md](Recipes/menu-commands.md) | 1.0.0 | Menu command structure with keyboard shortcuts and document creation flows |
