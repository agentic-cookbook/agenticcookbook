---
id: 42220186-4305-45cd-8e7d-a8d1172b6fbd
title: "Comprehensive unit testing"
domain: cookbook.guidelines.testing.testing
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Prioritize unit tests over integration tests. Test state transitions, edge cases, serialization round-trips. Every im..."
platforms: 
  - csharp
  - python
  - typescript
tags: 
  - testing
depends-on: []
related: []
references: 
  - https://fluentassertions.com/
  - https://nsubstitute.github.io/
  - https://playwright.dev/
  - https://xunit.net/
---

# Comprehensive unit testing

Prioritize unit tests over integration tests. Test state transitions, edge cases, serialization round-trips. Every implementation should include a corresponding test file. UI tests are fragile — prefer testing component logic as unit tests.

---

# Testing

Every change needs tests. Every bug fix needs a regression test. Prioritize unit tests over integration tests. Test state transitions, edge cases, and serialization round-trips. UI tests are fragile — prefer testing component logic as unit tests.

## TypeScript

Use [Playwright](https://playwright.dev/) for end-to-end and visual regression testing. Screenshot comparison for snapshot tests. Use Storybook for component catalog and visual tests where applicable.

## C#

1. [xUnit](https://xunit.net/) with `[Fact]` for single tests and `[Theory]`/`[InlineData]` for parameterized tests.
2. [FluentAssertions](https://fluentassertions.com/) for readable assertions.
3. [NSubstitute](https://nsubstitute.github.io/) for mocking.
4. Every change needs tests. Every bug fix needs a regression test.
5. Prioritize unit tests over integration tests.

```csharp
[Fact]
public void ParseOrder_WithValidInput_ReturnsOrder()
{
    var result = OrderParser.Parse(validJson);
    result.Should().NotBeNull();
    result.OrderId.Should().Be("ORD-123");
}

[Theory]
[InlineData("", false)]
[InlineData("valid@email.com", true)]
[InlineData("no-at-sign", false)]
public void IsValidEmail_ReturnsExpected(string input, bool expected)
{
    EmailValidator.IsValid(input).Should().Be(expected);
}
```

## Python

1. Use `pytest` for all tests.
2. Every change needs tests. Every bug fix needs a regression test.
3. Prioritize unit tests over integration tests.
4. Never remove or modify production dashboard data during testing — use demo port 9888, not production port 8888.
