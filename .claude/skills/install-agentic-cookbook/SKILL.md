---
name: install-agentic-cookbook
version: "1.0.0"
description: "Install the agentic cookbook into your project. Asks your participation tier and sets up rules and CLAUDE.md."
argument-hint: "[--version]"
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(mkdir *), Bash(ls *), AskUserQuestion
context: fork
---

# Install Agentic Cookbook v1.0.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `install-agentic-cookbook v1.0.0` and stop — do not run the skill.

Otherwise, print `install-agentic-cookbook v1.0.0` as the first line of output, then proceed.

## Overview

This skill is the onboarding wizard for the agentic cookbook. It walks you through selecting a participation tier, copies the appropriate rule files into your project, and configures your CLAUDE.md so Claude Code knows how to use the cookbook in your project. Run it once from your project directory to get started.

## Usage

```
/install-agentic-cookbook
```

Run from your project directory. The wizard asks your participation tier and configures your project to use the cookbook.

## Prerequisites

Before starting the wizard, verify the following:

### 1. Cookbook repo exists

Check that `../agentic-cookbook/` exists relative to the current working directory. Verify by reading `../agentic-cookbook/CLAUDE.md`.

If not found, print this message and stop:

```
The agentic cookbook repo was not found at ../agentic-cookbook/

Clone it next to your project:
  git clone git@github.com:mikefullerton/agentic-cookbook.git ../agentic-cookbook
```

### 2. Current directory is a project

Check whether the current directory has a `CLAUDE.md` file or is a git repo (check for `.git/` directory).

If neither exists, print a warning:

```
Warning: This directory does not appear to be a project (no CLAUDE.md or .git/ found).
```

Then use AskUserQuestion to ask: "Continue installing the cookbook here anyway?" If the user says no, stop.

---

## Step 1: Ask Participation Tier

Use AskUserQuestion to present the four tiers and ask the user to pick one. Present this table:

```
Which participation tier do you want?

| Tier | Name        | What you get                                              |
|------|-------------|-----------------------------------------------------------|
| 1    | Principles  | 18 engineering principles guide your planning and coding  |
| 2    | Guidelines  | + Full guideline checklist, verification workflow         |
| 3    | Recipes     | + Recipe search, conformance, opportunity flagging        |
| 4    | Contributor | + Create/enhance recipes, PR workflow to the cookbook      |

Each tier is additive — tier 3 includes everything from tiers 1 and 2.

Enter a tier number (1-4):
```

Validate the response is 1, 2, 3, or 4. If invalid, ask again.

---

## Step 1b: Ask About Committing Rule (Optional)

After the tier is selected, use AskUserQuestion to offer the committing rule:

```
Optional: Install the committing rule for your project?

The committing rule enforces a structured git workflow in YOUR project:
- All work happens in a git worktree (never directly on main)
- A draft PR is created before any code is written
- Every change is committed, pushed, and documented in the PR
- The PR is marked ready when work is complete
- The PR is merged after any required checks pass

This is independent of your participation tier — it governs how you
commit to your own repo, not how you interact with the cookbook.

Install the committing rule? (y/n):
```

Record the answer. If yes, `COMMITTING-RULE.md` will be copied alongside the tier rules in Step 2.

---

## Step 2: Install Rule Files

Based on the selected tier, copy the appropriate rule files from `../agentic-cookbook/rules/` into the project's `.claude/rules/` directory.

### Create the rules directory

```bash
mkdir -p .claude/rules
```

### Copy rules by tier

| Tier | Files to copy |
|------|---------------|
| 1 | `PRINCIPLES-RULE.md` |
| 2 | `PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md` |
| 3 | `PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md`, `RECIPE-CONSUMER-RULE.md` |
| 4 | `PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md`, `RECIPE-CONSUMER-RULE.md`, `CONTRIBUTOR-RULE.md`, `SKILL-VERSIONING-RULE.md` |

If the user opted in to the committing rule in Step 1b, also copy `COMMITTING-RULE.md` regardless of tier.

Copy each file:

```bash
cp ../agentic-cookbook/rules/<FILENAME> .claude/rules/<FILENAME>
```

After copying, verify each file exists by reading the first line. If any copy failed, report the error and stop.

---

## Step 3: Update CLAUDE.md

Add or update an `## Agentic Cookbook` section in the project's `CLAUDE.md`.

### If CLAUDE.md does not exist

Create it with this content (replace placeholders):

```markdown
# <project directory name>

## Agentic Cookbook

<COOKBOOK_SECTION>
```

Use the current directory name as the project title.

