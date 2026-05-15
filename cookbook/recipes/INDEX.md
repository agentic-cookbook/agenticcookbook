---
id: 7ee050d1-e070-473e-ad64-9152ea25e54f
title: "Recipe Index"
domain: agentic-cookbook://recipes/INDEX
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
  - recipe.infrastructure.package-document
  - recipe.ui.window.project-window
  - recipe.ui.window.settings-window
  - recipe.ui.window.standalone-terminal-window
  - recipe.ui.window.workspace-window
  - recipe.developer-tools.claude.claude-rule-optimization-pipeline
  - recipe.ui.apps.apple
  - recipe.autonomous-dev-bots.pr-review-pipeline
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

## ui.window

Top-level window layouts.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.ui.window.project-window | [project-window.md](ui/window/project-window.md) | 1.1.0 | Primary IDE-style four-panel project window |
| recipe.ui.window.workspace-window | [workspace-window.md](ui/window/workspace-window.md) | 1.0.0 | Two-pane workspace browser for managing multiple projects |
| recipe.ui.window.settings-window | [settings-window.md](ui/window/settings-window.md) | 1.3.0 | Desktop application settings/preferences window |
| recipe.ui.window.standalone-terminal-window | [standalone-terminal-window.md](ui/window/standalone-terminal-window.md) | 1.0.0 | Standalone terminal window with session sidebar |

## infrastructure

Non-visual architecture patterns: sync, document packaging.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.infrastructure.directory-sync | [directory-sync.md](infrastructure/directory-sync.md) | 1.0.0 | Lifecycle pattern for syncing in-memory file tree with filesystem |
| recipe.infrastructure.package-document | [package-document.md](infrastructure/package-document.md) | 1.0.1 | Directory bundle package pattern with SQLite databases |

## app

Application lifecycle, menus, and commands.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.app.lifecycle | [lifecycle.md](app/lifecycle.md) | 1.0.0 | Startup, session restore, and quit cleanup pattern |
| recipe.app.menu-commands | [menu-commands.md](app/menu-commands.md) | 1.0.0 | Menu command structure with keyboard shortcuts and document creation flows |

## ui.apps

Application-level UI recipes.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.ui.apps.apple | [apple.md](ui/apps/apple.md) | 1.0.0 | Apple Test App Suite |

## autonomous-dev-bots

Long-running agent processes and pipelines.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.autonomous-dev-bots.pr-review-pipeline | [pr-review-pipeline.md](autonomous-dev-bots/pr-review-pipeline.md) | 1.0.0 | Automated PR review pipeline |

## developer-tools.claude

Recipes for Claude Code pipelines and developer environment configuration.

| Domain | File | Version | Description |
|--------|------|---------|-------------|
| recipe.developer-tools.claude.claude-rule-optimization-pipeline | [claude-rule-optimization-pipeline.md](developer-tools/claude/claude-rule-optimization-pipeline.md) | 1.0.0 | Four-phase pipeline for auditing and optimizing rule file context efficiency |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
