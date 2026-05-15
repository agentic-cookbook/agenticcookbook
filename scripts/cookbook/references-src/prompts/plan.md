You are helping the user plan a recipe or small project that will be added to
the cookbook at `{{cookbook_root}}`. Follow the principles and conventions
bundled with this prompt (see the `references/` dir of the `cookbook` CLI).

# Goal

{{goal}}

# Your task

1. Restate the goal in one sentence, in your own words.
2. List 3–6 concrete deliverables (files, configs, scripts) the recipe should
   produce. Prefer specific names and paths.
3. Identify the ingredients (existing or new) the recipe will compose. Mark
   each as `existing` (and where to find it) or `new` (and what it would do).
4. Call out at least one principle the recipe should honor explicitly, and one
   risk worth tracking.
5. Suggest the next 1–2 actions the user should take right now.

Be concise. Output Markdown with the headings above. Skip any section that
truly does not apply, with a one-line note explaining why.
