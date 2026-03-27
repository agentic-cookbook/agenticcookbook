# GUIDE-14.9. Flaky Test Prevention

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
