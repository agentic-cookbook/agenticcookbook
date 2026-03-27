---
id: 6b29562c-4185-4411-aa66-092206d6bfa5
title: "Guideline Applicability Checklist"
domain: cookbook.workflow.guideline-checklist
type: workflow
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "version: 1.0.0"
platforms: []
tags: 
  - guideline-checklist
depends-on: []
related: 
  - guide.core.general.ab-testing
  - guide.core.general.accessibility-from-day-one
  - guide.core.general.always-show-progress
  - guide.core.general.analytics
  - guide.core.general.comprehensive-unit-testing
  - guide.core.general.debug-mode
  - guide.core.general.deep-linking
  - guide.core.general.feature-flags
  - guide.core.general.instrumented-logging
  - guide.core.general.linting-from-day-one
  - guide.core.general.localizability
  - guide.core.general.no-blocking-the-main-thread
  - guide.core.general.post-generation-verification
  - guide.core.general.prefer-native-controls-and-libraries
  - guide.core.general.privacy-and-security-by-default
  - guide.core.general.respect-accessibility-display-options
  - guide.core.general.rtl-layout-support
  - guide.core.general.scriptable-and-automatable
  - guide.core.general.small-atomic-commits
  - guide.core.general.surface-all-design-decisions
  - guide.core.principles.dependency-injection
  - guide.core.principles.design-for-deletion
  - guide.core.principles.explicit-over-implicit
  - guide.core.principles.fail-fast
  - guide.core.principles.immutability-by-default
  - guide.core.principles.make-it-work-make-it-right-make-it-fast
  - guide.core.principles.separation-of-concerns
  - guide.core.principles.simplicity
  - guide.core.principles.yagni
  - guide.domain.testing.flaky-test-prevention
  - guide.domain.testing.mutation-testing
  - guide.domain.testing.properties-of-good-tests
  - guide.domain.testing.property-based-testing
  - guide.domain.testing.security-testing
  - guide.domain.testing.test-data
  - guide.domain.testing.test-pyramid
  - guide.domain.testing.the-testing-workflow
  - guide.domain.testing.unit-test-patterns
references: []
---

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

A shared checklist of all guide.* guidelines that Claude Code MUST evaluate for applicability during a development session. Each workflow recipe (WF-1 through WF-5) references this checklist rather than duplicating it. When guidelines change, only this file needs updating.

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
| guide.core.general.prefer-native-controls-and-libraries | Native controls | Prefer platform built-in frameworks | WF-3 |
| guide.core.general.surface-all-design-decisions | Surface design decisions | Note and get approval for all behavioral/structural choices | WF-2, WF-3 |
| guide.core.general.no-blocking-the-main-thread | No blocking main thread | All lengthy work on background threads | WF-3 |
| guide.core.general.small-atomic-commits | Small atomic commits | One logical change per commit | WF-1, WF-3 |
| guide.core.general.post-generation-verification | Post-generation verification | Build, test, lint, log verify, a11y audit, code review | WF-4 |
| guide.core.general.linting-from-day-one | Linting from day one | Linter configured, runs on build or pre-commit | WF-3, WF-4 |
| guide.core.principles.simplicity | Simplicity | No interleaving of concerns | WF-2, WF-3 |
| guide.core.principles.make-it-work-make-it-right-make-it-fast | Work, Right, Fast | Three sequential phases — never skip phase 2 | WF-3 |
| guide.core.principles.dependency-injection | Dependency injection | Receive dependencies from outside | WF-2, WF-3 |
| guide.core.principles.immutability-by-default | Immutability by default | Default to immutable values | WF-3 |
| guide.core.principles.fail-fast | Fail fast | Detect invalid state at point of origin | WF-3 |
| guide.core.principles.design-for-deletion | Design for deletion | Build disposable, not reusable | WF-2, WF-3 |
| guide.core.principles.yagni | YAGNI | Build for today's known requirements | WF-2, WF-3 |
| guide.core.principles.explicit-over-implicit | Explicit over implicit | Visible dependencies, clear intent | WF-3 |
| guide.core.principles.separation-of-concerns | Separation of concerns | One reason to change per module | WF-2, WF-3 |

### Testing (Always Apply)

Testing guidelines are always applicable when writing code. The scope and depth may vary based on the task.

