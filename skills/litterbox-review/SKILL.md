---
name: litterbox-review
version: 1.2.0
description: Review a generated implementation against all litterbox rules, best practices, and engineering principles
disable-model-invocation: true
context: fork
allowed-tools: Read, Glob, Grep, Bash(git diff *), Bash(git log *), Agent
argument-hint: [path to spec] [path to implementation directory] [--version]
---

# Litterbox Implementation Review v1.2.0

## Startup

**First action**: If the argument is `--version`, print `litterbox-review v1.2.0` and stop — do not run the skill.

Otherwise, print `litterbox-review v1.2.0` as the first line of output, then proceed.

## Overview

You are reviewing a generated implementation against the litterbox component spec library rules, best practices references, and engineering principles.

## Prerequisites & Assumptions

**Directory layout assumption**: This skill assumes the litterbox repo is a sibling directory to the target project (i.e., `../litterbox/` from the project root). If it's not found there, search the parent directory for a `litterbox/` folder. If still not found, ask the user for the litterbox path.

## Inputs

The user provides arguments as: `/litterbox-review <spec-path> <implementation-path>`

1. **Spec path** (`$0`): Path to the component or recipe spec (e.g., `../litterbox/ui/empty-state.md` or just the component name like `empty-state`)
2. **Implementation path** (`$1`): Path to the implementation directory or files (defaults to current working directory if not provided)

If either argument is missing, ask the user to provide it.

## Fallbacks

| Situation | Action |
|-----------|--------|
| Spec path doesn't exist | Search `../litterbox/ui/` and `../litterbox/ui/Recipes/` for a matching filename. If not found, stop with error. |
| Implementation directory is empty | Stop with error: "No implementation files found at {path}" |
| Litterbox CLAUDE.md not found | Stop with error: "Cannot locate litterbox repo. Provide the path." |
| `engineering-principles.md` not found | Skip engineering principles review, note in report |
| A review agent fails | Report partial results from completed agents, note the failure |
| More than 50 implementation files | Prioritize files matching the spec's component name and related types. Note truncation in report. |

## Review Process

### Phase 1: Read the spec and implementation

1. Locate the litterbox repo (default: `../litterbox/`). Verify it exists.
2. Read the component/recipe spec from the spec path (`$0`). If `$0` is a bare name (no path separator), search `../litterbox/ui/$0.md` and `../litterbox/ui/Recipes/$0.md`.
3. Read the litterbox rules from `{litterbox}/CLAUDE.md`
4. Read the engineering principles from `{litterbox}/engineering-principles.md`
5. Read the rule checklist from `${CLAUDE_SKILL_DIR}/references/rule-checklist.md`
6. Read implementation files from `$1` (or current directory). Use Glob to find source files (`*.swift`, `*.kt`, `*.tsx`, `*.ts`). Cap at 50 files — if more exist, prioritize files whose names match types referenced in the spec.

### Phase 2: Systematic review

Launch up to 3 review agents in parallel. Each agent reviews a subset of rules:

**Agent 1 — UI Quality & Behavior (Rules 1–4, 10–11, 15)**
- Rule 1: Are native controls used? Are they noted?
- Rule 1.1: If custom, was open-source considered?
- Rule 2: Is the UI instantly responsive? Press vs release?
- Rule 3: Is all async work off the main thread?
- Rule 4: Are progress indicators shown during waits?
- Rule 10: Is deep linking implemented per spec?
- Rule 11: Is the component scriptable where applicable?
- Rule 15: Does the implementation respond to accessibility display options?

**Agent 2 — Quality Assurance (Rules 5–9, 17–20)**
- Rule 5: Do unit tests exist? Are they comprehensive?
- Rule 6: Are design decisions surfaced and recorded?
- Rule 8: Were all verification steps completed (build, test, lint, a11y, preview, snapshot, logs, code review)?
- Rule 9: Does logging match the spec's Logging section exactly?
- Rule 17: Are feature flags used per spec?
- Rule 18: Are analytics events instrumented per spec?
- Rule 19: Is A/B testing supported where applicable?
- Rule 20: Is debug mode integration present?

**Agent 3 — Accessibility, i18n, Privacy, Engineering (Rules 12–14, 16, Principles)**
- Rule 12: Accessibility from day one — labels, roles, keyboard nav, Dynamic Type?
- Rule 13: Are all strings localized? No hardcoded user-facing strings?
- Rule 14: Does the layout support RTL? Leading/trailing used?
- Rule 16: Privacy requirements met? No PII in logs? Secure storage?
- Engineering principles: composition, DI, immutability, fail fast, idempotency?
- Best practices: HIG/Material/WCAG compliance?

### Phase 3: Compile report

Combine all agent findings into a single structured report.

## Output Format

```
# Litterbox Review: [Component Name]

Spec: [path to spec]
Implementation: [path to implementation]
Platform: [detected platform]
Date: [today]
Files reviewed: [count]

## Summary
[1-2 sentence overall assessment]

## Results

| Rule | Status | Finding |
|------|--------|---------|
| 1. Native controls | ✅/⚠️/❌ | [detail] |
| 1.1 Open-source | ✅/⚠️/❌/N/A | [detail] |
| 2. Responsiveness | ✅/⚠️/❌ | [detail] |
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
- For Rule 9 (logging), compare spec log messages character-by-character against implementation
- For Rule 13 (localization), grep for hardcoded strings in the implementation
- For Rule 16 (privacy), grep for PII patterns in log statements
- Reference the best practices docs by name when flagging compliance issues
