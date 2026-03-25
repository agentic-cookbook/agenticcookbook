---
name: litterbox-import
version: 3.1.0
description: Deep codebase analysis and component extraction — uses git history, Roadmaps, LSP, Swift compiler, pbxproj parsing, and code churn
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Bash(git *), Bash(ls *), Bash(wc *), Bash(xcodebuild *), Bash(swift *), Bash(swiftc *), Bash(cat *), Bash(plutil *), Bash(jq *), Bash(grep *), Bash(find *), Bash(awk *), Bash(gh *), Agent, Write, Edit, LSP
argument-hint: [path to repo to analyze] [--version]
---

# Litterbox Import v3.1.0

## Startup

**First action**: If the argument is `--version`, print `litterbox-import v3.1.0` and stop — do not run the skill.

Otherwise, print `litterbox-import v3.1.0` as the first line of output, then proceed.

## Overview

You are performing a deep analysis of an existing codebase to discover reusable UI components, patterns, and recipes for extraction into the litterbox spec library. This is a one-shot, maximum-depth analysis — use every tool available.

## Inputs

The user will provide a **repo path** to analyze (e.g., `../temporal`, `../Whippet`). If not provided, assume the current working directory.

## Critical lessons from v1

The first version of this skill was too shallow. It scanned file names and skimmed code, missing:
- **Feature bundles**: Related files (terminal + profiles + settings + session manager) that form a single extractable feature
- **Design intent**: Why features were built the way they were (found in Roadmaps and git history)
- **Configuration surfaces**: Settings, options, and flags that shape component behavior
- **Composition patterns**: How components call each other (revealed by LSP call hierarchy)

**The goal is not to list files — it's to discover the feature bundles and their complete surface area.**

## Process

### Phase 0: Project Context

Before looking at any code, understand the project.

1. Read `CLAUDE.md` and `README.md` (if they exist)
2. Auto-discover Roadmap files:
   - Check for `Roadmaps/` directory
   - Read ALL `*-Roadmap.md` and `*/Roadmap.md` files found there
   - Each Roadmap IS a documented feature with acceptance criteria, architecture decisions, and implementation steps — this is primary context
3. Run project structure commands:
   ```bash
   git log --oneline -50                              # Recent history
   git shortlog -s -n                                 # Contributors
   git log --all --format='%D' | grep -oP '[^ ,]+' | sort -u  # Branches
   ```
4. Detect platform and build system:
   - Check for `Package.swift` → run `swift package dump-package | head -100`
   - Check for `*.xcodeproj` → run `xcodebuild -project <path> -list`
   - Check for `build.gradle.kts` → Kotlin/Android
   - Check for `package.json` → Web/Node
5. Read the litterbox CLAUDE.md, template, and scan existing specs in `../litterbox/ui/` and `../litterbox/ui/Recipes/`

**Output of Phase 0**: A brief project profile — what it is, what platforms, what build system, what features are documented in Roadmaps.

### Phase 1: Structural Analysis

Quantitative analysis to identify what matters most.

Launch **3 parallel agents**:

**Agent 1 — Code Churn & History**
```bash
# Top 30 most-changed files (these are the important ones)
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -30

# File creation timeline (when features were added)
git log --diff-filter=A --name-only --format='--- %ai ---' | head -200

# Recent feature commits (grouped by message pattern)
git log --oneline -100

# Commit message patterns (PR refs, issue numbers, feature keywords)
git log --oneline --all | grep -iE '(feat|add|implement|create|build|fix|refactor)' | head -50
```

Identify: Which files are actively maintained? Which are stable/finished? Which are experimental?

**Agent 2 — Type Inventory & Project Structure**

Use LSP `workspaceSymbol` to get a complete type inventory:
- All `struct`s (especially those conforming to `View`)
- All `class`es (especially `ObservableObject`, `ViewModel`)
- All `protocol`s (interfaces/contracts)
- All `enum`s (state machines, configuration)

Group types by file and purpose. Identify: views, models, managers, providers, utilities.

If an `.xcodeproj` exists, parse the project file for file grouping:
```bash
# Convert pbxproj to JSON and extract file groups
plutil -convert json -o /tmp/proj.json <repo>/*.xcodeproj/project.pbxproj
jq '.objects | to_entries[] | select(.value.isa == "PBXGroup") | {name: .value.name, path: .value.path, children: .value.children}' /tmp/proj.json
```
File groups in Xcode often reflect intentional feature separation — a group named "Terminal" containing 5 files IS a bundle.

Also extract target membership to identify dead code:
```bash
jq '.objects | to_entries[] | select(.value.isa == "PBXSourcesBuildPhase") | .value.files' /tmp/proj.json
```

