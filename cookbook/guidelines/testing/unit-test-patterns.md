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
