---
name: test-good-skill
version: "1.0.0"
description: "A test skill that passes all lint checks. Used by the test harness."
argument-hint: "[name]"
allowed-tools: Read, Glob, Grep
---

## Version Check

If `$ARGUMENTS` is `--version`, respond with exactly:

> test-good-skill v1.0.0

Then stop. Do not continue with the rest of the skill.

Otherwise, print `test-good-skill v1.0.0` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (1.0.0), print:

> ⚠ This skill is running v1.0.0 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

---

# Test Good Skill

A minimal skill that demonstrates all required patterns for passing lint checks.

## Guards

- **Read-only**: This skill does NOT modify any files
- **Fail fast**: If the target is invalid, stop immediately

---

## Step 1: Resolve the Target

If `$ARGUMENTS` is provided, treat it as a name to look up. If not provided, use AskUserQuestion to prompt.

---

## Step 2: Process

Read the target file and print a summary.

---

## Step 3: Done

Print "Complete." and stop.

## Examples

**Basic usage:**
```
/test-good-skill my-item
```
