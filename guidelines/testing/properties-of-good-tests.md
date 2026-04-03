---
id: d2c1aaaf-3fc7-4410-ab9a-06c264aa3208
title: "Properties of Good Tests"
domain: agentic-cookbook://guidelines/testing/properties-of-good-tests
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "From Kent Beck's Test Desiderata — tests should be:"
platforms: []
tags: 
  - properties-of-good-tests
  - testing
depends-on: []
related: []
references: []
---

# Properties of Good Tests

From Kent Beck's Test Desiderata — tests should be:

1. **Isolated** — no shared mutable state, no order dependency
2. **Composable** — can run any subset in any order
3. **Deterministic** — same result every time, no flakiness
4. **Fast** — milliseconds per unit test, seconds per integration test
5. **Writable** — easy to author, low ceremony
6. **Readable** — a failing test tells you what broke and why
7. **Behavioral** — test what the code does, not how it does it
8. **Structure-insensitive** — refactoring internals shouldn't break tests
9. **Automated** — no manual steps, no human judgment needed
10. **Specific** — a failure points to exactly one cause
11. **Predictive** — passing tests mean the code works in production
12. **Inspiring** — confidence to refactor and ship

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
