---
id: 59ffd7c7-2bdc-4f7b-b6f3-07d1f24599a3
title: "Unit Test Patterns"
domain: agentic-cookbook://guidelines/testing/unit-test-patterns
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "**Structure — Arrange, Act, Assert (AAA):**"
platforms: []
tags: 
  - testing
  - unit-test-patterns
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# Unit Test Patterns

**Structure — Arrange, Act, Assert (AAA):**

```
// Arrange — set up preconditions
// Act — call the method under test
// Assert — verify the result
```

**Rules:**
- One assertion concept per test (not one `assert` — one logical concept)
- No logic in tests — no `if`, `for`, `try/catch`, `switch`
- Test the public API, not internals — tests should survive refactoring
- Each test is independent — arrange its own state, don't rely on other tests

**Naming — use descriptive names that read as specifications:**
- `test_parse_order_with_valid_json_returns_order`
- `ParseOrder_WithMissingField_ThrowsValidationError`
- `"returns empty list when no results match"`

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
