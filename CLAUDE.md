# Agentic Cookbook

A structured cookbook of principles, guidelines, recipes, and workflows for AI-assisted multi-platform development. All content is markdown consumed directly by AI agents.

## Repository Structure

```
cookbook/           # the content (principles, guidelines, recipes, workflow, conventions, reference)
contributing/      # how to contribute (AUTHORING.md)
cooking/           # getting started, quickstart, tools (future)
decisions/         # design decision records
rules/             # terse LLM-optimized rules for .claude/ drop-in
site/              # React reference website (future)
```

## Conventions

Read `cookbook/conventions.md` for the full format reference. Terse version at `rules/conventions.md`.

Key rules:
- All `.md` files have YAML frontmatter (id, title, domain, type, version, status, language, created, modified, author, copyright, license, summary, platforms, tags, depends-on, related, references)
- Path-derived domain identifiers: `cookbook/guidelines/testing/test-pyramid.md` → `cookbook.guidelines.testing.test-pyramid`
- Version is semver, immutable once on main
- MIT license on all files
- Cross-reference by domain in backticks: `cookbook.guidelines.testing.test-pyramid`

## Cookbook Sections

| Section | Path | Description |
|---------|------|-------------|
| Principles | `cookbook/principles/` | How to think about engineering (18 files) |
| Guidelines | `cookbook/guidelines/` | What rules apply, organized by topic (88 files) |
| Recipes | `cookbook/recipes/` | What to build — UI components, panels, windows, patterns (27 files) |
| Workflow | `cookbook/workflow/` | How to work — branching, planning, implementation, review (8 files) |
| Reference | `cookbook/reference/` | External best-practices links (10 files) |

Landing page: `cookbook/index.md`

## Git Workflow

**Owner edits** go direct to main. **Claude Code sessions** go through a branch + PR via worktree.

### Branch naming

| Change type | Branch pattern | Example |
|---|---|---|
| New content | `feature/<description>` | `feature/auth-guidelines` |
| Content revision | `revise/<description>` | `revise/testing-guidelines` |
| Site work | `site/<description>` | `site/search-component` |

### Worktree flow

1. `git worktree add ../agentic-cookbook-wt/<branch-name> -b <branch>`
2. Do all work in the worktree
3. Update `cookbook/index.md` if adding new content
4. Commit, push, create PR with `gh pr create`
5. Squash merge: `gh pr merge --squash`
6. Clean up: `git worktree remove ../agentic-cookbook-wt/<branch-name>`
7. Pull main: `git pull`

## How to Use This Repo

### In consuming projects

Add to your project's `CLAUDE.md`:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookboox) repo.

- **Expected path**: `../agentic-cookbook/`
- Before reading any cookbook content, verify the path exists.
- Read `cookbook/index.md` for the full table of contents.
- When implementing a feature, check for existing recipes and guidelines.
- Follow `rules/conventions.md` for file format rules.
```

### Implementing from a recipe

1. Read the recipe file in `cookbook/recipes/`
2. Implement using the project's native UI framework
3. Follow the recipe's values, behavior, and states exactly
4. Check `cookbook/guidelines/` for applicable topic guidelines (testing, accessibility, etc.)

### Writing new content

Use `cookbook/recipes/_template.md` as a starting point for recipes. Follow `cookbook/conventions.md` for the frontmatter format. Every file needs a UUID, domain matching its path, and a Change History section.
