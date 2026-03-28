---
name: configure-cookbook
version: "1.8.0"
description: "Change your agentic cookbook participation tier. Upgrade or downgrade between guidelines, recipes, and contributor levels."
argument-hint: "[tier-number] [--version]"
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(rm *), Bash(ls *), Bash(mkdir *), AskUserQuestion
---

# Configure Agentic Cookbook v1.8.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `configure-cookbook v1.8.0` and stop — do not run the skill.

Otherwise, print `configure-cookbook v1.8.0` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (1.8.0), print:

> ⚠ This skill is running v1.8.0 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Usage

```
/configure-cookbook
/configure-cookbook 3
```

Changes your agentic cookbook participation tier. Provide a tier number to skip the prompt, or omit it to choose interactively.

## Step 1: Detect Current Tier

Check `.claude/rules/` in the current project for which rule files are installed:

| Check | Result |
|-------|--------|
| `CONTRIBUTOR-RULE.md` present | Tier 3 — Contributor |
| `RECIPE-CONSUMER-RULE.md` present | Tier 2 — Recipes |
| `GUIDELINE-CONSUMER-RULE.md` present | Tier 1 — Guidelines |
| None of the above | Not installed |

If not installed, this is a first-time configuration. Print: `No existing tier detected — first-time setup.` Set current tier to 0 and proceed to Step 2.

Also check whether `COMMITTING-RULE.md` and `AUTO-LINT-RULE.md` are present.

Print: `Current tier: <N> (<Name>)`, `Committing rule: installed / not installed`, `Auto-lint rule: installed / not installed`

## Step 1b: Committing Rule (Optional — Not Related to Cookbook)

This is a standalone workflow rule for your own project. It has nothing to do with the cookbook or your participation tier.

Check whether the committing rule is currently installed.

**If not installed**, ask:

```
Optional: Install a structured git workflow rule for YOUR project?

This is NOT related to the cookbook — it's a standalone workflow rule that
governs how YOU commit to your own repo:
- All Claude Code work happens in a git worktree (never directly on main)
- A draft PR is created before any code is written
- Every change is committed, pushed, and documented in the PR
- The PR is marked ready when work is complete, then merged

This is entirely optional and independent of your cookbook tier.

Install? (y/n):
```

If yes, copy `COMMITTING-RULE.md` from `../agentic-cookbook/rules/`.

**If already installed**, ask:

```
The structured git workflow rule (COMMITTING-RULE.md) is installed.
This is not related to the cookbook — it governs your own git workflow.

Keep it? (y/n):
```

If no, remove `.claude/rules/COMMITTING-RULE.md`.

## Step 1c: Auto-Lint Rule (Optional — Not Related to Cookbook)

This is a standalone quality rule for your own project. It has nothing to do with the cookbook or your participation tier.

Check whether the auto-lint rule is currently installed.

**If not installed**, ask:

```
Optional: Install an auto-lint rule for YOUR project?

This is NOT related to the cookbook — it's a standalone quality rule that
automatically lints any skill, agent, or rule file you create or modify:
- After creating/modifying a skill → runs /lint-skill
- After creating/modifying an agent → runs /lint-agent
- After creating/modifying a rule → runs /lint-rule
- FAIL items must be fixed before the work is complete

This is entirely optional and independent of your cookbook tier.

Install? (y/n):
```

If yes, copy `AUTO-LINT-RULE.md` from `../agentic-cookbook/rules/`.

**If already installed**, ask:

```
The auto-lint rule (AUTO-LINT-RULE.md) is installed.
This is not related to the cookbook — it governs quality checks on your extensions.

Keep it? (y/n):
```

If no, remove `.claude/rules/AUTO-LINT-RULE.md`.

## Step 2: Ask New Tier

If `$ARGUMENTS` contains a number 1–3, use that as the target tier. If `$ARGUMENTS` is present but not a valid tier number (1–3) or `--version`, print an error: "Invalid tier. Valid options: 1 (Guidelines), 2 (Recipes), 3 (Contributor)" and stop. Otherwise, ask using `AskUserQuestion` with this table:

