All .md files require YAML frontmatter: id (UUID), title, domain, type (principle|guideline|recipe|workflow|reference), version (semver), status (draft|review|accepted|deprecated), language (en), created, modified, author, copyright, license (MIT), summary, platforms [], tags [], depends-on [], related [], references []. All fields required; use [] for empty lists. End every file with a ## Change History table. Version is immutable once on main; bump on any change.

Filenames: kebab-case, descriptive nouns not verbs, no numeric prefixes. Domain = file path with / replaced by . and .md stripped. Never reuse a retired path. Cross-reference by domain in backticks: `cookbook.guidelines.testing.test-pyramid`.

Use RFC 2119 keywords: MUST/MUST NOT (absolute), SHOULD/SHOULD NOT (recommended), MAY (optional). Use {{placeholder}} tokens for app-specific values, never hardcode. Surface all design decisions with Decision, Rationale, Approved fields.

Full reference: cookbook/conventions.md
