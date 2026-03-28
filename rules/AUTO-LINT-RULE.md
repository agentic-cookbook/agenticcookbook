# Auto-Lint Rule

After creating or modifying any Claude Code skill, agent, or rule file, you MUST run the appropriate linter before considering the work complete.

This rule is independent of your cookbook participation tier. It governs quality assurance for your own extensions.

---

## When to Lint

You MUST run the linter after ANY of these actions:

- Creating a new skill (new `SKILL.md` or files in a skill directory)
- Modifying an existing skill's `SKILL.md` or reference files
- Creating a new agent (new `.md` file in `.claude/agents/`)
- Modifying an existing agent
- Creating a new rule file
- Modifying an existing rule file

## Which Linter to Use

| File type | Linter | Invocation |
|-----------|--------|------------|
| Skill (directory with `SKILL.md`) | `/lint-skill` | `/lint-skill <path-to-skill-directory>` |
| Agent (`.md` file with agent frontmatter) | `/lint-agent` | `/lint-agent <path-to-agent-file>` |
| Rule (standalone `.md` file) | `/lint-rule` | `/lint-rule <path-to-rule-file>` |

## What to Do with Results

1. **FAIL items**: You MUST fix all FAIL items before considering the work complete. Do not skip them.
2. **WARN items**: You MUST present the WARN list to the user and document which ones will be addressed and which are accepted as-is. Do not silently skip WARNs.
3. **PASS items**: No action needed.

After fixing FAIL items, re-run the linter to confirm they are resolved.

## MUST NOT

- You MUST NOT skip linting because "it's a small change." Every change gets linted.
- You MUST NOT mark the work as complete with unresolved FAIL items.
- You MUST NOT lint with the wrong tool (e.g., using `/lint-skill` on a rule file).
