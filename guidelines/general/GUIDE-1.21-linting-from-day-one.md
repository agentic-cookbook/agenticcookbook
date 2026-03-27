# GUIDE-1.21. Linting from day one

All projects MUST include linting configured from initial generation:

| Platform | Linter | Formatter |
|----------|--------|-----------|
| Swift | SwiftLint | swift-format |
| Kotlin | ktlint | ktlint |
| TypeScript | ESLint | Prettier |
| C# / .NET | Roslyn Analyzers + .editorconfig | dotnet format |

Linter config MUST be committed. Linting MUST run as part of the build or pre-commit process. Formatting MUST be auto-fixable.
