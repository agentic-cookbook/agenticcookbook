---
id: 328D96C6-20DE-495E-8977-733441B97F81
title: "Recipe Formatting Compliance"
domain: agentic-cookbook://compliance/artifact-formatting/recipe-formatting
type: compliance
version: 1.0.0
status: draft
language: en
created: 2026-04-04
modified: 2026-04-04
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Structural formatting checks for recipe artifacts — the most detailed artifact type with ~15 required sections."
platforms: []
tags:
  - compliance
  - artifact-formatting
  - recipe
depends-on:
  - agentic-cookbook://introduction/conventions
related:
  - agentic-cookbook://compliance/artifact-formatting/principle-formatting
  - agentic-cookbook://compliance/artifact-formatting/guideline-formatting
references: []
---

# Recipe Formatting Compliance

Recipes are concrete, detailed specs for UI components, panels, windows, infrastructure patterns, and autonomous dev bots. They are the most structured artifact type — every recipe follows a consistent section order so that agents and humans can navigate them predictably.

## Applicability

This category applies to any file with `type: recipe` in its frontmatter. All files in `recipes/` (and its subdirectories) MUST have this type, except `_template.md`.

## Section Order

Recipes MUST follow this section order. Optional sections (marked MAY) can be omitted entirely but MUST NOT appear out of order.

1. YAML frontmatter
2. `# Title`
3. `## Overview`
4. `## Behavioral Requirements`
5. `## Appearance`
6. `## States`
7. `## Accessibility`
8. `## Conformance Test Vectors`
9. `## Edge Cases`
10. `## Deep Linking` (MAY omit)
11. `## Localization` (MAY omit)
12. `## Accessibility Options` (MAY omit)
13. `## Feature Flags` (MAY omit)
14. `## Analytics` (MAY omit)
15. `## Privacy` (MAY omit)
16. `## Logging`
17. `## Platform Notes`
18. `## Design Decisions`
19. `## Compliance`
20. `## Change History`

## Checks

### rf-frontmatter-complete

All required YAML frontmatter fields MUST be present per `introduction/conventions.md`.

**Applies when:** always.

**Required fields:** id, title, domain, type, version, status, language, created, modified, author, copyright, license, summary, platforms, tags, depends-on, related, references.

**Guidelines:**
- [Conventions](agentic-cookbook://introduction/conventions)

---

### rf-type-field

The `type` field MUST be `recipe`.

**Applies when:** always.

---

### rf-title-heading

The first H1 heading MUST match the frontmatter `title` field exactly.

**Applies when:** always.

---

### rf-overview

The recipe MUST have a `## Overview` section with a brief description of what the component is and when to use it.

**Applies when:** always.

---

### rf-behavioral-requirements

The recipe MUST have a `## Behavioral Requirements` section containing named requirements using RFC 2119 keywords. Requirements use kebab-case names in bold: `**must-do-something**: Component MUST ...`

**Applies when:** always.

**Guidelines:**
- [Conventions](agentic-cookbook://introduction/conventions)

---

### rf-appearance

The recipe MUST have a `## Appearance` section defining visual properties: corner radius, padding, font, background, foreground, border, shadow, and size constraints.

**Applies when:** UI recipes (components, panels, windows). MAY be omitted for infrastructure recipes.

---

### rf-states

The recipe MUST have a `## States` section with a table defining visual state changes (default, pressed, disabled, focused, loading, etc.).

**Applies when:** UI recipes with interactive states. MAY be omitted for infrastructure recipes.

---

### rf-accessibility

The recipe MUST have a `## Accessibility` section defining: role/trait, label requirements, state change announcements, and minimum tap target size.

**Applies when:** always. Infrastructure recipes define accessibility as "not applicable" with justification.

---

### rf-test-vectors

The recipe MUST have a `## Conformance Test Vectors` section with a table containing columns: ID, Requirements, Input, Expected. Each test vector maps to one or more named requirements from `## Behavioral Requirements`.

**Applies when:** always.

---

### rf-edge-cases

The recipe MUST have a `## Edge Cases` section describing boundary conditions, error states, and unexpected input scenarios.

**Applies when:** always.

---

### rf-logging

The recipe MUST have a `## Logging` section defining: subsystem, category, and a table of log events with columns: Event, Level, Message.

**Applies when:** always.

**Guidelines:**
- [Structured Logging](agentic-cookbook://guidelines/logging/structured-logging)

---

### rf-platform-notes

The recipe MUST have a `## Platform Notes` section with per-platform implementation guidance. At minimum: SwiftUI, Compose, React/Web.

**Applies when:** always. Single-platform recipes list only the target platform.

---

### rf-design-decisions

The recipe MUST have a `## Design Decisions` section. Each decision follows the format: **Decision**: Description. **Rationale**: Why. **Approved**: yes | pending.

**Applies when:** always. New recipes start with an empty section; decisions are added as they arise.

---

### rf-compliance

The recipe MUST have a `## Compliance` section with a table containing columns: Check, Status, Category. Status values: `passed`, `failed`, `partial`. Each check links to its definition in the relevant compliance category file.

**Applies when:** always.

**Guidelines:**
- [Compliance INDEX](agentic-cookbook://compliance/INDEX)

---

### rf-change-history

The file MUST end with a `## Change History` section containing a table with columns: Version, Date, Author, Summary.

**Applies when:** always.

**Guidelines:**
- [Conventions](agentic-cookbook://introduction/conventions)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-04-04 | Mike Fullerton | Initial creation |
