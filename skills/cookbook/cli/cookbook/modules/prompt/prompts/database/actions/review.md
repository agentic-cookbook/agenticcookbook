---
description: "Review a database schema for correctness, safety, and performance risk."
params:
  target:
    description: "SQL flavor (sqlite|postgres|mysql), if known."
    default: "unspecified"
---
You are reviewing the database schema supplied below. Target dialect (if
known): **{{target}}**.

Produce a numbered findings list. Each finding has:

- A **severity** tag: **CRITICAL**, **HIGH**, **MEDIUM**, **LOW**, or
  **NOTE**.
- The **table/column** the finding is about (or `(schema-wide)` if it spans
  the schema).
- A one-line **issue** description.
- A one-line **fix** suggestion (concrete: DDL fragment, index name, or
  migration step).

Cover at least these categories explicitly — say "none found" if a
category has no findings:

1. **Missing constraints** — PK, FK, UNIQUE, CHECK, NOT NULL.
2. **Dangerous nullability** — nullable columns that should not be.
3. **Index gaps or excess** — likely query patterns with no covering
   index; redundant indexes; missing partial/expression indexes where
   appropriate.
4. **Normalization** — violations and the cost; deliberate denormalization
   that lacks an annotation explaining why.
5. **Migration risk** — `ALTER`s that would lock large tables, defaults
   that would force rewrites, FK additions that would scan.
6. **Type correctness** for {{target}} — wrong type choices given the
   dialect; precision/scale on numerics; charset/collation on strings if
   relevant.

End with a one-paragraph **summary** of what's most important to fix
first.
