---
name: configure-cookbook
version: "2.0.0"
description: "Manage agentic cookbook preferences — recipe prompts, contribution prompts, optional rules. Re-enable prompts the user previously disabled."
argument-hint: "[--version]"
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(rm *), Bash(ls *), Bash(mkdir *), AskUserQuestion
---

# Configure Agentic Cookbook v2.0.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `configure-cookbook v2.0.0` and stop — do not run the skill.

Otherwise, print `configure-cookbook v2.0.0` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (2.0.0), print:

> ⚠ This skill is running v2.0.0 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Overview

Manage your cookbook preferences and optional rules. This skill replaces the old tier selection — the full cookbook is always installed. Use this to:

- Re-enable recipe or contribution prompts you previously disabled
- Install or remove optional rules (committing rule, auto-lint rule)
- Verify your cookbook installation is up to date
- Migrate from the old tier system to the single cookbook.md

## Usage

```
/configure-cookbook
```

## Step 1: Detect Current State

Check the current project for:

1. **Rule file**: Is `cookbook.md` present in `.claude/rules/`?
2. **Legacy tier files**: Are any old tier files present (`PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md`, `RECIPE-CONSUMER-RULE.md`, `CONTRIBUTOR-RULE.md`)?
3. **Optional rules**: Is `committing.md` installed? Is `auto-lint.md` installed?
4. **Preferences**: Read `.claude/cookbook-preferences.json` if it exists.

Print the current state:

```
=== Cookbook Status ===
Rule: cookbook.md — installed / not installed / legacy tier files detected
Recipe prompts: enabled / disabled
Contribution prompts: enabled / disabled
Committing rule: installed / not installed
Auto-lint rule: installed / not installed
```

**If legacy tier files detected**: print a migration notice and proceed to Step 2 (migration).

**If cookbook.md is not installed and no legacy files exist**: print "Cookbook not installed. Run /import-cookbook first." and stop.

## Step 2: Migration (if needed)

If old tier rule files are detected:

```
Legacy tier files detected. The cookbook no longer uses tiers — everyone gets the full cookbook.
I'll replace the old rule files with the single cookbook.md.
```

Remove old tier files:
- `.claude/rules/PRINCIPLES-RULE.md`
- `.claude/rules/GUIDELINE-CONSUMER-RULE.md`
- `.claude/rules/RECIPE-CONSUMER-RULE.md`
- `.claude/rules/CONTRIBUTOR-RULE.md`
- `.claude/rules/skill-versioning.md` (if installed as part of old tier 3)

Copy `cookbook.md` from `../agentic-cookbook/rules/`.

Print: `Migration complete — old tier files replaced with cookbook.md.`

## Step 3: Preferences

Present current preferences and ask if the user wants to change them:

```
=== Cookbook Preferences ===

1. Recipe prompts: [enabled/disabled]
   During planning, ask if you want to see matching recipes.

2. Contribution prompts: [enabled/disabled]
   After implementation, ask if you want to contribute reusable patterns.

Change any? (enter numbers to toggle, or "done" to skip)
```

For each toggled preference, update `.claude/cookbook-preferences.json`:

```json
{
  "show_recipe_prompts": true,
  "show_contribution_prompts": true
}
```

If the file doesn't exist, create it with defaults (both `true`).

## Step 4: Optional Rules

### Committing Rule

Check whether `committing.md` is currently installed.

**If not installed**, ask:

```
Optional: Install a structured git workflow rule?
- All Claude Code work happens in a git worktree (never directly on main)
- A draft PR is created before any code is written
- Every change is committed, pushed, and documented in the PR

This is independent of the cookbook. Install? (y/n)
```

If yes, copy from `../agentic-cookbook/rules/`.

**If already installed**, ask: `Keep the committing rule? (y/n)`

If no, remove `.claude/rules/committing.md`.

### Auto-Lint Rule

Check whether `auto-lint.md` is currently installed.

**If not installed**, ask:

```
Optional: Install an auto-lint rule?
- Automatically lints any skill, agent, or rule file you create or modify
- FAIL items must be fixed before the work is complete

This is independent of the cookbook. Install? (y/n)
```

If yes, copy from `../agentic-cookbook/rules/`.

**If already installed**, ask: `Keep the auto-lint rule? (y/n)`

If no, remove `.claude/rules/auto-lint.md`.

## Step 5: Update Rule File

Check if the installed `cookbook.md` matches the latest version in `../agentic-cookbook/rules/cookbook.md`. Compare file contents. If they differ, ask:

```
A newer version of cookbook.md is available. Update? (y/n)
```

If yes, copy the updated file.

## Step 6: Update CLAUDE.md

If `CLAUDE.md` has an old `## Agentic Cookbook` section with tier references, update it to the new format:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookbook).

- **Cookbook path**: `../agentic-cookbook/`
- **Rule**: `cookbook.md`
- **Preferences**: Recipe prompts [enabled/disabled], contribution prompts [enabled/disabled]
- **Optional rules**: <list installed optional rules, or "none">
- **Available skills**: /configure-cookbook, /import-cookbook, /lint-with-cookbook, /plan-cookbook-recipe, /contribute-to-cookbook
```

## Step 7: Print Summary

```
=== Cookbook Configuration ===
Rule: cookbook.md (up to date / updated)
Recipe prompts: enabled / disabled
Contribution prompts: enabled / disabled
Committing rule: installed / not installed / unchanged
Auto-lint rule: installed / not installed / unchanged
CLAUDE.md: updated / unchanged
```

## Guards

- **Do not modify any files in `../agentic-cookbook/`.** Only read/copy from it.
- **Verify `../agentic-cookbook/` exists** before copying files.
- **Do not remove cookbook.md.** It is always required.
