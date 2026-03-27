---
id: 7a3e1f2c-8b4d-4e6a-9c5f-1d2e3f4a5b6c
title: "Conventions"
domain: cookbook.conventions
type: reference
version: 1.0.0
status: accepted
language: en
created: 2026-03-27
modified: 2026-03-27
author: Mike Fullerton
copyright: 2026 Mike Fullerton
license: MIT
summary: "All conventions for file format, naming, cross-referencing, and authoring in this repository."
platforms: []
tags:
  - conventions
  - naming
  - frontmatter
  - format
depends-on: []
related: []
references:
  - https://datatracker.ietf.org/doc/html/rfc8141
  - https://go.dev/doc/modules/layout
  - https://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html
  - https://maven.apache.org/guides/mini/guide-naming-conventions.html
  - https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_conc/understand_utis_conc.html
  - https://semver.org
  - https://spdx.org/licenses/
  - https://www.dublincore.org/specifications/dublin-core/dces/
  - https://schema.org/CreativeWork
---

# Conventions

All conventions for file format, naming, cross-referencing, and authoring in this repository.

## File Format

Every markdown file starts with a YAML frontmatter block containing these fields:

```yaml
---
id: <uuid>
title: <human readable title>
domain: <path-derived identifier>
type: principle | guideline | recipe | workflow | reference
version: 1.0.0
status: draft | review | accepted | deprecated
language: en
created: YYYY-MM-DD
modified: YYYY-MM-DD
author: <name>
copyright: YYYY Mike Fullerton
license: MIT
summary: <one-line description for search and tooltips>
platforms: []
tags: []
depends-on: []
related: []
references: []
---
```

### Field Definitions

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | UUID, globally unique, stable across renames |
| `title` | Yes | Human-readable title |
| `domain` | Yes | Path-derived identifier (see Naming below). Validated against actual path at build time. |
| `type` | Yes | One of: `principle`, `guideline`, `recipe`, `workflow`, `reference` |
| `version` | Yes | Semver. Major for breaking changes, minor for new content, patch for clarifications. Immutable once on main — changes require a version bump. |
| `status` | Yes | `draft` (work in progress), `review` (ready for feedback), `accepted` (stable), `deprecated` (superseded) |
| `language` | Yes | BCP 47 language tag. Default: `en` |
| `created` | Yes | ISO 8601 date. Immutable after creation. |
| `modified` | Yes | ISO 8601 date. Updated on every change. |
| `author` | Yes | Primary author name |
| `copyright` | Yes | `YYYY Mike Fullerton` |
| `license` | Yes | SPDX license identifier. Default: `MIT` |
| `summary` | Yes | One-line description (~120 chars). Used in search results, tooltips, and index pages. |
| `platforms` | Yes | List of platforms this content applies to. Empty list `[]` if universal. Values: `swift`, `kotlin`, `typescript`, `csharp`, `python`, `windows`, `macos`, `ios`, `web` |
| `tags` | Yes | 1-5 lowercase tags for discoverability. Empty list `[]` if none. |
| `depends-on` | Yes | Domain identifiers of content that should be read first. Empty list `[]` if none. |
| `related` | Yes | Domain identifiers of related content ("see also"). Empty list `[]` if none. |
| `references` | Yes | External URLs referenced by this content. Empty list `[]` if none. |

### Change History

Every file ends with a Change History section:

```markdown
## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | YYYY-MM-DD | Name | Initial creation |
```

Each row corresponds to a version bump. Once a version is on main, it is immutable.

### Standards Alignment

This format is aligned with:
- **Dublin Core** (ISO 15836): `id` → `dc:identifier`, `title` → `dc:title`, `author` → `dc:creator`, `summary` → `dc:description`, `tags` → `dc:subject`
- **Schema.org CreativeWork**: `version`, `dateCreated`, `dateModified`, `creativeWorkStatus`, `keywords`
- **SPDX** (ISO/IEC 5962): `license` field uses SPDX identifiers
- **SemVer 2.0.0**: `version` field

## Naming

### Path-Derived Domain Identifiers

The filesystem path IS the unique identity. No separate ID field, no numeric prefixes.

**Derivation rules:**
1. Start from the content root directory (`cookbook/`)
2. Replace `/` with `.`
3. Drop the `.md` extension

| File path | Domain |
|-----------|--------|
| `cookbook/principles/simplicity.md` | `cookbook.principles.simplicity` |
| `cookbook/guidelines/testing/test-pyramid.md` | `cookbook.guidelines.testing.test-pyramid` |
| `cookbook/recipes/ui/panel/file-tree-browser.md` | `cookbook.recipes.ui.panel.file-tree-browser` |

**Why this approach** (based on industry research — Go modules, Java packages, Maven, Apple Bundle IDs, RFC 8141):
- Broad-to-specific ordering (the universal standard outside DNS)
- Separator maps to filesystem (slash in paths, dot in domain notation)
- Version as metadata, not in the name
- Bounded fan-out (no directory exceeds ~50-100 items)
- Human-readable leaf names
- Stable identifiers (never reuse a retired path)

### File Naming Rules

- **kebab-case** for all filenames: `file-tree-browser.md`
- **Descriptive names**: the filename describes what the thing **is**, not what it does
- **No numeric prefixes**: the path provides the hierarchy
- **`.md` extension** for all content files
- **`index.md`** for landing pages (lowercase)

### Cross-Referencing

Use the domain in backticks: "See `cookbook.guidelines.testing.test-pyramid`"

## RFC 2119 Keywords

Use RFC 2119 keywords for all behavioral requirements:

- **MUST** / **MUST NOT**: Absolute requirements.
- **SHOULD** / **SHOULD NOT**: Recommendations.
- **MAY**: Optional behavior.

## Template Variables

Content uses `{{placeholder}}` tokens for consumer-specific values. Never hardcode app-specific values.

| Variable | Example | Purpose |
|----------|---------|---------|
| `{{app_name}}` | `MyApp` | Application name (PascalCase) |
| `{{app_name_lower}}` | `myapp` | Application name (lowercase) |
| `{{org_package}}` | `company.myapp` | Package/bundle identifier root |
| `{{bundle_id}}` | `com.company.app` | Bundle/package identifier |
| `{{app_scheme}}` | `myapp` | URL scheme for deep links |
| `{{app_prefix}}` | `myapp` | Prefix for feature flag keys |
| `{{api_base_url}}` | `https://api.example.com` | Production API URL |
| `{{db_name}}` | `myapp.db` | Local database filename |

## Design Decisions

Any choice that affects behavior or structure must be explicitly noted and approved. Record approved decisions in the relevant file's **Design Decisions** section so all implementations stay consistent.

Format:
```markdown
**Decision**: Description of the choice.
**Rationale**: Why this choice was made.
**Approved**: yes | pending
```

## Change History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0.0 | 2026-03-27 | Mike Fullerton | Initial consolidation from 5 separate convention files |
