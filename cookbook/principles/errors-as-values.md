---
id: 51e1f37a-919e-4e42-b439-ffdf0c2ef2e8
title: "Errors as values"
domain: agentic-cookbook://principles/errors-as-values
type: principle
version: 1.0.0
status: accepted
language: en
created: 2026-06-09
modified: 2026-06-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Represent expected, recoverable failures as values so failure paths show up in signatures and must be handled."
platforms: []
tags:
  - errors-as-values
  - error-handling
depends-on: []
related:
  - agentic-cookbook://principles/fail-fast
  - agentic-cookbook://principles/explicit-over-implicit
  - agentic-cookbook://principles/parse-dont-validate
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-06-09"
---

# Errors as values

Represent expected, recoverable failures as values in the type system — `Result`/`Either`, sealed error types — so that failure paths appear in function signatures and the compiler forces every caller to handle them. Reserve exceptions and panics for truly unrecoverable conditions. This makes the failure surface visible and exhaustiveness-checkable instead of hidden in control flow.

- Expected vs exceptional: model recoverable outcomes (not-found, validation-failed, conflict) as returned values; let exceptions signal bugs and unrecoverable states.
- Put the failure in the signature: a function that can fail should say so in its return type, not through an undeclared throw a caller can't see.
- Choose a boundary policy deliberately and keep it consistent per layer: Rust `Result`, Go explicit error returns, Kotlin sealed `Result`, Swift `Result`/`throws`, TypeScript Result-style libraries.
- Never swallow: log-and-continue, a silent `null`, or a default that masks failure is the documented failure mode — propagate or handle explicitly.
- Complements the wire format: HTTP error responses (RFC 9457) describe failure on the wire; this principle governs how failure is represented *in code*.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-09 | Mike Fullerton | Initial creation |
