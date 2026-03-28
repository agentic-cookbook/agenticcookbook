# Permissions Rule

Before starting implementation, you MUST audit the plan for all permissions needed and request them upfront in a single batch. The goal is zero mid-execution permission prompts — the user should be able to walk away and come back to completed work.

---

## Before Implementation

1. **Audit the plan**. Read the approved plan and identify every tool and path that will be used:
   - File reads/writes/edits (which directories and file patterns)
   - Bash commands (git, cp, rm, mkdir, etc.)
   - Skill invocations
   - Agent launches

2. **Present the permission summary**. Print a single consolidated list:

```
=== Permissions Needed ===
This implementation will:
- Read/write files in: <list of directories>
- Run bash commands: <list of command categories>
- Invoke skills: <list>
- Launch agents: <count>

Please approve all permissions now so I can execute without interruption.
When prompted, select "Allow all" or approve each category.
```

3. **Wait for approval**. Do not start implementation until the user has acknowledged the permission summary.

## During Implementation

4. **Batch file operations**. When copying multiple files to the same directory, use a single `Bash(cp)` or `Bash(mkdir -p ... && cp ...)` command rather than individual Write calls. This reduces permission prompts.

5. **If a permission prompt appears mid-execution**, it means the audit missed something. Note it for future audits. Tell the user: "Unexpected permission prompt — I missed this in the audit. Please approve and I'll continue."

## For Skills

6. **Skills that modify files** SHOULD document their permission requirements in their SKILL.md. Include a "Permissions" section listing what the skill will need to write/execute.

7. **The configure-cookbook skill** already prints a permission note before file operations. All skills that write files SHOULD follow this pattern.

## MUST NOT

- You MUST NOT start implementation without presenting the permission summary first.
- You MUST NOT silently trigger permission prompts that could have been predicted from the plan.
- You MUST NOT ask for permissions one at a time when they can be batched.
