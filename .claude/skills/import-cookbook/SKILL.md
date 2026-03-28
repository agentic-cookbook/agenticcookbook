---
name: import-cookbook
version: "6.0.2"
description: "Import the agentic cookbook into your project. Sets up CLAUDE.md, configures your tier, and installs recommended plugins."
argument-hint: "[--version]"
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(mkdir *), Bash(ls *), Bash(claude *), AskUserQuestion, Skill
---

# Import Agentic Cookbook v6.0.2

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `import-cookbook v6.0.2` and stop — do not run the skill.

Otherwise, print `import-cookbook v6.0.2` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (6.0.2), print:

> ⚠ This skill is running v6.0.2 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Overview

Import the agentic cookbook into your project. This skill updates your project's CLAUDE.md, runs tier configuration, and offers to install recommended plugins globally.

## Usage

```
/import-cookbook
```

Run from your project directory. The cookbook must be cloned at `../agentic-cookbook/`.

## Permissions

Before modifying any files, present this prompt to the user:

```
=== Permissions Required ===

This skill will:
- Write/Edit CLAUDE.md — add or update the Agentic Cookbook section
- Invoke /configure-cookbook — which will ask its own permissions for rule file copying

Approve all? (yes / no)
```

If the user says no, stop and ask what they want to change. If yes, proceed without further permission prompts.

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
- **Tier**: (set by /configure-cookbook)

Run `/configure-cookbook` to change your participation tier.
```

## Step 3: Run Configuration

Ask the user: "Would you like to select your participation tier now?"

- If **yes**: invoke `/configure-cookbook` using the Skill tool. This will handle tier selection, rule copying, and updating CLAUDE.md with the tier details.
- If **no**: default to **Tier 2 (Guidelines)** and invoke `/configure-cookbook 2` using the Skill tool. Print: "Defaulting to Tier 2 (Guidelines). Run `/configure-cookbook` anytime to change."

## Step 4: Install Recommended Plugins

Read `${CLAUDE_SKILL_DIR}/references/recommended-plugins.md` for the full list.

Ask the user:

```
The cookbook works best with these plugins installed globally.
Would you like to install recommended plugins?

1. All recommended plugins (core + workflow + authoring + LSP)
2. Core only (playwright, context7, figma, semgrep, frontend-design)
3. Skip — I'll install plugins myself later
```

Based on the user's choice, install the appropriate plugins using the Bash tool:

**For each plugin**, run: `claude plugin install <plugin-name> --scope user`

Install in this order:

**Core** (option 1 or 2):
- playwright
- context7
- figma
- semgrep
- frontend-design

**Workflow** (option 1 only):
- superpowers
- code-review
- pr-review-toolkit
- security-guidance
- document-skills

**Authoring** (option 1 only):
- plugin-dev
- agent-sdk-dev
- hookify
- playground

**LSP** (option 1 only — ask which languages):
```
Which language servers do you need?
- swift-lsp (Swift/SwiftUI)
- typescript-lsp (TypeScript/JavaScript)
- kotlin-lsp (Kotlin/Android)
- csharp-lsp (C#/.NET)
- All of the above
- Skip LSP plugins
```

After installing, print the count: "Installed N plugins globally."

If any plugin fails to install, note the failure and continue with the rest. Print failures at the end.

## Step 5: Print Summary

```
=== Agentic Cookbook Imported ===
CLAUDE.md: updated with cookbook reference
Tier: configured by /configure-cookbook
Plugins installed: <count> (or "skipped")
Failed plugins: <list> (or "none")

To change your tier: /configure-cookbook
To see available skills: check CLAUDE.md
```

## Guards

- **Do not modify the cookbook repo.** Only read from `../agentic-cookbook/`.
- **Plugin installs are global (--scope user).** They are not project-specific.
