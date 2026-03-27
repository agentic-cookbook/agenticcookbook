# Roadmap Integration

How to read and use Roadmap files during import analysis.

## What are Roadmaps?

Roadmap files are structured Markdown documents that define features for implementation. They contain:
- Feature definition with goal, purpose, and scope
- Acceptance criteria (directly map to recipe REQ-NNN)
- Architecture decisions (inform recipe Platform Notes and Design Decisions)
- Implementation steps with status tracking
- Verification strategies (inform recipe Conformance Test Vectors)

## Where to find them

Roadmap files live in `Roadmaps/` at the repo root. Two layouts exist:

```
# Flat layout (older)
Roadmaps/
├── FeatureA-Roadmap.md
├── FeatureB-Roadmap.md
└── FeatureC-Roadmap.md

# Per-directory layout (newer)
Roadmaps/
├── 2026-03-20-FeatureA/
│   ├── Roadmap.md
│   ├── State/
│   └── History/
└── 2026-03-25-FeatureB/
    ├── Roadmap.md
    └── State/
```

Discovery command:
```bash
find <repo>/Roadmaps -name '*Roadmap.md' -o -name 'Roadmap.md' 2>/dev/null
```

## How to read them

### YAML frontmatter
```yaml
---
id: <UUID>
created: YYYY-MM-DD
modified: YYYY-MM-DD
author: Name <email>
description: "One-line summary"
---
```

### Key sections to extract

**Feature Definition** → becomes recipe Overview
- Goal and Purpose → Overview paragraph
- Acceptance Criteria → recipe REQ-NNN (each criterion becomes a requirement)
- Architecture Decisions → recipe Design Decisions + Platform Notes
- Dependencies/Prerequisites → recipe dependencies frontmatter

**Implementation Steps** → inform recipe scope
- Each step's description reveals sub-components
- Step acceptance criteria → additional REQ-NNN
- Step type (Auto/Manual) → indicates which parts are LLM-implementable

**Verification Strategy** → becomes recipe Conformance Test Vectors
- Test descriptions map to test vector rows
- Verification methods inform the "how to test" column

## How to use them during import

1. **Read every Roadmap file first** — they are the authoritative source for feature intent
2. **Map Roadmap steps to source files** — cross-reference step descriptions with git commits and file names
3. **Convert acceptance criteria to REQ-NNN** — each criterion from the Roadmap becomes a numbered requirement in the extracted recipe
4. **Preserve architecture decisions** — if the Roadmap explains WHY something was built a certain way, that goes in the recipe's Design Decisions section
5. **Use verification strategy for test vectors** — the Roadmap's verification approach maps directly to the recipe's Conformance Test Vectors

## Example mapping

Roadmap acceptance criterion:
> "Terminal sessions must persist scrollback when switching between sessions"

Becomes recipe requirement:
> **REQ-024**: When switching between sessions, the terminal view MUST preserve the previous session's scrollback buffer. The reparenting approach (moving the terminal view between containers) MUST be used instead of recreating the view.

Roadmap architecture decision:
> "Use reparenting instead of recreating terminal views to preserve state"

Becomes recipe Design Decision:
> **Reparenting over recreation**: Terminal views are reparented (moved between container views) rather than destroyed and recreated when switching sessions. This preserves scrollback, cursor position, and running processes. Decided during initial implementation based on SwiftTerm's stateful view architecture.
