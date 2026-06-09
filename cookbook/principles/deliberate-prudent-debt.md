---
id: c41a4778-69df-4142-9b36-bafe28a6d363
title: "Deliberate, prudent technical debt"
domain: agentic-cookbook://principles/deliberate-prudent-debt
type: principle
version: 1.0.0
status: draft
language: en
created: 2026-06-09
modified: 2026-06-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "Trading rigor for speed is legitimate only when the choice is deliberate, recorded, and has a payback trigger."
platforms: []
tags:
  - technical-debt
depends-on: []
related:
  - agentic-cookbook://principles/yagni
  - agentic-cookbook://principles/design-for-deletion
  - agentic-cookbook://principles/make-it-work-make-it-right-make-it-fast
  - agentic-cookbook://principles/small-reversible-decisions
references: []
approved-by: ""
approved-date: ""
---

# Deliberate, prudent technical debt

Trading rigor for speed is legitimate — but only when the trade is *deliberate* and *prudent*: a conscious, recorded choice with a payback trigger, never reckless or silent. Take the shortcut on purpose, write down what you deferred and why, budget time to repay it, and keep the debt visible rather than letting quality decay unnoticed.

- Deliberate and prudent only: "ship the simple version now, revisit when X happens" is fine when it's written down; an undocumented shortcut nobody chose is reckless debt.
- Record it at the point of compromise: leave a tracked marker (debt register, issue, or a TODO that states the condition) naming the trigger that should prompt repayment.
- Budget repayment: allocate capacity each iteration to pay debt down; debt with no payback plan compounds into decay.
- Account for AI volume: agent-generated code can inflate duplication and churn faster than debt is repaid — size debt budgets against the volume produced, and prefer paying down before adding more.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-09 | Mike Fullerton | Initial creation |
