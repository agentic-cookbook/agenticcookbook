---
id: 00000000-0000-0000-0000-000000000001
title: "Agentic Cookbook"
domain: agentic-cookbook://index
type: reference
version: 3.1.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-04-05
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "A library of principles, guidelines, ingredients, recipes, and workflows for building software with AI-assisted development."
platforms: []
tags: []
depends-on: []
related: []
references:
  - https://github.com/agentic-cookbook/cookbook
---

# Agentic Cookbook

A library of principles, guidelines, ingredients, recipes, and workflows for building software with AI-assisted development.

## Introduction

*Start here.* How to use this book — conventions, terminology, and getting started.

| Topic | Description |
|-------|-------------|
| [Getting Started](introduction/getting-started.md) | Setup and first steps |
| [Conventions](introduction/conventions.md) | File format, naming, cross-referencing |
| [Glossary](introduction/glossary.md) | Term definitions |

## Principles

*How to think about engineering.* Foundational ideas that guide all technical decisions.

| Principle | Summary |
|-----------|---------|
| [Simplicity](principles/simplicity.md) | No interleaving of concerns. Simple beats easy. |
| [Make It Work, Make It Right, Make It Fast](principles/make-it-work-make-it-right-make-it-fast.md) | Three sequential phases — never skip phase 2. |
| [YAGNI](principles/yagni.md) | Build for today's known requirements. |
| [Fail Fast](principles/fail-fast.md) | Detect invalid state at the point of origin. |
| [Dependency Injection](principles/dependency-injection.md) | Receive dependencies from outside. |
| [Immutability by Default](principles/immutability-by-default.md) | Default to immutable values; mutate only when necessary. |
| [Composition over Inheritance](principles/composition-over-inheritance.md) | Compose small pieces over deep hierarchies. |
| [Separation of Concerns](principles/separation-of-concerns.md) | One reason to change per module. |
| [Design for Deletion](principles/design-for-deletion.md) | Build disposable software, not reusable software. |
| [Explicit over Implicit](principles/explicit-over-implicit.md) | Visible dependencies, clear intent. |
| [Small, Reversible Decisions](principles/small-reversible-decisions.md) | Cheap to reverse? Decide fast. Expensive? Invest in understanding. |
| [Tight Feedback Loops](principles/tight-feedback-loops.md) | The speed of your feedback loop is the speed of your learning. |
| [Manage Complexity Through Boundaries](principles/manage-complexity-through-boundaries.md) | Well-defined interfaces let each side evolve independently. |
| [Principle of Least Astonishment](principles/principle-of-least-astonishment.md) | Behavior matches what the name promises. |
| [Idempotency](principles/idempotency.md) | Safe to repeat without duplicate side effects. |
| [Native Controls](principles/native-controls.md) | Prefer platform built-in frameworks. |
| [Open Source Preference](principles/open-source-preference.md) | Prefer proven libraries over custom solutions. |
| [Support Automation](principles/support-automation.md) | Expose capabilities through automation interfaces, not just interactive UI. |
| [Optimize for Change](principles/meta-principle-optimize-for-change.md) | Every principle is a strategy for making future change cheaper. |

## Guidelines

*What rules apply when building.* Topic-oriented guidance organized by the problem you're solving.

| Topic | Description |
|-------|-------------|
| [Testing](guidelines/testing/) | Writing and running tests — pyramid, patterns, doubles, mutation testing |
| [Security](guidelines/security/) | Protecting data and users — auth, tokens, CORS, privacy, secure storage |
| [UI](guidelines/ui/) | Designing interfaces — typography, spacing, color, layout, accessibility |
| [Networking](guidelines/networking/) | Talking to servers — API design, caching, retries, timeouts |
| [Accessibility](guidelines/accessibility/) | Making apps usable by everyone |
| [Internationalization](guidelines/internationalization/) | Supporting multiple languages and regions |
| [Concurrency](guidelines/concurrency/) | Doing work in the background safely |
| [Logging](guidelines/logging/) | Tracking what happens at runtime |
| [Feature Management](guidelines/feature-management/) | Feature flags, A/B testing, debug mode |
| [Code Quality](guidelines/code-quality/) | Linting, atomic commits |
| [Language-Specific](guidelines/language/) | Swift, Kotlin, C#, Python — truly language-only guidance |
| [Platform Integration](guidelines/platform/) | System integration — deep linking, search, widgets, notifications, sharing, background tasks, continuity |
| [Platform-Specific: Windows](guidelines/platform/windows/) | Windows-only — Fluent Design, MSIX, DPI scaling, theming |
| [Database Design](guidelines/database-design/) | SQLite best practices — schema design, performance, device-to-server sync, production operations |
| [Skills and Agents](guidelines/skills-and-agents/) | Authoring skills, rules, and agents — checklists, structure references, performance |

## Ingredients

*The building blocks.* Atomic component specs for UI components, panels, and infrastructure patterns.

