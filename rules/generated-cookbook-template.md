# Cookbook Rule (Generated)

This is the reference template for the generated rule file installed in consuming projects. `/import-cookbook` produces this file tailored to the project; `/configure-cookbook` regenerates it when preferences change. Sections marked [CONDITIONAL] are included or excluded based on project analysis.

---

## Ground Rules

1. **Confirm context** — verify you are in the correct project directory before making changes.
2. **Preserve existing work** — investigate unfamiliar content before overwriting. It may be in-progress work.
3. **No unauthorized changes** — fix only what was asked. Present suggestions, but do not act until approved.

## Principles

| Principle | Key Rule |
|-----------|----------|
| Simplicity | No interleaving of concerns. Simple beats easy. |
| Make It Work / Right / Fast | Three sequential phases. Never skip phase 2. |
| YAGNI | Build for today's requirements only. |
| Fail Fast | Detect invalid state at point of origin. |
| Dependency Injection | Receive dependencies from outside, not constructed internally. |
| Immutability | Default to immutable values; mutate only when necessary. |
| Composition over Inheritance | Compose small pieces over deep hierarchies. |
| Separation of Concerns | One reason to change per module. |
| Design for Deletion | Build disposable, not reusable. Every line is a maintenance liability. |
| Explicit over Implicit | Visible dependencies, clear intent, no hidden behavior. |
| Small Reversible Decisions | Cheap to reverse = decide fast. Expensive = invest first. |
| Tight Feedback Loops | Speed of feedback loop = speed of learning. |
| Manage Complexity Through Boundaries | Ports and adapters. Test core without externals. |
| Least Astonishment | Behavior matches what the name promises. |
| Idempotency | Safe to repeat without duplicate side effects. |
| Native Controls | Use platform built-in frameworks before custom implementations. |
| Open-Source Preference | Research battle-tested libraries before building custom. |
| Optimize for Change | Every principle serves making future change cheaper. |

For deeper context on a specific principle, read `../agentic-cookbook/cookbook/principles/<principle-name>.md`.

## Planning

Iterate through each concern in the guideline checklist one at a time. Do not evaluate all concerns at once.

Read `../agentic-cookbook/cookbook/workflow/guideline-checklist.md` for the full concern list.

**For each concern:**
1. Read the relevant guideline file from `../agentic-cookbook/cookbook/guidelines/`
2. Does this concern apply to the current task?
3. If yes — add to the plan with specifics (what, where, how)
4. If no — mark N/A, move on

**Pass order:**
- Passes 1–15: Core Engineering (always apply)
- Passes 16–22: Testing (always apply)
- Passes 23–38: Opt-in Concerns (ask the user per the checklist's prompt templates)

After all passes, trace key design decisions to the principles that informed them.

Plan three phases:
1. **Phase 1** — what constitutes "it works" (happy path)
2. **Phase 2** — edge cases, error handling, refactoring
3. **Phase 3** — under what evidence would optimization be warranted (if none, state "not anticipated")

<!-- [CONDITIONAL: Recipe search — included when show_recipe_prompts is not false] -->

Search `../agentic-cookbook/cookbook/recipes/` for recipes matching the planned feature. If found, ask the user whether to incorporate them.

<!-- [/CONDITIONAL] -->

## Implementation

Iterate through each applicable concern from the plan as a review pass against the code:

**For each applicable concern:**
1. Read the guideline file
2. Review the current code against that concern
3. If changes needed — make them, commit
4. Move to next concern

Execute in three phases:
- **Phase 1: Make It Work** — happy path, tests alongside code, commit after each unit
- **Phase 2: Make It Right** — edge cases, error handling, refactor. Do not skip.
- **Phase 3: Make It Fast** — only with measured evidence of a performance problem

<!-- [CONDITIONAL: Committing workflow — included when user opts in] -->

Use the structured git workflow: worktree, draft PR before code, commit after each logical change, push after each commit.

<!-- [/CONDITIONAL] -->

## Verification

After implementation:
1. **Build** passes with no errors
2. **Tests** pass — unit, integration, E2E
3. **Lint** is clean — no warnings, no added suppressions
4. **Guideline compliance** — every applicable concern from the plan is verified in the code

<!-- [CONDITIONAL: Auto-lint — included when project has .claude/skills/ or .claude/agents/] -->

After creating or modifying any skill, agent, or rule file, run the appropriate linter (`/lint-skill`, `/lint-agent`, `/lint-rule`) before marking work complete. Fix all FAIL items. Present WARN items to the user.

<!-- [/CONDITIONAL] -->

<!-- [CONDITIONAL: Contribution prompts — included when show_contribution_prompts is not false] -->

After implementation, evaluate whether any reusable pattern was created not covered by an existing recipe. If so, ask the user whether to contribute it back to the cookbook via `/contribute-to-cookbook`.

<!-- [/CONDITIONAL] -->

## MUST NOT

- Do not add scope beyond the approved plan
- Do not skip Phase 2 (Make It Right)
- Do not skip writing tests — tests are a deliverable
- Do not optimize without measured evidence of a problem
- Do not deviate from a recipe without user approval
- Do not apply guidelines partially — every applicable concern gets full treatment

## Reference

| Resource | Path |
|----------|------|
| Principles | `../agentic-cookbook/cookbook/principles/` |
| Guidelines | `../agentic-cookbook/cookbook/guidelines/` |
| Guideline checklist | `../agentic-cookbook/cookbook/workflow/guideline-checklist.md` |
| Recipes | `../agentic-cookbook/cookbook/recipes/` |
| Verification workflow | `../agentic-cookbook/cookbook/workflow/code-verification.md` |
| Preferences | `.claude/cookbook-preferences.json` |
