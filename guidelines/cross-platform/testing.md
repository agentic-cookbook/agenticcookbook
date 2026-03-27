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
