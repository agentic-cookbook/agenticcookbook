---
name: review-with-agentic-cookbook-recipe
version: "1.0.1"
description: "Review an implementation against a specific cookbook recipe. Compares your code to the recipe's requirements, states, appearance, and test vectors."
argument-hint: "<recipe-path> [implementation-path]"
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash(wc *), Agent
context: fork
---

# Agentic Cookbook Recipe Review v1.0.1

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `review-with-agentic-cookbook-recipe v1.0.1` and stop — do not run the skill.

Otherwise, print `review-with-agentic-cookbook-recipe v1.0.1` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (1.0.1), print:

> ⚠ This skill is running v1.0.1 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Overview

You are reviewing an implementation against a specific cookbook recipe. You compare what was built to what the recipe says should be built, producing a conformance report showing which requirements pass, which fail, and what is missing.

## Usage

```
/review-with-agentic-cookbook-recipe ../agentic-cookbook/cookbook/recipes/ui/component/empty-state.md ./Sources/EmptyState/
/review-with-agentic-cookbook-recipe empty-state
```

## Step 1: Resolve Inputs

- `$0` is the recipe path. If it is a bare name (no `/`), search `../agentic-cookbook/cookbook/recipes/` recursively for `$0.md`. If not found, print an error listing the search paths tried and stop.
- `$1` is the implementation path. If empty, use the current working directory.
- If the implementation path contains no source files (*.swift, *.kt, *.tsx, *.ts, *.py, *.cs), print an error and stop.

## Step 2: Read the Recipe

Read the recipe file completely. Extract every section:

- **Behavioral requirements** (REQ-NNN) with their RFC 2119 keywords (MUST, SHOULD, MAY)
- **States table** — every row
- **Appearance values** — dimensions, colors, fonts, spacing
- **Conformance test vectors** — every row
- **Logging messages** — exact strings
- **Edge cases** — every item
- **Accessibility requirements** — every item

Print a header:

```
=== RECIPE REVIEW: <recipe-name> ===
Recipe: <path>
Implementation: <path>
Requirements: <count>
Test vectors: <count>
```

## Step 3: Read the Implementation

Read implementation files from `$1`. Use Glob to find source files matching `*.swift`, `*.kt`, `*.tsx`, `*.ts`, `*.py`, `*.cs`. Cap at 50 files — if more exist, prioritize files whose names match types referenced in the recipe. Note any truncation. Read each file.

## Step 4: Compare

For each recipe section, compare against the implementation:

**Requirements (REQ-NNN)**: For each requirement, determine if the implementation satisfies the described behavior. Mark PASS, FAIL, or PARTIAL.

**States**: For each state in the states table, check if the implementation handles it.

**Appearance**: Check if specified values (dimensions, colors, fonts, spacing) match.

**Test vectors**: Check if tests exist that correspond to each test vector row.

**Logging**: Compare logging messages character by character against the recipe's logging section.

**Edge cases**: Check if each edge case is handled.

**Accessibility**: Check if accessibility requirements are implemented.

## Step 5: Print the Report

```
--- REQUIREMENTS ---
[PASS] REQ-001: <description>
[FAIL] REQ-002: <description>
       -> <what's wrong and how to fix>
[PARTIAL] REQ-003: <description>
       -> <what's implemented vs what's missing>

--- STATES ---
[PASS] Default state: implemented
[FAIL] Error state: not found in implementation

--- APPEARANCE ---
[PASS] Corner radius: 12pt matches recipe
[FAIL] Padding: implementation uses 8pt, recipe specifies 12pt

--- TEST VECTORS ---
[PASS] comp-001: test exists at <test-file>
[FAIL] comp-002: no corresponding test found

--- LOGGING ---
[PASS] "ComponentName: appeared" — matches exactly
[FAIL] "ComponentName: action completed" — not found in implementation

--- EDGE CASES ---
[PASS] Empty data: handled at <file:line>
[FAIL] RTL layout: not addressed

--- ACCESSIBILITY ---
[PASS] VoiceOver label: present
[FAIL] Keyboard navigation: not implemented

=== CONFORMANCE SUMMARY ===
Pass: <n> | Fail: <n> | Partial: <n>
Coverage: <pass/(pass+fail+partial)>%

Top issues:
1. [FAIL] <most critical>
2. [FAIL] <next>
```

## Guards

- **Read-only** — do not modify any files.
- **Console only** — print the report to stdout; do not write report files.
- **50-file cap** — if more than 50 implementation files match, prioritize by recipe relevance and note the truncation.
