# Agentic Cookbook

A structured cookbook of principles, guidelines, recipes, and workflows for AI-assisted multi-platform development. All content is markdown consumed directly by AI agents.

## Repository Structure

```
introduction/          # getting started, conventions, glossary
principles/            # 18 engineering principles
guidelines/            # 88 topic-organized guidelines
ingredients/           # atomic component specs (building blocks)
recipes/               # compositions of ingredients into features
compliance/            # 10 compliance categories (81 checks)
workflows/             # 6 workflow specs (plan, implement, verify, review)
reference/             # external best-practices links, schemas, examples
appendix/              # research materials
index.md               # table of contents
README.md              # human-facing documentation
.claude/
  CLAUDE.md            # this file
  rules/               # repo-specific rules
  skills/              # repo-specific skills
```

## Cookbook Artifacts

A **cookbook artifact** is any content item in the cookbook: a principle, guideline, ingredient, or recipe. Each artifact is a standalone markdown file with YAML frontmatter, named requirements, and a change history. See `introduction/glossary.md` for the full definition.

| Type | Count | Path | Description |
|------|-------|------|-------------|
| Principle | 18 | `principles/` | Foundational engineering ideas that guide design decisions |
| Guideline | 142 (234 with duplicates) | `guidelines/` | Use-case-organized rules: planning, implementing, testing, reviewing, shipping, cookbook |
| Ingredient | 18 | `ingredients/` | Atomic component specs — the building blocks of recipes |
| Recipe | 11 | `recipes/` | Compositions of configured ingredients into coherent features |

A **cookbook** (`cookbook.json`) assembles recipes and ingredients into a complete application, plugin, or widget. See `reference/cookbook.schema.json` for the JSON Schema.

Supporting content (not artifacts): compliance checks, workflows, reference material.

## Sibling Projects

### dev-team

Multi-agent development system, distributed as a Claude Code plugin. Orchestrates teams of specialist agents (13 domain + 6 platform) for product discovery, code generation, and linting. All user-facing cookbook skills live here: `/install-cookbook`, `/configure-cookbook`, `/contribute-to-cookbook`, `/validate-cookbook`, `/cookbook-help`, `/dev-team lint`, and others.

Repo: [agentic-cookbook/dev-team](https://github.com/agentic-cookbook/dev-team)

### cookbook-web

Cloudflare Workers web app for browsing the cookbook. React 19, TypeScript, Tailwind CSS 4. Serves as the public-facing website for the cookbook.

Repo: [agentic-cookbook/cookbook-web](https://github.com/agentic-cookbook/cookbook-web)

## Conventions

Read `introduction/conventions.md` for the full format reference. See `introduction/glossary.md` for term definitions.

Key rules:
- All `.md` files have YAML frontmatter (id, title, domain, type, version, status, language, created, modified, author, copyright, license, summary, platforms, tags, depends-on, related, references)
- URL-based domain identifiers: `agentic-cookbook://guidelines/testing/test-pyramid`
- Fragment references for within-document sections: `#requirements/ordered-list`
- Named requirements (kebab-case, not REQ-NNN): `**ordered-list**: The control MUST...`
- Version is semver, immutable once on main
- MIT license on all files
- Cross-reference with full URL or short-form `#fragment`

## Git Workflow

**Owner edits** go direct to main. **Claude Code sessions** go through a branch + PR via worktree.

| Change type | Branch pattern | Example |
|---|---|---|
| New content | `feature/<description>` | `feature/auth-guidelines` |
| Content revision | `revise/<description>` | `revise/testing-guidelines` |

### Worktree flow

1. Create a worktree with `EnterWorktree` (Claude Code) or `git worktree add <path> -b <branch>`
2. Do all work in the worktree
3. Update `index.md` if adding new content
4. Commit, push, create PR with `gh pr create`
5. Squash merge: `gh pr merge --squash`
6. Clean up: `ExitWorktree action:remove` (Claude Code) or `git worktree remove <path>`
7. Pull main: `git pull`

**Fork-based contributions**: External contributors who don't have push access use a fork. The workflow is the same (worktree, branch, commit, push, PR), but `origin` points to the fork and the PR targets `agentic-cookbook/cookbook` via `--head <user>:<branch>`. The `/contribute-to-cookbook` skill (in dev-team) detects this automatically.

## Writing New Content

Use `ingredients/_template.md` for new ingredients and `recipes/_template.md` for new recipes. Follow `introduction/conventions.md` for the frontmatter format. Every cookbook artifact needs a UUID, domain matching its path, and a Change History section.

## graphify

This project has a graphify knowledge graph at graphify-out/.

Rules:
- Before answering architecture or codebase questions, read graphify-out/GRAPH_REPORT.md for god nodes and community structure
- If graphify-out/wiki/index.md exists, navigate it instead of reading raw files
- After modifying code files in this session, run `python3 -c "from graphify.watch import _rebuild_code; from pathlib import Path; _rebuild_code(Path('.'))"` to keep the graph current
