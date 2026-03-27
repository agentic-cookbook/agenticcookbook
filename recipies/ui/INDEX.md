# Recipe Index

Master index of all UI component and recipe specs, organized by category.

Cross-reference using `RECIPE-` notation: "See RECIPE-3" means RECIPE-3-metadata-line.md. "See RECIPE-3.2" means RECIPE-3-metadata-line.md section 2 (e.g., REQ-002). Gaps in numbering are reserved for future specs within that category.

**Maintenance**: This index MUST be updated on the same branch as any recipe change. `RECIPE-` numbers are stable — never reuse a number, even if a recipe is removed. The CLAUDE.md `RECIPE-` numbering table must stay in sync.

## UI Components

Reusable visual building blocks composed into larger layouts.

| ID | Recipe | Version | Description |
|----|--------|---------|-------------|
| RECIPE-1 | [RECIPE-1-empty-state.md](RECIPE-1-empty-state.md) | 1.0.0 | Centered placeholder view for empty content areas |
| RECIPE-2 | [RECIPE-2-collapsible-pane-header.md](RECIPE-2-collapsible-pane-header.md) | 1.0.0 | Clickable header bar with disclosure chevron for split-view sections |
| RECIPE-3 | [RECIPE-3-metadata-line.md](RECIPE-3-metadata-line.md) | 1.0.0 | Compact single-line label with leading icon and text value |
| RECIPE-4 | [RECIPE-4-status-bar.md](RECIPE-4-status-bar.md) | 1.0.0 | Slim animated bar indicating background operations |
| RECIPE-5 | [RECIPE-5-git-status-indicator.md](RECIPE-5-git-status-indicator.md) | 1.0.0 | Semantic git file status with colors, characters, and directory rollup |
| RECIPE-6 | [RECIPE-6-color-profile.md](RECIPE-6-color-profile.md) | 1.0.0 | Named color palette (foreground, background, cursor, selection, 16 ANSI colors) |
| RECIPE-7 | [RECIPE-7-ai-chat-control.md](RECIPE-7-ai-chat-control.md) | 1.0.0 | Compact inline chat control for conversing with a configured AI provider |

## Panels & Panes

Content areas that compose into windows.

| ID | Recipe | Version | Description |
|----|--------|---------|-------------|
| RECIPE-10 | [RECIPE-10-file-tree-browser.md](RECIPE-10-file-tree-browser.md) | 1.0.0 | Hierarchical file browser with git status badges and lazy loading |
| RECIPE-11 | [RECIPE-11-code-editor-pane.md](RECIPE-11-code-editor-pane.md) | 1.0.0 | Source code editor with syntax highlighting, minimap, and auto-save |
| RECIPE-12 | [RECIPE-12-terminal-pane.md](RECIPE-12-terminal-pane.md) | 1.0.0 | Multi-session PTY-backed terminal pane |
| RECIPE-13 | [RECIPE-13-inspector-panel.md](RECIPE-13-inspector-panel.md) | 1.0.0 | Right-side sliding panel for selected item metadata |
| RECIPE-14 | [RECIPE-14-ai-settings-panel.md](RECIPE-14-ai-settings-panel.md) | 1.1.0 | Settings panel for AI/LLM provider configuration |
| RECIPE-15 | [RECIPE-15-debug-panel.md](RECIPE-15-debug-panel.md) | 1.0.0 | Debug-only panel for feature flags, analytics, and runtime overrides |

## Windows

Top-level window layouts.

| ID | Recipe | Version | Description |
|----|--------|---------|-------------|
| RECIPE-20 | [RECIPE-20-project-window.md](RECIPE-20-project-window.md) | 1.1.0 | Primary IDE-style four-panel project window |
| RECIPE-21 | [RECIPE-21-workspace-window.md](RECIPE-21-workspace-window.md) | 1.0.0 | Two-pane workspace browser for managing multiple projects |
| RECIPE-22 | [RECIPE-22-settings-window.md](RECIPE-22-settings-window.md) | 1.3.0 | Desktop application settings/preferences window |
| RECIPE-23 | [RECIPE-23-standalone-terminal-window.md](RECIPE-23-standalone-terminal-window.md) | 1.0.0 | Standalone terminal window with session sidebar |

## Infrastructure & Patterns

Non-visual architecture specs: persistence, sync, logging.

| ID | Recipe | Version | Description |
|----|--------|---------|-------------|
| RECIPE-30 | [RECIPE-30-logging.md](RECIPE-30-logging.md) | 1.0.0 | Centralized logging infrastructure with per-category Logger instances |
| RECIPE-31 | [RECIPE-31-settings-keys.md](RECIPE-31-settings-keys.md) | 1.0.0 | Centralized settings key registry preventing duplication and typos |
| RECIPE-32 | [RECIPE-32-window-frame-persistence.md](RECIPE-32-window-frame-persistence.md) | 1.0.0 | View modifier persisting window position/size between sessions |
| RECIPE-33 | [RECIPE-33-directory-sync.md](RECIPE-33-directory-sync.md) | 1.0.0 | Lifecycle pattern for syncing in-memory file tree with filesystem |
| RECIPE-34 | [RECIPE-34-package-document.md](RECIPE-34-package-document.md) | 1.0.1 | Directory bundle package pattern with SQLite databases |

## App-Level

Application lifecycle, menus, and commands.

| ID | Recipe | Version | Description |
|----|--------|---------|-------------|
| RECIPE-40 | [RECIPE-40-app-lifecycle.md](RECIPE-40-app-lifecycle.md) | 1.0.0 | Startup, session restore, and quit cleanup pattern |
| RECIPE-41 | [RECIPE-41-menu-commands.md](RECIPE-41-menu-commands.md) | 1.0.0 | Menu command structure with keyboard shortcuts and document creation flows |
