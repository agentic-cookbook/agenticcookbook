---
name: import-agentic-cookbook
version: "5.0.0"
description: "Import the agentic cookbook into your project. Sets up CLAUDE.md and configures your participation tier."
argument-hint: "[--version]"
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(mkdir *), Bash(ls *), AskUserQuestion
context: fork
---

# Import Agentic Cookbook v5.0.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `import-agentic-cookbook v5.0.0` and stop — do not run the skill.

Otherwise, print `import-agentic-cookbook v5.0.0` as the first line of output, then proceed.

## Overview

Import the agentic cookbook into your project. This skill updates your project's CLAUDE.md to reference the cookbook, then directs you to run the tier configuration flow to install the appropriate rules.

## Usage

```
/import-agentic-cookbook
```

Run from your project directory. The cookbook must be cloned at `../agentic-cookbook/`.

## Step 1: Verify Prerequisites

1. Check that `../agentic-cookbook/` exists (use `ls ../agentic-cookbook/cookbook/`). If not found, print:
   ```
   Cookbook not found. Clone it first:
   git clone git@github.com:mikefullerton/agentic-cookbook.git ../agentic-cookbook
   ```
   Then stop.

2. Check that the current directory is a project — it has a `CLAUDE.md` or is a git repo (`.git/` exists). If neither, print: "This does not appear to be a project directory. Navigate to your project root and try again." Then stop.

## Step 2: Update CLAUDE.md

Add or update an `## Agentic Cookbook` section in the project's `CLAUDE.md`.

- If `CLAUDE.md` does not exist, create it with `# <directory name>` as the heading, followed by the section below.
- If `CLAUDE.md` exists but has no `## Agentic Cookbook` section, append the section to the end.
- If the section already exists, replace it in place using the Edit tool.

The section content:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookbook) repo.

- **Cookbook path**: `../agentic-cookbook/`
- **Tier**: (set by /configure-agentic-cookbook)

Run `/configure-agentic-cookbook` to select your participation tier and install rules.
```

## Step 3: Run Configuration

Print: "CLAUDE.md updated. Now run `/configure-agentic-cookbook` to select your participation tier and install rules."

Do NOT run tier selection — that is `/configure-agentic-cookbook`'s job.

## Step 4: Print Summary

```
=== Agentic Cookbook Imported ===
CLAUDE.md: updated with cookbook reference
Next step: run /configure-agentic-cookbook to select your tier
```

## Guards

- **Do not modify the cookbook repo.** Only read from `../agentic-cookbook/`.
- **Do not select a tier** — that is `/configure-agentic-cookbook`'s job.
- **Do not copy rule files** — that is `/configure-agentic-cookbook`'s job.
