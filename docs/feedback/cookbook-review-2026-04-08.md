# Cookbook Principles & Guidelines — Feedback

**Date:** 2026-04-08
**Context:** Applied cookbook principles during personacreator visual generator build (~300 lines of code, 46 tests)

## What Worked Well

### Principles that caught real issues
- **Separation of Concerns** — Found shared data (`LAYER_DEFAULTS`) incorrectly housed in a specific provider module, and spec-building logic embedded in the CLI. Both would have caused pain at scale.
- **Dependency Injection** — `_generate()` was constructing providers internally from a name string. Would have made testing harder and violated the provider abstraction.
- **Immutability by Default** — Freezing input models (`PersonaDefinition`, `ComponentSpec`) prevents accidental mutation as data flows through the pipeline (mapper → spec builder → provider → compositor).
- **Make It Work, Make It Right, Make It Fast** — The sequential phasing was exactly right. Built working code first, then cleaned up. Trying to architect perfectly upfront would have slowed iteration without improving the outcome.

### Overall signal
The 19 principles caught 6 real issues in ~300 lines. High signal-to-noise ratio at the principle level.

## Suggested Improvements

### Linting timing
"Linting from day one" is right in spirit but slightly conflicts with "tight feedback loops." During initial build, committing working code rapidly and adding lint before the first PR is more practical than lint-gating every commit from the first line. Suggestion: clarify as "before the first PR" rather than "before the first commit."

### Guidelines volume
400+ rules across 16 categories is a lot of surface area. The principles (19 ideas) are the load-bearing part — easy to internalize. The guidelines layer risks becoming shelf-ware at this volume. A "top 10 guidelines that catch 80% of issues" shortlist might get more real-world adherence.

### Missing: AI/ML-specific guidance
Two gaps for projects that call external AI APIs:

1. **Observability into AI provider calls** — Structured logging of prompts sent, costs incurred, latencies, and failure modes. The existing "instrumented logging" guideline doesn't address the AI-specific angle (prompt tracking, token counts, cost attribution).

2. **Cost management for AI-powered systems** — When every function call costs $0.04–$0.08, code economics matter differently than traditional software. Caching isn't just a performance optimization — it's budget control. Rate limiting, cost caps, provider fallback strategies, and cost-per-request tracking deserve explicit guidance.

## Proposal: Tag-Based Guideline Filtering for AI Agents

### The core problem

With 400+ guidelines, the question isn't organization — it's **access pattern**. When should an agent check guidelines, and how does it know which ones matter for what it's doing right now?

A tree helps humans browse. But AI agents don't browse — they search. Going from "what am I doing?" to "what applies?" needs to happen in one step.

### What actually happened in this session

The agent that explored the cookbook brought back a summary of all principles and guidelines. Pattern-matching happened against code already written. The 19 principles did most of the work — they're abstract enough to apply everywhere. Guidelines only mattered during specific activities (writing tests, structuring imports, handling errors). Most of the 400+ guidelines were irrelevant noise for this particular task.

### Proposal: Trigger tags on every guideline

Add a `triggers` field to each guideline's frontmatter — the activity or context that makes it relevant:

```yaml
# Example guideline frontmatter
triggers:
  - writing-tests        # When writing or modifying tests
  - error-handling       # When adding try/except or error paths
  - new-module           # When creating a new file/module
  - api-integration      # When calling external APIs
  - data-modeling        # When defining types/schemas
  - pre-commit           # Before committing code
  - pre-pr               # Before opening a PR
```

### Usage pattern for AI agents

1. Agent knows what it's about to do (e.g., "add a new provider that calls an external API")
2. Agent queries by triggers: `api-integration` + `new-module` + `error-handling`
3. Agent gets ~15 relevant guidelines, not 400

This could be a simple CLI:
```
cookbook-check --triggers api-integration,new-module,error-handling
```

### Hybrid access: tree for humans, index for agents

```
cookbook/
├── guidelines/
│   ├── code-quality/        # Tree structure for human browsing
│   ├── testing/
│   ├── security/
│   └── ...
└── index/
    └── triggers.yaml        # Flat index: trigger → [guideline paths]
```

Humans browse the tree. Agents query the trigger index. Same guidelines, two access patterns.

### Escalating checkpoint pattern

For AI agents, the most valuable usage pattern is graduated:

1. **Principles** — always loaded into context (small, universal, load-bearing)
2. **Trigger-filtered guidelines** — loaded on demand based on current activity
3. **Pre-commit checklist** — a small mandatory set (~10 rules) checked before every commit
4. **Pre-PR audit** — a broader set checked once before opening a PR

This gives lightweight guardrails during active work and thorough review at natural checkpoints. The cost of checking is proportional to the stakes of the action.
