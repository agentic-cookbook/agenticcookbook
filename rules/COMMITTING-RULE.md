# Committing Rule

This rule enforces the git workflow for all code changes. Every change flows through a worktree, a draft PR, incremental commits, and a merge. No exceptions.

---

## Setup: Worktree and Draft PR

Before writing any code, you MUST set up the working environment:

1. **Create a worktree** from the project's main branch:
   ```
   git worktree add ../<project>-wt/<branch-name> -b <branch>
   ```
   All work happens in the worktree. Never commit directly to the main branch.

2. **Create a draft PR** immediately — before any code is written:
   ```
   git commit --allow-empty -m "Start: <description>"
   git push -u origin <branch>
   gh pr create --draft --title "<title>" --body "<initial description>"
   ```
   The PR serves as the living record of the work from the very first moment.

### Branch Naming

Follow the project's branch naming convention. If none exists, use:

| Change type | Pattern | Example |
|---|---|---|
| New feature | `feature/<description>` | `feature/auth-middleware` |
| Bug fix | `fix/<description>` | `fix/login-timeout` |
| Revision | `revise/<description>` | `revise/test-coverage` |

---

## Working: Commit, Document, Push

While working, you MUST follow this cycle for every logical change:

1. **Commit** — small, atomic commits. One logical change per commit. Write a clear commit message describing the what and why.
2. **Push** — push after every commit. The remote branch MUST always reflect the current state of work.
3. **Document** — update the PR description or add a PR comment when a commit introduces a notable change, design decision, or deviation from the plan.

Do not accumulate uncommitted work. Do not batch unrelated changes into a single commit. Do not push only at the end.

---

## Completion: Activate the PR

When all work is done:

1. **Final verification** — build passes, tests pass, lint is clean.
2. **Update the PR** — ensure the PR description accurately summarizes the full set of changes. Add a test plan if not already present.
3. **Mark ready for review** — remove the draft status:
   ```
   gh pr ready
   ```

---

## Verification: Wait for Checks (Project-Specific)

After the PR is marked ready, it MAY need to pass verification before merging. This step is project-specific:

- CI/CD checks (build, test, lint)
- Code review approval
- Any other required status checks

If the project defines required checks, wait for them to pass. If a check fails, fix the issue, commit, push, and wait again. Do not merge with failing checks.

If the project has no required checks, proceed directly to merge.

---

## Merge and Clean Up

1. **Merge** the PR using the project's preferred merge strategy. Default to squash merge:
   ```
   gh pr merge --squash
   ```
2. **Clean up** the worktree:
   ```
   git worktree remove ../<project>-wt/<branch-name>
   ```
3. **Pull main** to sync:
   ```
   git pull
   ```

---

## MUST NOT

- Do not commit directly to the main branch. All work goes through a worktree and PR.
- Do not start writing code before the draft PR exists. The PR is created first.
- Do not accumulate uncommitted changes. Commit after each logical unit.
- Do not push only at the end. Push after every commit.
- Do not merge with failing checks. Fix failures first.
- Do not leave stale worktrees. Clean up after merge.
- Do not skip the draft-to-ready transition. Every PR starts as a draft and is explicitly marked ready when complete.
