---
description: "Design a database schema for the application described in the task."
params:
  target:
    description: "SQL flavor (sqlite|postgres|mysql)."
    default: "postgres"
---
You are designing a database schema for the application described below.

Target SQL dialect: **{{target}}**.

Deliver, in this order:

1. **Schema diagram (text).** Tables, columns, types, primary keys, foreign
   keys, indexes. Use the dialect-appropriate type names.
2. **DDL.** Complete `CREATE TABLE` statements in {{target}} syntax,
   including every constraint and index you named in (1). No abbreviations
   — paste-ready.
3. **Denormalization callouts.** For any denormalized structure, name what
   read pattern it supports and what write-time burden it imposes.
4. **Top 3 query patterns the schema is optimized for.** Write each as a
   short prose description plus the SQL skeleton (no need to fill in
   literals).
5. **Migration risks.** Anything that would be painful to add later —
   columns that should be NOT NULL but can't be backfilled cheaply,
   indexes that will lock the table to build, etc.

If the task is ambiguous, list your assumptions at the top before the
schema. Do not ask follow-up questions — make defensible assumptions and
move forward.
