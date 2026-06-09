---
id: 2c605b36-da66-4eaf-b2d4-59ed5a3976b3
title: "Search for existing solutions before building"
domain: agentic-cookbook://guidelines/planning/code-quality/reuse-before-build
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-06-09
modified: 2026-06-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Before writing new code, check the platform, your existing dependencies, your own codebases, and proven open source — and verify any candidate dependency is real."
platforms: []
tags:
  - reuse
  - dependencies
  - research
depends-on: []
related:
  - agentic-cookbook://principles/open-source-preference
  - agentic-cookbook://principles/native-controls
  - agentic-cookbook://principles/dry
  - agentic-cookbook://guidelines/shipping/dependency-security
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-06-09"
triggers:
  - new-module
  - dependency-management
---

# Search for existing solutions before building

Agents tend to implement from scratch even when a solution already exists — sometimes inside a framework the project is already using. Before building non-trivial functionality, spend a moment to look for what already solves it.

## Look in this order

You MUST check these before writing a custom implementation, nearest first:

1. **The platform / standard library** — the language or OS may already provide it (see native-controls).
2. **Dependencies you already have** — the capability may already live in a library the project uses. Check before adding anything.
3. **Your own and shared codebases** — a sibling project or shared module may already implement it; reuse beats a parallel copy (see dry).
4. **Proven open source** — battle-tested libraries, evaluated per open-source-preference.

## Research before reinventing

- For non-trivial functionality you SHOULD take a moment to search the ecosystem — the package registry and code search (e.g. GitHub) — for prior art before implementing.
- If a library you already use *almost* does what you need, you SHOULD prefer extending it or contributing upstream over building a parallel implementation.

## Verify before adopting

- You MUST confirm a candidate package actually exists, is actively maintained, and is genuinely used before adding it. Do not install a package name an AI suggested without verifying it — hallucinated and typosquatted names ("slopsquatting") are a real supply-chain attack surface.
- You MUST weigh the dependency against building it: for trivial functionality, a little copying is better than taking on a dependency and its supply-chain and maintenance risk (see dependency-security).

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-09 | Mike Fullerton | Initial creation |
