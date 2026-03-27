# Cookbook Conventions

Rules for working with content in this repository. Drop this file into your project's `.claude/` directory.

## File Format

- Every `.md` file MUST have YAML frontmatter with: id (UUID), title, domain, type, version, status, language, created, modified, author, copyright, license, summary, platforms, tags, depends-on, related, references
- All frontmatter fields are required. Use empty list `[]` when no values apply.
- `version` follows semver. Once on main, a version is immutable — changes require a bump.
- `status` values: draft, review, accepted, deprecated
- `type` values: principle, guideline, recipe, workflow, reference
- `domain` MUST match the file's path (validated at build time)
- Every file ends with a Change History table

## Naming

- All filenames use kebab-case: `file-tree-browser.md`
- Domain identifiers are derived from the file path: `cookbook/guidelines/testing/test-pyramid.md` → `cookbook.guidelines.testing.test-pyramid`
- Never reuse a retired path
- No numeric prefixes — the path IS the hierarchy
- Names describe what the thing IS, not what it does

## Cross-References

- Reference other content by domain in backticks: "See `cookbook.guidelines.testing.test-pyramid`"
- `depends-on` = read this first. `related` = see also. `references` = external URLs.

## Keywords

- Use RFC 2119: MUST / MUST NOT (absolute), SHOULD / SHOULD NOT (recommended), MAY (optional)

## Template Variables

- Use `{{placeholder}}` tokens for consumer-specific values (app name, bundle ID, API URLs)
- Never hardcode app-specific values

## Design Decisions

- Surface all choices that affect behavior or structure
- Record in a Design Decisions section: Decision, Rationale, Approved (yes/pending)

## Full Reference

See `cookbook/conventions.md` for detailed explanations, rationale, and standards alignment.
