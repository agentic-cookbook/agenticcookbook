# update-website — DISABLED

This skill is intentionally disabled. Its entry point has been renamed
`SKILL.md` → `SKILL.md.disabled` so the harness no longer discovers it.

**Why:** the skill is stale and unsafe to run:

- Its destination points at the standalone `agenticcookbookweb` repo, which no
  longer exists — the website moved into the **`adh` monorepo** at
  `adh/websites/cookbook/cookbook/`.
- Its `rsync --delete` has no excludes for website-owned files (`README.md`,
  `LICENSE`, `.gitignore`, `docs/`) and will delete them.

The website-sync step has also been removed from
`.claude/rules/after-adding-an-artifact.md`; artifact changes no longer trigger
an automatic sync.

**To re-enable:** rename `SKILL.md.disabled` back to `SKILL.md` only after
fixing the destination path and adding the exclude list.
