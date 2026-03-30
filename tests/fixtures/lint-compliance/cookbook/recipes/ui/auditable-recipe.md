---
id: c2222222-2222-2222-2222-222222222222
title: "Toggle Switch"
domain: agentic-cookbook://recipes/ui/auditable-recipe
type: recipe
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "A toggle switch component with on/off states and accessibility."
platforms:
  - swift
  - kotlin
  - web
tags:
  - ui
  - toggle
depends-on: []
related: []
references: []
---

# Toggle Switch

## Overview

A toggle switch for binary on/off settings.

## Behavioral Requirements

- **tap-toggles-state**: Toggle MUST switch between on and off states on tap.
- **announce-state**: Toggle MUST announce its current state to screen readers.

## Appearance

- **Width**: 52pt
- **Height**: 32pt
- **Corner radius**: 16pt (pill shape)
- **Background on**: Brand primary
- **Background off**: Gray 300

## States

| State | Appearance change |
|-------|------------------|
| Off | Gray background, thumb left |
| On | Primary background, thumb right |
| Disabled | Opacity 0.4 |

## Accessibility

- Role: switch
- Label: Setting name
- Value: on/off
- Minimum tap target: 44x44pt

## Conformance Test Vectors

| ID | Requirements | Input | Expected |
|----|-------------|-------|----------|
| tog-001 | tap-toggles-state | Tap off toggle | State becomes on |
| tog-002 | announce-state | Focus toggle | Screen reader announces state |

## Edge Cases

- Rapid toggling should not produce inconsistent state
- Toggle in a scrollable list should not conflict with scroll gestures

## Compliance

| Check | Status | Category |
|-------|--------|----------|
| [screen-reader-support](agentic-cookbook://compliance/accessibility#screen-reader-support) | passed | Accessibility |
| [keyboard-navigable](agentic-cookbook://compliance/accessibility#keyboard-navigable) | passed | Accessibility |
| [unit-test-coverage](agentic-cookbook://compliance/best-practices#unit-test-coverage) | passed | Best Practices |

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
