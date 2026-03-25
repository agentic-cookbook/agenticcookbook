---
name: litterbox-review
version: 1
description: Review a generated implementation against all litterbox rules, best practices, and engineering principles
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash(git diff *), Bash(git log *), Agent
argument-hint: [path to spec] [path to implementation directory]
---

# Litterbox Implementation Review

You are reviewing a generated implementation against the litterbox component spec library rules, best practices references, and engineering principles.

## Inputs

The user will provide:
1. **Spec path**: Path to the component or recipe spec in `../litterbox/ui/` (or the user will name the component)
2. **Implementation path**: Path to the generated implementation files (or the current project directory)

If not provided, ask the user for both.

## Review Process

### Phase 1: Read the spec and implementation

1. Read the component/recipe spec from litterbox
2. Read the litterbox rules from `../litterbox/CLAUDE.md`
3. Read the engineering principles from `../litterbox/engineering-principles.md`
4. Read the rule checklist from `${CLAUDE_SKILL_DIR}/references/rule-checklist.md`
5. Read all implementation files (use Glob to find them, then Read each)

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
