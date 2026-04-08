# Agentic Cookbook

A structured knowledge base of principles, guidelines, ingredients, recipes, and workflows for AI-assisted multi-platform development.

## Purpose

The Agentic Cookbook is the foundation of the agentic-cookbook ecosystem. Written entirely in markdown with YAML frontmatter, it serves as the knowledge base consumed directly by AI agents (particularly Claude Code) to build complete, tested, accessible, secure applications across multiple platforms. Code built with the cookbook is "trusted" — complete, precise, consistent, verified, secure by default, accessible, tested, predictable, maintainable, native to each platform, incremental, documented, observable, and performant.

## Key Features

- 196+ markdown artifacts organized by type (principles, guidelines, ingredients, recipes, workflows)
- YAML frontmatter with UUID-based artifact identity, versioning, dependencies, and cross-references
- Named requirements using RFC 2119 keywords (MUST, SHOULD, MAY)
- 7 custom Claude Code skills for managing, linting, approving, and syncing artifacts
- TypeScript + Vitest test harness for skill validation

## Tech Stack

- **Content:** Markdown with YAML frontmatter
- **Validation:** TypeScript + Vitest
- **Platform:** Git-based, GitHub-hosted, consumed by Claude Code

## Status

Active development.

## Related Projects

- [Cookbook Web](../../cookbook-web/docs/project/description.md) — public website at agentic-cookbook.com
- [Dev Team](../../dev-team/docs/project/description.md) — multi-agent platform consuming the cookbook
- [Tools](../../tools/docs/project/description.md) — installable skills and rules for cookbook workflows
- [Roadmaps](../../roadmaps/docs/project/description.md) — feature planning and implementation system
