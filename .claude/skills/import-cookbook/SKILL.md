---
name: import-cookbook
version: "7.0.0"
description: "Import the agentic cookbook into your project. Generates an optimized rule file, updates CLAUDE.md, and offers recommended plugins."
argument-hint: "[--version]"
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(cp *), Bash(mkdir *), Bash(ls *), Bash(wc *), Bash(date *), Bash(claude *), AskUserQuestion, Skill
---

# Import Agentic Cookbook v7.0.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `import-cookbook v7.0.0` and stop — do not run the skill.

Otherwise, print `import-cookbook v7.0.0` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (7.0.0), print:

> ⚠ This skill is running v7.0.0 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Overview

Import the agentic cookbook into your project. This skill generates one optimized rule file tailored to your project, updates CLAUDE.md, and offers to install recommended plugins globally.

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
- Generate .claude/rules/cookbook.md — one optimized rule file for this project
- Write .claude/cookbook-manifest.json — tracks what was generated
- Ask about optional features (committing workflow, recipe prompts, contribution prompts)

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

## Step 2: Analyze Project

Gather information to determine which conditional sections to include:

1. **Claude extensions**: Does `.claude/skills/` or `.claude/agents/` exist? If yes, include the auto-lint section.
2. **Preferences**: Read `.claude/cookbook-preferences.json` if it exists. Use defaults if not:
   - `show_recipe_prompts`: `true`
   - `show_contribution_prompts`: `true`
3. **Ask about committing workflow**: Present to the user:
   ```
   Optional: Install a structured git workflow? (worktrees, draft PRs, incremental commits)
   1. Yes
   2. No
   ```
   Record the decision.

## Step 3: Generate Rule File

Create `.claude/rules/` if it doesn't exist.

Read the template at `../agentic-cookbook/rules/generated-cookbook-template.md` for the structure.

Read the 18 principle files from `../agentic-cookbook/cookbook/principles/`. For each file, extract only the first content paragraph after the frontmatter (skip the YAML between `---` markers, the `#` heading, and the Change History section). Use these to populate the inline principles table.

Generate `.claude/rules/cookbook.md` with the following structure:

1. **Ground Rules** — always include the 3 ground rules (confirm context, preserve existing work, no unauthorized changes)
2. **Principles table** — all 18 principles as a `| Principle | Key Rule |` table with one-line summaries
3. **Planning section** — iterative pipeline instructions referencing `../agentic-cookbook/cookbook/workflow/guideline-checklist.md`
4. **Recipe search** — include only if `show_recipe_prompts` is not `false`
5. **Implementation section** — iterative pipeline with three-phase discipline
6. **Committing workflow** — include only if user opted in
7. **Verification section** — build, test, lint, guideline compliance
8. **Auto-lint section** — include only if project has `.claude/skills/` or `.claude/agents/`
9. **Contribution prompts** — include only if `show_contribution_prompts` is not `false`
10. **MUST NOT section** — deduplicated: only items that add unique constraints not stated in the body
11. **Reference table** — paths to external cookbook content

**Do NOT include:**
- Separate authoring-ground-rules.md (merged into the preamble)
- Separate auto-lint.md (folded into generated rule when applicable)
- Redundant MUST NOT items that restate body constraints
- Verbose prose — keep instructions terse and imperative

After writing the file, count lines and bytes with `wc -l -c .claude/rules/cookbook.md` and report the size.

## Step 4: Write Generation Manifest

Write `.claude/cookbook-manifest.json`:

```json
{
  "generated": "<ISO 8601 timestamp>",
  "generator_version": "7.0.0",
  "source_cookbook": "../agentic-cookbook",
  "sections_included": ["ground-rules", "principles", "planning", "implementation", "verification", ...],
  "sections_excluded": [...],
  "preferences": {
    "show_recipe_prompts": true/false,
    "show_contribution_prompts": true/false,
    "committing_workflow": true/false
  }
}
```

Also write `.claude/cookbook-preferences.json` if it doesn't exist, with the user's choices from Step 2.

## Step 5: Clean Up Legacy Files

Remove any old files from `.claude/rules/` that are no longer needed:

- `authoring-ground-rules.md` (merged into generated rule)
- `auto-lint.md` (folded into generated rule when applicable)
- Old tier files: `principles.md`, `guideline-consumer.md`, `recipe-consumer.md`, `contributor.md`, `PRINCIPLES-RULE.md`, `GUIDELINE-CONSUMER-RULE.md`, `RECIPE-CONSUMER-RULE.md`, `CONTRIBUTOR-RULE.md`
- Old `skill-versioning.md` (from legacy tier 3)

Only remove files that actually exist. Print which files were removed.

## Step 6: Update CLAUDE.md

Add or update an `## Agentic Cookbook` section in the project's `CLAUDE.md`.

- If `CLAUDE.md` does not exist, create it with `# <directory name>` as the heading, followed by the section below.
- If `CLAUDE.md` exists but has no `## Agentic Cookbook` section, append the section to the end.
- If the section already exists, replace it in place using the Edit tool.

The section content:

```markdown
## Agentic Cookbook

This project uses the [agentic-cookbook](https://github.com/mikefullerton/agentic-cookbook).

- **Cookbook path**: `../agentic-cookbook/`
- **Rule**: `cookbook.md` (generated, project-specific)
- **Available skills**: /configure-cookbook, /import-cookbook, /lint-with-cookbook, /plan-cookbook-recipe, /contribute-to-cookbook

Run `/configure-cookbook` to manage preferences and regenerate the rule file.
```

## Step 7: Install Recommended Plugins

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

## Step 8: Print Summary

```
=== Agentic Cookbook Imported ===
CLAUDE.md: updated
Rule generated: cookbook.md (<N> lines, <B> bytes)
  Sections: <list of included sections>
  Excluded: <list of excluded sections>
Manifest: .claude/cookbook-manifest.json
Legacy files removed: <list or "none">
Plugins: N installed, M skipped (already installed)

To manage preferences: /configure-cookbook
```

## Guards

- **Do not modify the cookbook repo.** Only read from `../agentic-cookbook/`.
- **Plugin installs are global (--scope user).** They are not project-specific.
- **Generated rule must be under 120 lines.** If it exceeds this, review for unnecessary content.
