---
id: d3333333-3333-3333-3333-333333333333
title: "Progress Bar"
domain: agentic-cookbook://recipes/ui/guidance-recipe
type: recipe
version: 1.0.0
status: draft
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "A progress bar showing completion percentage."
platforms:
  - swift
  - web
tags:
  - ui
  - progress
depends-on: []
related: []
references: []
---

# Progress Bar

## Overview

A horizontal bar that shows task completion from 0% to 100%.

## Behavioral Requirements

- **show-percentage**: Bar MUST visually represent the current progress percentage.
- **animate-changes**: Bar SHOULD animate smoothly when progress updates.

## Appearance

- **Height**: 8pt
- **Corner radius**: 4pt
- **Background**: Gray 200
- **Fill**: Brand primary color

## States

| State | Appearance change |
|-------|------------------|
| Empty | No fill |
| Partial | Fill proportional to percentage |
| Complete | Full fill, optional checkmark |

## Accessibility

- Role: progressbar
- Value: Current percentage
- Label: Task description

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
