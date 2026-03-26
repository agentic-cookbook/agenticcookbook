# Spec Index

Master index of all UI component and recipe specs, organized by category.

## UI Components

Reusable visual building blocks composed into larger layouts.

| Spec | Version | Description |
|------|---------|-------------|
| [empty-state.md](empty-state.md) | 1.0.0 | Centered placeholder view for empty content areas |
| [collapsible-pane-header.md](collapsible-pane-header.md) | 1.0.0 | Clickable header bar with disclosure chevron for split-view sections |
| [metadata-line.md](metadata-line.md) | 1.0.0 | Compact single-line label with leading icon and text value |
| [status-bar.md](status-bar.md) | 1.0.0 | Slim animated bar indicating background operations |
| [git-status-indicator.md](git-status-indicator.md) | 1.0.0 | Semantic git file status with colors, characters, and directory rollup |
| [color-profile.md](color-profile.md) | 1.0.0 | Named color palette (foreground, background, cursor, selection, 16 ANSI colors) |
| [ai-chat-control.md](ai-chat-control.md) | 1.0.0 | Compact inline chat control for conversing with a configured AI provider |

## Panels & Panes

Content areas that compose into windows.

| Spec | Version | Description |
|------|---------|-------------|
| [Recipes/file-tree-browser.md](Recipes/file-tree-browser.md) | 1.0.0 | Hierarchical file browser with git status badges and lazy loading |
| [Recipes/code-editor-pane.md](Recipes/code-editor-pane.md) | 1.0.0 | Source code editor with syntax highlighting, minimap, and auto-save |
| [Recipes/terminal-pane.md](Recipes/terminal-pane.md) | 1.0.0 | Multi-session PTY-backed terminal pane |
| [Recipes/inspector-panel.md](Recipes/inspector-panel.md) | 1.0.0 | Right-side sliding panel for selected item metadata |
| [Recipes/ai-settings-panel.md](Recipes/ai-settings-panel.md) | 1.1.0 | Settings panel for AI/LLM provider configuration |
| [Recipes/debug-panel.md](Recipes/debug-panel.md) | 1.0.0 | Debug-only panel for feature flags, analytics, and runtime overrides |

## Windows

Top-level window layouts.

| Spec | Version | Description |
|------|---------|-------------|
| [Recipes/project-window.md](Recipes/project-window.md) | 1.1.0 | Primary IDE-style four-panel project window |
| [Recipes/workspace-window.md](Recipes/workspace-window.md) | 1.0.0 | Two-pane workspace browser for managing multiple projects |
| [Recipes/settings-window.md](Recipes/settings-window.md) | 1.3.0 | Desktop application settings/preferences window |
| [Recipes/standalone-terminal-window.md](Recipes/standalone-terminal-window.md) | 1.0.0 | Standalone terminal window with session sidebar |

## Infrastructure & Patterns

Non-visual architecture specs: persistence, sync, logging.

| Spec | Version | Description |
|------|---------|-------------|
| [logging.md](logging.md) | 1.0.0 | Centralized logging infrastructure with per-category Logger instances |
| [settings-keys.md](settings-keys.md) | 1.0.0 | Centralized settings key registry preventing duplication and typos |
| [window-frame-persistence.md](window-frame-persistence.md) | 1.0.0 | View modifier persisting window position/size between sessions |
| [Recipes/directory-sync.md](Recipes/directory-sync.md) | 1.0.0 | Lifecycle pattern for syncing in-memory file tree with filesystem |
| [Recipes/package-document.md](Recipes/package-document.md) | 1.0.1 | Directory bundle package pattern with SQLite databases |

## App-Level

Application lifecycle, menus, and commands.

| Spec | Version | Description |
|------|---------|-------------|
| [Recipes/app-lifecycle.md](Recipes/app-lifecycle.md) | 1.0.0 | Startup, session restore, and quit cleanup pattern |
| [Recipes/menu-commands.md](Recipes/menu-commands.md) | 1.0.0 | Menu command structure with keyboard shortcuts and document creation flows |
