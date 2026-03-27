---
id: 760b2e75-d0e4-4b20-a074-3342c2efe974
title: "Test Data"
domain: cookbook.guidelines.testing.test-data
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "**Construct what you need, per test.** Avoid large shared fixture files."
platforms: []
tags: 
  - test-data
  - testing
depends-on: []
related: []
references: []
---

# Test Data

**Construct what you need, per test.** Avoid large shared fixture files.

- **Builder pattern** or **factory functions** for complex objects — each test calls
  `makeOrder(status: .pending)` with only the fields it cares about, defaults for the rest
- **Property-based generators** (Hypothesis strategies, fast-check arbitraries) for
  comprehensive input coverage
- **Inline literals** for simple cases — `assert parse("hello") == "hello"` is clear
- **No magic fixtures** — if a test needs specific data, the data should be visible in the test
