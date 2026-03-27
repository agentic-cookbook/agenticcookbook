# Linting and Formatting

All projects MUST include linting configured from initial generation. Linter config MUST be committed. Linting MUST run as part of the build or pre-commit process. Formatting MUST be auto-fixable.

## Swift

1. [SwiftLint](https://github.com/realm/SwiftLint) with `.swiftlint.yml` at project root. Enable `strict` mode. Add as SPM plugin or Xcode build phase.
2. [swift-format](https://github.com/swiftlang/swift-format) for auto-formatting.

## Kotlin

Use [ktlint](https://pinterest.github.io/ktlint/) for both linting and formatting. Configure via `.editorconfig` at project root. Add as a Gradle plugin (`org.jlleitschuh.gradle.ktlint`).

## TypeScript

1. [ESLint](https://eslint.org/) with `eslint.config.js`. Use `eslint-config-prettier` to avoid conflicts with the formatter.
2. [Prettier](https://prettier.io/) with `.prettierrc` for auto-formatting.
3. [Stylelint](https://stylelint.io/) with `.stylelintrc.json` for CSS linting.
4. Add as `package.json` scripts and pre-commit hooks.

## C#

1. [`.editorconfig`](https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/style-rules/) at repo root for all code style rules.
2. Enable Roslyn analyzers in `.csproj`:

```xml
<PropertyGroup>
  <EnforceCodeStyleInBuild>true</EnforceCodeStyleInBuild>
  <AnalysisLevel>latest-recommended</AnalysisLevel>
</PropertyGroup>
```

3. Use `dotnet format` CLI for auto-fixing.
4. Supplement with [Roslynator](https://github.com/dotnet/roslynator) or [Meziantou.Analyzer](https://github.com/meziantou/Meziantou.Analyzer) for additional rules.
