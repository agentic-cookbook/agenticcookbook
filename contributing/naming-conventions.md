# Naming Conventions

How identifiers, files, and directories are named in this repository. These conventions apply to recipes, guidelines, and workflows.

## Path-Derived Domain Identifiers

All items in this repository use **path-derived domain identifiers** — the filesystem path IS the unique identity. No separate ID field, no numeric prefixes. This follows the industry-standard broad-to-specific hierarchical naming pattern used by Go modules, Java packages, Maven coordinates, and Apple Bundle IDs.

### Why This Approach

Flat numbered identifiers (`SPEC-34`, `CG-1.7`) don't scale:
- Numbers are arbitrary and meaningless to readers
- Fixed number ranges fill up (1-9 for a category that grows to 50)
- A flat directory becomes unnavigable past ~30 items
- No natural place for new categories

Path-derived domains solve all of these:
- Self-describing: `recipe.ui.panel.file-tree-browser` tells you what it is
- Infinite namespace: new subcategories are just new folders
- Browsable: the directory structure IS the taxonomy
- Stable: paths don't change once established

### References

- **Go modules**: Slash-separated paths map 1:1 to filesystem. `github.com/gorilla/mux` is both the import path and the directory. See [Go Module Layout](https://go.dev/doc/modules/layout).
- **Java packages**: Reverse-DNS with dots mapping to directories. `com.google.common.collect` → `com/google/common/collect/`. See [Java Package Naming](https://docs.oracle.com/javase/tutorial/java/package/namingpkgs.html).
- **Maven coordinates**: `groupId:artifactId:version` where groupId maps to directory path. See [Maven Naming Conventions](https://maven.apache.org/guides/mini/guide-naming-conventions.html).
- **Apple Bundle IDs**: Reverse-DNS identifiers (`com.apple.Safari`). See [Apple UTI Concepts](https://developer.apple.com/library/archive/documentation/FileManagement/Conceptual/understanding_utis/understand_utis_conc/understand_utis_conc.html).
- **RFC 8141 (URNs)**: Persistent, location-independent identifiers with hierarchical namespaces. See [RFC 8141](https://datatracker.ietf.org/doc/html/rfc8141).

### Design Principles (from industry research)

1. **Broad-to-specific ordering**: Every major system except DNS uses this. DNS is universally reversed when adapted for human use.
2. **Separator maps to filesystem**: Slash in paths, dot in domain notation. Colon is excluded (illegal in filenames on macOS/Windows).
3. **Version as metadata, not in the name**: Version lives in frontmatter, not the filename or domain (per Maven, npm, Go convention).
4. **Bounded fan-out**: No single directory should exceed ~50-100 items. If it does, introduce a sub-level.
5. **Human-readable leaf names**: The final segment is descriptive (`file-tree-browser`, not `spec-0042`).
6. **Stable identifiers**: Never reuse a path. If a file is removed, its path is retired.

## Recipes

Recipes live in `recipes/` and describe UI components, panels, windows, infrastructure patterns, and app-level behaviors.

### Domain Derivation

1. Start from the `recipes/` directory
2. Replace `/` with `.`
3. Drop the `.md` extension
4. Prepend `recipe.`

| File path | Domain |
|-----------|--------|
| `recipes/ui/component/empty-state.md` | `recipe.ui.component.empty-state` |
| `recipes/ui/panel/file-tree-browser.md` | `recipe.ui.panel.file-tree-browser` |
| `recipes/ui/window/project-window.md` | `recipe.ui.window.project-window` |
| `recipes/infrastructure/logging.md` | `recipe.infrastructure.logging` |
| `recipes/app/lifecycle.md` | `recipe.app.lifecycle` |

### Current Categories

| Path prefix | Purpose |
|------------|---------|
| `recipes/ui/component/` | Leaf UI building blocks |
| `recipes/ui/panel/` | Content panes that compose into windows |
| `recipes/ui/window/` | Top-level window layouts |
| `recipes/infrastructure/` | Non-visual patterns (persistence, sync, logging) |
| `recipes/app/` | App lifecycle, menus, commands |

### Adding New Recipes

Place the file in the appropriate category folder. If no folder fits, create a new subcategory. Update `recipes/INDEX.md` and the CLAUDE.md recipe domain table.

**File naming**: Use kebab-case. Name describes what the thing **is**, not what it does: `status-bar.md` not `show-progress.md`.

### Cross-Referencing

Use the domain in backticks: "See `recipe.ui.panel.file-tree-browser`"

## Guidelines

Guidelines live in `guidelines/` and describe coding rules, engineering principles, and platform-specific conventions.

### Domain Derivation

1. Start from the `guidelines/` directory
2. Replace `/` with `.`
3. Drop the `.md` extension
4. Prepend `guide.`

| File path | Domain |
|-----------|--------|
| `guidelines/core/general/atomic-commits.md` | `guide.core.general.atomic-commits` |
| `guidelines/core/principles/simplicity.md` | `guide.core.principles.simplicity` |
| `guidelines/language/swift/logging.md` | `guide.language.swift.logging` |
| `guidelines/domain/testing/test-pyramid.md` | `guide.domain.testing.test-pyramid` |
| `guidelines/platform/windows/fluent-design.md` | `guide.platform.windows.fluent-design` |

### Current Categories

| Path prefix | Purpose |
|------------|---------|
| `guidelines/core/general/` | Universal rules that apply to all projects |
| `guidelines/core/principles/` | Engineering principles with sources |
| `guidelines/language/swift/` | Swift / SwiftUI / AppKit |
| `guidelines/language/kotlin/` | Kotlin / Compose / Ktor |
| `guidelines/language/typescript/` | TypeScript / React / Web |
| `guidelines/language/python/` | Python conventions |
| `guidelines/language/csharp/` | C# / .NET |
| `guidelines/platform/windows/` | Windows / WinUI 3 |
| `guidelines/domain/ui/` | Cross-platform UI design |
| `guidelines/domain/networking/` | Client-server networking |
| `guidelines/domain/security/` | Application security |
| `guidelines/domain/testing/` | Testing principles and tools |
| `guidelines/domain/specs/` | Spec writing format |
| `guidelines/reference/best-practices/` | External reference links |

### Cross-Referencing

Use the domain in backticks: "See `guide.core.general.atomic-commits`"

Use wildcards for category references: "See `guide.core.principles.*`"

## Workflows

Workflows live in `workflow/` and use `WF-` numbering (a simpler scheme since there are only 5). If workflows grow significantly, they may adopt the same path-derived domain pattern.

| ID | File |
|----|------|
| WF-1 | `workflow/branching-strategy.md` |
| WF-2 | `workflow/code-planning.md` |
| WF-3 | `workflow/code-implementation.md` |
| WF-4 | `workflow/code-verification.md` |
| WF-5 | `workflow/code-review.md` |

## General File Naming Rules

- **kebab-case** for all filenames: `file-tree-browser.md`, not `fileTreeBrowser.md`
- **Descriptive leaf names**: The filename describes what the thing is
- **No numeric prefixes**: The path provides the hierarchy, not a number
- **`.md` extension** for all specs, guidelines, and workflows
- **`_template.md`** for template files (underscore prefix sorts them first)
- **`INDEX.md`** for directory indexes (uppercase sorts them visibly)
