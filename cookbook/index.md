---
id: 00000000-0000-0000-0000-000000000001
title: "Agentic Cookbook"
domain: agentic-cookbook://index
type: reference
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "A library of principles, guidelines, recipes, and workflows for building software with AI-assisted development."
platforms: []
tags: []
depends-on: []
related: []
references:
  - https://agentic-agentic-cookbook://com
---

# Agentic Cookbook

A library of principles, guidelines, recipes, and workflows for building software with AI-assisted development. This cookbook is consumed directly by AI agents (Claude Code) and rendered as a website for humans.

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
| [Platform-Specific](guidelines/platform/) | Windows — truly platform-only guidance |

## Recipes

*What to build.* Concrete specs for UI components, panels, windows, and infrastructure patterns.

| Category | Description |
|----------|-------------|
| [UI Components](recipes/ui/component/) | Leaf building blocks — empty state, status bar, metadata line |
| [Panels](recipes/ui/panel/) | Content panes — file browser, editor, terminal, inspector |
| [Windows](recipes/ui/window/) | Top-level layouts — project, workspace, settings |
| [Infrastructure](recipes/infrastructure/) | Non-visual patterns — logging, persistence, sync |
| [App-Level](recipes/app/) | Lifecycle, menus, commands |

## Workflow

*How to work.* Development process recipes for AI-assisted coding sessions.

| Workflow | Description |
|----------|-------------|
| [Branching Strategy](workflow/branching-strategy.md) | Worktree + draft PR lifecycle |
| [Code Planning](workflow/code-planning.md) | Pre-implementation decision-making |
| [Code Implementation](workflow/code-implementation.md) | Disciplined phased execution |
| [Code Verification](workflow/code-verification.md) | Post-implementation validation |
| [Code Review](workflow/code-review.md) | Structured review process |

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

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
