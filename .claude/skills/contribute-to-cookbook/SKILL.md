---
name: contribute-to-agentic-cookbook
version: "1.0.1"
description: "Create a PR to contribute a new recipe or enhancement to the agentic cookbook. Triggers on 'contribute to cookbook', 'add a recipe', or /contribute-to-agentic-cookbook."
argument-hint: "[new|enhance] [recipe-name] [--version]"
disable-model-invocation: true
allowed-tools: Read, Glob, Grep, Write, Edit, Bash(git *), Bash(gh *), Bash(ls *), Bash(mkdir *), Agent, AskUserQuestion
context: fork
---

# Contribute to Agentic Cookbook v1.0.1

## Startup

**First action**: If `$ARGUMENTS` is `--version`, print `contribute-to-agentic-cookbook v1.0.1` and stop.

Otherwise, print `contribute-to-agentic-cookbook v1.0.1` as the first line of output, then proceed.

**Version check**: Read `${CLAUDE_SKILL_DIR}/SKILL.md` from disk and extract the `version:` field from frontmatter. If it differs from this skill's version (1.0.1), print:

> ⚠ This skill is running v1.0.1 but vA.B.C is installed. Restart the session to use the latest version.

Continue running — do not stop.

## Overview

You walk the user through contributing to the agentic cookbook — either a new recipe or an enhancement to an existing one. The result is a PR in the cookbook repo, created from a worktree. You never merge the PR or modify the consuming project.

## Usage

```
/contribute-to-agentic-cookbook new status-indicator
/contribute-to-agentic-cookbook enhance empty-state
```

- `new <recipe-name>` — create a new recipe from scratch
- `enhance <recipe-name>` — improve an existing recipe
- No arguments — ask the user what they want to do

**Path assumption**: All paths assume the cookbook is at `../agentic-cookbook/` relative to the consuming project.

## Prerequisites

Before doing anything else:

1. Verify `../agentic-cookbook/` exists relative to the current project root. If it does not exist, stop with: "The agentic-cookbook repo was not found at `../agentic-cookbook/`. Clone it first: `git clone https://github.com/mikefullerton/agentic-cookbook.git ../agentic-cookbook`"
2. Read `../agentic-cookbook/cookbook/conventions.md` for format rules.
3. Read `../agentic-cookbook/contributing/AUTHORING.md` for contribution guidelines.

If either file is missing, stop and inform the user.

## Step 1: Determine Contribution Type

Parse `$ARGUMENTS`:

- **Starts with `new`**: Creating a new recipe. The rest of the argument is the recipe name (kebab-case).
- **Starts with `enhance`**: Enhancing an existing recipe. Search `../agentic-cookbook/cookbook/recipes/` for a file matching the name.
- **Empty**: Ask the user: "New recipe or enhance an existing one? And what's the recipe name?"

## Step 2: New Recipe Flow

1. **Check for duplicates.** Search filenames in `../agentic-cookbook/cookbook/recipes/` for files containing the recipe name in their filename. Do not read file contents for duplicate detection. If a match exists, tell the user and ask whether to enhance it instead or proceed with a new recipe.

2. **Create a branch and worktree** in the cookbook repo:
   ```
   git -C ../agentic-cookbook worktree add ../agentic-cookbook-wt/<recipe-name> -b feature/<recipe-name>
   ```
   If the worktree creation fails (branch already exists, unclean state), ask the user whether to reuse the existing branch or pick a new name.

3. **Design the recipe.** Invoke `/plan-agentic-cookbook-recipe <recipe-name>` to walk through the interactive recipe design. If that skill is not available, do the recipe planning inline — go section by section following `cookbook/recipes/_template.md`, asking the user about each section.

4. **Verify completeness.** Check every item from the Recipe Completeness Checklist:
   - [ ] YAML frontmatter with UUID, domain matching file path, title, version, all required fields
   - [ ] Behavioral requirements with descriptive kebab-case names
   - [ ] States table — every visual/behavioral state
   - [ ] Appearance values — exact dimensions, colors, fonts, spacing
   - [ ] Conformance test vectors — linked to requirement names
   - [ ] Logging messages — exact message strings
   - [ ] Edge cases
   - [ ] Accessibility requirements
   - [ ] Change History section

   Do not proceed until every item passes.

5. **Update the index.** Add the new recipe to `cookbook/index.md` in the worktree.

6. **Commit, push, and create PR:**
   ```
   git -C ../agentic-cookbook-wt/<recipe-name> add -A
   git -C ../agentic-cookbook-wt/<recipe-name> commit -m "Add <recipe-name> recipe"
   git -C ../agentic-cookbook-wt/<recipe-name> push -u origin feature/<recipe-name>
   gh pr create --repo <cookbook-repo> --head feature/<recipe-name> --title "Add <recipe-name> recipe" --body "New recipe: <recipe-name>\n\n<one-line summary>"
   ```
   Verify the output contains a valid PR URL. If the command fails, print the error and stop.

7. **Print the PR URL.**

## Step 3: Enhancement Flow

1. **Find the recipe.** Search `../agentic-cookbook/cookbook/recipes/` for the named recipe. If not found, list available recipes and ask the user to pick one.

2. **Read the existing recipe** and present a brief summary to the user.

3. **Ask what to change.** "What do you want to enhance? (e.g., add states, fix requirements, improve accessibility, update appearance values)"

4. **Create a branch and worktree:**
   ```
   git -C ../agentic-cookbook worktree add ../agentic-cookbook-wt/<recipe-name> -b revise/<recipe-name>
   ```
   If the worktree creation fails (branch already exists, unclean state), ask the user whether to reuse the existing branch or pick a new name.

5. **Make the changes** in the worktree copy of the recipe file.

6. **Bump the version** in the frontmatter (patch for fixes, minor for additions).

7. **Update the Change History** section with today's date and a description of what changed.

8. **Verify completeness** using the same checklist from Step 2.

9. **Commit, push, and create PR:**
   ```
   git -C ../agentic-cookbook-wt/<recipe-name> add -A
   git -C ../agentic-cookbook-wt/<recipe-name> commit -m "Revise <recipe-name> recipe: <brief description>"
   git -C ../agentic-cookbook-wt/<recipe-name> push -u origin revise/<recipe-name>
   gh pr create --repo <cookbook-repo> --head revise/<recipe-name> --title "Revise <recipe-name> recipe" --body "Enhancement: <description>"
   ```
   Verify the output contains a valid PR URL. If the command fails, print the error and stop.

10. **Print the PR URL.**

## Step 4: Post-PR Verification

After PR creation, verify:

1. The worktree has no uncommitted changes (`git -C ../agentic-cookbook-wt/<branch-name> status` shows clean).
2. The PR URL is valid (re-check with `gh pr view`).
3. `cookbook/index.md` was updated if adding new content.

If any check fails, fix the issue before proceeding.

## Step 5: Cleanup Guidance

After the PR is created, always print:

```
PR created: <url>

After merge, clean up:
  git worktree remove ../agentic-cookbook-wt/<branch-name>
  cd ../agentic-cookbook && git pull
```

## Guards

- **Do not merge the PR.** That is the user's choice.
- **Do not modify the consuming project.** This skill only touches the cookbook repo.
- **All work happens in a worktree.** Never commit directly to the cookbook's main branch.
- **Do not skip reading conventions.md and AUTHORING.md.** Stop if they are missing.
- **Do not submit incomplete recipes.** Every checklist item must pass before creating the PR.
