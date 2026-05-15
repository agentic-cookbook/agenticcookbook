---
name: cookbook
version: "1.0.0"
description: "Create and maintain a cookbook (recipes, reference, indexes). Wraps the `cookbook` CLI installed at ~/.local/bin/cookbook. Use when the user asks to create, update, lint, validate, or plan recipes inside a cookbook-shaped repo."
argument-hint: "[--help] [-p <path>] <create|update|lint|validate|plan> [...]"
allowed-tools: Bash(cookbook *), Bash(command -v cookbook)
model: sonnet
---

# Cookbook v1.0.0

Thin wrapper around the `cookbook` CLI at `~/.local/bin/cookbook`. All work goes
through the CLI — never duplicate its logic in this skill.

## Startup

Verify the CLI is installed before doing anything else:

```bash
command -v cookbook
```

If it is missing, tell the user:

> The `cookbook` CLI is not installed. Run `./install.sh` from the agenticcookbook repo to install it, then re-invoke me.

…and stop.

## Routing

- **No args / `help` / `--help`** → run `cookbook --help` and present the module table verbatim.
- **`<module> ...`** → run `cookbook <module> ...` (forwarding all flags including `-p` / `--path`).
- For interactive modules (`plan`, occasionally `update --author`) — let the CLI handle the prompts. Do not wrap them.

## Modules at a glance

| Module | What it does |
|--------|--------------|
| `create` | Scaffolds a new client cookbook in cwd (`cookbook/`, `index.md`, `description.md`, `recipes/`, `reference/`). Idempotent. |
| `update` | Fills missing frontmatter and regenerates indexes. Deterministic; no LLM. |
| `lint` | Phase A deterministic checks + Phase B `claude -p` quality pass. `--no-llm` skips Phase B. |
| `validate` | Read-only: Phase A checks + index drift detection. Exit non-zero on failure (CI-friendly). |
| `plan` | Stub: guides the user through planning a recipe via `claude -p`. |

## After mutating commands

`create` and `update` print a Rich table summarizing what changed. Read the
printed report rather than re-walking the directory.

## Behavior notes

- Never `pip install` anything from inside this skill — `install.sh` handles deps.
- Never edit files in `~/.local/bin/_cookbook_pkg/`. To change CLI behavior, edit the source under `scripts/cookbook/` in the agenticcookbook repo and re-run `install.sh`.
- Pass `cwd` as-is; only use `-p <path>` when the user explicitly supplies one.