### If CLAUDE.md exists but has no `## Agentic Cookbook` section

Append the section at the end of the file.

### If CLAUDE.md already has an `## Agentic Cookbook` section

Use the Edit tool to replace the entire section. Match from the line `## Agentic Cookbook` to the line immediately before the next level-2 heading (`## `, not `###`) or end of file, whichever comes first. Only use the Write tool if creating CLAUDE.md from scratch.

### Cookbook section content

The `<COOKBOOK_SECTION>` varies by tier:

**Tier 1 — Principles:**

```markdown
## Agentic Cookbook

**Tier**: 1 — Principles
**Cookbook path**: `../agentic-cookbook/`

18 engineering principles guide your planning and coding. Read them before every design decision.

### Installed rules

- `.claude/rules/PRINCIPLES-RULE.md`

### Available skills

None at this tier.

> To change your tier, run `/configure-agentic-cookbook`
```

**Tier 2 — Guidelines:**

```markdown
## Agentic Cookbook

**Tier**: 2 — Guidelines
**Cookbook path**: `../agentic-cookbook/`

Engineering principles plus full guideline checklist and verification workflow.

### Installed rules

- `.claude/rules/PRINCIPLES-RULE.md`
- `.claude/rules/GUIDELINE-CONSUMER-RULE.md`

### Available skills

- `/review-with-agentic-cookbook-guidelines` — Review code against cookbook guidelines

> To change your tier, run `/configure-agentic-cookbook`
```

**Tier 3 — Recipes:**

```markdown
## Agentic Cookbook

**Tier**: 3 — Recipes
**Cookbook path**: `../agentic-cookbook/`

Engineering principles, guidelines, plus recipe search, conformance checking, and opportunity flagging.

### Installed rules

- `.claude/rules/PRINCIPLES-RULE.md`
- `.claude/rules/GUIDELINE-CONSUMER-RULE.md`
- `.claude/rules/RECIPE-CONSUMER-RULE.md`

### Available skills

- `/review-with-agentic-cookbook-guidelines` — Review code against cookbook guidelines

> To change your tier, run `/configure-agentic-cookbook`
```

**Tier 4 — Contributor:**

```markdown
## Agentic Cookbook

**Tier**: 4 — Contributor
**Cookbook path**: `../agentic-cookbook/`

Full cookbook access: principles, guidelines, recipe conformance, plus the ability to create and enhance recipes and contribute back to the cookbook.

### Installed rules

- `.claude/rules/PRINCIPLES-RULE.md`
- `.claude/rules/GUIDELINE-CONSUMER-RULE.md`
- `.claude/rules/RECIPE-CONSUMER-RULE.md`
- `.claude/rules/CONTRIBUTOR-RULE.md`
- `.claude/rules/SKILL-VERSIONING-RULE.md`

### Available skills

- `/review-with-agentic-cookbook-guidelines` — Review code against cookbook guidelines
- `/import-agentic-cookbook` — Deep codebase analysis and recipe extraction
- `/plan-agentic-cookbook-recipe` — Interactive recipe design
- `/contribute-to-agentic-cookbook` — Submit recipes and improvements to the cookbook

> To change your tier, run `/configure-agentic-cookbook`
```

### Committing rule (conditional)

If the user opted in to the committing rule in Step 1b, add this line to the "Installed rules" list in whichever tier template was used:

```markdown
- `.claude/rules/COMMITTING-RULE.md` *(optional — structured git workflow)*
```

---

## Step 4: Verify Installation

Before printing the summary, verify the installation succeeded:

1. List `.claude/rules/` and confirm all expected rule files are present for the selected tier.
2. Read the `## Agentic Cookbook` section from CLAUDE.md and confirm it shows the correct tier.
3. If any check fails, report the issue and stop. Do not print a success summary for a failed installation.

---

## Step 5: Print Summary

After verification passes, print:

```
=== Agentic Cookbook Installed ===
Tier: <N> (<Name>)
Committing rule: installed / not installed
Rules installed: <comma-separated list of filenames>
CLAUDE.md: updated
Available skills: <comma-separated list, or "none" for tier 1>
Cookbook path: ../agentic-cookbook/

To change your tier: /configure-agentic-cookbook
```

---

## Guards

- Do NOT modify any files inside the `../agentic-cookbook/` repo. Only read from it.
- Do NOT install global symlinks. That is the user's choice, not this wizard's.
- Do NOT commit any changes. The user decides when to commit.
- Do NOT run the skill if `$ARGUMENTS` is `--version` — just print the version and stop.
