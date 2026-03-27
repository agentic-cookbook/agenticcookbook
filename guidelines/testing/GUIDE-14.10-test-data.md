# GUIDE-14.10. Test Data

**Construct what you need, per test.** Avoid large shared fixture files.

- **Builder pattern** or **factory functions** for complex objects — each test calls
  `makeOrder(status: .pending)` with only the fields it cares about, defaults for the rest
- **Property-based generators** (Hypothesis strategies, fast-check arbitraries) for
  comprehensive input coverage
- **Inline literals** for simple cases — `assert parse("hello") == "hello"` is clear
- **No magic fixtures** — if a test needs specific data, the data should be visible in the test
