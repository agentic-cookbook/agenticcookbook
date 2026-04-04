---
name: update-website
version: "1.0.0"
description: "Sync all cookbook content to the cookbook-web project. Full rsync of the cookbook directory, ensuring the website reflects the current state."
argument-hint: "[--dry-run]"
allowed-tools: Read, Glob, Bash(rsync *), Bash(find *), Bash(wc *), Bash(diff *), Bash(ls *), AskUserQuestion
context: fork
---

# Update Website v1.0.0

Sync the full cookbook content to the cookbook-web project so the website reflects the current state. This is the canonical way to push content changes to the website — other skills (like `/add-artifact`) invoke this instead of doing their own file copies.

## Startup

update-website v1.0.0

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. Compare to this skill's version (1.0.0). If they differ, print:

> Warning: This skill is running v1.0.0 but vA.B.C is installed. Restart the session to use the latest version.

Then continue running.

If `$ARGUMENTS` is `--version`, respond with exactly:
> update-website v1.0.0

Then stop.

## Step 1: Locate Repositories

Determine the source and destination paths.

**Source**: The cookbook content root. Detect by checking for `principles/` and `guidelines/` directories:
1. If they exist in the current working directory, use `.` as source.
2. If not, check `../cookbook/` and `../../cookbook/`.
3. If not found, print error and stop:
   ```
   ERROR: Cannot find cookbook content root. Run from the cookbook repo or an adjacent directory.
   ```

**Destination**: The cookbook-web content directory. Check these paths relative to the source repo root:
1. `../cookbook-web/cookbook/`
2. `../../cookbook-web/cookbook/`

If not found, print error and stop:
```
ERROR: Cannot find cookbook-web/cookbook/ directory. Is cookbook-web cloned as a sibling project?
```

Print:
```
Source: <absolute-path>
Destination: <absolute-path>
```

## Step 2: Preview Changes

Run rsync in dry-run mode to show what will change:

```bash
rsync -avn --delete \
  --exclude='.git/' \
  --exclude='.claude/' \
  --exclude='.superpowers/' \
  --exclude='.DS_Store' \
  --exclude='_template.md' \
  <source>/ <destination>/
```

Parse the output and print a summary:

```
=== SYNC PREVIEW ===
New files: <n>
Updated files: <n>
Deleted files: <n>
Unchanged: <n>
```

List the specific changes:
```
  [NEW] compliance/artifact-formatting/principle-formatting.md
  [UPDATE] compliance/INDEX.md
  [DELETE] old/removed-file.md
```

If `$ARGUMENTS` is `--dry-run`, print the preview and stop here.

If there are no changes:
```
Already up to date. No sync needed.
```
Then stop.

## Step 3: Sync

Run the actual rsync:

```bash
rsync -av --delete \
  --exclude='.git/' \
  --exclude='.claude/' \
  --exclude='.superpowers/' \
  --exclude='.DS_Store' \
  --exclude='_template.md' \
  <source>/ <destination>/
```

## Step 4: Verify

After sync, verify the destination matches the source:

1. Count `.md` files in source (excluding `.claude/`, `.superpowers/`, `.git/`).
2. Count `.md` files in destination.
3. Confirm counts match.

If counts don't match, print a warning listing the discrepancy.

## Step 5: Summary

```
=== WEBSITE SYNC COMPLETE ===
Source: <path>
Destination: <path>
Files synced: <n>
New: <n> | Updated: <n> | Deleted: <n>
```

## Guards

- **Read-only source** — never modify files in the cookbook source directory.
- **Exclude internals** — never sync `.claude/`, `.superpowers/`, `.git/`, `.DS_Store`, or `_template.md` to the website.
- **Verify after sync** — always run the count check to catch sync failures.
- **Preview first** — always show what will change before syncing (unless invoked programmatically by another skill).
