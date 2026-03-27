---
name: configure-agentic-cookbook
version: "1.5.0"
description: "Change your agentic cookbook participation tier. Upgrade or downgrade between principles, guidelines, recipes, and contributor levels."
argument-hint: "[tier-number] [--version]"
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(rm *), Bash(ls *), Bash(mkdir *), AskUserQuestion
---

# Configure Agentic Cookbook v1.5.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `configure-agentic-cookbook v1.5.0` and stop — do not run the skill.

Otherwise, print `configure-agentic-cookbook v1.5.0` as the first line of output, then proceed.

## Usage

```
/configure-agentic-cookbook
/configure-agentic-cookbook 3
```

Changes your agentic cookbook participation tier. Provide a tier number to skip the prompt, or omit it to choose interactively.

## Step 1: Detect Current Tier

Check `.claude/rules/` in the current project for which rule files are installed:

| Check | Result |
|-------|--------|
| `CONTRIBUTOR-RULE.md` present | Tier 4 — Contributor |
| `RECIPE-CONSUMER-RULE.md` present | Tier 3 — Recipe Consumer |
| `GUIDELINE-CONSUMER-RULE.md` present | Tier 2 — Guideline Consumer |
| `PRINCIPLES-RULE.md` present | Tier 1 — Principles Only |
| None of the above | Not installed |

If not installed, this is a first-time configuration. Print: `No existing tier detected — first-time setup.` Set current tier to 0 and proceed to Step 2.

Also check whether `COMMITTING-RULE.md` is present (this is independent of tier).

Print: `Current tier: <N> (<Name>)` and `Committing rule: installed / not installed`

## Step 2: Ask New Tier

If `$ARGUMENTS` contains a number 1–4, use that as the target tier. If `$ARGUMENTS` is present but not a valid tier number (1–4) or `--version`, print an error: "Invalid tier. Valid options: 1 (Principles), 2 (Guidelines), 3 (Recipes), 4 (Contributor)" and stop. Otherwise, ask using `AskUserQuestion` with this table:

| Tier | Name | What you get |
|------|------|-------------|
| 1 | Principles Only | 18 engineering principles guide planning and code review |
| 2 | Guideline Consumer | Tier 1 + topic guidelines (testing, accessibility, security, etc.) |
| 3 | Recipe Consumer | Tier 2 + UI/infrastructure recipes with requirements and conformance checks |
| 4 | Contributor | Tier 3 + ability to author and submit new recipes back to the cookbook |

If the selected tier equals the current tier, print: `Re-applying tier <N> (<Name>) — verifying all rule files are present.` Then proceed to Step 3 normally. This ensures missing or outdated files are repaired.

## Step 3: Apply Changes

**Verify** `../agentic-cookbook/` exists before copying any files. If missing, print an error and stop.

**Permission note**: Print this before copying files:
```
This will copy rule files into .claude/rules/ and update CLAUDE.md.
When prompted for permission, select "Allow all" to avoid repeated prompts.
```

**Create the rules directory** if it doesn't exist: `mkdir -p .claude/rules`

**If upgrading** (new tier > current tier, or first-time setup from tier 0): copy the appropriate rule files from `../agentic-cookbook/rules/` into `.claude/rules/`.

| Tier | Rule files (cumulative) |
|------|------------------------|
| 1 | `PRINCIPLES-RULE.md` |
| 2 | Tier 1 + `GUIDELINE-CONSUMER-RULE.md` |
| 3 | Tier 2 + `RECIPE-CONSUMER-RULE.md` |
| 4 | Tier 3 + `CONTRIBUTOR-RULE.md`, `SKILL-VERSIONING-RULE.md` |

**If downgrading** (new tier < current tier): remove the rule files for tiers above the new tier.

| Downgrading from | Remove |
|-----------------|--------|
| Tier 4 → 3 | `CONTRIBUTOR-RULE.md`, `SKILL-VERSIONING-RULE.md` |
| Tier 3 → 2 | `RECIPE-CONSUMER-RULE.md` |
| Tier 2 → 1 | `GUIDELINE-CONSUMER-RULE.md` |

Track which files were added and removed for the summary.

## Step 3b: Committing Rule (Optional Toggle)

After tier changes, check whether the committing rule is currently installed. Use AskUserQuestion to offer a toggle:

**If not installed**, ask:

```
Optional: Install the committing rule for your project?

The committing rule enforces a structured git workflow in YOUR project:
- All work happens in a git worktree (never directly on main)
- A draft PR is created before any code is written
- Every change is committed, pushed, and documented in the PR
- The PR is marked ready when work is complete, then merged

This is independent of your participation tier — it governs how you
commit to your own repo, not how you interact with the cookbook.

Install the committing rule? (y/n):
```

If yes, copy `COMMITTING-RULE.md` from `../agentic-cookbook/rules/`.

**If already installed**, ask:

```
The committing rule is currently installed. Keep it? (y/n):
```

If no, remove `.claude/rules/COMMITTING-RULE.md`.

## Step 4: Update CLAUDE.md

If `CLAUDE.md` does not exist in the project root, create it with a project title heading (`# <Project Name>`) and the cookbook section below. If `CLAUDE.md` exists but has no `## Agentic Cookbook` section, append the section below to the end of the file. If the section already exists, replace it in place.

Replace the tier info, rule list, and available skills to match the new tier. If the committing rule is installed, include it in the rules list with `*(optional — structured git workflow)*`. Use this format:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookbook).

- **Tier**: <N> — <Name>
- **Cookbook path**: `../agentic-cookbook/`
- **Rules installed**: <list of rule files in .claude/rules/>
- **Available skills**: /configure-agentic-cookbook, /import-agentic-cookbook, /plan-agentic-cookbook-recipe
```

For tier 4, also include `/review-with-agentic-cookbook-guidelines` in available skills.

## Step 5: Verify Changes

Check that the expected rule files exist in `.claude/rules/` for the new tier. Re-read the `CLAUDE.md` `## Agentic Cookbook` section and confirm it shows the correct tier. If any expected file is missing or the CLAUDE.md section is incorrect, report the discrepancy and attempt to fix it before proceeding.

## Step 6: Print Summary

```
=== Agentic Cookbook Reconfigured ===
Previous tier: <N> (<Name>)
New tier: <N> (<Name>)
Committing rule: installed / not installed / unchanged
Rules added: <list> (or "none")
Rules removed: <list> (or "none")
CLAUDE.md: updated
```

## Guards

- **Do not modify any files in the `../agentic-cookbook/` repo.** Only read/copy from it.
- **Verify `../agentic-cookbook/` exists** before copying files. If missing, stop with an error.
- **Do not remove rule files that belong to the target tier or below.** Only remove files for tiers above the new tier.