| Category | Description |
|----------|-------------|
| [UI Components](ingredients/ui/components/) | Leaf building blocks — ai-chat-control, collapsible-pane-header, color-profile, empty-state, git-status-indicator, metadata-line, status-bar |
| [Panels](ingredients/ui/panels/) | Content panes — ai-settings-panel, code-editor-pane, debug-panel, file-tree-browser, inspector-panel, terminal-pane |
| [Infrastructure](ingredients/infrastructure/) | Non-visual patterns — logging, settings-keys, window-frame-persistence |
| [Developer Tools](ingredients/developer-tools/) | Claude Code workarounds — yolo-mode |
| [Web Controls](ingredients/web/) | Web UI controls — appearance-mode-toggle |

## Recipes

*How things combine.* Compositions of configured ingredients into coherent features.

| Category | Description |
|----------|-------------|
| [Windows](recipes/ui/windows/) | Top-level layouts — project-window, workspace-window, settings-window, standalone-terminal-window |
| [Apps](recipes/ui/apps/) | Application-level UI — apple test app suite |
| [App-Level](recipes/app/) | Lifecycle, menus, commands |
| [Autonomous Dev Bots](recipes/autonomous-dev-bots/) | Long-running agent processes — pr-review-pipeline |
| [Developer Tools](recipes/developer-tools/) | Claude Code pipelines — claude-rule-optimization-pipeline |
| [Infrastructure](recipes/infrastructure/) | Non-visual patterns — directory-sync, package-document |

## Workflows

*How to work.* Development process recipes for AI-assisted coding sessions.

| Workflow | Description |
|----------|-------------|
| [Branching Strategy](workflows/branching-strategy.md) | Worktree + draft PR lifecycle |
| [Code Planning](workflows/code-planning.md) | Pre-implementation decision-making |
| [Code Implementation](workflows/code-implementation.md) | Disciplined phased execution |
| [Code Verification](workflows/code-verification.md) | Post-implementation validation |
| [Code Review](workflows/code-review.md) | Structured review process |

## Compliance

*What to verify.* Curated indexes of guideline-derived checks, grouped by concern.

| Category | Checks | Scope |
|----------|--------|-------|
| [Security](compliance/security.md) | 12 | Auth, storage, input, transport, logging, dependencies |
| [User Safety](compliance/user-safety.md) | 6 | Content moderation, age-gating, abuse prevention |
| [Performance](compliance/performance.md) | 8 | Render time, animation, resources, caching |
| [Best Practices](compliance/best-practices.md) | 8 | Testing, linting, error handling, code quality |
| [Access Patterns](compliance/access-patterns.md) | 8 | Client-server, offline, retry, pagination |
| [Accessibility](compliance/accessibility.md) | 8 | Screen readers, keyboard, contrast, motion |
| [Privacy & Data](compliance/privacy-and-data.md) | 8 | Collection, storage, retention, consent |
| [Platform Compliance](compliance/platform-compliance.md) | 8 | App Store, Google Play, design language |
| [Reliability](compliance/reliability.md) | 8 | Error recovery, degradation, state, idempotency |
| [Internationalization](compliance/internationalization.md) | 7 | Strings, RTL, locale formatting, Unicode |

## Reference

*Where to find more.* External best-practices links organized by platform.

| Platform | Link |
|----------|------|
| [Apple](reference/best-practices/apple.md) | HIG, Swift API Guidelines, App Store Review |
| [Android](reference/best-practices/android.md) | Material Design, Kotlin style, Play policies |
| [Web](reference/best-practices/web.md) | MDN, WCAG, web.dev |
| [Windows](reference/best-practices/windows-net.md) | .NET guidelines, WinUI, Fluent |
| [UI Design](reference/best-practices/ui-design.md) | NNGroup, Apple HIG, Material Design |
| [Networking](reference/best-practices/networking.md) | REST guidelines, RFC references |
| [Security](reference/best-practices/security.md) | OWASP, CWE, Mozilla |
| [Testing](reference/best-practices/testing.md) | Google SWE Book, Fowler, Kent Beck |
| [Cross-Platform](reference/best-practices/cross-platform.md) | Nielsen Norman, MASVS, MASTG |
| [References](reference/references.md) | Additional reference materials |
| [Example Concoction](reference/examples/) | My Document Editor — complete concoction example |

## Appendix

*Supplementary materials.* Contribution guides, design decisions, and research notes.

| Section | Description |
|---------|-------------|
| [Contributing](appendix/contributing/) | How to author and contribute content |
| [Decisions](appendix/decisions/) | Architecture decision records |
| [Research](appendix/research/) | Platform and tooling research notes |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
| 3.1.0 | 2026-04-05 | Mike Fullerton | Populate ingredients and recipes sections after reclassification of 18 ingredients from legacy recipes |
| 3.0.0 | 2026-04-05 | Mike Fullerton | Add ingredient/recipe/concoction hierarchy; mark existing recipes as legacy pending reclassification |
| 2.0.0 | 2026-04-02 | Mike Fullerton | Reorganize as book structure — flatten cookbook/ to top level, add introduction/ and appendix/ |
