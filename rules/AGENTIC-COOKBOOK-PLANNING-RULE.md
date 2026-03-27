# Agentic Cookbook Planning Rule

You are planning a feature, fix, or change. You MUST follow every step below. Do not skip steps. Do not abbreviate. Do not proceed to implementation until this process is complete and the user has approved the plan.

---

## Step 1: Read the Principles

Read ALL of the following files before making any design decisions:

```
cookbook/principles/simplicity.md
cookbook/principles/make-it-work-make-it-right-make-it-fast.md
cookbook/principles/yagni.md
cookbook/principles/fail-fast.md
cookbook/principles/dependency-injection.md
cookbook/principles/immutability-by-default.md
cookbook/principles/composition-over-inheritance.md
cookbook/principles/separation-of-concerns.md
cookbook/principles/design-for-deletion.md
cookbook/principles/explicit-over-implicit.md
cookbook/principles/small-reversible-decisions.md
cookbook/principles/tight-feedback-loops.md
cookbook/principles/manage-complexity-through-boundaries.md
cookbook/principles/principle-of-least-astonishment.md
cookbook/principles/idempotency.md
cookbook/principles/native-controls.md
cookbook/principles/open-source-preference.md
cookbook/principles/meta-principle-optimize-for-change.md
```

You MUST NOT produce a plan without reading these files first. Every design decision in the plan MUST be traceable to one or more principles.

---

## Step 2: Search for Existing Recipes

Search `cookbook/recipes/` recursively for any recipe that matches or partially matches the feature being planned.

- Check `cookbook/recipes/ui/component/` for UI building blocks
- Check `cookbook/recipes/ui/panel/` for content panes
- Check `cookbook/recipes/ui/window/` for top-level layouts
- Check `cookbook/recipes/infrastructure/` for non-visual patterns
- Check `cookbook/recipes/app/` for application lifecycle patterns

**If a matching recipe exists**: the plan MUST incorporate it. The implementation MUST conform to the recipe's requirements, states, appearance, and test vectors. Do not deviate from the recipe without user approval.

**If a partial match exists**: note what the recipe covers and what is missing. Ask the user whether to extend the existing recipe or proceed without it.

**If no match exists**: record this explicitly — "No existing recipe found for this feature."

---

## Step 3: Run the Guideline Checklist

Read `cookbook/workflow/guideline-checklist.md`. Evaluate every item:

1. **"Always" items**: Note them as applicable. Do not ask. These are non-negotiable.
2. **"Opt-in" items**: Inform the user they will be included. Ask for confirmation or opt-out.
3. **"Opt-out" items**: Ask the user if they want to opt in.
4. **"Ask" items**: Ask the user the prompt template question from the checklist.

Present ALL items in a single consolidated prompt grouped by category. Do not ask one at a time. Record all decisions.

Also read `cookbook/guidelines/general.md` for the full guideline details and `cookbook/guidelines/INDEX.md` for the complete guideline index.

---

## Step 4: Evaluate Recipe Opportunities

You MUST explicitly answer both questions:

1. **Can this feature become a new cookbook recipe?** If the feature implements a reusable UI pattern, infrastructure pattern, or workflow that other projects could use, propose creating a new recipe. Reference `cookbook/recipes/_template.md` for the format.

2. **Can this feature enhance an existing cookbook recipe?** If an existing recipe is close but missing something this feature adds, propose updating the recipe.

Record the answers in the plan under a "Recipe Opportunities" section. If neither applies, write: "No recipe opportunities identified."

---

## Step 5: Produce the Plan

The plan MUST include all of the following sections:

1. **Summary**: One paragraph — what will be built and why.
2. **Principles applied**: List which principles are most relevant to this plan and how they shaped the design. Do not list all 18 — list the ones that actively influenced decisions.
3. **Recipe conformance**: Which recipes the implementation will follow, or "None."
4. **Files**: List of files to create, modify, or delete with brief notes on each.
5. **Architecture**: Key design decisions, patterns, dependency flow.
6. **Guideline decisions**: The opt-in/opt-out matrix from Step 3.
7. **Test strategy**: What will be tested, at which level, key test cases.
8. **Recipe opportunities**: From Step 4.
9. **Risks**: Known risks, unknowns, areas likely to need iteration.

The plan MUST be concrete enough that another developer or AI session could execute it without follow-up questions.

---

## Step 6: Get Approval

Present the plan to the user. Do not proceed to implementation until the user explicitly approves. If the user requests changes, update the plan and re-present it.

---

## What You MUST NOT Do

- Do not skip reading the principles because "this is a small task." Every task gets the full process.
- Do not skip the recipe search because "it's probably not there." Search every time.
- Do not skip the guideline checklist because "we did it last time." Every planning session starts fresh.
- Do not produce a plan that contradicts the principles without explicitly calling out the conflict and getting user approval.
- Do not propose creating new utilities, abstractions, or patterns when suitable ones already exist in the codebase. Reuse first.

---

## Reference: Full Workflow Detail

For the complete planning workflow with conformance test vectors and edge cases, read `cookbook/workflow/code-planning.md`.
