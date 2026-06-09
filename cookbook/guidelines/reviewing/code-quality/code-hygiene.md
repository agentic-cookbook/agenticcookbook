---
id: 1b79f7dc-16c4-40d7-ab9d-d03449bf21dc
title: "Code hygiene: remove the old thing"
domain: agenticdevelopercookbook://guidelines/reviewing/code-quality/code-hygiene
type: guideline
version: 1.0.0
status: accepted
language: en
created: 2026-06-09
modified: 2026-06-09
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "When you replace or refactor code, delete what it supersedes. Leave no dead code, orphaned files, or commented-out blocks behind."
platforms: []
tags:
  - code-quality
  - refactoring
  - hygiene
depends-on: []
related:
  - agenticdevelopercookbook://principles/design-for-deletion
  - agenticdevelopercookbook://principles/yagni
  - agenticdevelopercookbook://guidelines/reviewing/code-quality/scope-discipline
  - agenticdevelopercookbook://principles/deliberate-prudent-debt
references: []
approved-by: "approve-artifact v1.0.0"
approved-date: "2026-06-09"
triggers:
  - code-review
  - pre-commit
---

# Code hygiene: remove the old thing

A change is not done until what it replaced is gone. Refactors that leave the old implementation alongside the new one, and edits that strand unreferenced code, are a recurring failure of AI-generated work ("deletion phobia"): redundancy rises and structure erodes turn over turn.

## Remove what this change supersedes

- When you replace an implementation, you MUST delete the one it replaces in the same change — do not leave the old and new versions side by side, or behind a flag that is permanently off.
- When you rename or move something, you MUST update or remove every reference; no path, import, or export may point at the thing that no longer exists.
- Commented-out code MUST be deleted, not left as a tombstone. Version control is the history.

## Leave no orphans

- Files, functions, exports, types, assets, and config that nothing references after your change MUST be removed.
- Dependencies that your change makes unused SHOULD be removed from the manifest.

## Stay within scope while cleaning

- You MUST remove only what *this* change superseded or orphaned. Pre-existing dead code unrelated to your task is out of scope: **note it** for the user (see scope-discipline) rather than deleting it.
- You MUST NOT delete code you do not understand or cannot confirm is unused — confirm with a reference search first.

## Why this matters

Orphaned and dead code misleads the next reader (human or agent), inflates context and review cost, and hides which path is live. Removing the old thing keeps the change reviewable and the codebase honest about what actually runs.

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-06-09 | Mike Fullerton | Initial creation |
