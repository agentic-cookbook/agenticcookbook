---
id: 34486fb8-8a0b-4538-a40a-13124155cd56
title: "Naming"
domain: cookbook.guidelines.language.csharp.naming
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "- `PascalCase` for types, methods, properties, public fields, constants, namespaces"
platforms: []
tags: 
  - csharp
  - language
  - naming
depends-on: []
related: []
references: []
---

# Naming

- `PascalCase` for types, methods, properties, public fields, constants, namespaces
- `camelCase` for parameters and local variables
- `_camelCase` (underscore prefix) for private instance fields
- `I` prefix for interfaces (e.g., `IDisposable`)
- `Async` suffix for async methods (e.g., `SaveAsync`)
- Constants use `PascalCase`, not `SCREAMING_SNAKE_CASE`
- Use `var` when the type is apparent from the right side of the assignment
