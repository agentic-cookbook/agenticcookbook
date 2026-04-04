# Agentic Cookbook

A structured cookbook of principles, guidelines, recipes, and workflows for AI-assisted multi-platform development. All content is markdown consumed directly by AI agents (Claude Code).

## Quick Start

### 1. Clone the cookbook

```bash
cd ~/projects
git clone git@github.com:agentic-cookbook/cookbook.git
```

### 2. Install in your project

From your project directory, run the onboarding wizard (requires the [dev-team plugin](https://github.com/agentic-cookbook/dev-team)):

```
/install-cookbook
```

This installs `cookbook.md` into your project's `.claude/rules/`, updates your CLAUDE.md, and offers recommended plugins. Everyone gets the full cookbook — no tiers, no partial installs.

## What "Trusted" Means

Code built with the agentic cookbook is **trusted**. That means:

- **Complete** — every state handled, every edge case addressed, every platform considered. Not just the happy path.
- **Precise** — exactly what you asked for. No scope creep, no unrequested refactoring. Design decisions surfaced and approved, not made silently.
- **Consistent** — same patterns, conventions, and style across every file, every session, every platform. Your codebase looks like one person wrote it.
- **Verified** — built, tested, linted, accessibility-audited, logging-checked. Evidence, not hope.
- **Secure by default** — input validation, secure storage, no PII in logs, TLS, consent-first. Not bolted on after a security review.
- **Accessible from day one** — screen readers, keyboard navigation, Dynamic Type, high contrast. Not a follow-up ticket that never gets done.
- **Tested alongside** — tests written with the code, not after. Every function, every edge case, every error path.
- **Predictable** — the LLM follows a known process. You can walk away and come back to work that matches what was planned. No surprises, no tangents.
- **Maintainable** — dependency injection, immutability, separation of concerns, design for deletion. Code that's easy to change and easy to remove.
- **Native** — platform controls and conventions. SwiftUI on Apple, Compose on Android, native APIs everywhere. Not cross-platform lowest-common-denominator.
- **Incremental** — small commits, each tested, each meaningful. Reviewable, revertible, bisectable.
- **Documented** — design decisions recorded, not just in someone's head.
- **Observable** — structured logging so you can see what's happening at runtime.
- **Performant** — not prematurely optimized, but not accidentally O(n²). Work → Right → Fast, with evidence.

## What's in the Cookbook

The cookbook contains three types of **cookbook artifacts** — standalone markdown files with YAML frontmatter, named requirements, and change history:

### Principles (18 files)

*How to think about engineering.* Foundational ideas that guide all technical decisions.

Simplicity, YAGNI, Fail Fast, Dependency Injection, Immutability, Composition over Inheritance, Separation of Concerns, Design for Deletion, Explicit over Implicit, Small Reversible Decisions, Tight Feedback Loops, Manage Complexity Through Boundaries, Least Astonishment, Idempotency, Native Controls, Open Source Preference, Make It Work/Right/Fast, Optimize for Change.

### Guidelines (88 files)

*What rules apply when building.* Organized by topic:

| Topic | Covers |
|-------|--------|
| Testing | Test pyramid, patterns, doubles, mutation testing, security testing |
| Security | Auth, tokens, CORS, privacy, secure storage, input validation |
| UI | Typography, spacing, color, layout, accessibility, progress |
| Accessibility | Screen readers, keyboard nav, Dynamic Type, display options |
| Internationalization | Localization, RTL support |
| Concurrency | Background work, main thread safety |
| Logging | Structured logging, analytics |
| Feature Management | Feature flags, A/B testing, debug mode |
| Code Quality | Linting, atomic commits |

### Recipes (27 files)

*What to build.* Concrete specs for UI components, panels, windows, infrastructure patterns, and autonomous dev bots.

| Category | Path | Examples |
|----------|------|---------|
| UI Components | `recipes/ui/component/` | Empty state, status bar, metadata line |
| Panels | `recipes/ui/panel/` | File browser, editor, terminal, inspector |
| Windows | `recipes/ui/window/` | Project, workspace, settings |
| Infrastructure | `recipes/infrastructure/` | Logging, persistence, sync |
| App | `recipes/app/` | Lifecycle, menus |
| Autonomous Dev Bots | `recipes/autonomous-dev-bots/` | PR review pipeline, CI verification |

### Compliance (10 categories, 81 checks)

*What to verify.* Curated indexes of guideline-derived checks grouped by concern: Security, User Safety, Performance, Best Practices, Access Patterns, Accessibility, Privacy & Data, Platform Compliance, Reliability, Internationalization.

### Workflows (6 files)

*How to work.* Branching, planning, implementation, verification, review.

## Cookbook Projects

A **cookbook project** (`cookbook-project.json`) is a self-contained, platform-agnostic project definition. It defines *what* an app is — components, resources, and context — as a hierarchical manifest. Generation tools produce native, best-of-class code for any target platform (Swift/SwiftUI, Kotlin, C#/WinUI, etc.).

The manifest is the **single source of truth**. Recipes are forked from the cookbook, customized for the project, and can be contributed back upstream. Resources (localization, icons, app config) are defined in platform-neutral JSON that generates to native formats per platform.

```
my-app-cookbook-project/
├── cookbook-project.json        # the manifest — defines everything
├── app/
│   ├── app.md                  # recipe: app entry point
│   └── document-window/
│       ├── document-window.md  # recipe: main window
│       ├── toolbar/
│       │   └── toolbar.md      # recipe: formatting toolbar
│       └── editor/
│           └── editor.md       # recipe: rich text editor
├── resources/
│   └── app-config.json         # generates to Info.plist, AndroidManifest, etc.
└── context/
    ├── decisions/              # architectural decisions
    └── research/               # design research and evaluations
```

See `reference/cookbook-project.schema.json` for the JSON Schema. A complete example lives at `reference/examples/my-document-editor-cookbook-project/`.

## Sibling Projects

### dev-team

Multi-agent development system, distributed as a Claude Code plugin. Orchestrates teams of specialist agents (13 domain experts + 6 platform experts) for product discovery, code generation, and linting.

All user-facing cookbook skills are provided by dev-team:

| Skill | Purpose |
|-------|---------|
| `/install-cookbook` | Onboarding — set up CLAUDE.md and install rules |
| `/configure-cookbook` | Manage preferences (recipe prompts, contribution prompts, optional rules) |
| `/plan-cookbook-recipe` | Interactive recipe design |
| `/contribute-to-cookbook` | Create a PR to the cookbook |
| `/validate-cookbook` | Validate cookbook integrity — frontmatter, references, indexes, placement |
| `/cookbook-help` | Interactive guide — setup status, content overview, troubleshooting |
| `/dev-team lint` | Lint artifacts against cookbook standards |

Repo: [agentic-cookbook/dev-team](https://github.com/agentic-cookbook/dev-team)

### cookbook-web

Cloudflare Workers web app for browsing the cookbook. React 19, TypeScript, Tailwind CSS 4. Serves as the public-facing website.

Repo: [agentic-cookbook/cookbook-web](https://github.com/agentic-cookbook/cookbook-web)

## Repository Structure

```
introduction/          # getting started, conventions, glossary
principles/            # 18 engineering principles
guidelines/            # 88 topic-organized guidelines
recipes/               # 27 UI and infrastructure recipes
compliance/            # 10 compliance categories (81 checks)
workflows/             # 6 workflow specs (plan, implement, verify, review)
reference/             # external best-practices links, schemas, examples
appendix/              # research materials
index.md               # table of contents
README.md              # this file
```

## Contributing

To contribute recipes, use `/contribute-to-cookbook` (via the [dev-team plugin](https://github.com/agentic-cookbook/dev-team)) — it handles both admin (push access) and external (fork-based) workflows automatically.

## License

MIT
