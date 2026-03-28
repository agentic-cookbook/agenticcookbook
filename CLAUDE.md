# Agentic Cookbook

A structured cookbook of principles, guidelines, recipes, and workflows for AI-assisted multi-platform development. All content is markdown consumed directly by AI agents.

## Repository Structure

```
cookbook/               # the content
  principles/          # 18 engineering principles
  guidelines/          # 88 topic-organized guidelines
  recipes/             # 27 UI and infrastructure recipes
  compliance/          # 10 compliance categories (81 checks)
  workflow/            # 6 workflow specs (plan, implement, verify, review)
  reference/           # external best-practices links
  conventions.md       # full format reference
  index.md             # table of contents
rules/                 # terse LLM-optimized rules for .claude/ drop-in
.claude/skills/        # 14 Claude Code skills
contributing/          # how to contribute (AUTHORING.md)
decisions/             # design decision records
```

## Conventions

Read `cookbook/conventions.md` for the full format reference. See `cookbook/glossary.md` for term definitions.

Key rules:
- All `.md` files have YAML frontmatter (id, title, domain, type, version, status, language, created, modified, author, copyright, license, summary, platforms, tags, depends-on, related, references)
- URL-based domain identifiers: `agentic-cookbook://guidelines/testing/test-pyramid`
- Fragment references for within-document sections: `#requirements/ordered-list`
- Named requirements (kebab-case, not REQ-NNN): `**ordered-list**: The control MUST...`
- Version is semver, immutable once on main
- MIT license on all files
- Cross-reference with full URL or short-form `#fragment`

## Using the Cookbook

Consuming projects install a single rule file (`cookbook.md`) that enforces the full cookbook — principles, guidelines, recipes, and contribution prompts. No tiers, no partial installs — everyone gets everything.

Onboard: `/import-cookbook` from the consuming project. Manage preferences: `/configure-cookbook`.

**Optional rules** (independent of the cookbook):
- `committing.md` — structured git workflow for your project
- `auto-lint.md` — auto-lint skills/agents/rules on creation/modification

## Skills

| Skill | Purpose |
|-------|---------|
| `/import-cookbook` | Onboarding — set up CLAUDE.md and install rules |
| `/configure-cookbook` | Manage cookbook preferences (recipe prompts, contribution prompts, optional rules) |
| `/lint-with-cookbook` | Lint implementation against guidelines or a specific recipe |
| `/lint-rule` | Lint a rule file against best practices |
| `/lint-skill` | Lint a skill against best practices |
| `/lint-agent` | Lint an agent against best practices |
| `/plan-cookbook-recipe` | Interactive recipe design |
| `/contribute-to-cookbook` | Create a PR to the cookbook |
| `/validate-cookbook` | Validate cookbook integrity — frontmatter, references, indexes, placement |
| `/cookbook-help` | Interactive guide — setup status, content overview, troubleshooting |
| `/cookbook-bug` | File a bug report against the cookbook (creates GitHub issue) |
| `/cookbook-suggestion` | Suggest new content or improvements (creates GitHub issue) |
| `/lint-compliance` | Evaluate recipe/guideline against compliance checks |

Skills use a `version` field in frontmatter (project convention, not a Claude Code runtime field). See `rules/skill-versioning.md` for the versioning protocol.

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

**Fork-based contributions**: External contributors who don't have push access use a fork. The workflow is the same (worktree, branch, commit, push, PR), but `origin` points to the fork and the PR targets `mikefullerton/agentic-cookbook` via `--head <user>:<branch>`. The `/contribute-to-cookbook` skill detects this automatically.

## Writing New Content

Use `cookbook/recipes/_template.md` as a starting point for recipes. Follow `cookbook/conventions.md` for the frontmatter format. Every file needs a UUID, domain matching its path, and a Change History section. See `contributing/AUTHORING.md` for full guidance.
