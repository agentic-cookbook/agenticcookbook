---
id: af8a4221-90b7-434f-b2a4-64c86a072386
title: "Nullable Reference Types"
domain: agentic-cookbook://guidelines/language/csharp/nullable-reference-types
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Enable `<Nullable>enable</Nullable>` in all projects. Treat warnings as design signals — `string` means non-null, `st..."
platforms: []
tags: 
  - csharp
  - language
  - nullable-reference-types
depends-on: []
related: []
references: []
approved-by: ""
approved-date: ""
---

# Nullable Reference Types

All projects MUST enable `<Nullable>enable</Nullable>`. Treat warnings as design signals — `string` means non-null, `string?` means nullable.

- The null-forgiving operator (`!`) SHOULD NOT be used — prefer `?? throw` or guard clauses
- Use `required` properties and constructor parameters for non-null initialization
- Use `[NotNull]`, `[MaybeNull]`, `[NotNullWhen]` from `System.Diagnostics.CodeAnalysis` for contracts the compiler cannot infer

```csharp
// Good: required + guard clause
public required string Name { get; init; }

public void Process(string? input)
{
    ArgumentNullException.ThrowIfNull(input);
    // input is now non-null
}
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
