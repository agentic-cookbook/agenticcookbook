# Agentic Cookbook Implementing Rule

You are implementing from an approved plan. You MUST follow every step below. Do not skip steps. Do not take shortcuts. Do not deviate from the plan without user approval.

---

## Step 1: Confirm Prerequisites

Before writing any code, verify:

1. You have an **approved plan** from the planning phase. If not, stop and run the planning process first.
2. You have the **guideline decisions** (opt-in/opt-out matrix) from the plan. If not, stop and ask.
3. If the plan references a recipe, you have **read the recipe file** in full. If not, read it now from `cookbook/recipes/`.

---

## Step 2: Read the Applicable Guidelines

Read the following files:

```
cookbook/guidelines/general.md                    (core guidelines — always apply)
cookbook/workflow/guideline-checklist.md           (the checklist with your opt-in/opt-out decisions)
```

For every "Always" guideline and every opted-in guideline, you MUST apply it to every relevant file you write. No exceptions. No "I'll add it later."

---

## Step 3: Follow the Three-Phase Discipline

Read `cookbook/principles/make-it-work-make-it-right-make-it-fast.md`. Then execute in order:

### Phase 1: Make It Work

- Implement the **core functionality** — the happy path that makes the feature work for the common case.
- Write **unit tests alongside code** — not after. For each function or method, write the test before or immediately after writing the implementation. Do not accumulate untested code.
- Apply ALL "Always" guidelines and ALL opted-in guidelines during this phase. If logging was opted in, every component gets logging now, not later. If accessibility was opted in, every view gets accessibility attributes now, not later.
- **Build and run tests** after each logical unit. Do not accumulate broken state.
- **Commit** after each meaningful change — one function with its test, one file completed, one logical unit delivered.
- Defer edge cases, error handling refinements, and optimizations to Phase 2.

### Phase 2: Make It Right

You MUST NOT skip this phase. Do not go directly from "it works" to "ship it."

- Handle **edge cases** identified in the plan and any discovered during Phase 1.
- Add **error handling** appropriate to each boundary: user input validation, network errors, missing data fallbacks.
- **Refactor for clarity** — apply separation of concerns, clean up naming, ensure readability. Read these principles and apply them:
  - `cookbook/principles/separation-of-concerns.md`
  - `cookbook/principles/explicit-over-implicit.md`
  - `cookbook/principles/fail-fast.md`
  - `cookbook/principles/design-for-deletion.md`
- Add **tests for every edge case and error path** added in this phase.
- Review the code for **guideline compliance** — verify all opted-in concerns are addressed.

### Phase 3: Make It Fast (Conditional)

You MUST NOT enter this phase unless there is **evidence** of a performance problem. Evidence means: a test with measurable latency, a user report of slowness, or a known algorithmic concern (e.g., O(n^2) with large n).

- If optimization is warranted, **measure before and after**. State the metric, baseline, and target.
- Optimizations MUST NOT sacrifice correctness or readability without explicit user approval.
- Add **performance tests or benchmarks** for any optimization.
- If there is no evidence of a performance problem, skip this phase entirely.

---

## Step 4: Recipe Conformance

If implementing from a cookbook recipe:

- The implementation MUST match the recipe's **behavioral requirements** (REQ-NNN). Every MUST requirement is mandatory. Every SHOULD is expected unless you have a documented reason to deviate.
- The implementation MUST match the recipe's **states** — every state in the states table must be implemented.
- The implementation MUST match the recipe's **appearance** values — use the exact dimensions, colors, fonts, and spacing specified.
- The implementation MUST pass the recipe's **conformance test vectors** — write tests that correspond to each test vector row.
- The implementation MUST include the recipe's **logging** messages exactly as specified.
- The implementation MUST address the recipe's **edge cases**.
- The implementation MUST implement the recipe's **accessibility** requirements.

Do not improvise. Do not skip sections. Do not substitute your judgment for the recipe's specifications. If you believe the recipe is wrong, stop and tell the user.

---

## Step 5: Run Verification

After implementation is complete, run the full verification process. Read `cookbook/workflow/code-verification.md` for the detailed checklist. At minimum:

1. **Build** passes on all target platforms.
2. **All tests pass** — unit, integration, and any E2E tests.
3. **Linting** is clean — no warnings, no suppressions added.
4. **Logging** matches the recipe's Logging section (if applicable) — compare character by character.
5. **Accessibility** verified — screen reader labels present, keyboard navigation works, Dynamic Type responds.
6. **Guidelines met** — review every opted-in guideline against the implementation.

Do not mark the work as complete until verification passes.

---

## Step 6: Evaluate Recipe Contribution

After implementation, explicitly evaluate:

1. **Does this implementation reveal a reusable pattern** not currently in the cookbook? If yes, propose a new recipe. Note what it would cover and which other projects could use it.
2. **Does this implementation enhance an existing recipe?** If the implementation adds behavior, states, or platform support not in the recipe, propose updating the recipe.

Record the evaluation. If nothing applies, write: "No recipe contributions identified."

---

## What You MUST NOT Do

- Do not deviate from the approved plan without user approval. Minor deviations (renamed function, extra parameter) MAY proceed with a note in the commit message. Major deviations (different architecture, new dependencies, scope change) MUST return to planning.
- Do not skip Phase 2 (Make It Right). Ever. The temptation to ship after "it works" is strong. Resist it.
- Do not skip writing tests. Tests are a deliverable, not an afterthought. Every function gets a test. Every edge case gets a test.
- Do not add code that is not in the plan or requested by the user. No "bonus" features, no refactoring unrelated code, no "improvements" outside scope.
- Do not skip guideline application because "it's just a small file." Every file gets every applicable guideline.
- Do not suppress linter warnings. Fix the underlying issue.
- Do not mark verification as passing if any check fails. Fix the failure first.

---

## Reference: Principles to Keep in Mind

These principles apply throughout implementation. You do not need to re-read them if you read them during planning, but you MUST apply them:

| Principle | File | Key Rule |
|-----------|------|----------|
| Simplicity | `cookbook/principles/simplicity.md` | No interleaving of concerns |
| YAGNI | `cookbook/principles/yagni.md` | Build for today's requirements only |
| Fail Fast | `cookbook/principles/fail-fast.md` | Detect invalid state at origin |
| DI | `cookbook/principles/dependency-injection.md` | Receive dependencies from outside |
| Immutability | `cookbook/principles/immutability-by-default.md` | Default to immutable values |
| Composition | `cookbook/principles/composition-over-inheritance.md` | Compose, don't inherit |
| Separation | `cookbook/principles/separation-of-concerns.md` | One reason to change per module |
| Explicit | `cookbook/principles/explicit-over-implicit.md` | No hidden behavior |
| Deletion | `cookbook/principles/design-for-deletion.md` | Easy to remove |
| Least Astonishment | `cookbook/principles/principle-of-least-astonishment.md` | Behavior matches expectations |
| Native Controls | `cookbook/principles/native-controls.md` | Platform built-in first |
| Open Source | `cookbook/principles/open-source-preference.md` | Proven libraries before custom |

## Reference: Full Workflow Detail

For the complete implementation workflow with conformance test vectors and edge cases, read `cookbook/workflow/code-implementation.md`.
