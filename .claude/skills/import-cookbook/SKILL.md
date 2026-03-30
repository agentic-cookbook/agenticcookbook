---
name: import-cookbook
version: "8.1.0"
description: "Import the agentic cookbook into your project. Installs a minimal always-on rule and pipeline skills for iterative planning and implementation."
argument-hint: "[--version]"
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(mkdir *), Bash(ls *), Bash(wc *), Bash(date *), Bash(claude *), AskUserQuestion, Skill
---

# Import Agentic Cookbook v8.0.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `import-cookbook v8.0.0` and stop — do not run the skill.

Otherwise, print `import-cookbook v8.0.0` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (8.0.0), print:

> ⚠ This skill is running v8.0.0 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Overview

Import the agentic cookbook into your project. This skill installs:

1. **Minimal always-on rule** (~10 lines, ~500 bytes) — behavioral guardrails loaded every turn
2. **Pipeline skills** (`/cookbook-start`, `/cookbook-next`) — iterative planning and implementation, loaded on-demand

The always-on rule contains only guardrails. All workflow content (principles, guidelines, planning pipeline, implementation pipeline, verification) is loaded on-demand by the pipeline skills.

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
- Generate .claude/rules/cookbook.md — minimal always-on rule (~10 lines)
- Write .claude/cookbook-manifest.json — tracks what was generated
- Write .claude/cookbook-preferences.json — stores user preferences
- Ask about preferences (committing workflow, recipe prompts, contribution prompts)

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

## Step 2: Gather Preferences

Read `.claude/cookbook-preferences.json` if it exists. Otherwise, ask the user:

1. **Committing workflow**: "Install a structured git workflow? (worktrees, draft PRs, incremental commits) — yes/no"
2. **Recipe prompts**: "During planning, search for matching recipes and offer them? — yes/no" (default: yes)
3. **Contribution prompts**: "After implementation, ask about contributing reusable patterns? — yes/no" (default: yes)

Write `.claude/cookbook-preferences.json` with the choices:

```json
{
  "committing_workflow": true/false,
  "show_recipe_prompts": true/false,
  "show_contribution_prompts": true/false
}
```

## Step 3: Generate Minimal Rule File

Create `.claude/rules/` if it doesn't exist.

Write `.claude/rules/cookbook.md` with exactly this content:

```markdown
# Cookbook

1. Confirm you are in the correct project before making changes.
2. Investigate unfamiliar content before overwriting.
3. Fix only what was asked — no unauthorized additions.
4. Do not skip Phase 2 (Make It Right).
5. Do not skip writing tests.
6. Do not optimize without evidence.

When planning or implementing features, use /cookbook-start.
```

Count lines and bytes with `wc -l -c .claude/rules/cookbook.md` and report the size.

## Step 4: Install Committing Rule (if opted in)

If the user opted in to the committing workflow:

Copy `../agentic-cookbook/rules/committing.md` to `.claude/rules/committing.md`.

This is a separate rule file (not part of the generated cookbook.md) because it has its own scope and lifecycle.

## Step 5: Write Generation Manifest

Write `.claude/cookbook-manifest.json`:

```json
{
  "generated": "<ISO 8601 timestamp>",
  "generator_version": "8.0.0",
  "source_cookbook": "../agentic-cookbook",
  "rule_type": "minimal",
  "preferences": {
    "committing_workflow": true/false,
    "show_recipe_prompts": true/false,
    "show_contribution_prompts": true/false
  }
}
```

## Step 6: Clean Up Legacy Files

Remove any old files from `.claude/rules/` that are no longer needed:

- `authoring-ground-rules.md`
- `auto-lint.md`
- `skill-versioning.md`
- Old tier files: `PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md`, `RECIPE-CONSUMER-RULE.md`, `CONTRIBUTOR-RULE.md`

Only remove files that actually exist. Print which files were removed.

## Step 7: Update CLAUDE.md

Add or update an `## Agentic Cookbook` section in the project's `CLAUDE.md`.

- If `CLAUDE.md` does not exist, create it with `# <directory name>` as the heading, followed by the section below.
- If `CLAUDE.md` exists but has no `## Agentic Cookbook` section, append the section to the end.
- If the section already exists, replace it in place using the Edit tool.

The section content:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookbook).

- **Cookbook path**: `../agentic-cookbook/`
- **Rule**: `cookbook.md` (minimal, ~10 lines — guardrails only)
- **Pipeline**: `/cookbook-start` to begin, `/cookbook-next` to advance one step
- **Preferences**: Recipe prompts [enabled/disabled], contribution prompts [enabled/disabled], committing [included/not included]
- **Available skills**: /configure-cookbook, /import-cookbook, /cookbook-start, /cookbook-next, /lint-with-cookbook, /plan-cookbook-recipe, /contribute-to-cookbook

Run `/configure-cookbook` to manage preferences.
```

## Step 8: Install Recommended Plugins

Read `${CLAUDE_SKILL_DIR}/references/recommended-plugins.md` for the full list.

Before installing, check which plugins are already installed: `claude plugin list --scope user`. Only install plugins that are not already present.

Install all recommended plugins globally using `claude plugin install <plugin-name> --scope user`:

- playwright
- context7
- figma
- frontend-design
- superpowers
- code-review
- pr-review-toolkit
- security-guidance
- document-skills
- plugin-dev
- agent-sdk-dev
- hookify
- playground

For LSP plugins, detect which languages the project uses by checking file extensions in the project directory, then install the matching LSP plugins:

| Extensions | Plugin |
|------------|--------|
| `.swift` | swift-lsp |
| `.ts`, `.tsx`, `.js`, `.jsx` | typescript-lsp |
| `.kt` | kotlin-lsp |
| `.cs` | csharp-lsp |

If no source files are found, skip LSP plugins.

If any plugin fails to install, note the failure and continue with the rest.

Print: `Installed N plugins (M already installed, skipped). Failures: <list or "none">`

## Step 9: Install Pipeline Status Line

Copy `../agentic-cookbook/rules/cookbook-statusline.sh` to `.claude/cookbook-statusline.sh` and make it executable.

Ask the user:

```
Install pipeline progress status line? Shows current step (e.g. "Planning: Step 5/38 — fail-fast")
in the Claude Code terminal during /cookbook-next execution.

1. Yes (Recommended)
2. No
```

If yes:
- If `~/.claude/settings.json` does not exist or has no `statusLine` key, write:
  ```json
  { "statusLine": { "type": "command", "command": ".claude/cookbook-statusline.sh" } }
  ```
- If a `statusLine` is already configured, print: "Status line already configured. The cookbook status line was installed at `.claude/cookbook-statusline.sh` — you can integrate it manually." Do not overwrite.

## Step 10: Print Summary

```
=== Agentic Cookbook Imported ===
CLAUDE.md: updated
Rule: cookbook.md (<N> lines, <B> bytes) — minimal guardrails
Committing: .claude/rules/committing.md — installed / not installed
Manifest: .claude/cookbook-manifest.json
Preferences: .claude/cookbook-preferences.json
Legacy files removed: <list or "none">
Plugins: N installed, M skipped (already installed)
Status line: installed / skipped

Pipeline workflow:
  /cookbook-start planning <task>  — begin planning
  /cookbook-next                   — advance one step
  /cookbook-start implementation   — begin implementation
  /cookbook-next                   — advance one step

To manage preferences: /configure-cookbook
```

## Guards

- **Do not modify the cookbook repo.** Only read from `../agentic-cookbook/`.
- **Plugin installs are global (--scope user).** They are not project-specific.
- **The generated rule MUST be under 15 lines.** It is guardrails only — no workflow content.
