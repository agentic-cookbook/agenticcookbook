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

### 3. Choose your tier

| Tier | Name | What you get |
|------|------|-------------|
| 1 | **Principles** | 18 engineering principles guide planning and coding |
| 2 | **Guidelines** | + Full guideline checklist, verification workflow |
| 3 | **Recipes** | + Recipe search, conformance, opportunity flagging |
| 4 | **Contributor** | + Create/enhance recipes, PR workflow to the cookbook |

Each tier is additive — tier 3 includes everything from tiers 1 and 2. Change your tier anytime with `/configure-cookbook`.

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

## Rules

Terse, imperative markdown files that enforce cookbook content during planning and implementation. Each tier has a corresponding rule file that the onboarding wizard installs into your project's `.claude/rules/`.

| Rule | Tier | Enforces |
|------|------|----------|
| `PRINCIPLES-RULE.md` | 1 | Read and apply all 18 principles, three-phase discipline |
| `GUIDELINE-CONSUMER-RULE.md` | 2 | Guideline checklist, opt-in/opt-out, verification |
| `RECIPE-CONSUMER-RULE.md` | 3 | Recipe search, conformance matrix, opportunity flagging |
| `CONTRIBUTOR-RULE.md` | 4 | Recipe creation, PR workflow, pre-submission checks |
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

contributing/          # how to contribute (AUTHORING.md)
decisions/             # design decision records
```

## Contributing

See `contributing/AUTHORING.md` for content authoring guidelines.

To contribute recipes programmatically, install at Tier 4 and use `/contribute-to-cookbook`.

## License

MIT
