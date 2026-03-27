# Guideline Applicability Checklist

---
version: 1.0.0
status: draft
created: 2026-03-27
last-updated: 2026-03-27
author: claude-code
copyright: 2026 Mike Fullerton / Temporal
audience: claude-code
scope: [planning, implementation, verification, review]
tags: [checklist, guidelines, cross-reference]
---

## Overview

A shared checklist of all GUIDE-x.y guidelines that Claude Code MUST evaluate for applicability during a development session. Each workflow recipe (WF-1 through WF-5) references this checklist rather than duplicating it. When guidelines change, only this file needs updating.

During the **Code Planning** phase (WF-2), Claude Code MUST walk through this checklist with the user, asking them to opt in or opt out of each applicable concern. The decisions are recorded and carried forward through implementation (WF-3), verification (WF-4), and review (WF-5).

## Terminology

| Term | Definition |
|------|-----------|
| Opt-in default | The concern is assumed applicable unless the user explicitly opts out |
| Opt-out default | The concern is assumed not applicable unless the user explicitly opts in |
| Ask | Claude Code MUST ask the user — no default assumption |
| Always | The concern is always applicable and cannot be opted out of |

## Checklist

### Core Engineering (Always Apply)

These guidelines are always applicable. Claude Code MUST follow them without asking. They cannot be opted out of.

| ID | Guideline | Summary | Workflow Phases |
|----|-----------|---------|-----------------|
| GUIDE-1.1 | Native controls | Prefer platform built-in frameworks | WF-3 |
| GUIDE-1.3 | Surface design decisions | Note and get approval for all behavioral/structural choices | WF-2, WF-3 |
| GUIDE-1.4 | No blocking main thread | All lengthy work on background threads | WF-3 |
| GUIDE-1.7 | Small atomic commits | One logical change per commit | WF-1, WF-3 |
| GUIDE-1.8 | Post-generation verification | Build, test, lint, log verify, a11y audit, code review | WF-4 |
| GUIDE-1.21 | Linting from day one | Linter configured, runs on build or pre-commit | WF-3, WF-4 |
| GUIDE-2.1 | Simplicity | No interleaving of concerns | WF-2, WF-3 |
| GUIDE-2.2 | Work, Right, Fast | Three sequential phases — never skip phase 2 | WF-3 |
| GUIDE-2.4 | Dependency injection | Receive dependencies from outside | WF-2, WF-3 |
| GUIDE-2.5 | Immutability by default | Default to immutable values | WF-3 |
| GUIDE-2.6 | Fail fast | Detect invalid state at point of origin | WF-3 |
| GUIDE-2.8 | Design for deletion | Build disposable, not reusable | WF-2, WF-3 |
| GUIDE-2.9 | YAGNI | Build for today's known requirements | WF-2, WF-3 |
| GUIDE-2.10 | Explicit over implicit | Visible dependencies, clear intent | WF-3 |
| GUIDE-2.13 | Separation of concerns | One reason to change per module | WF-2, WF-3 |

### Testing (Always Apply)

Testing guidelines are always applicable when writing code. The scope and depth may vary based on the task.

| ID | Guideline | Summary | Workflow Phases |
|----|-----------|---------|-----------------|
| GUIDE-1.6 | Comprehensive unit testing | Prioritize unit tests, test state transitions and edge cases | WF-3, WF-4 |
| GUIDE-14.2 | Test pyramid | 80% unit / 15% integration / 5% E2E | WF-2, WF-3 |
| GUIDE-14.3 | Properties of good tests | Isolated, deterministic, fast, behavioral, readable | WF-3, WF-4 |
| GUIDE-14.4 | Unit test patterns | Arrange-Act-Assert, one concept per test | WF-3 |
| GUIDE-14.9 | Flaky test prevention | No shared state, no timing, no real network in unit tests | WF-3 |
| GUIDE-14.10 | Test data | Builder pattern, no magic fixtures | WF-3 |
| GUIDE-14.11 | Testing workflow | Write tests alongside code, validate with mutation testing | WF-3, WF-4 |

### Opt-In Concerns (Ask the User)

These concerns apply to many but not all features. Claude Code MUST ask the user about each one during planning. The "Default" column indicates the starting assumption, but the user's answer overrides it.

