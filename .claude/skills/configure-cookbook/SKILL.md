---
name: configure-cookbook
version: "3.0.0"
description: "Manage agentic cookbook preferences and regenerate the project-specific rule file. Re-enable prompts, toggle committing workflow."
argument-hint: "[--version]"
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(rm *), Bash(ls *), Bash(mkdir *), Bash(wc *), Bash(date *), AskUserQuestion
---

# Configure Agentic Cookbook v3.0.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `configure-cookbook v3.0.0` and stop — do not run the skill.

Otherwise, print `configure-cookbook v3.0.0` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (3.0.0), print:

> ⚠ This skill is running v3.0.0 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Overview

Manage your cookbook preferences and regenerate the project-specific rule file. Use this to:

- Re-enable recipe or contribution prompts you previously disabled
- Add or remove the committing workflow
- Regenerate the rule file after cookbook updates or preference changes
- Migrate from the old static-copy installation to the generated rule

## Usage

```
/configure-cookbook
```

## Step 1: Detect Current State

Check the current project for:

1. **Generated rule**: Is `cookbook.md` in `.claude/rules/`?
2. **Manifest**: Does `.claude/cookbook-manifest.json` exist? Read it for current generation state.
3. **Legacy files**: Are any old files present? (`authoring-ground-rules.md`, `auto-lint.md`, `PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md`, `RECIPE-CONSUMER-RULE.md`, `CONTRIBUTOR-RULE.md`, `skill-versioning.md`)
4. **Preferences**: Read `.claude/cookbook-preferences.json` if it exists.
5. **Project analysis**: Does `.claude/skills/` or `.claude/agents/` exist?

Print the current state:

```
=== Cookbook Status ===
Rule: cookbook.md — generated (<N> lines) / not installed / legacy static files detected
Generated: <timestamp from manifest> / no manifest
Sections: <included list from manifest>
Recipe prompts: enabled / disabled
Contribution prompts: enabled / disabled
Committing workflow: included / not included
Auto-lint: included / not included (no .claude/skills/ or .claude/agents/ detected)
```

**If legacy static files detected**: print a migration notice and proceed to Step 2.

**If cookbook.md is not installed and no legacy files exist**: print "Cookbook not installed. Run /import-cookbook first." and stop.

## Step 2: Migration (if needed)

If old static rule files or tier files are detected:

```
Legacy installation detected. The cookbook now generates one optimized rule file per project.
I'll remove old files and regenerate.
```

Remove old files (only those that exist):
- `.claude/rules/authoring-ground-rules.md`
- `.claude/rules/auto-lint.md`
- `.claude/rules/PRINCIPLES-RULE.md`
- `.claude/rules/GUIDELINE-CONSUMER-RULE.md`
- `.claude/rules/RECIPE-CONSUMER-RULE.md`
- `.claude/rules/CONTRIBUTOR-RULE.md`
- `.claude/rules/skill-versioning.md`
- `.claude/rules/committing.md` (will be folded into generated rule if opted in)

Print which files were removed, then proceed to Step 3.

## Step 3: Preferences

Present current preferences and ask if the user wants to change them:

```
=== Cookbook Preferences ===

1. Recipe prompts: [enabled/disabled]
   During planning, search for matching recipes and ask if you want to see them.

2. Contribution prompts: [enabled/disabled]
   After implementation, ask if you want to contribute reusable patterns.

3. Committing workflow: [included/not included]
   Structured git workflow: worktrees, draft PRs, incremental commits.

Change any? (enter numbers to toggle, or "done" to skip)
```

Record all changes.

## Step 4: Regenerate Rule File

If any preferences changed, or if migrating from legacy, or if the cookbook source has been updated since the last generation (compare `../agentic-cookbook/rules/generated-cookbook-template.md` modification time against the manifest timestamp):

1. Read the template at `../agentic-cookbook/rules/generated-cookbook-template.md`
2. Read the 18 principle files from `../agentic-cookbook/cookbook/principles/` — extract only content (strip frontmatter)
3. Analyze the project: does `.claude/skills/` or `.claude/agents/` exist?
4. Generate `.claude/rules/cookbook.md` with:
   - Ground rules preamble (always)
   - 18-row principles table (always)
   - Planning pipeline (always)
   - Recipe search (if `show_recipe_prompts` is not `false`)
   - Implementation pipeline (always)
   - Committing workflow (if opted in)
   - Verification (always)
   - Auto-lint (if project has Claude extensions)
   - Contribution prompts (if `show_contribution_prompts` is not `false`)
   - Deduplicated MUST NOT section (always)
   - Reference table (always)
5. Count lines and bytes with `wc -l -c .claude/rules/cookbook.md`

If no changes are needed, print: `Rule file is up to date. No regeneration needed.`

## Step 5: Update Manifest and Preferences

Write `.claude/cookbook-manifest.json` with current state:

```json
{
  "generated": "<ISO 8601 timestamp>",
  "generator_version": "3.0.0",
  "source_cookbook": "../agentic-cookbook",
  "sections_included": [...],
  "sections_excluded": [...],
  "preferences": {
    "show_recipe_prompts": true/false,
    "show_contribution_prompts": true/false,
    "committing_workflow": true/false
  }
}
```

Write `.claude/cookbook-preferences.json` with the user's current preferences.

## Step 6: Update CLAUDE.md

If `CLAUDE.md` has an `## Agentic Cookbook` section, update it:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookbook).

- **Cookbook path**: `../agentic-cookbook/`
- **Rule**: `cookbook.md` (generated, project-specific)
- **Preferences**: Recipe prompts [enabled/disabled], contribution prompts [enabled/disabled], committing [included/not included]
- **Available skills**: /configure-cookbook, /import-cookbook, /lint-with-cookbook, /plan-cookbook-recipe, /contribute-to-cookbook

Run `/configure-cookbook` to manage preferences and regenerate the rule file.
```

## Step 7: Print Summary

```
=== Cookbook Configuration ===
Rule: cookbook.md (<N> lines, <B> bytes) — regenerated / unchanged
Recipe prompts: enabled / disabled — changed / unchanged
Contribution prompts: enabled / disabled — changed / unchanged
Committing workflow: included / not included — changed / unchanged
Auto-lint: included / not included
Legacy files removed: <list or "none">
CLAUDE.md: updated / unchanged
```

## Guards

- **Do not modify any files in `../agentic-cookbook/`.** Only read from it.
- **Verify `../agentic-cookbook/` exists** before reading source files.
- **Do not remove cookbook.md.** Regenerate it, never delete it.
- **Generated rule must be under 120 lines.** If it exceeds this, review for unnecessary content.