| ID | Guideline | Summary | Workflow Phases |
|----|-----------|---------|-----------------|
| guide.core.general.comprehensive-unit-testing | Comprehensive unit testing | Prioritize unit tests, test state transitions and edge cases | WF-3, WF-4 |
| guide.domain.testing.test-pyramid | Test pyramid | 80% unit / 15% integration / 5% E2E | WF-2, WF-3 |
| guide.domain.testing.properties-of-good-tests | Properties of good tests | Isolated, deterministic, fast, behavioral, readable | WF-3, WF-4 |
| guide.domain.testing.unit-test-patterns | Unit test patterns | Arrange-Act-Assert, one concept per test | WF-3 |
| guide.domain.testing.flaky-test-prevention | Flaky test prevention | No shared state, no timing, no real network in unit tests | WF-3 |
| guide.domain.testing.test-data | Test data | Builder pattern, no magic fixtures | WF-3 |
| guide.domain.testing.the-testing-workflow | Testing workflow | Write tests alongside code, validate with mutation testing | WF-3, WF-4 |

### Opt-In Concerns (Ask the User)

These concerns apply to many but not all features. Claude Code MUST ask the user about each one during planning. The "Default" column indicates the starting assumption, but the user's answer overrides it.

| ID | Guideline | Summary | Default | Prompt Template | Workflow Phases |
|----|-----------|---------|---------|-----------------|-----------------|
| guide.core.general.always-show-progress | Show progress | Determinate or indeterminate progress for async work | Opt-in | "Does this feature involve async operations that need progress indication?" | WF-2, WF-3 |
| guide.core.general.instrumented-logging | Instrumented logging | Structured logging for all components and flows | Opt-in | "This feature will include structured logging per guide.core.general.instrumented-logging. Any components that should be excluded?" | WF-2, WF-3, WF-4 |
| guide.core.general.deep-linking | Deep linking | All significant views must be deep linkable | Ask | "Should the views in this feature be deep linkable?" | WF-2, WF-3 |
| guide.core.general.scriptable-and-automatable | Scriptable/automatable | Components scriptable via platform mechanisms | Opt-out | "Does this feature need scripting/automation support (Shortcuts, intents)?" | WF-2, WF-3 |
| guide.core.general.accessibility-from-day-one | Accessibility | Platform accessibility APIs from day one | Opt-in | "This feature will include full accessibility support. Any constraints?" | WF-2, WF-3, WF-4 |
| guide.core.general.localizability | Localizability | All user-facing strings localizable | Opt-in | "This feature will use localized strings. Confirm or opt out." | WF-2, WF-3 |
| guide.core.general.rtl-layout-support | RTL layout | Support right-to-left languages | Opt-in | "This feature will support RTL layouts. Confirm or opt out." | WF-2, WF-3 |
| guide.core.general.respect-accessibility-display-options | Accessibility display options | Respond to reduced motion, high contrast, etc. | Opt-in | "This feature will respect accessibility display options. Confirm or opt out." | WF-2, WF-3 |
| guide.core.general.privacy-and-security-by-default | Privacy/security | Data minimization, secure storage, no PII logging | Opt-in | "Does this feature collect, store, or transmit user data?" | WF-2, WF-3, WF-5 |
| guide.core.general.feature-flags | Feature flags | All features gated behind feature flags | Opt-in | "This feature will be gated behind a feature flag. Confirm or opt out." | WF-2, WF-3 |
| guide.core.general.analytics | Analytics | Significant user actions instrumented | Ask | "Which user actions in this feature should be tracked for analytics?" | WF-2, WF-3 |
| guide.core.general.ab-testing | A/B testing | Variant assignment support | Opt-out | "Does this feature need A/B testing / experimentation support?" | WF-2, WF-3 |
| guide.core.general.debug-mode | Debug mode | Debug panel entries for flags, analytics, experiments | Opt-in | "This feature will include debug panel entries. Confirm or opt out." | WF-2, WF-3 |
| guide.domain.testing.property-based-testing | Property-based testing | For parsers, serializers, data transformers | Ask | "Does this feature include data transformations that would benefit from property-based testing?" | WF-2, WF-3 |
| guide.domain.testing.mutation-testing | Mutation testing | Validate tests catch bugs | Ask | "Should we run mutation testing to validate test quality?" | WF-4 |
| guide.domain.testing.security-testing | Security testing | SAST, dependency scanning | Ask | "Should we run security scans (Semgrep, dependency audit)?" | WF-4 |

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

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