| ID | Guideline | Summary | Default | Prompt Template | Workflow Phases |
|----|-----------|---------|---------|-----------------|-----------------|
| GUIDE-1.5 | Show progress | Determinate or indeterminate progress for async work | Opt-in | "Does this feature involve async operations that need progress indication?" | WF-2, WF-3 |
| GUIDE-1.9 | Instrumented logging | Structured logging for all components and flows | Opt-in | "This feature will include structured logging per GUIDE-1.9. Any components that should be excluded?" | WF-2, WF-3, WF-4 |
| GUIDE-1.10 | Deep linking | All significant views must be deep linkable | Ask | "Should the views in this feature be deep linkable?" | WF-2, WF-3 |
| GUIDE-1.11 | Scriptable/automatable | Components scriptable via platform mechanisms | Opt-out | "Does this feature need scripting/automation support (Shortcuts, intents)?" | WF-2, WF-3 |
| GUIDE-1.12 | Accessibility | Platform accessibility APIs from day one | Opt-in | "This feature will include full accessibility support. Any constraints?" | WF-2, WF-3, WF-4 |
| GUIDE-1.13 | Localizability | All user-facing strings localizable | Opt-in | "This feature will use localized strings. Confirm or opt out." | WF-2, WF-3 |
| GUIDE-1.14 | RTL layout | Support right-to-left languages | Opt-in | "This feature will support RTL layouts. Confirm or opt out." | WF-2, WF-3 |
| GUIDE-1.15 | Accessibility display options | Respond to reduced motion, high contrast, etc. | Opt-in | "This feature will respect accessibility display options. Confirm or opt out." | WF-2, WF-3 |
| GUIDE-1.16 | Privacy/security | Data minimization, secure storage, no PII logging | Opt-in | "Does this feature collect, store, or transmit user data?" | WF-2, WF-3, WF-5 |
| GUIDE-1.17 | Feature flags | All features gated behind feature flags | Opt-in | "This feature will be gated behind a feature flag. Confirm or opt out." | WF-2, WF-3 |
| GUIDE-1.18 | Analytics | Significant user actions instrumented | Ask | "Which user actions in this feature should be tracked for analytics?" | WF-2, WF-3 |
| GUIDE-1.19 | A/B testing | Variant assignment support | Opt-out | "Does this feature need A/B testing / experimentation support?" | WF-2, WF-3 |
| GUIDE-1.20 | Debug mode | Debug panel entries for flags, analytics, experiments | Opt-in | "This feature will include debug panel entries. Confirm or opt out." | WF-2, WF-3 |
| GUIDE-14.5 | Property-based testing | For parsers, serializers, data transformers | Ask | "Does this feature include data transformations that would benefit from property-based testing?" | WF-2, WF-3 |
| GUIDE-14.6 | Mutation testing | Validate tests catch bugs | Ask | "Should we run mutation testing to validate test quality?" | WF-4 |
| GUIDE-14.8 | Security testing | SAST, dependency scanning | Ask | "Should we run security scans (Semgrep, dependency audit)?" | WF-4 |

## How to Use This Checklist

### During Code Planning (WF-2)

1. Claude Code reads this checklist
2. For each "Always" item: note it as applicable without asking
3. For each "Opt-in" item: inform the user it will be included, ask for confirmation or opt-out
4. For each "Opt-out" item: ask the user if they want to opt in
5. For each "Ask" item: ask the user the prompt template question
6. Record all decisions in the plan document

### During Code Implementation (WF-3)

1. Apply all "Always" items automatically
2. Apply all opted-in items from the planning phase
3. Skip all opted-out items
4. If a new concern surfaces during implementation, ask the user before proceeding

### During Code Verification (WF-4)

1. Verify all "Always" items are correctly implemented
2. Verify all opted-in items are correctly implemented
3. Confirm opted-out items were not accidentally included
4. Run applicable testing tools (mutation testing, security scanning) based on opt-in decisions

### During Code Review (WF-5)

1. Review against all applicable guidelines
2. Flag any opted-in items that appear missing or incomplete
3. Flag any guideline violations in "Always" items

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-27 | Initial checklist |
