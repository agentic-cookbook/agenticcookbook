---
id: bef3dedc-bd3f-4158-ad52-adad1c2017d6
title: "The Testing Workflow"
domain: cookbook.guidelines.testing.the-testing-workflow
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "The recommended Claude Code testing workflow, combining all tools:"
platforms: 
  - python
  - swift
  - typescript
  - web
tags: 
  - testing
  - the-testing-workflow
depends-on: []
related: []
references: []
---

# The Testing Workflow

The recommended Claude Code testing workflow, combining all tools:

1. **Write implementation code**
2. **Write unit tests** — informed by property-based testing for data transformations
3. **Run tests** — `pytest` / `swift test` / `npm test` / `dotnet test`
4. **Validate test quality** — `mutmut run` / `npx stryker run` / `muter` / `dotnet stryker`
5. **Kill surviving mutants** — write additional tests targeting gaps
6. **Security scan** — `semgrep scan` + `bandit` / `pip-audit` / `npm audit`
7. **E2E verification** — Playwright for web UIs, platform test runners for native

This creates a closed loop: AI generates tests, deterministic tools validate those tests
actually catch bugs, AI writes more tests to close gaps.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial creation |
