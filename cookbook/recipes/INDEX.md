---
id: 7ee050d1-e070-473e-ad64-9152ea25e54f
title: "Recipe Index"
domain: cookbook.recipes.INDEX
type: recipe
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Master index of all recipes, organized by domain hierarchy."
platforms: 
  - kotlin
  - web
  - windows
tags: []
depends-on: []
related: 
  - recipe.app.lifecycle
  - recipe.app.menu-commands
  - recipe.infrastructure.directory-sync
  - recipe.infrastructure.logging
  - recipe.infrastructure.package-document
  - recipe.infrastructure.settings-keys
  - recipe.infrastructure.window-frame-persistence
  - recipe.ui.component.ai-chat-control
  - recipe.ui.component.collapsible-pane-header
  - recipe.ui.component.color-profile
  - recipe.ui.component.empty-state
  - recipe.ui.component.git-status-indicator
  - recipe.ui.component.metadata-line
  - recipe.ui.component.status-bar
  - recipe.ui.panel.ai-settings-panel
  - recipe.ui.panel.code-editor-pane
  - recipe.ui.panel.debug-panel
  - recipe.ui.panel.file-tree-browser
  - recipe.ui.panel.inspector-panel
  - recipe.ui.panel.terminal-pane
  - recipe.ui.window.project-window
  - recipe.ui.window.settings-window
  - recipe.ui.window.standalone-terminal-window
  - recipe.ui.window.workspace-window
references: []
---

# Recipe Index

Master index of all recipes, organized by domain hierarchy.

## Domain Derivation

The domain identifier for each recipe is derived from its filesystem path:

1. Start from the `recipes/` directory
2. Replace `/` with `.`
3. Drop the `.md` extension
4. Prepend `recipe.`

Example: `recipes/ui/panel/file-tree-browser.md` → `recipe.ui.panel.file-tree-browser`

Cross-reference using the domain: "See `recipe.ui.window.project-window`"

**Maintenance**: This index MUST be updated on the same branch as any recipe change. The CLAUDE.md recipe table must stay in sync.

## ui.component

Reusable visual building blocks composed into larger layouts.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.ui.component.empty-state | [empty-state.md](ui/component/empty-state.md) | 1.0.0 | Centered placeholder view for empty content areas |
| recipe.ui.component.collapsible-pane-header | [collapsible-pane-header.md](ui/component/collapsible-pane-header.md) | 1.0.0 | Clickable header bar with disclosure chevron for split-view sections |
| recipe.ui.component.metadata-line | [metadata-line.md](ui/component/metadata-line.md) | 1.0.0 | Compact single-line label with leading icon and text value |
| recipe.ui.component.status-bar | [status-bar.md](ui/component/status-bar.md) | 1.0.0 | Slim animated bar indicating background operations |
| recipe.ui.component.git-status-indicator | [git-status-indicator.md](ui/component/git-status-indicator.md) | 1.0.0 | Semantic git file status with colors, characters, and directory rollup |
| recipe.ui.component.color-profile | [color-profile.md](ui/component/color-profile.md) | 1.0.0 | Named color palette (foreground, background, cursor, selection, 16 ANSI colors) |
| recipe.ui.component.ai-chat-control | [ai-chat-control.md](ui/component/ai-chat-control.md) | 1.0.0 | Compact inline chat control for conversing with a configured AI provider |

## ui.panel

Content areas that compose into windows.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.ui.panel.file-tree-browser | [file-tree-browser.md](ui/panel/file-tree-browser.md) | 1.0.0 | Hierarchical file browser with git status badges and lazy loading |
| recipe.ui.panel.code-editor-pane | [code-editor-pane.md](ui/panel/code-editor-pane.md) | 1.0.0 | Source code editor with syntax highlighting, minimap, and auto-save |
| recipe.ui.panel.terminal-pane | [terminal-pane.md](ui/panel/terminal-pane.md) | 1.0.0 | Multi-session PTY-backed terminal pane |
| recipe.ui.panel.inspector-panel | [inspector-panel.md](ui/panel/inspector-panel.md) | 1.0.0 | Right-side sliding panel for selected item metadata |
| recipe.ui.panel.ai-settings-panel | [ai-settings-panel.md](ui/panel/ai-settings-panel.md) | 1.1.0 | Settings panel for AI/LLM provider configuration |
| recipe.ui.panel.debug-panel | [debug-panel.md](ui/panel/debug-panel.md) | 1.0.0 | Debug-only panel for feature flags, analytics, and runtime overrides |

## ui.window

Top-level window layouts.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.ui.window.project-window | [project-window.md](ui/window/project-window.md) | 1.1.0 | Primary IDE-style four-panel project window |
| recipe.ui.window.workspace-window | [workspace-window.md](ui/window/workspace-window.md) | 1.0.0 | Two-pane workspace browser for managing multiple projects |
| recipe.ui.window.settings-window | [settings-window.md](ui/window/settings-window.md) | 1.3.0 | Desktop application settings/preferences window |
| recipe.ui.window.standalone-terminal-window | [standalone-terminal-window.md](ui/window/standalone-terminal-window.md) | 1.0.0 | Standalone terminal window with session sidebar |

## infrastructure

Non-visual architecture patterns: persistence, sync, logging.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.infrastructure.logging | [logging.md](infrastructure/logging.md) | 1.0.0 | Centralized logging infrastructure with per-category Logger instances |
| recipe.infrastructure.settings-keys | [settings-keys.md](infrastructure/settings-keys.md) | 1.0.0 | Centralized settings key registry preventing duplication and typos |
| recipe.infrastructure.window-frame-persistence | [window-frame-persistence.md](infrastructure/window-frame-persistence.md) | 1.0.0 | View modifier persisting window position/size between sessions |
| recipe.infrastructure.directory-sync | [directory-sync.md](infrastructure/directory-sync.md) | 1.0.0 | Lifecycle pattern for syncing in-memory file tree with filesystem |
| recipe.infrastructure.package-document | [package-document.md](infrastructure/package-document.md) | 1.0.1 | Directory bundle package pattern with SQLite databases |

## app

Application lifecycle, menus, and commands.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.app.lifecycle | [lifecycle.md](app/lifecycle.md) | 1.0.0 | Startup, session restore, and quit cleanup pattern |
| recipe.app.menu-commands | [menu-commands.md](app/menu-commands.md) | 1.0.0 | Menu command structure with keyboard shortcuts and document creation flows |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
