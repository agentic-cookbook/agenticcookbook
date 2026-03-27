---
id: 098af491-bb61-48b2-b98b-4a4cf4099c1d
title: "Flaky Test Prevention"
domain: cookbook.guidelines.testing.flaky-test-prevention
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Flaky tests destroy confidence. Quarantine them immediately — fix or delete, never ignore."
platforms: 
  - typescript
  - web
tags: 
  - flaky-test-prevention
  - testing
depends-on: []
related: []
references: 
  - https://martinfowler.com/articles/nonDeterminism.html
  - https://testing.googleblog.com/
---

# Flaky Test Prevention

Flaky tests destroy confidence. Quarantine them immediately — fix or delete, never ignore.

**Rules:**
- No shared mutable state between tests (each test arranges its own)
- No dependency on test execution order
- No real network calls in unit tests (use fakes or stubs)
- No `sleep()` or timing-dependent assertions — use deterministic waits or callbacks
- No filesystem side effects in unit tests (use temp directories, clean up in teardown)
- No reliance on system clock — inject time as a dependency
- If a test fails intermittently, it is broken. Treat it as a P1 bug.

References:
- [Martin Fowler: Eradicating Non-Determinism in Tests](https://martinfowler.com/articles/nonDeterminism.html)
- [Google Testing Blog: Flaky Tests](https://testing.googleblog.com/)

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