**Agent 3 — Dependency, Metrics & Infrastructure Audit**
```bash
# File sizes (complexity proxy)
find <repo> -name '*.swift' -o -name '*.kt' -o -name '*.tsx' -o -name '*.ts' | xargs wc -l | sort -rn | head -30

# Function count per file (complexity proxy)
for f in $(find <repo> -name '*.swift'); do echo "$(grep -c 'func ' $f) $f"; done | sort -rn | head -20

# Import/dependency analysis
grep -rn '^import ' <repo> --include='*.swift' | sort | uniq -c | sort -rn

# Settings/configuration surface
grep -rn '@AppStorage\|UserDefaults\|SharedPreferences\|localStorage' <repo> --include='*.swift' --include='*.kt' --include='*.ts' --include='*.tsx' | head -50

# Accessibility audit
grep -rn 'accessibilityLabel\|accessibilityValue\|accessibilityHint\|contentDescription\|aria-label' <repo> --include='*.swift' --include='*.kt' --include='*.tsx' | wc -l

# Localization audit
grep -rn 'NSLocalizedString\|String(localized\|strings\.xml\|i18n\|intl' <repo> --include='*.swift' --include='*.kt' --include='*.tsx' | wc -l

# Documentation comment coverage
grep -rn '/// ' --include='*.swift' <repo> | wc -l

# Test file discovery
find <repo> -name '*Tests.swift' -o -name '*Test.swift' -o -name '*Spec.swift'

# GitHub PR/issue history (if remote exists)
gh api repos/{owner}/{repo}/pulls?state=all&per_page=50 --jq '.[] | {number, title, merged_at}' 2>/dev/null
gh api repos/{owner}/{repo}/issues?state=all&per_page=50 --jq '.[] | {number, title, labels: [.labels[].name]}' 2>/dev/null
```

**Output of Phase 1**: Ranked list of important files, complete type inventory, pbxproj file groups, dependency map, complexity scores, configuration surface, infrastructure audit scores, test coverage map, PR/issue history.

### Phase 2: Feature Discovery

Deep, commit-aware feature identification.

**From Roadmaps** (primary source when available):
- Each Roadmap defines a feature with: goal, acceptance criteria, implementation steps, architecture decisions, verification strategy
- Map Roadmap steps to the files they touched (use `git log --all -- <file>` cross-referenced with Roadmap PR/issue numbers)
- The Roadmap's acceptance criteria become spec REQ-NNN candidates

**From git history** (when no Roadmaps):
- Group commits by feature using patterns: PR merge commits, issue references, branch names, commit message prefixes
- For each feature group, identify the implementing files
- Read the key commits to understand design intent

**From LSP call hierarchy**:
- For each major View/Screen type, use LSP `callHierarchy` (outgoing) to trace what it calls
- This reveals natural bundles: `ProjectWindowView` → `FileTreeView` → `DirectoryWatchCoordinator` → `FileSystemWatcher` + `FileTreeCache`
- The call graph IS the bundle graph

Launch **3 parallel agents** for feature analysis, each handling a subset of the identified features/areas.

### Phase 3: Deep Code Analysis

For each candidate feature bundle, read EVERY file fully. Do not skim.

For each file in the bundle:

**Code reading (mandatory):**
1. Read the complete source code — do NOT skim
2. Extract `///` documentation comments — these describe intent better than implementation

**Compiler-assisted analysis (Swift projects):**
3. Run `swiftc -print-ast <file>` to get precise declarations with access levels, conformances, and generics
4. Run `swiftc -scan-dependencies <file>` to get the import graph as JSON — reveals hidden dependencies (macros, link libraries)

**LSP analysis:**
5. Use LSP `findReferences` on the main public types to understand coupling — is this type used only within the bundle (loosely coupled, good for extraction) or across the entire app (tightly coupled, needs careful extraction)?
6. Use LSP `callHierarchy` on key entry points to trace composition chains

**Pattern detection:**
7. Grep for ALL settings that configure this feature:
   ```bash
   grep -n '@AppStorage\|UserDefaults\|SettingsKeys\|settings\.' <file>
   ```
8. Grep for logging patterns:
   ```bash
   grep -n 'Logger\|Log\.\|os\.log\|NSLog\|print(' <file>
   ```
9. Check for accessibility:
   ```bash
   grep -n 'accessibility\|VoiceOver\|isAccessibility' <file>
   ```
10. Note: error handling strategy, async patterns, DI approach, state management pattern

**Test analysis:**
11. Find and read test files for this feature:
    ```bash
    find <repo> -name '*<FeatureName>*Test*' -o -name '*<FeatureName>*Spec*'
    ```
    Test names describe expected behavior → these become spec conformance test vectors.
    Tested public API = the extraction-safe surface.

