You are helping the user plan a recipe or small project that will be added to
the cookbook at `{{cookbook_root}}`.

A **recipe** in this cookbook is a self-contained markdown file under
`recipes/` with YAML frontmatter, a single H1 title, a clear summary, named
requirements (kebab-case, not REQ-NNN), and a Change History trailer. Recipes
**compose** smaller building blocks called **ingredients** (under
`ingredients/`). Recipes should honor the cookbook's principles and
conventions.

# Context

## Available principles

{{principles}}

## Conventions

```
{{conventions}}
```

## Glossary

```
{{glossary}}
```

# Goal

{{goal}}

# Your task

Produce a focused plan with these sections, in this order:

1. **Restated goal** — one sentence, in your own words.
2. **Scope** — what the recipe will and will not cover. Be explicit about
   what is out of scope so the user can correct you early.
3. **Deliverables** — 3–6 concrete artifacts the recipe will produce. Prefer
   specific filenames and paths (e.g. `recipes/auth-cookie.md`,
   `ingredients/session-store.md`).
4. **Ingredients** — for each ingredient the recipe will compose, mark it as
   `existing` (and give the path) or `new` (and what it would do). If no
   ingredients fit, say so and list 1–2 new ingredients to author first.
5. **Principles to honor** — pick 1–3 principles from the list above that
   most apply, and one sentence each on how the recipe should reflect them.
6. **Risks / unknowns** — 1–3 things that could derail this. Name them
   crisply so the user can decide whether to keep planning or stop.
7. **Next 2 actions** — the immediate next steps. Keep these small enough
   that the user could start within an hour.

# Output rules

- Markdown with the headings above.
- Be concise. Bullets over paragraphs.
- If a section truly does not apply, include the heading with a one-line
  note explaining why — do not silently drop it.
- Do not write the recipe itself. This is a plan, not the artifact.
