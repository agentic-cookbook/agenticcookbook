# Agentic Cookbook

A structured cookbook of principles, guidelines, recipes, and workflows for AI-assisted multi-platform development. All content is markdown consumed directly by AI agents.

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
.claude/skills/        # 7 Claude Code skills
contributing/          # how to contribute (AUTHORING.md)
decisions/             # design decision records
```

## Conventions

Read `cookbook/conventions.md` for the full format reference. Terse version at `rules/conventions.md`.

Key rules:
- All `.md` files have YAML frontmatter (id, title, domain, type, version, status, language, created, modified, author, copyright, license, summary, platforms, tags, depends-on, related, references)
- Path-derived domain identifiers: `cookbook/guidelines/testing/test-pyramid.md` → `cookbook.guidelines.testing.test-pyramid`
- Version is semver, immutable once on main
- MIT license on all files
- Cross-reference by domain in backticks: `cookbook.guidelines.testing.test-pyramid`

## Participation Tiers

Consuming projects choose a tier. Each is additive.

| Tier | Name | Rule file | What it adds |
|------|------|-----------|-------------|
| 1 | Principles | `rules/PRINCIPLES-RULE.md` | 18 principles guide planning and coding |
| 2 | Guidelines | `rules/GUIDELINE-CONSUMER-RULE.md` | + Guideline checklist, verification workflow |
| 3 | Recipes | `rules/RECIPE-CONSUMER-RULE.md` | + Recipe search, conformance, opportunity flagging |
| 4 | Contributor | `rules/CONTRIBUTOR-RULE.md` | + Create/enhance recipes, PR workflow |

Onboard: `/import-agentic-cookbook` from the consuming project. Change tier: `/configure-agentic-cookbook`.

## Skills

| Skill | Tier | Purpose |
|-------|------|---------|
| `/import-agentic-cookbook` | — | Onboarding — set up CLAUDE.md and run configure |
| `/configure-agentic-cookbook` | — | Select/change participation tier, install rules |
| `/review-with-agentic-cookbook-guidelines` | 2+ | Review implementation against guidelines |
| `/review-with-agentic-cookbook-recipe` | 3+ | Review implementation against a specific recipe |
| `/lint-rule` | — | Lint a rule file against best practices |
| `/lint-skill` | — | Lint a skill against best practices |
| `/lint-agent` | — | Lint an agent against best practices |
| `/plan-agentic-cookbook-recipe` | 4 | Interactive recipe design |
| `/contribute-to-agentic-cookbook` | 4 | Create a PR to the cookbook |

Skills use a `version` field in frontmatter (project convention, not a Claude Code runtime field). See `rules/SKILL-VERSIONING-RULE.md` for the versioning protocol.

## Git Workflow

**Owner edits** go direct to main. **Claude Code sessions** go through a branch + PR via worktree.

| Change type | Branch pattern | Example |
|---|---|---|
| New content | `feature/<description>` | `feature/auth-guidelines` |
| Content revision | `revise/<description>` | `revise/testing-guidelines` |

### Worktree flow

1. `git worktree add ../agentic-cookbook-wt/<branch-name> -b <branch>`
2. Do all work in the worktree
3. Update `cookbook/index.md` if adding new content
4. Commit, push, create PR with `gh pr create`
5. Squash merge: `gh pr merge --squash`
6. Clean up: `git worktree remove ../agentic-cookbook-wt/<branch-name>`
7. Pull main: `git pull`

## Writing New Content

Use `cookbook/recipes/_template.md` as a starting point for recipes. Follow `cookbook/conventions.md` for the frontmatter format. Every file needs a UUID, domain matching its path, and a Change History section. See `contributing/AUTHORING.md` for full guidance.