**Complexity assessment:**
12. Calculate per-file: line count, function count, max nesting depth. High-complexity files are higher-value extraction candidates.

**Output of Phase 3**: Per-feature dossier with: all files, all types (with access levels and conformances), all settings, all logging, accessibility status, coupling assessment, test coverage, complexity scores, doc comment summary.

### Phase 4: Bundle & Relate

Synthesize findings into extractable spec bundles.

For each bundle:
1. **Core component**: The main view/screen
2. **Supporting types**: Models, managers, providers, utilities
3. **Settings surface**: All configurable options (with their keys and defaults)
4. **Dependencies**: Other bundles this one depends on
5. **Infrastructure compliance**: Which litterbox rules are already met, which are missing
6. **Roadmap context**: If a Roadmap exists, include its acceptance criteria and architecture decisions

**Cross-reference with structural analysis:**
7. **Validate against pbxproj groups**: Do the discovered bundles match Xcode file groups? If a group contains files from multiple bundles, reconsider the boundaries.
8. **Validate against PR history**: Does each bundle correspond to one or a few PRs? If so, the PR descriptions provide additional context for the spec.
9. **Include complexity scores**: Higher complexity bundles are more valuable to spec (more decisions to preserve).
10. **Include test coverage**: Bundles with tests are better extraction candidates — the tests validate the spec.

Compare each bundle against existing litterbox specs:
- Read the existing spec fully
- Read the repo's implementation fully
- Side-by-side comparison: what does the repo do that the spec doesn't cover?

### Phase 5: Report & Act

Present the complete findings using this format:

```
# Litterbox Import: [Repo Name]

Analyzed: [repo path]
Platform(s): [detected platforms]
Build system: [SPM / Xcode / Gradle / npm]
Commits analyzed: [count]
Roadmaps found: [count]
Files analyzed: [count]
Types discovered: [count]

## Project Profile
[2-3 sentences about what this project is and its architecture]

## Feature Bundles Discovered

### Bundle 1: [Feature Name]
- **Roadmap**: [roadmap file, if exists]
- **Core files**: [list with line counts]
- **Settings**: [all configurable options with keys and defaults]
- **Dependencies**: [other bundles or external libraries]
- **Infrastructure audit**:
  - Logging: ✅/❌ (describe what exists)
  - Accessibility: ✅/❌ (describe what exists)
  - Localization: ✅/❌
  - Feature flags: ✅/❌
  - Error handling: [pattern used]
- **Existing litterbox spec match**: [spec name] or None
- **Proposed spec**: `ui/[name].md` or `ui/Recipes/[name].md`
- **Key requirements to extract** (from code + Roadmap):
  - REQ-001: [requirement from acceptance criteria or observed behavior]
  - REQ-002: ...

### Bundle 2: ...

## Improvements to Existing Specs

### [Spec Name] v[current] → v[proposed]
- **What the repo adds**: [description]
- **Proposed new requirements**:
  - REQ-NNN: [new requirement]
- **Proposed new platform notes**: [detail]

## Infrastructure Gaps
- Localization: [status across all bundles]
- Accessibility: [status]
- Feature flags: [status]
- Analytics: [status]

## Recommendations
[Prioritized list: what to extract first and why]
```

After presenting findings, ask which items to act on. For approved items, create/update specs and commit individually.

## Important Notes

- **Read code, don't scan file names.** The first version of this skill scanned file names and missed everything important. Read every file in a candidate bundle fully.
- **Bundle related things together.** A file tree browser is useless without its sync mechanism, its settings, and its git status integration. These are one spec, not four.
- **Roadmaps are primary context.** If a Roadmap exists for a feature, it tells you WHY the feature exists, WHAT it should do, and HOW it was designed. Use this to write better specs.
- **Git history reveals intent.** Commit messages explain why code was written the way it was. Recent commits show active development areas. Old, unchanged code is stable (good for extraction).
- **LSP reveals composition.** Call hierarchy shows how components compose naturally — follow the call graph to find bundle boundaries.
- **Settings are part of the component.** Every `@AppStorage`, `UserDefaults`, or config option that affects a component is part of that component's spec. Don't split settings from the component they configure.
- **Assess infrastructure compliance.** For each bundle, check which litterbox rules are already met and which are missing. This becomes part of the spec's gap analysis.
- See `${CLAUDE_SKILL_DIR}/references/extraction-criteria.md` for extraction criteria.
- See `${CLAUDE_SKILL_DIR}/references/analysis-techniques.md` for specific commands and LSP operations.
- See `${CLAUDE_SKILL_DIR}/references/roadmap-integration.md` for how to read and use Roadmap files.
