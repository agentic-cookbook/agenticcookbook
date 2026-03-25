# Analysis Techniques Reference

Commands and operations for deep codebase analysis.

## Git History Analysis

```bash
# Top 30 most-changed files (high churn = important)
git log --name-only --pretty=format: | sort | uniq -c | sort -rn | head -30

# File creation timeline
git log --diff-filter=A --name-only --format='--- %ai ---' | head -200

# Recent feature commits
git log --oneline -100

# Commits grouped by feature keywords
git log --oneline --all | grep -iE '(feat|add|implement|create|build)' | head -50

# Files changed in a specific commit
git diff-tree --no-commit-id --name-only -r <hash>

# File history with renames
git log --follow --oneline -- <file>

# Contributor stats
git shortlog -s -n

# Code churn per file (lines added + removed)
git log --numstat --pretty=format: -- '*.swift' | awk '{a[$3]+=$1+$2} END {for(f in a) print a[f], f}' | sort -rn | head -20

# All branches
git branch -a

# PR merge commits (often annotate features)
git log --merges --oneline -50
```

## LSP Operations

```
# Complete type inventory
LSP workspaceSymbol query=""  → all types in workspace

# Type inventory filtered
LSP workspaceSymbol query="View"  → all View types
LSP workspaceSymbol query="Manager"  → all manager types
LSP workspaceSymbol query="Provider"  → all provider types

# What does this view call? (reveals bundle composition)
LSP callHierarchy on a View's body property → outgoing calls

# Who uses this type? (reveals coupling)
LSP findReferences on a type name → all usage sites

# What's in this file?
LSP documentSymbol on a file → all symbols with hierarchy

# Type signature and docs
LSP hover on a symbol → type info, documentation
```

## Build System Analysis

### Swift Package Manager
```bash
swift package dump-package                     # Full package manifest as JSON
swift package show-dependencies                # Dependency tree
swift package describe                         # Human-readable description
```

### Xcode
```bash
xcodebuild -project <path> -list              # Targets, schemes, configurations
xcodebuild -project <path> -showBuildSettings # All build settings
xcodebuild -scheme <name> -showBuildSettings  # Per-scheme settings
```

### Gradle (Kotlin/Android)
```bash
./gradlew :dependencies                        # Dependency tree
./gradlew :projects                            # Subproject list
```

### npm (Web)
```bash
cat package.json | jq '.dependencies'          # Direct dependencies
cat package.json | jq '.devDependencies'       # Dev dependencies
```

## Code Pattern Detection

```bash
# Settings/configuration surface
grep -rn '@AppStorage\|UserDefaults\|SettingsKeys' --include='*.swift'
grep -rn 'SharedPreferences\|DataStore' --include='*.kt'
grep -rn 'localStorage\|sessionStorage' --include='*.ts' --include='*.tsx'

# Accessibility annotations
grep -rn 'accessibilityLabel\|accessibilityValue\|accessibilityHint\|accessibilityRole' --include='*.swift'
grep -rn 'contentDescription\|importantForAccessibility' --include='*.kt'
grep -rn 'aria-label\|aria-describedby\|role=' --include='*.tsx'

# Localization
grep -rn 'NSLocalizedString\|String(localized\|LocalizedStringKey' --include='*.swift'
grep -rn 'stringResource\|R\.string\.' --include='*.kt'
grep -rn 'useIntl\|formatMessage\|i18n\.\|t(' --include='*.tsx'

# Feature flags
grep -rn 'FeatureFlag\|isEnabled\|feature\.' --include='*.swift' --include='*.kt' --include='*.tsx'

# Logging patterns
grep -rn 'Logger\|Log\.\|os\.log\|Timber\|console\.\(log\|debug\|error\)' --include='*.swift' --include='*.kt' --include='*.tsx'

# Error handling
grep -rn 'do {.*catch\|try \|throws\|Result<\|sealed class.*Error' --include='*.swift' --include='*.kt'

# Async patterns
grep -rn 'async\|await\|Task {\|DispatchQueue\|viewModelScope\|launch {' --include='*.swift' --include='*.kt'

# Protocol/interface definitions
grep -rn '^protocol \|^interface ' --include='*.swift' --include='*.kt'
```

