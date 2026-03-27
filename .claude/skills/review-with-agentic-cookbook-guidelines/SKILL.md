---
name: review-with-agentic-cookbook-guidelines
version: 2.1.0
description: Review a generated implementation against agentic cookbook guidelines, recipes, and engineering principles
disable-model-invocation: true
context: fork
allowed-tools: Read, Glob, Grep, Bash(git diff *), Bash(git log *), Agent
argument-hint: [path to recipe] [path to implementation directory] [--version]
---

# Agentic Cookbook Implementation Review v2.1.0

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `review-with-agentic-cookbook-guidelines v2.1.0` and stop — do not run the skill.

Otherwise, print `review-with-agentic-cookbook-guidelines v2.1.0` as the first line of output, then proceed.

## Overview

You are reviewing a generated implementation against the agentic cookbook guidelines, recipes, and engineering principles.

## Usage

```
/review-with-agentic-cookbook-guidelines cookbook/recipes/ui/component/empty-state.md ../my-app/Sources/EmptyState/
```

Reviews the `EmptyState` implementation against the `empty-state` recipe and all applicable cookbook guidelines. Produces a structured report with pass/warn/fail ratings per guideline.

## Prerequisites & Assumptions

**Directory layout**: This skill runs from within the agentic cookbook repo. Cookbook content is at `cookbook/` from the repo root. Guidelines are at `cookbook/guidelines/`, principles at `cookbook/principles/`, and recipes at `cookbook/recipes/`.

## Inputs

The user provides arguments as: `/review-with-agentic-cookbook-guidelines <recipe-path> <implementation-path>`

1. **Recipe path** (`$0`): Path to the component or recipe (e.g., `cookbook/recipes/ui/component/empty-state.md` or just the component name like `empty-state`)
2. **Implementation path** (`$1`): Path to the implementation directory or files (defaults to current working directory if not provided)

If either argument is missing, ask the user to provide it.

## Fallbacks

| Situation | Action |
|-----------|--------|
| Recipe path doesn't exist | Search `cookbook/recipes/` recursively for a matching filename. If not found, stop with error. |
| Implementation directory is empty | Stop with error: "No implementation files found at {path}" |
| `cookbook/guidelines/` not found | Stop with error: "Cannot locate cookbook guidelines directory." |
| `cookbook/principles/` not found | Skip principles review, note in report |
| A review agent fails | Report partial results from completed agents, note the failure |
| More than 50 implementation files | Prioritize files matching the recipe's component name and related types. Note truncation in report. |

## Review Process

### Phase 1: Read the recipe and implementation

1. Read the recipe from the recipe path ($0). If $0 is a bare name (no path separator), search `cookbook/recipes/` recursively for `$0.md`.
2. Read `CLAUDE.md` and `cookbook/conventions.md` for repo-level context.
3. Read the guideline index at `cookbook/guidelines/INDEX.md` and then the core guidelines file `cookbook/guidelines/general.md`.
4. Read engineering principles from `cookbook/principles/` (all files).
5. Read the guideline checklist from `${CLAUDE_SKILL_DIR}/references/guideline-checklist.md`.
6. Read implementation files from $1 (or current directory). Use Glob to find source files (*.swift, *.kt, *.tsx, *.ts). Cap at 50 files — if more exist, prioritize files whose names match types referenced in the recipe.

### Phase 2: Systematic review

Launch up to 3 review agents in parallel. Each agent reviews the items assigned to it from `${CLAUDE_SKILL_DIR}/references/guideline-checklist.md`:

**Agent 1 — UI Quality & Behavior**
Categories: UI Quality & Behavior

**Agent 2 — Quality Assurance**
Categories: Quality Assurance, Linting

**Agent 3 — Accessibility, i18n, Privacy, Engineering Principles**
Categories: Accessibility, i18n, Privacy, Engineering Principles

### Phase 3: Compile report

Combine all agent findings into a single structured report.

## Output Format

```
# Agentic Cookbook Review: [Component Name]

Recipe: [path to recipe]
Implementation: [path to implementation]
Platform: [detected platform]
Date: [today]
Files reviewed: [count]

## Summary
[1-2 sentence overall assessment]

## Results

| Guideline | Status | Finding |
|-----------|--------|---------|
| Native controls | ✅/⚠️/❌ | [detail] |
| Open-source preference | ✅/⚠️/❌/N/A | [detail] |
| Responsiveness & progress | ✅/⚠️/❌ | [detail] |
| Main thread / concurrency | ✅/⚠️/❌ | [detail] |
| Unit testing | ✅/⚠️/❌ | [detail] |
| Design decisions | ✅/⚠️/❌ | [detail] |
| Atomic commits | ✅/⚠️/❌ | [detail] |
| Post-generation verification | ✅/⚠️/❌ | [detail] |
| Logging | ✅/⚠️/❌ | [detail] |
| Deep linking | ✅/⚠️/❌/N/A | [detail] |
| Scriptability | ✅/⚠️/❌/N/A | [detail] |
| Accessibility | ✅/⚠️/❌ | [detail] |
| Localization | ✅/⚠️/❌ | [detail] |
| RTL support | ✅/⚠️/❌ | [detail] |
| Accessibility display options | ✅/⚠️/❌ | [detail] |
| Privacy & security | ✅/⚠️/❌ | [detail] |
| Feature flags | ✅/⚠️/❌ | [detail] |
| Analytics | ✅/⚠️/❌/N/A | [detail] |
| A/B testing | ✅/⚠️/❌/N/A | [detail] |
| Debug mode | ✅/⚠️/❌ | [detail] |
| ... | | |

## Critical Issues
[Any ❌ findings that must be fixed]

## Warnings
[Any ⚠️ findings that should be addressed]

## Recommendations
[Suggestions for improvement]

## Limitations
[Any skipped checks due to missing files, agent failures, or file count caps]
```

Status meanings:
- ✅ **Pass**: Fully compliant
- ⚠️ **Warning**: Partially compliant or could be improved
- ❌ **Fail**: Non-compliant, must be fixed
- N/A: Rule does not apply to this component

## Important Notes

- Be thorough but fair — don't flag things that genuinely don't apply
- Check the actual code, not just file presence. A test file with no assertions is ⚠️ not ✅
- For the logging guideline, compare recipe log messages character-by-character against implementation
- For the localization guideline, grep for hardcoded strings in the implementation
- For the privacy guideline, grep for PII patterns in log statements
- Reference the cookbook guidelines and reference docs by name when flagging compliance issues
