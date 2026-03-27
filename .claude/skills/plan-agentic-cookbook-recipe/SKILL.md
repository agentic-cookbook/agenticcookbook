---
name: plan-agentic-cookbook-recipe
version: 2.0.0
description: Interactively design a new cookbook recipe through guided discussion
disable-model-invocation: true
context: fork
allowed-tools: Read, Glob, Grep, Agent, Write, Edit, AskUserQuestion
argument-hint: [recipe-name] [--version]
---

# Plan Agentic Cookbook Recipe v2.0.0

## Startup

**First action**: If the argument is `--version`, print `plan-agentic-cookbook-recipe v2.0.0` and stop.

Otherwise, print `plan-agentic-cookbook-recipe v2.0.0` as the first line of output, then proceed.

## Overview

You are guiding the user through designing a new recipe for the agentic cookbook. This is a conversational, interactive process — you ask questions, propose options, surface design decisions, and ultimately produce a complete recipe file.

**ABSOLUTE RULE: NO IMPLEMENTATION CODE.** This skill produces recipe markdown files only. Never write Swift, Kotlin, TypeScript, or any other implementation code.

## Before starting

1. Read `${CLAUDE_SKILL_DIR}/references/section-guide.md` for authoring guidance
2. Read the recipe template at `cookbook/recipes/_template.md`
3. Read `CLAUDE.md` and `cookbook/conventions.md` for format rules
4. Scan existing recipes: recursively list `cookbook/recipes/`

## Phase 1: Discovery & Discussion

This phase is conversational. Ask questions, don't assume.

### Step 1: Identify the recipe

If the user provided a recipe name in the arguments, start there. Otherwise ask: "What component or feature do you want to create a recipe for?"

### Step 2: Check for overlap

Search existing recipes for anything similar:
- Grep recipe filenames and Overview sections for related keywords
- If a similar recipe exists, tell the user: "There's an existing recipe `{name}` that covers {description}. Should we extend that one, or is this genuinely different?"

### Step 3: Categorize the recipe

Determine the category based on what the user is describing:

- **UI Component** (`cookbook/recipes/ui/component/{name}.md`): A single reusable UI element — a button, a status bar, a toggle. Self-contained building block.
- **UI Panel** (`cookbook/recipes/ui/panel/{name}.md`): A content pane that composes components — a settings pane, a detail view, an inspector.
- **UI Window** (`cookbook/recipes/ui/window/{name}.md`): A top-level window layout — a settings window, a project window, a main window.
- **Infrastructure** (`cookbook/recipes/infrastructure/{name}.md`): Non-visual patterns — directory sync, window frame persistence, state management.
- **App** (`cookbook/recipes/app/{name}.md`): Application lifecycle — menus, startup, onboarding flows.

Ask if unclear. Default to UI Component unless the user describes something that composes multiple pieces or is non-visual.

### Step 4: Walk through each section

For each recipe section, have a brief focused discussion. Don't try to cover everything at once — go section by section.

**Overview** — "In one or two sentences, what does this component do and when would you use it?"

**Behavioral Requirements** — "What are the hard rules? What MUST this component do? What SHOULD it do? What MAY it optionally do?"
- Propose requirements as you understand them, numbered REQ-001, REQ-002, etc.
- Use RFC 2119 keywords: MUST (required), SHOULD (recommended), MAY (optional)
- After proposing, ask: "Does this capture the requirements? Anything missing or wrong?"

**Appearance** — "What does it look like?"
- Offer to sketch an ASCII mockup if it's a visual component
- Ask about: dimensions, colors, fonts, spacing, corner radius, shadows
- For recipes: ask about layout (split view? tabs? stack?)

**States** — "What states can it be in?"
- Propose a states table based on the requirements discussion
- Common states: default, pressed, disabled, focused, loading, error, empty

**Platforms** — "Which platforms does this target?"
- Default to all platforms unless the user specifies otherwise
- For each platform, ask if there are platform-specific considerations
- Propose native control equivalents where they exist (see cookbook/principles/native-controls.md)

