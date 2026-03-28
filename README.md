# Agentic Cookbook

A structured cookbook of principles, guidelines, recipes, and workflows for AI-assisted multi-platform development. All content is markdown consumed directly by AI agents (Claude Code).

## Quick Start

### 1. Clone the cookbook

```bash
cd ~/projects
git clone git@github.com:mikefullerton/agentic-cookbook.git
```

### 2. Install in your project

From your project directory, run the onboarding wizard:

```
/import-cookbook
```

The wizard asks your participation tier and sets up rules and CLAUDE.md automatically.

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

### 3. Choose your tier

| Tier | What you get |
|------|-------------|
| 1 | All 14 points of trust above — enforced through guidelines, checklists, and verification. The LLM follows a structured process instead of winging it. |
| 2 | Tier 1, plus — when a recipe exists for what you're building, you get a pre-designed, battle-tested spec. Every state, edge case, platform variant, and accessibility requirement already thought through. |
| 3 | Tier 2, plus — you contribute your patterns back to the cookbook. The recipes get better for everyone. |

Each tier is additive. Change your tier anytime with `/configure-cookbook`.

## What's in the Cookbook

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

*What to build.* Concrete specs for UI components, panels, windows, and infrastructure patterns.

| Category | Path | Examples |
|----------|------|---------|
| UI Components | `cookbook/recipes/ui/component/` | Empty state, status bar, metadata line |
| Panels | `cookbook/recipes/ui/panel/` | File browser, editor, terminal, inspector |
| Windows | `cookbook/recipes/ui/window/` | Project, workspace, settings |
| Infrastructure | `cookbook/recipes/infrastructure/` | Logging, persistence, sync |
| App | `cookbook/recipes/app/` | Lifecycle, menus |

### Workflows (6 files)

*How to work.* Branching, planning, implementation, verification, review.

## Skills

| Skill | Tier | Purpose |
|-------|------|---------|
| `/import-cookbook` | — | Onboarding — set up CLAUDE.md and run configure |
| `/configure-cookbook` | — | Select/change participation tier, install rules |
| `/lint-with-cookbook` | 2+ | Lint implementation against guidelines or a specific recipe |
| `/lint-rule` | — | Lint a rule file against best practices |
| `/lint-skill` | — | Lint a skill against best practices |
| `/lint-agent` | — | Lint an agent against best practices |
| `/plan-cookbook-recipe` | 4 | Interactive recipe design |
| `/contribute-to-cookbook` | 4 | Create a PR to the cookbook |
| `/validate-cookbook` | — | Validate cookbook integrity — frontmatter, references, indexes, placement |
| `/cookbook-help` | — | Interactive guide — setup status, content overview, troubleshooting |

## Rules

Terse, imperative markdown files that enforce cookbook content during planning and implementation. Each tier has a corresponding rule file that the onboarding wizard installs into your project's `.claude/rules/`.

| Rule | Tier | Enforces |
|------|------|----------|
| `PRINCIPLES-RULE.md` | 1 | Read and apply all 18 principles, three-phase discipline |
| `GUIDELINE-CONSUMER-RULE.md` | 1 | Guideline checklist, opt-in/opt-out, verification |
| `RECIPE-CONSUMER-RULE.md` | 2 | Recipe search, conformance matrix, opportunity flagging |
| `CONTRIBUTOR-RULE.md` | 3 | Recipe creation, PR workflow, pre-submission checks |
| `COMMITTING-RULE.md` | opt-in | Structured git workflow (worktree, draft PR, merge) |
| `SKILL-AUTHORING-RULE.md` | meta | Check inventory before creating skills, prevent duplicates |
| `SKILL-VERSIONING-RULE.md` | meta | Version conventions for skills |

## Repository Structure

```
cookbook/               # the content
  principles/          # 18 engineering principles
  guidelines/          # 88 topic-organized guidelines
  recipes/             # 27 UI and infrastructure recipes
  workflow/            # 6 workflow specs (plan, implement, verify, review)
  reference/           # external best-practices links
  conventions.md       # full format reference
  index.md             # table of contents

rules/                 # terse LLM-optimized rules for .claude/ drop-in
  PRINCIPLES-RULE.md
  GUIDELINE-CONSUMER-RULE.md
  RECIPE-CONSUMER-RULE.md
  CONTRIBUTOR-RULE.md
  COMMITTING-RULE.md
  SKILL-AUTHORING-RULE.md
  SKILL-VERSIONING-RULE.md
  conventions.md

.claude/skills/        # Claude Code skills
  import-cookbook/
  configure-cookbook/
  lint-with-cookbook/
  lint-rule/
  lint-skill/
  lint-agent/
  plan-cookbook-recipe/
  contribute-to-cookbook/
  validate-cookbook/
  cookbook-help/

contributing/          # how to contribute (AUTHORING.md)
decisions/             # design decision records
```

## Contributing

See `contributing/AUTHORING.md` for content authoring guidelines.

To contribute recipes programmatically, install at Tier 3 and use `/contribute-to-cookbook`.

## License

MIT
