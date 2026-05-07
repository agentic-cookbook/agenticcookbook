# Agentic Cookbook

## Project Summary
Structured knowledge base of principles, guidelines, ingredients, recipes, and workflows for AI-assisted multi-platform development. All content is markdown with YAML frontmatter, consumed directly by Claude Code agents.

## Type & Tech Stack
- **Type:** Content repository (no runtime; optional TypeScript/Vitest test harness in `.claude/tests/`)
- **Language:** Markdown (YAML frontmatter), Python (utility scripts), TypeScript (test harness)
- **Frameworks:** None (content-only); Vitest 3 for skill tests
- **Deployment:** None (content consumed by agents and synced to `agenticcookbookweb`)

## GitHub URL
`git@github.com:agentic-cookbook/agenticcookbook.git`

## Directory Structure
```
├── .claude/
│   ├── rules/             # after-adding-an-artifact, always-use-worktrees-and-prs, artifact-formatting
│   ├── skills/            # add-artifact, approve-artifact, create-artifact, install-cookbook-global, lint-artifact, repair-cookbook, update-website
│   ├── CLAUDE.md
│   └── settings.json
├── appendix/              # contributing/, decisions/, research/
├── compliance/            # 10 categories (security, accessibility, etc.), artifact-formatting/
├── docs/feedback/, docs/project/, docs/superpowers/plans/, docs/superpowers/specs/
├── guidelines/            # cookbook/, implementing/, planning/, reviewing/, shipping/, testing/
├── ingredients/           # developer-tools/, infrastructure/, ui/, web/
├── introduction/          # conventions.md, glossary.md, trigger-guide.md, top-10-guidelines.md
├── principles/            # 21 .md files
├── recipes/               # app/, autonomous-dev-bots/, developer-tools/, infrastructure/, ui/, web/
├── reference/             # best-practices/, examples/, schemas
├── scripts/               # Python: generate-trigger-index, recategorize-guidelines, etc.
├── workflows/             # 6 .md files
├── index.md
└── README.md
```

## Key Files & Components
- `principles/` — 21 engineering principles (simplicity, YAGNI, fail-fast, DRY, SRP, optimize-for-change, etc.)
- `guidelines/` — 142 unique guidelines organized by use case (planning/implementing/testing/reviewing/shipping/cookbook); trigger-tagged for agent filtering
- `introduction/trigger-guide.md` — 28 canonical triggers mapping activities → guideline paths; escalating checkpoint pattern
- `index/triggers.yaml` (generated) — flat trigger→guideline-paths lookup for agent queries
- `scripts/generate-trigger-index.py` — walks guideline frontmatter, builds triggers.yaml
- `.claude/skills/lint-artifact/SKILL.md` — validates artifact structure/frontmatter against compliance specs
- `.claude/skills/approve-artifact/SKILL.md` — runs lint, stamps `approved-by`/`approved-date`
- `.claude/skills/repair-cookbook/SKILL.md` — scans for broken cross-references, dead index links, structural issues; parallel agents, batch fix flow
- `compliance/artifact-formatting/` — per-type formatting specs (principle, guideline, recipe, cookbook)

## Claude Configuration
- **Rules:** `after-adding-an-artifact.md` (lint→approve→update indexes→sync website after every change), `always-use-worktrees-and-prs.md` (worktree + draft PR workflow), `artifact-formatting.md` (read compliance spec before writing any artifact)
- **Skills:** `add-artifact`, `approve-artifact`, `create-artifact`, `install-cookbook-global`, `lint-artifact`, `repair-cookbook`, `update-website`
- `settings.json`: broad Bash permission allowlist; graphify PreToolUse hook

## Planning & Research Documents
- `docs/superpowers/plans/2026-04-04-skill-test-harness.md` — Vitest harness in `.claude/tests/` testing all 7 skills via `claude -p`; sandbox in `/tmp/`
- `docs/superpowers/plans/2026-04-09-trigger-based-filtering.md` — add `triggers` frontmatter field to all 141 guidelines; generate `index/triggers.yaml`; new AI/ML guidelines; top-10 shortlist
- `docs/feedback/cookbook-review-2026-04-08.md` — post-build feedback: principles caught 6 real issues; proposes trigger tags, top-10 shortlist, AI/ML observability and cost management guidelines
- `docs/superpowers/specs/2026-04-06-rename-concoction-to-cookbook-design.md` — design spec for renaming "concoction" → "project cookbook" (completed)

## Git History & Current State
- **Branch:** main
- **Last commit:** `709f067` 2026-04-21 — add DRY and SRP principles (#46)
- **Status:** Active content development; no commits since April 2026
- **Notable milestones:** trigger-based filtering system (#45, bfdc296), 12 codebase-decomposition guidelines (c27e4d8), concoction→cookbook rename (c27e4d8 area)

## Build & Test Commands
```bash
# Skill tests (if harness is set up)
cd .claude/tests && npm test           # vitest run
cd .claude/tests && npm run test:e2e   # longer timeout config

# Trigger index regeneration
python3 scripts/generate-trigger-index.py

# Sync to agenticcookbookweb
/update-website   # Claude Code skill
```

## Notes
No runtime build. The trigger-based filtering system (`index/triggers.yaml`) is the primary agent-access mechanism — check whether it's been fully populated across all 141+ guidelines. The `.claude/tests/` harness may not be fully implemented (plan exists but last commit predates completion confirmation).
