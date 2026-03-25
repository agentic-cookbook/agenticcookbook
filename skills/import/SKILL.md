---
name: litterbox-import
version: 1
description: Explore a repo, extract reusable components into litterbox specs, and improve existing specs with discovered patterns
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash(git log *), Bash(ls *), Agent, Write, Edit
argument-hint: [path to repo to analyze]
---

# Litterbox Import

You are analyzing an existing codebase to discover reusable UI components, patterns, and recipes that should be extracted into the litterbox spec library. You also compare what you find against existing litterbox specs to identify improvements or new options.

## Inputs

The user will provide a **repo path** to analyze (e.g., `../temporal`, `../Whippet`). If not provided, assume the current working directory.

## Process

### Phase 1: Discover existing litterbox specs

Read `../litterbox/CLAUDE.md` to understand the rules and spec format. Then scan `../litterbox/ui/` and `../litterbox/ui/Recipes/` to build an inventory of existing specs.

### Phase 2: Explore the target repo

Launch up to 3 Explore agents in parallel to analyze the target repo. Each agent focuses on a different aspect:

**Agent 1 — UI Components**
Search for reusable UI components: custom views, controls, buttons, inputs, cards, dialogs, sheets, navigation patterns. Look for:
- SwiftUI `View` structs, `ViewModifier`s, `ButtonStyle`s
- Compose `@Composable` functions, custom `Modifier`s
- React components (`.tsx` files in `components/` directories)
- Anything that looks like a design system or shared UI kit

For each component found, note:
- File path and name
- What it does (one sentence)
- Which platforms it exists on
- How polished/reusable it is (quick hack vs production-quality)
- Whether it matches an existing litterbox spec

**Agent 2 — Recipes and Flows**
Search for multi-component flows and patterns: settings screens, onboarding flows, auth flows, list/detail patterns, navigation structures, modal presentations, error handling patterns. Look for:
- View controllers / screens / pages that compose multiple components
- Navigation patterns (tab bars, sidebars, split views)
- Data flow patterns (loading → content → error states)
- Common UI recipes that appear across the app

**Agent 3 — Infrastructure Patterns**
Search for cross-cutting patterns: feature flag usage, analytics events, debug panels, logging patterns, dependency injection setup, localization approach, accessibility implementation. Look for:
- How the app handles feature flags (if at all)
- Analytics event tracking patterns
- Localization approach (hardcoded strings vs i18n)
- Accessibility implementation quality
- Error handling patterns

### Phase 3: Compare and categorize

Categorize findings into three buckets:

#### A. New specs to create
Components or recipes found in the repo that have **no matching litterbox spec**. These are candidates for extraction. For each:
- Describe the component/recipe
- Assess reusability (is this app-specific or genuinely reusable?)
- Note which platforms it currently exists on
- Draft the spec name and a one-line description

#### B. Improvements to existing specs
Components found in the repo that **match an existing litterbox spec** but the repo's implementation has features, patterns, or options the spec doesn't cover. For each:
- Name the existing spec
- Describe what the repo does differently or better
- Propose specific additions to the spec (new REQ-NNN, new states, new platform notes)

#### C. New options for existing specs
Variations or configurations discovered in the repo that suggest an existing spec should support **options or variants**. For example:
- A button that sometimes shows an icon and sometimes doesn't → spec should document icon as an option
- A settings window that uses tabs instead of a sidebar on some platforms → spec should document both layouts
- A component that has a compact and expanded mode → spec should define both modes

### Phase 4: Present findings

Present a structured report to the user:

```
# Litterbox Import: [Repo Name]

Analyzed: [repo path]
Platform(s): [detected platforms]
Components found: [count]
Recipes found: [count]

## A. New Specs to Create

### 1. [Component Name]
- **Found in**: [file path(s)]
- **Description**: [what it does]
- **Platforms**: [which platforms it exists on]
- **Reusability**: High / Medium / Low
- **Proposed spec**: `ui/[name].md`

### 2. ...

## B. Improvements to Existing Specs

### 1. [Existing Spec Name] (`ui/[name].md`)
- **Found in**: [file path(s)]
- **What's different**: [description]
- **Proposed changes**:
  - Add REQ-NNN: [new requirement]
  - Add state: [new state]
  - Update platform notes: [detail]

### 2. ...

## C. New Options for Existing Specs

### 1. [Existing Spec Name] (`ui/[name].md`)
- **Variation found**: [description]
- **Proposed option**: [how to parameterize it in the spec]

### 2. ...

## Recommendations

[Prioritized list of which specs to create or update first, based on reusability and how many projects would benefit]
```

### Phase 5: Act on approvals

After presenting findings, ask the user which items to act on. For approved items:

- **New specs**: Create the spec file in `../litterbox/ui/` or `../litterbox/ui/Recipes/` using the template format, pre-populated with what was learned from the repo's implementation.
- **Improvements**: Edit the existing spec file to add new requirements, states, or platform notes. Bump the version.
- **New options**: Edit the existing spec file to document the option/variant. Bump the version.

For each change, commit per Rule 7 (small, atomic commits).

## Important Notes

- Focus on **genuinely reusable** components, not app-specific one-offs. A "UserProfileCard" is app-specific; a "DetailCard" with configurable layout is reusable.
- When assessing reusability, consider: would at least 2 of the user's projects benefit from this spec?
- Don't propose extracting components that are trivially simple (a single `Text` with styling). Focus on components with meaningful behavior, state, or composition.
- When finding improvements, verify the repo's approach is actually better — not just different. Check against the best practices references.
- Respect the existing spec format: frontmatter, REQ-NNN, RFC 2119 keywords, test vectors, logging section, etc.