**Dependencies** — "Does this compose or depend on other cookbook recipes?"
- Check the existing recipe inventory
- For composite recipes: identify which component recipes are used

**Edge Cases** — "What could go wrong? What are the boundary conditions?"
- Propose edge cases based on the requirements (empty data, very long text, RTL, rapid interaction)

**Accessibility** — "How should this work with VoiceOver/TalkBack/keyboard?"
- Propose accessibility requirements based on the component type (see cookbook/guidelines/general.md — Accessibility from day one)
- Include: roles, labels, keyboard navigation, Dynamic Type support

**Logging** — "What events should be logged?"
- Propose log events based on the requirements and state transitions (see cookbook/guidelines/general.md — Instrumented logging)
- Use the standard format: subsystem `{{bundle_id}}`, category matching component name

**All remaining sections** — For Deep Linking, Localization, Accessibility Options, Feature Flags, Analytics, Privacy: propose sensible defaults and ask if the user wants to customize. Many components will use the template defaults.

### Step 5: Surface design decisions

Throughout the discussion, whenever you make a choice (icon selection, layout approach, animation style, default value), explicitly flag it:

> **Design Decision**: I'm proposing {X} because {Y}. Is that the right call?

Record all decisions for the Design Decisions section.

## Phase 2: Draft the recipe

Once the discussion is complete:

1. Determine the filename based on the category from Step 3:
   - UI Component: `cookbook/recipes/ui/component/{kebab-case-name}.md`
   - UI Panel: `cookbook/recipes/ui/panel/{kebab-case-name}.md`
   - UI Window: `cookbook/recipes/ui/window/{kebab-case-name}.md`
   - Infrastructure: `cookbook/recipes/infrastructure/{kebab-case-name}.md`
   - App: `cookbook/recipes/app/{kebab-case-name}.md`

2. Write the complete recipe file with ALL 17 sections:
   - Frontmatter: id (UUID), domain (path-derived), type recipe, version 1.0.0, status draft, language en, today's date for created/modified, author (user's name or claude-code), copyright "YYYY Mike Fullerton", license MIT, summary, platforms, tags, depends-on, related, references
   - Every section from the template populated from the discussion
   - No empty sections — if a section doesn't apply, include it with "Not applicable — {reason}"
   - All requirements numbered REQ-NNN with RFC 2119 keywords
   - Conformance test vectors linked to REQ-NNN
   - Logging messages per instrumented logging guidelines (see cookbook/guidelines/general.md)
   - `{{placeholder}}` tokens for app-specific values

3. Read the file back to verify completeness.

## Phase 3: Verification & Commit

1. **Completeness check**: Verify every section is present and populated. No TODOs or placeholder text.
2. **Requirement count**: Summarize: "This recipe has N requirements (X MUST, Y SHOULD, Z MAY), N test vectors, N log events."
3. **Dependency check**: Verify all referenced recipes exist in the cookbook repo.
4. **Format check**: Verify frontmatter is valid YAML, requirement numbering is sequential, test vector IDs are unique.
5. **Present summary**: Show the user a brief overview of what was created.
6. **Commit**: Commit the new recipe with message: "Add {name} recipe\n\n{one-line description}"

## Important notes

- **This is a conversation, not a form.** Don't dump all questions at once. Go section by section, propose drafts, and refine.
- **Propose, then refine.** For each section, offer your best draft based on what you've learned, then let the user adjust.
- **Check the native controls principle (cookbook/principles/native-controls.md).** If the component maps to a native platform control, note it. The recipe should say "use the native control" and document the configuration, not reinvent it.
- **Recipes are for LLMs.** The primary consumer is an LLM implementing the recipe. Be precise, concrete, and unambiguous. Use exact values, not vague descriptions.
- **Design Decisions are first-class.** Every subjective choice needs to be surfaced, approved, and recorded. This ensures cross-platform consistency.
