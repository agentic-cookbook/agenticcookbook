---
id: 3a6baa24-9bd3-45f8-aa6a-b32c61169ed3
title: "Value objects over primitive obsession"
domain: agentic-cookbook://guidelines/implementing/code-quality/value-objects
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-06-09
modified: 2026-06-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Wrap domain primitives that carry invariants in small immutable value objects so validation lives in one place and invalid instances cannot be constructed."
platforms: []
tags:
  - value-objects
  - types
  - code-quality
depends-on: []
related:
  - agentic-cookbook://principles/parse-dont-validate
  - agentic-cookbook://principles/immutability-by-default
  - agentic-cookbook://guidelines/implementing/security/input-validation
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-06-09"
triggers:
  - data-modeling
  - new-module
---

# Value objects over primitive obsession

Agents default to "stringly-typed" code — bare `string`, `int`, and `map` for things like `Email`, `Money`, `UserId`, and `Percentage`. Wrapping a domain primitive in a small immutable value object centralizes its validation and makes an invalid instance impossible to construct. The value object is the concrete form of *make illegal states unrepresentable*.

## When to introduce one

Introduce a value object when a primitive meets any of these (and not before — see yagni):

- It carries **invariants** (an email must be well-formed; a percentage is 0–100; money has a currency).
- It is **validated in more than one place** — the value object lets you validate once, at construction.
- It is **easily confused with another same-shaped primitive** (a `UserId` and an `OrderId` are both strings; the type stops you passing one where the other is meant).

A primitive with none of these does not need wrapping — over-wrapping every field fights simplicity.

## How to build one

- Validate at construction and reject invalid input there (parse, don't validate) — a constructed instance MUST be known-valid.
- Make it immutable with value equality (two value objects with the same contents are equal).
- Keep it small and focused on the single concept it represents.

## Per language

- Swift/Kotlin: a small `struct`/`data class` or value class wrapping the primitive.
- TypeScript: a branded type or a class with a private constructor + factory.
- Rust: a newtype (`struct Email(String)`) with a fallible constructor.
- Python: a frozen dataclass or a Pydantic type with validators.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-09 | Mike Fullerton | Initial creation |
