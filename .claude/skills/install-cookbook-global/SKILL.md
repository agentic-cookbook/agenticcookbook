---
name: install-cookbook-global
version: 1.0.0
description: Installs /install-cookbook into ~/.claude/skills/ so it can be run from any project
argument-hint: "[--force]"
---

# /install-cookbook-global

Copies `skills/install-cookbook/` from this repo into `~/.claude/skills/install-cookbook/`,
making `/install-cookbook` available in every project.

Run this once from the cookbook repo. Then go to any project and run `/install-cookbook`
to onboard the full cookbook there.

## Step 1: Locate the cookbook repo

The cookbook repo is the current working directory (this skill is only present when
running from within the agentic-cookbook repo). Verify `skills/install-cookbook/SKILL.md`
exists. If not, print: "Run this skill from within the agentic-cookbook repo." and stop.

## Step 2: Check if already installed

Check if `~/.claude/skills/install-cookbook/` exists.

If it exists and `--force` was not passed:
- Print: "/install-cookbook is already installed globally."
- Print: "Run `/install-cookbook-global --force` to overwrite with the current version."
- Stop.

## Step 3: Copy the skill

Copy the entire `skills/install-cookbook/` directory to `~/.claude/skills/install-cookbook/`.
Use the Bash tool:

```bash
cp -r skills/install-cookbook/ ~/.claude/skills/install-cookbook/
```

## Step 4: Confirm

Print:

```
✓ /install-cookbook is now available globally.

Run it from any project to onboard the agentic cookbook:
  /install-cookbook
```