## Swift Compiler Analysis

```bash
# Import graph (JSON) — reveals hidden dependencies, macros, link libraries
swiftc -scan-dependencies <file.swift> 2>&1 | jq '.'

# Full AST declarations — precise types, conformances, generics, access levels
swiftc -print-ast <file.swift>

# Type checking diagnostics (without linking)
swiftc -typecheck <file.swift>

# Module interface (public API surface only)
swiftc -emit-module-interface-path /tmp/out.swiftinterface <file.swift>

# API descriptor (JSON public API)
swiftc -emit-api-descriptor-path /tmp/out.json <file.swift>
```

## Xcode Project File Parsing

```bash
# Convert pbxproj to JSON
plutil -convert json -o /tmp/proj.json <repo>/*.xcodeproj/project.pbxproj

# Extract file groups (often match feature bundles)
jq '.objects | to_entries[] | select(.value.isa == "PBXGroup") | {name: .value.name, path: .value.path, children: .value.children}' /tmp/proj.json

# Extract source files per target
jq '.objects | to_entries[] | select(.value.isa == "PBXSourcesBuildPhase") | .value.files' /tmp/proj.json

# Extract framework dependencies
jq '.objects | to_entries[] | select(.value.isa == "PBXFrameworksBuildPhase") | .value.files' /tmp/proj.json

# Find files in project but not in any build phase (possible dead code)
# Compare PBXFileReference entries against PBXBuildFile entries
```

## GitHub API Analysis

```bash
# Repo metadata
gh api repos/{owner}/{repo} --jq '{name, description, language, default_branch}'

# PR history (feature boundaries)
gh api repos/{owner}/{repo}/pulls?state=all&per_page=100 --jq '.[] | {number, title, merged_at, body}'

# Issue history (bugs and design decisions)
gh api repos/{owner}/{repo}/issues?state=all&per_page=100 --jq '.[] | {number, title, labels: [.labels[].name], body}'

# Code search (find patterns across the repo)
gh search code "FeatureFlag" --repo {owner}/{repo} --json path,textMatches
```

## Test File Analysis

```bash
# Find test files
find <repo> -name '*Tests.swift' -o -name '*Test.swift' -o -name '*Spec.swift'
find <repo> -name '*Test.kt' -o -name '*Spec.kt'
find <repo> -name '*.test.tsx' -o -name '*.spec.tsx' -o -name '*.test.ts'

# Extract test function names (describe expected behavior)
grep -rn 'func test\|it("\|describe("\|test("' --include='*.swift' --include='*.kt' --include='*.tsx' --include='*.ts'
```

## Documentation Comment Extraction

```bash
# Swift doc comments
grep -rn '/// ' --include='*.swift' <repo>

# Kotlin doc comments
grep -rn '/** \|* ' --include='*.kt' <repo>

# JSDoc comments
grep -rn '/\*\*\|* @' --include='*.tsx' --include='*.ts' <repo>
```

## File Metrics & Complexity

```bash
# Lines of code per file (complexity proxy)
find <repo> -name '*.swift' -o -name '*.kt' -o -name '*.tsx' | xargs wc -l | sort -rn | head -30

# Function count per file
for f in $(find <repo> -name '*.swift'); do echo "$(grep -c 'func ' "$f") $f"; done | sort -rn | head -20

# Max nesting depth per file (deeper = more complex)
for f in $(find <repo> -name '*.swift'); do echo "$(awk '/{/{d++} /}/{d--} d>m{m=d} END{print m}' "$f") $f"; done | sort -rn | head -20

# File count by extension
find <repo> -type f | sed 's/.*\.//' | sort | uniq -c | sort -rn

# Directory structure (2 levels deep)
find <repo> -maxdepth 2 -type d | head -50
```