| Tier | Name | What you get |
|------|------|-------------|
| 1 | Guidelines | All 14 points of trusted code — enforced through principles, guidelines, checklists, and verification |
| 2 | Recipes | Tier 1 + pre-designed, battle-tested specs. Every state, edge case, and platform variant already thought through |
| 3 | Contributor | Tier 2 + contribute your patterns back to the cookbook for everyone |

If the selected tier equals the current tier, print: `Re-applying tier <N> (<Name>) — verifying all rule files are present.` Then proceed to Step 3 normally. This ensures missing or outdated files are repaired.

## Step 3: Apply Changes

**Verify** `../agentic-cookbook/` exists before copying any files. If missing, print an error and stop.

## Permissions

After tier selection but before copying any files, present this prompt:

```
=== Permissions Required ===

This will:
- Create directory .claude/rules/ (if it doesn't exist)
- Copy <N> rule files from ../agentic-cookbook/rules/ to .claude/rules/:
  <list the specific files for the selected tier>
- Edit CLAUDE.md — update the Agentic Cookbook section with tier info

Approve all? (yes / no)
```

If the user says no, stop and ask what they want to change. If yes, proceed without further permission prompts.

**Create the rules directory** if it doesn't exist: `mkdir -p .claude/rules`

**If upgrading** (new tier > current tier, or first-time setup from tier 0): copy the appropriate rule files from `../agentic-cookbook/rules/` into `.claude/rules/`.

| Tier | Rule files (cumulative) |
|------|------------------------|
| 1 | `PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md` |
| 2 | Tier 1 + `RECIPE-CONSUMER-RULE.md` |
| 3 | Tier 2 + `CONTRIBUTOR-RULE.md`, `SKILL-VERSIONING-RULE.md` |

**If downgrading** (new tier < current tier): remove the rule files for tiers above the new tier.

| Downgrading from | Remove |
|-----------------|--------|
| Tier 3 → 2 | `CONTRIBUTOR-RULE.md`, `SKILL-VERSIONING-RULE.md` |
| Tier 2 → 1 | `RECIPE-CONSUMER-RULE.md` |

Track which files were added and removed for the summary.

## Step 4: Update CLAUDE.md

If `CLAUDE.md` does not exist in the project root, create it with a project title heading (`# <Project Name>`) and the cookbook section below. If `CLAUDE.md` exists but has no `## Agentic Cookbook` section, append the section below to the end of the file. If the section already exists, replace it in place.

Replace the tier info, rule list, and available skills to match the new tier. If the committing rule is installed, include it in the rules list with `*(optional — structured git workflow)*`. Use this format:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookbook).

- **Tier**: <N> — <Name>
- **Cookbook path**: `../agentic-cookbook/`
- **Rules installed**: <list of rule files in .claude/rules/>
- **Available skills**: /configure-cookbook, /import-cookbook, /plan-cookbook-recipe
```

For tier 3, also include `/lint-with-cookbook` in available skills.

## Step 5: Verify Changes

Check that the expected rule files exist in `.claude/rules/` for the new tier. Re-read the `CLAUDE.md` `## Agentic Cookbook` section and confirm it shows the correct tier. If any expected file is missing or the CLAUDE.md section is incorrect, report the discrepancy and attempt to fix it before proceeding.

## Step 6: Print Summary

```
=== Agentic Cookbook Reconfigured ===
Previous tier: <N> (<Name>)
New tier: <N> (<Name>)
Committing rule: installed / not installed / unchanged
Auto-lint rule: installed / not installed / unchanged
Rules added: <list> (or "none")
Rules removed: <list> (or "none")
CLAUDE.md: updated
```

## Guards

- **Do not modify any files in the `../agentic-cookbook/` repo.** Only read/copy from it.
- **Verify `../agentic-cookbook/` exists** before copying files. If missing, stop with an error.
- **Do not remove rule files that belong to the target tier or below.** Only remove files for tiers above the new tier.
